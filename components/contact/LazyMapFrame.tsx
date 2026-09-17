"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  title: string;
  className?: string;
  /** placeholder renderowany po stronie serwera (adres + pinezka) do czasu doscrollowania */
  children: ReactNode;
};

/**
 * Jedyna kliencka część mapy: iframe montuje się po doscrollowaniu (IntersectionObserver, jak widżet rezerwacji w BookingSection).
 * Zero requestów do Google i zero wpływu na LCP, dopóki sekcja jest poza ekranem; pudełko o stałej wysokości = CLS 0.
 * Celowo minimalne (budżet ekranu 1 < 310 kB): ikony i tekst renderuje serwer w MapEmbed i podaje jako children.
 */
export function LazyMapFrame({ src, title, className, children }: Props) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <iframe src={src} title={title} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full border-0" />
      ) : (
        children
      )}
    </div>
  );
}
