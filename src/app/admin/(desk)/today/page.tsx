import Link from "next/link"
import { ClassQuickActions } from "@/components/admin/class-quick-actions"
import { buttonVariants } from "@/components/ui/button-variants"
import { formatTimeRange } from "@/lib/tms/format"
import { listAdminClasses } from "@/lib/tms/queries"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Today",
  robots: { index: false, follow: false },
}

export default async function TodayPage() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date())
  const classes = (await listAdminClasses()).filter(
    (session) => session.class_date === today && session.status === "scheduled"
  )

  return (
    <div className="grid gap-5">
      <h1 className="text-2xl font-bold text-navy">Today’s classes</h1>
      {classes.length === 0 ? (
        <p className="rounded-2xl bg-white p-5 text-sm text-muted-foreground ring-1 ring-navy/10">
          Nothing on the calendar today. Create a class or duplicate last week’s session.
        </p>
      ) : (
        <ul className="grid gap-3">
          {classes.map((session) => (
            <li key={session.id} className="rounded-2xl bg-white p-4 ring-1 ring-navy/10">
              <h2 className="text-lg font-semibold">{session.name}</h2>
              <p className="text-sm text-muted-foreground">
                {formatTimeRange(session.start_time, session.end_time)} · {session.location}
              </p>
              <p className="mt-2 text-sm font-medium">
                {session.seats_available - session.seats_remaining} students · {session.seats_remaining} open
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={`/admin/classes/${session.id}/roster`}
                  className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
                >
                  Take attendance
                </Link>
                <Link
                  href={`/admin/classes/${session.id}`}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
                >
                  Edit
                </Link>
              </div>
              <div className="mt-3">
                <ClassQuickActions classId={session.id} cancelled={false} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
