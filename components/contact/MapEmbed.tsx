import { MapPin, Navigation } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { DirectionsLink } from "./DirectionsLink";
import { LazyMapFrame } from "./LazyMapFrame";

type Props = {
  /** title iframe'u (czytniki ekranu) */
  title: string;
  navigateLabel: string;
  addressLabel: string;
  className?: string;
};

/**
 * Mapa Google z pinezką na adresie + przycisk „Nawiguj" (kontur — pomarańcz jest tylko dla „Rezerwuj online").
 * Komponent serwerowy: ramka, adres i ikony idą w HTML; jedyny JS to LazyMapFrame (iframe po doscrollowaniu)
 * i DirectionsLink (directions_click), który strona i tak już ma. Decyzja 2026-09-10: leniwy embed zamiast statycznego obrazu.
 */
export function MapEmbed({ title, navigateLabel, addressLabel, className }: Props) {
  return (
    <figure className={cn("overflow-hidden rounded-lg border border-border bg-card shadow-card lg:flex lg:flex-col", className)}>
      {/* lg+: proporcje znikają, ramka wypełnia wysokość narzuconą przez grid (wysokość tabeli dojazdu) */}
      <LazyMapFrame src={site.googleMapsEmbedUrl} title={title} className="relative aspect-[4/3] bg-muted md:aspect-[16/10] lg:aspect-auto lg:min-h-64 lg:flex-1">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center" aria-hidden>
          <MapPin className="size-8 text-brand" strokeWidth={2.25} />
          <p className="font-display text-lg font-medium text-foreground">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </p>
        </div>
      </LazyMapFrame>
      <figcaption className="flex flex-col gap-4 border-t border-border p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <address className="not-italic">
          <p className="font-display text-eyebrow font-medium uppercase text-muted-foreground">{addressLabel}</p>
          <p className="mt-1 font-display text-lg font-medium text-foreground md:text-xl">
            {site.address.street}, {site.address.postalCode} {site.address.city}
          </p>
        </address>
        <DirectionsLink
          href={site.googleMapsDirectionsUrl}
          className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-foreground px-5 font-display text-lg font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background md:w-auto"
        >
          <Navigation className="size-5 shrink-0" strokeWidth={2.25} aria-hidden />
          {navigateLabel}
        </DirectionsLink>
      </figcaption>
    </figure>
  );
}
