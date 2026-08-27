import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

export function HomeCorporate() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <Image
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=80"
        alt="Healthcare professionals in a workplace training session"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy/78" />
      <Container className="relative">
        <FadeIn className="max-w-2xl text-white">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Bring CPR Training To Your Organization
          </h2>
          <p className="mt-5 text-base leading-7 text-white/85 sm:text-lg">
            On-site CPR, AED, and First Aid training for businesses, schools, churches, healthcare providers, and community organizations.
          </p>
          <Link
            href="/corporate-training"
            className={cn(
              buttonVariants({ size: "xl" }),
              "mt-8 justify-center bg-[#D62828] font-semibold text-white hover:bg-[#b51f1f]"
            )}
          >
            Request Corporate Training
          </Link>
        </FadeIn>
      </Container>
    </section>
  )
}
