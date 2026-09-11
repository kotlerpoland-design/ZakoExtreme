"use client";

import { useEffect, useSyncExternalStore } from "react";
import { updateConsent } from "@/lib/tracking";

const STORAGE_KEY = "ze-consent";
type ConsentState = "granted" | "denied" | "unset" | "pending";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function readConsent(): ConsentState {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}
function writeConsent(v: "granted" | "denied") {
  try {
    window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* prywatne okno — decyzja ważna do końca sesji */
  }
  listeners.forEach((l) => l());
}

export type ConsentLabels = { text: string; accept: string; reject: string; region: string };

/**
 * Consent Mode v2: „Akceptuj" i „Odrzuć" równorzędne. Na mobile siedzi nad sticky barem tylko gdy ten jest widoczny
 * (--sticky-offset), kompaktowy (~60 px), więc nigdy nie zasłania przycisku „Zadzwoń" w hero (390×844).
 * Stan z localStorage przez useSyncExternalStore: na serwerze „pending" (nic nie renderujemy), bez hydration mismatch.
 */
export function ConsentBanner({ labels }: { labels: ConsentLabels }) {
  const state = useSyncExternalStore(subscribe, readConsent, () => "pending" as ConsentState);

  useEffect(() => {
    if (state === "granted") updateConsent(true);
  }, [state]);

  if (state !== "unset") return null;

  function decide(granted: boolean) {
    updateConsent(granted);
    writeConsent(granted ? "granted" : "denied");
  }

  return (
    <div
      role="region"
      aria-label={labels.region}
      data-consent-banner
      className="fixed inset-x-3 z-50 flex items-center gap-3 rounded-lg border border-border bg-card p-2.5 pl-3 shadow-lift transition-[bottom] duration-300 md:inset-x-auto md:right-6 md:bottom-6! md:max-w-md md:p-3"
      style={{ bottom: "calc(var(--sticky-offset, 0px) + env(safe-area-inset-bottom, 0px) + 0.5rem)" }}
    >
      <p className="flex-1 text-[13px] leading-snug text-ink-2 md:text-sm">{labels.text}</p>
      <div className="flex shrink-0 flex-col gap-1.5 sm:flex-row">
        <button
          type="button"
          onClick={() => decide(false)}
          className="min-h-10 rounded-md border-2 border-foreground px-3 font-display text-xs font-medium uppercase tracking-wide text-foreground"
        >
          {labels.reject}
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          className="min-h-10 rounded-md bg-foreground px-3 font-display text-xs font-medium uppercase tracking-wide text-background"
        >
          {labels.accept}
        </button>
      </div>
    </div>
  );
}
