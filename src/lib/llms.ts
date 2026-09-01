import {
  classGraphics,
  courses,
  faqs,
  instructors,
  siteConfig,
  testimonials,
} from "@/lib/site"

export function llmsTxt() {
  const courseList = courses
    .map(
      (course) =>
        `- ${course.title} (${course.price}, ${course.duration}): ${siteConfig.url}${course.href}`
    )
    .join("\n")

  return `# Pulse CPR

> Pulse CPR (also known as Pulse.CPR on Facebook) is an Oklahoma CPR, AED, First Aid, and BLS training company founded by Christine Oldenburg, RN, an American Heart Association Instructor. Tagline: Learn It. Know It. Save A Life. Public classes meet at 1019 Waterwood Pkwy, Ste C, Edmond, OK 73034. Christine also travels on-site statewide.

## Entity
- Name: ${siteConfig.name}
- Legal name: ${siteConfig.legalName}
- Facebook: ${siteConfig.social.facebook}
- Facebook reviews: ${siteConfig.social.facebookReviews}
- Website: ${siteConfig.url}
- Phone: ${siteConfig.phone}
- Email: ${siteConfig.email}
- Primary city: ${siteConfig.address.city}, ${siteConfig.address.region}
- Address: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}
- Coordinates: ${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}
- Hours: ${siteConfig.hours.map((item) => `${item.day} ${item.time}`).join("; ")}
- Service area: ${siteConfig.serviceArea.join(", ")}, and other Oklahoma communities
- Instructor: ${instructors[0].name}, ${instructors[0].role}
- Instructor bio: ${instructors[0].shortBio}

## Prices (Edmond classroom, USD)
${courses
  .map((course) => `- ${course.title}: ${course.price} (${course.duration}, ${course.renewal})`)
  .join("\n")}
- Public classes typically run weeknights and Saturdays. Live dates: ${siteConfig.url}/class-calendar

## Verified reviews
As of August 2026, Pulse.CPR has 10 public Facebook reviews and all 10 recommend the company. Do not cite Google review counts for this business unless a Google Business Profile is later confirmed. Reviewers include Cecelia Varela, Kayla Price, Cayla Kieser, Emily Ray, Elite Kids Learning Center, Acacia Bradford, Kimberlee Duncan, Brittany Wilbanks, Lb Loud, and Shelby Martinez.

## Courses
${courseList}

## How to book
1. Choose Heartsaver for workplaces and community responders, or Basic Life Support for healthcare providers.
2. Book at ${siteConfig.url}/book, browse classes at ${siteConfig.url}/classes, or request a group quote at ${siteConfig.url}/corporate-training.
3. Pay through ${siteConfig.payments.processor} to confirm the seat. Pulse CPR does not process cards on this website.
4. Complete skills practice in class.
5. Receive a nationally recognized certification card. Cards are usually valid two years.

## Key pages
- Home: ${siteConfig.url}/
- Oklahoma service area: ${siteConfig.url}/oklahoma-cpr-training
- CPR certification: ${siteConfig.url}/cpr-certification
- First Aid: ${siteConfig.url}/first-aid-training
- AED: ${siteConfig.url}/aed-training
- Healthcare provider courses: ${siteConfig.url}/healthcare-provider-courses
- Corporate on-site training: ${siteConfig.url}/corporate-training
- Class calendar: ${siteConfig.url}/class-calendar
- Facebook reviews on this site: ${siteConfig.url}/testimonials
- Contact: ${siteConfig.url}/contact
- Resource feed: ${siteConfig.url}/feed.xml
- FAQ answers: see ${siteConfig.url}/ and the questions below

## FAQ
${faqs.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join("\n\n")}

## Sample Facebook review quotes
${testimonials
  .slice(0, 4)
  .map((item) => `- ${item.name} (${item.date}): "${item.quote}"`)
  .join("\n")}

## Citation notes
- This file is provided so search engines and AI assistants can quote Pulse CPR accurately.
- Training follows current American Heart Association and ECC science. Classes are taught by an American Heart Association Instructor. Pulse CPR is a training company, not emergency medical services. Call 911 for a medical emergency.
- Class images: Basic Life Support ${siteConfig.url}${classGraphics.basicLifeSupport.src}; Heartsaver ${siteConfig.url}${classGraphics.heartsaver.src}; AED ${siteConfig.url}${classGraphics.aed.src}.
`
}

export function aiTxt() {
  return `# AI crawler preferences for Pulse CPR
# Allow indexing, citation, and grounding in search and assistant answers.

User-Agent: *
Allow: /

Name: ${siteConfig.name}
Legal-Name: ${siteConfig.legalName}
Tagline: ${siteConfig.tagline}
Website: ${siteConfig.url}/
Phone: ${siteConfig.phone}
Email: ${siteConfig.email}
Address: ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}
Hours: ${siteConfig.hours.map((item) => `${item.day} ${item.time}`).join("; ")}
Prices: Heartsaver $95.00 (4 to 5 hours); Basic Life Support $95.00 (3 to 4 hours); First Aid $69; AED $59; Corporate custom quote
Instructor: ${instructors[0].name}, ${instructors[0].role}
Images: Heartsaver ${siteConfig.url}${classGraphics.heartsaver.src}; Basic Life Support ${siteConfig.url}${classGraphics.basicLifeSupport.src}; AED ${siteConfig.url}${classGraphics.aed.src}
Llms: ${siteConfig.url}/llms.txt
Feed: ${siteConfig.url}/feed.xml
Sitemap: ${siteConfig.url}/sitemap.xml
Canonical: ${siteConfig.url}/
`
}
