import { PageHero } from "@/components/sections/page-hero"
import { PublicClassCalendar } from "@/components/calendar/class-calendar"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, classEventJsonLd, createMetadata } from "@/lib/seo"
import { listPublicClasses } from "@/lib/tms/queries"
import { isSupabaseConfigured } from "@/lib/tms/types"

export const dynamic = "force-dynamic"

export const metadata = createMetadata({
  title: "Class Calendar",
  description:
    "Upcoming Pulse CPR classes in Edmond: Heartsaver CPR, First Aid, AED, BLS, ACLS, and PALS. Register online while seats remain.",
  path: "/class-calendar",
})

export default async function ClassCalendarPage() {
  const classes = await listPublicClasses()

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Class Calendar", path: "/class-calendar" },
          ]),
          ...classEventJsonLd(classes),
        ]}
      />
      <PageHero
        eyebrow="Edmond classroom"
        title="Upcoming certification dates"
        description="This is Pulse CPR’s class calendar — dates added in the instructor class manager, shown here for students. Pick a day, filter by course, and register while seats remain."
        primaryCta={{ href: "/book", label: "Request a private date" }}
        secondaryCta={{ href: "/corporate-training", label: "On-site training" }}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <PublicClassCalendar classes={classes} liveRegistration={isSupabaseConfigured()} />
        </Container>
      </section>
      <CtaBanner
        title="Do not see a date that works?"
        description="We add weeknight and Saturday seats as demand grows, and we can open a private class for six or more students."
        primary={{ href: "/contact", label: "Ask for another date" }}
        secondary={{ href: "/book", label: "Request a custom date" }}
      />
    </>
  )
}
