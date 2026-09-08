/**
 * Przełącznik sezonu. Steruje hero, kolejnością kart, menu, FAQ, `availability` w schema,
 * og:image i meta. Źródło reguł: docs/pakiet/02-ARCHITEKTURA-URL.md §4.
 *
 * Trzy stany, nie dwa — marzec–czerwiec to osobny stan (najdroższy okres w koncie).
 *
 * Ręczne nadpisanie: ustaw NEXT_PUBLIC_SEASON_OVERRIDE=winter|shoulder|summer
 * albo zmień SEASON_OVERRIDE poniżej. Śnieg nie czyta kalendarza.
 */
export type Season = "winter" | "shoulder" | "summer";

export type ProductId = "quady" | "buggy" | "buggy6" | "maverick" | "skutery";

/** Ręczne nadpisanie w kodzie (ma pierwszeństwo przed datami, ale nie przed zmienną środowiskową). */
export const SEASON_OVERRIDE: Season | null = null;

/** Granice sezonów jako {miesiąc 1–12, dzień}. Zmiana jednej linijki, nie deploy nowego hero. */
export const SEASON_BOUNDS = {
  /** od tej daty: ZIMA (skutery) */
  winterStart: { month: 11, day: 1 },
  /** od tej daty: PRZEJŚCIOWY (buggy + quady, skutery ukryte) */
  shoulderStart: { month: 3, day: 1 },
  /** od tej daty: LATO (quady + buggy) */
  summerStart: { month: 7, day: 1 },
} as const;

const SEASONS: readonly Season[] = ["winter", "shoulder", "summer"];

function isSeason(value: unknown): value is Season {
  return typeof value === "string" && (SEASONS as readonly string[]).includes(value);
}

function dayOfYear(month: number, day: number, year: number): number {
  return Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 1)) / 86_400_000);
}

/** Aktualny sezon dla podanej daty (domyślnie: teraz, czas polski przybliżony przez UTC+1/2 nie ma tu znaczenia — granice są dzienne). */
export function getSeason(date: Date = new Date()): Season {
  const envOverride = process.env.NEXT_PUBLIC_SEASON_OVERRIDE;
  if (isSeason(envOverride)) return envOverride;
  if (SEASON_OVERRIDE) return SEASON_OVERRIDE;

  const year = date.getUTCFullYear();
  const today = dayOfYear(date.getUTCMonth() + 1, date.getUTCDate(), year);
  const winter = dayOfYear(SEASON_BOUNDS.winterStart.month, SEASON_BOUNDS.winterStart.day, year);
  const shoulder = dayOfYear(SEASON_BOUNDS.shoulderStart.month, SEASON_BOUNDS.shoulderStart.day, year);
  const summer = dayOfYear(SEASON_BOUNDS.summerStart.month, SEASON_BOUNDS.summerStart.day, year);

  if (today >= winter || today < shoulder) return "winter";
  if (today < summer) return "shoulder";
  return "summer";
}

/** Kolejność kart oferty i pozycji w menu, per sezon. Skutery poza zimą są ukryte. */
export const PRODUCT_ORDER: Record<Season, readonly ProductId[]> = {
  winter: ["skutery", "buggy", "quady"],
  shoulder: ["buggy", "quady", "buggy6"],
  summer: ["quady", "buggy", "buggy6", "maverick"],
};

/** Czy dany produkt jest w tym sezonie dostępny do rezerwacji (steruje też `Offer.availability`). */
export function isProductAvailable(product: ProductId, season: Season = getSeason()): boolean {
  if (product === "skutery") return season === "winter";
  return true;
}

/** Wartość `availability` do schema.org `Offer`. */
export function schemaAvailability(product: ProductId, season: Season = getSeason()): string {
  return isProductAvailable(product, season) ? "https://schema.org/InStock" : "https://schema.org/PreOrder";
}
