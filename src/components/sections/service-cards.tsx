import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button-variants"
import { courses } from "@/lib/site"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/motion/fade-in"

export function ServiceCards({ limit }: { limit?: number }) {
  const items = limit ? courses.slice(0, limit) : courses

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((course, index) => (
        <FadeIn key={course.slug} delay={index * 0.06}>
          <Card className="h-full border-0 shadow-sm ring-1 ring-navy/10">
            <CardHeader>
              <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
                {course.duration} · {course.price}
              </p>
              <CardTitle className="text-xl">{course.title}</CardTitle>
              <CardDescription>{course.audience}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{course.summary}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-navy/80">
                {course.highlights.slice(0, 3).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="justify-between">
              <Link
                href={course.href}
                className={cn(buttonVariants({ variant: "ghost" }), "px-0 text-primary")}
              >
                Course details
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href={`/book?course=${course.slug}`} className={buttonVariants()}>
                Book
              </Link>
            </CardFooter>
          </Card>
        </FadeIn>
      ))}
    </div>
  )
}
