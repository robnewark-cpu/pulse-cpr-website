import Image from "next/image"
import Link from "next/link"
import { ArrowRight, HeartPulse, Building2, Stethoscope } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { ServiceCards } from "@/components/sections/service-cards"
import { TrustBar } from "@/components/sections/trust-bar"
import { InstructorGrid } from "@/components/sections/instructor-grid"
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaBanner } from "@/components/sections/cta-banner"
import { LeadCaptureForm } from "@/components/forms/lead-capture-form"
import { JsonLd } from "@/components/seo/json-ld"
import { buttonVariants } from "@/components/ui/button-variants"
import { createMetadata, faqJsonLd, howToGetCertifiedJsonLd } from "@/lib/seo"
import { faqs, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata = createMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
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
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <Image
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80"
          alt="Healthcare professionals practicing emergency response skills in a training setting"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy/40" />
        <Container className="relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <FadeIn>
            <p className="text-sm font-semibold tracking-[0.18em] text-red-200 uppercase">
              Edmond · Statewide on-site
            </p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              CPR certification that holds up when seconds matter.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Pulse CPR trains workplaces, schools, and healthcare teams across
              Oklahoma. Guideline-based instruction, hands-on practice, and
              cards processed the same day.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/book"
                className={cn(buttonVariants({ size: "xl" }), "justify-center")}
              >
                Book a class
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/corporate-training"
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "justify-center border-white/30 bg-transparent text-white hover:bg-white/10"
                )}
              >
                Corporate quote
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <dt className="text-xs tracking-wide text-white/60 uppercase">Classroom</dt>
                <dd className="mt-1 text-sm font-medium">Edmond</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-white/60 uppercase">Call</dt>
                <dd className="mt-1 text-sm font-medium">
                  <a href={siteConfig.phoneHref} className="hover:underline">
                    {siteConfig.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-white/60 uppercase">Cards</dt>
                <dd className="mt-1 text-sm font-medium">Same-day eCards</dd>
              </div>
            </dl>
          </FadeIn>
          <FadeIn delay={0.12} className="rounded-2xl bg-white p-6 text-navy shadow-xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              Online booking
            </p>
            <h2 className="mt-2 text-2xl font-bold">Reserve the next open seat</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us who you are certifying. A coordinator confirms dates within one business day.
            </p>
            <div className="mt-5">
              <LeadCaptureForm compact />
            </div>
          </FadeIn>
        </Container>
      </section>
      <TrustBar />
      <section className="border-b py-10">
        <Container>
          <dl
            data-speakable="true"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div>
              <dt className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                Entity
              </dt>
              <dd className="mt-2 text-sm leading-6 text-navy">
                Pulse CPR / Pulse.CPR. Oklahoma CPR, AED, First Aid, BLS, ACLS, and PALS training.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                Geography
              </dt>
              <dd className="mt-2 text-sm leading-6 text-navy">
                Edmond classroom at 1019 Waterwood Pkwy, plus on-site training in Oklahoma City, Norman, Tulsa, Lawton, and statewide.
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                Reviews
              </dt>
              <dd className="mt-2 text-sm leading-6 text-navy">
                10 public Facebook reviews, all recommend.{" "}
                <Link href="/testimonials" className="font-medium text-primary hover:underline">
                  Read them here
                </Link>
                .
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                Book
              </dt>
              <dd className="mt-2 text-sm leading-6 text-navy">
                Online at /book, or group quotes for six or more students. eCards typically same business day.
              </dd>
            </div>
          </dl>
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Certification paths
            </p>
            <h2 className="mt-2 text-3xl font-bold">Training matched to the people who need it</h2>
            <p className="mt-3 text-muted-foreground">
              Public classes in Edmond and on-site sessions for companies, schools, clinics, and agencies.
            </p>
          </div>
          <ServiceCards />
        </Container>
      </section>
      <section className="bg-accent/50 py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80"
                alt="Clinician reviewing patient information during coordinated emergency care"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Why Pulse CPR
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              High-trust instruction for HR, credentialing, and first-time students.
            </h2>
            <ul className="mt-6 space-y-5">
              {[
                {
                  icon: HeartPulse,
                  title: "Skills first, not slides first",
                  body: "Manikin time is protected. Students leave having actually performed compressions, breaths, and AED prompts.",
                },
                {
                  icon: Building2,
                  title: "Built for Oklahoma employers",
                  body: "Shift-aware scheduling, group invoices, and reporting that safety officers can file without extra chasing.",
                },
                {
                  icon: Stethoscope,
                  title: "Healthcare-ready faculty",
                  body: "ER nurses, paramedics, and PAs teach BLS, ACLS, and PALS to the standard hospitals expect.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-4">
                  <item.icon className="mt-1 size-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-navy">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "xl" }), "mt-8")}>
              Meet the instructors
            </Link>
          </FadeIn>
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mb-10">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Faculty
            </p>
            <h2 className="mt-2 text-3xl font-bold">Instructors who still work the floor</h2>
          </div>
          <InstructorGrid />
        </Container>
      </section>
      <section className="bg-accent/40 py-14 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
                Proof
              </p>
              <h2 className="mt-2 text-3xl font-bold">Facebook reviews from real students</h2>
            </div>
            <Link href="/testimonials" className={cn(buttonVariants({ variant: "outline" }))}>
              Read Facebook reviews
            </Link>
          </div>
          <TestimonialCarousel />
        </Container>
      </section>
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold">Clear answers before you book</h2>
            <p className="mt-3 text-muted-foreground">
              Still deciding between Heartsaver and BLS? Call {siteConfig.phone} and we will place you correctly.
            </p>
          </div>
          <FaqAccordion />
        </Container>
      </section>
      <CtaBanner
        title="Get your team certified this month."
        description="Public seats in Edmond or an instructor at your door. Book online or request a corporate quote."
        primary={{ href: "/book", label: "Book a class" }}
        secondary={{ href: "/corporate-training", label: "Corporate quote" }}
      />
    </>
  )
}
