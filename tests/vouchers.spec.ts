import { test, expect } from "@playwright/test";

/**
 * /vouchery/ — flaga sezonowa menu i reguły CTA.
 *
 * Flaga (config/season.ts, `isVoucherMenuSeason`): „Vouchery" są w menu głównym tylko 1 XI – 31 XII,
 * przez resztę roku prowadzi do nich wyłącznie stopka. Stan zależy od DATY BUILDU, nie od momentu testu,
 * więc test czyta ten sam override, z którym zbudowano stronę:
 *
 *   pnpm build && pnpm test:e2e                                    → oczekuje: tylko stopka
 *   NEXT_PUBLIC_VOUCHER_MENU=on pnpm build && VOUCHER_MENU=on pnpm test:e2e → oczekuje: menu + stopka
 */
const MENU = (process.env.VOUCHER_MENU ?? process.env.NEXT_PUBLIC_VOUCHER_MENU ?? "off") === "on";

const VOUCHER_LINK = 'a[href="/vouchery/"]';

test.describe(`/vouchery/ [menu: ${MENU ? "on" : "off"}]`, () => {
  test("link do voucherów jest w stopce przez cały rok", async ({ page }) => {
    await page.goto("/");
    const footerLink = page.locator(`footer ${VOUCHER_LINK}`);
    await expect(footerLink).toHaveCount(1);
  });

  test(`link w menu głównym ${MENU ? "jest" : "znika poza oknem XI–XII"}`, async ({ page }) => {
    await page.goto("/");
    // header zawiera nawigację desktopową i menu mobilne (natywny <dialog>) — oba renderują się w DOM
    const headerLinks = page.locator(`header ${VOUCHER_LINK}`);
    await expect(headerLinks).toHaveCount(MENU ? 2 : 0);
  });

  test("strona odpowiada w obu językach i ma jeden H1", async ({ page }) => {
    for (const path of ["/vouchery/", "/en/vouchers/"]) {
      const res = await page.goto(path);
      expect(res?.status(), `${path} odpowiada 200`).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    }
  });

  test("nie jest noindex — wchodzi do indeksu po uzupełnieniu treści", async ({ page }) => {
    await page.goto("/vouchery/");
    await expect(page.locator('meta[name="robots"][content*="noindex"]')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://zakoextreme.pl/vouchery/");
  });

  test("CTA: „Zamów voucher” dzwoni, a jedyny pomarańczowy przycisk to rezerwacja", async ({ page }) => {
    await page.goto("/vouchery/");

    // ekran 1: zamówienie vouchera prowadzi do telefonu (vouchera nie da się kupić przez SlotWise)
    const orderCta = page.locator('[data-cta="phone"][data-location="voucher"]').first();
    await expect(orderCta).toBeVisible();
    await expect(orderCta).toHaveAttribute("href", "tel:+48539320700");

    // reguła „jeden pomarańczowy przycisk" (bg-primary = BookCta): CTA vouchera jest WTÓRNY, nie pomarańczowy.
    // bg-primary występuje na stronie także w headerze i sticky barze — to ten sam BookCta, więc liczby nie sprawdzamy.
    await expect(orderCta).not.toHaveClass(/bg-primary/);

    // rezerwacja online zostaje na stronie jako osobna, jedyna ścieżka do SlotWise
    await expect(page.locator("#rezerwacja")).toHaveCount(1);
  });

  test("cena „od 250 zł” jest w ekranie 1", async ({ page }) => {
    await page.goto("/vouchery/");
    await expect(page.locator("[data-price-from]").first()).toContainText("250");
  });

  test("warianty na mobile to pozioma karuzela, która nie rozpycha strony", async ({ page }) => {
    await page.goto("/vouchery/");

    // 3 warianty z drabinki quad/buggy + karta „dowolna kwota"
    const cards = page.locator("main ol li article").filter({ hasText: /ZAMÓW TEN VOUCHER/i });
    await expect(cards).toHaveCount(4);

    // kontener faktycznie się przewija w poziomie (390 px z playwright.config.ts).
    // `main ol` łapie też listę kroków w „Jak zamówić" — STANDARD występuje tylko w kartach wariantów.
    const track = page.locator("main ol").filter({ hasText: "STANDARD" }).first();
    const scrolls = await track.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(scrolls, "lista wariantów przewija się w poziomie").toBe(true);

    // ...ale sama strona NIE (bramka E: zero poziomego przewijania body)
    const bodyOverflows = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(bodyOverflows, "strona nie przewija się w poziomie").toBe(false);
  });

  test("karty wariantów prowadzą do sekcji „Jak zamówić”", async ({ page }) => {
    await page.goto("/vouchery/");
    await expect(page.locator('a[href="#jak-zamowic"]').first()).toBeVisible();
    await expect(page.locator("#jak-zamowic")).toHaveCount(1);
  });
});
