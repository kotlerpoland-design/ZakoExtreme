import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next.js 16: plik `proxy.ts` zastępuje dawne `middleware.ts`.
 * Obsługuje wyłącznie routing językowy. Nie usuwaj tu query params — gclid/fbclid muszą przeżyć.
 */
export default createMiddleware(routing);

export const config = {
  // Pomijamy pliki statyczne, obrazy, API i pliki z rozszerzeniem (llms.txt, sitemap.xml, robots.txt).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
