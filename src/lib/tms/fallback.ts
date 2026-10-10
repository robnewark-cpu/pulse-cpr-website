import { defaultInstructor, siteConfig } from "@/lib/site"
import type { ClassRecord, CourseType } from "@/lib/tms/types"

export function defaultClassroom() {
  return `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
}

function publishedClass({
  slug,
  name,
  course_type,
  class_date,
  end_time,
  price,
  description,
}: {
  slug: string
  name: string
  course_type: CourseType
  class_date: string
  end_time: string
  price: number
  description: string
}): ClassRecord {
  const now = new Date().toISOString()
  return {
    id: `published-${slug}`,
    name,
    course_type,
    class_date,
    start_time: "10:00:00",
    end_time,
    instructor: defaultInstructor,
    location: defaultClassroom(),
    description,
    price,
    seats_available: 8,
    seats_remaining: 8,
    registration_deadline: null,
    status: "scheduled",
    created_at: now,
    updated_at: now,
  }
}

/** Posted public dates from Christine. Shown even when the instructor admin calendar is empty. */
export function fallbackClasses(): ClassRecord[] {
  return [
    publishedClass({
      slug: "2026-10-10-bls",
      name: "Basic Life Support",
      course_type: "Healthcare",
      class_date: "2026-10-10",
      end_time: "14:00:00",
      price: 95,
      description: "Basic Life Support for healthcare providers. 3 to 4 hours, starts at 10:00 AM.",
    }),
    publishedClass({
      slug: "2026-10-16-heartsaver",
      name: "Heartsaver",
      course_type: "CPR",
      class_date: "2026-10-16",
      end_time: "15:00:00",
      price: 95,
      description: "Heartsaver CPR for workplaces, schools, and community responders. 4 to 5 hours, starts at 10:00 AM.",
    }),
    publishedClass({
      slug: "2026-10-24-bls",
      name: "Basic Life Support",
      course_type: "Healthcare",
      class_date: "2026-10-24",
      end_time: "14:00:00",
      price: 95,
      description: "Basic Life Support for healthcare providers. 3 to 4 hours, starts at 10:00 AM.",
    }),
    publishedClass({
      slug: "2026-10-30-heartsaver",
      name: "Heartsaver",
      course_type: "CPR",
      class_date: "2026-10-30",
      end_time: "15:00:00",
      price: 95,
      description: "Heartsaver CPR for workplaces, schools, and community responders. 4 to 5 hours, starts at 10:00 AM.",
    }),
    publishedClass({
      slug: "2026-11-07-heartsaver",
      name: "Heartsaver",
      course_type: "CPR",
      class_date: "2026-11-07",
      end_time: "15:00:00",
      price: 95,
      description: "Heartsaver CPR for workplaces, schools, and community responders. 4 to 5 hours, starts at 10:00 AM.",
    }),
    publishedClass({
      slug: "2026-11-13-bls",
      name: "Basic Life Support",
      course_type: "Healthcare",
      class_date: "2026-11-13",
      end_time: "14:00:00",
      price: 95,
      description: "Basic Life Support for healthcare providers. 3 to 4 hours, starts at 10:00 AM.",
    }),
  ]
}

export function isPublishedClassId(id: string) {
  return id.startsWith("published-")
}
