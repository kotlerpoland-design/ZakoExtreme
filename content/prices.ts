import type { ProductId } from "@/config/season";

/**
 * CENNIK — jedyne źródło cen na stronie. Z tego pliku wynikają karty, /cennik/, schema Offer i llms.txt.
 * Źródło: docs/pakiet/01-BRIEF-I-FAKTY.md §3. Wszystkie ceny są cenami „od".
 *
 * TWARDE ZASADY:
 * - Cena wejściowa quada/buggy to 250. Nigdy 300 (stara strona WordPress ma błąd).
 * - Quad i buggy mają TĘ SAMĄ drabinkę.
 * - Skutery: mamy tylko zakres 200–600 zł. Dopóki `confirmed: false`, wariantów NIE renderujemy.
 */
export type PriceVariant = {
  id: string;
  /** np. STANDARD / PREMIUM / ULTRA */
  tier: string;
  /** czas trwania w minutach */
  durationMin: number;
  /** cena „od" w PLN */
  priceFrom: number;
  /** krótkie wyróżniki do karty, per język */
  notes?: { pl: string; en: string };
};

export type PriceLadder = {
  product: ProductId;
  /** Czy drabinka jest potwierdzona przez właściciela. Niepotwierdzonej nie publikujemy. */
  confirmed: boolean;
  variants: readonly PriceVariant[];
};

const quadBuggyVariants: readonly PriceVariant[] = [
  { id: "standard-1h", tier: "STANDARD", durationMin: 60, priceFrom: 250, notes: { pl: "trasa 12–15 km", en: "12–15 km route" } },
  { id: "premium-2h", tier: "PREMIUM", durationMin: 120, priceFrom: 450 },
  { id: "ultra-3h", tier: "ULTRA", durationMin: 180, priceFrom: 650, notes: { pl: "opcja ogniska z grillem", en: "bonfire and grill option" } },
];

export const prices: Record<ProductId, PriceLadder> = {
  quady: { product: "quady", confirmed: true, variants: quadBuggyVariants },
  buggy: { product: "buggy", confirmed: true, variants: quadBuggyVariants },
  buggy6: {
    product: "buggy6",
    confirmed: true,
    variants: [
      { id: "buggy6-standard-1h", tier: "STANDARD", durationMin: 60, priceFrom: 550, notes: { pl: "prowadzi jedna dorosła osoba, reszta jedzie razem", en: "one adult drives, everyone else rides along" } },
      { id: "buggy6-premium-2h", tier: "PREMIUM", durationMin: 120, priceFrom: 1000 },
    ],
  },
  maverick: {
    product: "maverick",
    confirmed: true,
    variants: [{ id: "maverick-1h", tier: "MAVERICK XRS", durationMin: 60, priceFrom: 750, notes: { pl: "240 KM", en: "240 HP" } }],
  },
  skutery: {
    // [[DO POTWIERDZENIA: pełna drabinka skuterów — czas i cena]] — pytanie nr 1 do Piotrka, blokuje sezon zimowy.
    product: "skutery",
    confirmed: false,
    variants: [],
  },
};

/** Najniższa cena danego produktu (do hero „od X zł" i schema lowPrice). `null` gdy niepotwierdzona. */
export function priceFrom(product: ProductId): number | null {
  const ladder = prices[product];
  if (!ladder.confirmed || ladder.variants.length === 0) return null;
  return Math.min(...ladder.variants.map((v) => v.priceFrom));
}

/** Nagłówkowa cena „od" dla strony głównej: 250 zł poza zimą; zimą cena skuterów (gdy potwierdzona). */
export function headlinePriceFrom(season: "winter" | "shoulder" | "summer"): number | null {
  return season === "winter" ? priceFrom("skutery") : priceFrom("quady");
}
