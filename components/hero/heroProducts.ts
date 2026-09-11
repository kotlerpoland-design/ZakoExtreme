import type { PageKey } from "@/i18n/routing";
import { PRODUCT_ORDER, type ProductId, type Season } from "@/config/season";
import type { NavLabelKey } from "@/components/layout/nav";

/** trzy filary hero = trzy slajdy (buggy6 i maverick zlewają się w buggy) */
export type HeroPillar = "quady" | "buggy" | "skutery";
export type HeroProductPage = { key: PageKey; labelKey: NavLabelKey; product: HeroPillar };

const PRODUCT_PAGE: Record<ProductId, HeroProductPage> = {
  quady: { key: "/quady-zakopane", labelKey: "quads", product: "quady" },
  buggy: { key: "/buggy-zakopane", labelKey: "buggy", product: "buggy" },
  buggy6: { key: "/buggy-zakopane", labelKey: "buggy", product: "buggy" },
  maverick: { key: "/buggy-zakopane", labelKey: "buggy", product: "buggy" },
  skutery: { key: "/skutery-sniezne-zakopane", labelKey: "snowmobiles", product: "skutery" },
};

/**
 * Lista „01 / 02 / 03" w hero strony głównej i kolejność slajdów: kolejność sezonu, skutery zawsze na liście —
 * latem i w sezonie przejściowym na końcu, zimą na czele.
 */
export function heroProductPages(season: Season): HeroProductPage[] {
  const seen = new Set<PageKey>();
  const out: HeroProductPage[] = [];
  for (const id of [...PRODUCT_ORDER[season], "skutery" as const]) {
    const page = PRODUCT_PAGE[id];
    if (seen.has(page.key)) continue;
    seen.add(page.key);
    out.push(page);
  }
  return out;
}
