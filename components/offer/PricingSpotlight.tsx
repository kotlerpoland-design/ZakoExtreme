import Image from "next/image";
import type { ReactNode } from "react";
import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { Reveal } from "@/components/primitives/Reveal";

/**
 * Blok cennika ze zdjęciem produktu (decyzja 2026-09-11, „Maverick XRS — 240 KM" na /buggy-zakopane/).
 * Dwa elementy, bo zdjęcie leży w dwóch różnych miejscach drzewa:
 * - `SpotlightBackdrop` → `Section backdrop`: na mobile zdjęcie jest tłem CAŁEGO bloku, łącznie z nagłówkiem, pod pionowym
 *   gradientem koloru tła (nagłówek i „W cenie" muszą czytać się na niebie o zachodzie); od lg ukryte;
 * - `PricingSpotlight` → children sekcji: od lg siatka karta (45 %) | zdjęcie (55 %), zwykły next/image w rounded-lg jak
 *   zdjęcie kroków (Steps) — twarda krawędź, bez washu; na mobile renderuje same karty.
 * Rodzic podaje wynik `confirmedMedia()`; bez zdjęcia oba elementy renderują tylko to, co dostały.
 */
export function SpotlightBackdrop({ media }: { media: MediaItem | null }) {
  if (!media) return null;
  return (
    <div aria-hidden className="absolute inset-0 -z-10 lg:hidden">
      <Image src={media.src} alt="" fill sizes="100vw" quality={62} loading="lazy" className="object-cover" style={{ objectPosition: media.position ?? "50% 50%" }} />
      {/* góra i dół prawie kryjące (nagłówek, pasek „W cenie"), środek przepuszcza scenę za kartą */}
      <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/55 to-background/90" />
    </div>
  );
}

/* zdjęcie zajmuje 55 % kontenera na lg+ (Container max-w-7xl → ≤ ~680 px) */
const SIZES = "(min-width: 1024px) 55vw, 100vw";

export function PricingSpotlight({ media, locale, children }: { media: MediaItem | null; locale: Locale; children: ReactNode }) {
  if (!media) return <>{children}</>;
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_55%] lg:items-center lg:gap-12">
      <div>{children}</div>
      <Reveal delay={0.12} className="hidden lg:block">
        <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
          <Image src={media.src} alt={media.alt[locale]} fill sizes={SIZES} quality={62} className="object-cover" style={{ objectPosition: media.position ?? "50% 50%" }} />
        </figure>
      </Reveal>
    </div>
  );
}
