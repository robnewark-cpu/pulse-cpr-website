import { notFound } from "next/navigation"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { CtaBanner } from "@/components/sections/cta-banner"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { articleJsonLd, breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { resources, siteConfig } from "@/lib/site"

const bodies: Record<string, string[]> = {
  "oklahoma-workplace-first-aid-requirements": [
    "OSHA does not publish a one-size first aid course for every Oklahoma employer. It does expect a workplace to be ready to treat injured employees until EMS arrives, and that readiness looks different in an office than on a jobsite.",
    "Most Pulse CPR clients pair Heartsaver CPR/AED with First Aid, identify who on each shift is responsible, and place an AED where a collapse would actually happen—not in a locked manager’s office.",
    "If you operate in healthcare, food service, construction, or education, tell us the industry on your quote form. We will recommend the shortest course that still satisfies insurers, licensing, or district policy.",
  ],
  "how-often-to-renew-cpr-certification": [
    "Heartsaver, First Aid, AED, and BLS cards are almost always issued for two years. Skills fade much faster than that, which is why we encourage annual refreshers for high-risk workplaces even when the card is still valid.",
    "Set a reminder 45 days before expiration. That window covers Edmond public classes and most corporate on-site lead times.",
    "If a card lapses, do not assume you can take a short renewal. Call us with the expiration date and we will place you in the correct track.",
  ],
  "oklahoma-aed-good-samaritan": [
    "Oklahoma, like other states, provides Good Samaritan protections that encourage trained people to help. An AED program still needs more than a device on the wall: current pads, a battery that will fire, and people who have practiced the prompts.",
    "Assign a monthly check. Pulse CPR can include a simple readiness log with corporate training so the device is not discovered dead during an emergency.",
    "Training should include the specific unit you own whenever possible. Bring the model name to class or list it on your booking form.",
  ],
  "bls-vs-heartsaver": [
    "BLS Provider is for healthcare professionals: nurses, EMTs, dentists, medical assistants, and students in clinical programs. It emphasizes high-performance CPR, bag-mask ventilation, and team roles.",
    "Heartsaver CPR/AED is for workplaces, teachers, coaches, and community responders. It covers adult, child, and infant CPR without the clinical team choreography.",
    "If HR is unsure, choose based on job role, not job title. A front-desk coordinator in a clinic may need BLS because credentialing says so. A warehouse lead usually needs Heartsaver plus First Aid.",
  ],
  "cpr-for-teachers-and-childcare": [
    "Oklahoma classrooms need pediatric CPR, choking response, and first aid more than they need a lecture. We schedule on teacher workdays and evenings so substitutes are not required.",
    "Licensed childcare often needs a combined pediatric CPR and first aid card. Tell us your licensing language and we will match the course.",
    "Coaches should not wait for a district-wide day. Public Saturday classes in Edmond keep cards from expiring mid-season.",
  ],
  "what-to-expect-in-a-bls-class": [
    "Plan on focused prework, then a morning of skills: compressions on measured manikins, AED practice, bag-mask, and two-rescuer cycles.",
    "Wear clothes you can move in. Bring an ID. Eat before you arrive—high-quality CPR is physical.",
    "When you pass, we process the provider eCard the same business day so credentialing is not waiting on mail.",
  ],
}

export function generateStaticParams() {
  return resources.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = resources.find((item) => item.slug === slug)
  if (!article) return {}
  return createMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/resources/${article.slug}`,
  })
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = resources.find((item) => item.slug === slug)
  if (!article) notFound()
  const paragraphs = bodies[article.slug] ?? [article.excerpt]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: article.title, path: `/resources/${article.slug}` },
          ]),
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/resources/${article.slug}`,
            datePublished: article.date,
          }),
        ]}
      />
      <PageHero
        eyebrow={`${article.category} · ${article.readTime} read`}
        title={article.title}
        description={article.excerpt}
      />
      <article className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-sm text-muted-foreground">
            Published {article.date} · {siteConfig.name} faculty
          </p>
          <div className="mt-8 space-y-5 text-base leading-7 text-navy/85">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-10 text-sm">
            <Link href="/resources" className="font-medium text-primary hover:underline">
              ← All resources
            </Link>
          </p>
        </Container>
      </article>
      <CtaBanner
        title="Put this into practice with a live class"
        description="Book a public seat or ask Pulse CPR to train your Oklahoma team on-site."
        primary={{ href: "/book", label: "Book a class" }}
        secondary={{ href: "/corporate-training", label: "Corporate quote" }}
      />
    </>
  )
}
