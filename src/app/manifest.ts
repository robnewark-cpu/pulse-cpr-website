import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pulse CPR Oklahoma",
    short_name: "Pulse CPR",
    description: "CPR, BLS, AED, and First Aid certification across Oklahoma.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0F2744",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  }
}
