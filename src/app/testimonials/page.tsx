import { PageHero } from "@/components/sections/page-hero"
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { siteConfig, testimonials } from "@/lib/site"
import { Star } from "lucide-react"

export const metadata = createMetadata({
  title: "Testimonials",
  description:
    "Reviews from Oklahoma schools, clinics, restaurants, and construction teams who certified with Pulse CPR.",
  path: "/testimonials",
})

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            review: testimonials.map((item) => ({
              "@type": "Review",
              author: { "@type": "Person", name: item.name },
              reviewBody: item.quote,
              reviewRating: {
                "@type": "Rating",
                ratingValue: item.rating,
                bestRating: 5,
              },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="4.9 / 5 average"
        title="What Oklahoma teams say after class"
        description="School districts, clinics, hospitality groups, and industrial safety managers book Pulse CPR because the instruction is calm, current, and easy to schedule."
        primaryCta={{ href: "/book", label: "Book a class" }}
        secondaryCta={{ href: "/corporate-training", label: "Train a team" }}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <TestimonialCarousel />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
                <div className="flex gap-0.5 text-primary" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-6 text-navy/85">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-navy">{item.name}</span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {item.title}, {item.org}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Join the next Oklahoma class"
        description="Public seats and private on-site sessions are booking for September and October."
        primary={{ href: "/class-calendar", label: "View calendar" }}
        secondary={{ href: "/contact", label: "Talk with us" }}
      />
    </>
  )
}
