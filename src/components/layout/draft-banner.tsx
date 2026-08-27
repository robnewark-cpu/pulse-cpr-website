import Link from "next/link"

export function isDraftMode() {
  return process.env.NEXT_PUBLIC_DRAFT_MODE === "true"
}

export function DraftBanner() {
  if (!isDraftMode()) return null

  return (
    <div className="bg-primary px-4 py-2.5 text-center text-sm text-white">
      Draft for Christine’s approval — not the live PulseCPROK.com site yet.{" "}
      <Link href="/review" className="font-semibold underline underline-offset-2">
        Open the action lists
      </Link>
    </div>
  )
}
