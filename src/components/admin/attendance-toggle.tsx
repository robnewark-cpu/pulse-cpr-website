"use client"

import { useTransition } from "react"
import { markAttendance } from "@/lib/tms/actions"
import type { RegistrationRecord } from "@/lib/tms/types"
import { cn } from "@/lib/utils"

export function AttendanceToggle({
  classId,
  row,
}: {
  classId: string
  row: RegistrationRecord
}) {
  const [pending, start] = useTransition()
  const attended = row.status === "attended" || row.attended === true

  return (
    <button
      type="button"
      disabled={pending || row.status === "cancelled"}
      onClick={() => start(() => markAttendance(row.id, classId, !attended))}
      className={cn(
        "min-h-11 rounded-lg px-3 text-sm font-medium",
        attended ? "bg-emerald-100 text-emerald-900" : "bg-accent text-navy"
      )}
    >
      {attended ? "Attended" : "Mark attended"}
    </button>
  )
}
