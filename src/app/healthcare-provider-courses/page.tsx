import { CoursePage } from "@/components/sections/course-page"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Healthcare Provider Courses | BLS, ACLS, PALS",
  description:
    "BLS Provider, ACLS, and PALS courses in Edmond for nurses, EMTs, dentists, and clinical teams. Renewal and initial tracks, plus on-site Oklahoma City sessions.",
  keywords: ["BLS class Oklahoma City", "ACLS Oklahoma", "PALS certification OKC", "healthcare CPR Oklahoma"],
  path: "/healthcare-provider-courses",
})

export default function HealthcareCoursesPage() {
  return (
    <CoursePage
      path="/healthcare-provider-courses"
      eyebrow="Clinical certification"
      title="BLS, ACLS, and PALS for healthcare providers"
      description="Christine Oldenburg teaches Pulse CPR healthcare provider courses to the standard Oklahoma hospitals, clinics, and credentialing offices expect. Choose initial or renewal tracks, including group sessions at your facility."
      image="https://images.unsplash.com/photo-1551190822-a9333d879b1f?auto=format&fit=crop&w=1600&q=80"
      imageAlt="Surgical and clinical team collaborating in a professional healthcare setting"
      audience="Licensed clinicians"
      duration="4–16 hours"
      price="From $95"
      outcomes={[
        "Perform high-performance BLS with closed-loop communication.",
        "Apply current ECC algorithms for adult and pediatric emergencies.",
        "Lead or participate in a resuscitation team with clear roles.",
        "Complete skills testing required for hospital credentialing.",
        "Receive provider eCards suitable for privileging files.",
      ]}
      agenda={[
        {
          title: "BLS Provider",
          detail: "Adult, child, and infant high-quality CPR, AED, bag-mask, and team dynamics. Initial and renewal options.",
        },
        {
          title: "ACLS Provider",
          detail: "Cardiac arrest, bradycardia, tachycardia, and post-cardiac arrest care with mega-code practice.",
        },
        {
          title: "PALS Provider",
          detail: "Pediatric assessment, respiratory emergencies, shock, and cardiac algorithms for kids.",
        },
        {
          title: "Facility groups",
          detail: "We schedule around night shift, float pools, and privileging deadlines at your clinic or hospital.",
        },
      ]}
      faqs={[
        {
          question: "Do I need to complete prework?",
          answer:
            "ACLS and PALS require assigned pre-course work. BLS may include a short online module depending on the track. We send links as soon as you are enrolled.",
        },
        {
          question: "Can expired cards still renew?",
          answer:
            "If your card is recently expired, we can often place you in a renewal-length session. Cards expired for a longer period may need the full initial course.",
        },
      ]}
    />
  )
}
