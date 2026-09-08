import { site } from "@/config/site";

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
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    areaServed: site.areaServed.map((name, i) => ({ "@type": i === 0 ? "City" : "Place", name })),
    priceRange: "250–1000 PLN",
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
  };
}
