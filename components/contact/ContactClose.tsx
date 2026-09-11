import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { DirectionsLink } from "./DirectionsLink";

/**
 * Domknięcie = sekcja Kontakt: NAP · ogromny telefon · link do mapy (bez godzin otwarcia — „czynne 24 h" to nieprawda, decyzja 2026-09-10).
 * Od 2026-09-10 to (obok stopki i „masz pytania?") JEDYNE miejsce z numerem — reszta CTA prowadzi do rezerwacji online.
 */
export async function ContactClose() {
  const t = await getTranslations();
  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
      <div>
        <PhoneLink location="footer" variant="giant" ariaLabel={t("common.call", { phone: site.phone.display })}>
          {site.phone.display}
        </PhoneLink>
        <p className="mt-3 font-display text-lg font-medium uppercase tracking-wide text-muted-foreground">{t("common.nearCenter")}</p>
      </div>
      <address className="not-italic">
        <p className="font-display text-eyebrow font-medium uppercase text-muted-foreground">{t("contactClose.address")}</p>
        <p className="mt-2 font-display text-2xl font-medium text-foreground">
          {site.address.street}
          <br />
          {site.address.postalCode} {site.address.city}
        </p>
        <DirectionsLink className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-base font-medium uppercase tracking-wide text-foreground underline-offset-4 hover:underline">
          <MapPin className="size-5 text-brand" aria-hidden />
          {t("contactClose.openMap")}
        </DirectionsLink>
      </address>
    </div>
  );
}
