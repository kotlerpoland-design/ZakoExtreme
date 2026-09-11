/**
 * Profile społecznościowe — potwierdzone przez właścicielkę 2026-09-10 (01-BRIEF-I-FAKTY.md §2).
 * Kolejność = kolejność ikon w stopce. Adres Facebooka bez `?locale=pl_PL`: parametr wymuszałby
 * polski interfejs u anglojęzycznego użytkownika i zaśmiecał kanoniczny URL w `sameAs`.
 */
const SOCIAL_PROFILES = [
  { key: "instagram", label: "Instagram", url: "https://www.instagram.com/zako_extreme_/" },
  { key: "facebook", label: "Facebook", url: "https://www.facebook.com/zakoextreme" },
  { key: "tiktok", label: "TikTok", url: "https://www.tiktok.com/@zako_extreme" },
  { key: "youtube", label: "YouTube", url: "https://www.youtube.com/@ZAKOEXTREME" },
] as const;

export type SocialKey = (typeof SOCIAL_PROFILES)[number]["key"];

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
  /** Godzin otwarcia NIE podajemy — „czynne 24 h" było nieprawdą (decyzja 2026-09-10); całą dobę działa tylko strona i rezerwacja online. */
  /** Ocena jest stabilna i można ją podawać. Liczbę opinii podajemy WYŁĄCZNIE jako „ponad 800". */
  rating: "4,8",
  reviewsLabel: { pl: "ponad 800 opinii", en: "800+ reviews" },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=ZakoExtreme+Rybk%C3%B3wka+16%2F2+Zakopane",
  /** Przycisk „Nawiguj": na telefonie otwiera aplikację Map z nawigacją, na desktopie trasę do nas. */
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Rybk%C3%B3wka+16%2F2%2C+34-500+Zakopane",
  /**
   * Osadzona mapa (contact/MapEmbed): bezkluczowy embed z pinezką na adresie — bez API key i bez `pb=`, żeby adres miał jedno źródło.
   * Celowo zapytanie o ADRES, nie o nazwę firmy: karta miejsca „ZakoExtreme" w embedzie pokazuje dokładną liczbę opinii Google,
   * a bramka mówi „ponad 800", nigdy dokładna liczba. Wersja z nazwą: `q=ZakoExtreme+Rybk%C3%B3wka+16%2F2+Zakopane` — tylko za zgodą właścicielki.
   */
  googleMapsEmbedUrl: "https://www.google.com/maps?q=Rybk%C3%B3wka+16%2F2%2C+34-500+Zakopane&z=16&output=embed",
  social: SOCIAL_PROFILES,
  /** Tylko realne, istniejące profile — nie katalogi ani zaplecze linkowe (04-SEO-GEO-SCHEMA.md §3.1). */
  sameAs: SOCIAL_PROFILES.map((profile) => profile.url),
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
