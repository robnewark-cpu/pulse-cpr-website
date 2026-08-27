#!/usr/bin/env node
/**
 * Workers Builds may skip a framework build command and jump straight to
 * `npx wrangler deploy`. When WORKERS_CI=1, produce the OpenNext worker
 * during install so deploy can find `.open-next/worker.js`.
 */
import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"
import path from "node:path"

if (process.env.WORKERS_CI !== "1") {
  process.exit(0)
}

if (process.env.PULSE_OPENNEXT_BUILDING === "1") {
  process.exit(0)
}

const workerJs = path.join(process.cwd(), ".open-next", "worker.js")
if (existsSync(workerJs)) {
  process.exit(0)
}

process.env.PULSE_OPENNEXT_BUILDING = "1"
const result = spawnSync("npx", ["opennextjs-cloudflare", "build"], {
  stdio: "inherit",
  env: process.env,
  shell: process.platform === "win32",
})
process.exit(result.status ?? 1)
