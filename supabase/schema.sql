-- Pulse CPR Training Management System
-- Run this in the Supabase SQL editor (once per project).

create extension if not exists "pgcrypto";

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  course_type text not null check (
    course_type in ('CPR', 'First Aid', 'AED', 'Healthcare', 'Corporate')
  ),
  class_date date not null,
  start_time time not null,
  end_time time not null,
  instructor text not null default 'Christine Oldenburg',
  location text not null,
  description text not null default '',
  price numeric(10, 2) not null default 0,
  seats_available integer not null check (seats_available >= 0),
  seats_remaining integer not null default 0,
  registration_deadline timestamptz,
  status text not null default 'scheduled' check (
    status in ('scheduled', 'cancelled', 'completed')
  ),
  google_event_id text, -- unused leftover column; classes live in this table, not Google Calendar
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes (id) on delete cascade,
  student_name text not null,
  email text not null,
  phone text not null,
  seats integer not null default 1 check (seats > 0),
  notes text not null default '',
  status text not null default 'confirmed' check (
    status in ('confirmed', 'waitlist', 'cancelled', 'attended', 'no_show')
  ),
  attended boolean,
  confirmation_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists classes_date_idx on public.classes (class_date, start_time);
create index if not exists classes_status_idx on public.classes (status);
create index if not exists registrations_class_idx on public.registrations (class_id, status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists classes_updated_at on public.classes;
create trigger classes_updated_at
  before update on public.classes
  for each row execute function public.set_updated_at();

create or replace function public.occupied_seats(p_class_id uuid)
returns integer
language sql
stable
as $$
  select coalesce(sum(seats), 0)::integer
  from public.registrations
  where class_id = p_class_id
    and status in ('confirmed', 'attended');
$$;

create or replace function public.sync_class_seats()
returns trigger
language plpgsql
as $$
declare
  cid uuid;
begin
  if tg_table_name = 'classes' then
    new.seats_remaining := greatest(
      new.seats_available - public.occupied_seats(new.id),
      0
    );
    return new;
  end if;

  cid := coalesce(new.class_id, old.class_id);
  update public.classes
  set seats_remaining = greatest(seats_available - public.occupied_seats(cid), 0)
  where id = cid;
  return coalesce(new, old);
end;
$$;

drop trigger if exists classes_sync_seats on public.classes;
create trigger classes_sync_seats
  before insert or update of seats_available on public.classes
  for each row execute function public.sync_class_seats();

drop trigger if exists registrations_sync_seats on public.registrations;
create trigger registrations_sync_seats
  after insert or update of seats, status or delete on public.registrations
  for each row execute function public.sync_class_seats();

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

create or replace function public.staff_configured()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admin_users);
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.admin_users) then
    insert into public.admin_users (user_id, name)
    values (new.id, coalesce(new.raw_user_meta_data ->> 'name', new.email));
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.register_for_class(
  p_class_id uuid,
  p_student_name text,
  p_email text,
  p_phone text,
  p_seats integer,
  p_notes text default ''
)
returns public.registrations
language plpgsql
security definer
set search_path = public
as $$
declare
  session public.classes%rowtype;
  created public.registrations%rowtype;
begin
  if p_seats is null or p_seats < 1 then
    raise exception 'Seat count must be at least 1';
  end if;

  select * into session from public.classes where id = p_class_id for update;
  if not found then
    raise exception 'Class not found';
  end if;
  if session.status <> 'scheduled' then
    raise exception 'This class is not open for registration';
  end if;
  if session.registration_deadline is not null and session.registration_deadline < now() then
    raise exception 'The registration deadline has passed';
  end if;
  if (
    make_timestamptz(
      extract(year from session.class_date)::int,
      extract(month from session.class_date)::int,
      extract(day from session.class_date)::int,
      extract(hour from session.start_time)::int,
      extract(minute from session.start_time)::int,
      0,
      'America/Chicago'
    )
  ) < now() then
    raise exception 'This class has already started';
  end if;
  if public.occupied_seats(session.id) + p_seats > session.seats_available then
    raise exception 'Not enough seats remaining';
  end if;

  insert into public.registrations (
    class_id, student_name, email, phone, seats, notes, status
  )
  values (
    p_class_id,
    trim(p_student_name),
    lower(trim(p_email)),
    trim(p_phone),
    p_seats,
    coalesce(p_notes, ''),
    'confirmed'
  )
  returning * into created;

  return created;
end;
$$;

alter table public.admin_users enable row level security;
alter table public.classes enable row level security;
alter table public.registrations enable row level security;

drop policy if exists admin_users_staff_read on public.admin_users;
create policy admin_users_staff_read on public.admin_users
  for select to authenticated
  using (public.is_staff());

drop policy if exists classes_public_read on public.classes;
create policy classes_public_read on public.classes
  for select to anon, authenticated
  using (status = 'scheduled' or public.is_staff());

drop policy if exists classes_staff_write on public.classes;
create policy classes_staff_insert on public.classes
  for insert to authenticated
  with check (public.is_staff());
drop policy if exists classes_staff_update on public.classes;
create policy classes_staff_update on public.classes
  for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());
drop policy if exists classes_staff_delete on public.classes;
create policy classes_staff_delete on public.classes
  for delete to authenticated
  using (public.is_staff());

drop policy if exists registrations_staff_read on public.registrations;
create policy registrations_staff_read on public.registrations
  for select to authenticated
  using (public.is_staff());

drop policy if exists registrations_staff_write on public.registrations;
create policy registrations_staff_insert on public.registrations
  for insert to authenticated
  with check (public.is_staff());
drop policy if exists registrations_staff_update on public.registrations;
create policy registrations_staff_update on public.registrations
  for update to authenticated
  using (public.is_staff())
  with check (public.is_staff());

grant usage on schema public to anon, authenticated;
grant select on public.classes to anon, authenticated;
grant all on public.classes to authenticated;
grant all on public.registrations to authenticated;
grant select on public.admin_users to authenticated;
grant execute on function public.staff_configured() to anon, authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.register_for_class(uuid, text, text, text, integer, text) to anon, authenticated;

-- Do not seed demo class dates. Christine adds live classes from /admin.
