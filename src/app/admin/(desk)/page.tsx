import Link from "next/link"
import { ClassQuickActions } from "@/components/admin/class-quick-actions"
import { buttonVariants } from "@/components/ui/button-variants"
import { formatClassDate, formatPrice, formatTimeRange } from "@/lib/tms/format"
import { listAdminClasses } from "@/lib/tms/queries"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Classes",
  robots: { index: false, follow: false },
}

export default async function AdminClassesPage() {
  const classes = await listAdminClasses()
  const upcoming = classes.filter((session) => session.status === "scheduled")
  const cancelled = classes.filter((session) => session.status === "cancelled")

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy">Upcoming classes</h1>
          <p className="text-sm text-muted-foreground">Tap a class to edit. Duplicate copies it to next week.</p>
        </div>
        <Link href="/admin/classes/new" className={cn(buttonVariants({ size: "lg" }), "min-h-11")}>
          New class
        </Link>
      </div>
      {upcoming.length === 0 ? (
        <p className="rounded-2xl bg-white p-5 text-sm text-muted-foreground ring-1 ring-navy/10">
          No scheduled classes. Tap New class at the bottom of the screen — it takes about 20 seconds. Need the
          phone steps? Open{" "}
          <Link href="/admin/help" className="font-medium text-primary underline-offset-2 hover:underline">
            How to add a class
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-3">
          {upcoming.map((session) => (
            <li key={session.id} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-navy/10">
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {session.course_type}
              </p>
              <h2 className="mt-1 text-lg font-semibold text-navy">{session.name}</h2>
              <p className="text-sm text-muted-foreground">
                {formatClassDate(session.class_date)} · {formatTimeRange(session.start_time, session.end_time)}
              </p>
              <p className="text-sm text-muted-foreground">{session.location}</p>
              <p className="mt-2 text-sm font-medium">
                {session.seats_remaining} of {session.seats_available} seats left · {formatPrice(session.price)}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/admin/classes/${session.id}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}>
                  Edit
                </Link>
                <Link
                  href={`/admin/classes/${session.id}/roster`}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
                >
                  Roster
                </Link>
              </div>
              <div className="mt-3">
                <ClassQuickActions classId={session.id} cancelled={false} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {cancelled.length ? (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-navy">Cancelled</h2>
          <ul className="grid gap-2">
            {cancelled.map((session) => (
              <li key={session.id} className="rounded-xl bg-white px-4 py-3 text-sm ring-1 ring-navy/10">
                <Link href={`/admin/classes/${session.id}`} className="font-medium text-navy">
                  {session.name}
                </Link>
                <span className="text-muted-foreground"> · {formatClassDate(session.class_date)}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
