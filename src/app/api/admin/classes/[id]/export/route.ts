import { NextResponse } from "next/server"
import { csvEscape, formatClassDate, formatTimeRange } from "@/lib/tms/format"
import { currentStaff, getClass, listRegistrations } from "@/lib/tms/queries"

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const session = await getClass(id)
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 })
  const roster = await listRegistrations(id)
  const attendance = new URL(request.url).searchParams.get("attendance") === "1"
  const header = attendance
    ? ["Student", "Email", "Phone", "Seats", "Status", "Attended", "Registered"]
    : ["Student", "Email", "Phone", "Seats", "Status", "Notes", "Registered"]
  const lines = [
    header.join(","),
    ...roster.map((row) =>
      (attendance
        ? [row.student_name, row.email, row.phone, row.seats, row.status, row.attended ? "Yes" : "No", row.created_at]
        : [row.student_name, row.email, row.phone, row.seats, row.status, row.notes, row.created_at]
      )
        .map(csvEscape)
        .join(",")
    ),
  ]
  const filename = `${session.name.replace(/\s+/g, "-")}-${session.class_date}${attendance ? "-attendance" : "-roster"}.csv`
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Class": `${session.name} ${formatClassDate(session.class_date)} ${formatTimeRange(session.start_time, session.end_time)}`,
    },
  })
}
