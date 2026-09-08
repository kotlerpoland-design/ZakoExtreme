import type { MetadataRoute } from "next";
import { NOINDEX_PAGES, PL_ONLY_PAGES, routing, type PageKey } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap generowana z routingu: 12 stron PL + 8 EN, tylko wersje kanoniczne, bez stron technicznych.
 * Bez ręcznego `priority` (Google je ignoruje). `lastModified` do podpięcia pod realną datę zmiany treści.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(routing.pathnames) as PageKey[]).filter((p) => !NOINDEX_PAGES.includes(p));

  return pages.flatMap((page) => {
    const locales = PL_ONLY_PAGES.includes(page) ? ([routing.defaultLocale] as const) : routing.locales;
    return locales.map((locale) => ({
      url: absoluteUrl(page, locale),
      ...(PL_ONLY_PAGES.includes(page)
        ? {}
        : { alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(page, l)])) } }),
    }));
  });
}
