import { getTranslations } from "next-intl/server";
import type { LightboxLabels } from "./GalleryGrid";

/** Etykiety lightboxa z serwera (klient nie ładuje parsera wiadomości) — wzorzec jak `bookingLabels`. */
export async function galleryLightboxLabels(): Promise<LightboxLabels> {
  const t = await getTranslations("gallery.lightbox");
  return {
    open: t("open"),
    close: t("close"),
    prev: t("prev"),
    next: t("next"),
    zoomIn: t("zoomIn"),
    zoomOut: t("zoomOut"),
    dialog: t("dialog"),
    gallery: t("gallery"),
    slide: t("slide"),
    // szablon YARL z placeholderami {index}/{total} — przekazujemy surowy tekst, nie interpolujemy po stronie next-intl
    counter: t.raw("counter") as string,
  };
}
