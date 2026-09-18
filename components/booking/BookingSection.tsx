"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Snowflake } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { PhoneLink } from "@/components/primitives/PhoneLink";

export type BookingLabels = {
  heading: string;
  lead: string;
  fallbackLead: string;
  loading: string;
};

/**
 * JEDYNY punkt wejścia do rezerwacji online. Oficjalny skrypt osadzenia (`embed.js`) montowany leniwie
 * (IntersectionObserver), z zarezerwowaną wysokością (CLS 0). Bez selektora dnia — kalendarz i termin
 * wybiera się w widżecie, przy konkretnej ofercie.
 * Skrypt wstawia swój kontener ZARAZ PO własnym tagu <script>, więc musi trafić do DOM wewnątrz tej sekcji
 * (nie przez next/script, który dokleja do <body>). Sam dogaduje wysokość (postMessage `widget-resize`),
 * przejmuje pełny ekran na mobile (`widget-drawer-open`), czyta język z <html lang> i przekazuje swoje
 * zdarzenia do dataLayer — nie dokładamy własnego mostka.
 * Brak NEXT_PUBLIC_ZAKOEXTREME_BOOKING_ID → fallback telefoniczny (nie udajemy kalendarza).
 */
/**
 * Poza sezonem produktu (skutery III–X, decyzja 2026-09-11): bez kalendarza — pusty kalendarz wygląda jak firma,
 * która nie działa (docs/strony/SKUTERY-SNIEZNE.md §3). Zamiast tego zdanie o starcie sezonu, telefon (jak fallback bez kalendarza)
 * i link do oferty letniej. `id="rezerwacja"` zostaje — CTA hero i sticky bar dalej mają cel.
 */
export type BookingOffSeason = {
  /** pod H2 — „Sezon skuterowy zaczyna się w listopadzie… Zadzwoń — powiemy, kiedy ruszamy." */
  lead: string;
  /** krótka notka w ramce zamiast kalendarza — „Skutery śnieżne wracają w listopadzie." */
  notice: string;
  summerHref: string;
  summerLabel: string;
};

export function BookingSection({ labels, offSeason }: { labels: BookingLabels; offSeason?: BookingOffSeason }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLParagraphElement>(null);
  const businessId = offSeason ? null : site.booking.businessId;

  // Komponent nie ma stanu i nigdy się nie przerenderowuje, więc DOM widżetu (i ukrycie napisu „ładujemy")
  // trzymamy imperatywnie — React nie zagląda do `hostRef`.
  useEffect(() => {
    const box = boxRef.current;
    const host = hostRef.current;
    const loading = loadingRef.current;
    if (!box || !host || !businessId) return;

    const mount = () => {
      if (host.firstChild) return;
      const script = document.createElement("script");
      script.src = `${site.booking.host}/embed.js`;
      script.async = true;
      script.dataset.businessId = businessId;
      script.dataset.widgetUrl = site.booking.host;
      host.appendChild(script);
      if (loading) loading.hidden = true;
    };

    let io: IntersectionObserver | undefined;
    if (new URLSearchParams(window.location.search).has("ap_token")) {
      // Powrót z płatności — skrypt pokazuje status i sprząta adres, więc nie może czekać na doscrollowanie.
      mount();
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          mount();
        },
        { rootMargin: "200px 0px" },
      );
      io.observe(box);
    }

    return () => {
      io?.disconnect();
      // Skrypt i wstawiony przez niego kontener to jedyne dzieci `hostRef`.
      host.replaceChildren();
      if (loading) loading.hidden = false;
    };
  }, [businessId]);

  return (
    <section id="rezerwacja" className="scroll-mt-header bg-card" data-booking>
      <div className="mx-auto w-full max-w-7xl px-5 py-section md:px-8 lg:px-12 lg:py-section-lg">
        <header className="mb-8 max-w-3xl">
          <h2 className="text-display-lg uppercase">{labels.heading}</h2>
          <p className="mt-3 text-ink-2">{offSeason ? offSeason.lead : businessId ? labels.lead : labels.fallbackLead}</p>
        </header>

        <div
          ref={boxRef}
          className={cn("overflow-hidden rounded-lg border border-border bg-background", businessId && "min-h-[420px] md:min-h-[560px]")}
          data-booking-off-season={offSeason ? "" : undefined}
        >
          {offSeason ? (
            <div className="flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="inline-flex items-center gap-2.5 font-display text-lg font-medium uppercase tracking-wide text-foreground">
                <Snowflake className="size-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
                {offSeason.notice}
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <PhoneLink location="pricing" variant="outline" className="w-full sm:w-auto">
                  {site.phone.displayIntl}
                </PhoneLink>
                <Link
                  href={offSeason.summerHref}
                  className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 font-display text-lg font-medium uppercase tracking-wide text-foreground underline-offset-4 hover:underline"
                >
                  {offSeason.summerLabel}
                  <ArrowRight className="size-5 text-brand transition-transform duration-300 ease-soft group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          ) : businessId ? (
            <>
              <p ref={loadingRef} className="p-6 text-sm text-muted-foreground">
                {labels.loading}
              </p>
              <div ref={hostRef} data-booking-widget />
            </>
          ) : (
            <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <p className="max-w-prose text-lg text-ink-2">{labels.fallbackLead}</p>
              <PhoneLink location="pricing" variant="primary">
                {site.phone.displayIntl}
              </PhoneLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
