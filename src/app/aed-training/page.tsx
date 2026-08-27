import { CoursePage } from "@/components/sections/course-page"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "AED Training in Oklahoma",
  description:
    "AED training for Oklahoma offices, gyms, churches, and public venues. Learn pad placement, prompts, and device readiness with Pulse CPR.",
  keywords: ["AED training Oklahoma", "AED class Oklahoma City", "defibrillator training OKC"],
  path: "/aed-training",
})

export default function AedTrainingPage() {
  return (
    <CoursePage
      path="/aed-training"
      eyebrow="AED"
      title="AED training that turns a wall-mounted device into a ready program"
      description="Sudden cardiac arrest is a minute-by-minute emergency. This course teaches Oklahoma teams to retrieve the AED, apply pads correctly, follow prompts, and keep compressions going."
      image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80"
      imageAlt="Clinical training environment used for emergency and AED skills practice"
      audience="Public venues and workplace response teams"
      duration="2 hours"
      price="$59"
      outcomes={[
        "Identify sudden cardiac arrest and send someone for the AED immediately.",
        "Place adult and pediatric pads correctly and follow device prompts.",
        "Coordinate CPR with AED analysis so pauses stay short.",
        "Perform weekly readiness checks: pads, battery, and cabinet access.",
        "Understand Oklahoma Good Samaritan context for trained responders.",
      ]}
      agenda={[
        {
          title: "Why AEDs change survival",
          detail: "Time-to-shock, shockable rhythms in plain language, and the role of bystanders.",
        },
        {
          title: "Hands-on with trainer AEDs",
          detail: "Multiple device styles so your team is not lost if the prompts look different.",
        },
        {
          title: "Program readiness",
          detail: "Where to mount devices, who checks them, and how to brief new hires.",
        },
        {
          title: "Integrated CPR/AED scenario",
          detail: "A full run from collapse to EMS arrival, then completion documentation.",
        },
      ]}
      faqs={[
        {
          question: "Can you train on the AED brand we already own?",
          answer:
            "Yes. Tell us the manufacturer on your booking form. We bring trainer units and can incorporate your device’s prompts.",
        },
        {
          question: "Is AED-only training enough?",
          answer:
            "Most workplaces pair AED skills with CPR. If you already have current CPR cards, this workshop is an efficient refresh focused on the device.",
        },
      ]}
    />
  )
}
