import { HomeClasses } from "@/components/sections/home-classes"
import { ClassFacts } from "@/components/sections/class-facts"
import { CtaBanner } from "@/components/sections/cta-banner"
import { PageHero } from "@/components/sections/page-hero"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "CPR Classes in Oklahoma",
  description:
    "Heartsaver, Basic Life Support, AED training, and First Aid certification classes from Pulse CPR in Edmond and on-site across Oklahoma.",
  path: "/classes",
})

export default function ClassesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Classes", path: "/classes" },
        ])}
      />
      <PageHero
        eyebrow="Pulse CPR classes"
        title="Find the right CPR, AED, or First Aid class."
        description="Heartsaver, Basic Life Support, AED, and First Aid classes for individuals, families, and Oklahoma organizations. Heartsaver is $95.00 and takes 4 to 5 hours. Basic Life Support is $95.00 and takes 3 to 4 hours. First Aid is $69, and AED is $59."
        primaryCta={{ href: "/book", label: "Sign Up Today" }}
        secondaryCta={{ href: "/class-calendar", label: "View schedule" }}
      />
      <ClassFacts heading="Oklahoma Heartsaver, Basic Life Support, AED, and First Aid prices" />
      <HomeClasses />
      <CtaBanner
        variant="red"
        title="Be Ready When Every Second Counts"
        description="Register for CPR training today."
        primary={{ href: "/book", label: "Register Now" }}
      />
    </>
  )
}
