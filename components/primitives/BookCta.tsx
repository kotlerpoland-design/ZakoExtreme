"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { trackBookCtaClick, type CtaLocation } from "@/lib/tracking";

type Props = {
  location: CtaLocation;
  href?: string;
  variant?: "primary" | "compact" | "outline" | "sticky" | "solid-dark";
  children: ReactNode;
  className?: string;
};

const VARIANTS = {
  /* CTA nr 1 — jedyny koralowy przycisk na ekranie (decyzja 2026-09-09). Min 56 px wysokości na mobile. */
  primary:
    "inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-primary px-6 font-display text-xl font-semibold uppercase tracking-wide text-primary-foreground shadow-card transition-[transform,box-shadow] duration-200 ease-soft hover:shadow-lift active:translate-y-px md:w-auto md:min-h-16 md:px-8 md:text-2xl",
  /* header desktop: ten sam koral, niższy */
  compact:
    "inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-4 font-display text-base font-semibold uppercase tracking-wide text-primary-foreground shadow-card transition-[transform,box-shadow] duration-200 ease-soft hover:shadow-lift active:translate-y-px",
  outline:
    "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-foreground px-5 font-display text-lg font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background md:w-auto md:min-h-14 md:px-6",
  /* sticky bar: koral, szerszy niż telefon */
  sticky:
    "inline-flex h-12 flex-1 items-center justify-center rounded-lg bg-primary font-display text-lg font-semibold uppercase tracking-wide text-primary-foreground",
  "solid-dark":
    "inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-foreground px-5 font-display text-lg font-medium uppercase tracking-wide text-background transition-colors hover:bg-ink-2",
} as const;

/** CTA rezerwacji nr 1 (od 2026-09-09; telefon jest nr 2). Prowadzi do #rezerwacja — jedynego wejścia do SlotWise. */
export function BookCta({ location, href = "#rezerwacja", variant = "outline", children, className }: Props) {
  return (
    <a href={href} onClick={() => trackBookCtaClick(location)} className={cn(VARIANTS[variant], className)} data-cta="book">
      {children}
    </a>
  );
}
