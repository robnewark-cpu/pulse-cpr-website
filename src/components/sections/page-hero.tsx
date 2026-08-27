import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button-variants"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  eyebrow?: string
  title: string
  description: string
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
}) {
  return (
    <section className="border-b bg-gradient-to-b from-accent to-white">
      <Container className="py-12 sm:py-16 lg:py-20">
        {eyebrow ? (
          <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {primaryCta ? (
              <Link
                href={primaryCta.href}
                className={cn(buttonVariants({ size: "xl" }), "justify-center")}
              >
                {primaryCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "justify-center border-navy/20 text-navy"
                )}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
