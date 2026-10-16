import { siteConfig } from "@/lib/site"
import { sendEmail } from "@/lib/tms/email"

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

function fieldRows(fields: Record<string, string>) {
  return Object.entries(fields)
    .filter(([, value]) => value.trim())
    .map(
      ([key, value]) =>
        `<tr><th align="left" style="padding:4px 12px 4px 0;vertical-align:top">${escapeHtml(key)}</th><td>${escapeHtml(value)}</td></tr>`
    )
    .join("")
}

export function instructorNotifyHtml(title: string, fields: Record<string, string>) {
  return `
    <p><strong>${escapeHtml(title)}</strong></p>
    <table>${fieldRows(fields)}</table>
    <p>Call the student at the number above, or send a Square payment link to confirm the seat.</p>
    <p>Office ${siteConfig.officePhone} · Cell ${siteConfig.phone}</p>
  `
}

async function postWebhook(payload: Record<string, unknown>) {
  const webhook = process.env.FORM_WEBHOOK_URL?.trim()
  if (!webhook) return false
  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Webhook failed: ${response.status}`)
  return true
}

async function postFormSubmit(subject: string, fields: Record<string, string>) {
  const [primary, ...rest] = siteConfig.notifyEmails
  const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(primary)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: siteConfig.url,
      Referer: `${siteConfig.url}/book`,
      "User-Agent": "PulseCPR/1.0 (+https://pulsecprok.com)",
    },
    body: JSON.stringify({
      ...fields,
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _cc: rest.join(","),
    }),
  })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Inbox notice failed: ${body}`)
  }
  return true
}

export async function notifyInstructor(input: {
  type: string
  subject: string
  fields: Record<string, string>
}) {
  const payload = {
    type: input.type,
    ...input.fields,
    receivedAt: new Date().toISOString(),
  }
  const html = instructorNotifyHtml(input.subject, input.fields)
  const attempts: Array<() => Promise<boolean>> = [
    async () => postWebhook(payload),
    async () => {
      const result = await sendEmail({
        to: [...siteConfig.notifyEmails],
        subject: input.subject,
        html,
        replyTo: input.fields.Email || input.fields.email,
      })
      return result.sent
    },
    async () => postFormSubmit(input.subject, input.fields),
  ]

  const errors: string[] = []
  for (const attempt of attempts) {
    try {
      if (await attempt()) return { delivered: true as const }
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "Notify failed")
    }
  }

  console.error("[Pulse CPR notify]", input.subject, errors)
  return { delivered: false as const, errors }
}
