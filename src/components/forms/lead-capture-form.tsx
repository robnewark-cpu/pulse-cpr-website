"use client"

import { submitBooking } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
  Field,
  fieldClassName,
  FormStatus,
  selectClassName,
  useFormAction,
} from "@/components/forms/form-shared"
import { courseSelectOptions } from "@/lib/site"

export function LeadCaptureForm({ compact = false }: { compact?: boolean }) {
  const [state, action, pending] = useFormAction(submitBooking)

  return (
    <form action={action} className="grid gap-3" noValidate>
      <Field label="Full name" name="name" error={state.fieldErrors?.name}>
        <input id="lead-name" name="name" required className={fieldClassName} autoComplete="name" />
      </Field>
      <Field label="Email" name="email" error={state.fieldErrors?.email}>
        <input
          id="lead-email"
          name="email"
          type="email"
          required
          className={fieldClassName}
          autoComplete="email"
        />
      </Field>
      <Field label="Phone" name="phone" error={state.fieldErrors?.phone}>
        <input id="lead-phone" name="phone" type="tel" required className={fieldClassName} autoComplete="tel" />
      </Field>
      <Field label="Course" name="course" error={state.fieldErrors?.course}>
        <select id="lead-course" name="course" required defaultValue="" className={selectClassName}>
          <option value="" disabled>
            What do you need?
          </option>
          {courseSelectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>
      <input type="hidden" name="preferredDate" value="soonest" />
      <input type="hidden" name="location" value="either" />
      <input type="hidden" name="students" value="1" />
      {!compact ? (
        <input type="hidden" name="notes" value="Homepage lead capture" />
      ) : null}
      <FormStatus state={state} />
      <Button type="submit" size="xl" disabled={pending}>
        {pending ? "Submitting…" : "Get class options"}
      </Button>
    </form>
  )
}
