import { CheckCircle2 } from "lucide-react"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { trustReasons } from "@/lib/site"

export function WhyTrainWithPulse({
  eyebrow = "Why train with Pulse CPR?",
  title = "Why train with Pulse CPR?",
}: {
  eyebrow?: string
  title?: string
}) {
  return (
    <section className="bg-accent/50 py-14 sm:py-20">
      <Container>
        <FadeIn>
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl text-3xl font-bold">{title}</h2>
        </FadeIn>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trustReasons.map((reason, index) => (
            <FadeIn key={reason} delay={index * 0.04}>
              <li className="flex h-full gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-navy/10">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-sm font-medium leading-6 text-navy">{reason}</p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </Container>
    </section>
  )
}
