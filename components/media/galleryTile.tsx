import Image, { type StaticImageData } from "next/image";
import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/** Kafel galerii w wersji serializowalnej: alt już w języku strony, `src` bez blurDataURL (mniejszy RSC payload). */
export type GalleryTile = { id: string; src: StaticImageData; alt: string; position?: string };

export const toTiles = (items: readonly MediaItem[], locale: Locale): GalleryTile[] =>
  items.map((m) => ({ id: m.id, alt: m.alt[locale], position: m.position, src: { src: m.src.src, width: m.src.width, height: m.src.height } }));

export type GalleryLayout = "mosaic" | "grid";

/** Mozaika: pierwsze zdjęcie 2×2 — 5 zdjęć domyka ją bez dziur; grid: równa siatka dla pełnych grup na /galeria/. */
export const gridClass = (layout: GalleryLayout) =>
  cn("grid grid-cols-2 gap-3 md:gap-4", layout === "mosaic" ? "md:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-4");

export const isFeature = (layout: GalleryLayout, i: number) => layout === "mosaic" && i === 0;

/** Wspólny znacznik zdjęcia dla kafla-linku (server) i kafla-przycisku (client). Bez własnego stanu i bez API serwerowych. */
export function GalleryFigure({ tile, feature }: { tile: GalleryTile; feature: boolean }) {
  return (
    <figure className="relative aspect-[4/3] h-full overflow-hidden rounded-lg bg-muted">
      <Image
        src={tile.src}
        alt={tile.alt}
        fill
        sizes={feature ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
        quality={62}
        className="object-cover"
        style={{ objectPosition: tile.position ?? "50% 50%" }}
      />
    </figure>
  );
}
