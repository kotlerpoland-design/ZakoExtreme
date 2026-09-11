import type { Locale } from "@/i18n/routing";
import type { ProductId } from "@/config/season";

/**
 * CO ZAWIERA CENA I CO KLIENT PRZYNOSI — jedyne źródło obu list.
 * Czytają z niego pasek „W cenie" w cenniku (components/offer/PricingCards.tsx, przez `priceIncludesFor`)
 * oraz odpowiedzi FAQ `co-w-cenie`, `skutery-co-w-cenie` i `co-zabrac` — dzięki temu listy nie mogą się rozjechać.
 *
 * Źródło: treść przeniesiona ze starej strony, potwierdzona przez właścicielkę 2026-09-10 (quady i buggy;
 * znacznik #2 z docs/pakiet/03-COPY-NAGLOWKI.md §8) i 2026-09-11 (skutery śnieżne: skuter, kask, szkolenie, paliwo, poczęstunek).
 *
 * TWARDA ZASADA: na liście jest dokładnie to, co potwierdzone. Ubezpieczenia NIE ma na liście,
 * więc nie pojawia się nigdzie na stronie — ani w cenniku, ani w FAQ, ani w schema.
 * Lista „co zabrać" dotyczy quadów i buggy. Na skuterach ubranie jest inne —
 * `skutery-co-zabrac` zostaje `answer: null` do osobnego potwierdzenia.
 */
export type IncludedItem = {
  id: string;
  /** forma na listę — pozycja paska w cenniku, wielką literą */
  label: { pl: string; en: string };
  /** forma w zdaniu — do odpowiedzi FAQ; angielski potrzebuje rodzajników, których lista nie ma */
  sentence: { pl: string; en: string };
};

/** W cenie każdego wariantu wyprawy quadem i buggy. */
export const priceIncludes: readonly IncludedItem[] = [
  {
    id: "vehicle",
    label: { pl: "Quad albo buggy", en: "Quad or buggy" },
    sentence: { pl: "quad albo buggy", en: "a quad or buggy" },
  },
  {
    id: "gear",
    label: { pl: "Kask i sprzęt ochronny", en: "Helmet and protective gear" },
    sentence: { pl: "kask i sprzęt ochronny", en: "a helmet and protective gear" },
  },
  {
    id: "briefing",
    label: { pl: "Szkolenie przed wyjazdem", en: "Briefing before you set off" },
    sentence: { pl: "szkolenie przed wyjazdem", en: "a briefing before you set off" },
  },
  {
    id: "fuel",
    label: { pl: "Paliwo", en: "Fuel" },
    sentence: { pl: "paliwo", en: "fuel" },
  },
];

/** W cenie każdego wariantu wyprawy skuterem śnieżnym (potwierdzone 2026-09-11). */
export const priceIncludesSnowmobile: readonly IncludedItem[] = [
  {
    id: "snowmobile",
    label: { pl: "Skuter śnieżny", en: "Snowmobile" },
    sentence: { pl: "skuter śnieżny", en: "a snowmobile" },
  },
  {
    id: "helmet",
    label: { pl: "Kask", en: "Helmet" },
    sentence: { pl: "kask", en: "a helmet" },
  },
  {
    id: "briefing",
    label: { pl: "Szkolenie przed wyjazdem", en: "Briefing before you set off" },
    sentence: { pl: "szkolenie przed wyjazdem", en: "a briefing before you set off" },
  },
  {
    id: "fuel",
    label: { pl: "Paliwo", en: "Fuel" },
    sentence: { pl: "paliwo", en: "fuel" },
  },
  {
    id: "refreshments",
    label: { pl: "Poczęstunek", en: "Refreshments" },
    sentence: { pl: "poczęstunek", en: "refreshments" },
  },
];

/** Lista „W cenie" dla drabinki cenowej danego produktu. */
export function priceIncludesFor(product: ProductId): readonly IncludedItem[] {
  return product === "skutery" ? priceIncludesSnowmobile : priceIncludes;
}

/** Co klient bierze ze sobą. */
export const bringWithYou: readonly IncludedItem[] = [
  {
    id: "clothes",
    label: { pl: "Wygodne ubranie", en: "Comfortable clothes" },
    sentence: { pl: "wygodne ubranie", en: "comfortable clothes" },
  },
  {
    id: "shoes",
    label: { pl: "Sportowe obuwie", en: "Sports shoes" },
    sentence: { pl: "sportowe obuwie", en: "sports shoes" },
  },
  {
    id: "mood",
    label: { pl: "Dobry humor", en: "Good mood" },
    sentence: { pl: "dobry humor", en: "a good mood" },
  },
];

/** Lista jako wyliczenie w zdaniu FAQ: „a, b, c i d" / „a, b, c and d". */
export function listSentence(items: readonly IncludedItem[], locale: Locale): string {
  const parts = items.map((item) => item.sentence[locale]);
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(", ")} ${locale === "pl" ? "i" : "and"} ${last}`;
}
