import { test, expect, type Page } from "@playwright/test";

/**
 * B1 — test ekranu 1 (390×844, bez przewijania): fraza w H1 (strona główna: H1 sr-only, ekran zaczyna się listą 01/02/03),
 * cena od (tylko strony produktowe — hero strony głównej bez ceny, decyzja 2026-09-09), „Rezerwuj online" jako najbardziej
 * widoczny element (telefon poza ekranem 1 od 2026-09-10), ★ 4,8 + „ponad 800 opinii" w pasku zaufania pod hero,
 * „blisko centrum", baner zgód nie zasłania „Rezerwuj online".
 * E  — pierwszy ekran < 310 kB (transfer), brak poziomego przewijania.
 */
const SEASON = (process.env.SEASON ?? process.env.NEXT_PUBLIC_SEASON_OVERRIDE ?? "summer") as "winter" | "shoulder" | "summer";

const PAGES = [
  { path: "/", lang: "pl", h1: /w Zakopanem/i, price: /od 250 zł/, proof: /4,8 · ponad 800 opinii/, near: /Blisko centrum Zakopanego/, home: true },
  { path: "/en/", lang: "en", h1: /in Zakopane/i, price: /from 250 PLN/, proof: /4\.8 · 800\+/, near: /Near Zakopane center/, home: true },
  { path: "/quady-zakopane/", lang: "pl", h1: /Quady i ATV w Zakopanem/i, price: /od 250 zł/, proof: /4,8 · ponad 800 opinii/, near: /Blisko centrum Zakopanego/, product: true },
  { path: "/en/quad-tours-zakopane/", lang: "en", h1: /Quad & ATV Tours in Zakopane/i, price: /from 250 PLN/, proof: /4\.8 · 800\+/, near: /Near Zakopane center/, product: true },
  // skutery: cena „od 200 zł" w hero cały rok (klaster cenowy nr 1), także poza sezonem
  { path: "/skutery-sniezne-zakopane/", lang: "pl", h1: /Skutery śnieżne w Zakopanem/i, price: /od 200 zł/, proof: /4,8 · ponad 800 opinii/, near: /Blisko centrum Zakopanego/, product: true },
  { path: "/en/snowmobile-tours-zakopane/", lang: "en", h1: /Snowmobile Tours in Zakopane/i, price: /from 200 PLN/, proof: /4\.8 · 800\+/, near: /Near Zakopane center/, product: true },
  // buggy: cena za pojazd, od 500 zł (potwierdzone 2026-09-11) — nie 250 jak quady
  { path: "/buggy-zakopane/", lang: "pl", h1: /Buggy 4×4 w Zakopanem/i, price: /od 500 zł/, proof: /4,8 · ponad 800 opinii/, near: /Blisko centrum Zakopanego/, product: true },
  { path: "/en/buggy-tours-zakopane/", lang: "en", h1: /Buggy 4×4 Tours in Zakopane/i, price: /from 500 PLN/, proof: /4\.8 · 800\+/, near: /Near Zakopane center/, product: true },
] as const;

async function boxOf(page: Page, selector: string) {
  const box = await page.locator(selector).first().boundingBox();
  expect(box, `${selector} ma bounding box`).not.toBeNull();
  return box!;
}

function intersects(a: { x: number; y: number; width: number; height: number }, b: { x: number; y: number; width: number; height: number }) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

for (const p of PAGES) {
  test.describe(`${p.path} [${SEASON}]`, () => {
    test("ekran 1 bez przewijania", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      await page.waitForTimeout(600);

      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(p.h1);
      // strona główna: H1 sr-only (fraza w DOM, ekran 1 zaczyna się listą 01/02/03)
      if (!("home" in p)) await expect(h1).toBeInViewport();

      const book = page.locator('main a[href="#rezerwacja"][data-cta="book"]').first();
      await expect(book).toBeVisible();
      await expect(book).toBeInViewport({ ratio: 1 });
      // telefon nie jest CTA ekranu 1 (decyzja 2026-09-10) — zostaje w stopce i sekcji Kontakt
      await expect(page.locator('[data-hero] a[href^="tel:"]')).toHaveCount(0);
      await expect(page.locator('header a[href^="tel:"]')).toHaveCount(0);

      // ★ 4,8 · ponad 800 opinii — pierwsza pozycja paska zaufania tuż pod hero
      const proof = page.locator("[data-trust-bar] [data-proof]");
      await expect(proof).toHaveText(p.proof);
      await expect(proof).toBeInViewport();
      await expect(page.getByText(p.near).first()).toBeInViewport();

      if ("product" in p) {
        const price = page.locator("[data-hero] [data-price-from]").first();
        await expect(price).toHaveAttribute("aria-label", p.price);
        await expect(price).toBeInViewport();
      } else {
        // hero strony głównej bez ceny (decyzja 2026-09-09) — cena „od" na kartach ofert
        await expect(page.locator("[data-hero] [data-price-from]")).toHaveCount(0);
      }

      // baner zgód nie przecina przycisku „Rezerwuj online"
      const banner = page.locator("[data-consent-banner]");
      if (await banner.count()) {
        const b = await banner.boundingBox();
        const c = await book.boundingBox();
        expect(b && c && intersects(b, c), "baner zgód zasłania CTA rezerwacji").toBeFalsy();
      }

      // brak poziomego przewijania
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("sticky bar: ukryty na górze, widoczny po przewinięciu", async ({ page }) => {
      await page.goto(p.path, { waitUntil: "load" });
      await page.waitForTimeout(600);
      const bar = page.locator("[data-sticky-bar]");
      await expect(bar).toHaveAttribute("aria-hidden", "true");
      await page.mouse.wheel(0, 1400);
      await page.waitForTimeout(500);
      await expect(bar).toHaveAttribute("aria-hidden", "false");
      const sticky = await boxOf(page, '[data-sticky-bar] a[href="#rezerwacja"]');
      expect(sticky.height).toBeGreaterThanOrEqual(44);
      await expect(page.locator('[data-sticky-bar] a[href^="tel:"]')).toHaveCount(0);
      // baner zgód siedzi nad sticky barem, nie na nim
      const banner = page.locator("[data-consent-banner]");
      if (await banner.count()) {
        const b = await banner.boundingBox();
        const s = await boxOf(page, "[data-sticky-bar]");
        expect(b && intersects(b, s), "baner zgód nachodzi na sticky bar").toBeFalsy();
      }
    });
  });
}

/**
 * Budżet pierwszego ekranu (checklista E): zasoby potrzebne do narysowania i ożywienia ekranu 1 —
 * dokument, CSS, fonty, JS, zdjęcie hero. Leniwe obrazy spod ekranu (Chromium doładowuje je z wyprzedzeniem ~1250 px)
 * liczymy osobno i raportujemy, ale nie wliczamy do bramki.
 */
test("budżet pierwszego ekranu: < 310 kB transferu na /", async ({ page, context }) => {
  const client = await context.newCDPSession(page);
  await client.send("Network.enable");
  const reqs = new Map<string, { url: string; type: string; size: number }>();
  client.on("Network.requestWillBeSent", (e) => reqs.set(e.requestId, { url: e.request.url, type: e.type ?? "Other", size: 0 }));
  client.on("Network.responseReceived", (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.type = e.type;
  });
  client.on("Network.loadingFinished", (e) => {
    const r = reqs.get(e.requestId);
    if (r) r.size = e.encodedDataLength;
  });
  await page.goto("/", { waitUntil: "load" });
  await page.waitForTimeout(800);
  const heroSrc = await page.locator("[data-hero] img").first().evaluate((img: HTMLImageElement) => img.currentSrc);

  let firstScreen = 0;
  let lazyImages = 0;
  const byType = new Map<string, number>();
  for (const r of reqs.values()) {
    const isLazyImage = r.type === "Image" && r.url !== heroSrc;
    if (isLazyImage) lazyImages += r.size;
    else firstScreen += r.size;
    byType.set(r.type, (byType.get(r.type) ?? 0) + r.size);
  }
  const kb = (n: number) => `${Math.round(n / 1024)} kB`;
  console.log(`first screen ${kb(firstScreen)} · lazy images ${kb(lazyImages)} · ${[...byType].map(([t, v]) => `${t} ${kb(v)}`).join(" · ")}`);
  /* 310 kB od 2026-09-10 (decyzja właścicielki): zdjęcie sekcji FAQ (media.sections.faq) dokłada ~2 kB gz do HTML
     strony głównej, a strona stała na 300 kB przy progu 300 kB. Wcześniej: 300 kB. */
  expect(firstScreen, "zasoby ekranu 1 (bez leniwych obrazów)").toBeLessThan(310 * 1024);
});
