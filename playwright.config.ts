import { defineConfig } from "@playwright/test";

/**
 * Testy bramek z docs/pakiet/06-CHECKLISTA-JAKOSCI.md (B1 ekran 1, E budżet wagi) na ZBUDOWANEJ stronie.
 * `pnpm build && pnpm test:e2e` — serwer produkcyjny startuje sam na :3006 (albo użyj już działającego).
 * Sezon: zbuduj z NEXT_PUBLIC_SEASON_OVERRIDE=winter|shoulder|summer i podaj ten sam SEASON do testu.
 */
/** E2E_PORT pozwala testować obok działającego `pnpm dev` na :3006 (np. E2E_PORT=3007). */
const port = Number(process.env.E2E_PORT ?? 3006);

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 0,
  reporter: [["list"]],
  /* Emulacja 390×844 w Chromium (potrzebne CDP do pomiaru transferu); tylko chromium jest instalowany w CI. */
  use: {
    baseURL: `http://localhost:${port}`,
    browserName: "chromium",
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    locale: "pl-PL",
  },
  webServer: {
    command: `pnpm exec next start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
