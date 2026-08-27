"use client"

import { useState, useTransition } from "react"
import { cancelClass, duplicateClass } from "@/lib/tms/actions"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function ClassQuickActions({
  classId,
  cancelled,
}: {
  classId: string
  cancelled: boolean
}) {
  const [message, setMessage] = useState("")
  const [pending, start] = useTransition()

  return (
    <div className="flex flex-wrap gap-2">
      <form action={() => duplicateClass(classId)}>
        <button type="submit" className={cn(buttonVariants({ size: "lg" }), "min-h-11")}>
          Duplicate next week
        </button>
      </form>
      {cancelled ? null : (
        <button
          type="button"
          disabled={pending}
          className={cn(buttonVariants({ variant: "destructive", size: "lg" }), "min-h-11")}
          onClick={() => {
            if (!confirm("Cancel this class? Registered students will be emailed.")) return
            start(async () => {
              const result = await cancelClass(classId)
              setMessage(result.message)
            })
          }}
        >
          Cancel class
        </button>
      )}
      {message ? <p className="w-full text-sm text-muted-foreground">{message}</p> : null}
    </div>
  )
}
