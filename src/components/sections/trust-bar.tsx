import { ShieldCheck, Clock3, MapPinned, BadgeCheck } from "lucide-react"
import { Container } from "@/components/layout/container"
import { stats } from "@/lib/site"

const trust = [
  { icon: ShieldCheck, label: "Guideline-based instruction" },
  { icon: BadgeCheck, label: "Same-day eCards" },
  { icon: MapPinned, label: "On-site across Oklahoma" },
  { icon: Clock3, label: "Evening & weekend seats" },
]

export function TrustBar() {
  return (
    <section className="border-y bg-navy text-white">
      <Container className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label}>
            <p className="text-2xl font-bold sm:text-3xl">{item.value}</p>
            <p className="mt-1 text-sm text-white/70">{item.label}</p>
          </div>
        ))}
      </Container>
      <Container className="grid gap-3 border-t border-white/10 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((item) => (
          <p key={item.label} className="inline-flex items-center gap-2 text-sm text-white/85">
            <item.icon className="size-4 text-primary" aria-hidden="true" />
            {item.label}
          </p>
        ))}
      </Container>
    </section>
  )
}
