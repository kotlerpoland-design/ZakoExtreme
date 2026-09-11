import { expect, test } from "@playwright/test";

/**
 * Sekcja „Warianty i ceny" na stronie produktowej (T1). Viewport 390×844 z playwright.config.ts.
 * Karuzela wariantów to czwarty wyjątek od „zero karuzel" (CLAUDE.md) i jedyna, która ma JS —
 * otwiera się na wariancie wyróżnionym (PREMIUM), a nie na pierwszej karcie.
 */
test.describe("/quady-zakopane/ — warianty i ceny", () => {
  test("na mobile to pozioma karuzela, która nie rozpycha strony", async ({ page }) => {
    await page.goto("/quady-zakopane/");

    const cards = page.locator("[data-pricing-track] li article");
    await expect(cards).toHaveCount(3);

    const track = page.locator("[data-pricing-track]");
    const scrolls = await track.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(scrolls, "tor wariantów przewija się w poziomie").toBe(true);

    // bramka E: zero poziomego przewijania body
    const bodyOverflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(bodyOverflows, "strona nie przewija się w poziomie").toBe(false);
  });

  test("otwiera się na wyśrodkowanym PREMIUM, a skrawki sąsiadów są widoczne", async ({ page }) => {
    await page.goto("/quady-zakopane/");

    const track = page.locator("[data-pricing-track]");
    // środek karty PREMIUM ma pokrywać się ze środkiem widocznej części toru
    const offset = await track.evaluate((el) => {
      const card = el.querySelector<HTMLElement>("#wariant-premium-2h");
      if (!card) return null;
      const c = card.getBoundingClientRect();
      const t = el.getBoundingClientRect();
      return Math.abs(c.left + c.width / 2 - (t.left + el.clientWidth / 2));
    });
    expect(offset, "karta PREMIUM jest w torze").not.toBeNull();
    expect(offset!, "PREMIUM stoi na środku toru").toBeLessThan(4);

    // po obu stronach musi wystawać kawałek sąsiada — inaczej nie widać, że da się przewijać w obie strony
    const neighbours = await track.evaluate((el) => {
      const t = el.getBoundingClientRect();
      const rect = (id: string) => el.querySelector<HTMLElement>(id)!.getBoundingClientRect();
      return {
        left: rect("#wariant-standard-1h").right - t.left,
        right: t.right - rect("#wariant-ultra-3h").left,
      };
    });
    expect(neighbours.left, "STANDARD wystaje z lewej").toBeGreaterThan(8);
    expect(neighbours.right, "ULTRA wystaje z prawej").toBeGreaterThan(8);
  });

  test("znacznik godziny na grzbiecie przewija do swojej karty", async ({ page }) => {
    await page.goto("/quady-zakopane/");

    await page.locator('[href="#wariant-ultra-3h"]').click();

    // tor ma scroll-smooth — czekamy, aż karta faktycznie dojedzie na środek, a nie tylko aż scrollLeft przestanie rosnąć
    await page.waitForFunction(() => {
      const el = document.querySelector<HTMLElement>("[data-pricing-track]")!;
      const c = el.querySelector<HTMLElement>("#wariant-ultra-3h")!.getBoundingClientRect();
      const t = el.getBoundingClientRect();
      return Math.abs(c.left + c.width / 2 - (t.left + el.clientWidth / 2)) < 4;
    });

    const state = await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>("#wariant-ultra-3h")!;
      const r = el.getBoundingClientRect();
      return { isTarget: el.matches(":target"), focused: document.activeElement === el, left: r.left, right: r.right };
    });
    expect(state.isTarget, "karta ULTRA jest celem kotwicy").toBe(true);
    expect(state.focused, "karta ULTRA dostaje fokus").toBe(true);
    expect(state.left, "karta ULTRA weszła w widok").toBeGreaterThan(-1);
    expect(state.right, "karta ULTRA weszła w widok").toBeLessThan(391);
  });

  test("wejście z kotwicą nie jest nadpisane pozycją startową", async ({ page }) => {
    await page.goto("/quady-zakopane/#wariant-standard-1h");

    const centered = await page.locator("[data-pricing-track]").evaluate((el) => {
      const card = el.querySelector<HTMLElement>("#wariant-standard-1h")!;
      const c = card.getBoundingClientRect();
      const t = el.getBoundingClientRect();
      return Math.abs(c.left + c.width / 2 - (t.left + el.clientWidth / 2));
    });
    expect(centered, "tor został na wskazanym wariancie, nie skoczył na PREMIUM").toBeLessThan(4);
  });
});
