const TIME_ZONE = "America/Chicago"

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
    maximumFractionDigits: value % 1 ? 2 : 0,
  }).format(value)
}
