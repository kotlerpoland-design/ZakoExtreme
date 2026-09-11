"use client";

import { useEffect } from "react";

const SAFETY_MS = 4000;

/**
 * Jeden obserwator dla wszystkich `[data-reveal]` (~0,5 kB zamiast biblioteki animacji). Siedzi w layoucie, a layout NIE
 * remontuje się przy nawigacji klienckiej (`next/link`) — dlatego oprócz IntersectionObservera działa MutationObserver,
 * który podpina każdy nowo dodany węzeł `[data-reveal]` (nowa strona, streaming, 404 → strona). Jednorazowe zebranie
 * przy montażu zostawiało po nawigacji wszystkie sekcje na `opacity: 0`.
 * Bezpiecznik: po 4 s od pojawienia się partii odsłania z niej wszystko, co jeszcze ukryte — ukryta treść to najgorszy błąd.
 */
export function RevealObserver() {
  useEffect(() => {
    const show = (el: HTMLElement) => el.setAttribute("data-revealed", "");
    const seen = new WeakSet<HTMLElement>();
    const timers = new Set<number>();
    let raf = 0;

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  show(entry.target as HTMLElement);
                  io?.unobserve(entry.target);
                }
              }
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
          )
        : null;

    const attach = () => {
      const batch = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])")).filter((el) => !seen.has(el));
      if (batch.length === 0) return;
      batch.forEach((el) => seen.add(el));
      if (!io) {
        batch.forEach(show);
        return;
      }
      batch.forEach((el) => io.observe(el));
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        batch.forEach((el) => {
          if (!el.hasAttribute("data-revealed")) show(el);
          io.unobserve(el);
        });
      }, SAFETY_MS);
      timers.add(timer);
    };

    attach();

    /* jedna nawigacja = wiele mutacji; zbieramy je w jedno przejście po DOM w następnej klatce */
    const mo = new MutationObserver((records) => {
      if (raf || !records.some((r) => r.addedNodes.length > 0)) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        attach();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io?.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);
  return null;
}
