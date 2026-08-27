import Link from "next/link"
import { buttonVariants } from "@/components/ui/button-variants"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

export function CtaBanner({
  title,
  description,
  primary,
  secondary,
  variant = "navy",
}: {
  title: string
  description: string
  primary: { href: string; label: string }
  secondary?: { href: string; label: string }
  variant?: "navy" | "red"
}) {
  const isRed = variant === "red"

  return (
    <section className={isRed ? "bg-[#D62828]" : "bg-navy"}>
      <Container
        className={cn(
          "flex flex-col gap-6 py-12 sm:py-16",
          isRed ? "items-center text-center" : "items-start justify-between lg:flex-row lg:items-center"
        )}
      >
        <div className={cn("max-w-2xl", isRed && "max-w-3xl")}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">{title}</h2>
          <p className={cn("mt-3 text-white/80", isRed && "text-lg text-white/90")}>{description}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            href={primary.href}
            className={cn(
              buttonVariants({ size: "xl" }),
              "justify-center",
              isRed && "bg-white font-semibold text-navy hover:bg-white/90"
            )}
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
