import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/primitives/Reveal";

const STEPS = ["briefing", "practice", "trail"] as const;

type Props = {
  locale: Locale;
  /** zdjęcie produktu po prawej (lg+) / pod listą (mobile); rodzic podaje wynik `confirmedMedia()`, tu nie sprawdzamy flagi */
  media?: MediaItem | null;
};

/* zdjęcie zajmuje 45 % kontenera na lg+ (Container max-w-7xl → ≤ ~560 px), na mobile pełną szerokość */
const SIZES = "(min-width: 1024px) 45vw, 100vw";

/**
 * „Jak przebiega wyprawa": 3 kroki 1:1 z copy jako lista belkowa (decyzja 2026-09-11, referencja Framer „How I can help you"):
 * indeks (01), tytuł, pozycje rozdzielone liniami; aktywna pozycja jasna z pomarańczową belką na lewej krawędzi, reszta wygaszona.
 * Aktywna domyślnie pierwsza; najechanie na inną przenosi belkę — czysty CSS (`group/steps`), zero JS, na dotyku zostaje
 * pierwsza (to kolejność kroków, nie tabs — żaden stan nic nie ukrywa). Po prawej zdjęcie produktu z content/media.ts
 * (`media.sections.steps`), zwykły next/image w rounded-lg jak wzór vouchera — twarda krawędź, bez washu.
 */
export async function Steps({ locale, media }: Props) {
  const t = await getTranslations("steps");
  return (
    <div className={cn(media && "lg:grid lg:grid-cols-[minmax(0,1fr)_45%] lg:items-start lg:gap-12")}>
      <ol className="group/steps" data-steps>
        {STEPS.map((key, i) => (
          <li
            key={key}
            className={cn(
              "border-b border-border/70 border-l-[3px] border-l-transparent transition-colors duration-300 ease-soft",
              /* belka tylko od lg (decyzja 2026-09-11): na mobile nie ma hovera, więc belka na pierwszej pozycji nie miałaby na co reagować;
                 pierwsza aktywna, dopóki nic nie jest najechane; najechana przejmuje belkę */
              "hover:border-l-brand",
              i === 0 && "lg:border-l-brand group-hover/steps:[&:not(:hover)]:border-l-transparent",
            )}
          >
            <Reveal delay={i * 0.08}>
              {/* p wypełnia li (padding tu, nie na li), więc hover na p = hover na pozycji; ten sam warunek co belka */}
              <p
                className={cn(
                  "flex items-start gap-3 py-5 pl-5 font-display text-xl font-medium leading-snug transition-colors duration-300 ease-soft md:py-6 md:pl-6 md:text-2xl",
                  /* mobile: wszystkie pozycje jednym kolorem (bez hovera nie ma czego wyróżniać); od lg pierwsza jasna, reszta wygaszona */
                  "text-foreground",
                  i === 0 ? "lg:group-hover/steps:[&:not(:hover)]:text-muted-foreground" : "lg:text-muted-foreground lg:hover:text-foreground",
                )}
              >
                {/* mobile: indeks w pomarańczu jest jedynym akcentem pozycji (bez belki); od lg wygaszony, akcent niesie belka */}
                <span aria-hidden className="mt-1 shrink-0 text-[11px] font-medium tabular tracking-wide text-brand md:mt-1.5 lg:text-muted-foreground">
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <span>{t(`items.${key}`)}</span>
              </p>
            </Reveal>
          </li>
        ))}
      </ol>

      {media ? (
        <Reveal delay={0.12} className="mt-8 lg:mt-0">
          <figure className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            <Image src={media.src} alt={media.alt[locale]} fill sizes={SIZES} quality={62} className="object-cover" style={{ objectPosition: media.position ?? "50% 50%" }} />
          </figure>
        </Reveal>
      ) : null}
    </div>
  );
}
