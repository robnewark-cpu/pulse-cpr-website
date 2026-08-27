import { NextResponse } from "next/server"
import { submitClassRegistration } from "@/lib/tms/actions"

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const body = await request.json().catch(() => ({}))
  const formData = new FormData()
  formData.set("student_name", String(body.student_name ?? body.name ?? ""))
  formData.set("email", String(body.email ?? ""))
  formData.set("phone", String(body.phone ?? ""))
  formData.set("seats", String(body.seats ?? 1))
  formData.set("notes", String(body.notes ?? ""))
  const result = await submitClassRegistration(id, { status: "idle", message: "" }, formData)
  return NextResponse.json(result, { status: result.status === "error" ? 400 : 200 })
}
