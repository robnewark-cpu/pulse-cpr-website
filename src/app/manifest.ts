import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pulse CPR Oklahoma",
    short_name: "Pulse CPR",
    description:
      "American Heart Association Heartsaver, Basic Life Support, AED, and First Aid classes in Edmond, Oklahoma, and on-site statewide.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0f2744",
    theme_color: "#0f2744",
    lang: "en-US",
    categories: ["education", "health"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  }
}
