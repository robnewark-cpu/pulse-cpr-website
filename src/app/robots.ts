import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

const aiBots = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "Googlebot",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "Bytespider",
  "CCBot",
  "cohere-ai",
  "meta-externalagent",
  "FacebookBot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/admin", "/review", "/register"],
      },
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin", "/api/admin", "/review", "/register"],
      })),
      {
        userAgent: "facebookexternalhit",
        allow: [
          "/",
          "/og-image.jpg",
          "/images/basic-life-support.jpg",
          "/images/heartsaver.jpg",
        ],
      },
      {
        userAgent: "Facebot",
        allow: [
          "/",
          "/og-image.jpg",
          "/images/basic-life-support.jpg",
          "/images/heartsaver.jpg",
        ],
      },
      {
        userAgent: "LinkedInBot",
        allow: [
          "/",
          "/og-image.jpg",
          "/images/basic-life-support.jpg",
          "/images/heartsaver.jpg",
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
