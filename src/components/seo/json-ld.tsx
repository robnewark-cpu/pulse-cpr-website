function asGraphItem(item: unknown) {
  if (!item || typeof item !== "object") return item
  const record = item as Record<string, unknown>
  if (!("@context" in record)) return record
  const rest = { ...record }
  delete rest["@context"]
  return rest
}

export function JsonLd({ data }: { data: unknown }) {
  const payload = Array.isArray(data)
    ? { "@context": "https://schema.org", "@graph": data.map(asGraphItem) }
    : data

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
