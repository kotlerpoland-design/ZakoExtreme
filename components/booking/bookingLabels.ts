import { getTranslations } from "next-intl/server";
import type { BookingLabels } from "./BookingSection";

/** Etykiety sekcji rezerwacji z serwera (klient nie ładuje parsera wiadomości). */
export async function bookingLabels(heading: string): Promise<BookingLabels> {
  const t = await getTranslations("booking");
  return { heading, lead: t("lead"), fallbackLead: t("fallbackLead"), loading: t("loading") };
}
