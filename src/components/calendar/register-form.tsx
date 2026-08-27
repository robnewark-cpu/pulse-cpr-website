"use client"

import { useActionState } from "react"
import { Field, FormStatus, fieldClassName } from "@/components/forms/form-shared"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button-variants"
import { submitClassRegistration, type ActionResult } from "@/lib/tms/actions"
import { siteConfig } from "@/lib/site"
import type { ClassRecord } from "@/lib/tms/types"
import { cn } from "@/lib/utils"

const idle: ActionResult = { status: "idle", message: "" }

export function RegisterForm({ session }: { session: ClassRecord }) {
  const action = submitClassRegistration.bind(null, session.id)
  const [state, formAction, pending] = useActionState(action, idle)
  const payUrl = siteConfig.payments.url

  if (state.status === "success") {
    return (
      <div className="grid gap-4">
        <FormStatus state={state} />
        {payUrl ? (
          <a
            href={payUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "xl" }), "h-14 justify-center")}
          >
            Pay with {siteConfig.payments.processor}
          </a>
        ) : (
          <p className="text-sm text-muted-foreground">
            {siteConfig.payments.processor} processes Pulse CPR class payments. You will receive a payment link to confirm this seat.
          </p>
        )}
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-4">
      <FormStatus state={state} />
      <p className="text-sm text-muted-foreground">
        Payments are processed by {siteConfig.payments.processor}. Completing payment confirms your seat. Pulse CPR does not take card numbers on this form.
      </p>
      <Field label="Full name" name="student_name" error={state.fieldErrors?.student_name}>
        <input id="student_name" name="student_name" required className={`${fieldClassName} min-h-12`} />
      </Field>
      <Field label="Email" name="email" error={state.fieldErrors?.email}>
        <input id="email" name="email" type="email" required className={`${fieldClassName} min-h-12`} />
      </Field>
      <Field label="Phone" name="phone" error={state.fieldErrors?.phone}>
        <input id="phone" name="phone" type="tel" required className={`${fieldClassName} min-h-12`} />
      </Field>
      <Field label="Number of seats" name="seats" error={state.fieldErrors?.seats}>
        <input
          id="seats"
          name="seats"
          type="number"
          min={1}
          max={Math.max(session.seats_remaining, 1)}
          defaultValue={1}
          required
          className={`${fieldClassName} min-h-12`}
        />
      </Field>
      <Field label="Notes (optional)" name="notes">
        <textarea id="notes" name="notes" rows={3} className="min-h-24 w-full rounded-lg border px-3 py-2" />
      </Field>
      <Button type="submit" size="xl" className="h-14" disabled={pending}>
        {pending ? "Saving…" : payUrl ? "Continue to payment" : "Request this class"}
      </Button>
    </form>
  )
}
