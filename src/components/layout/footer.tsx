"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, Phone } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Container } from "@/components/layout/container"
import { siteConfig } from "@/lib/site"

const footerLinks = [
  { href: "/classes", label: "Classes" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/class-calendar", label: "Schedule" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.5 8.5H16V6h-1.5C12.57 6 11 7.57 11 9.5V11H9v2.5h2V20h2.5v-6.5H16V11h-2.5V9.5c0-.55.45-1 1-1Z"
      />
    </svg>
  )
}

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="border-t bg-navy text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo inverted />
          <p className="mt-4 text-sm font-medium tracking-wide text-white/80">
            Serving Oklahoma
          </p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-white/70">
            {siteConfig.tagline}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Explore</p>
          <ul className="mt-4 space-y-2">
            {footerLinks.map((link) => (
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
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
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
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Follow</p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Pulse CPR on Facebook"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
