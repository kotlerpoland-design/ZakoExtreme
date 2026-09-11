import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { GalleryGrid } from "./GalleryGrid";
import { galleryLightboxLabels } from "./galleryLabels";
import { toTiles, type GalleryLayout } from "./galleryTile";

/**
 * Siatka z lightboxem — TYLKO /galeria/ (wyjątek (4) CLAUDE.md). Osobny plik od `Gallery`, bo serwerowy komponent,
 * który importuje klienckie `GalleryGrid`, dociąga jego chunk na każdej stronie, gdzie sam jest użyty — nawet nierenderowany
 * (strona główna: budżet ekranu 1 < 310 kB). Etykiety i alt rozwiązane tu, na serwerze (klient bez next-intl).
 */
export async function LightboxGallery({ items, locale, layout = "grid" }: { items: readonly MediaItem[]; locale: Locale; layout?: GalleryLayout }) {
  if (items.length === 0) return null;
  return <GalleryGrid items={toTiles(items, locale)} layout={layout} labels={await galleryLightboxLabels()} />;
}
