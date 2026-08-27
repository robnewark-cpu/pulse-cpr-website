import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { BookingForm } from "@/components/forms/booking-form"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { courseSelectOptions } from "@/lib/site"

export const metadata = createMetadata({
  title: "Book a CPR Class",
  description:
    "Request a Pulse CPR class seat or on-site session in Oklahoma. We confirm availability within one business day.",
  path: "/book",
})

const courseAliases: Record<string, string> = {
  "cpr-certification": "cpr",
  "first-aid-training": "first-aid",
  "aed-training": "aed",
  "healthcare-provider-courses": "bls",
  "corporate-training": "corporate",
  healthcare: "bls",
  cpr: "cpr",
  "first aid": "first-aid",
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string; date?: string }>
}) {
  const params = await searchParams
  const raw = (params.course ?? "").toLowerCase()
  const mapped = courseAliases[raw] ?? raw
  const defaultCourse = courseSelectOptions.some((option) => option.value === mapped)
    ? mapped
    : undefined

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a class", path: "/book" },
        ])}
      />
      <PageHero
        eyebrow="Online booking"
        title="Reserve a seat or request a private date"
        description="Public seats are listed on the class calendar when posted. Use this form for a custom date, on-site session, or if you are not sure which course you need. Payments are processed by Aegis Pay."
      />
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8">
            <BookingForm defaultCourse={defaultCourse} />
          </div>
        </Container>
      </section>
    </>
  )
}
