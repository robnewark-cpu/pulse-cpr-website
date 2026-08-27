"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Mail, Menu, Phone } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navItems, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (pathname.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="container-site grid h-[4.25rem] grid-cols-[auto_1fr_auto] items-center gap-3 lg:h-[4.75rem]">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Pulse CPR home">
          <Logo />
        </Link>
        <nav className="hidden justify-center lg:flex" aria-label="Primary">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-accent hover:text-navy",
                    (item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`)) &&
                      "bg-accent text-navy"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/book"
            className={cn(
              buttonVariants({ size: "xl" }),
              "hidden h-12 rounded-lg bg-[#D62828] px-6 text-base font-semibold text-white shadow-sm hover:bg-[#b51f1f] sm:inline-flex"
            )}
          >
            Sign Up Today
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "lg:hidden"
              )}
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)]">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-8" aria-label="Mobile">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-navy hover:bg-accent"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="mt-4 h-12 bg-[#D62828] text-white hover:bg-[#b51f1f]"
                  size="xl"
                  render={<Link href="/book" />}
                  onClick={() => setOpen(false)}
                >
                  Sign Up Today
                </Button>
                <a
                  href={siteConfig.phoneHref}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium text-navy"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium text-navy"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {siteConfig.email}
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
