import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import productsRidge from "@/assets/graphics/products-ridge.webp";

export type RouteMarker = {
  id: string;
  /** etykieta przy punkcie, np. „od 250 zł" albo „1 h" */
  label: ReactNode;
  /** podpis pod etykietą, np. nazwa produktu albo „STANDARD" */
  caption?: ReactNode;
  active?: boolean;
};

export type RidgeMarker = RouteMarker & {
  /** mobile: przy kropce tylko numer (01/02/03) zamiast ceny i nazwy */
  number?: string;
  /** link (np. `#oferta-quady`) — marker staje się kotwicą do karty; scroll i fokus robi przeglądarka */
  href?: string;
};

type Props = {
  markers: readonly RidgeMarker[];
  className?: string;
};

/** Układ współrzędnych zdjęcia (assets/graphics/products-ridge.webp ma proporcję 3:2; skala % liczy się z tych wymiarów). */
const RIDGE_W = 1536;
const RIDGE_H = 1024;

/*
 * Trasa po PAGÓRKACH W DOLINIE pod górami — nie po graniach. Testy z użytkownikami (2026-09-11) pokazały, że linia
 * prowadzona po szczytach sugerowała jazdę po graniach. Punkty (układ 1536×1024) wyznaczone ręcznie z nałożenia
 * polilinii na obraz (components/README.md „Grafiki"): granica las/zbocze nie ma jednego progu jasności, więc
 * automatyczne wykrywanie nie działa. Przebieg (runda 4, 2026-09-11) przeniesiony 1:1 z czerwonego szkicu
 * właścicielki na zrzucie desktopu: linia ZACZYNA SIĘ w sylwetce czarnych drzew pierwszego planu po lewej (x=79, nie
 * spoza krawędzi — nie ma ich przecinać), schodzi stromo przez kropkę 1 (272, 577; runda 5: cały lewy odcinek ~20 px
 * niżej niż w szkicu) na górną krawędź NIŻSZEGO pasa szarego lasu (x≈400–530, nie po koronie lewego pagórka) z łagodnym
 * dołkiem między kropką 1 a 2 (dno 461, 634; runda 6), wchodzi na środkowe wzniesienie (kulminacja ~690), spada
 * w wyraźny dołek między nim a ciemnym pagórkiem (841, 646), na koronę ciemnego pagórka (931), potem JEDNOSTAJNIE
 * schodzi do kropki Mavericka na prawym zboczu zaokrąglonego wzgórza (1154, 604) — bez wchodzenia na jego koronę
 * (runda 6) — i stromszy zjazd, żeby SKOŃCZYĆ w sylwetce czarnego drzewa (1348, 664) — trasa
 * „wchodzi za las", nie dobiega do prawej krawędzi. Dołki zostają: to one budują narrację „po dolinach".
 * Kropki markerów leżą na tej samej ścieżce (`yAt`).
 */
const VALLEY: readonly (readonly [number, number])[] = [
  [79, 492], [200, 548], [272, 577], [310, 589], [399, 614], [461, 634], [527, 625], [604, 614], [655, 591], [687, 582],
  [732, 591], [783, 621], [841, 646], [911, 589], [931, 573], [960, 582], [1005, 591], [1063, 606], [1110, 609],
  [1154, 604], [1195, 628], [1231, 646], [1282, 659], [1348, 664],
];

/** y polilinii `VALLEY` w punkcie x (interpolacja liniowa); poza zakresem — skrajny punkt. */
function yAt(x: number): number {
  if (x <= VALLEY[0][0]) return VALLEY[0][1];
  for (let i = 1; i < VALLEY.length; i++) {
    const [x1, y1] = VALLEY[i];
    if (x <= x1) {
      const [x0, y0] = VALLEY[i - 1];
      return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
    }
  }
  return VALLEY[VALLEY.length - 1][1];
}

/**
 * Przystanki pod markery (x wpisane ręcznie, y liczone z `VALLEY`), od lewej: lewe zbocze · kulminacja wzniesienia
 * w środku doliny · korona ciemnego pagórka (936) · prawe zbocze zaokrąglonego wzgórza (1154, 604 — runda 5:
 * właścicielka chciała kropkę Mavericka delikatnie niżej niż kulminacja 1126 z rundy 4).
 * Runda 3 (2026-09-11): Maverick z x=1424 (za żlebem) przeniesiony na zaokrąglone wzgórze, Buggy 6-os. o pagórek
 * wcześniej. Ciemny pagórek wchodzi TYLKO przy 4 markerach (strona główna) — przy 3 (cennik T1) ULTRA zostaje na
 * zaokrąglonym wzgórzu, patrz `pickStops`. Dwa prawe dzieli ~10,7 % szerokości — za mało na dwa chipy z ceną i nazwą
 * nad kropkami (przy 768 px potrzeba ~135 px, jest ~80), dlatego chip 4. markera siedzi pod kropką (`labelBelow`).
 */
const STOP_XS: readonly number[] = [272, 690, 936, 1154];
const STOPS: readonly (readonly [number, number])[] = STOP_XS.map((x) => [x, yAt(x)] as const);

/** Wtopienie: las u dołu przechodzi w tło strony, boki gasną, żeby nie było widać prostokąta na szerokim kontenerze. */
const MASK =
  "linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)";
const IMAGE_STYLE: CSSProperties = {
  maskImage: MASK,
  WebkitMaskImage: MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

function pickStops(n: number): readonly (readonly [number, number])[] {
  // 3 markery (STANDARD · PREMIUM · ULTRA): lewe zbocze · środek (wariant wyróżniony) · zaokrąglone wzgórze — ciemny pagórek pomijany
  if (n === 3) return [STOPS[0], STOPS[1], STOPS[3]];
  if (n <= STOPS.length) return STOPS.slice(0, n);
  // więcej ofert niż przystanków (dziś nie zachodzi): równo wzdłuż doliny
  return Array.from({ length: n }, (_, i) => {
    const x = ((i + 0.5) / n) * RIDGE_W;
    return [x, yAt(x)] as const;
  });
}

const pathD = (() => {
  const [x0, y0] = VALLEY[0];
  // start i koniec w sylwetkach czarnych drzew (lewe i prawe) — trasa „wyłania się" z lasu i „wchodzi za las"
  return [`M ${x0} ${y0}`, ...VALLEY.slice(1).map(([x, y]) => `L ${x} ${y}`)].join(" ");
})();

/**
 * „Linia trasy po dolinie": zdjęcie szczytów (grafika, nie treść — alt="", aria-hidden) + kropkowana ścieżka SVG
 * po pagórkach pod górami + markery HTML na tej ścieżce (decyzja 2026-09-11 po testach z użytkownikami: linia po
 * szczytach sugerowała jazdę po graniach). Obraz, SVG (viewBox = wymiary obrazu, preserveAspectRatio none) i markery (%)
 * dzielą jedno pudełko o proporcji obrazu, więc wszystko leży dokładnie na sobie przy każdej szerokości.
 * Etykieta NAD kropką: nad linią jest podstawa gór (śnieg i jasne zbocza), dlatego chip ma własne tło `bg-background/85`.
 * Wyjątek: przy 4 markerach chip ostatniego (Maverick) siedzi POD kropką — sąsiednie przystanki są za blisko na dwa
 * chipy w jednym rzędzie (`labelBelow`); pod kropką jest ciemny las, chip czyta się tak samo.
 * Jeden DOM dla obu breakpointów: chip z numerem (`md:hidden`) i chip z ceną + nazwą (`hidden md:flex`).
 * Marker z `href` to <a> z niewidocznym obszarem dotyku ≥ 44 px. Zero animacji — to tło, nie efekt.
 */
export function RidgeRoute({ markers, className }: Props) {
  const stops = pickStops(markers.length);
  return (
    <div className={cn("relative w-full", className)} style={{ aspectRatio: `${RIDGE_W} / ${RIDGE_H}` }}>
      <Image
        src={productsRidge}
        alt=""
        aria-hidden
        unoptimized
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        fill
        sizes="(min-width: 1280px) 1200px, 100vw"
        /* -z-10: obraz i linia schodzą pod nagłówek sekcji (sekcja ma `isolate`); markery zostają nad nimi i są klikalne */
        className="pointer-events-none -z-10 object-cover select-none"
        style={IMAGE_STYLE}
      />
      <svg
        aria-hidden
        viewBox={`0 0 ${RIDGE_W} ${RIDGE_H}`}
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        focusable="false"
      >
        <path
          d={pathD}
          fill="none"
          stroke="var(--color-brand)"
          strokeWidth="2"
          strokeDasharray="1 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {stops.map(([x, y], i) => {
        const m = markers[i];
        const Tag = m.href ? "a" : "div";
        // 4 markery: ciemny pagórek (936) i zaokrąglone wzgórze (1100) dzieli ~10,7 % szerokości — dwa chipy z ceną
        // i nazwą nad kropkami nachodziłyby na siebie od md do ~1200 px, więc ostatni chip idzie POD kropkę
        const labelBelow = stops.length === 4 && i === 3;
        return (
          <Tag
            key={m.id}
            href={m.href}
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center",
              // obszar dotyku ≥ 44 px wokół kropki + fokus widoczny z klawiatury
              m.href &&
                "group rounded-full outline-none before:absolute before:-inset-4 before:content-[''] focus-visible:ring-2 focus-visible:ring-ring",
            )}
            style={{ left: `${(x / RIDGE_W) * 100}%`, top: `${(y / RIDGE_H) * 100}%` }}
          >
            <span
              className={cn(
                "block size-3.5 rounded-full border-2 border-brand bg-background transition-colors group-hover:bg-brand",
                m.active && "bg-brand shadow-[0_0_0_6px_var(--color-brand-tint)]",
              )}
            />
            {/* chip jak numer na karcie: etykieta musi być czytelna także tam, gdzie pod nią jest śnieg, nie niebo */}
            {m.number ? (
              <span className="absolute bottom-5 rounded-chip bg-background/85 px-1.5 py-1 font-display text-sm font-semibold tabular leading-none whitespace-nowrap text-brand backdrop-blur md:hidden">
                {m.number}
              </span>
            ) : null}
            <span
              className={cn(
                "absolute flex-col items-center whitespace-nowrap rounded-chip bg-background/85 px-2.5 py-1.5 text-center backdrop-blur",
                labelBelow ? "top-5" : "bottom-5",
                m.number ? "hidden md:flex" : "flex",
              )}
            >
              <span className="font-display text-lg font-semibold tabular leading-none text-foreground">{m.label}</span>
              {m.caption ? (
                <span className="mt-1 font-display text-eyebrow font-medium uppercase text-muted-foreground">{m.caption}</span>
              ) : null}
            </span>
          </Tag>
        );
      })}
    </div>
  );
}
