"use client"

import { useActionState } from "react"
import { Field, FormStatus, fieldClassName } from "@/components/forms/form-shared"
import { Button } from "@/components/ui/button"
import { submitClassRegistration, type ActionResult } from "@/lib/tms/actions"
import type { ClassRecord } from "@/lib/tms/types"

const idle: ActionResult = { status: "idle", message: "" }

export function RegisterForm({ session }: { session: ClassRecord }) {
  const action = submitClassRegistration.bind(null, session.id)
  const [state, formAction, pending] = useActionState(action, idle)

  if (state.status === "success") {
    return <FormStatus state={state} />
  }

  return (
    <form action={formAction} className="grid gap-4">
      <FormStatus state={state} />
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
        {pending ? "Registering…" : "Confirm registration"}
      </Button>
    </form>
  )
}
