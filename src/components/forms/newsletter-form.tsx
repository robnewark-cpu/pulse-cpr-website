"use client"

import { submitNewsletter } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { FormStatus, useFormAction } from "@/components/forms/form-shared"
import { cn } from "@/lib/utils"

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [state, action, pending] = useFormAction(submitNewsletter)
  const dark = variant === "dark"

  return (
    <form action={action} className="grid gap-2" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={cn(
            "h-11 flex-1 rounded-lg border px-3 text-sm",
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/50"
              : "border-input bg-white"
          )}
          aria-invalid={Boolean(state.fieldErrors?.email)}
        />
        <Button
          type="submit"
          disabled={pending}
          className={cn("h-11", dark && "bg-primary hover:bg-pulse-dark")}
        >
          {pending ? "Joining…" : "Join"}
        </Button>
      </div>
      <FormStatus state={state} />
    </form>
  )
}
