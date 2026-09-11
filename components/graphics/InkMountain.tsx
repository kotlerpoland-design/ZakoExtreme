import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import inkMountain from "@/assets/graphics/hero-mountain-ink.webp";

/* Wtopienie ze wszystkich stron — bez maski widać prostokąt. Góra zanika krótko (niebo zdjęcia ma własny gradient, więc
   nawet po wyrównaniu czerni do tła krawędź byłaby widoczna), dół długo. Prawa strona zanika późno (od 84 %), bo tam obraz
   ma zostać widoczny pod ogonem washu zdjęcia hero; lewa krótko, bo obraz i tak wystaje poza sekcję. */
const MASK = "linear-gradient(to bottom, transparent 0%, #000 18%, #000 45%, transparent 100%), linear-gradient(to right, transparent 0%, #000 14%, #000 84%, transparent 100%)";
const STYLE: CSSProperties = {
  maskImage: MASK,
  WebkitMaskImage: MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

/**
 * Góry w tle hero (od 2026-09-09 ciemne zdjęcie szczytów zamiast rysunku tuszem; nazwa pliku i komponentu została) — dekoracja,
 * nie treść (alt="", aria-hidden). Plik ma czernie podniesione do koloru tła #101418 (compose Screen, ≈26 kB, przepis
 * w components/README.md „Grafiki"), maska wtapia wszystkie krawędzie, a opacity-45 robi z niego delikatne tło
 * (decyzja 2026-09-09: zdjęcie hero na pierwszym planie, góry tylko tłem). Dlatego:
 *  - `unoptimized` (finalny WebP z hashem, bez ponownego kodowania),
 *  - leży pod zdjęciem i tekstem (-z-10) po lewej, jak szary dym za listą w referencji; krawędzie wtapia maska,
 *  - w DOM renderuje się PO zdjęciu hero: test budżetu bierze pierwszy <img> w [data-hero] jako LCP.
 */
export function InkMountain({ className }: { className?: string }) {
  return (
    <Image
      src={inkMountain}
      alt=""
      aria-hidden
      unoptimized
      loading="lazy"
      fetchPriority="low"
      decoding="async"
      className={cn("pointer-events-none absolute -z-10 h-auto select-none opacity-45", className)}
      style={STYLE}
    />
  );
}
