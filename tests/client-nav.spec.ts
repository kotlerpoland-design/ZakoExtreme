import { test, expect, type Page } from "@playwright/test";

/**
 * Regresja: po nawigacji klienckiej (logo w nagłówku = next/link, layout się nie remontuje) sekcje z animacją wejścia
 * (`[data-reveal]`) muszą dostać `data-revealed` i być widoczne — karty ofert, galeria, „Dla kogo", „Dlaczego".
 * Bez tego zostają na `opacity: 0` (globals.css) i strona główna wygląda na pustą.
 */
const LOGO = 'header a[aria-label^="ZakoExtreme"]';

async function expectHomeRevealed(page: Page, home: string) {
  // dokładny adres (nie tylko sufiks „/”), z zapasem na kompilację trasy w dev
  await expect(page).toHaveURL(new RegExp(`^https?://[^/]+${home.replace(/\//g, "\\/")}$`), { timeout: 15_000 });
  // bezpiecznik odsłaniający wszystko działa po 4 s — dajemy 6 s, ale poprawny kod odsłania ekran 1 od razu
  await expect.poll(() => page.locator("[data-reveal]:not([data-revealed])").count(), { timeout: 6000 }).toBe(0);
  const cards = page.locator("main article");
  expect(await cards.count()).toBeGreaterThan(0);
  await cards.first().scrollIntoViewIfNeeded();
  await expect(cards.first()).toBeVisible();
  await expect(cards.first()).toHaveCSS("opacity", "1");
}

test.describe("nawigacja kliencka → strona główna", () => {
  test("z podstrony produktowej przez logo", async ({ page }) => {
    await page.goto("/quady-zakopane/", { waitUntil: "load" });
    await page.waitForTimeout(500);
    await page.locator(LOGO).first().click();
    await expectHomeRevealed(page, "/");
  });

  test("ze strony głównej przez logo (samonawigacja)", async ({ page }) => {
    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(500);
    await page.locator(LOGO).first().click();
    await expectHomeRevealed(page, "/");
  });

  test("z nieistniejącego adresu (404) przez logo", async ({ page }) => {
    await page.goto("/nie-ma-takiej-strony/", { waitUntil: "load" });
    await page.waitForTimeout(500);
    await page.locator(LOGO).first().click();
    await expectHomeRevealed(page, "/");
  });

  test("EN: z podstrony produktowej przez logo", async ({ page }) => {
    await page.goto("/en/quad-tours-zakopane/", { waitUntil: "load" });
    await page.waitForTimeout(500);
    await page.locator(LOGO).first().click();
    await expectHomeRevealed(page, "/en/");
  });
});
