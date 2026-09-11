"use client";

import Image from "next/image";
import Lightbox, { isImageFitCover, isImageSlide, useLightboxProps, type RenderSlideProps } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "./gallery-lightbox.css";
import type { GalleryTile } from "./galleryTile";
import type { LightboxLabels } from "./GalleryGrid";

/**
 * Slajd przez next/image (oficjalny wzorzec YARL dla Next.js): rozmiar z proporcji zdjęcia i prostokąta slajdu,
 * rodzic `position: relative` dla `fill`. `quality={70}` obowiązkowo — next.config.ts dopuszcza tylko 62 i 70.
 * Zwraca `undefined` (nie null) dla nie-obrazów, żeby YARL użył domyślnego renderera.
 */
function NextImageSlide({ slide, offset, rect }: RenderSlideProps) {
  const { imageFit } = useLightboxProps().carousel;
  if (!isImageSlide(slide) || !slide.width || !slide.height) return undefined;
  const cover = isImageFitCover(slide, imageFit);
  const width = cover ? rect.width : Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width));
  const height = cover ? rect.height : Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height));
  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        src={{ src: slide.src, width: slide.width, height: slide.height }}
        alt={slide.alt ?? ""}
        fill
        sizes="100vw"
        quality={70}
        priority={offset === 0}
        draggable={false}
        style={{ objectFit: cover ? "cover" : "contain" }}
      />
    </div>
  );
}

/* bez rzutowania na CSSProperties — YARL 3.32 typuje `styles.root` jako SlotCSSProperties z sygnaturą indeksu `--yarl__*` */
const THEME = {
  "--yarl__color_backdrop": "rgba(16, 20, 24, 0.96)",
  "--yarl__color_button": "#ffffff",
  "--yarl__color_button_active": "var(--brand)",
  "--yarl__color_button_disabled": "rgba(255, 255, 255, 0.35)",
};

/**
 * Lightbox jednej siatki (grupy): swipe, strzałki, Escape, klik w tło, pull-down, pinch-zoom, licznik.
 * YARL animuje przez Web Animations API, więc `prefers-reduced-motion` obsługujemy propem, nie globalnym CSS.
 * Renderowany wyłącznie po kliknięciu (ssr: false w GalleryGrid) — `window` istnieje.
 */
export function GalleryLightbox({ slides, index, labels, onClose }: { slides: GalleryTile[]; index: number; labels: LightboxLabels; onClose: () => void }) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <Lightbox
      open
      index={index}
      close={onClose}
      slides={slides.map((s) => ({ src: s.src.src, width: s.src.width, height: s.src.height, alt: s.alt }))}
      plugins={[Zoom, Counter]}
      render={{ slide: NextImageSlide }}
      labels={{
        Previous: labels.prev,
        Next: labels.next,
        Close: labels.close,
        "Zoom in": labels.zoomIn,
        "Zoom out": labels.zoomOut,
        Lightbox: labels.dialog,
        "Photo gallery": labels.gallery,
        Slide: labels.slide,
        "{index} of {total}": labels.counter,
      }}
      carousel={{ finite: true, preload: 1 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      zoom={{ maxZoomPixelRatio: 2 }}
      counter={{ separator: "/" }}
      animation={reduceMotion ? { fade: 0, swipe: 0, navigation: 0 } : undefined}
      styles={{ root: THEME }}
    />
  );
}
