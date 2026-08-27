import { NextResponse } from "next/server"
import { currentStaff, duplicateClassRecord } from "@/lib/tms/queries"

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const { id } = await context.params
  const copy = await duplicateClassRecord(id, staff.id)
  return NextResponse.json({ class: copy }, { status: 201 })
}
