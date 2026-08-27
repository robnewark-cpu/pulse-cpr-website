-- Go-live: remove every class calendar entry and registration.
-- Run this in the Supabase SQL editor if demo dates were already inserted.

truncate table public.registrations restart identity cascade;
truncate table public.classes restart identity cascade;
