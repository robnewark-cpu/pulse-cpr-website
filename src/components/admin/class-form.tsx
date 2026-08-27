"use client"

import { useActionState } from "react"
import { Field, FormStatus, fieldClassName, selectClassName } from "@/components/forms/form-shared"
import { Button } from "@/components/ui/button"
import { saveClass, type ActionResult } from "@/lib/tms/actions"
import { COURSE_TYPES, type ClassRecord } from "@/lib/tms/types"
import { toDatetimeLocal } from "@/lib/tms/format"

const idle: ActionResult = { status: "idle", message: "" }
const inputClass = `${fieldClassName} min-h-12 text-base`

export function ClassForm({
  session,
  defaults,
}: {
  session?: ClassRecord
  defaults: { instructor: string; location: string }
}) {
  const action = saveClass.bind(null, session?.id)
  const [state, formAction, pending] = useActionState(action, idle)

  return (
    <form action={formAction} className="grid gap-4 pb-8">
      <FormStatus state={state} />
      <Field label="Class name" name="name" error={state.fieldErrors?.name}>
        <input
          id="name"
          name="name"
          required
          defaultValue={session?.name ?? ""}
          placeholder="Heartsaver CPR/AED"
          className={inputClass}
        />
      </Field>
      <Field label="Course type" name="course_type" error={state.fieldErrors?.course_type}>
        <select
          id="course_type"
          name="course_type"
          required
          defaultValue={session?.course_type ?? "CPR"}
          className={`${selectClassName} min-h-12 text-base`}
        >
          {COURSE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Date" name="class_date" error={state.fieldErrors?.class_date}>
          <input
            id="class_date"
            name="class_date"
            type="date"
            required
            defaultValue={session?.class_date ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Start time" name="start_time" error={state.fieldErrors?.start_time}>
          <input
            id="start_time"
            name="start_time"
            type="time"
            required
            defaultValue={session?.start_time?.slice(0, 5) ?? "17:30"}
            className={inputClass}
          />
        </Field>
        <Field label="End time" name="end_time" error={state.fieldErrors?.end_time}>
          <input
            id="end_time"
            name="end_time"
            type="time"
            required
            defaultValue={session?.end_time?.slice(0, 5) ?? "21:00"}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Instructor" name="instructor" error={state.fieldErrors?.instructor}>
        <input
          id="instructor"
          name="instructor"
          required
          defaultValue={session?.instructor || defaults.instructor}
          className={inputClass}
        />
      </Field>
      <Field label="Location" name="location" error={state.fieldErrors?.location}>
        <input
          id="location"
          name="location"
          required
          defaultValue={session?.location || defaults.location}
          className={inputClass}
        />
      </Field>
      <Field label="Description" name="description" error={state.fieldErrors?.description}>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={session?.description ?? ""}
          className="min-h-28 w-full rounded-lg border border-input bg-white px-3 py-2 text-base"
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Price (USD)" name="price" error={state.fieldErrors?.price}>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step="1"
            required
            defaultValue={session?.price ?? 75}
            className={inputClass}
          />
        </Field>
        <Field label="Seats available" name="seats_available" error={state.fieldErrors?.seats_available}>
          <input
            id="seats_available"
            name="seats_available"
            type="number"
            min={1}
            required
            defaultValue={session?.seats_available ?? 8}
            className={inputClass}
          />
        </Field>
      </div>
      <Field
        label="Registration deadline"
        name="registration_deadline"
        error={state.fieldErrors?.registration_deadline}
      >
        <input
          id="registration_deadline"
          name="registration_deadline"
          type="datetime-local"
          defaultValue={toDatetimeLocal(session?.registration_deadline ?? null)}
          className={inputClass}
        />
      </Field>
      <Button type="submit" size="xl" className="h-14 w-full text-base" disabled={pending}>
        {pending ? "Saving…" : session ? "Save changes" : "Create class"}
      </Button>
    </form>
  )
}
