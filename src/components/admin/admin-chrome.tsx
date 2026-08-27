"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarDays, Plus, LayoutList } from "lucide-react"
import { signOutInstructor } from "@/lib/tms/actions"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/admin", label: "Classes", icon: LayoutList },
  { href: "/admin/classes/new", label: "New class", icon: Plus },
  { href: "/admin/today", label: "Today", icon: CalendarDays },
]

export function AdminChrome({
  email,
  children,
}: {
  email: string
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-dvh flex-col bg-accent/40">
      <header className="sticky top-0 z-40 border-b bg-navy text-white">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/admin" className="text-sm font-semibold tracking-wide">
            Pulse CPR · Classes
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/admin/help"
              className="text-xs text-white/80 hover:text-white"
              aria-label="How to add a class from your phone"
            >
              Help
            </Link>
            <form action={signOutInstructor}>
              <button type="submit" className="text-xs text-white/80 hover:text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <p className="sr-only">{email}</p>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-4">{children}</main>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_rgba(15,39,68,0.08)] backdrop-blur"
        aria-label="Instructor"
      >
        <ul className="mx-auto grid max-w-3xl grid-cols-3">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-medium",
                    active ? "text-primary" : "text-navy/70"
                  )}
                >
                  <item.icon className="size-5" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
