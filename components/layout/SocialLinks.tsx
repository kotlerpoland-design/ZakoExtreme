import type { ComponentType } from "react";
import { getTranslations } from "next-intl/server";
import { site, type SocialKey } from "@/config/site";
import { cn } from "@/lib/utils";
import { IconFacebook, IconInstagram, IconTikTok, IconYouTube } from "@/components/graphics/SocialIcons";

const ICONS: Record<SocialKey, ComponentType<{ className?: string }>> = {
  instagram: IconInstagram,
  facebook: IconFacebook,
  tiktok: IconTikTok,
  youtube: IconYouTube,
};

/**
 * Profile społecznościowe w stopce — komponent serwerowy, zero JS.
 * Celowo bez trackingu: kontrakt zdarzeń (lib/tracking.ts, 05-TRACKING.md §3) obejmuje tylko to,
 * co realnie mierzy sprzedaż; cztery linki wychodzące nie są tego warte kosztem `"use client"` w stopce.
 * Adresy i kolejność: `site.social` (to samo źródło co `sameAs` w schema).
 */
export async function SocialLinks({ className }: { className?: string }) {
  const t = await getTranslations();
  return (
    // -ml-2.5 kompensuje padding pola dotyku, żeby pierwsza ikona trzymała lewą krawędź tekstu wyżej
    <ul aria-label={t("footer.socialTitle")} className={cn("-ml-2.5 flex items-center", className)}>
      {site.social.map(({ key, label, url }) => {
        const Icon = ICONS[key];
        return (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              // `me` = standardowe potwierdzenie tożsamości profilu, spójne z `sameAs` w schema
              rel="noopener noreferrer me"
              aria-label={`${site.name} — ${label}`}
              className="inline-flex size-11 items-center justify-center rounded-md text-ink-2 transition-colors hover:text-brand"
            >
              <Icon className="size-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
