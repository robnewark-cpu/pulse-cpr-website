import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Pulse CPR",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0f2744",
    theme_color: "#0f2744",
    lang: "en-US",
    categories: ["education", "health"],
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
