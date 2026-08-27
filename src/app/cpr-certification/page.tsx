import { CoursePage } from "@/components/sections/course-page"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "CPR Certification in Oklahoma",
  description:
    "Heartsaver CPR certification at the Edmond classroom and on-site across Oklahoma City and the state. Adult, child, and infant CPR with choking response.",
  path: "/cpr-certification",
  keywords: ["CPR certification Oklahoma City", "Heartsaver CPR OKC", "CPR class Oklahoma"],
})

export default function CprCertificationPage() {
  return (
    <CoursePage
      path="/cpr-certification"
      eyebrow="Heartsaver CPR"
      title="CPR certification for workplaces, schools, and community responders"
      description="Learn adult, child, and infant CPR with choking relief and the confidence to start compressions before EMS arrives. Ideal for teachers, coaches, office teams, and anyone who is not a licensed healthcare provider."
      image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
      imageAlt="Stethoscope and clinical workspace representing professional emergency preparedness training"
      audience="Non-clinical responders"
      duration="3–4 hours"
      price="$75"
      outcomes={[
        "Recognize cardiac arrest and activate emergency response immediately.",
        "Deliver high-quality chest compressions at the correct rate and depth.",
        "Provide breaths and use a barrier device when appropriate.",
        "Relieve choking in adults, children, and infants.",
        "Work as a team until professional help takes over.",
      ]}
      agenda={[
        {
          title: "Recognition and scene safety",
          detail: "How to decide it is CPR time, call 911, and get an AED without losing compressions.",
        },
        {
          title: "Adult, child, and infant skills",
          detail: "Measured manikin practice with instructor coaching until the skill is automatic.",
        },
        {
          title: "Choking and special situations",
          detail: "Responsive and unresponsive choking, pregnancy considerations, and when to stop.",
        },
        {
          title: "Skills check and certification",
          detail: "Short assessment, then course completion documentation for your employer.",
        },
      ]}
      faqs={[
        {
          question: "Is this the right class instead of BLS?",
          answer:
            "If you are not a healthcare provider, Heartsaver CPR is usually correct. Nurses, EMTs, dental clinicians, and medical assistants typically need BLS Provider.",
        },
        {
          question: "Can I add First Aid the same day?",
          answer:
            "Yes. Combined Heartsaver CPR/AED/First Aid is our most requested workplace package and is listed on the class calendar.",
        },
      ]}
    />
  )
}
