import { site } from "@/config/site";
import { durationParts, prices, tierLabel } from "@/content/prices";
import { schemaAvailability, type ProductId, type Season } from "@/config/season";

/** FAQPage z tej samej listy, którą widzi użytkownik (components/content/FAQ.tsx). */
export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
}

/**
 * Oferty produktu z content/prices.ts (jedno źródło cen). Bez aggregateRating, bez Review, bez suggestedMinAge.
 * Niepotwierdzona drabinka → null (nie wystawiamy).
 * `alternateName`: warianty frazy bez diakrytyki i synonimy (docs/pakiet/04-SEO-GEO-SCHEMA.md §3.2) — jedyne miejsce,
 * gdzie obsługujemy „skutery sniezne zakopane"; w treści i H1 tego nie ma.
 */
export function productOffersSchema(
  product: ProductId,
  locale: "pl" | "en",
  season: Season,
  name: string,
  url: string,
  options: { alternateName?: readonly string[] } = {},
) {
  const ladder = prices[product];
  if (!ladder.confirmed || ladder.variants.length === 0) return null;
  const offerName = (durationMin: number) => {
    const d = durationParts(durationMin);
    return d.key === "hours" ? `${d.value} h` : `${d.value} min`;
  };
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    ...(options.alternateName && options.alternateName.length > 0 ? { alternateName: [...options.alternateName] } : {}),
    url,
    brand: { "@type": "Brand", name: site.name },
    offers: ladder.variants.map((v) => {
      /* opis oferty = wyróżnik wariantu + za co jest cena („za buggy · do 2 osób") — Offer ma nieść jednostkę ceny, nie tylko kwotę */
      const description = [v.notes?.[locale], ladder.unit?.[locale]].filter(Boolean).join(" · ");
      return {
        "@type": "Offer",
        name: `${tierLabel(v, locale)} · ${offerName(v.durationMin)}`,
        price: String(v.priceFrom),
        priceCurrency: "PLN",
        availability: schemaAvailability(product, season),
        url: `${url}#rezerwacja`,
        ...(description ? { description } : {}),
      };
    }),
  };
}

/**
 * LocalBusiness — globalnie, w layout. Źródło: docs/pakiet/04-SEO-GEO-SCHEMA.md §3.1.
 * CELOWO bez `aggregateRating` i bez `Review` (self-serving review markup — zakaz Google).
 * `sameAs` tylko z realnymi profilami; puste = pomijamy pole.
 */
export function localBusinessSchema(locale: "pl" | "en") {
  const description =
    locale === "pl"
      ? "Wyprawy quadami, buggy 4×4 i skuterami śnieżnymi w Zakopanem i Tatrach, z lokalnymi instruktorami, po legalnych trasach."
      : "Guided quad, buggy 4×4 and snowmobile tours in Zakopane and the Tatra Mountains, with local instructors, on legal routes.";

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: site.alternateNames,
    description,
    url: `${site.url}/`,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: String(site.geo.latitude), longitude: String(site.geo.longitude) },
    // bez openingHoursSpecification: „czynne 24 h" to nieprawda (decyzja 2026-09-10), prawdziwych godzin nie znamy — brak pola > fałsz
    areaServed: site.areaServed.map((name, i) => ({ "@type": i === 0 ? "City" : "Place", name })),
    priceRange: "250–1000 PLN",
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
  };
}
