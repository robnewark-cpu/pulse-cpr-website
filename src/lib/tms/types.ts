export const COURSE_TYPES = [
  "CPR",
  "First Aid",
  "AED",
  "Healthcare",
  "Corporate",
] as const

export type CourseType = (typeof COURSE_TYPES)[number]

export const CLASS_STATUSES = ["scheduled", "cancelled", "completed"] as const
export type ClassStatus = (typeof CLASS_STATUSES)[number]

export const REGISTRATION_STATUSES = [
  "confirmed",
  "waitlist",
  "cancelled",
  "attended",
  "no_show",
] as const
export type RegistrationStatus = (typeof REGISTRATION_STATUSES)[number]

export type ClassRecord = {
  id: string
  name: string
  course_type: CourseType
  class_date: string
  start_time: string
  end_time: string
  instructor: string
  location: string
  description: string
  price: number
  seats_available: number
  seats_remaining: number
  registration_deadline: string | null
  status: ClassStatus
  google_event_id: string | null
  created_at: string
  updated_at: string
}

export type RegistrationRecord = {
  id: string
  class_id: string
  student_name: string
  email: string
  phone: string
  seats: number
  notes: string
  status: RegistrationStatus
  attended: boolean | null
  confirmation_sent_at: string | null
  created_at: string
}

export type ClassInput = {
  name: string
  course_type: CourseType
  class_date: string
  start_time: string
  end_time: string
  instructor: string
  location: string
  description: string
  price: number
  seats_available: number
  registration_deadline: string | null
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
