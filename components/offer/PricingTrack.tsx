"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Tor karuzeli wariantów cenowych na mobile (decyzja właścicielki 2026-09-10 — czwarty wyjątek od „zero karuzel").
 * Robi jedną rzecz, której nie da się zrobić CSS-em: po zamontowaniu ustawia pozycję startową na wariancie
 * wyróżnionym (PREMIUM leży w środku drabinki), zamiast na pierwszej karcie. Bez autoplay, bez nasłuchów,
 * bez rAF — jeden `scrollLeft` i koniec; dalej scroll jest w pełni natywny.
 *
 * Karty mają `snap-center`, więc pozycja wyśrodkowana JEST punktem snapu i się utrzymuje. Przy `snap-start`
 * `snap-mandatory` dosunąłby widok do lewej krawędzi zaraz po naszym ustawieniu.
 *
 * Geometrię liczymy z `getBoundingClientRect` (nie `offsetLeft`) — działa niezależnie od tego, czy tor jest
 * pozycjonowany. Świadomie NIE używamy `scrollIntoView`: nawet z `block: "nearest"` przewinęłoby stronę
 * w pionie do sekcji, która przy wejściu leży pod pierwszym ekranem.
 */
export function PricingTrack({
  startIndex,
  className,
  children,
}: {
  /** indeks karty, na której karuzela ma się otworzyć; ≤ 0 = zostawiamy pozycję zerową */
  startIndex: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track || startIndex <= 0) return;
    // wejście z kotwicy (#wariant-… z markera na grzbiecie) ma pierwszeństwo — nie nadpisujemy celu użytkownika
    if (window.location.hash) return;
    // desktop: tor jest siatką, nie ma czego przewijać
    if (track.scrollWidth <= track.clientWidth + 1) return;

    const card = track.children[startIndex];
    if (!(card instanceof HTMLElement)) return;

    const cardRect = card.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const prev = track.style.scrollBehavior;
    // scroll-smooth na torze nie ma animować pozycji startowej
    track.style.scrollBehavior = "auto";
    track.scrollLeft += cardRect.left - trackRect.left - (track.clientWidth - cardRect.width) / 2;
    track.style.scrollBehavior = prev;
  }, [startIndex]);

  return (
    <ol ref={ref} className={className} data-pricing-track>
      {children}
    </ol>
  );
}
