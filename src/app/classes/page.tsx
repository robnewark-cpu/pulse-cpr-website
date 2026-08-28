import { HomeClasses } from "@/components/sections/home-classes"
import { ClassFacts } from "@/components/sections/class-facts"
import { CtaBanner } from "@/components/sections/cta-banner"
import { PageHero } from "@/components/sections/page-hero"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbJsonLd, createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "CPR Classes in Oklahoma",
  description:
    "Adult CPR, pediatric and infant CPR, AED training, and First Aid certification classes from Pulse CPR in Edmond and on-site across Oklahoma.",
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
        description="American Heart Association and American Red Cross certification classes for individuals, families, and Oklahoma organizations. Heartsaver CPR is $75, First Aid is $69, AED is $59, and BLS Provider is $95."
        primaryCta={{ href: "/book", label: "Sign Up Today" }}
        secondaryCta={{ href: "/class-calendar", label: "View schedule" }}
      />
      <ClassFacts heading="Oklahoma CPR, AED, First Aid, and BLS prices" />
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
