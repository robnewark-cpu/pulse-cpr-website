import Link from "next/link"
import { Award, HeartHandshake, ShieldCheck } from "lucide-react"
import { InstructorPortrait } from "@/components/brand/instructor-portrait"
import { FadeIn } from "@/components/motion/fade-in"
import { buttonVariants } from "@/components/ui/button-variants"
import { cn } from "@/lib/utils"

const trustPoints = [
  { icon: ShieldCheck, label: "Expert Instruction" },
  { icon: HeartHandshake, label: "Hands-On Training" },
  { icon: Award, label: "Certification You Can Trust" },
]

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-white">
      <div className="grid lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
        <FadeIn className="flex items-center">
          <div className="container-site w-full py-12 sm:py-16 lg:max-w-none lg:py-20 lg:pr-10 lg:pl-[max(1.5rem,calc((100vw-76rem)/2+1.5rem))]">
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              Learn It. Know It. Save A Life.
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-[4.35rem] lg:leading-[0.95]">
              <span className="block text-navy">LEARN CPR.</span>
              <span className="mt-2 block text-[#D62828]">SAVE LIVES.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              American Heart Association and American Red Cross CPR, AED, First Aid, and BLS
              certification from Edmond, Oklahoma, plus on-site classes for Oklahoma City and
              statewide teams. Heartsaver CPR is $95.00 and takes 4 to 5 hours. First Aid is $69,
              AED is $59, and BLS Provider is $95. The Edmond classroom is open Monday–Friday
              8:00 AM – 6:00 PM and
              Saturday 9:00 AM – 2:00 PM.
            </p>
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {trustPoints.map((item) => (
                <li
                  key={item.label}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy"
                >
                  <item.icon className="size-4 text-primary" aria-hidden="true" />
                  {item.label}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/classes"
                className={cn(
                  buttonVariants({ size: "xl" }),
                  "min-h-12 justify-center bg-[#D62828] font-semibold text-white hover:bg-[#b51f1f]"
                )}
              >
                View Classes
              </Link>
              <Link
                href="/class-calendar"
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "min-h-12 justify-center border-navy/20 font-semibold text-navy hover:bg-accent"
                )}
              >
                Schedule A Class
              </Link>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              <Link href="/oklahoma-cpr-training" className="font-semibold text-navy underline-offset-4 hover:underline">
                CPR training across Oklahoma
              </Link>
              , including Edmond, Oklahoma City, Norman, and on-site workplaces.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.08} className="relative min-h-[18rem] sm:min-h-[32rem] lg:min-h-full">
          <InstructorPortrait
            priority
            className="absolute inset-0 h-full min-h-[18rem] sm:min-h-[32rem] lg:min-h-[38rem]"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </FadeIn>
      </div>
    </section>
  )
}
