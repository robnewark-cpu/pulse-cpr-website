"use client"

import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { testimonials } from "@/lib/site"

export function TestimonialCarousel() {
  return (
    <Carousel opts={{ align: "start", loop: true }} className="px-12">
      <CarouselContent>
        {testimonials.map((item) => (
          <CarouselItem key={item.name} className="md:basis-1/2 lg:basis-1/3">
            <figure className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-navy/10">
              <div className="flex gap-0.5 text-primary" aria-label={`${item.rating} out of 5 stars`}>
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-6 text-navy/85">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t pt-4">
                <p className="font-semibold text-navy">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.title}, {item.org}
                </p>
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
