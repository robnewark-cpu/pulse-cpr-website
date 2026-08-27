"use client"

import { useActionState } from "react"
import { Field, FormStatus, fieldClassName } from "@/components/forms/form-shared"
import { Button } from "@/components/ui/button"
import { createFirstInstructor, signInInstructor, type ActionResult } from "@/lib/tms/actions"

const idle: ActionResult = { status: "idle", message: "" }
const inputClass = `${fieldClassName} min-h-12 text-base`

export function LoginForm({ canCreate }: { canCreate: boolean }) {
  const [signInState, signInAction, signingIn] = useActionState(signInInstructor, idle)
  const [createState, createAction, creating] = useActionState(createFirstInstructor, idle)

  return (
    <div className="grid gap-8">
      <form action={signInAction} className="grid gap-4">
        <h2 className="text-lg font-semibold text-navy">Sign in</h2>
        <FormStatus state={signInState} />
        <Field label="Email" name="email">
          <input id="email" name="email" type="email" autoComplete="username" required className={inputClass} />
        </Field>
        <Field label="Password" name="password">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={inputClass}
          />
        </Field>
        <Button type="submit" size="xl" className="h-14" disabled={signingIn}>
          {signingIn ? "Signing in…" : "Open class manager"}
        </Button>
      </form>
      {canCreate ? (
        <form action={createAction} className="grid gap-4 border-t pt-8">
          <h2 className="text-lg font-semibold text-navy">First-time setup</h2>
          <p className="text-sm text-muted-foreground">
            Create the instructor login. Only the first account becomes staff.
          </p>
          <FormStatus state={createState} />
          <Field label="Your name" name="name">
            <input id="name" name="name" defaultValue="Christine" className={inputClass} />
          </Field>
          <Field label="Email" name="setup-email">
            <input id="setup-email" name="email" type="email" required className={inputClass} />
          </Field>
          <Field label="Password (8+ characters)" name="setup-password">
            <input id="setup-password" name="password" type="password" required minLength={8} className={inputClass} />
          </Field>
          <Button type="submit" size="xl" variant="outline" className="h-14" disabled={creating}>
            {creating ? "Creating…" : "Create instructor account"}
          </Button>
        </form>
      ) : null}
    </div>
  )
}
