"use client"

import { submitQuote } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  fieldClassName,
  FormStatus,
  selectClassName,
  useFormAction,
} from "@/components/forms/form-shared"

export function CorporateQuoteForm() {
  const [state, action, pending] = useFormAction(submitQuote)

  return (
    <form action={action} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Organization" name="company" error={state.fieldErrors?.company}>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            className={fieldClassName}
          />
        </Field>
        <Field label="Your name" name="name" error={state.fieldErrors?.name}>
          <input id="name" name="name" autoComplete="name" required className={fieldClassName} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Work email" name="email" error={state.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClassName}
          />
        </Field>
        <Field label="Phone" name="phone" error={state.fieldErrors?.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required className={fieldClassName} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Industry" name="industry" error={state.fieldErrors?.industry}>
          <select id="industry" name="industry" required defaultValue="" className={selectClassName}>
            <option value="" disabled>
              Select industry
            </option>
            <option value="healthcare">Healthcare / clinic</option>
            <option value="education">School / childcare</option>
            <option value="government">Government / public safety</option>
            <option value="hospitality">Hospitality / food service</option>
            <option value="industrial">Industrial / construction</option>
            <option value="corporate">Corporate office</option>
            <option value="faith">Faith / community</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="People to certify" name="employees" error={state.fieldErrors?.employees}>
          <select id="employees" name="employees" required defaultValue="" className={selectClassName}>
            <option value="" disabled>
              Team size
            </option>
            <option value="6-12">6–12</option>
            <option value="13-24">13–24</option>
            <option value="25-49">25–49</option>
            <option value="50+">50+</option>
          </select>
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Worksite city" name="location" error={state.fieldErrors?.location}>
          <input
            id="location"
            name="location"
            placeholder="Oklahoma City, Tulsa, Norman…"
            required
            className={fieldClassName}
          />
        </Field>
        <Field label="Courses needed" name="courses" error={state.fieldErrors?.courses}>
          <select id="courses" name="courses" required defaultValue="" className={selectClassName}>
            <option value="" disabled>
              Select training
            </option>
            <option value="cpr-aed">CPR / AED</option>
            <option value="first-aid">First Aid</option>
            <option value="cpr-first-aid">CPR / AED / First Aid</option>
            <option value="bls">BLS Provider</option>
            <option value="mixed">Mixed roster — help us plan</option>
          </select>
        </Field>
      </div>
      <Field label="Scheduling notes" name="details">
        <Textarea
          id="details"
          name="details"
          rows={4}
          placeholder="Shifts, credentialing deadlines, multiple locations, or bilingual needs."
        />
      </Field>
      <FormStatus state={state} />
      <Button type="submit" size="xl" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Sending request…" : "Request a corporate quote"}
      </Button>
    </form>
  )
}
