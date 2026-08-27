import { siteConfig } from "@/lib/site"
import { formatClassDate, formatPrice, formatTimeRange } from "@/lib/tms/format"
import type { ClassRecord, RegistrationRecord } from "@/lib/tms/types"

function fromAddress() {
  return process.env.EMAIL_FROM ?? `Pulse CPR <${siteConfig.email}>`
}

async function sendEmail(input: { to: string | string[]; subject: string; html: string }) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.info("[Pulse CPR email]", { to: input.to, subject: input.subject })
    return { sent: false as const }
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress(),
      to: Array.isArray(input.to) ? input.to : [input.to],
      subject: input.subject,
      html: input.html,
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Email failed: ${body}`)
  }
  return { sent: true as const }
}

function classSummary(session: ClassRecord) {
  return `${session.name} · ${formatClassDate(session.class_date)} · ${formatTimeRange(session.start_time, session.end_time)} · ${session.location}`
}

export async function sendRegistrationConfirmation(
  session: ClassRecord,
  registration: RegistrationRecord
) {
  const html = `
    <p>Hi ${registration.student_name},</p>
    <p>You are registered for Pulse CPR:</p>
    <p><strong>${classSummary(session)}</strong></p>
    <p>Seats held: ${registration.seats}<br/>Price: ${formatPrice(session.price)}</p>
    <p>Bring a photo ID and clothes you can move in. Questions? Call ${siteConfig.phone} or email ${siteConfig.email}.</p>
    <p>Pulse CPR<br/>${siteConfig.address.street}<br/>${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}<br/>${siteConfig.email}</p>
  `
  const result = await sendEmail({
    to: registration.email,
    subject: `Confirmed: ${session.name} on ${formatClassDate(session.class_date)}`,
    html,
  })
  await sendEmail({
    to: siteConfig.email,
    subject: `New registration: ${registration.student_name} — ${session.name}`,
    html: `<p>${registration.student_name} (${registration.email}, ${registration.phone}) booked ${registration.seats} seat(s) for ${classSummary(session)}.</p>`,
  }).catch((error) => console.error(error))
  return result
}

export async function sendClassCancellation(
  session: ClassRecord,
  registrations: RegistrationRecord[]
) {
  const recipients = registrations
    .filter((row) => row.status === "confirmed" || row.status === "waitlist")
    .map((row) => row.email)
  if (!recipients.length) return
  await sendEmail({
    to: recipients,
    subject: `Class cancelled: ${session.name} on ${formatClassDate(session.class_date)}`,
    html: `<p>Pulse CPR has cancelled ${classSummary(session)}. We will help you move to another date — reply to this email, call ${siteConfig.phone}, or write ${siteConfig.email}.</p>`,
  })
}

export async function sendClassUpdate(session: ClassRecord, registrations: RegistrationRecord[]) {
  const recipients = registrations
    .filter((row) => row.status === "confirmed" || row.status === "waitlist")
    .map((row) => row.email)
  if (!recipients.length) return
  await sendEmail({
    to: recipients,
    subject: `Class update: ${session.name} on ${formatClassDate(session.class_date)}`,
    html: `<p>Your Pulse CPR class details were updated:</p><p><strong>${classSummary(session)}</strong></p><p>Call ${siteConfig.phone} with questions.</p>`,
  })
}
