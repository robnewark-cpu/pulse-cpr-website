import { siteConfig } from "@/lib/site"
import type { ClassRecord } from "@/lib/tms/types"

export function fallbackClasses(): ClassRecord[] {
  return []
}

export function defaultClassroom() {
  return `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}`
}
