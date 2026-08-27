import { createSupabaseServerClient } from "@/lib/supabase/server"
import { fallbackClasses } from "@/lib/tms/fallback"
import { addDays } from "@/lib/tms/format"
import type {
  ClassInput,
  ClassRecord,
  ClassStatus,
  CourseType,
  RegistrationRecord,
  RegistrationStatus,
} from "@/lib/tms/types"
import { COURSE_TYPES, isSupabaseConfigured } from "@/lib/tms/types"

function mapClass(row: Record<string, unknown>): ClassRecord {
  return {
    id: String(row.id),
    name: String(row.name),
    course_type: row.course_type as CourseType,
    class_date: String(row.class_date),
    start_time: String(row.start_time).slice(0, 8),
    end_time: String(row.end_time).slice(0, 8),
    instructor: String(row.instructor ?? ""),
    location: String(row.location),
    description: String(row.description ?? ""),
    price: Number(row.price ?? 0),
    seats_available: Number(row.seats_available ?? 0),
    seats_remaining: Number(row.seats_remaining ?? 0),
    registration_deadline: row.registration_deadline ? String(row.registration_deadline) : null,
    status: row.status as ClassStatus,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  }
}

function mapRegistration(row: Record<string, unknown>): RegistrationRecord {
  return {
    id: String(row.id),
    class_id: String(row.class_id),
    student_name: String(row.student_name),
    email: String(row.email),
    phone: String(row.phone),
    seats: Number(row.seats ?? 1),
    notes: String(row.notes ?? ""),
    status: row.status as RegistrationStatus,
    attended: typeof row.attended === "boolean" ? row.attended : null,
    confirmation_sent_at: row.confirmation_sent_at ? String(row.confirmation_sent_at) : null,
    created_at: String(row.created_at),
  }
}

export async function listPublicClasses() {
  if (!isSupabaseConfigured()) {
    return fallbackClasses().filter((session) => session.status === "scheduled")
  }
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .eq("status", "scheduled")
    .order("class_date", { ascending: true })
    .order("start_time", { ascending: true })
  if (error) throw error
  return (data ?? []).map((row) => mapClass(row as Record<string, unknown>))
}

export async function getPublicClass(id: string) {
  const sessions = await listPublicClasses()
  return sessions.find((session) => session.id === id) ?? null
}

export async function listAdminClasses() {
  if (!isSupabaseConfigured()) return []
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("classes")
    .select("*")
    .order("class_date", { ascending: true })
    .order("start_time", { ascending: true })
  if (error) throw error
  return (data ?? []).map((row) => mapClass(row as Record<string, unknown>))
}

export async function getClass(id: string) {
  if (!isSupabaseConfigured()) return null
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from("classes").select("*").eq("id", id).maybeSingle()
  if (error) throw error
  return data ? mapClass(data as Record<string, unknown>) : null
}

export async function createClassRecord(input: ClassInput, userId?: string) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("classes")
    .insert({
      ...input,
      seats_remaining: input.seats_available,
      status: "scheduled",
      created_by: userId ?? null,
    })
    .select("*")
    .single()
  if (error) throw error
  return mapClass(data as Record<string, unknown>)
}

export async function updateClassRecord(id: string, input: Partial<ClassInput> & { status?: ClassStatus }) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("classes")
    .update(input)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return mapClass(data as Record<string, unknown>)
}

export async function duplicateClassRecord(id: string, userId?: string) {
  const source = await getClass(id)
  if (!source) throw new Error("Class not found")
  return createClassRecord(
    {
      name: source.name,
      course_type: source.course_type,
      class_date: addDays(source.class_date, 7),
      start_time: source.start_time.slice(0, 5),
      end_time: source.end_time.slice(0, 5),
      instructor: source.instructor,
      location: source.location,
      description: source.description,
      price: source.price,
      seats_available: source.seats_available,
      registration_deadline: null,
    },
    userId
  )
}

export async function listRegistrations(classId: string) {
  if (!isSupabaseConfigured()) return []
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("class_id", classId)
    .order("created_at", { ascending: true })
  if (error) throw error
  return (data ?? []).map((row) => mapRegistration(row as Record<string, unknown>))
}

export async function updateRegistrationRecord(
  id: string,
  patch: Partial<Pick<RegistrationRecord, "status" | "attended" | "confirmation_sent_at">>
) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from("registrations")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return mapRegistration(data as Record<string, unknown>)
}

export async function registerStudent(input: {
  classId: string
  studentName: string
  email: string
  phone: string
  seats: number
  notes?: string
}) {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("register_for_class", {
    p_class_id: input.classId,
    p_student_name: input.studentName,
    p_email: input.email,
    p_phone: input.phone,
    p_seats: input.seats,
    p_notes: input.notes ?? "",
  })
  if (error) throw error
  return mapRegistration(data as Record<string, unknown>)
}

export async function currentStaff() {
  if (!isSupabaseConfigured()) return null
  const supabase = await createSupabaseServerClient()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth.user) return null
  const { data } = await supabase
    .from("admin_users")
    .select("user_id, name")
    .eq("user_id", auth.user.id)
    .maybeSingle()
  if (!data) return null
  return { id: auth.user.id, email: auth.user.email ?? "", name: data.name ?? auth.user.email ?? "Instructor" }
}

export async function staffConfigured() {
  if (!isSupabaseConfigured()) return false
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.rpc("staff_configured")
  if (error) return false
  return Boolean(data)
}

export function isCourseType(value: string): value is CourseType {
  return COURSE_TYPES.includes(value as CourseType)
}
