"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { trackPhoneCopy } from "@/lib/tracking";

type Props = { label: string; copiedLabel: string; className?: string };

/**
 * „Skopiuj numer" — punkt 1 szablonu T6 (docs/ARCHITEKTURA-INFORMACJI.md). Tylko desktop: na telefonie numer się wybiera,
 * nie kopiuje, więc strona podaje ten przycisk od `md` w górę (klasa zostaje po stronie wywołania).
 * Kontur, nie pomarańcz — jedyny pomarańczowy przycisk na stronie to `BookCta` (decyzja 2026-09-09).
 * Bez schowka (starsza przeglądarka, brak zgody) nic się nie dzieje — klikalny `tel:` obok działa dalej.
 */
export function CopyPhoneButton({ label, copiedLabel, className }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.phone.displayIntl);
    } catch {
      return;
    }
    trackPhoneCopy();
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  const Icon = copied ? Check : Copy;
  return (
    <button
      type="button"
      onClick={copy}
      data-cta="phone-copy"
      className={cn(
        "min-h-11 items-center gap-2 rounded-lg border-2 border-foreground px-4 font-display text-base font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background",
        className,
      )}
    >
      <Icon className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
