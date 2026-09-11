"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PageContext } from "@/lib/tracking";

/**
 * Kontekst strony dla zdarzeń dataLayer (page_type · product · language).
 * Ustawiany raz na stronę w page.tsx, czytany przez PhoneLink i CTA rezerwacji.
 */
const TrackingContext = createContext<PageContext | null>(null);

export function TrackingProvider({ ctx, children }: { ctx: PageContext; children: ReactNode }) {
  return <TrackingContext.Provider value={ctx}>{children}</TrackingContext.Provider>;
}

const FALLBACK: PageContext = { page_type: "home", product: "mixed", language: "pl" };

export function usePageContext(): PageContext {
  return useContext(TrackingContext) ?? FALLBACK;
}
