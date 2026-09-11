import { PL_ONLY_PAGES, routing, type Locale, type PageKey } from "./routing";

/**
 * Ścieżki lokalizowane bez runtime'u next-intl po stronie klienta (parser wiadomości = ~13 kB gz na każdej stronie).
 * Serwer: `lib/seo.ts` nadal używa getPathname z next-intl; tu jest czysta funkcja na tej samej tablicy tras.
 */
export function localizedPath(key: PageKey, locale: Locale): string {
  const entry = routing.pathnames[key];
  const path = typeof entry === "string" ? entry : entry[locale];
  const prefixed = locale === routing.defaultLocale ? path : `/${locale}${path === "/" ? "" : path}`;
  return prefixed.endsWith("/") ? prefixed : `${prefixed}/`;
}

/**
 * Klucz strony dla aktualnego pathname, albo "/" gdy nieznany.
 * Obsługuje prefiks każdego locale — także `/pl/...`, które usePathname zwraca podczas prerenderu
 * (proxy next-intl przepisuje `/quady-zakopane/` na wewnętrzne `/pl/quady-zakopane/`).
 */
export function pageKeyFromPath(pathname: string): { key: PageKey; locale: Locale } {
  let locale: Locale = routing.defaultLocale;
  let rest = pathname;
  for (const l of routing.locales) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      locale = l;
      rest = pathname.slice(l.length + 1);
      break;
    }
  }
  const bare = rest.replace(/\/+$/, "") || "/";
  for (const key of Object.keys(routing.pathnames) as PageKey[]) {
    const entry = routing.pathnames[key];
    const path = (typeof entry === "string" ? entry : entry[locale]).replace(/\/+$/, "") || "/";
    // `key === bare`: podczas prerenderu EN pathname to wewnętrzny segment trasy (/en/quady-zakopane), nie slug EN.
    if (path === bare || key === bare) return { key, locale };
  }
  return { key: "/", locale };
}

/** Ta sama strona w drugim języku; strony tylko-PL prowadzą na EN home. */
export function alternatePath(pathname: string, target: Locale): string {
  const { key } = pageKeyFromPath(pathname);
  if (target === "en" && PL_ONLY_PAGES.includes(key)) return localizedPath("/", "en");
  return localizedPath(key, target);
}
