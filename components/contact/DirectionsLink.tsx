"use client";

import type { ReactNode } from "react";
import { site } from "@/config/site";
import { trackDirectionsClick } from "@/lib/tracking";

type Props = {
  children: ReactNode;
  className?: string;
  /** Domyślnie wizytówka w Google Maps; `site.googleMapsDirectionsUrl` = od razu trasa/nawigacja („Nawiguj"). */
  href?: string;
};

/** Link do Google Maps (nowa karta) + event directions_click. Osadzona mapa żyje w MapEmbed — tu jest tylko link. */
export function DirectionsLink({ children, className, href = site.googleMapsUrl }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => trackDirectionsClick()} className={className}>
      {children}
    </a>
  );
}
