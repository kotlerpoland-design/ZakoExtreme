"use client";

import { useEffect } from "react";
import { trackContactPageView, type TrackedLanguage } from "@/lib/tracking";

/**
 * `contact_page_view` — wejście na /kontakt/ jest zliczaną konwersją (2 742 rocznie, docs/pakiet/03-COPY-NAGLOWKI.md §4.11).
 * Osobny komponent, żeby cała strona mogła zostać serwerowa. Nie renderuje nic.
 */
export function ContactPageView({ language }: { language: TrackedLanguage }) {
  useEffect(() => {
    trackContactPageView(language);
  }, [language]);
  return null;
}
