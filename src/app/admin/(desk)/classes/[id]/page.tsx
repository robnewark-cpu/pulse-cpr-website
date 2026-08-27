import Link from "next/link"
import { notFound } from "next/navigation"
import { ClassForm } from "@/components/admin/class-form"
import { ClassQuickActions } from "@/components/admin/class-quick-actions"
import { buttonVariants } from "@/components/ui/button-variants"
import { defaultClassroom } from "@/lib/tms/fallback"
import { getClass } from "@/lib/tms/queries"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Edit class",
  robots: { index: false, follow: false },
}

export default async function EditClassPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getClass(id)
  if (!session) notFound()

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-navy">Edit class</h1>
        <Link
          href={`/admin/classes/${session.id}/roster`}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-h-11")}
        >
          View roster
        </Link>
      </div>
      <div className="mb-6">
        <ClassQuickActions classId={session.id} cancelled={session.status === "cancelled"} />
      </div>
      {session.status === "cancelled" ? (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive">This class is cancelled.</p>
      ) : null}
      <ClassForm
        session={session}
        defaults={{ instructor: session.instructor, location: session.location || defaultClassroom() }}
      />
    </div>
  )
}
