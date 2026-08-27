import { redirect } from "next/navigation"
import { LoginForm } from "@/components/admin/login-form"
import { isSupabaseConfigured } from "@/lib/tms/types"
import { currentStaff, staffConfigured } from "@/lib/tms/queries"
import { siteConfig } from "@/lib/site"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Instructor login",
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const staff = await currentStaff()
  if (staff) redirect("/admin")

  const configured = isSupabaseConfigured()
  const canCreate = configured ? !(await staffConfigured()) : false

  return (
    <section className="mx-auto max-w-md px-4 py-10">
      <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">Pulse CPR</p>
      <h1 className="mt-2 text-3xl font-bold text-navy">Class manager</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        For the instructor. Students register from the public calendar.
      </p>
      {configured ? (
        <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
          <LoginForm canCreate={canCreate} />
        </div>
      ) : (
        <div className="mt-8 rounded-2xl bg-white p-5 text-sm leading-6 text-navy shadow-sm ring-1 ring-navy/10">
          <p className="font-semibold">Connect Supabase to turn this on.</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>Create a Supabase project.</li>
            <li>Paste <code className="text-navy">supabase/schema.sql</code> into the SQL editor.</li>
            <li>
              Add <code className="text-navy">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="text-navy">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to the host.
            </li>
            <li>Reload this page and create the first instructor login.</li>
          </ol>
          <p className="mt-4">Need help? Call {siteConfig.phone}.</p>
        </div>
      )}
    </section>
  )
}
