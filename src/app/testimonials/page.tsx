import { PageHero } from "@/components/sections/page-hero"
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { siteConfig, testimonials } from "@/lib/site"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: "Facebook Reviews",
  description:
    "Read real Pulse.CPR student reviews from Facebook. All 10 public reviews recommend the class.",
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
            sameAs: [siteConfig.social.facebook, siteConfig.social.facebookReviews],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: testimonials.length,
              bestRating: "5",
              worstRating: "1",
            },
            review: testimonials.map((item) => ({
              "@type": "Review",
              author: { "@type": "Person", name: item.name },
              datePublished: item.date,
              reviewBody: item.quote,
              url: siteConfig.social.facebookReviews,
              publisher: {
                "@type": "Organization",
                name: "Facebook",
                url: "https://www.facebook.com",
              },
              reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5",
              },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Facebook · 10 reviews · 100% recommend"
        title="What students say after class"
        description="These are the public reviews on the Pulse.CPR Facebook page. We do not display Google reviews. Read the originals on Facebook, or book a class here."
        primaryCta={{ href: "/book", label: "Book a class" }}
      />
      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Source: Pulse.CPR Facebook reviews
            </p>
            <a
              href={siteConfig.social.facebookReviews}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Open Facebook reviews
            </a>
          </div>
          <TestimonialCarousel />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {testimonials.map((item) => (
              <figure key={item.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
                <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                  Recommends on Facebook
                </p>
                <blockquote className="mt-4 text-sm leading-6 text-navy/85">“{item.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold text-navy">{item.name}</span>
                  <span className="text-muted-foreground"> · {item.date} · Facebook</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Join the next class"
        description="Public seats and private on-site sessions are open. See why Facebook reviewers recommend Pulse CPR."
        primary={{ href: "/class-calendar", label: "View calendar" }}
        secondary={{ href: "/contact", label: "Talk with us" }}
      />
    </>
  )
}
