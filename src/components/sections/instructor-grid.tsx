import Image from "next/image"
import { instructors } from "@/lib/site"
import { FadeIn } from "@/components/motion/fade-in"

export function InstructorGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {instructors.map((instructor, index) => (
        <FadeIn key={instructor.name} delay={index * 0.05}>
          <article className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10">
            <div className="relative aspect-[4/5]">
              <Image
                src={instructor.image}
                alt={`Portrait of ${instructor.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{instructor.name}</h3>
              <p className="text-sm font-medium text-primary">{instructor.role}</p>
              <p className="mt-1 text-xs text-muted-foreground">{instructor.credentials}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{instructor.bio}</p>
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  )
}
