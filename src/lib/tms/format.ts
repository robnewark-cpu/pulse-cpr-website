const TIME_ZONE = "America/Chicago"

function chicagoParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? ""
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  }
}

export function formatClassDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(new Date(`${value}T12:00:00`))
}

export function formatClock(value: string) {
  const [hourRaw, minute = "00"] = value.slice(0, 5).split(":")
  const date = new Date()
  date.setHours(Number(hourRaw), Number(minute), 0, 0)
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export function formatTimeRange(start: string, end: string) {
  return `${formatClock(start)} – ${formatClock(end)}`
}

export function formatPrice(value: number) {
  if (!value) return "Quote"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDeadline(value: string | null) {
  if (!value) return "Class start"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(new Date(value))
}

export function isRegistrationOpen(input: {
  status: string
  class_date: string
  start_time: string
  registration_deadline: string | null
  seats_remaining: number
}) {
  if (input.status !== "scheduled") return false
  if (input.seats_remaining <= 0) return false
  const now = chicagoParts()
  const start = input.start_time.slice(0, 5)
  if (input.class_date < now.date) return false
  if (input.class_date === now.date && start <= now.time) return false
  if (input.registration_deadline && new Date(input.registration_deadline).getTime() <= Date.now()) {
    return false
  }
  return true
}

export function toDatetimeLocal(value: string | null) {
  if (!value) return ""
  const date = new Date(value)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromDatetimeLocal(value: string) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date.toISOString()
}

export function addDays(isoDate: string, days: number) {
  const date = new Date(`${isoDate}T12:00:00`)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export function csvEscape(value: string | number | boolean | null | undefined) {
  const text = value == null ? "" : String(value)
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}
