import { ClassForm } from "@/components/admin/class-form"
import { defaultInstructor } from "@/lib/site"
import { defaultClassroom } from "@/lib/tms/fallback"

export const metadata = {
  title: "New class",
  robots: { index: false, follow: false },
}

export default function NewClassPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">New class</h1>
      <p className="mt-1 mb-6 text-sm text-muted-foreground">
        Fill the date, time, and seats. Students can register as soon as you save.
      </p>
      <ClassForm defaults={{ instructor: defaultInstructor, location: defaultClassroom() }} />
    </div>
  )
}
