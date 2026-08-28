"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/site"

export function FaqAccordion({ items = faqs }: { items?: typeof faqs | { question: string; answer: string }[] }) {
  return (
    <Accordion className="rounded-2xl bg-white px-4 shadow-sm ring-1 ring-navy/10 sm:px-6">
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger className="min-h-12 py-4 text-left text-base text-navy hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
