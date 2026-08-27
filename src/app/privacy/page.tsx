import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { createMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How Pulse CPR collects and uses inquiry information for class booking and corporate quotes.",
  path: "/privacy",
})

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="Pulse CPR collects only what we need to schedule training, issue cards, and answer your questions."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl space-y-5 text-sm leading-7 text-muted-foreground">
          <p>
            {siteConfig.legalName} (“Pulse CPR”) operates {siteConfig.url}. When you submit a booking, quote, contact, or newsletter form, we use your name, email, phone, and training details to respond and to deliver class logistics.
          </p>
          <p>
            Class payments are processed by {siteConfig.payments.processor}. Pulse CPR does not store credit or debit card numbers on this website. Payment details you enter on {siteConfig.payments.processor} are handled by that processor.
          </p>
          <p>
            We do not sell personal information. Form data may be processed by our email or webhook provider if those services are configured. Analytics run only when a measurement ID is present.
          </p>
          <p>
            To request deletion or a copy of your inquiry data, email {siteConfig.email}. This policy may be updated as our operations change.
          </p>
        </Container>
      </section>
    </>
  )
}
