"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { sendClassCancellation, sendClassUpdate, sendRegistrationConfirmation } from "@/lib/tms/email"
import { fromDatetimeLocal } from "@/lib/tms/format"
import {
  createClassRecord,
  currentStaff,
  duplicateClassRecord,
  getClass,
  listRegistrations,
  registerStudent,
  staffConfigured,
  updateClassRecord,
  updateRegistrationRecord,
} from "@/lib/tms/queries"
import { COURSE_TYPES, isSupabaseConfigured } from "@/lib/tms/types"
import { siteConfig } from "@/lib/site"

export type ActionResult = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Record<string, string>
}

const classSchema = z.object({
  name: z.string().trim().min(2, "Enter a class name."),
  course_type: z.enum(COURSE_TYPES),
  class_date: z.string().min(1, "Choose a date."),
  start_time: z.string().min(1, "Choose a start time."),
  end_time: z.string().min(1, "Choose an end time."),
  instructor: z.string().trim().min(1, "Enter the instructor."),
  location: z.string().trim().min(2, "Enter a location."),
  description: z.string().trim(),
  price: z.coerce.number().min(0),
  seats_available: z.coerce.number().int().min(1, "Enter seats."),
  registration_deadline: z.string().optional(),
})

function field(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value : ""
}

function flatten(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form")
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return fieldErrors
}

async function requireStaff() {
  const staff = await currentStaff()
  if (!staff) {
    throw new Error("Please sign in as an instructor.")
  }
  return staff
}

function parseClass(formData: FormData) {
  return classSchema.safeParse({
    name: field(formData, "name"),
    course_type: field(formData, "course_type"),
    class_date: field(formData, "class_date"),
    start_time: field(formData, "start_time"),
    end_time: field(formData, "end_time"),
    instructor: field(formData, "instructor"),
    location: field(formData, "location"),
    description: field(formData, "description"),
    price: field(formData, "price"),
    seats_available: field(formData, "seats_available"),
    registration_deadline: field(formData, "registration_deadline"),
  })
}

function revalidateClasses() {
  revalidatePath("/class-calendar")
  revalidatePath("/admin")
  revalidatePath("/admin/classes")
  revalidatePath("/")
}

export async function saveClass(
  classId: string | undefined,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    const staff = await requireStaff()
    const parsed = parseClass(formData)
    if (!parsed.success) {
      return {
        status: "error",
        message: "Please correct the highlighted fields.",
        fieldErrors: flatten(parsed.error),
      }
    }
    const payload = {
      ...parsed.data,
      start_time: parsed.data.start_time.slice(0, 5),
      end_time: parsed.data.end_time.slice(0, 5),
      registration_deadline: fromDatetimeLocal(parsed.data.registration_deadline ?? ""),
    }
    const saved = classId
      ? await updateClassRecord(classId, payload)
      : await createClassRecord(payload, staff.id)
    if (classId) {
      const roster = await listRegistrations(saved.id)
      await sendClassUpdate(saved, roster).catch((error) => console.error(error))
    }
    revalidateClasses()
    revalidatePath(`/admin/classes/${saved.id}`)
    if (!classId) redirect(`/admin/classes/${saved.id}`)
    return { status: "success", message: "Class saved." }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not save class.",
    }
  }
}

export async function cancelClass(classId: string): Promise<ActionResult> {
  try {
    await requireStaff()
    const session = await getClass(classId)
    if (!session) return { status: "error", message: "Class not found." }
    const roster = await listRegistrations(classId)
    const saved = await updateClassRecord(classId, { status: "cancelled" })
    await sendClassCancellation(saved, roster).catch((error) => console.error(error))
    revalidateClasses()
    revalidatePath(`/admin/classes/${classId}`)
    return { status: "success", message: "Class cancelled. Students were emailed if mail is connected." }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Could not cancel class.",
    }
  }
}

export async function duplicateClass(classId: string) {
  const staff = await requireStaff()
  const copy = await duplicateClassRecord(classId, staff.id)
  revalidateClasses()
  redirect(`/admin/classes/${copy.id}`)
}

export async function markAttendance(registrationId: string, classId: string, attended: boolean) {
  await requireStaff()
  await updateRegistrationRecord(registrationId, {
    attended,
    status: attended ? "attended" : "no_show",
  })
  revalidatePath(`/admin/classes/${classId}/roster`)
}

export async function submitClassRegistration(
  classId: string,
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return {
      status: "error",
      message: "Online registration is not connected yet. Call Pulse CPR or use the booking form.",
    }
  }
  const parsed = z
    .object({
      student_name: z.string().trim().min(2, "Enter your name."),
      email: z.string().trim().email("Enter a valid email."),
      phone: z.string().trim().min(7, "Enter a phone number."),
      seats: z.coerce.number().int().min(1).max(12),
      notes: z.string().optional(),
    })
    .safeParse({
      student_name: field(formData, "student_name"),
      email: field(formData, "email"),
      phone: field(formData, "phone"),
      seats: field(formData, "seats") || "1",
      notes: field(formData, "notes"),
    })
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flatten(parsed.error),
    }
  }
  try {
    const registration = await registerStudent({
      classId,
      studentName: parsed.data.student_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      seats: parsed.data.seats,
      notes: parsed.data.notes,
    })
    const session = await getClass(classId)
    if (session) {
      await sendRegistrationConfirmation(session, registration).catch((error) => {
        console.error(error)
      })
    }
    revalidatePath("/class-calendar")
    revalidatePath(`/register/${classId}`)
    revalidatePath(`/admin/classes/${classId}/roster`)
    return {
      status: "success",
      message: siteConfig.payments.url
        ? `Complete payment with ${siteConfig.payments.processor} to confirm your seat.`
        : `Your request is in. Pulse CPR will send an ${siteConfig.payments.processor} payment link to confirm your seat.`,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed."
    return { status: "error", message }
  }
}

export async function signInInstructor(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Add Supabase keys in .env.local before signing in." }
  }
  const email = field(formData, "email")
  const password = field(formData, "password")
  if (!email || !password) {
    return { status: "error", message: "Enter email and password." }
  }
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { status: "error", message: error.message }
  redirect("/admin")
}

export async function createFirstInstructor(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  if (!isSupabaseConfigured()) {
    return { status: "error", message: "Add Supabase keys in .env.local first." }
  }
  if (await staffConfigured()) {
    return { status: "error", message: "An instructor account already exists. Sign in instead." }
  }
  const email = field(formData, "email")
  const password = field(formData, "password")
  const name = field(formData, "name") || "Instructor"
  if (!email || password.length < 8) {
    return { status: "error", message: "Use a real email and a password of at least 8 characters." }
  }
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  })
  if (error) return { status: "error", message: error.message }
  return {
    status: "success",
    message: "Account created. If email confirmation is on, check the inbox, then sign in.",
  }
}

export async function signOutInstructor() {
  if (!isSupabaseConfigured()) return
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
