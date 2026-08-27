import Link from "next/link"
import { buttonVariants } from "@/components/ui/button-variants"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

export function CtaBanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string
  description: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
}) {
  return (
    <section className="bg-navy">
      <Container className="flex flex-col items-start justify-between gap-6 py-12 sm:py-16 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-white/75">{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primary.href}
            className={cn(buttonVariants({ size: "xl" }), "justify-center")}
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className={cn(
                buttonVariants({ size: "xl", variant: "outline" }),
                "justify-center border-white/30 bg-transparent text-white hover:bg-white/10"
              )}
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
