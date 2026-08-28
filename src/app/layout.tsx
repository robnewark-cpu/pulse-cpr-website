import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DraftBanner } from "@/components/layout/draft-banner"
import { SkipLink } from "@/components/layout/skip-link"
import { JsonLd } from "@/components/seo/json-ld"
import { Toaster } from "@/components/ui/sonner"
import {
  HOME_OG_DESCRIPTION,
  HOME_OG_TITLE,
  HOME_OG_URL,
  HOME_TWITTER_DESCRIPTION,
  SHARE_IMAGE_URL,
  facebookMeta,
  geoAndFacebookOtherTags,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo"
import { siteConfig } from "@/lib/site"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(HOME_OG_URL),
  title: {
    default: `${siteConfig.name} | CPR, BLS, AED & First Aid Training in Oklahoma`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.name,
  publisher: siteConfig.legalName,
  category: "education",
  keywords: [
    "CPR certification Oklahoma",
    "CPR class Oklahoma City",
    "BLS class OKC",
    "AED training Oklahoma",
    "First Aid certification Oklahoma",
    "corporate CPR training Oklahoma",
    "Pulse CPR",
    "Pulse.CPR",
    "CPR Edmond",
    "CPR Norman",
    "CPR Tulsa",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: HOME_OG_URL,
    siteName: siteConfig.name,
    title: HOME_OG_TITLE,
    description: HOME_OG_DESCRIPTION,
    images: [
      {
        url: SHARE_IMAGE_URL,
        secureUrl: SHARE_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Pulse CPR Oklahoma",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_OG_TITLE,
    description: HOME_TWITTER_DESCRIPTION,
    images: [SHARE_IMAGE_URL],
  },
  facebook: facebookMeta(),
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg" }],
  },
  alternates: {
    canonical: HOME_OG_URL,
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "llms.txt" },
        { url: "/ai.txt", title: "ai.txt" },
      ],
      "application/rss+xml": [{ url: "/feed.xml", title: "Pulse CPR resources" }],
    },
  },
  other: geoAndFacebookOtherTags(),
}

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <head>
        <meta property="fb:pages" content={siteConfig.social.facebookPageId} />
      </head>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <SkipLink />
        <DraftBanner />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
