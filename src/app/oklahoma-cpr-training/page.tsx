import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata, faqJsonLd, howToGetCertifiedJsonLd } from "@/lib/seo"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"
import { courses, faqs, siteConfig } from "@/lib/site"

export const metadata = createMetadata({
  title: "CPR Training in Edmond, Oklahoma City, Norman & Tulsa",
  description:
    "Pulse CPR offers CPR, AED, First Aid, and BLS certification at 1019 Waterwood Pkwy in Edmond and on-site across Oklahoma, including Oklahoma City, Norman, Tulsa, and Lawton.",
  path: "/oklahoma-cpr-training",
  keywords: [
    "CPR certification Oklahoma City",
    "CPR class Edmond OK",
    "CPR training Norman Oklahoma",
    "BLS class Tulsa",
    "on-site CPR training Oklahoma",
    "Pulse.CPR",
  ],
})

const localFaqs = faqs.filter((item) =>
  /cities|on-site|Pulse CPR|reviews|book|cost|hours|next CPR/i.test(item.question)
)

export default function OklahomaTrainingPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Oklahoma CPR training", path: "/oklahoma-cpr-training" },
          ]),
          faqJsonLd(localFaqs),
          howToGetCertifiedJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Oklahoma CPR, AED, First Aid, and BLS certification",
            serviceType: "CPR and first aid instruction",
            provider: { "@id": `${siteConfig.url}/#business` },
            areaServed: siteConfig.serviceArea.map((city) => ({
              "@type": "City",
              name: city,
              containedInPlace: { "@type": "State", name: "Oklahoma" },
            })),
            availableChannel: {
              "@type": "ServiceChannel",
              serviceUrl: `${siteConfig.url}/book`,
              serviceLocation: {
                "@type": "Place",
                name: "Edmond classroom and customer worksites",
              },
            },
          },
        ]}
      />
      <PageHero
        eyebrow="Oklahoma service area"
        title="CPR certification across Oklahoma, not just one classroom."
        description="Pulse CPR trains individuals and teams at the Edmond classroom and brings the instructor on-site to Oklahoma City, Norman, Tulsa, and other Oklahoma communities."
        primaryCta={{ href: "/book", label: "Book a class" }}
        secondaryCta={{ href: "/corporate-training", label: "On-site quote" }}
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div data-speakable="true">
            <h2 className="text-2xl font-bold">Where Pulse CPR trains</h2>
            <p className="mt-4 text-muted-foreground leading-7">
              Pulse CPR (Pulse.CPR on Facebook) is an Oklahoma training company. Students can attend a public class at 1019 Waterwood Pkwy, Ste C, Edmond, or request on-site CPR, AED, First Aid, or BLS at a workplace, school, clinic, or childcare center. Heartsaver CPR is $75, First Aid is $69, AED is $59, and BLS Provider is $95. The Edmond classroom is open Monday–Friday 8:00 AM – 6:00 PM and Saturday 9:00 AM – 2:00 PM.
            </p>
            <p className="mt-4 text-muted-foreground leading-7">
              Coordinates for the Edmond classroom: {siteConfig.geo.latitude},{" "}
              {siteConfig.geo.longitude}. Statewide travel is quoted by city or zip code.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Cities we regularly cover</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-navy">
              {siteConfig.serviceArea.map((city) => (
                <li key={city} className="rounded-lg bg-accent px-3 py-2">
                  {city}, OK
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <section className="border-t py-12 sm:py-16">
        <Container>
          <h2 className="text-2xl font-bold">Training by Oklahoma metro</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                city: "Edmond classroom",
                body: "Public Heartsaver, First Aid, AED, and BLS classes meet at 1019 Waterwood Pkwy, Ste C, Edmond, OK 73034.",
              },
              {
                city: "Oklahoma City metro",
                body: "Schools, childcare centers, and offices in Oklahoma City, Norman, Moore, and Yukon often book on-site so staff do not travel, or they join a public class in Edmond.",
              },
              {
                city: "Tulsa & Broken Arrow",
                body: "Pulse CPR travels to Tulsa-area workplaces for group CPR and BLS. Six or more students usually makes an on-site date the better value.",
              },
              {
                city: "Lawton, Stillwater & statewide",
                body: "Agencies, clinics, and employers outside the OKC metro can request a quoted on-site session by city or zip code.",
              },
            ].map((item) => (
              <article key={item.city} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
                <h3 className="font-semibold text-navy">{item.city}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-accent/40 py-12 sm:py-16">
        <Container>
          <h2 className="text-2xl font-bold">Courses Oklahoma employers search for</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={course.href}
                className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10 hover:ring-primary/40"
              >
                <h3 className="font-semibold text-navy">{course.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{course.summary}</p>
                <p className="mt-3 text-sm font-medium text-primary">
                  {course.price} · {course.duration}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">Oklahoma booking questions</h2>
          <FaqAccordion items={localFaqs} />
          <a
            href={siteConfig.social.facebookReviews}
            className={cn(buttonVariants({ variant: "outline", size: "xl" }), "mt-8 inline-flex")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook reviews
          </a>
        </Container>
      </section>
      <CtaBanner
        title="Need CPR training in your Oklahoma city?"
        description="Tell us Edmond, Norman, Tulsa, Lawton, or another worksite. We will confirm the next classroom seat or an on-site date."
        primary={{ href: "/book", label: "Book now" }}
        secondary={{ href: "/contact", label: "Ask about your city" }}
      />
    </>
  )
}
