"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/primitives/Reveal";
import { GalleryFigure, gridClass, isFeature, type GalleryLayout, type GalleryTile } from "./galleryTile";

export type LightboxLabels = {
  open: string;
  close: string;
  prev: string;
  next: string;
  zoomIn: string;
  zoomOut: string;
  dialog: string;
  gallery: string;
  slide: string;
  /** szablon z placeholderami {index} i {total} */
  counter: string;
};

/**
 * Chunk YARL + jego CSS pobierany dopiero przy PIERWSZYM kliknięciu (budżet ekranu 1 < 310 kB).
 * `ssr: false` wolno użyć tylko w komponencie klienckim (docs Next: lazy-loading) — dlatego siatka, nie Gallery, robi dynamic().
 */
const GalleryLightbox = dynamic(() => import("./GalleryLightbox").then((m) => m.GalleryLightbox), { ssr: false });

/**
 * Kafle-przyciski: klik otwiera lightbox z przewijaniem w obrębie tej siatki (grupy). Wyjątek (4) w CLAUDE.md:
 * otwierany wyłącznie kliknięciem, nigdy „po wejściu". Nazwa przycisku = alt zdjęcia + sr-only „Powiększ zdjęcie".
 * Po zamknięciu fokus wraca na kliknięty kafel.
 */
export function GalleryGrid({ items, layout, labels }: { items: GalleryTile[]; layout: GalleryLayout; labels: LightboxLabels }) {
  const [index, setIndex] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  const close = () => {
    setIndex(null);
    requestAnimationFrame(() => trigger.current?.focus());
  };

  return (
    <>
      <ul className={gridClass(layout)}>
        {items.map((tile, i) => {
          const feature = isFeature(layout, i);
          return (
            <li key={tile.id} className={cn(feature && "col-span-2 md:row-span-2")}>
              <Reveal delay={(i % 4) * 0.05} className="h-full">
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={(e) => {
                    trigger.current = e.currentTarget;
                    setIndex(i);
                  }}
                  className="block h-full w-full cursor-zoom-in rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <GalleryFigure tile={tile} feature={feature} />
                  <span className="sr-only">{labels.open}</span>
                </button>
              </Reveal>
            </li>
          );
        })}
      </ul>
      {index !== null ? <GalleryLightbox slides={items} index={index} labels={labels} onClose={close} /> : null}
    </>
  );
}
