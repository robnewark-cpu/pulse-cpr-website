import { PageHero } from "@/components/sections/page-hero"
import { ClassCalendar } from "@/components/calendar/class-calendar"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, classEventJsonLd, createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Class Calendar",
  description:
    "Upcoming Pulse CPR classes in Oklahoma City: Heartsaver CPR, First Aid, AED, BLS, ACLS, and PALS. Book a seat or request an on-site date.",
  path: "/class-calendar",
})

export default function ClassCalendarPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Class Calendar", path: "/class-calendar" },
          ]),
          ...classEventJsonLd(),
        ]}
      />
      <PageHero
        eyebrow="Oklahoma City classroom"
        title="Upcoming certification dates"
        description="Filter by course type and reserve a seat. Need a private date at your facility? Request a corporate session instead of a public class."
        primaryCta={{ href: "/book", label: "Book a class" }}
        secondaryCta={{ href: "/corporate-training", label: "Request on-site training" }}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <ClassCalendar />
        </Container>
      </section>
      <CtaBanner
        title="Do not see a date that works?"
        description="We add weeknight and Saturday seats as demand grows, and we can open a private class for six or more students."
        primary={{ href: "/contact", label: "Ask for another date" }}
        secondary={{ href: "/book", label: "Join the next opening" }}
      />
    </>
  )
}
