import { MetadataRoute } from "next"
import { resources, siteConfig } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-27")

  const entries: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] =
    [
      { path: "/", priority: 1, changeFrequency: "weekly" },
      { path: "/oklahoma-cpr-training", priority: 0.9, changeFrequency: "weekly" },
      { path: "/classes", priority: 0.9, changeFrequency: "weekly" },
      { path: "/cpr-certification", priority: 0.85, changeFrequency: "monthly" },
      { path: "/first-aid-training", priority: 0.8, changeFrequency: "monthly" },
      { path: "/aed-training", priority: 0.8, changeFrequency: "monthly" },
      { path: "/healthcare-provider-courses", priority: 0.8, changeFrequency: "monthly" },
      { path: "/corporate-training", priority: 0.8, changeFrequency: "monthly" },
      { path: "/class-calendar", priority: 0.8, changeFrequency: "weekly" },
      { path: "/book", priority: 0.75, changeFrequency: "monthly" },
      { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
      { path: "/about", priority: 0.6, changeFrequency: "monthly" },
      { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
      { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
      { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
      { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
      ...resources.map((article) => ({
        path: `/resources/${article.slug}`,
        priority: 0.65,
        changeFrequency: "monthly" as const,
      })),
    ]

  return [
    ...entries.map((entry) => ({
      url: new URL(entry.path, siteConfig.url).toString(),
      lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    {
      url: new URL("/llms.txt", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: new URL("/ai.txt", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.35,
    },
    {
      url: new URL("/feed.xml", siteConfig.url).toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ]
}
