import { PageHero } from "@/components/sections/page-hero"
import { PublicClassCalendar } from "@/components/calendar/class-calendar"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, classEventJsonLd, createMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"
import { listPublicClasses } from "@/lib/tms/queries"
import { isSupabaseConfigured } from "@/lib/tms/types"

export const dynamic = "force-dynamic"

export const metadata = createMetadata({
  title: "Class Calendar",
  description:
    "Pulse CPR class calendar in Edmond. Public dates appear here after the instructor posts them. Request a private date anytime.",
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
        title="Class calendar"
        description="Public certification dates appear here when Pulse CPR posts them. Request a private or on-site date anytime."
        primaryCta={{ href: "/book", label: "Request a private date" }}
        secondaryCta={{ href: "/corporate-training", label: "On-site training" }}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-10 max-w-3xl" data-speakable="true">
            <h2 className="text-2xl font-bold">When Pulse CPR holds public classes</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Public Heartsaver CPR ($95.00, 4 to 5 hours), First Aid ($69), AED ($59), and BLS Provider ($95) classes
              typically run weeknights and Saturdays at {siteConfig.address.street},{" "}
              {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}.
              Edmond classroom hours are Monday–Friday 8:00 AM – 6:00 PM and Saturday 9:00 AM – 2:00
              PM; Sunday is by appointment. If no date is listed below, call {siteConfig.phone} or
              request a private class.
            </p>
          </div>
          <PublicClassCalendar classes={classes} liveRegistration={isSupabaseConfigured()} />
        </Container>
      </section>
      <CtaBanner
        title="Do not see a date that works?"
        description={`Ask for another public date, or request a private class for six or more students. Payments are processed by ${siteConfig.payments.processor}.`}
        primary={{ href: "/contact", label: "Ask for another date" }}
        secondary={{ href: "/book", label: "Request a custom date" }}
      />
    </>
  )
}
