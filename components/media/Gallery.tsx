import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { GalleryGroupId, MediaItem } from "@/content/media";
import type { ProductId } from "@/config/season";
import type { Locale, PageKey } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/primitives/Reveal";
import { LocalizedLink } from "@/components/primitives/LocalizedLink";
import { GalleryFigure, gridClass, isFeature, toTiles, type GalleryLayout } from "./galleryTile";

type Props = {
  items: readonly MediaItem[];
  locale: Locale;
  intro?: string;
  /** `mosaic` (domyślnie): pierwsze zdjęcie 2×2 — dla 5 zdjęć zajawki; `grid`: równa siatka */
  layout?: GalleryLayout;
  /** link tekstowy pod siatką („Zobacz galerię →") — zajawki prowadzą na podstronę /galeria/; `hash` = grupa (np. „skutery" → /galeria/#skutery) */
  more?: { href: PageKey; hash?: GalleryGroupId; label: string };
};

const MORE_CLASS = "group inline-flex min-h-11 items-center gap-2 font-display text-base font-medium uppercase tracking-wide text-foreground underline-offset-4 hover:underline";

function MoreLink({ href, hash, locale, className, children }: { href: PageKey; hash?: GalleryGroupId; locale: Locale; className: string; children: ReactNode }) {
  if (hash) {
    return (
      <Link href={`${localizedPath(href, locale)}#${hash}`} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <LocalizedLink href={href} locale={locale} className={className}>
      {children}
    </LocalizedLink>
  );
}

/** Grupa na /galeria/ dla zdjęcia — kotwica celu linku z zajawki. */
const groupOf = (product?: ProductId) => (product === "buggy6" || product === "maverick" ? "buggy" : (product ?? "quady"));

/**
 * Zajawka galerii (strona główna, strony produktowe): siatka, nie karuzela; kafel = zwykły link do /galeria/#grupa — zero JS
 * (budżet ekranu 1 na stronie głównej). Lightbox jest wyłącznie w `LightboxGallery` na /galeria/ — celowo NIE importujemy
 * tu `GalleryGrid`, bo sam import klienckiego komponentu dociąga jego chunk na stronę.
 * Wideo: slot pojawi się dopiero z potwierdzonym plikiem i posterem (tap-to-play, bez autoplay).
 */
export function Gallery({ items, locale, intro, layout = "mosaic", more }: Props) {
  if (items.length === 0) return null;
  const tiles = toTiles(items, locale);
  const galleryPath = localizedPath("/galeria", locale);

  return (
    <div>
      {intro ? <p className="mb-8 max-w-prose text-ink-2">{intro}</p> : null}
      <ul className={gridClass(layout)}>
        {tiles.map((tile, i) => {
          const feature = isFeature(layout, i);
          return (
            <li key={tile.id} className={cn(feature && "col-span-2 md:row-span-2")}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <Link
                  href={`${galleryPath}#${groupOf(items[i].product)}`}
                  className="block h-full rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <GalleryFigure tile={tile} feature={feature} />
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
      {more ? (
        <p className="mt-6 md:mt-8">
          {/* z `hash` zwykły Link na ścieżkę + kotwicę grupy (LocalizedLink przyjmuje sam PageKey) */}
          <MoreLink href={more.href} hash={more.hash} locale={locale} className={MORE_CLASS}>
            {more.label}
            <ArrowRight className="size-5 text-brand transition-transform duration-300 ease-soft group-hover:translate-x-1" aria-hidden />
          </MoreLink>
        </p>
      ) : null}
    </div>
  );
}
