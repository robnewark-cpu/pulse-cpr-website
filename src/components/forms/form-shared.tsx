"use client"

import { useActionState } from "react"
import type { FormState } from "@/app/actions"

const idle: FormState = { status: "idle", message: "" }

export function Field({
  label,
  name,
  error,
  children,
}: {
  label: string
  name: string
  error?: string
  children: React.ReactNode
}) {
  const errorId = `${name}-error`
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="text-sm font-medium text-navy">
        {label}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-white px-3 text-base md:text-sm"

export const selectClassName = `${fieldClassName} bg-white`

export function FormStatus({ state }: { state: FormState }) {
  if (state.status === "idle") return null
  return (
    <p
      role="status"
      className={
        state.status === "success"
          ? "rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
          : "rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive"
      }
    >
      {state.message}
    </p>
  )
}

export function useFormAction(action: (state: FormState, data: FormData) => Promise<FormState>) {
  return useActionState(action, idle)
}
