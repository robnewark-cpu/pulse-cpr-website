import type { Metadata } from "next"
import { courses, defaultInstructor, instructors, siteConfig, testimonials } from "@/lib/site"
import type { ClassRecord } from "@/lib/tms/types"
import { formatTimeRange } from "@/lib/tms/format"

export const SHARE_IMAGE_URL = "https://pulsecprok.com/og-image.jpg"
export const HOME_OG_URL = "https://pulsecprok.com/"
export const HOME_OG_TITLE =
  "Pulse CPR | CPR, BLS, AED & First Aid Training in Oklahoma"
export const HOME_OG_DESCRIPTION =
  "Pulse CPR — Learn It. Know It. Save A Life. American Heart Association and American Red Cross CPR, AED, First Aid, and BLS certification from Edmond, Oklahoma."
export const HOME_TWITTER_DESCRIPTION = "Pulse CPR — Learn It. Know It. Save A Life."

/** Facebook's public default App ID. Clears the Sharing Debugger `fb:app_id` warning. */
export const FACEBOOK_DEFAULT_APP_ID = "966242223397117"

export function facebookAppId() {
  return process.env.NEXT_PUBLIC_FB_APP_ID?.trim() || FACEBOOK_DEFAULT_APP_ID
}

export function facebookMeta() {
  return { appId: facebookAppId() }
}

export function geoAndFacebookOtherTags() {
  return {
    "geo.region": "US-OK",
    "geo.placename": `${siteConfig.address.city}, ${siteConfig.address.region}`,
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  }
}

export const ogImage = {
  url: SHARE_IMAGE_URL,
  secureUrl: SHARE_IMAGE_URL,
  width: 1200,
  height: 630,
  alt: "Pulse CPR Oklahoma — Learn It. Know It. Save A Life. Instructor Christine Oldenburg, RN. CPR, AED, First Aid, and BLS training.",
  type: "image/jpeg",
} as const

export function createMetadata({
  title,
  description,
  path = "/",
  keywords,
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
}): Metadata {
  const url = new URL(path, siteConfig.url).toString()
  const isHome = path === "/"
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | CPR, BLS, AED & First Aid Training in Oklahoma`
      : `${title} | ${siteConfig.name}`
  const ogTitle = isHome ? HOME_OG_TITLE : fullTitle
  const ogDescription = isHome ? HOME_OG_DESCRIPTION : description
  const twitterDescription = isHome ? HOME_TWITTER_DESCRIPTION : description
  const ogUrl = isHome ? HOME_OG_URL : url

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: ogUrl },
    facebook: facebookMeta(),
    other: geoAndFacebookOtherTags(),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: twitterDescription,
      images: [SHARE_IMAGE_URL],
    },
  }
}

export function toIsoDate(value: string) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toISOString().slice(0, 10)
}

export function reviewJsonLd() {
  return testimonials.map((item) => ({
    "@type": "Review",
    author: { "@type": "Person", name: item.name },
    datePublished: toIsoDate(item.date),
    reviewBody: item.quote,
    url: siteConfig.social.facebookReviews,
    publisher: {
      "@type": "Organization",
      name: "Facebook",
      url: "https://www.facebook.com",
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
  }))
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness", "MedicalBusiness"],
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: ogImage.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    priceRange: "$59–$95",
    currenciesAccepted: "USD",
    paymentAccepted: "Square",
    openingHours: siteConfig.openingHoursSpecification,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.serviceArea.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "State",
        name: "Oklahoma",
      },
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "10",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.facebookReviews],
    founder: {
      "@type": "Person",
      name: defaultInstructor,
      honorificSuffix: "RN",
      jobTitle: instructors[0].role,
      image: instructors[0].image ? `${siteConfig.url}${instructors[0].image}` : undefined,
    },
    employee: {
      "@type": "Person",
      name: defaultInstructor,
      honorificSuffix: "RN",
      jobTitle: instructors[0].role,
      image: instructors[0].image ? `${siteConfig.url}${instructors[0].image}` : undefined,
      description: instructors[0].shortBio,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Rose State College",
      },
      hasCredential: instructors[0].certifications.map((credential) => ({
        "@type": "EducationalOccupationalCredential",
        name: credential,
      })),
      worksFor: { "@id": `${siteConfig.url}/#business` },
    },
    knowsAbout: [
      "CPR certification",
      "AED training",
      "First Aid",
      "BLS Provider",
      "Oklahoma workplace safety training",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "customer service",
        areaServed: "US-OK",
        availableLanguage: ["English"],
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      name: "Book a Pulse CPR class",
      target: new URL("/book", siteConfig.url).toString(),
    },
    review: reviewJsonLd(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lifesaving certification courses",
      itemListElement: courses.map((course) => ({
        "@type": "Offer",
        name: course.title,
        url: new URL(course.href, siteConfig.url).toString(),
        price: course.priceUsd ?? undefined,
        priceCurrency: course.priceUsd ? "USD" : undefined,
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Course",
          name: course.title,
          description: course.summary,
          url: new URL(course.href, siteConfig.url).toString(),
          provider: { "@id": `${siteConfig.url}/#business` },
          timeRequired: course.duration,
        },
      })),
    },
  }
}

export function faqJsonLd(
  items: readonly { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  }
}

export function courseJsonLd({
  name,
  description,
  path,
  price,
  duration,
}: {
  name: string
  description: string
  path: string
  price?: string
  duration?: string
}) {
  const priceUsd = price?.match(/\$(\d+(?:\.\d+)?)/)?.[1]
  const courseWorkload = duration?.includes("4 to 5") || duration?.includes("4–5")
    ? "PT5H"
    : duration?.includes("2–3")
      ? "PT3H"
      : duration?.startsWith("4 ")
        ? "PT4H"
        : duration?.startsWith("2 ")
          ? "PT2H"
          : "PT4H"

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: new URL(path, siteConfig.url).toString(),
    provider: {
      "@type": "EducationalOrganization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
      url: new URL("/book", siteConfig.url).toString(),
      price: priceUsd,
      priceCurrency: "USD",
      areaServed: {
        "@type": "State",
        name: "Oklahoma",
      },
    },
    inLanguage: "en-US",
    educationalLevel: "Beginner to professional",
    teaches: name,
    isAccessibleForFree: false,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "blended"],
      courseWorkload,
      location: {
        "@type": "Place",
        name: `${siteConfig.name} Edmond classroom and on-site Oklahoma locations`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          addressCountry: siteConfig.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
      },
    },
  }
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: ["Pulse.CPR", "Pulse CPR Oklahoma"],
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: { "@id": `${siteConfig.url}/#business` },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable='true']"],
    },
  }
}

export function howToGetCertifiedJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to get CPR certified in Oklahoma with Pulse CPR",
    description:
      "Book a Pulse CPR class in Edmond or request on-site training. Heartsaver CPR takes 4 to 5 hours.",
    totalTime: "PT5H",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "95.00",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Choose the right course",
        text: "Heartsaver CPR/AED/First Aid is for workplaces, teachers, and community responders. BLS is for healthcare providers.",
        url: `${siteConfig.url}/resources/bls-vs-heartsaver`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Book a seat or on-site date",
        text: `Submit the online booking form or call Pulse CPR. Pay through ${siteConfig.payments.processor} to confirm your seat, or request a corporate quote for six or more students.`,
        url: new URL("/book", siteConfig.url).toString(),
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Complete class and skills testing",
        text: "Attend the Edmond classroom or an on-site session. Heartsaver / Adult CPR takes 4 to 5 hours of skills practice with instructor coaching.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Receive your certification card",
        text: "After you pass skills testing, Pulse CPR issues a nationally recognized certification card. Cards are typically valid for two years.",
      },
    ],
  }
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
}: {
  title: string
  description: string
  path: string
  datePublished: string
}) {
  const url = new URL(path, siteConfig.url).toString()
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    url,
    mainEntityOfPage: url,
    inLanguage: "en-US",
    image: ogImage.url,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.svg`,
      },
    },
    about: {
      "@type": "Thing",
      name: "CPR and first aid training in Oklahoma",
    },
  }
}

export function classEventJsonLd(sessions: ClassRecord[]) {
  return sessions
    .filter((session) => session.status === "scheduled")
    .map((session) => ({
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: `${session.name} — Pulse CPR`,
    description: `${session.name} with Pulse CPR. ${formatTimeRange(session.start_time, session.end_time)} at ${session.location}.`,
    startDate: `${session.class_date}T${session.start_time.slice(0, 8)}`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      session.status === "cancelled"
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: session.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
    },
    organizer: { "@id": `${siteConfig.url}/#business` },
    performer: { "@id": `${siteConfig.url}/#business` },
    offers: {
      "@type": "Offer",
      url: new URL(`/register/${session.id}`, siteConfig.url).toString(),
      price: session.price || undefined,
      priceCurrency: "USD",
      availability:
        session.seats_remaining > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
    },
    remainingAttendeeCapacity: session.seats_remaining,
  }))
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Pulse CPR",
    url: new URL("/contact", siteConfig.url).toString(),
    mainEntity: { "@id": `${siteConfig.url}/#business` },
  }
}
