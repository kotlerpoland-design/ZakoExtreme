"use client";

import { Phone } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import { trackPhoneClick, type CtaLocation } from "@/lib/tracking";
import { usePageContext } from "@/components/tracking/TrackingContext";

type Variant = "primary" | "outline" | "text" | "icon" | "sticky" | "giant";

const VARIANTS: Record<Variant, string> = {
  /* koral tylko tam, gdzie telefon jest jedyną drogą (fallback rezerwacji bez kalendarza). Od 2026-09-09 CTA nr 1 to BookCta. */
  primary:
    "inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg bg-primary px-6 font-display text-xl font-semibold uppercase tracking-wide text-primary-foreground shadow-card transition-[transform,box-shadow] duration-200 ease-soft hover:shadow-lift active:translate-y-px md:w-auto md:min-h-16 md:px-8 md:text-2xl",
  outline:
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border-2 border-foreground px-5 font-display text-lg font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background",
  text: "inline-flex items-center gap-2 font-display text-lg font-medium tabular text-foreground underline-offset-4 hover:underline",
  icon: "inline-flex size-11 items-center justify-center rounded-full text-brand transition-colors hover:bg-brand-tint",
  /* sticky bar: kontur (CTA nr 2), węższy niż „Rezerwuj" */
  sticky:
    "inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg border-2 border-foreground bg-card font-display text-lg font-medium uppercase tracking-wide text-foreground",
  giant:
    "block font-display font-semibold tabular leading-none text-brand text-[clamp(2.5rem,11vw,6rem)] tracking-tight underline-offset-8 hover:underline",
};

type Props = {
  location: CtaLocation;
  variant?: Variant;
  /** Tekst przycisku. Domyślnie „Zadzwoń: 539 320 700" podaje rodzic przez children. */
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * KAŻDY numer telefonu na stronie przechodzi tędy: href="tel:", synchroniczny push do dataLayer.
 * Bez preventDefault — telefon musi zadzwonić nawet gdy GTM nie wstał. CTA nr 2 (kontur) obok koralowego BookCta.
 */
export function PhoneLink({ location, variant = "primary", children, className, ariaLabel }: Props) {
  const ctx = usePageContext();
  const showIcon = variant === "primary" || variant === "outline" || variant === "sticky" || variant === "icon";
  return (
    <a
      href={`tel:${site.phone.e164}`}
      onClick={() => trackPhoneClick(location, ctx)}
      className={cn(VARIANTS[variant], className)}
      data-cta="phone"
      data-location={location}
      aria-label={ariaLabel}
    >
      {showIcon ? <Phone className={variant === "icon" ? "size-5" : "size-5 shrink-0"} strokeWidth={2.25} aria-hidden /> : null}
      {variant === "icon" ? <span className="sr-only">{children ?? site.phone.displayIntl}</span> : children ?? site.phone.displayIntl}
    </a>
  );
}
