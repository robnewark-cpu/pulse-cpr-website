import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { resources } from "@/lib/site"

export const metadata = createMetadata({
  title: "CPR Resources",
  description:
    "Guides for Oklahoma employers and students: workplace first aid, AED readiness, BLS vs Heartsaver, and how often to renew CPR certification.",
  path: "/resources",
})

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />
      <PageHero
        eyebrow="Guides"
        title="Clear resources for HR, educators, and clinicians"
        description="Practical articles from Pulse CPR. No scare tactics—just what Oklahoma teams need to keep cards current and AEDs ready."
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-5 md:grid-cols-2">
          {resources.map((article) => (
            <article
              key={article.slug}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10"
            >
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {article.category} · {article.readTime}
              </p>
              <h2 className="mt-3 text-xl font-semibold">
                <Link href={`/resources/${article.slug}`} className="hover:text-primary">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                {article.excerpt}
              </p>
              <Link
                href={`/resources/${article.slug}`}
                className="mt-4 text-sm font-medium text-primary hover:underline"
              >
                Read article
              </Link>
            </article>
          ))}
        </Container>
      </section>
    </>
  )
}
