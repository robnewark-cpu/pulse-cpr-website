import { resources, siteConfig } from "@/lib/site"

export function GET() {
  const feedUrl = new URL("/feed.xml", siteConfig.url).toString()
  const items = resources
    .map((article) => {
      const url = new URL(`/resources/${article.slug}`, siteConfig.url).toString()
      return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <author>${siteConfig.email} (${siteConfig.name})</author>
      <description><![CDATA[${article.excerpt}]]></description>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pulse CPR resources</title>
    <link>${siteConfig.url}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${siteConfig.legalName}</copyright>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
