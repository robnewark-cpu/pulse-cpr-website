import { NextResponse } from "next/server"
import { createClassRecord, currentStaff, listAdminClasses } from "@/lib/tms/queries"
import { COURSE_TYPES } from "@/lib/tms/types"

export async function GET() {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const classes = await listAdminClasses()
  return NextResponse.json({ classes })
}

export async function POST(request: Request) {
  const staff = await currentStaff()
  if (!staff) return NextResponse.json({ error: "Sign in required" }, { status: 401 })
  const body = await request.json()
  if (!COURSE_TYPES.includes(body.course_type)) {
    return NextResponse.json({ error: "Invalid course type" }, { status: 400 })
  }
  const saved = await createClassRecord(
    {
      name: body.name,
      course_type: body.course_type,
      class_date: body.class_date,
      start_time: body.start_time,
      end_time: body.end_time,
      instructor: body.instructor,
      location: body.location,
      description: body.description ?? "",
      price: Number(body.price ?? 0),
      seats_available: Number(body.seats_available),
      registration_deadline: body.registration_deadline ?? null,
    },
    staff.id
  )
  return NextResponse.json({ class: saved }, { status: 201 })
}
