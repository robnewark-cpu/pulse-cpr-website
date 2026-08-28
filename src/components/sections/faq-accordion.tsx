import { faqs } from "@/lib/site"

export function FaqAccordion({
  items = faqs,
}: {
  items?: typeof faqs | { question: string; answer: string }[]
}) {
  return (
    <div className="rounded-2xl bg-white px-4 shadow-sm ring-1 ring-navy/10 sm:px-6">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group border-b border-navy/10 last:border-b-0"
          open={index < 3}
        >
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-4 text-left text-base font-medium text-navy marker:content-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="shrink-0 text-lg leading-none text-muted-foreground group-open:hidden"
            >
              +
            </span>
            <span
              aria-hidden="true"
              className="hidden shrink-0 text-lg leading-none text-muted-foreground group-open:inline"
            >
              −
            </span>
          </summary>
          <p className="pb-4 text-sm leading-6 text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
