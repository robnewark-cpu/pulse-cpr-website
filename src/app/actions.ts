"use server"

import { z } from "zod"
import { notifyInstructor } from "@/lib/notify"
import { siteConfig } from "@/lib/site"

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

function asFields(data: Record<string, unknown>) {
  const fields: Record<string, string> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value == null || value === "") continue
    fields[key] = String(value)
  }
  return fields
}

async function deliver(type: string, subject: string, data: Record<string, unknown>) {
  const result = await notifyInstructor({
    type,
    subject,
    fields: asFields(data),
  })
  if (!result.delivered) {
    throw new Error("Delivery failed")
  }
}

function flattenErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form")
    if (!fieldErrors[key]) fieldErrors[key] = issue.message
  }
  return fieldErrors
}

function field(formData: FormData, name: string) {
  const value = formData.get(name)
  return typeof value === "string" ? value : ""
}

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    subject: field(formData, "subject"),
    message: field(formData, "message"),
    company: field(formData, "company"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver("contact", `New Pulse CPR message from ${parsed.data.name}`, parsed.data)
    return {
      status: "success",
      message: "Thank you. A Pulse CPR coordinator will reply within one business day.",
    }
  } catch {
    return {
      status: "error",
      message: `We could not send your message. Please call ${siteConfig.phone}.`,
    }
  }
}

export async function submitBooking(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = bookingSchema.safeParse({
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    course: field(formData, "course"),
    preferredDate: field(formData, "preferredDate"),
    location: field(formData, "location"),
    students: field(formData, "students"),
    notes: field(formData, "notes"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver(
      "booking",
      `New class signup: ${parsed.data.name} — ${parsed.data.course} on ${parsed.data.preferredDate}`,
      parsed.data
    )
    return {
      status: "success",
      message:
        `Your class request is in. Pulse CPR will send a ${siteConfig.payments.processor} payment link to confirm the seat.`,
    }
  } catch {
    return {
      status: "error",
      message: `Booking could not be submitted. Call ${siteConfig.phone} to reserve a seat.`,
    }
  }
}

export async function submitQuote(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = quoteSchema.safeParse({
    company: field(formData, "company"),
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    industry: field(formData, "industry"),
    employees: field(formData, "employees"),
    location: field(formData, "location"),
    courses: field(formData, "courses"),
    details: field(formData, "details"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver("corporate-quote", `New corporate quote from ${parsed.data.company}`, parsed.data)
    return {
      status: "success",
      message:
        "Quote request received. We typically return group pricing the same business day.",
    }
  } catch {
    return {
      status: "error",
      message: `We could not send your quote request. Email ${siteConfig.email} or call us.`,
    }
  }
}

export async function submitNewsletter(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = newsletterSchema.safeParse({
    email: field(formData, "email"),
  })

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Enter a valid email.",
      fieldErrors: flattenErrors(parsed.error),
    }
  }

  try {
    await deliver("newsletter", `Newsletter signup: ${parsed.data.email}`, parsed.data)
    return {
      status: "success",
      message: "You are on the list. Renewal reminders and class openings will come to this inbox.",
    }
  } catch {
    return {
      status: "error",
      message: `Signup failed. Please try again or email ${siteConfig.email}.`,
    }
  }
}
