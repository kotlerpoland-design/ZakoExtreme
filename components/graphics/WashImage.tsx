import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { washFilterId } from "./watercolor";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** hero LCP: preload zamiast deprecated `priority` (Next 16) */
  preload?: boolean;
  /** slajdy poza pierwszym: loading="lazy" + fetchPriority="low", żeby nie ścigały się z LCP */
  lazy?: boolean;
  /** object-position, np. "62% 45%" żeby zachować jeźdźca i szczyty w kadrze */
  position?: string;
  /** ziarno szumu — musi odpowiadać `WatercolorDefs` w tym samym hero; slajdy rotacji dzielą jeden seed (stabilna krawędź) */
  seed?: number;
  /** jakość z listy `images.qualities` w next.config.ts (62 | 70) */
  quality?: 62 | 70;
  /**
   * false = bez placeholdera blur I bez `blurDataURL` w propsach (obiekt src okrojony do src/width/height): zdjęcia poniżej
   * zgięcia (FAQ) nie potrzebują rozmycia, a base64 ×2 kopie img + ×2 kopie w payloadzie RSC to ~2,5 kB gz HTML ekranu 1.
   */
  blur?: boolean;
  className?: string;
  imgClassName?: string;
};

/* resztki pigmentu: przygaszone, ale z resztą koloru — na ciemnym tle ghost ma czytać się jak dym, nie jak jasna smuga
   (brightness < 1; na jasnym motywie było 1.05) */
const GHOST_FILTER: CSSProperties = { filter: "saturate(.55) contrast(.9) brightness(.85)" };

/**
 * Fotografia, której alpha eroduje na lewej (desktop) / dolnej (mobile) krawędzi w ciemne tło strony — bez żadnego overlayu.
 * Warstwa: wrapper z `filter: url(#wc-…)` (erozja, px) → div z gradientem kierunkowym `.wash-base` (CSS mask, %) → next/image.
 * Dwie kopie tego samego obrazu (jeden request — identyczny srcset): pod spodem ghost (odbarwiona, opacity 0,25, filtr wysp
 * i zacieków, gradient sięgający dalej w tło — to ona przechodzi nad rysunek góry, kreska zostaje widoczna pod alpha ≤ ~0,3),
 * na wierzchu kopia ostra z filtrem `edge`. Bez `mix-blend-mode`: slajdy w crossfade tworzą własny stacking context i blend
 * migałby przez 700 ms.
 * Zawsze `fill` w kontenerze `relative` z zarezerwowaną wysokością (CLS 0). Który filtr (mobile/desktop) — decyduje CSS
 * po zmiennych `--wc-*`. Kolejność DOM: ghost jest pierwszym <img> — test budżetu bierze jego currentSrc (ten sam co core) jako LCP.
 */
export function WashImage({ src, alt, sizes, preload = false, lazy = false, position = "50% 50%", seed = 7, quality = 70, blur = true, className, imgClassName }: Props) {
  const loading = lazy ? "lazy" : preload ? "eager" : undefined;
  const fetchPriority = lazy ? "low" : preload ? "high" : undefined;
  const image: StaticImageData = blur ? src : { src: src.src, width: src.width, height: src.height };
  const placeholder = blur ? "blur" : "empty";
  const filters = {
    "--wc-edge-mobile": `url(#${washFilterId(seed, "edge", "mobile")})`,
    "--wc-edge-desktop": `url(#${washFilterId(seed, "edge", "desktop")})`,
    "--wc-ghost-mobile": `url(#${washFilterId(seed, "ghost", "mobile")})`,
    "--wc-ghost-desktop": `url(#${washFilterId(seed, "ghost", "desktop")})`,
  } as CSSProperties;

  return (
    <div className={cn("absolute inset-0 isolate", className)} style={filters}>
      <div className="wash-ghost absolute inset-0 opacity-[.25]" aria-hidden>
        <div className="wash-base wash-base-ghost absolute inset-0 overflow-hidden [transform:translateZ(0)]">
          <Image
            src={image}
            alt=""
            fill
            sizes={sizes}
            loading={loading}
            fetchPriority={fetchPriority}
            placeholder={placeholder}
            quality={quality}
            className={cn("object-cover", imgClassName)}
            style={{ objectPosition: position, ...GHOST_FILTER }}
          />
        </div>
      </div>
      <div className="wash-edge absolute inset-0">
        <div className="wash-base absolute inset-0 overflow-hidden [transform:translateZ(0)]">
          <Image
            src={image}
            alt={alt}
            fill
            sizes={sizes}
            preload={preload}
            loading={loading}
            fetchPriority={fetchPriority}
            placeholder={placeholder}
            quality={quality}
            className={cn("object-cover", imgClassName)}
            style={{ objectPosition: position }}
          />
        </div>
      </div>
    </div>
  );
}
