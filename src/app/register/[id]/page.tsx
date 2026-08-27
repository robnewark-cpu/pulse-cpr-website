import { notFound } from "next/navigation"
import { PageHero } from "@/components/sections/page-hero"
import { Container } from "@/components/layout/container"
import { RegisterForm } from "@/components/calendar/register-form"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { formatClassDate, formatPrice, formatTimeRange, isRegistrationOpen } from "@/lib/tms/format"
import { getPublicClass } from "@/lib/tms/queries"
import { siteConfig } from "@/lib/site"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getPublicClass(id)
  if (!session) return {}
  return createMetadata({
    title: `Register: ${session.name}`,
    description: `Reserve a seat in ${session.name} on ${session.class_date} at Pulse CPR in Edmond.`,
    path: `/register/${session.id}`,
  })
}

export default async function RegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getPublicClass(id)
  if (!session) notFound()
  const open = isRegistrationOpen(session)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Class Calendar", path: "/class-calendar" },
          { name: session.name, path: `/register/${session.id}` },
        ])}
      />
      <PageHero
        eyebrow={session.course_type}
        title={session.name}
        description={`${formatClassDate(session.class_date)} · ${formatTimeRange(session.start_time, session.end_time)} · ${session.location}`}
      />
      <section className="py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm text-muted-foreground">{session.description}</p>
            <dl className="mt-6 grid gap-3 text-sm">
              <div>
                <dt className="font-medium text-navy">Instructor</dt>
                <dd className="text-muted-foreground">{session.instructor}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy">Price</dt>
                <dd className="text-muted-foreground">{formatPrice(session.price)}</dd>
              </div>
              <div>
                <dt className="font-medium text-navy">Seats remaining</dt>
                <dd className="text-muted-foreground">
                  {session.seats_remaining} of {session.seats_available}
                </dd>
              </div>
            </dl>
            <p className="mt-6 text-sm text-muted-foreground">
              Payments are processed by {siteConfig.payments.processor}. Questions? Call {siteConfig.phone} or email {siteConfig.email}.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
            {open ? (
              <RegisterForm session={session} />
            ) : (
              <p className="text-sm text-muted-foreground">
                Registration is closed for this class. Pick another date on the calendar or call us.
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}
