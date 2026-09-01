import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import { PageHero } from "@/components/sections/page-hero"
import { CtaBanner } from "@/components/sections/cta-banner"
import { FaqAccordion } from "@/components/sections/faq-accordion"
import { Container } from "@/components/layout/container"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from "@/lib/seo"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function CoursePage({
  title,
  eyebrow,
  description,
  image,
  imageAlt,
  audience,
  duration,
  price,
  outcomes,
  agenda,
  faqs,
  path,
}: {
  title: string
  eyebrow: string
  description: string
  image: string
  imageAlt: string
  audience: string
  duration: string
  price: string
  outcomes: string[]
  agenda: { title: string; detail: string }[]
  faqs: { question: string; answer: string }[]
  path: string
}) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
          courseJsonLd({ name: title, description, path, price, duration }),
          faqJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        primaryCta={{ href: `/book?course=${path.replace("/", "")}`, label: "Book this course" }}
        secondaryCta={{ href: "/class-calendar", label: "See class dates" }}
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <h2 className="mt-10 text-2xl font-bold">What you will be able to do</h2>
            <ul className="mt-5 grid gap-3">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-navy/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="mt-10 text-2xl font-bold">Class flow</h2>
            <ol className="mt-5 space-y-4">
              {agenda.map((item, index) => (
                <li key={item.title} className="rounded-xl bg-accent/60 p-4">
                  <p className="text-sm font-semibold text-navy">
                    {index + 1}. {item.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10 lg:sticky lg:top-28">
            <p className="text-sm font-semibold tracking-[0.14em] text-primary uppercase">
              Course snapshot
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b pb-3">
                <dt className="text-muted-foreground">Audience</dt>
                <dd className="text-right font-medium text-navy">{audience}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="font-medium text-navy">{duration}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-medium text-navy">{price}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Card validity</dt>
                <dd className="font-medium text-navy">2 years</dd>
              </div>
            </dl>
            <Link href={`/book?course=${path.replace("/", "")}`} className={cn(buttonVariants({ size: "xl" }), "mt-6 w-full")}>
              Reserve a seat
            </Link>
            <Link
              href="/corporate-training"
              className={cn(buttonVariants({ size: "xl", variant: "outline" }), "mt-3 w-full")}
            >
              Train a team
            </Link>
          </aside>
        </Container>
      </section>
      <section className="bg-accent/40 py-12 sm:py-16">
        <Container className="max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">Questions about this course</h2>
          <FaqAccordion items={faqs} />
        </Container>
      </section>
      <CtaBanner
        title="Need this training at your Oklahoma workplace?"
        description="Six or more students usually makes an on-site session faster and more cost-effective than sending people to the classroom."
        primary={{ href: "/corporate-training", label: "Request a quote" }}
        secondary={{ href: "/contact", label: "Talk with a coordinator" }}
      />
    </>
  )
}
