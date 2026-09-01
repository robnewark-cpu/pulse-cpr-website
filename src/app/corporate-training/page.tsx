import { PageHero } from "@/components/sections/page-hero"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { CorporateQuoteForm } from "@/components/forms/corporate-quote-form"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { siteConfig } from "@/lib/site"

export const metadata = createMetadata({
  title: "Corporate CPR Training in Oklahoma",
  description:
    "On-site CPR, AED, First Aid, and BLS training for Oklahoma businesses, schools, healthcare facilities, and government agencies. Request a group quote.",
  keywords: [
    "on-site CPR training Oklahoma",
    "corporate CPR class Oklahoma City",
    "group BLS training Oklahoma",
  ],
  path: "/corporate-training",
})

const audiences = [
  {
    title: "Workplaces",
    body: "Offices, plants, warehouses, and field crews trained around shift change so production does not stop.",
  },
  {
    title: "Healthcare facilities",
    body: "Clinics, dental offices, home health, and hospital units that need Basic Life Support on a credentialing calendar.",
  },
  {
    title: "Schools and childcare",
    body: "Teacher workdays, after-school staff, and licensed childcare teams with pediatric CPR and first aid.",
  },
  {
    title: "Government and agencies",
    body: "City, county, and state teams with invoice processes, security access, and after-hours needs.",
  },
]

export default function CorporateTrainingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Corporate Training", path: "/corporate-training" },
        ])}
      />
      <PageHero
        eyebrow="On-site across Oklahoma"
        title="Corporate training that comes to your roster, not the other way around."
        description={`Pulse CPR brings the instructor, manikins, and AED trainers to your location. Serving ${siteConfig.serviceArea.slice(0, 5).join(", ")}, and statewide Oklahoma.`}
        primaryCta={{ href: "#quote", label: "Request a quote" }}
        secondaryCta={{ href: "/class-calendar", label: "See public classes" }}
      />
      <section className="py-14 sm:py-20">
        <Container>
          <h2 className="text-3xl font-bold">Who we train</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {audiences.map((item) => (
              <article key={item.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-accent/40 py-14 sm:py-20" id="quote">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
              Group pricing
            </p>
            <h2 className="mt-2 text-3xl font-bold">Request a corporate quote</h2>
            <p className="mt-3 text-muted-foreground">
              Share your headcount, city, and deadline. Most Oklahoma employers receive pricing the same business day. Minimum six students for on-site sessions.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-navy/80">
              <li>• Travel included for Oklahoma City metro</li>
              <li>• Statewide travel quoted by zip code</li>
              <li>• Split sessions for nights and weekends</li>
              <li>• Completion roster for HR and safety files</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8">
            <CorporateQuoteForm />
          </div>
        </Container>
      </section>
      <CtaBanner
        title="Prefer to send a few people to the classroom?"
        description="Public Heartsaver, First Aid, AED, and Basic Life Support seats are open in Edmond most weeks."
        primary={{ href: "/book", label: "Book individual seats" }}
        secondary={{ href: "/contact", label: "Ask a coordinator" }}
      />
    </>
  )
}
