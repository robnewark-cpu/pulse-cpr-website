import { CoursePage } from "@/components/sections/course-page"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "First Aid Training in Oklahoma",
  description:
    "Workplace First Aid certification in Oklahoma City and on-site. Bleeding control, medical emergencies, and injury care for Oklahoma employers.",
  keywords: ["First Aid certification Oklahoma", "workplace first aid OKC", "OSHA first aid class Oklahoma"],
  path: "/first-aid-training",
})

export default function FirstAidPage() {
  return (
    <CoursePage
      path="/first-aid-training"
      eyebrow="First Aid"
      title="First Aid training that prepares people to act before EMS arrives"
      description="A practical, OSHA-friendly First Aid course for Oklahoma employers, coaches, and caregivers. Students practice bleeding control, injury assessment, and medical emergency response with current first aid science."
      image="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=1600&q=80"
      imageAlt="First aid supplies prepared for workplace emergency response training"
      audience="Workplaces and community teams"
      duration="2–3 hours"
      price="$69"
      outcomes={[
        "Assess a scene and a patient using a simple, repeatable process.",
        "Control life-threatening bleeding and treat for shock.",
        "Respond to burns, fractures, sprains, and environmental injuries.",
        "Recognize stroke, heart attack, seizure, and severe allergic reaction.",
        "Document and hand off care to arriving EMS.",
      ]}
      agenda={[
        {
          title: "Priorities and personal safety",
          detail: "Gloves, scene size-up, and deciding what must be treated first.",
        },
        {
          title: "Trauma skills",
          detail: "Direct pressure, tourniquet awareness, splinting principles, and burns.",
        },
        {
          title: "Medical emergencies",
          detail: "Diabetes, asthma, overdose recognition, and when to use an epinephrine auto-injector.",
        },
        {
          title: "Skills check",
          detail: "Scenario-based practice and a completion card valid for two years.",
        },
      ]}
      faqs={[
        {
          question: "Does this meet OSHA first aid expectations?",
          answer:
            "This course is designed for workplace first aid teams. We help you pair it with CPR/AED so your program matches OSHA’s first aid guidance for your industry.",
        },
        {
          question: "Do you train in Spanish?",
          answer:
            "Bilingual sessions can be arranged for corporate groups. Mention the need on your quote request.",
        },
      ]}
    />
  )
}
