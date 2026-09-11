import { test, expect } from "@playwright/test";

/**
 * /galeria/ — lightbox (yet-another-react-lightbox) otwierany kliknięciem:
 * - przed kliknięciem ŻADEN załadowany JS/CSS nie zawiera kodu YARL (chunk i style dopiero na żądanie — budżet ekranu 1),
 * - klik w kafel → dialog z obrazem, ArrowRight → licznik „2 / N", Escape → zamknięty, fokus wraca na kafel.
 * Detekcja po treści odpowiedzi (`yarl__`), bo nazwy chunków są zhashowane.
 */
test("galeria: lightbox i jego chunk dopiero po kliknięciu", async ({ page }) => {
  const assets: { url: string; yarl: boolean }[] = [];
  page.on("response", async (r) => {
    const ct = r.headers()["content-type"] ?? "";
    if (!/javascript|text\/css/.test(ct)) return;
    try {
      assets.push({ url: r.url(), yarl: (await r.text()).includes("yarl__") });
    } catch {
      /* odpowiedź już zwolniona — pomijamy */
    }
  });

  await page.goto("/galeria/", { waitUntil: "load" });
  await page.waitForTimeout(800);
  expect(assets.some((a) => a.yarl), "kod YARL nie może być w zasobach przed kliknięciem").toBe(false);
  const before = assets.length;

  const tile = page.locator("main ul button[aria-haspopup='dialog']").first();
  await tile.scrollIntoViewIfNeeded();
  await tile.click();

  const root = page.locator(".yarl__root");
  await expect(root).toBeVisible();
  await expect(root.locator("img").first()).toBeVisible();
  await expect.poll(() => assets.slice(before).some((a) => a.yarl), { message: "chunk YARL po kliknięciu" }).toBe(true);

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".yarl__counter")).toHaveText(/^2 \/ \d+$/);

  await page.keyboard.press("Escape");
  await expect(root).toHaveCount(0);
  await expect(tile).toBeFocused();
});

test("zajawka na stronie głównej: kafel to link do /galeria/", async ({ page }) => {
  await page.goto("/", { waitUntil: "load" });
  const tile = page.locator("#galeria ul a").first();
  await expect(tile).toHaveAttribute("href", /^\/galeria\/#(quady|buggy|skutery)$/);
});
