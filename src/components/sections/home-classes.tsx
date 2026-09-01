import Image from "next/image"
import Link from "next/link"
import { InstructorPortrait } from "@/components/brand/instructor-portrait"
import { Container } from "@/components/layout/container"
import { FadeIn } from "@/components/motion/fade-in"
import { buttonVariants } from "@/components/ui/button-variants"
import { homeClassCards } from "@/lib/site"
import { cn } from "@/lib/utils"

export function HomeClasses() {
  return (
    <section className="bg-[#F5F6F8] py-14 sm:py-20" aria-labelledby="our-classes-heading">
      <Container className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-12">
        <div>
          <FadeIn>
            <h2
              id="our-classes-heading"
              className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl"
            >
              OUR CLASSES
            </h2>
          </FadeIn>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {homeClassCards.map((item, index) => (
              <FadeIn key={item.title} delay={index * 0.05}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {"duration" in item
                        ? `${item.price} · ${item.duration} in Edmond, OK`
                        : `${item.price} in Edmond, OK`}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
        <FadeIn delay={0.1}>
          <aside className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10 lg:sticky lg:top-28">
            <InstructorPortrait
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 32vw"
            />
            <div className="p-6 sm:p-7">
              <h2 className="text-2xl font-extrabold tracking-tight text-navy">
                MEET YOUR INSTRUCTOR
              </h2>
              <p className="mt-3 text-sm font-medium text-primary">Christine Oldenburg, RN</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Dedicated to providing professional CPR, AED, First Aid, and life-saving education throughout Oklahoma.
              </p>
              <Link
                href="/about"
                className={cn(buttonVariants({ size: "xl" }), "mt-6 w-full justify-center")}
              >
                Learn More
              </Link>
            </div>
          </aside>
        </FadeIn>
      </Container>
    </section>
  )
}
