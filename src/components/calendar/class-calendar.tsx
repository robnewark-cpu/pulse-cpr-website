"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { buttonVariants } from "@/components/ui/button-variants"
import { COURSE_TYPES, type ClassRecord } from "@/lib/tms/types"
import {
  formatClassDate,
  formatPrice,
  formatTimeRange,
  isRegistrationOpen,
} from "@/lib/tms/format"
import { cn } from "@/lib/utils"

const filters = ["All", ...COURSE_TYPES] as const

function dateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function fromDateKey(value: string) {
  const [year, month, day] = value.split("-").map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

export function PublicClassCalendar({
  classes,
  liveRegistration,
}: {
  classes: ClassRecord[]
  liveRegistration: boolean
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const classDays = useMemo(
    () => classes.map((session) => fromDateKey(session.class_date)),
    [classes]
  )

  const defaultMonth = classDays[0] ?? new Date()
  const selectedKey = selectedDate ? dateKey(selectedDate) : null

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return classes.filter((session) => {
      if (filter !== "All" && session.course_type !== filter) return false
      if (selectedKey && session.class_date !== selectedKey) return false
      if (!needle) return true
      return [session.name, session.location, session.instructor, session.description]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    })
  }, [classes, filter, query, selectedKey])

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(17rem,22rem)_1fr] lg:items-start">
      <aside className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy/10 sm:p-5">
        <p className="text-sm font-semibold text-navy">Pulse CPR class calendar</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Days with a red marker have a Pulse CPR class. Pick a day to see what’s open.
        </p>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          defaultMonth={defaultMonth}
          modifiers={{ classDay: classDays }}
          modifiersClassNames={{
            classDay:
              "font-semibold text-navy after:absolute after:bottom-1 after:left-1/2 after:size-1.5 after:-translate-x-1/2 after:rounded-full after:bg-primary",
          }}
          classNames={{ root: "w-full" }}
          className="mt-4 w-full [--cell-size:2.75rem] p-0 sm:[--cell-size:3rem]"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          {selectedDate
            ? `Showing ${formatClassDate(dateKey(selectedDate))}.`
            : "Showing all upcoming classes."}
        </p>
        {selectedDate ? (
          <button
            type="button"
            onClick={() => setSelectedDate(undefined)}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            Show all upcoming classes
          </button>
        ) : null}
      </aside>
      <div>
        <label className="relative block">
          <span className="sr-only">Search classes</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by class, instructor, or city"
            className="h-12 w-full rounded-xl border bg-white pr-3 pl-10 text-base"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter classes">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "min-h-10 rounded-full border px-3 py-1.5 text-sm font-medium",
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
        {visible.length === 0 ? (
          <p className="mt-8 rounded-2xl bg-white p-6 text-sm text-muted-foreground ring-1 ring-navy/10">
            {selectedDate
              ? "No classes on that day. Pick another date or show all upcoming classes."
              : "No classes match that search. Call Pulse CPR or request an on-site date."}
          </p>
        ) : (
          <ul className="mt-6 divide-y overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10">
            {visible.map((session) => {
              const open = isRegistrationOpen(session)
              return (
                <li
                  key={session.id}
                  className="grid gap-3 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5"
                >
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                      {session.course_type}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold">{session.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatClassDate(session.class_date)} ·{" "}
                      {formatTimeRange(session.start_time, session.end_time)}
                    </p>
                    <p className="text-sm text-muted-foreground">{session.location}</p>
                    <p className="mt-2 text-sm font-medium text-navy">
                      {formatPrice(session.price)} · {session.seats_remaining} of {session.seats_available} seats left
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    {open ? (
                      <Link
                        href={
                          liveRegistration
                            ? `/register/${session.id}`
                            : `/book?course=${encodeURIComponent(session.course_type.toLowerCase())}&date=${session.class_date}`
                        }
                        className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
                      >
                        Register
                      </Link>
                    ) : (
                      <span className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-navy">
                        {session.seats_remaining <= 0 ? "Class full" : "Registration closed"}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
