"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useId, useRef, useState } from "react"
import { ChevronDown, Mail, Menu, Phone } from "lucide-react"
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
  const [coursesOpen, setCoursesOpen] = useState(false)
  const menuId = useId()
  const coursesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setCoursesOpen(false)
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!coursesOpen) return
    function onPointerDown(event: MouseEvent) {
      if (!coursesRef.current?.contains(event.target as Node)) {
        setCoursesOpen(false)
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setCoursesOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [coursesOpen])

  if (pathname.startsWith("/admin")) return null

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="hidden border-b border-navy/10 bg-navy text-white md:block">
        <div className="container-site flex h-9 items-center justify-between text-xs tracking-wide">
          <p>Edmond classroom · Oklahoma City · Norman · Tulsa · statewide</p>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium hover:text-white/80"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-1.5 font-medium hover:text-white/80"
            >
              <Mail className="size-3.5" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Pulse CPR home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) =>
            "children" in item && item.children ? (
              <div key={item.label} className="relative" ref={coursesRef}>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-accent hover:text-navy",
                    item.children.some((child) => pathname.startsWith(child.href)) &&
                      "text-navy"
                  )}
                  aria-expanded={coursesOpen}
                  aria-haspopup="menu"
                  aria-controls={menuId}
                  onClick={() => setCoursesOpen((current) => !current)}
                >
                  {item.label}
                  <ChevronDown className="size-3.5" aria-hidden="true" />
                </button>
                {coursesOpen ? (
                  <div
                    id={menuId}
                    role="menu"
                    className="absolute top-full left-0 z-50 mt-1 min-w-64 rounded-xl border bg-white p-2 shadow-lg"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-sm text-navy/80 hover:bg-accent hover:text-navy"
                        onClick={() => setCoursesOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-accent hover:text-navy",
                  pathname === item.href && "bg-accent text-navy"
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/book"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-10 bg-primary px-4 text-primary-foreground sm:inline-flex"
            )}
          >
            Book a class
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
                <p className="px-3 pt-2 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Explore
                </p>
                {navItems
                  .filter((item) => !("children" in item && item.children))
                  .map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-navy hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                <p className="mt-3 px-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Courses
                </p>
                {navItems
                  .flatMap((item) => ("children" in item && item.children ? [...item.children] : []))
                  .map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded-lg px-3 py-2.5 text-base font-medium text-navy hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                <Button
                  className="mt-4 h-12"
                  size="xl"
                  render={<Link href="/book" />}
                  onClick={() => setOpen(false)}
                >
                  Book a class
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
