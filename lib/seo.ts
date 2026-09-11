import type { Metadata } from "next";
import { NOINDEX_PAGES, PL_ONLY_PAGES, routing, type Locale, type PageKey } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";
import { site } from "@/config/site";

/**
 * Pełny URL kanoniczny dla strony w danym języku, z końcowym ukośnikiem.
 * Celowo bez `createNavigation` z next-intl — jego `getPathname` ciągnie kliencki BaseLink (+ runtime use-intl)
 * do chunków każdej strony, co kosztuje ~13 kB gz w budżecie pierwszego ekranu.
 */
export function absoluteUrl(page: PageKey, locale: Locale): string {
  return `${site.url}${localizedPath(page, locale)}`;
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
