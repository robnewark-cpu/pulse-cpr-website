"use client"

import { submitBooking } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  fieldClassName,
  FormStatus,
  selectClassName,
  useFormAction,
} from "@/components/forms/form-shared"
import { courseSelectOptions } from "@/lib/site"

export function BookingForm({ defaultCourse }: { defaultCourse?: string }) {
  const [state, action, pending] = useFormAction(submitBooking)

  return (
    <form action={action} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" error={state.fieldErrors?.name}>
          <input id="name" name="name" autoComplete="name" required className={fieldClassName} />
        </Field>
        <Field label="Email" name="email" error={state.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClassName}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" error={state.fieldErrors?.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={fieldClassName} />
        </Field>
        <Field label="Course" name="course" error={state.fieldErrors?.course}>
          <select
            id="course"
            name="course"
            required
            defaultValue={defaultCourse ?? ""}
            className={selectClassName}
          >
            <option value="" disabled>
              Select a course
            </option>
            {courseSelectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred date" name="preferredDate" error={state.fieldErrors?.preferredDate}>
          <input id="preferredDate" name="preferredDate" type="date" required className={fieldClassName} />
        </Field>
        <Field label="Training location" name="location" error={state.fieldErrors?.location}>
          <select id="location" name="location" required defaultValue="" className={selectClassName}>
            <option value="" disabled>
              Choose a setting
            </option>
            <option value="edmond-classroom">Edmond classroom</option>
            <option value="on-site">On-site at our workplace</option>
            <option value="either">Either works</option>
          </select>
        </Field>
      </div>
      <Field label="Number of students" name="students" error={state.fieldErrors?.students}>
        <input
          id="students"
          name="students"
          type="number"
          min={1}
          max={40}
          defaultValue={1}
          required
          className={fieldClassName}
        />
      </Field>
      <Field label="Notes (optional)" name="notes">
        <Textarea id="notes" name="notes" rows={4} placeholder="Shift constraints, renewal deadline, or industry requirements." />
      </Field>
      <FormStatus state={state} />
      <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Requesting seat…" : "Request a seat"}
      </Button>
    </form>
  )
}
