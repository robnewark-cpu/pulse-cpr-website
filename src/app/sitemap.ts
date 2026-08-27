import { MetadataRoute } from "next"
import { resources, siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/cpr-certification",
    "/first-aid-training",
    "/aed-training",
    "/corporate-training",
    "/healthcare-provider-courses",
    "/class-calendar",
    "/resources",
    "/testimonials",
    "/contact",
    "/book",
    "/privacy",
    "/terms",
    ...resources.map((article) => `/resources/${article.slug}`),
  ]

  return paths.map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified: new Date("2026-08-27"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }))
}
