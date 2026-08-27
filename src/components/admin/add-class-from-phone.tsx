import Link from "next/link"
import { siteConfig } from "@/lib/site"

const loginPath = "/admin/login"
const loginUrl = `${siteConfig.url}${loginPath}`

const fields = [
  { label: "Class name", hint: "example: Heartsaver CPR/AED" },
  { label: "Course type", hint: "CPR, First Aid, AED, Healthcare, or Corporate" },
  { label: "Date" },
  { label: "Start time and End time" },
  { label: "Instructor", hint: "leave as Christine Oldenburg" },
  {
    label: "Location",
    hint: "Edmond classroom is already filled in. Change it only if you are teaching on-site somewhere else",
  },
  { label: "Price" },
  { label: "Seats available" },
] as const

export function AddClassFromPhoneGuide() {
  return (
    <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10 sm:p-8">
      <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
        For Christine
      </p>
      <h2 className="mt-2 text-2xl font-bold text-navy sm:text-3xl">
        How to add a class from your phone
      </h2>
      <ol className="mt-6 grid gap-5 text-sm leading-6 text-navy/85">
        <li>
          <p className="font-semibold text-navy">1. Open Safari or Chrome and go to</p>
          <p className="mt-1">
            <Link href={loginPath} className="break-all font-medium text-primary underline-offset-2 hover:underline">
              {loginUrl}
            </Link>
          </p>
          <p className="mt-1 text-muted-foreground">
            If that does not open yet, use the Cloudflare site link Rob sent you, then add{" "}
            <code className="text-navy">{loginPath}</code> at the end.
          </p>
        </li>
        <li>
          <p className="font-semibold text-navy">2. Sign in with the email and password Rob set up for you.</p>
          <p className="mt-1">Tap <span className="font-medium text-navy">Open class manager</span>.</p>
        </li>
        <li>
          <p className="font-semibold text-navy">
            3. At the bottom of the screen, tap <span className="text-primary">New class</span>.
          </p>
        </li>
        <li>
          <p className="font-semibold text-navy">4. Fill in the class:</p>
          <ul className="mt-2 grid gap-2">
            {fields.map((field) => (
              <li key={field.label} className="rounded-xl bg-accent/60 px-3 py-2">
                <span className="font-medium text-navy">{field.label}</span>
                {"hint" in field && field.hint ? (
                  <span className="text-muted-foreground"> — {field.hint}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </li>
        <li>
          <p className="font-semibold text-navy">
            5. Tap <span className="text-primary">Create class</span>.
          </p>
        </li>
      </ol>
      <p className="mt-6 text-sm leading-6 text-navy/85">
        The class shows up right away on the public Schedule page so students can register.
      </p>
      <p className="mt-3 text-sm leading-6 text-navy/85">
        Next time: open the same login link, then tap <span className="font-medium">New class</span> again. To copy last
        week’s class to next week, open the class and tap{" "}
        <span className="font-medium">Duplicate next week</span>. To take a class down, tap{" "}
        <span className="font-medium">Cancel class</span>.
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Save the login page to your home screen: Share → Add to Home Screen.
      </p>
    </article>
  )
}
