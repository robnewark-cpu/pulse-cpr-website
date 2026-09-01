# Pulse CPR mobile app

Native iOS and Android app for Pulse CPR (PulseCPROK.com). This is a real Expo app with Home, Classes, Schedule, Contact, and instructor screens — not a website wrapper. Booking and registration still open the live site so payments stay on Square.

The marketing website can also be installed as a PWA from the browser. Store listing still requires Apple and Google developer accounts owned by Christine or Rob.

## Run locally

```bash
cd mobile
npm install
npm start
```

Then open the Expo Go app on a phone, or press `i` / `a` for a simulator.

```bash
npm run typecheck
```

Do not add this package to the website `package.json`. Cloudflare Workers Builds must keep running the Next.js site only.

## What students can do

- See Heartsaver, Basic Life Support, AED, and First Aid with current prices and durations
- Call, email, open maps, or visit Facebook
- Load open seats from `https://pulsecprok.com/api/classes`
- Register or request a custom date on PulseCPROK.com
- Read Christine Oldenburg’s instructor bio

## Publish to the App Store and Google Play

1. Create an [Expo](https://expo.dev) account and run `npx eas-cli login` then `npx eas-cli init` inside `mobile/`. That writes the EAS project ID into `app.json`.
2. Apple: enroll in the [Apple Developer Program](https://developer.apple.com/programs/) ($99/year). Create the app with bundle ID `com.pulsecprok.app`. Privacy policy URL: `https://pulsecprok.com/privacy`.
3. Google: pay the one-time [Play Console](https://play.google.com/console) fee ($25). Use package `com.pulsecprok.app` and the same privacy URL.
4. Build store binaries:

```bash
cd mobile
npx eas-cli build --platform ios --profile production
npx eas-cli build --platform android --profile production
```

5. Submit:

```bash
npx eas-cli submit --platform ios
npx eas-cli submit --platform android
```

Apple and Google still need listing copy, screenshots from a device or simulator, and an age rating. This repo cannot finish those steps without the store accounts.

## Identifiers

| Store | ID |
| --- | --- |
| App name | Pulse CPR |
| iOS bundle | `com.pulsecprok.app` |
| Android package | `com.pulsecprok.app` |
| URL scheme | `pulsecpr://` |
