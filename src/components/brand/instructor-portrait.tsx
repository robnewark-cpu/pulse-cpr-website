import Image from "next/image"
import { instructorPhoto } from "@/lib/site"
import { cn } from "@/lib/utils"

export function InstructorPortrait({
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 45vw",
}: {
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={instructorPhoto.src}
        alt={instructorPhoto.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-[center_18%]", imageClassName)}
      />
    </div>
  )
}
