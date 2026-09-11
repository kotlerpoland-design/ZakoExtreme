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
 * Skyline grzbietu z pliku źródłowego (ChatGPT Image 10 wrz 2026, 12_30_05.png), co 16 px w osi x.
 * Wykryty progiem jasności 62 % (magick -threshold, „2 jasne piksele w pionie" odfiltrowują cienkie linie siatki w niebie);
 * kolumny x < 48 i x > 1503 nie mają jasnych pikseli (rycina gaśnie przy krawędziach), więc linia zaczyna się od x = 48.
 * Wierzchołek główny (690) i prawy (1230) wstawione poza siatką — na siatce 16 px są ścięte; zapadnięcia w cieniach
 * (80, 128, 224, 256, 688, 1168) i ciemny żleb między lewą granią a masywem (464, 480) wygładzone interpolacją
 * z sąsiadów po nałożeniu linii na obraz (components/README.md „Grafiki").
 * Kropki markerów leżą na tej samej ścieżce, więc siedzą na szczytach przy każdej szerokości.
 */
const SKYLINE: readonly (readonly [number, number])[] = [
  [48, 498], [64, 442], [80, 456], [96, 469], [112, 439], [128, 431], [144, 423], [160, 428], [176, 434], [192, 438],
  [208, 435], [224, 416], [240, 398], [256, 390], [272, 383], [288, 391], [304, 403], [320, 409], [336, 420], [352, 409],
  [368, 399], [384, 399], [400, 400], [416, 404], [432, 416], [448, 406], [464, 416], [480, 425], [496, 435], [512, 353],
  [528, 357], [544, 332], [560, 335], [576, 326], [592, 321], [608, 319], [624, 287], [640, 282], [656, 284], [672, 261],
  [688, 232], [690, 229], [704, 236], [720, 245], [736, 257], [752, 270], [768, 275], [784, 288], [800, 304], [816, 314],
  [832, 329], [848, 323], [864, 338], [880, 347], [896, 365], [912, 378], [928, 386], [944, 390], [960, 406], [976, 420],
  [992, 430], [1008, 442], [1024, 453], [1040, 454], [1056, 457], [1072, 457], [1088, 452], [1104, 447], [1120, 453], [1136, 455],
  [1152, 444], [1168, 424], [1184, 405], [1200, 415], [1216, 386], [1230, 365], [1232, 390], [1248, 377], [1264, 388], [1280, 392],
  [1296, 431], [1312, 425], [1328, 427], [1344, 400], [1360, 420], [1376, 422], [1392, 425], [1408, 422], [1424, 454], [1440, 466],
  [1456, 461], [1472, 475], [1488, 482],
];

/**
 * Szczyty pod markery, od lewej: lewy grzbiet · główny szczyt · prawy grzbiet · daleki prawy (przed drzewami).
 * Ostatni siedzi niżej, niż wynikałoby z samej grani (1408, 422 to wyższy punkt): przy ~768 px chip „od 750 zł"
 * wchodziłby na chip sąsiada — te dwa markery dzieli w poziomie tylko ~12 % szerokości.
 */
const PEAKS: readonly (readonly [number, number])[] = [
  [272, 383],
  [690, 229],
  [1230, 365],
  [1424, 454],
];

/** Wtopienie: las u dołu przechodzi w tło strony, boki gasną, żeby nie było widać prostokąta na szerokim kontenerze. */
const MASK =
  "linear-gradient(to bottom, #000 0%, #000 58%, transparent 100%), linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)";
const IMAGE_STYLE: CSSProperties = {
  maskImage: MASK,
  WebkitMaskImage: MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
};

function pickPeaks(n: number): readonly (readonly [number, number])[] {
  if (n <= PEAKS.length) return PEAKS.slice(0, n);
  // więcej ofert niż szczytów (dziś nie zachodzi): równo po skyline
  return Array.from({ length: n }, (_, i) => SKYLINE[Math.round(((i + 0.5) / n) * (SKYLINE.length - 1))]);
}

const pathD = (() => {
  const [x0, y0] = SKYLINE[0];
  const [, yN] = SKYLINE[SKYLINE.length - 1];
  // start poza lewą i koniec poza prawą krawędzią — trasa „przychodzi" i „idzie dalej"
  return [`M -40 ${y0 + 12}`, `L ${x0} ${y0}`, ...SKYLINE.slice(1).map(([x, y]) => `L ${x} ${y}`), `L 1580 ${yN - 8}`].join(" ");
})();

/**
 * „Linia trasy po grzbiecie": zdjęcie szczytów (grafika, nie treść — alt="", aria-hidden) + kropkowana ścieżka SVG
 * po skyline + markery HTML na szczytach. Obraz, SVG (viewBox = wymiary obrazu, preserveAspectRatio none) i markery (%)
 * dzielą jedno pudełko o proporcji obrazu, więc wszystko leży dokładnie na sobie przy każdej szerokości.
 * Etykieta NAD kropką: nad szczytem jest ciemne niebo, pod nim biały śnieg, na którym biały tekst ginie.
 * Jeden DOM dla obu breakpointów: chip z numerem (`md:hidden`) i chip z ceną + nazwą (`hidden md:flex`).
 * Marker z `href` to <a> z niewidocznym obszarem dotyku ≥ 44 px. Zero animacji — to tło, nie efekt.
 */
export function RidgeRoute({ markers, className }: Props) {
  const peaks = pickPeaks(markers.length);
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
      {peaks.map(([x, y], i) => {
        const m = markers[i];
        const Tag = m.href ? "a" : "div";
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
                "absolute bottom-5 flex-col items-center whitespace-nowrap rounded-chip bg-background/85 px-2.5 py-1.5 text-center backdrop-blur",
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
