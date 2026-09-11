"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BookCta } from "@/components/primitives/BookCta";

/**
 * Sticky bar (mobile): pojawia się, gdy sentinel hero (`[data-hero-sentinel]`, tuż pod CTA) opuści viewport.
 * Jeden przycisk „Rezerwuj online" na całą szerokość — telefon usunięty z paska (decyzja 2026-09-10: nie zachęcamy do dzwonienia).
 */
export function StickyCallBar({ labels }: { labels: { book: string } }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Bez sentinela (strona bez hero) bar zostaje ukryty — nie zgadujemy, kiedy go pokazać.
    const sentinel = document.querySelector("[data-hero-sentinel]");
    if (!sentinel) return;
    // Wysokość headera z tokenu (--header-h: 56 px mobile, 72 px lg) — bar jest md:hidden, więc w praktyce 56.
    const headerH = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim() || "56px";
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { rootMargin: `-${headerH} 0px 0px 0px` });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Baner zgód czyta --sticky-offset, żeby siedzieć nad barem tylko wtedy, gdy bar jest widoczny.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => document.documentElement.style.setProperty("--sticky-offset", visible && mq.matches ? "var(--sticky-bar-h)" : "0px");
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.documentElement.style.removeProperty("--sticky-offset");
    };
  }, [visible]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-soft md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ minHeight: "var(--sticky-bar-h)" }}
      aria-hidden={!visible}
      inert={!visible}
      data-sticky-bar
    >
      <div className="flex">
        <BookCta location="sticky" variant="sticky" className="w-full">
          {labels.book}
        </BookCta>
      </div>
    </div>
  );
}
