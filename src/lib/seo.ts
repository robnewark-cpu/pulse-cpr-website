import type { Metadata } from "next"
import { siteConfig } from "@/lib/site"

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
  const fullTitle =
    title === siteConfig.name
      ? `${siteConfig.name} | CPR, BLS, AED & First Aid Training in Oklahoma`
      : `${title} | ${siteConfig.name}`

  return {
    title: { absolute: fullTitle },
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — CPR, BLS, AED, and First Aid training in Oklahoma`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  }
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
    image: `${siteConfig.url}/og-image.svg`,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    priceRange: "$$",
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
      ratingValue: "4.9",
      reviewCount: "286",
      bestRating: "5",
    },
    sameAs: Object.values(siteConfig.social),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lifesaving certification courses",
      itemListElement: [
        "CPR Certification",
        "First Aid Training",
        "AED Training",
        "BLS Provider",
        "ACLS",
        "PALS",
        "Corporate on-site training",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name,
          provider: { "@id": `${siteConfig.url}/#business` },
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
}: {
  name: string
  description: string
  path: string
}) {
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
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["onsite", "blended"],
      location: {
        "@type": "Place",
        name: `${siteConfig.name} Oklahoma City classroom`,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
        },
      },
    },
  }
}
