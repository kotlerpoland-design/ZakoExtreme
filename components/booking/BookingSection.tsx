"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Snowflake } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { PhoneLink } from "@/components/primitives/PhoneLink";

type Chip = "today" | "tomorrow" | "other";

export type BookingLabels = {
  heading: string;
  today: string;
  tomorrow: string;
  other: string;
  lead: string;
  fallbackLead: string;
  loading: string;
};

function isoDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/**
 * JEDYNY punkt wejścia do rezerwacji online. Chipy Dziś / Jutro / Inny termin + widżet SlotWise
 * montowany leniwie (IntersectionObserver), z zarezerwowaną wysokością (CLS 0).
 * Brak NEXT_PUBLIC_SLOTWISE_BUSINESS_ID → fallback telefoniczny (nie udajemy kalendarza).
 * Parametr `date` w URL widżetu i tryb embed (iframe vs embed.js) — do potwierdzenia ze SlotWise (pytanie 14).
 */
/**
 * Poza sezonem produktu (skutery III–X, decyzja 2026-09-11): bez chipów i bez kalendarza — pusty kalendarz wygląda jak firma,
 * która nie działa (docs/strony/SKUTERY-SNIEZNE.md §3). Zamiast tego zdanie o starcie sezonu, telefon (jak fallback bez SlotWise)
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

/** `sectionNumber` pominięty = bez znacznika „06 ——" (podstrona /galeria/, decyzja 2026-09-10). */
export function BookingSection({ labels, sectionNumber, offSeason }: { labels: BookingLabels; sectionNumber?: number; offSeason?: BookingOffSeason }) {
  const [chip, setChip] = useState<Chip>("today");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const businessId = offSeason ? null : site.booking.businessId;

  useEffect(() => {
    if (!ref.current || !businessId) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [businessId]);

  const date = chip === "today" ? isoDate(0) : chip === "tomorrow" ? isoDate(1) : null;
  const widgetUrl = businessId ? `${site.booking.host}/${businessId}${date ? `?date=${date}` : ""}` : null;

  return (
    <section id="rezerwacja" className="scroll-mt-header bg-card" data-booking>
      <div className="mx-auto w-full max-w-7xl px-5 py-section md:px-8 lg:px-12 lg:py-section-lg">
        <header className="mb-8 max-w-3xl">
          {sectionNumber ? (
            <span className="mb-4 inline-flex items-center gap-3" aria-hidden>
              <span className="font-display text-sm font-semibold tabular text-brand">{String(sectionNumber).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-brand" />
            </span>
          ) : null}
          <h2 className="text-display-lg uppercase">{labels.heading}</h2>
          <p className="mt-3 text-ink-2">{offSeason ? offSeason.lead : businessId ? labels.lead : labels.fallbackLead}</p>
        </header>

        {offSeason ? null : (
          <div role="group" aria-label={labels.heading} className="flex flex-wrap gap-2">
            {(["today", "tomorrow", "other"] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={chip === c}
                onClick={() => setChip(c)}
                className={cn(
                  "min-h-11 rounded-full border-2 px-5 font-display text-base font-medium uppercase tracking-wide transition-colors",
                  chip === c ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground hover:border-foreground",
                )}
              >
                {labels[c]}
              </button>
            ))}
          </div>
        )}

        <div ref={ref} className={cn("mt-6 rounded-lg border border-border bg-background", widgetUrl && "min-h-[420px] md:min-h-[560px]")} data-booking-off-season={offSeason ? "" : undefined}>
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
          ) : widgetUrl ? (
            inView ? (
              <iframe
                src={widgetUrl}
                title={labels.heading}
                className="h-[420px] w-full rounded-lg md:h-[560px]"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <p className="p-6 text-sm text-muted-foreground">{labels.loading}</p>
            )
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
