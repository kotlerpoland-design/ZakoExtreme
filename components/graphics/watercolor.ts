/**
 * Erozja akwarelowa krawędzi zdjęcia (brief 2026-09-09, runda 6): PHOTO → EDGE EROSION → TRANSPARENT → biały papier strony,
 * a resztki pigmentu przechodzą jeszcze nad rysunek góry. Nie rysujemy żadnego kształtu — manipulujemy alphą samego zdjęcia,
 * w rozdzielonych warstwach o RÓŻNYCH skalach (jedna skala = „stempel", którego nie chcemy):
 *  1. KIERUNEK — gradient CSS (`.wash-base` w globals.css, %, responsywny): prawo/góra 100 %, lewo (desktop) / dół (mobile) → 0,
 *     z długim ogonem niskiej alphy, który sięga nad rysunek góry.
 *  2. LOBY + FALOWANIE — jeden szum 3-oktawowy o bardzo niskiej częstotliwości bazowej (oktawy: ~300 px wybrzuszenia i głębokie
 *     wcięcia, ~150 px i ~80 px falowanie) przesuwa rampę alphy głównie wzdłuż osi zanikania (`axis`), w poprzek słabiej
 *     (`crossFactor`). Mapa bramkowana pasmem przejścia — rdzeń i proste krawędzie (góra pod headerem, prawo) nie falują.
 *     Przesunięcie działa na SAMEJ alphie, zdjęcie nie jest resamplowane.
 *  3. WYPŁUKANIA — szum 15–60 px ze stromym progiem mnożony w alphę z wagą zależną od alphy (`BAND_WASH`): w ogonie (alpha
 *     ≤ ~0,5) prawie pełne cięcie → oderwane, półprzezroczyste fragmenty zamiast ciągłego welonu; głębiej (do ~0,97) połowiczne
 *     → kieszenie WEWNĄTRZ strefy, nie tylko na konturze; rdzeń nietknięty.
 *  4. MIKROSTRUKTURA — szum wysokiej częstotliwości, lekko rozmyty i sprogowany (ziarno „wilgotnego" pigmentu), o sile
 *     modulowanej szumem lobów: faktura pojawia się plamami, nie równomiernie (koniec z „halftone").
 *  5. KRZYWA — feComponentTransfer z łagodną, nierówną tabelą alphy: dużo wartości pośrednich, zero binarnego progu.
 * Ghost (druga, odbarwiona kopia zdjęcia pod spodem, opacity 0,25) ma własny łańcuch: te same loby (ten sam seed, więc resztki
 * pigmentu leżą tam, gdzie wash wystaje najdalej) + WYSPY (oderwane fragmenty zdjęcia) + ZACIEKI (długie smugi wzdłuż kierunku
 * wypłukiwania) + słabe mokre mikro. To ghost realnie przechodzi nad rysunek góry — przy alpha ≤ ~0,3 kreska zostaje widoczna.
 * Filtr działa na elemencie HTML (`filter: url(#id)`), więc przestrzeń użytkownika = piksele CSS: częstotliwości, skala
 * przesunięcia i blur są w px niezależnie od viewportu. Osobne parametry dla mobile (rampa pionowa, kontener 390×269).
 * Budżet: Chrome przestaje rysować element, gdy łańcuch ma za dużo prymitywów na ekranie 2× (zmierzone na hero 1037×823 px:
 * 24 prymitywy przy regionie 1,1×1,1 renderują się, 29 już nie). Dlatego: tabele progów siedzą bezpośrednio na surowym szumie
 * (fractalNoise skupia wartości ~0,3–0,7, tabele są pod to skalibrowane), jeden szum obsługuje kilka warstw, region 1,1×1,1.
 * Każda nowa warstwa = najpierw policzyć prymitywy (WatercolorDefs.tsx) i sprawdzić zrzut przy deviceScaleFactor 2.
 * Seed stały, nic nie jest animowane. Ids deterministyczne z seedu: jeden Hero na stronę, seed per wariant (Hero.tsx).
 */
export type WashKind = "edge" | "ghost";
export type WashBreakpoint = "mobile" | "desktop";

/** oś zanikania: desktop w lewo (przesunięcie głównie w x), mobile w dół (głównie w y) */
export type WashAxis = "x" | "y";

/** kształt wspólny dla obu kopii (loby + falowanie) */
type ShapeParams = {
  axis: WashAxis;
  /** szum kształtu: częstotliwość bazowa (px⁻¹) i liczba oktaw (każda kolejna = skala ×½, amplituda ×½) */
  lobeFrequency: string;
  lobeOctaves: number;
  /** skala przesunięcia (px); po rozciągnięciu kontrastu realne do ±½·skala wzdłuż osi, w poprzek ×crossFactor */
  displaceScale: number;
  crossFactor: number;
  /** końcowa krzywa alphy (9 punktów 0 → 1) */
  alphaTable: string;
  /** końcowy blur px (0,3–2, nigdy więcej — mikrokrawędzie mają zostać lokalnie ostre) */
  blur: number;
};

export type EdgeFilterParams = ShapeParams & {
  /** wypłukania: częstotliwość (px⁻¹, 2 oktawy) i stroma tabela na surowym szumie (9 punktów); wagi per alpha w `BAND_WASH` */
  washFrequency: string;
  washTable: string;
  /** mikro: częstotliwość (px⁻¹), oktawy, blur px przed progiem (0,4–0,8 = wilgotne ziarno), tabela progu (9 punktów) */
  microFrequency: string;
  microOctaves: number;
  microBlur: number;
  microTable: string;
  /** siła mikro z szumu lobów (tabela na surowym szumie 3-oktawowym, 9 punktów): faktura tam, gdzie wash jest gęstszy */
  microStrengthTable: string;
};

export type GhostFilterParams = ShapeParams & {
  /** wyspy: częstotliwość (px⁻¹, 2 oktawy) i stroma tabela (9 punktów) */
  islandFrequency: string;
  islandTable: string;
  /** zacieki: silnie anizotropowy szum 1-oktawowy, tabela (9 punktów), waga względem wysp 0–1 */
  streakFrequency: string;
  streakTable: string;
  streakWeight: number;
  /** mokre mikro: częstotliwość, oktawy, blur, tabela */
  microFrequency: string;
  microOctaves: number;
  wetBlur: number;
  wetTable: string;
};

/** pasmo przejścia z alphy bazowej (11 punktów): 0 poniżej ~0,03, pełne ~0,2–0,6, 0 powyżej ~0,95 (rdzeń nietknięty) */
export const BAND_TABLE = "0 .5 .9 1 1 1 1 .9 .6 .25 0";
/** waga wypłukań per alpha (11 punktów): ogon ≤ ~0,5 → 0,85 (fragmenty), 0,5–0,97 → ~0,5 (kieszenie), rdzeń → 0 */
export const BAND_WASH = "0 .85 .85 .8 .7 .55 .5 .5 .45 .2 0";

export const EDGE_PARAMS: Record<WashBreakpoint, EdgeFilterParams> = {
  desktop: {
    axis: "x",
    lobeFrequency: "0.0028 0.0042",
    lobeOctaves: 3,
    /* ±60 px: mniej niż szerokość rampy 0,3→0,9 (~175 px), inaczej rampa się zagina i powstaje prosta smuga */
    displaceScale: 120,
    /* mała składowa pionowa: większa wygryza prostą górną krawędź zdjęcia pod headerem w strefie ogona */
    crossFactor: 0.25,
    washFrequency: "0.02 0.03",
    washTable: "0 0 0 0 .15 1 1 1 1",
    /* lekka anizotropia: ziarno nieco wydłużone poziomo, wzdłuż kierunku wypłukiwania */
    microFrequency: "0.035 0.055",
    microOctaves: 3,
    microBlur: 0.5,
    microTable: "0 0 0 .05 .45 .95 1 1 1",
    microStrengthTable: "0 0 0 .2 .55 .85 1 1 1",
    alphaTable: "0 0 .02 .08 .24 .5 .78 .93 1",
    blur: 0.3,
  },
  mobile: {
    axis: "y",
    lobeFrequency: "0.0065 0.0045",
    lobeOctaves: 3,
    /* ±28 px przy rampie 0,4→0,9 (~48 px); zdjęcie zajmuje pełną szerokość, więc ZERO składowej poprzecznej —
       przesunięcie w x wyciągałoby przezroczystość zza lewej/prawej krawędzi kontenera */
    displaceScale: 56,
    crossFactor: 0,
    washFrequency: "0.03 0.02",
    washTable: "0 0 0 0 .15 1 1 1 1",
    /* mobile wypłukuje w dół: ziarno pionowe */
    microFrequency: "0.06 0.04",
    microOctaves: 3,
    microBlur: 0.45,
    microTable: "0 0 0 .05 .45 .95 1 1 1",
    microStrengthTable: "0 0 0 .2 .55 .85 1 1 1",
    alphaTable: "0 0 .02 .08 .24 .5 .78 .93 1",
    blur: 0.3,
  },
};

/* resztki pigmentu: loby jak w edge (kształty się pokrywają), wyspy + zacieki, mokre mikro, spłaszczona krzywa */
export const GHOST_PARAMS: Record<WashBreakpoint, GhostFilterParams> = {
  desktop: {
    axis: "x",
    lobeFrequency: EDGE_PARAMS.desktop.lobeFrequency,
    lobeOctaves: EDGE_PARAMS.desktop.lobeOctaves,
    displaceScale: EDGE_PARAMS.desktop.displaceScale,
    crossFactor: EDGE_PARAMS.desktop.crossFactor,
    islandFrequency: "0.012 0.018",
    islandTable: "0 0 0 0 .1 1 1 1 1",
    /* cienkie poziome smugi w kierunku wypłukiwania (w lewo) */
    streakFrequency: "0.004 0.09",
    streakTable: "0 0 0 0 .1 1 1 1 1",
    streakWeight: 0.3,
    microFrequency: "0.03 0.045",
    microOctaves: 2,
    wetBlur: 1,
    wetTable: "0 0 0 .2 .6 .95 1 1 1",
    alphaTable: "0 0 .04 .1 .2 .34 .5 .72 1",
    blur: 0.4,
  },
  mobile: {
    axis: "y",
    lobeFrequency: EDGE_PARAMS.mobile.lobeFrequency,
    lobeOctaves: EDGE_PARAMS.mobile.lobeOctaves,
    displaceScale: EDGE_PARAMS.mobile.displaceScale,
    crossFactor: EDGE_PARAMS.mobile.crossFactor,
    islandFrequency: "0.018 0.012",
    islandTable: "0 0 0 0 .1 1 1 1 1",
    /* cienkie pionowe zacieki w dół */
    streakFrequency: "0.09 0.004",
    streakTable: "0 0 0 0 .1 1 1 1 1",
    streakWeight: 0.3,
    microFrequency: "0.045 0.03",
    microOctaves: 2,
    wetBlur: 0.8,
    wetTable: "0 0 0 .2 .6 .95 1 1 1",
    alphaTable: "0 0 .04 .1 .2 .34 .5 .72 1",
    blur: 0.35,
  },
};

export function washFilterId(seed: number, kind: WashKind, breakpoint: WashBreakpoint): string {
  return `wc-${kind}-${breakpoint}-${seed}`;
}
