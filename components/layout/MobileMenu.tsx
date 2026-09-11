"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { BookCta } from "@/components/primitives/BookCta";
import { Wordmark } from "./Wordmark";
import { LocaleSwitch } from "./LocaleSwitch";

export type MenuLink = { href: string; label: string };
export type MobileMenuLabels = {
  openMenu: string;
  closeMenu: string;
  menuTitle: string;
  switchLocaleAria: string;
  bookOnline: string;
};

/**
 * Menu pełnoekranowe (nie dropdown) na natywnym <dialog>: focus trap, Escape i backdrop za darmo, zero bibliotek
 * (radix kosztowałby ~45 kB gz na każdej stronie — budżet pierwszego ekranu < 310 kB).
 * Linki i teksty przychodzą z serwera jako props — klient nie ładuje runtime'u next-intl.
 * Duże cele dotykowe, na dole pomarańczowy „Rezerwuj online" — bez telefonu (decyzja 2026-09-10). docs/ARCHITEKTURA-INFORMACJI.md §1.3.
 */
export function MobileMenu({ items, labels, locale }: { items: MenuLink[]; labels: MobileMenuLabels; locale: Locale }) {
  const ref = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const d = ref.current;
    if (!d || d.open) return;
    d.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);
  const close = useCallback(() => ref.current?.close(), []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted lg:hidden"
        aria-label={labels.openMenu}
        aria-haspopup="dialog"
      >
        <Menu className="size-6" strokeWidth={2} aria-hidden />
      </button>

      <dialog
        ref={ref}
        aria-label={labels.menuTitle}
        /* Bez bazowego `flex`: klasa autora nadpisałaby UA `dialog:not([open]){display:none}` i zamknięte menu przechwytywałoby kliknięcia. */
        className="menu-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none flex-col bg-background p-0 text-foreground [&:not([open])]:hidden open:flex"
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className="flex h-header shrink-0 items-center justify-between px-5">
          <Wordmark />
          <div className="flex items-center gap-1">
            <LocaleSwitch locale={locale} ariaLabel={labels.switchLocaleAria} />
            <button
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
              aria-label={labels.closeMenu}
            >
              <X className="size-6" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pt-6" aria-label={labels.menuTitle}>
          <ol className="divide-y divide-border">
            {items.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  onClick={close}
                  className="flex min-h-16 items-center gap-4 py-3 font-display text-display-md font-semibold uppercase text-foreground"
                >
                  <span className="w-8 shrink-0 font-display text-sm font-semibold tabular text-brand" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="shrink-0 border-t border-border px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5">
          <div onClick={close}>
            <BookCta location="menu" href="#rezerwacja" variant="primary" className="w-full">
              {labels.bookOnline}
            </BookCta>
          </div>
        </div>
      </dialog>
    </>
  );
}
