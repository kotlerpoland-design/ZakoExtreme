"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import { WashImage } from "@/components/graphics/WashImage";

export type HeroSlide = { id: string; src: StaticImageData; alt: string; position?: string };

const INTERVAL_MS = 3000;

/**
 * Rotacja zdjęć hero strony głównej (świadomy wyjątek od „zero karuzel", decyzja 2026-09-09): quady → buggy → skutery co 3 s,
 * crossfade 700 ms, aktywna pozycja listy 01/02/03 dostaje `data-active="true"` (podkreślenie w Hero.tsx).
 * Pauza: kursor lub fokus w hero, karta w tle, hero poza ekranem. `prefers-reduced-motion: reduce` = brak rotacji.
 * Teksty przychodzą z serwera (zero next-intl w kliencie). Pierwszy slajd = LCP (preload), pozostałe lazy + low priority.
 */
export function HeroSlides({ slides, sizes, seed }: { slides: HeroSlide[]; sizes: string; seed: number }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>("[data-hero]");
    if (!root) return;
    const current = slides[active]?.id;
    root.querySelectorAll<HTMLElement>("[data-slide]").forEach((el) => el.setAttribute("data-active", el.dataset.slide === current ? "true" : "false"));
  }, [active, slides]);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = ref.current?.closest<HTMLElement>("[data-hero]") ?? ref.current;
    if (!root) return;

    const paused = { pointer: false, focus: false, hidden: document.hidden, offscreen: false };
    const timer = window.setInterval(() => {
      if (paused.pointer || paused.focus || paused.hidden || paused.offscreen) return;
      setActive((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);

    // tylko mysz: na dotyku pointerenter zostaje po tapnięciu i zatrzymałby rotację na stałe
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") paused.pointer = true;
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType === "mouse") paused.pointer = false;
    };
    const onFocusIn = () => (paused.focus = true);
    const onFocusOut = () => (paused.focus = false);
    const onVisibility = () => (paused.hidden = document.hidden);
    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibility);
    const io = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => (paused.offscreen = !entry.isIntersecting), { threshold: 0.2 }) : null;
    io?.observe(root);

    return () => {
      window.clearInterval(timer);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibility);
      io?.disconnect();
    };
  }, [slides.length]);

  return (
    <div ref={ref} className="absolute inset-0" data-hero-slides>
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn("absolute inset-0 transition-opacity duration-700 ease-soft", i === active ? "opacity-100" : "opacity-0")}
          aria-hidden={i !== active}
          data-slide-active={i === active ? "true" : "false"}
        >
          <WashImage src={slide.src} alt={slide.alt} sizes={sizes} preload={i === 0} lazy={i !== 0} position={slide.position} seed={seed} quality={70} />
        </div>
      ))}
    </div>
  );
}
