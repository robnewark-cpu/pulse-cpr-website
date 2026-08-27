# Pulse CPR

Production website for Pulse CPR Oklahoma — professional CPR, BLS, AED, and First Aid certification from the Edmond classroom, serving Oklahoma City and statewide teams.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui
- Supabase (class calendar and instructor admin)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Environment

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL for SEO
- `NEXT_PUBLIC_GA_ID` — optional Google Analytics measurement ID
- `FORM_WEBHOOK_URL` — optional POST endpoint for lead, booking, quote, and newsletter forms
- `NEXT_PUBLIC_AEGIS_PAY_URL` — optional Aegis Pay checkout or invoice link shown after class requests
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` — class manager
- `SUPABASE_SERVICE_ROLE_KEY` — optional; keep on the server only
- `RESEND_API_KEY` / `EMAIL_FROM` — registration and cancellation emails

Without Supabase keys, the public calendar stays empty until the instructor posts dates. Instructor login at `/admin` stays offline until keys are added.

## Training management

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor (tables, RLS, first-user-is-staff trigger). Do not seed demo class dates. If demo dates were already inserted, run `supabase/clear-classes.sql`.
3. Add the Supabase URL and anon key to the host.
4. Open `/admin/login` and create the first instructor account (phone-friendly).
5. Use **New class** to add a date. Students see it on Pulse CPR’s class calendar at `/class-calendar`.

Payments are processed by **Aegis Pay**. This site does not take card numbers. Optional: set `NEXT_PUBLIC_AEGIS_PAY_URL` to her Aegis Pay checkout or invoice link.

Optional email: add a Resend API key. Students get a payment reminder; cancelled classes notify the roster.
