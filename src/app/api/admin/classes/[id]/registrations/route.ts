import { NextResponse } from "next/server"
import { currentStaff, listRegistrations, updateRegistrationRecord } from "@/lib/tms/queries"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const registrations = await listRegistrations(id)
  return NextResponse.json({ registrations })
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  await context.params
  const body = await request.json()
  if (!body.registration_id) {
    return NextResponse.json({ error: "registration_id required" }, { status: 400 })
  }
  const saved = await updateRegistrationRecord(body.registration_id, {
    status: body.status,
    attended: body.attended,
  })
  return NextResponse.json({ registration: saved })
}
