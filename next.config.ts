import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/**
 * Przekierowania 301 ze starych adresów WordPressa.
 * Bez nich 56 reklam w Google Ads zaczyna trafiać w 404 w dniu publikacji.
 * Źródło: docs/pakiet/02-ARCHITEKTURA-URL.md §5. Query string (gclid, fbclid) jest zachowywany.
 * Używamy statusCode: 301 (nie permanent: 308), bo checklista jakości i narzędzia SEO oczekują 301.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  { source: "/wyprawy-quadami-w-zakopanem", destination: "/quady-zakopane/" },
  { source: "/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme", destination: "/buggy-zakopane/" },
  { source: "/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje", destination: "/skutery-sniezne-zakopane/" },
  { source: "/start", destination: "/" },
  { source: "/start-sk", destination: "/" },
  { source: "/en/wyprawy-quadami-w-zakopanem", destination: "/en/quad-tours-zakopane/" },
  { source: "/en/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme", destination: "/en/buggy-tours-zakopane/" },
  { source: "/en/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje", destination: "/en/snowmobile-tours-zakopane/" },
];

const nextConfig: NextConfig = {
  // Adresy z pakietu kończą się ukośnikiem (/quady-zakopane/). Trzymamy to konsekwentnie.
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 wymusza listę dozwolonych jakości: 70 dla hero, 62 dla kart i galerii (budżet pierwszego ekranu < 310 kB).
    qualities: [62, 70],
    // Obrazy trzymamy w repo (public/) albo w CDN hostingu. Zewnętrzne domeny dopisz tutaj.
    remotePatterns: [],
  },
  async redirects() {
    return LEGACY_REDIRECTS.flatMap(({ source, destination }) => [
      // wariant bez ukośnika i z ukośnikiem — stara strona linkowała obie formy
      { source, destination, statusCode: 301 },
      { source: `${source}/`, destination, statusCode: 301 },
    ]);
  },
};

export default withNextIntl(nextConfig);
