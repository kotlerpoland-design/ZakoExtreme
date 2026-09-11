"use client";

import { ChevronDown } from "lucide-react";
import { trackFaqOpen } from "@/lib/tracking";

export type FaqViewItem = { id: string; question: string; answer: string };

/**
 * Natywny akordeon: <details name="faq"> = jedno otwarte naraz, działa bez JS, zero bibliotek.
 * Otwarty na pierwszym pytaniu; każde rozwinięcie = faq_open{id}. Animacja wysokości w globals.css (details::details-content).
 */
export function FaqAccordion({ items }: { items: FaqViewItem[] }) {
  return (
    <div className="divide-y divide-border border-b border-border">
      {items.map((item, i) => (
        <details
          key={item.id}
          name="faq"
          open={i === 0}
          className="faq-item group"
          onToggle={(e) => {
            if (e.currentTarget.open) trackFaqOpen(item.id);
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl font-medium text-foreground outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-[3px] focus-visible:ring-ring md:text-2xl">
            <span className="flex gap-4">
              <span className="w-7 shrink-0 font-display text-sm font-semibold tabular text-brand" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.question}</span>
            </span>
            <ChevronDown className="size-6 shrink-0 text-brand transition-transform duration-200 group-open:rotate-180" aria-hidden />
          </summary>
          <div className="pb-6 pl-11 text-base text-ink-2">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
