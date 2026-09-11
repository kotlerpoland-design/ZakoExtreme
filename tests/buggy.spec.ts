import { expect, test } from "@playwright/test";

/**
 * T1 buggy — /buggy-zakopane/ (docs/strony/BUGGY.md). Ta sama regresja co skutery: trasa była w routingu, menu, sitemapie
 * i kartach ofert, ale bez pliku strony zwracała 404. Viewport 390×844 z playwright.config.ts.
 * Strona trójproduktowa: trzy tory cenowe pod sobą (buggy 2-os. · 6-os. · Maverick), rezerwacja cały rok (buggy nie ma sezonu).
 * SEASON=shoulder → lead o końcu sezonu skuterowego i zdanie o listopadzie.
 */
const SEASON = (process.env.SEASON ?? process.env.NEXT_PUBLIC_SEASON_OVERRIDE ?? "summer") as "winter" | "shoulder" | "summer";

const PAGES = [
  {
    path: "/buggy-zakopane/",
    galleryPath: "/galeria/",
    pricing: /cennik i co zawiera cen/i,
    buggy6: /Buggy 6-osobowe/i,
    maverick: /Maverick XRS/i,
    gallery: /Jak wyglądają nasze trasy/i,
    directions: /Skąd do nas dojedziesz/i,
    shoulderLead: /Sezon skuterowy się skończył/,
    snowNotice: /wracają w listopadzie/,
    perBuggy: /za buggy · do 2 osób/,
    upTo4: /DO 4 OSÓB/i,
  },
  {
    path: "/en/buggy-tours-zakopane/",
    galleryPath: "/en/gallery/",
    pricing: /prices and what/i,
    buggy6: /6-seater buggy/i,
    maverick: /Maverick XRS/i,
    gallery: /What our trails look like/i,
    directions: /Where to find us/i,
    shoulderLead: /Snowmobile season is over/,
    snowNotice: /back in November/,
    perBuggy: /per buggy · up to 2 people/,
    upTo4: /UP TO 4 PEOPLE/i,
  },
] as const;

for (const p of PAGES) {
  test.describe(`${p.path} [${SEASON}]`, () => {
    test("strona istnieje, trzy bloki cennika, kotwice wariantów i sekcji", async ({ page }) => {
      const res = await page.goto(p.path, { waitUntil: "load" });
      expect(res?.status(), "strona istnieje (nie catch-all → notFound)").toBe(200);
      await page.waitForTimeout(400);

      await expect(page.locator("h1")).toHaveCount(1);
      // telefon nie jest CTA ekranu 1 (decyzja 2026-09-10)
      await expect(page.locator('[data-hero] a[href^="tel:"]')).toHaveCount(0);

      // pasek miejscowości pod paskiem zaufania prowadzi do tabeli dojazdu
      await expect(page.locator('[data-places-line] a[href="#dojazd"]')).toHaveCount(1);
      await expect(page.locator("#dojazd")).toHaveCount(1);

      // trzy tory: buggy 2-os. (3 warianty) · buggy 6-os. (4: do 4 / do 6 osób × 1 h / 2 h) · Maverick (1) = 8 kart
      // ceny potwierdzone 2026-09-11, ZA POJAZD — karta 2-os. mówi to wprost pod ceną
      await expect(page.locator("[data-pricing-track]")).toHaveCount(3);
      await expect(page.locator("[data-pricing-track] li article")).toHaveCount(8);
      await expect(page.locator("#wariant-buggy-standard-1h [data-price-from]")).toHaveAttribute("data-price-from", "500");
      await expect(page.locator("#wariant-buggy-standard-1h")).toContainText(p.perBuggy);
      await expect(page.locator("#wariant-buggy-premium-2h")).toHaveAttribute("aria-current", "true");
      await expect(page.locator("#wariant-buggy-premium-2h [data-price-from]")).toHaveAttribute("data-price-from", "900");
      await expect(page.locator("#wariant-buggy-ultra-3h [data-price-from]")).toHaveAttribute("data-price-from", "1200");
      await expect(page.locator("#wariant-buggy6-4os-1h [data-price-from]")).toHaveAttribute("data-price-from", "550");
      await expect(page.locator("#wariant-buggy6-4os-1h")).toContainText(p.upTo4);
      await expect(page.locator("#wariant-buggy6-6os-1h [data-price-from]")).toHaveAttribute("data-price-from", "650");
      await expect(page.locator("#wariant-buggy6-4os-2h [data-price-from]")).toHaveAttribute("data-price-from", "1000");
      await expect(page.locator("#wariant-buggy6-6os-2h [data-price-from]")).toHaveAttribute("data-price-from", "1200");
      // 6-os. nie ma wariantu wyróżnionego — cztery równorzędne karty
      await expect(page.locator('[id^="wariant-buggy6-"][aria-current]')).toHaveCount(0);
      await expect(page.locator("#wariant-maverick-1h [data-price-from]")).toHaveAttribute("data-price-from", "750");
      // markery na grzbiecie tylko nad pierwszym torem — 3 kotwice do wariantów buggy 2-os.
      await expect(page.locator('a[href^="#wariant-buggy-"]')).toHaveCount(3);
      // hashe bloków = cele linków z kart ofert na stronie głównej i z kafla „Rodziny"
      await expect(page.locator("section#buggy-6-osobowe")).toHaveCount(1);
      await expect(page.locator("section#maverick-xrs")).toHaveCount(1);
      await expect(page.locator('main a[href="#buggy-6-osobowe"]')).toHaveCount(1);
      // lista „W cenie" raz, pod pierwszym torem
      await expect(page.locator("main").getByRole("heading", { level: 3, name: /W cenie|Included in every/i })).toHaveCount(1);

      // kolejność: cennik → 6-os. → Maverick → rezerwacja → galeria → dojazd
      const y = async (name: RegExp) => (await page.getByRole("heading", { level: 2, name }).boundingBox())?.y ?? NaN;
      const pricing = await y(p.pricing);
      const buggy6 = await y(p.buggy6);
      const maverick = await y(p.maverick);
      const booking = (await page.locator("#rezerwacja").boundingBox())?.y ?? NaN;
      const gallery = await y(p.gallery);
      const directions = await y(p.directions);
      expect(pricing < buggy6, "cennik nad 6-os.").toBeTruthy();
      expect(buggy6 < maverick, "6-os. nad Maverickiem").toBeTruthy();
      expect(maverick < booking, "Maverick nad rezerwacją").toBeTruthy();
      expect(booking < gallery, "rezerwacja nad galerią").toBeTruthy();
      expect(gallery < directions, "galeria nad dojazdem").toBeTruthy();

      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("galeria prowadzi do grupy buggy na /galeria/", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      const tiles = page.locator("main figure").locator("xpath=ancestor::a[1]");
      await expect(tiles).toHaveCount(5);
      for (const href of await tiles.evaluateAll((els) => els.map((a) => a.getAttribute("href")))) {
        expect(href).toBe(`${p.galleryPath}#buggy`);
      }
      // „Zobacz galerię" pod siatką też celuje w grupę buggy
      await expect(page.locator(`main a[href="${p.galleryPath}#buggy"]`)).toHaveCount(6);
    });

    test("rezerwacja cały rok, lead zależy od sezonu", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      const booking = page.locator("#rezerwacja");
      await booking.scrollIntoViewIfNeeded();
      await expect(booking.locator("[data-booking-off-season]")).toHaveCount(0);
      await expect(booking.getByRole("button", { pressed: true })).toHaveCount(1);

      const hero = page.locator("[data-hero]");
      if (SEASON === "shoulder") {
        await expect(hero).toContainText(p.shoulderLead);
        await expect(hero).toContainText(p.snowNotice);
      } else {
        await expect(hero).not.toContainText(p.shoulderLead);
      }
    });

    test("schema: trzy Product, alternateName na buggy, bez ocen", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      const products = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
        els.map((el) => JSON.parse(el.textContent ?? "{}")).filter((s) => s["@type"] === "Product"),
      );
      expect(products).toHaveLength(3);
      const [buggy, buggy6, maverick] = products;
      expect(buggy.alternateName.length).toBeGreaterThan(0);
      expect(buggy.offers).toHaveLength(3);
      expect(buggy.offers[0].price).toBe("500");
      expect(buggy.offers[0].description).toMatch(/buggy/);
      expect(buggy.offers[0].availability).toBe("https://schema.org/InStock");
      expect(buggy6.offers).toHaveLength(4);
      expect(buggy6.offers[1].price).toBe("650");
      expect(buggy6.url).toMatch(/#buggy-6-osobowe$/);
      expect(maverick.offers).toHaveLength(1);
      expect(maverick.offers[0].price).toBe("750");
      expect(JSON.stringify(products)).not.toMatch(/aggregateRating|Review/);
    });
  });
}

test("link Buggy w menu i przekierowanie ze starego adresu nie prowadzą w 404", async ({ page }) => {
  const res = await page.request.get("/buggy-zakopane/");
  expect(res.status()).toBe(200);
  const redirect = await page.request.get("/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/", { maxRedirects: 0 });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers()["location"]).toMatch(/\/buggy-zakopane\/$/);
});
