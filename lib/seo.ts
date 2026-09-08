import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { NOINDEX_PAGES, PL_ONLY_PAGES, routing, type Locale, type PageKey } from "@/i18n/routing";
import { site } from "@/config/site";

/** Pełny URL kanoniczny dla strony w danym języku, z końcowym ukośnikiem. */
export function absoluteUrl(page: PageKey, locale: Locale): string {
  const path = getPathname({ href: page, locale });
  const withSlash = path.endsWith("/") ? path : `${path}/`;
  return `${site.url}${withSlash}`;
}

/**
 * canonical + hreflang (dwukierunkowo, z x-default → PL).
 * Strony tylko-PL nie dostają hreflang do nieistniejącego EN. Strony techniczne dostają noindex.
 */
export function pageAlternates(page: PageKey, locale: Locale): Pick<Metadata, "alternates" | "robots"> {
  const canonical = absoluteUrl(page, locale);
  const plOnly = PL_ONLY_PAGES.includes(page);
  const noindex = NOINDEX_PAGES.includes(page);

  const languages: Record<string, string> = plOnly
    ? {}
    : Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(page, l)]));
  if (!plOnly) languages["x-default"] = absoluteUrl(page, routing.defaultLocale);

  return {
    alternates: { canonical, ...(plOnly ? {} : { languages }) },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
