import { defineRouting } from "next-intl/routing";

/**
 * Routing PL/EN.
 * - PL bez prefiksu (/quady-zakopane/), EN pod /en/ (/en/quad-tours-zakopane/).
 * - EN ma WŁASNE slugi semantyczne, nie tłumaczenia — patrz docs/pakiet/02-ARCHITEKTURA-URL.md §6.
 * - Klucz obiektu `pathnames` to wewnętrzna nazwa strony używana w <Link href="...">.
 *
 * Strony tylko-PL (dzieci, lokalne) mają ten sam slug dla EN, ale NIE są linkowane w EN
 * i nie dostają hreflang — obsługa w lib/seo.ts.
 */
export const routing = defineRouting({
  locales: ["pl", "en"],
  defaultLocale: "pl",
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames: {
    "/": "/",
    // filary produktowe
    "/quady-zakopane": { pl: "/quady-zakopane", en: "/quad-tours-zakopane" },
    "/buggy-zakopane": { pl: "/buggy-zakopane", en: "/buggy-tours-zakopane" },
    "/skutery-sniezne-zakopane": { pl: "/skutery-sniezne-zakopane", en: "/snowmobile-tours-zakopane" },
    // kwalifikacyjne
    "/quady-bez-prawa-jazdy": { pl: "/quady-bez-prawa-jazdy", en: "/no-drivers-licence-required" },
    "/quady-dla-dzieci-i-mlodziezy": "/quady-dla-dzieci-i-mlodziezy",
    // lokalne (tylko PL)
    "/quady-bialka-tatrzanska": "/quady-bialka-tatrzanska",
    "/quady-bukowina-tatrzanska": "/quady-bukowina-tatrzanska",
    "/buggy-bialka-bukowina": "/buggy-bialka-bukowina",
    // intencje: cena, reputacja, kontakt
    "/cennik": { pl: "/cennik", en: "/prices" },
    "/opinie": { pl: "/opinie", en: "/reviews" },
    "/kontakt": { pl: "/kontakt", en: "/contact" },
    // techniczne (noindex)
    "/dziekujemy": { pl: "/dziekujemy", en: "/thank-you" },
    "/polityka-prywatnosci": { pl: "/polityka-prywatnosci", en: "/privacy-policy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type PageKey = keyof typeof routing.pathnames;

/** Strony, które istnieją wyłącznie po polsku — bez wersji EN i bez hreflang. */
export const PL_ONLY_PAGES: readonly PageKey[] = [
  "/quady-dla-dzieci-i-mlodziezy",
  "/quady-bialka-tatrzanska",
  "/quady-bukowina-tatrzanska",
  "/buggy-bialka-bukowina",
];

/** Strony techniczne — noindex, poza sitemapą. */
export const NOINDEX_PAGES: readonly PageKey[] = ["/dziekujemy", "/polityka-prywatnosci"];
