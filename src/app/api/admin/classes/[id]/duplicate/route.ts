import { NextResponse } from "next/server"
import { currentStaff, duplicateClassRecord, updateClassRecord } from "@/lib/tms/queries"
import { syncClassToGoogle } from "@/lib/tms/google-calendar"

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const copy = await duplicateClassRecord(id, staff.id)
  const eventId = await syncClassToGoogle(copy)
  const saved = eventId ? await updateClassRecord(copy.id, { google_event_id: eventId }) : copy
  return NextResponse.json({ class: saved }, { status: 201 })
}
