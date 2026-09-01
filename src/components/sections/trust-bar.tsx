import { Award, CalendarCheck, MapPinned, Users } from "lucide-react"
import { Container } from "@/components/layout/container"

const items = [
  { icon: Award, label: "AHA Instructor Certified" },
  { icon: MapPinned, label: "Proudly Serving Oklahoma" },
  { icon: Users, label: "Classes For All Skill Levels" },
  { icon: CalendarCheck, label: "Flexible Scheduling Available" },
]

export function TrustBar() {
  return (
    <section className="bg-navy text-white" aria-label="Trust indicators">
      <Container className="grid grid-cols-2 gap-6 py-8 lg:grid-cols-4 lg:py-10">
        {items.map((item) => (
          <p
            key={item.label}
            className="flex flex-col items-start gap-3 text-sm font-semibold leading-snug sm:flex-row sm:items-center sm:text-[0.95rem]"
          >
            <item.icon className="size-6 shrink-0 text-white" aria-hidden="true" />
            <span>{item.label}</span>
          </p>
        ))}
      </Container>
    </section>
  )
}
