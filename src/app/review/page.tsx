import Link from "next/link"
import { AddClassFromPhoneGuide } from "@/components/admin/add-class-from-phone"
import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { createMetadata } from "@/lib/seo"
import { courses, siteConfig } from "@/lib/site"

export const metadata = {
  ...createMetadata({
    title: "Client review and go-live lists",
    description:
      "Private draft checklist for Christine Oldenburg and the Pulse CPR website builder. Not a public marketing page.",
    path: "/review",
  }),
  robots: { index: false, follow: false },
}

const pagesToReview = [
  { href: "/", label: "Home", note: "First impression, phone, and booking" },
  { href: "/about", label: "About", note: "Your name and bio placeholder" },
  { href: "/class-calendar", label: "Class calendar", note: "Empty until you add dates from your phone" },
  { href: "/review#add-a-class", label: "Add a class from your phone", note: "Step-by-step for Safari or Chrome" },
  { href: "/cpr-certification", label: "CPR", note: `Listed at ${courses[0].price}` },
  { href: "/first-aid-training", label: "First Aid", note: `Listed at ${courses[1].price}` },
  { href: "/aed-training", label: "AED", note: `Listed at ${courses[2].price}` },
  { href: "/healthcare-provider-courses", label: "BLS / ACLS / PALS", note: `Listed at ${courses[3].price}` },
  { href: "/corporate-training", label: "On-site / corporate", note: "Group quote form" },
  { href: "/testimonials", label: "Reviews", note: "Your real Facebook reviews" },
  { href: "/contact", label: "Contact", note: "Phone, email, Edmond address" },
]

const christineActions = [
  {
    title: "Walk the draft and mark what to change",
    detail:
      "Use the page list below. Reply with “approved,” or send a punch list (wrong price, wrong hours, wording you would never say, missing course, etc.).",
  },
  {
    title: "Send your resume",
    detail:
      "That becomes your About bio and credentials. Until it arrives, the site shows a placeholder.",
  },
  {
    title: "Send a photo of you (and the classroom if you have one)",
    detail:
      "A headshot or teaching photo. Right now the About card uses your initials, and course photos are stock images.",
  },
  {
    title: "Confirm the business facts already on the site",
    detail: `Phone ${siteConfig.phone}. Email ${siteConfig.email}. Classroom ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}. Hours: weekdays 8:00 AM–6:00 PM, Saturday 9:00 AM–2:00 PM, Sunday by appointment. Legal name on the site: ${siteConfig.legalName}.`,
  },
  {
    title: "Confirm prices",
    detail:
      "CPR $95.00 (4–5 hours; card typically ready in 4 to 5 hours) · First Aid $69 · AED $59 · provider CPR $95 · corporate is a custom quote · on-site minimum six students. Tell us if any of that is wrong.",
  },
  {
    title: "Confirm which cards you issue",
    detail:
      "AHA Training Site, Red Cross, ASHI, or another card. The draft says training follows current AHA/ECC science and that students get a nationally recognized eCard. We will match the wording to the card you actually issue.",
  },
  {
    title: "Confirm cancellation and same-day eCards",
    detail:
      "Draft policy: free reschedule with 48 hours’ notice; same-day cancel may forfeit the seat. eCards typically same business day. Change either if that is not how you run class.",
  },
  {
    title: "Add real class dates from your phone",
    detail:
      "The public calendar is empty on purpose. Follow How to add a class from your phone on this page: sign in at /admin/login, tap New class, and students will see the date on Schedule.",
  },
  {
    title: "Confirm the live domain",
    detail:
      "Plan is PulseCPROK.com. Say if you want www, a redirect from another name, or a different domain.",
  },
  {
    title: "Say who should get website inquiries",
    detail: `Default is ${siteConfig.email}. If booking requests should also go to a second inbox, send that address.`,
  },
]

const builderActions = [
  {
    title: "Deploy the site to Vercel (or equivalent) from GitHub main",
    detail: "Connect github.com/robnewark-cpu/pulse-cpr-website. Production branch: main.",
  },
  {
    title: "Point PulseCPROK.com DNS at the host",
    detail:
      "Apex + www. SSL is issued automatically on Vercel. Domain does not resolve yet — this is the actual public go-live switch.",
  },
  {
    title: "Set production environment variables",
    detail:
      "NEXT_PUBLIC_SITE_URL=https://pulsecprok.com. NEXT_PUBLIC_SQUARE_PAY_URL if you have a Square payment or invoice link. Leave NEXT_PUBLIC_DRAFT_MODE unset so the yellow draft bar disappears.",
  },
  {
    title: "Make forms actually deliver",
    detail:
      "Set FORM_WEBHOOK_URL (Formspree, Make, Zapier, or Resend) so contact, book, quote, and newsletter go to Pulse.CPR2024@gmail.com. Test one real submission before telling Christine it is live.",
  },
  {
    title: "Drop /review after she approves, or keep it noindex",
    detail:
      "This page is already noindex. Still remove it once the punch list is done so students never land here.",
  },
  {
    title: "Same day if she replies in time: bio, photo, prices, card wording",
    detail:
      "Paste resume into instructors[0] in src/lib/site.ts, add her photo, correct prices, and replace AHA/eCard language to match the card she issues.",
  },
  {
    title: "Calendar: connect Supabase if it is not on yet, then she adds dates",
    detail:
      "The public calendar stays empty until she posts a class. For live registration: create a Supabase project, run supabase/schema.sql, add URL + anon key, create her /admin login. If demo dates were already inserted, run supabase/clear-classes.sql.",
  },
  {
    title: "Optional today, not required to publish",
    detail:
      "Google Analytics, Resend confirmation emails, Square payment link, replace remaining Unsplash photos, custom logo if she has a better file.",
  },
  {
    title: "Google Business Profile (AI and Maps visibility)",
    detail: `Claim or create the Google Business Profile with this exact NAP so Google and AI answers match the website: Pulse CPR; ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}; ${siteConfig.phone}; website https://pulsecprok.com/; hours Monday–Friday 8:00 AM–6:00 PM, Saturday 9:00 AM–2:00 PM, Sunday by appointment. Primary categories: CPR class and First aid class. Do not invent Google reviews. Link the Facebook page Pulse.CPR.`,
  },
]

export default function ReviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Private draft"
        title="Christine, this is your Pulse CPR website draft."
        description="This page is the approval packet. The rest of the site is the dummy students would see. It is not live on PulseCPROK.com yet. Send your answers to Rob — the person who sent you this link."
        primaryCta={{ href: "/", label: "Start at the home page" }}
        secondaryCta={{ href: "/about", label: "See your instructor page" }}
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Already real
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-navy/85">
              <li>• Your name as the only instructor: Christine Oldenburg</li>
              <li>• Edmond classroom, phone, and email</li>
              <li>• Facebook reviews (not invented Google reviews)</li>
              <li>• Class calendar we built for Pulse CPR — not Google Calendar</li>
              <li>• Course pages, corporate quote, contact, and book flows</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-accent p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Still placeholder
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-navy/85">
              <li>• Your bio and credentials (waiting on resume)</li>
              <li>• Your photo (initials “CO” for now)</li>
              <li>• Stock photos on course pages</li>
              <li>• Public calendar is empty until you add a class</li>
              <li>• Forms on this draft do not email you yet</li>
              <li>• Legal name {siteConfig.legalName} — confirm or correct</li>
            </ul>
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-16" id="add-a-class">
        <Container className="max-w-3xl">
          <AddClassFromPhoneGuide />
        </Container>
      </section>
      <section className="bg-accent/40 py-12 sm:py-16">
        <Container>
          <h2 className="text-2xl font-bold sm:text-3xl">Pages to click</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            You do not need to read every word. Check that the story, prices, and contact info sound like Pulse CPR.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {pagesToReview.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-navy/10 transition hover:ring-primary/40"
                >
                  <p className="font-semibold text-navy">{item.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-12 sm:py-16" id="christine">
        <Container>
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            For Christine
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">What we need from you</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Reply in one message if you can. Items 1, 4, 5, 6, and 9 are enough to put PulseCPROK.com on the internet today. Resume and photo can follow without holding the launch.
          </p>
          <ol className="mt-8 grid gap-4">
            {christineActions.map((item, index) => (
              <li key={item.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10 sm:p-6">
                <p className="text-sm font-semibold text-primary">{index + 1}.</p>
                <h3 className="mt-1 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="bg-navy py-12 text-white sm:py-16" id="builder">
        <Container>
          <p className="text-sm font-semibold tracking-[0.16em] text-red-200 uppercase">
            For Rob — go live today
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Builder action list</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Do 1–4 in order. That is a public PulseCPROK.com. Everything after that can ship the same day if Christine replies, or the next morning if she does not.
          </p>
          <ol className="mt-8 grid gap-4">
            {builderActions.map((item, index) => (
              <li key={item.title} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 sm:p-6">
                <p className="text-sm font-semibold text-red-200">{index + 1}.</p>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{item.detail}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
