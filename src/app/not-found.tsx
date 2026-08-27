import Link from "next/link"
import { buttonVariants } from "@/components/ui/button-variants"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <section className="py-20">
      <Container className="max-w-xl text-center">
        <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">404</p>
        <h1 className="mt-3 text-3xl font-bold">This page is not on the calendar</h1>
        <p className="mt-3 text-muted-foreground">
          The link may be expired or mistyped. Head back to Pulse CPR training options.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ size: "xl" }), "justify-center")}>
            Home
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "xl", variant: "outline" }), "justify-center")}
          >
            Contact
          </Link>
        </div>
      </Container>
    </section>
  )
}
