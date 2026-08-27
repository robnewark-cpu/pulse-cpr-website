"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { buttonVariants } from "@/components/ui/button-variants"
import { classes } from "@/lib/site"
import { cn } from "@/lib/utils"

const filters = ["All", "CPR", "First Aid", "AED", "Healthcare", "Corporate"] as const

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(new Date(`${value}T12:00:00`))
}

export function ClassCalendar() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const visible = useMemo(
    () =>
      filter === "All"
        ? classes
        : classes.filter((session) => session.category === filter),
    [filter]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter classes">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium",
              filter === item
                ? "border-primary bg-primary text-white"
                : "border-border bg-white text-navy hover:bg-accent"
            )}
            aria-pressed={filter === item}
          >
            {item}
          </button>
        ))}
      </div>
      <ul className="mt-6 divide-y overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
        {visible.map((session) => (
          <li
            key={session.id}
            className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5"
          >
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {session.category}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{session.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatDate(session.date)} · {session.time}
              </p>
              <p className="text-sm text-muted-foreground">{session.location}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              <p className="text-sm font-medium text-navy">
                {session.price} · {session.seats} seats
              </p>
              <Link
                href={`/book?course=${encodeURIComponent(session.category.toLowerCase())}&date=${session.date}`}
                className={buttonVariants()}
              >
                Book this class
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
