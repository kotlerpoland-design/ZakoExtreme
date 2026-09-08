/**
 * Dane firmy — jedyne źródło prawdy (NAP). Muszą być identyczne z wizytówką Google.
 * Źródło: docs/pakiet/01-BRIEF-I-FAKTY.md §2 i docs/pakiet/04-SEO-GEO-SCHEMA.md §3.1.
 */
export const site = {
  name: "ZakoExtreme",
  alternateNames: ["Zako Extreme", "ZakoExtreme Zakopane"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://zakoextreme.pl",
  phone: {
    /** Do href="tel:" — format międzynarodowy, bez spacji. */
    e164: "+48539320700",
    /** Do wyświetlania. */
    display: "539 320 700",
    displayIntl: "+48 539 320 700",
  },
  address: {
    street: "Rybkówka 16/2",
    postalCode: "34-500",
    city: "Zakopane",
    country: "PL",
  },
  geo: { latitude: 49.3177, longitude: 19.9962 },
  /** Czynne 24 h. */
  open24h: true,
  /** Ocena jest stabilna i można ją podawać. Liczbę opinii podajemy WYŁĄCZNIE jako „ponad 800". */
  rating: "4,8",
  reviewsLabel: { pl: "ponad 800 opinii", en: "800+ reviews" },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=ZakoExtreme+Rybk%C3%B3wka+16%2F2+Zakopane",
  /** Profile społecznościowe do `sameAs` — [[DO POTWIERDZENIA]]; puste = nie wystawiamy. */
  sameAs: [] as string[],
  areaServed: [
    "Zakopane",
    "Białka Tatrzańska",
    "Bukowina Tatrzańska",
    "Poronin",
    "Kościelisko",
    "Murzasichle",
  ],
  tracking: {
    /** Dokładnie jeden kontener. Nie GTM-T3PTPJ4K, nie GTM-KGM2CNF4. */
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  },
  booking: {
    provider: "slotwise",
    host: "https://bookings.slotwise.pl",
    businessId: process.env.NEXT_PUBLIC_SLOTWISE_BUSINESS_ID ?? "",
  },
} as const;
