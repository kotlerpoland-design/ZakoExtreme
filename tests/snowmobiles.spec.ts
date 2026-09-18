import { expect, test } from "@playwright/test";

/**
 * T1 skutery — /skutery-sniezne-zakopane/ (docs/strony/SKUTERY-SNIEZNE.md). Regresja na realny błąd: trasa była w routingu,
 * menu i sitemapie, ale bez pliku strony zwracała 404 (jak /kontakt/ wcześniej). Viewport 390×844 z playwright.config.ts.
 * Dwa stany sezonowe (config/season.ts): SEASON=winter → kalendarz rezerwacji; inaczej → notka o listopadzie zamiast kalendarza.
 */
const SEASON = (process.env.SEASON ?? process.env.NEXT_PUBLIC_SEASON_OVERRIDE ?? "summer") as "winter" | "shoulder" | "summer";

const PAGES = [
  { path: "/skutery-sniezne-zakopane/", galleryPath: "/galeria/", summerPath: "/quady-zakopane/", pricing: /cennik i co obejmuje cen/i, directions: /Skąd do nas dojedziesz/i },
  { path: "/en/snowmobile-tours-zakopane/", galleryPath: "/en/gallery/", summerPath: "/en/quad-tours-zakopane/", pricing: /prices and what/i, directions: /Where to find us/i },
] as const;

for (const p of PAGES) {
  test.describe(`${p.path} [${SEASON}]`, () => {
    test("strona istnieje, cennik zaraz pod hero, kotwice wariantów", async ({ page }) => {
      const res = await page.goto(p.path, { waitUntil: "load" });
      expect(res?.status(), "strona istnieje (nie catch-all → notFound)").toBe(200);
      await page.waitForTimeout(400);

      await expect(page.locator("h1")).toHaveCount(1);
      // telefon nie jest CTA ekranu 1 (decyzja 2026-09-10)
      await expect(page.locator('[data-hero] a[href^="tel:"]')).toHaveCount(0);

      // pasek miejscowości pod paskiem zaufania prowadzi do tabeli dojazdu
      const places = page.locator('[data-places-line] a[href="#dojazd"]');
      await expect(places).toHaveCount(1);
      await expect(page.locator("#dojazd")).toHaveCount(1);

      // cennik: trzy warianty 30 / 60 / 120 min, PREMIUM wyróżniony, dopłata za drugą osobę na każdej karcie
      const cards = page.locator("[data-pricing-track] li article");
      await expect(cards).toHaveCount(3);
      await expect(page.locator("#wariant-skutery-standard-30")).toHaveCount(1);
      await expect(page.locator("#wariant-skutery-premium-1h")).toHaveAttribute("aria-current", "true");
      await expect(page.locator("#wariant-skutery-ultra-2h")).toHaveCount(1);
      await expect(page.locator("#wariant-skutery-standard-30 [data-price-from]")).toHaveAttribute("data-price-from", "200");
      await expect(page.locator("#wariant-skutery-standard-30")).toContainText("30 min");
      await expect(page.locator("#wariant-skutery-premium-1h")).toContainText("+50");
      // marker na grzbiecie pokazuje minuty, nie „0.5 h"
      await expect(page.locator('[href="#wariant-skutery-standard-30"]').first()).toContainText("30 min");

      // kolejność: cennik nad rezerwacją, rezerwacja nad dojazdem (odstępstwo od T1: dojazd awansował na 6)
      const pricing = await page.getByRole("heading", { level: 2, name: p.pricing }).boundingBox();
      const booking = await page.locator("#rezerwacja").boundingBox();
      const directions = await page.getByRole("heading", { level: 2, name: p.directions }).boundingBox();
      expect(pricing && booking && pricing.y < booking.y, "cennik nad rezerwacją").toBeTruthy();
      expect(booking && directions && booking.y < directions.y, "rezerwacja nad dojazdem").toBeTruthy();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("galeria prowadzi do grupy skuterów na /galeria/", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      const tiles = page.locator("main figure").locator("xpath=ancestor::a[1]");
      await expect(tiles).toHaveCount(5);
      for (const href of await tiles.evaluateAll((els) => els.map((a) => a.getAttribute("href")))) {
        expect(href).toBe(`${p.galleryPath}#skutery`);
      }
      // „Zobacz galerię" pod siatką też celuje w grupę skuterów
      await expect(page.locator(`main a[href="${p.galleryPath}#skutery"]`)).toHaveCount(6);
    });

    test("sekcja rezerwacji zależy od sezonu", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      const booking = page.locator("#rezerwacja");
      await booking.scrollIntoViewIfNeeded();
      if (SEASON === "winter") {
        await expect(booking.locator("[data-booking-off-season]")).toHaveCount(0);
        await expect(booking.locator("[data-booking-widget]")).toHaveCount(1);
      } else {
        // poza sezonem: bez kalendarza, za to telefon i link do oferty letniej
        await expect(booking.locator("[data-booking-off-season]")).toHaveCount(1);
        await expect(booking.locator("[data-booking-widget]")).toHaveCount(0);
        await expect(booking.locator("iframe")).toHaveCount(0);
        await expect(booking.locator('a[href^="tel:"]')).toHaveCount(1);
        await expect(booking.locator(`a[href="${p.summerPath}"]`)).toHaveCount(1);
        // lead hero też prowadzi do oferty letniej
        await expect(page.locator(`[data-hero] a[href="${p.summerPath}"]`)).toHaveCount(1);
      }
    });

    test("schema Product z alternateName i sezonową dostępnością", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      const products = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
        els.map((el) => JSON.parse(el.textContent ?? "{}")).filter((s) => s["@type"] === "Product"),
      );
      expect(products).toHaveLength(1);
      const product = products[0];
      expect(product.alternateName.length).toBeGreaterThan(0);
      expect(product.offers).toHaveLength(3);
      expect(product.offers[0].name).toMatch(/30 min/);
      expect(product.offers[0].price).toBe("200");
      expect(product.offers[1].availability).toBe(SEASON === "winter" ? "https://schema.org/InStock" : "https://schema.org/PreOrder");
      expect(JSON.stringify(product)).not.toMatch(/aggregateRating|Review/);
    });
  });
}

test("link Skutery śnieżne w menu i przekierowanie ze starego adresu nie prowadzą w 404", async ({ page }) => {
  const res = await page.request.get("/skutery-sniezne-zakopane/");
  expect(res.status()).toBe(200);
  const redirect = await page.request.get("/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/", { maxRedirects: 0 });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers()["location"]).toMatch(/\/skutery-sniezne-zakopane\/$/);
});
