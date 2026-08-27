import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Container } from "@/components/layout/container"
import { NewsletterForm } from "@/components/forms/newsletter-form"
import { siteConfig } from "@/lib/site"

const footerNav = [
  {
    title: "Training",
    links: [
      { href: "/cpr-certification", label: "CPR Certification" },
      { href: "/first-aid-training", label: "First Aid Training" },
      { href: "/aed-training", label: "AED Training" },
      { href: "/healthcare-provider-courses", label: "Healthcare Provider Courses" },
      { href: "/corporate-training", label: "Corporate Training" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/class-calendar", label: "Class Calendar" },
      { href: "/resources", label: "Resources" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo className="[&_span]:text-white [&_span:last-child]:text-white/70" />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/75">
            Professional CPR, BLS, AED, and First Aid certification for Oklahoma
            workplaces, schools, and healthcare teams.
          </p>
        </div>
        {footerNav.map((group) => (
          <div key={group.title}>
            <p className="text-sm font-semibold tracking-wide text-white">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">
            Oklahoma classroom
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}, {siteConfig.address.region}{" "}
              {siteConfig.address.postalCode}
            </li>
            <li>
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <Mail className="size-4" aria-hidden="true" />
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold">Class openings &amp; renewal tips</p>
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/book" className="hover:text-white">
              Book a class
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
