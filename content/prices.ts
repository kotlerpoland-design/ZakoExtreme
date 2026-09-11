import type { ProductId } from "@/config/season";

/**
 * CENNIK — jedyne źródło cen na stronie. Z tego pliku wynikają karty, /cennik/, schema Offer i llms.txt.
 * Źródło: docs/pakiet/01-BRIEF-I-FAKTY.md §3. Wszystkie ceny są cenami „od".
 *
 * TWARDE ZASADY:
 * - Cena wejściowa quada to 250. Nigdy 300 (stara strona WordPress ma błąd).
 * - Buggy (potwierdzone przez właściciela 2026-09-11) mają WŁASNĄ drabinkę, cena ZA POJAZD: 2-os. 500 / 900 / 1200 zł
 *   za 1 / 2 / 3 h (do 2 osób); 6-os. 550 (do 4 osób) / 650 (do 6 osób) za 1 h, 1000 / 1200 za 2 h; Maverick 750 za 1 h do 2 osób.
 *   Wcześniejsze „quad i buggy mają tę samą drabinkę" (brief) jest nieaktualne — 250 przy buggy generowało zarzut
 *   „na stronie inna cena niż na miejscu" (docs/strony/BUGGY.md §6).
 * - Skutery (potwierdzone 2026-09-11): 30 / 60 / 120 min za 200 / 300 / 550 zł ZA SKUTER, druga osoba +50 zł.
 *   PREMIUM 300 zł to legalna cena skuterów — bramka A2 („nigdy 300 zł") dotyczy wyłącznie ceny wejściowej quada
 *   i pomija kontekst skuterów (scripts/check-content.mjs).
 */
export type PriceVariant = {
  id: string;
  /** nagłówek karty: STANDARD / PREMIUM / ULTRA albo etykieta lokalizowana („DO 4 OSÓB") — buggy 6-os. rozróżnia karty liczbą osób, nie nazwą */
  tier: string | { pl: string; en: string };
  /** czas trwania w minutach */
  durationMin: number;
  /** cena „od" w PLN */
  priceFrom: number;
  /** maksimum osób objętych ceną za pojazd (buggy, Maverick) — do schema i FAQ; brak = nie mówimy */
  persons?: number;
  /** dopłata za drugą osobę na tym samym pojeździe (PLN) — skutery; brak = karta nie pokazuje wiersza */
  secondRider?: number;
  /** krótkie wyróżniki do karty, per język */
  notes?: { pl: string; en: string };
  /** czym ta trasa różni się od pozostałych — akapit w karcie. Brak = karta pokazuje sam cennik. */
  description?: { pl: string; en: string };
};

export type PriceLadder = {
  product: ProductId;
  /** Czy drabinka jest potwierdzona przez właściciela. Niepotwierdzonej nie publikujemy. */
  confirmed: boolean;
  /** za co jest cena („za skuter", „za buggy · do 2 osób") — pod ceną na karcie; brak = bez etykiety (quady) */
  unit?: { pl: string; en: string };
  variants: readonly PriceVariant[];
};

/** Nagłówek karty wariantu w danym języku — `tier` bywa stałą (STANDARD) albo etykietą lokalizowaną. */
export function tierLabel(variant: Pick<PriceVariant, "tier">, locale: "pl" | "en"): string {
  return typeof variant.tier === "string" ? variant.tier : variant.tier[locale];
}

/**
 * Czas wariantu do wyświetlenia: pełne godziny jako „{hours} h", krótsze warianty (skutery 30 min) jako „{minutes} min".
 * Komponenty podstawiają klucz do `common.hours` / `common.minutes`, schema składa z tego nazwę Offer.
 */
export function durationParts(durationMin: number): { key: "hours" | "minutes"; value: number } {
  return durationMin % 60 === 0 ? { key: "hours", value: durationMin / 60 } : { key: "minutes", value: durationMin };
}

const quadVariants: readonly PriceVariant[] = [
  { id: "standard-1h", tier: "STANDARD", durationMin: 60, priceFrom: 250, notes: { pl: "trasa 12–15 km", en: "12–15 km route" } },
  { id: "premium-2h", tier: "PREMIUM", durationMin: 120, priceFrom: 450 },
  { id: "ultra-3h", tier: "ULTRA", durationMin: 180, priceFrom: 650, notes: { pl: "opcja ogniska z grillem", en: "bonfire and grill option" } },
];

/* Etykiety kart buggy 6-os.: cztery ceny na dwóch osiach (osoby × czas), więc nagłówkiem karty jest liczba osób,
   a czas stoi obok jak na pozostałych kartach. „Do", nie „dokładnie" — decyzja 2026-09-11. */
const UP_TO_4 = { pl: "DO 4 OSÓB", en: "UP TO 4 PEOPLE" };
const UP_TO_6 = { pl: "DO 6 OSÓB", en: "UP TO 6 PEOPLE" };

/**
 * Opisy tras — treść przeniesiona ze starej strony, potwierdzona przez właścicielkę 2026-09-10, skrócona do dwóch zdań
 * (karta musi zostać czytelna na 390 px) i sprowadzona do tonu strony: ULTRA opisujemy przez długość i wymagania trasy,
 * bez „ekstremalnych wyzwań" i „odwagi" (CLAUDE.md — ton: bezpiecznie, widokowo, dla par, rodzin i grup).
 * „Trasa 12–15 km" i „opcja ogniska z grillem" siedzą w `notes`, więc opis ich nie powtarza.
 *
 * Kluczowane per wariant, dokładane per produkt. Opisów tras buggy nie mamy: [[DO POTWIERDZENIA]], patrz 03-COPY §8.
 */
const quadDescriptions: Record<string, { pl: string; en: string }> = {
  "standard-1h": {
    pl: "Dla tych, którzy zaczynają przygodę z off-roadem. Polanami, przez las i strumyki, do punktu widokowego z panoramą Tatr.",
    en: "For a first taste of off-road. Across meadows, through forest and streams, to a viewpoint over the Tatra panorama.",
  },
  "premium-2h": {
    pl: "Najczęściej wybierana trasa. Dłuższe podjazdy, głębsze brody i odcinki techniczne, a na finał wzgórze z widokiem na Tatry.",
    en: "Our most popular route. Longer climbs, deeper fords and technical sections, finishing on a hill facing the Tatras.",
  },
  "ultra-3h": {
    pl: "Najdłuższa i najbardziej wymagająca trasa — urozmaicone pagórki i przeszkody terenowe, dla tych, którzy jeżdżą nie pierwszy raz.",
    en: "The longest and most demanding route — varied hills and obstacles, for people who have ridden before.",
  },
};

/** Ta sama drabinka cen, opisy dołożone per produkt. Wariant bez opisu zostaje bez akapitu. */
function withDescriptions(variants: readonly PriceVariant[], descriptions: Record<string, { pl: string; en: string }>): readonly PriceVariant[] {
  return variants.map((v) => (descriptions[v.id] ? { ...v, description: descriptions[v.id] } : v));
}

export const prices: Record<ProductId, PriceLadder> = {
  quady: { product: "quady", confirmed: true, variants: withDescriptions(quadVariants, quadDescriptions) },
  /* Buggy 2-os. — cennik potwierdzony 2026-09-11, cena za pojazd (do 2 osób). Własne id (`buggy-…`): `select_item` rozróżnia
     trzy produkty strony buggy (docs/strony/BUGGY.md §11), kotwice `#wariant-buggy-…` nie zderzają się z quadowymi.
     Bez `notes` — „trasa 12–15 km" i „ognisko" są potwierdzone dla quadów, dla buggy nie. */
  buggy: {
    product: "buggy",
    confirmed: true,
    unit: { pl: "za buggy · do 2 osób", en: "per buggy · up to 2 people" },
    variants: [
      { id: "buggy-standard-1h", tier: "STANDARD", durationMin: 60, priceFrom: 500, persons: 2 },
      { id: "buggy-premium-2h", tier: "PREMIUM", durationMin: 120, priceFrom: 900, persons: 2 },
      { id: "buggy-ultra-3h", tier: "ULTRA", durationMin: 180, priceFrom: 1200, persons: 2 },
    ],
  },
  /* Buggy 6-os. — potwierdzone 2026-09-11: cena za pojazd zależy od liczby osób (do 4 / do 6) i czasu (1 h / 2 h). */
  buggy6: {
    product: "buggy6",
    confirmed: true,
    unit: { pl: "za buggy", en: "per buggy" },
    variants: [
      { id: "buggy6-4os-1h", tier: UP_TO_4, durationMin: 60, priceFrom: 550, persons: 4, notes: { pl: "prowadzi jedna dorosła osoba, reszta jedzie razem", en: "one adult drives, everyone else rides along" } },
      { id: "buggy6-6os-1h", tier: UP_TO_6, durationMin: 60, priceFrom: 650, persons: 6 },
      { id: "buggy6-4os-2h", tier: UP_TO_4, durationMin: 120, priceFrom: 1000, persons: 4 },
      { id: "buggy6-6os-2h", tier: UP_TO_6, durationMin: 120, priceFrom: 1200, persons: 6 },
    ],
  },
  maverick: {
    product: "maverick",
    confirmed: true,
    unit: { pl: "za pojazd · do 2 osób", en: "per vehicle · up to 2 people" },
    variants: [{ id: "maverick-1h", tier: "MAVERICK XRS", durationMin: 60, priceFrom: 750, persons: 2, notes: { pl: "240 KM", en: "240 HP" } }],
  },
  skutery: {
    /* Drabinka ze starej strony potwierdzona przez właścicielkę 2026-09-11 (zamyka blokadę A z docs/strony/SKUTERY-SNIEZNE.md §12).
       Cena za skuter; druga osoba na tym samym skuterze +50 zł. Czasy 30/60/120 min — inne niż quady (60/120/180). */
    product: "skutery",
    confirmed: true,
    unit: { pl: "za skuter", en: "per snowmobile" },
    variants: [
      { id: "skutery-standard-30", tier: "STANDARD", durationMin: 30, priceFrom: 200, secondRider: 50 },
      { id: "skutery-premium-1h", tier: "PREMIUM", durationMin: 60, priceFrom: 300, secondRider: 50 },
      { id: "skutery-ultra-2h", tier: "ULTRA", durationMin: 120, priceFrom: 550, secondRider: 50 },
    ],
  },
};

/** Najniższa cena danego produktu (do hero „od X zł" i schema lowPrice). `null` gdy niepotwierdzona. */
export function priceFrom(product: ProductId): number | null {
  const ladder = prices[product];
  if (!ladder.confirmed || ladder.variants.length === 0) return null;
  return Math.min(...ladder.variants.map((v) => v.priceFrom));
}

/** Nagłówkowa cena „od" dla strony głównej: 250 zł poza zimą; zimą cena skuterów (200 zł). */
export function headlinePriceFrom(season: "winter" | "shoulder" | "summer"): number | null {
  return season === "winter" ? priceFrom("skutery") : priceFrom("quady");
}
