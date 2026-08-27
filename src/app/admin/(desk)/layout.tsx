import { redirect } from "next/navigation"
import { AdminChrome } from "@/components/admin/admin-chrome"
import { signOutInstructor } from "@/lib/tms/actions"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { currentStaff } from "@/lib/tms/queries"
import { isSupabaseConfigured } from "@/lib/tms/types"

export const dynamic = "force-dynamic"

export default async function AdminDeskLayout({ children }: { children: React.ReactNode }) {
  const staff = await currentStaff()
  if (staff) {
    return <AdminChrome email={staff.email}>{children}</AdminChrome>
  }

  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.getUser()
    if (data.user) {
      return (
        <section className="mx-auto max-w-md px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-navy">Instructor access only</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This Google or email login is not on the staff list. Sign out and use the instructor account.
          </p>
          <form action={signOutInstructor} className="mt-6">
            <button type="submit" className="text-sm font-medium text-primary">
              Sign out
            </button>
          </form>
        </section>
      )
    }
  }

  redirect("/admin/login")
}
