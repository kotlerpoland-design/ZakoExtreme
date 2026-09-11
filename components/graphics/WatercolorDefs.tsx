import { BAND_TABLE, BAND_WASH, EDGE_PARAMS, GHOST_PARAMS, washFilterId, type EdgeFilterParams, type GhostFilterParams, type WashBreakpoint } from "./watercolor";

/* macierz: alpha → R,G,B (obraz szary = alpha bazowa), alpha = 1 */
const ALPHA_TO_GRAY = "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1";

/** R rozciągnięty ×2,4 wokół 0,5 (oś główna), G rozciągnięty ×2,4·cross wokół 0,5 (oś poprzeczna), alpha = 1 */
function stretchVector(cross: number): string {
  return `2.4 0 0 0 -.7  0 ${2.4 * cross} 0 0 ${0.5 - 1.2 * cross}  0 0 0 0 0  0 0 0 0 1`;
}

/** tabela na trzech kanałach (szare obrazy pomocnicze) */
function GrayTable({ in: input, result, values }: { in: string; result: string; values: string }) {
  return (
    <feComponentTransfer in={input} result={result}>
      <feFuncR type="table" tableValues={values} />
      <feFuncG type="table" tableValues={values} />
      <feFuncB type="table" tableValues={values} />
    </feComponentTransfer>
  );
}

type ShapeProps = Pick<EdgeFilterParams, "axis" | "lobeFrequency" | "lobeOctaves" | "displaceScale" | "crossFactor">;

/**
 * Kształt (warstwa 2): rampa alphy zdjęcia przesunięta mapą z jednego szumu 3-oktawowego (loby + falowanie w jednym).
 * Mapa = 0,5 + band·(szum − 0,5), więc rdzeń (band 0) i proste krawędzie nie falują. Przesunięcie działa na SAMEJ alphie
 * (SourceAlpha), zdjęcie nie jest resamplowane. Wyjścia: `gray`, `band` (z rampy bazowej), `dispA` (ukształtowana alpha).
 */
function ShapeNodes({ seed, p }: { seed: number; p: ShapeProps }) {
  const [xSel, ySel]: ["R" | "G", "R" | "G"] = p.axis === "x" ? ["R", "G"] : ["G", "R"];
  return (
    <>
      <feColorMatrix in="SourceAlpha" type="matrix" values={ALPHA_TO_GRAY} result="gray" />
      <GrayTable in="gray" result="band" values={BAND_TABLE} />
      <feTurbulence type="fractalNoise" baseFrequency={p.lobeFrequency} numOctaves={p.lobeOctaves} seed={seed} result="nL" />
      <feColorMatrix in="nL" type="matrix" values={stretchVector(p.crossFactor)} result="nvec" />
      <feComposite in="band" in2="nvec" operator="arithmetic" k1="1" k2="-.5" k3="0" k4=".5" result="dmap" />
      <feDisplacementMap in="SourceAlpha" in2="dmap" scale={p.displaceScale} xChannelSelector={xSel} yChannelSelector={ySel} result="dispA" />
    </>
  );
}

/** Koniec łańcucha: krzywa alphy → minimalny blur → zdjęcie (kolory 1:1, alpha wymuszona na 1) `in` maska. */
function OutputNodes({ in: input, alphaTable, blur }: { in: string; alphaTable: string; blur: number }) {
  return (
    <>
      <feComponentTransfer in={input} result="shapedA">
        <feFuncA type="table" tableValues={alphaTable} />
      </feComponentTransfer>
      <feGaussianBlur in="shapedA" stdDeviation={blur} result="maskA" />
      <feComponentTransfer in="SourceGraphic" result="opaque">
        <feFuncA type="table" tableValues="1 1" />
      </feComponentTransfer>
      <feComposite in="opaque" in2="maskA" operator="in" />
    </>
  );
}

/* margines regionu: rampa dochodzi do 0 przy krawędzi kontenera, więc przesunięcie nie ma czego wyciągać poza region —
   margines tylko na blur i zacieki ghosta. Mały region = mniej pamięci filtra (patrz watercolor.ts „Budżet"). */
const REGION = { x: "-0.05", y: "-0.05", width: "1.1", height: "1.1" } as const;

/**
 * Filtr krawędzi (opis warstw w watercolor.ts), 22 prymitywy — patrz „Budżet" w watercolor.ts przed dodaniem czegokolwiek.
 * Wejście: SourceGraphic = zdjęcie z gradientem kierunkowym (`.wash-base`).
 *  dispA  = rampa ukształtowana lobami i falowaniem (ShapeNodes)
 *  q      = 1 − wband·(1 − wash)         → wband = waga z alphy bazowej (BAND_WASH): ogon rozbity na fragmenty, głębiej kieszenie
 *  bs     = band·siła(nL)                → mikro tylko plamami (siła z szumu lobów, bez osobnego szumu)
 *  m      = 1 − bs·(1 − mikro)           → poza pasmem 1, w pasmie ziarno
 *  maskA  = dispA · (m·q)  →  krzywa alphy  →  minimalny blur
 * Wymuszenie alpha = 1 na zdjęciu daje czerń tam, gdzie alpha bazowa = 0, ale tam dispA = 0 i wynik jest przezroczysty.
 * Każdy `feComposite arithmetic` ma k1+k2+k3+k4 ≥ 1 (dla wejść z alpha 1), inaczej alpha pomocnicza spada poniżej 1
 * i premultiplikacja obcina kanały. Tabele progów działają na surowym szumie (bez osobnego rozciągania — mniej prymitywów).
 */
function EdgeFilter({ id, seed, p }: { id: string; seed: number; p: EdgeFilterParams }) {
  return (
    <filter id={id} {...REGION} colorInterpolationFilters="sRGB">
      <ShapeNodes seed={seed} p={p} />

      <GrayTable in="gray" result="wband" values={BAND_WASH} />
      <feTurbulence type="fractalNoise" baseFrequency={p.washFrequency} numOctaves={2} seed={seed + 2} result="nW" />
      <GrayTable in="nW" result="wash" values={p.washTable} />
      <feComposite in="wband" in2="wash" operator="arithmetic" k1="1" k2="-1" k3="0" k4="1" result="q" />

      <GrayTable in="nL" result="strength" values={p.microStrengthTable} />
      <feComposite in="band" in2="strength" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="bs" />
      <feTurbulence type="fractalNoise" baseFrequency={p.microFrequency} numOctaves={p.microOctaves} seed={seed + 4} result="n2" />
      <feGaussianBlur in="n2" stdDeviation={p.microBlur} result="n2blur" />
      <GrayTable in="n2blur" result="micro" values={p.microTable} />
      <feComposite in="bs" in2="micro" operator="arithmetic" k1="1" k2="-1" k3="0" k4="1" result="m" />

      <feComposite in="m" in2="q" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="mq" />
      <feColorMatrix in="mq" type="luminanceToAlpha" result="mqA" />
      <feComposite in="dispA" in2="mqA" operator="in" result="eroded" />
      <OutputNodes in="eroded" alphaTable={p.alphaTable} blur={p.blur} />
    </filter>
  );
}

/**
 * Filtr resztek pigmentu (kopia odbarwiona pod spodem): te same loby co edge (ten sam seed → kształty się pokrywają),
 *  frag   = wyspy + streakWeight·zacieki (suma obcięta do 1)   → oderwane fragmenty i smugi zamiast ciągłej mgiełki
 *  m      = 1 − band·(1 − mokre mikro)
 *  maskA  = dispA · (frag·m)  →  spłaszczona krzywa  →  blur
 * Dziury frag w „rdzeniu" ghosta są schowane pod ostrą kopią, a prześwitują przez jej kieszenie — to daje wypłukane kieszenie.
 */
function GhostFilter({ id, seed, p }: { id: string; seed: number; p: GhostFilterParams }) {
  return (
    <filter id={id} {...REGION} colorInterpolationFilters="sRGB">
      <ShapeNodes seed={seed} p={p} />

      <feTurbulence type="fractalNoise" baseFrequency={p.islandFrequency} numOctaves={2} seed={seed + 5} result="nI" />
      <GrayTable in="nI" result="islands" values={p.islandTable} />
      <feTurbulence type="fractalNoise" baseFrequency={p.streakFrequency} numOctaves={1} seed={seed + 6} result="nSt" />
      <GrayTable in="nSt" result="streaks" values={p.streakTable} />
      <feComposite in="islands" in2="streaks" operator="arithmetic" k1="0" k2="1" k3={p.streakWeight} k4="0" result="frag" />

      <feTurbulence type="fractalNoise" baseFrequency={p.microFrequency} numOctaves={p.microOctaves} seed={seed + 4} result="n2" />
      <feGaussianBlur in="n2" stdDeviation={p.wetBlur} result="n2blur" />
      <GrayTable in="n2blur" result="wet" values={p.wetTable} />
      <feComposite in="band" in2="wet" operator="arithmetic" k1="1" k2="-1" k3="0" k4="1" result="m" />

      <feComposite in="frag" in2="m" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="fm" />
      <feColorMatrix in="fm" type="luminanceToAlpha" result="fmA" />
      <feComposite in="dispA" in2="fmA" operator="in" result="eroded" />
      <OutputNodes in="eroded" alphaTable={p.alphaTable} blur={p.blur} />
    </filter>
  );
}

const BREAKPOINTS: WashBreakpoint[] = ["mobile", "desktop"];

/**
 * Definicje filtrów erozji dla jednego zdjęcia (4 filtry: krawędź/ghost × mobile/desktop). Renderować RAZ na seed — slajdy
 * rotacji hero dzielą seed, więc dzieliłyby też id. `WashImage` wskazuje je przez `filter: url(#id)` (globals.css `.wash-edge`).
 * `breakpoints`: zdjęcie widoczne tylko na lg+ (FAQ strony głównej) podaje `["desktop"]` — dwa filtry mniej w HTML (~0,6 kB gz,
 * budżet ekranu 1).
 */
export function WatercolorDefs({ seed, breakpoints = BREAKPOINTS }: { seed: number; breakpoints?: readonly WashBreakpoint[] }) {
  return (
    <svg aria-hidden focusable="false" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        {breakpoints.map((bp) => (
          <EdgeFilter key={`edge-${bp}`} id={washFilterId(seed, "edge", bp)} seed={seed} p={EDGE_PARAMS[bp]} />
        ))}
        {breakpoints.map((bp) => (
          <GhostFilter key={`ghost-${bp}`} id={washFilterId(seed, "ghost", bp)} seed={seed} p={GHOST_PARAMS[bp]} />
        ))}
      </defs>
    </svg>
  );
}
