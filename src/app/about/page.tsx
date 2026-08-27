import { PageHero } from "@/components/sections/page-hero"
import { InstructorGrid } from "@/components/sections/instructor-grid"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata = createMetadata({
  title: "About Pulse CPR",
  description:
    "Meet the Oklahoma instructors behind Pulse CPR. Our mission is practical, guideline-based CPR, AED, BLS, and First Aid training that employers and clinicians can trust.",
  path: "/about",
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About Pulse CPR"
        title="A training company built for the moment someone actually needs help."
        description="Pulse CPR started in Oklahoma City to give workplaces and clinical teams instruction that feels like the real event: calm, specific, and practiced until it sticks."
        primaryCta={{ href: "/book", label: "Book a class" }}
        secondaryCta={{ href: "/contact", label: "Contact us" }}
      />
      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Mission</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              We exist so Oklahoma responders do not freeze. That means small classes, current science, and instructors who still work emergencies—not facilitators reading a script.
            </p>
            <p className="mt-4 text-muted-foreground leading-7">
              Pulse CPR is headquartered in {siteConfig.address.city}, with on-site programs across the metro, Tulsa, Norman, and statewide worksites.
            </p>
          </div>
          <div className="rounded-2xl bg-accent p-6 sm:p-8">
            <h2 className="text-2xl font-bold">How we teach</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-navy/85">
              <li>• Current AHA and ECC science, taught without marketing fluff.</li>
              <li>• High manikin-to-student ratios so every person gets measured practice.</li>
              <li>• Same-day nationally recognized eCards for HR and credentialing files.</li>
              <li>• Corporate reporting that names who trained, when, and when they renew.</li>
            </ul>
          </div>
        </Container>
      </section>
      <section className="bg-accent/40 py-14 sm:py-20">
        <Container>
          <h2 className="mb-8 text-3xl font-bold">Instructor credentials</h2>
          <InstructorGrid />
        </Container>
      </section>
      <CtaBanner
        title="Ready to train with Pulse CPR?"
        description="Join a public class in Oklahoma City or bring faculty to your facility."
        primary={{ href: "/class-calendar", label: "View calendar" }}
        secondary={{ href: "/corporate-training", label: "Plan on-site training" }}
      />
    </>
  )
}
