import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ProductId } from "@/config/season";
import type { Locale, PageKey } from "@/i18n/routing";
import type { MediaItem } from "@/content/media";
import { localizedPath } from "@/i18n/paths";
import { cn } from "@/lib/utils";
import { PriceFrom } from "@/components/primitives/PriceFrom";
import { SelectItemLink } from "./SelectItemLink";

/**
 * Dokąd prowadzi „Zobacz szczegóły". Buggy 6-os. i Maverick nie mają własnych stron (02-ARCHITEKTURA-URL §2: 12 stron,
 * nie więcej) — idą na stronę buggy z kotwicą do wariantu; te id ma dostać sekcja „Warianty i ceny" strony buggy.
 * Hash jest wspólny dla PL i EN (id w DOM, nie slug). Stan 2026-09-11: strona skuterów istnieje, strony buggy jeszcze nie.
 */
export const PRODUCT_PAGE: Record<ProductId, { page: PageKey; hash?: string }> = {
  quady: { page: "/quady-zakopane" },
  buggy: { page: "/buggy-zakopane" },
  buggy6: { page: "/buggy-zakopane", hash: "buggy-6-osobowe" },
  maverick: { page: "/buggy-zakopane", hash: "maverick-xrs" },
  skutery: { page: "/skutery-sniezne-zakopane" },
};

/** id karty na stronie głównej — cel kotwicy z numeru na grzbiecie (`RidgeRoute`). */
export const productCardAnchor = (id: ProductId) => `oferta-${id}`;

export function productDetailsHref(id: ProductId, locale: Locale): string {
  const { page, hash } = PRODUCT_PAGE[id];
  return localizedPath(page, locale) + (hash ? `#${hash}` : "");
}

type Props = {
  id: ProductId;
  locale: Locale;
  priceFrom: number | null;
  media: MediaItem | null;
  index: number;
  className?: string;
};

/**
 * Karta jak bilet: zdjęcie · nazwa · cena od · jeden przycisk. Bez ceny (skutery) → „Cenę ustalamy telefonicznie".
 * Cena i CTA są przypięte do dołu (`mt-auto` na bloku ceny), żeby w rzędzie kart leżały na jednej linii, a dłuższe,
 * dwuwierszowe nazwy dostały całą wolną przestrzeń u góry.
 * Jest celem kotwicy `#oferta-<id>` (numer na grzbiecie): `tabIndex={-1}` daje fokus po nawigacji fragmentowej (poza
 * kolejnością Tab), `:target` podświetla kartę bez JS, `scroll-mt-header` trzyma ją pod sticky headerem.
 */
export async function ProductCard({ id, locale, priceFrom, media, index, className }: Props) {
  const t = await getTranslations();
  return (
    <article
      id={productCardAnchor(id)}
      tabIndex={-1}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg bg-card shadow-card outline-none transition-shadow duration-300 ease-soft scroll-mt-header hover:shadow-lift",
        "target:ring-2 target:ring-brand focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-muted">
        {media ? (
          <Image
            src={media.src}
            alt={media.alt[locale]}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 84vw"
            quality={62}
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
            style={{ objectPosition: media.position ?? "50% 50%" }}
          />
        ) : null}
        <span className="absolute top-3 left-3 rounded-chip bg-background/90 px-2 py-1 font-display text-eyebrow font-semibold tabular text-brand backdrop-blur" aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-display text-eyebrow font-medium uppercase text-muted-foreground">{t(`products.taglines.${id}`)}</p>
        <h3 className="mt-1 mb-4 text-display-md uppercase">{t(`products.names.${id}`)}</h3>
        {/* mt-auto: wolna przestrzeń idzie NAD cenę, więc cena i CTA stoją na jednej linii we wszystkich kartach
            niezależnie od tego, czy nazwa łamie się na dwie linie (mb-4 na h3 trzyma minimalny odstęp) */}
        <div className="mt-auto mb-5">
          {priceFrom !== null ? (
            <PriceFrom price={priceFrom} size="card" />
          ) : (
            <p className="font-display text-base font-medium text-ink-2">{t("products.priceOnRequest")}</p>
          )}
        </div>
        <SelectItemLink
          kind="page"
          itemId={id}
          href={productDetailsHref(id, locale)}
          className="inline-flex min-h-11 items-center justify-between gap-2 border-t border-border pt-4 font-display text-base font-medium uppercase tracking-wide text-foreground after:absolute after:inset-0 after:content-['']"
        >
          {t("products.seeDetails")}
          <ArrowRight className="size-5 text-brand transition-transform duration-300 ease-soft group-hover:translate-x-1" aria-hidden />
        </SelectItemLink>
      </div>
    </article>
  );
}
