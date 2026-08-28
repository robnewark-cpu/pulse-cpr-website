import Link from "next/link"
import { HomeClasses } from "@/components/sections/home-classes"
import { HomeCorporate } from "@/components/sections/home-corporate"
import { HomeHero } from "@/components/sections/home-hero"
import { TrustBar } from "@/components/sections/trust-bar"
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { ClassFacts } from "@/components/sections/class-facts"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { buttonVariants } from "@/components/ui/button-variants"
import { createMetadata, faqJsonLd, howToGetCertifiedJsonLd } from "@/lib/seo"
import { faqs, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: siteConfig.name,
  description:
    "Pulse CPR — Learn It. Know It. Save A Life. CPR certification is $75 in Edmond, OK. First Aid $69, AED $59, BLS Provider $95. Hours: Monday–Friday 8:00 AM – 6:00 PM, Saturday 9:00 AM – 2:00 PM. Call (405) 763-6811.",
  path: "/",
  keywords: [
    "CPR certification Oklahoma City",
    "BLS class OKC",
    "AED training Oklahoma",
    "corporate CPR training",
    "CPR class Edmond",
    "CPR training Norman",
    "Pulse.CPR",
  ],
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(faqs), howToGetCertifiedJsonLd()]} />
      <HomeHero />
      <TrustBar />
      <ClassFacts />
      <HomeClasses />
      <HomeCorporate />
      <section className="bg-[#F5F6F8] py-14 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Student reviews
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                5-star instruction, convenience, and care
              </h2>
            </div>
            <Link href="/testimonials" className={cn(buttonVariants({ variant: "outline" }))}>
              Read Facebook reviews
            </Link>
          </div>
          <TestimonialCarousel />
        </Container>
      </section>
      <section className="py-14 sm:py-20" aria-labelledby="home-faq-heading">
        <Container className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            FAQs
          </p>
          <h2 id="home-faq-heading" className="mt-2 text-3xl font-extrabold tracking-tight">
            Oklahoma CPR certification questions
          </h2>
          <p className="mt-3 text-muted-foreground" data-speakable="true">
            Answers for Edmond, Oklahoma City, and statewide Pulse CPR classes. More local detail is
            on the{" "}
            <Link href="/oklahoma-cpr-training" className="font-semibold text-navy underline-offset-4 hover:underline">
              Oklahoma CPR training
            </Link>{" "}
            page.
          </p>
          <div className="mt-8">
            <FaqAccordion />
          </div>
        </Container>
      </section>
      <CtaBanner
        variant="red"
        title="Be Ready When Every Second Counts"
        description="Register for CPR training today."
        primary={{ href: "/book", label: "Register Now" }}
      />
    </>
  )
}
