import { Mail, MapPin, Phone } from "lucide-react"
import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { ContactForm } from "@/components/forms/contact-form"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata = createMetadata({
  title: "Contact Pulse CPR",
  description:
    "Contact Pulse CPR in Oklahoma City for class questions, eCards, and corporate scheduling. Call, email, or send a message.",
  path: "/contact",
})

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(
    `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
  )

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="We're here"
        title="Talk with a Pulse CPR coordinator"
        description="Questions about the right course, a renewal deadline, or an on-site date for your Oklahoma team—send a note or call during business hours."
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
              <h2 className="text-xl font-semibold">Oklahoma City classroom</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.region} {siteConfig.address.postalCode}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <a href={siteConfig.phoneHref} className="text-navy hover:underline">
                    {siteConfig.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="text-navy hover:underline">
                    {siteConfig.email}
                  </a>
                </li>
              </ul>
              <h3 className="mt-6 font-semibold">Hours</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {siteConfig.hours.map((item) => (
                  <li key={item.day}>
                    {item.day}: {item.time}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-navy/10">
              <iframe
                title="Map of Pulse CPR Oklahoma City classroom"
                src={`https://maps.google.com/maps?q=${mapsQuery}&z=14&output=embed`}
                className="h-72 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8">
            <h2 className="text-xl font-semibold">Send a message</h2>
            <p className="mt-2 mb-6 text-sm text-muted-foreground">
              We reply within one business day. For same-day seat questions, call us.
            </p>
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  )
}
