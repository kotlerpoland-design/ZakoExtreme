"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SPEED_PX_PER_S = 24;
const START_DELAY_MS = 2000;
const RESUME_DELAY_MS = 2500;
/** Różnica między pozycją, którą ustawiliśmy, a odczytaną = użytkownik przesunął pasek (subpiksele zaokrąglamy). */
const USER_SCROLL_THRESHOLD_PX = 2;

/**
 * Pasek zaufania na mobile: wolne, nieskończone przewijanie w pętli (decyzja właścicielki 2026-09-10 — drugi obok HeroSlides
 * wyjątek od „zero karuzel"). Treść jest zrenderowana dwa razy (drugi zestaw `[data-clone]`, aria-hidden); gdy scroll dojdzie
 * do początku klonu, cofamy o szerokość jednego zestawu — oba są identyczne, więc oko nie widzi skoku. Działa w obie strony,
 * także gdy użytkownik sam przeciągnie pasek do początku lub końca.
 *
 * Ręczny scroll zostaje natywny: dotyk/przeciągnięcie pauzuje ruch, wznowienie po ~2,5 s bezczynności. Pauza także przy
 * fokusie, karcie w tle, pasku poza ekranem i na desktopie (≥ md — tam wszystko mieści się w jednej linii, klony ukryte).
 * `prefers-reduced-motion: reduce` = brak ruchu. Teksty przychodzą z serwera (zero next-intl w kliencie).
 */
export function TrustMarquee({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const desktop = window.matchMedia("(min-width: 48rem)");
    const paused = { desktop: desktop.matches, hidden: document.hidden, offscreen: false, focus: false, touching: false };
    let raf = 0;
    let last = 0;
    let pos = 0;
    let expected = el.scrollLeft;
    let setWidth = 0;
    let userScrolled = false;
    let idleUntil = performance.now() + START_DELAY_MS;
    let resumeTimer = 0;

    // szerokość jednego zestawu = odległość między pierwszą pozycją a jej klonem (uwzględnia padding i gap)
    const measure = () => {
      const first = el.querySelector<HTMLElement>("li:not([data-clone])");
      const clone = el.querySelector<HTMLElement>("li[data-clone]");
      setWidth = first && clone && clone.offsetParent ? clone.offsetLeft - first.offsetLeft : 0;
    };

    const canRun = () => setWidth > 0 && !paused.desktop && !paused.hidden && !paused.offscreen && !paused.focus && !paused.touching && performance.now() >= idleUntil;

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const tick = (ts: number) => {
      if (!canRun()) {
        raf = 0;
        return;
      }
      if (last) {
        pos += ((ts - last) / 1000) * SPEED_PX_PER_S;
        if (pos >= setWidth) pos -= setWidth;
        el.scrollLeft = pos;
        expected = el.scrollLeft;
      }
      last = ts;
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf || !canRun()) return;
      pos = el.scrollLeft;
      expected = pos;
      raf = requestAnimationFrame(tick);
    };

    // setTimeout obcina ułamki ms i potrafi odpalić tuż PRZED progiem — wtedy planujemy jeszcze raz zamiast gubić start
    const schedule = () => {
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(
        () => {
          if (performance.now() < idleUntil) schedule();
          else start();
        },
        Math.ceil(Math.max(0, idleUntil - performance.now())) + 1,
      );
    };

    const pauseForInteraction = () => {
      idleUntil = performance.now() + RESUME_DELAY_MS;
      stop();
      schedule();
    };

    const onScroll = () => {
      if (Math.abs(el.scrollLeft - expected) > USER_SCROLL_THRESHOLD_PX) {
        userScrolled = true;
        pauseForInteraction();
      }
      // pętla w obie strony — tylko gdy palec nie trzyma paska (wtedy scroll należy do przeglądarki).
      // Pozycja `setWidth` = to samo co 0, więc w przód zawijamy dopiero powyżej niej, a w tył ustawiamy dokładnie ją.
      if (setWidth > 0 && !paused.touching) {
        if (el.scrollLeft > setWidth) el.scrollLeft -= setWidth;
        else if (userScrolled && el.scrollLeft <= 0) el.scrollLeft = setWidth;
      }
      expected = el.scrollLeft;
    };
    const onTouchStart = () => {
      paused.touching = true;
      stop();
    };
    const onTouchEnd = () => {
      paused.touching = false;
      pauseForInteraction();
    };
    const onFocusIn = () => {
      paused.focus = true;
      stop();
    };
    const onFocusOut = () => {
      paused.focus = false;
      schedule();
    };
    const onVisibility = () => {
      paused.hidden = document.hidden;
      if (paused.hidden) stop();
      else schedule();
    };
    const onDesktop = (e: MediaQueryListEvent) => {
      paused.desktop = e.matches;
      measure();
      if (paused.desktop) stop();
      else schedule();
    };

    measure();
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);
    desktop.addEventListener("change", onDesktop);
    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            ([entry]) => {
              paused.offscreen = !entry.isIntersecting;
              if (paused.offscreen) stop();
              else schedule();
            },
            { threshold: 0 },
          )
        : null;
    io?.observe(el);
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    ro?.observe(el);
    schedule();

    return () => {
      stop();
      window.clearTimeout(resumeTimer);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      desktop.removeEventListener("change", onDesktop);
      io?.disconnect();
      ro?.disconnect();
    };
  }, []);

  return (
    <ul ref={ref} className={className} data-trust-marquee>
      {children}
    </ul>
  );
}
