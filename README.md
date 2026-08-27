# Pulse CPR

Production website for Pulse CPR Oklahoma — professional CPR, BLS, AED, and First Aid certification serving Oklahoma City and statewide teams.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- shadcn/ui

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

Without `FORM_WEBHOOK_URL`, submissions are validated and logged on the server so the site can be reviewed end-to-end.
