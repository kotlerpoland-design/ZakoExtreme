import type { Locale, PageKey } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";

export type NavLabelKey = "quads" | "buggy" | "snowmobiles" | "vouchers" | "gallery" | "contact" | "prices" | "reviews";
export type NavItem = {
  key: PageKey;
  labelKey: NavLabelKey;
  /** kotwica do sekcji na stronie docelowej (np. `rezerwacja`); dziś nieużywana — galeria ma własną podstronę od 2026-09-10 */
  anchor?: string;
};

/** Pozycje sezonowe: są w tej tablicy zawsze, a odfiltrowuje je dopiero `navGroups`/`navItems`. */
const SEASONAL_KEYS: readonly PageKey[] = ["/vouchery"];

/**
 * Menu główne: trzy filary po lewej, trzy intencje po prawej, logo pośrodku (decyzja 2026-09-09).
 * Skutery są w menu przez cały rok — sezon komunikuje strona produktu, nie brak linku.
 * Kolejność stała (nie sezonowa): użytkownik zna układ menu z pierwszej wizyty.
 *
 * To jest PEŁNA lista. Widoczność sezonową rozstrzygają `navGroups()` i `navItems()` — nie czytaj stąd wprost.
 */
export const NAV_GROUPS: { left: readonly NavItem[]; right: readonly NavItem[] } = {
  left: [
    { key: "/skutery-sniezne-zakopane", labelKey: "snowmobiles" },
    { key: "/quady-zakopane", labelKey: "quads" },
    { key: "/buggy-zakopane", labelKey: "buggy" },
  ],
  right: [
    { key: "/vouchery", labelKey: "vouchers" },
    { key: "/galeria", labelKey: "gallery" },
    { key: "/kontakt", labelKey: "contact" },
  ],
};

/** Widoczność pozycji sezonowych. `vouchers: false` = poza oknem XI–XII, czyli tylko stopka. */
export type NavVisibility = { vouchers: boolean };

function visible(items: readonly NavItem[], { vouchers }: NavVisibility): NavItem[] {
  if (vouchers) return [...items];
  return items.filter((item) => !SEASONAL_KEYS.includes(item.key));
}

/** Grupy menu desktopowego (lewa/prawa strona logo) po odfiltrowaniu pozycji sezonowych. */
export function navGroups(visibility: NavVisibility): { left: NavItem[]; right: NavItem[] } {
  return { left: visible(NAV_GROUPS.left, visibility), right: visible(NAV_GROUPS.right, visibility) };
}

/**
 * Płaska lista w kolejności desktopu — menu mobilne i stopka.
 * Stopka odwzorowywała menu główne 1:1 (decyzja 2026-09-10); od wpięcia flagi voucherów wyjątkiem jest
 * „Vouchery": w stopce są cały rok (`{ vouchers: true }`), w menu tylko w oknie XI–XII.
 * Cennik i Opinie wypadły ze stopki — prowadzą do nich wyłącznie linki kontekstowe w treści.
 */
export function navItems(visibility: NavVisibility): NavItem[] {
  const { left, right } = navGroups(visibility);
  return [...left, ...right];
}

export function resolveNavHref(item: NavItem, locale: Locale): string {
  const path = localizedPath(item.key, locale);
  return item.anchor ? `${path}#${item.anchor}` : path;
}
