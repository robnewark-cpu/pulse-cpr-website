import { NextResponse } from "next/server"
import { cancelClass } from "@/lib/tms/actions"
import { currentStaff, getClass, updateClassRecord } from "@/lib/tms/queries"
import { syncClassToGoogle } from "@/lib/tms/google-calendar"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const session = await getClass(id)
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json({ class: session })
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const body = await request.json()
  const saved = await updateClassRecord(id, body)
  const eventId = await syncClassToGoogle(saved)
  const withEvent = eventId !== saved.google_event_id
    ? await updateClassRecord(id, { google_event_id: eventId })
    : saved
  return NextResponse.json({ class: withEvent })
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const result = await cancelClass(id)
  return NextResponse.json(result, { status: result.status === "error" ? 400 : 200 })
}
