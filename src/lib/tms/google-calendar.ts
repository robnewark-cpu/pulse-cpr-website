import type { ClassRecord } from "@/lib/tms/types"

type GoogleEvent = {
  id?: string
  status?: string
  summary: string
  description: string
  location: string
  start: { dateTime: string; timeZone: string }
  end: { dateTime: string; timeZone: string }
}

function configured() {
  return Boolean(
    process.env.GOOGLE_CALENDAR_ID &&
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  )
}

function toDateTime(date: string, time: string) {
  const clock = time.length === 5 ? `${time}:00` : time.slice(0, 8)
  return `${date}T${clock}`
}

function toEvent(session: Pick<ClassRecord, "name" | "description" | "location" | "class_date" | "start_time" | "end_time" | "instructor" | "status">): GoogleEvent {
  return {
    status: session.status === "cancelled" ? "cancelled" : "confirmed",
    summary: `Pulse CPR: ${session.name}`,
    description: [session.description, `Instructor: ${session.instructor}`].filter(Boolean).join("\n"),
    location: session.location,
    start: {
      dateTime: toDateTime(session.class_date, session.start_time),
      timeZone: "America/Chicago",
    },
    end: {
      dateTime: toDateTime(session.class_date, session.end_time),
      timeZone: "America/Chicago",
    },
  }
}

async function accessToken() {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN!,
      grant_type: "refresh_token",
    }),
  })
  if (!response.ok) {
    throw new Error(`Google token refresh failed: ${await response.text()}`)
  }
  const json = (await response.json()) as { access_token: string }
  return json.access_token
}

async function calendarFetch(path: string, init?: RequestInit) {
  const token = await accessToken()
  const calendarId = encodeURIComponent(process.env.GOOGLE_CALENDAR_ID!)
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}${path}`,
    {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    }
  )
  if (!response.ok) {
    throw new Error(`Google Calendar error: ${await response.text()}`)
  }
  if (response.status === 204) return null
  return response.json()
}

export async function syncClassToGoogle(session: ClassRecord) {
  if (!configured()) return session.google_event_id
  try {
    const body = toEvent(session)
    if (session.google_event_id) {
      await calendarFetch(`/events/${encodeURIComponent(session.google_event_id)}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      })
      return session.google_event_id
    }
    const created = (await calendarFetch("/events", {
      method: "POST",
      body: JSON.stringify(body),
    })) as { id: string }
    return created.id
  } catch (error) {
    console.error("[Google Calendar sync]", error)
    return session.google_event_id
  }
}

export async function deleteGoogleEvent(eventId: string | null) {
  if (!configured() || !eventId) return
  try {
    await calendarFetch(`/events/${encodeURIComponent(eventId)}`, { method: "DELETE" })
  } catch (error) {
    console.error("[Google Calendar delete]", error)
  }
}
