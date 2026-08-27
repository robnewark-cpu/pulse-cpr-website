import { defineCloudflareConfig } from "@opennextjs/cloudflare"

const config = defineCloudflareConfig({
  incrementalCache: "dummy",
  tagCache: "dummy",
  queue: "dummy",
})

// OpenNext invokes this instead of `npm run build`, so package.json can
// use `opennextjs-cloudflare build` without recursing.
config.buildCommand = "npx next build"

export default config
