"use server"

import { z } from "zod"

export type FormState = {
  status: "idle" | "success" | "error"
  message: string
  fieldErrors?: Record<string, string>
}

const emailSchema = z.string().trim().email("Enter a valid email address.")
const phoneSchema = z
  .string()
  .trim()
  .min(7, "Enter a phone number so we can confirm your request.")
const nameSchema = z.string().trim().min(2, "Enter your full name.")

const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  subject: z.string().trim().min(2, "Choose a subject."),
  message: z.string().trim().min(10, "Tell us a little more so we can help."),
  company: z.string().optional(),
})

const bookingSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  course: z.string().trim().min(1, "Select a course."),
  preferredDate: z.string().trim().min(1, "Choose a preferred date."),
  location: z.string().trim().min(1, "Tell us where you want to train."),
  students: z.string().trim().min(1, "Enter the number of students."),
  notes: z.string().trim().optional(),
})

const quoteSchema = z.object({
  company: z.string().trim().min(2, "Enter your organization name."),
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  industry: z.string().trim().min(2, "Select an industry."),
  employees: z.string().trim().min(1, "Estimate how many people need training."),
  location: z.string().trim().min(2, "Enter a city or worksite."),
  courses: z.string().trim().min(1, "Select the training you need."),
  details: z.string().trim().optional(),
})

const newsletterSchema = z.object({
  email: emailSchema,
})

async function deliver(payload: Record<string, unknown>) {
  const webhook = process.env.FORM_WEBHOOK_URL
  if (webhook) {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      throw new Error("Delivery failed")
    }
    return
  }
  console.info("[Pulse CPR lead]", payload)
}

function flattenErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form")
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return fieldErrors
}

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company") ?? "",
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver({ type: "contact", ...parsed.data, receivedAt: new Date().toISOString() })
    return {
      status: "success",
      message: "Thank you. A Pulse CPR coordinator will reply within one business day.",
    }
  } catch {
    return {
      status: "error",
      message: "We could not send your message. Please call (405) 555-7873.",
    }
  }
}

export async function submitBooking(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = bookingSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    course: formData.get("course"),
    preferredDate: formData.get("preferredDate"),
    location: formData.get("location"),
    students: formData.get("students"),
    notes: formData.get("notes") ?? "",
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver({ type: "booking", ...parsed.data, receivedAt: new Date().toISOString() })
    return {
      status: "success",
      message:
        "Your class request is in. We will confirm seats or propose the next open date shortly.",
    }
  } catch {
    return {
      status: "error",
      message: "Booking could not be submitted. Call (405) 555-7873 to reserve a seat.",
    }
  }
}

export async function submitQuote(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = quoteSchema.safeParse({
    company: formData.get("company"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    industry: formData.get("industry"),
    employees: formData.get("employees"),
    location: formData.get("location"),
    courses: formData.get("courses"),
    details: formData.get("details") ?? "",
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver({ type: "corporate-quote", ...parsed.data, receivedAt: new Date().toISOString() })
    return {
      status: "success",
      message:
        "Quote request received. We typically return group pricing the same business day.",
    }
  } catch {
    return {
      status: "error",
      message: "We could not send your quote request. Email hello@pulsecprok.com or call us.",
    }
  }
}

export async function submitNewsletter(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Enter a valid email.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver({ type: "newsletter", ...parsed.data, receivedAt: new Date().toISOString() })
    return {
      status: "success",
      message: "You are on the list. Renewal reminders and class openings will come to this inbox.",
    }
  } catch {
    return {
      status: "error",
      message: "Signup failed. Please try again or email hello@pulsecprok.com.",
    }
  }
}
