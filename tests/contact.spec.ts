import { test, expect } from "@playwright/test";

/**
 * T6 — strona kontaktu (docs/ARCHITEKTURA-INFORMACJI.md §276). Regresja na dwa realne błędy:
 *  1) `/kontakt/` był w routingu, w menu i w sitemapie, ale bez `app/[locale]/kontakt/page.tsx` zwracał 404,
 *  2) telefon ma być widoczny bez przewijania — to jedyna strona, gdzie numer jest treścią, nie CTA nr 2.
 * Kolejność sekcji świadomie odchodzi od T6 (decyzja 2026-09-10): rezerwacja przed dojazdem, jak na starej stronie.
 * Mapa Google ładuje się dopiero po doscrollowaniu (LazyMapFrame) — strona ma być najszybsza w serwisie.
 */
const PAGES = [
  { path: "/kontakt/", h1: /Kontakt/i, where: /Gdzie nas znajdziesz/i },
  { path: "/en/contact/", h1: /Contact/i, where: /Where to find us/i },
] as const;

for (const p of PAGES) {
  test.describe(p.path, () => {
    test("ekran 1: telefon widoczny bez przewijania", async ({ page }) => {
      const res = await page.goto(p.path, { waitUntil: "load" });
      expect(res?.status(), "strona istnieje (nie catch-all → notFound)").toBe(200);
      await page.waitForTimeout(400);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(p.h1);
      await expect(h1).toBeInViewport();

      const phone = page.locator('main a[href="tel:+48539320700"][data-location="contact"]').first();
      await expect(phone).toBeVisible();
      await expect(phone).toBeInViewport({ ratio: 1 });

      // jedyny pomarańczowy przycisk: rezerwacja online, też w ekranie 1
      const book = page.locator('main a[href="#rezerwacja"][data-cta="book"]').first();
      await expect(book).toBeInViewport({ ratio: 1 });

      // „Skopiuj numer" jest wyłącznie desktopowy (T6) — na 390×844 ma być schowany
      await expect(page.locator('[data-cta="phone-copy"]')).toBeHidden();

      // mapa Google jest daleko pod widżetem rezerwacji, więc LazyMapFrame nie montuje jej przy wczytaniu
      await expect(page.locator("iframe")).toHaveCount(0);

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("kolejność sekcji, mapa i sticky bar", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      await page.waitForTimeout(400);

      const bar = page.locator("[data-sticky-bar]");
      await expect(bar).toHaveAttribute("aria-hidden", "true");
      await page.mouse.wheel(0, 1200);
      await page.waitForTimeout(500);
      await expect(bar).toHaveAttribute("aria-hidden", "false");
      // sticky bar bez telefonu (decyzja 2026-09-10)
      await expect(page.locator('[data-sticky-bar] a[href^="tel:"]')).toHaveCount(0);

      const where = page.getByRole("heading", { level: 2, name: p.where });
      await expect(where).toBeVisible();
      await expect(page.locator("#rezerwacja")).toHaveCount(1);

      // rezerwacja PRZED dojazdem (decyzja 2026-09-10)
      const booking = await page.locator("#rezerwacja").boundingBox();
      const directions = await where.boundingBox();
      expect(booking && directions && booking.y < directions.y, "widżet rezerwacji ma być nad sekcją dojazdu").toBeTruthy();

      // mapa dojazdu montuje się po doscrollowaniu do niej
      await page.locator("figure iframe, figure").first().scrollIntoViewIfNeeded();
      await expect(page.locator("figure iframe")).toHaveCount(1, { timeout: 10_000 });
    });
  });
}

test("link Kontakt w menu nie prowadzi w 404", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  const res = await page.request.get("/kontakt/");
  expect(res.status()).toBe(200);
  await expect(page.locator('footer a[href="/kontakt/"]').first()).toHaveCount(1);
});
