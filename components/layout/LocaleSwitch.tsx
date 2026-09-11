"use client";

import { usePathname } from "next/navigation";
import { alternatePath } from "@/i18n/paths";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** PL ⇄ EN na tej samej stronie; strony tylko-PL przełączają na EN home. Zwykły <a> — pełne przeładowanie zmienia locale. */
export function LocaleSwitch({ locale, ariaLabel, className }: { locale: Locale; ariaLabel: string; className?: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "pl" ? "en" : "pl";
  return (
    <a
      href={alternatePath(pathname, other)}
      hrefLang={other}
      lang={other}
      aria-label={ariaLabel}
      className={cn("inline-flex h-11 items-center rounded-full px-3 font-display text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground", className)}
    >
      {other}
    </a>
  );
}
