import { classes, siteConfig } from "@/lib/site"
import type { ClassRecord, CourseType } from "@/lib/tms/types"

function parseClock(value: string) {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
  if (!match) return "09:00:00"
  let hour = Number(match[1])
  const minute = match[2]
  const meridiem = match[3].toUpperCase()
  if (meridiem === "PM" && hour < 12) hour += 12
  if (meridiem === "AM" && hour === 12) hour = 0
  return `${String(hour).padStart(2, "0")}:${minute}:00`
}

function parseRange(time: string) {
  if (!time.includes("–") && !time.includes("-")) {
    return { start: "09:00:00", end: "13:00:00" }
  }
  const [startRaw, endRaw] = time.split(/[–-]/).map((part) => part.trim())
  return { start: parseClock(startRaw), end: parseClock(endRaw) }
}

export function fallbackClasses(): ClassRecord[] {
  const now = new Date().toISOString()
  return classes.map((session) => {
    const { start, end } = parseRange(session.time)
    const price = Number(session.price.replace(/[^0-9.]/g, "")) || 0
    return {
      id: session.id,
      name: session.title,
      course_type: session.category as CourseType,
      class_date: session.date,
      start_time: start,
      end_time: end,
      instructor: "Christine",
      location: session.location,
      description: `${session.title} at Pulse CPR.`,
      price,
      seats_available: session.seats,
      seats_remaining: session.seats,
      registration_deadline: `${session.date}T18:00:00-05:00`,
      status: "scheduled",
      google_event_id: null,
      created_at: now,
      updated_at: now,
    }
  })
}

export function defaultClassroom() {
  return `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
}
