import Image from "next/image"
import { instructors } from "@/lib/site"
import { FadeIn } from "@/components/motion/fade-in"

function initials(name: string) {
  return name
    .replace(/,?\s*RN\s*$/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

export function InstructorGrid({ variant = "full" }: { variant?: "short" | "full" }) {
  const single = instructors.length === 1

  return (
    <div className={single ? "max-w-4xl" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
      {instructors.map((instructor, index) => (
        <FadeIn key={instructor.name} delay={index * 0.05}>
          <article
            className={
              single
                ? "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10 lg:grid lg:grid-cols-[14rem_1fr]"
                : "overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy/10"
            }
          >
            <div className={single ? "relative aspect-[4/5] lg:aspect-auto lg:min-h-[18rem]" : "relative aspect-[4/5]"}>
              {instructor.image ? (
                <Image
                  src={instructor.image}
                  alt={`Portrait of ${instructor.name}`}
                  fill
                  sizes={single ? "(max-width: 1024px) 100vw, 280px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                  className="object-cover"
                />
              ) : (
                <div
                  className="flex h-full min-h-[16rem] items-center justify-center bg-navy text-5xl font-semibold tracking-wide text-white"
                  aria-hidden="true"
                >
                  {initials(instructor.name)}
                </div>
              )}
            </div>
            <div className="p-5 sm:p-8">
              <h3 className="text-lg font-semibold sm:text-2xl">{instructor.name}</h3>
              <p className="text-sm font-medium text-primary">{instructor.role}</p>
              <p className="mt-1 text-xs text-muted-foreground">{instructor.credentials}</p>
              {variant === "short" ? (
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{instructor.shortBio}</p>
              ) : (
                <>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                    {instructor.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  <p className="mt-5 text-[11px] font-semibold tracking-[0.14em] text-primary uppercase">
                    Current certifications
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-navy/85">
                    {instructor.certifications.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </article>
        </FadeIn>
      ))}
    </div>
  )
}
