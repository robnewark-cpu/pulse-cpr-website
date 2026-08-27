import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Website terms for Pulse CPR class information, bookings, and training content.",
  path: "/terms",
})

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of use"
        description="These terms cover use of the Pulse CPR website and class inquiry tools."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-5 text-sm leading-7 text-muted-foreground">
          <p>
            Course descriptions, prices, and calendar seats can change. Class payments are processed by {siteConfig.payments.processor}. A seat is confirmed after payment, not when a form is submitted. Completion cards are issued to students who meet skills requirements.
          </p>
          <p>
            Website content is for general information and does not replace medical advice or emergency care. Call 911 for a medical emergency.
          </p>
          <p>
            Questions about these terms: {siteConfig.email}.
          </p>
        </Container>
      </section>
    </>
  )
}
