import Link from "next/link"
import { notFound } from "next/navigation"
import { AttendanceToggle } from "@/components/admin/attendance-toggle"
import { buttonVariants } from "@/components/ui/button-variants"
import { formatClassDate, formatTimeRange } from "@/lib/tms/format"
import { getClass, listRegistrations } from "@/lib/tms/queries"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Class roster",
  robots: { index: false, follow: false },
}

export default async function RosterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getClass(id)
  if (!session) notFound()
  const roster = await listRegistrations(id)
  const confirmed = roster.filter((row) => row.status !== "cancelled")

  return (
    <div className="grid gap-5">
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">{session.course_type}</p>
        <h1 className="mt-1 text-2xl font-bold text-navy">{session.name}</h1>
        <p className="text-sm text-muted-foreground">
          {formatClassDate(session.class_date)} · {formatTimeRange(session.start_time, session.end_time)}
        </p>
        <p className="text-sm font-medium text-navy">
          {confirmed.reduce((sum, row) => sum + row.seats, 0)} registered · {session.seats_remaining} seats left
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href={`/admin/classes/${id}`} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}>
          Edit class
        </Link>
        <a
          href={`/api/admin/classes/${id}/export`}
          className={cn(buttonVariants({ size: "lg" }), "min-h-11")}
        >
          Export roster CSV
        </a>
        <a
          href={`/api/admin/classes/${id}/export?attendance=1`}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
        >
          Export attendance
        </a>
      </div>
      {roster.length === 0 ? (
        <p className="rounded-2xl bg-white p-5 text-sm text-muted-foreground ring-1 ring-navy/10">
          No registrations yet.
        </p>
      ) : (
        <ul className="grid gap-3">
          {roster.map((row) => (
            <li key={row.id} className="rounded-2xl bg-white p-4 ring-1 ring-navy/10">
              <p className="font-semibold text-navy">{row.student_name}</p>
              <p className="text-sm text-muted-foreground">
                {row.email} · {row.phone}
              </p>
              <p className="text-sm">
                {row.seats} seat{row.seats === 1 ? "" : "s"} · {row.status}
              </p>
              {row.notes ? <p className="mt-1 text-sm text-muted-foreground">{row.notes}</p> : null}
              <div className="mt-3">
                <AttendanceToggle classId={id} row={row} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
