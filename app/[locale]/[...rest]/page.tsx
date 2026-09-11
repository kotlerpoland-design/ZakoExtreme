import { notFound } from "next/navigation";

/**
 * Catch-all pod [locale]: każda niedopasowana ścieżka (np. /nie-ma-takiej-strony/) ma renderować naszą 404 z telefonem
 * (app/[locale]/not-found.tsx, ciemny motyw), a nie domyślną białą stronę Next.js. Wzorzec z dokumentacji next-intl.
 * Przekierowania 301 ze starych adresów są w next.config.ts i działają wcześniej (proxy), zanim trafi tu cokolwiek.
 */
export default function CatchAllPage() {
  notFound();
}
