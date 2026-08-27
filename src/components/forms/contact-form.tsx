"use client"

import { submitContact } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  fieldClassName,
  FormStatus,
  selectClassName,
  useFormAction,
} from "@/components/forms/form-shared"

export function ContactForm() {
  const [state, action, pending] = useFormAction(submitContact)

  return (
    <form action={action} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" error={state.fieldErrors?.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            className={fieldClassName}
            aria-invalid={Boolean(state.fieldErrors?.name)}
          />
        </Field>
        <Field label="Email" name="email" error={state.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClassName}
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" name="phone" error={state.fieldErrors?.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={fieldClassName}
            aria-invalid={Boolean(state.fieldErrors?.phone)}
          />
        </Field>
        <Field label="Subject" name="subject" error={state.fieldErrors?.subject}>
          <select
            id="subject"
            name="subject"
            required
            defaultValue=""
            className={selectClassName}
            aria-invalid={Boolean(state.fieldErrors?.subject)}
          >
            <option value="" disabled>
              Select a topic
            </option>
            <option value="class">Public class question</option>
            <option value="corporate">Corporate training</option>
            <option value="healthcare">Healthcare provider cards</option>
            <option value="billing">Billing or eCards</option>
            <option value="other">Something else</option>
          </select>
        </Field>
      </div>
      <Field label="Organization (optional)" name="company">
        <input id="company" name="company" autoComplete="organization" className={fieldClassName} />
      </Field>
      <Field label="How can we help?" name="message" error={state.fieldErrors?.message}>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          className="min-h-32"
          aria-invalid={Boolean(state.fieldErrors?.message)}
        />
      </Field>
      <FormStatus state={state} />
      <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  )
}
