/**
 * Pobiera KANDYDATÓW na zdjęcia z biblioteki mediów starego WordPressa do assets/images/candidates/.
 * To NIE są jeszcze zdjęcia strony — każde musi zostać obejrzane i potwierdzone jako prawdziwa trasa ZakoExtreme
 * (content/media.ts → `confirmed: true`). Pliki AI (ChatGPT-Image-*), grafiki GBP i wpisy pomijamy.
 *
 * Użycie: node scripts/fetch-media.mjs
 */
import { mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "assets/images/candidates";
const BASE = "https://zakoextreme.pl/wp-content/uploads";

/** id WP → nazwa lokalna. Wybrane po rozmiarze (≥1200 px) i alt/nazwie sugerującej prawdziwe zdjęcie. */
const CANDIDATES = [
  ["2025/06/logo.jpeg", "logo-wp.jpg"],
  // poziome — kandydaci na hero
  ["2025/07/zakopane-quady-tlo.jpg", "quady-tlo-1920x879.jpg"],
  ["2025/07/quady-zakopane-zakoextreme-3-scaled.jpeg", "quady-3-2560x1920.jpg"],
  ["2025/06/quady-zakopane-zakoextreme-4-scaled.jpeg", "quady-4-2560x1920.jpg"],
  ["2025/05/buggy-panorama.jpg", "buggy-panorama-1920x800.jpg"],
  ["2025/05/IMG_5688.jpeg", "buggy-img5688-1920x1440.jpg"],
  ["2025/05/zakoextreme-quady-1.jpg", "quady-1-1600x900.jpg"],
  ["2025/05/zakopane-quady-1.jpg", "quady-1200x600.jpg"],
  ["2025/06/quady-zakopane-new1.jpg", "quady-new1-1300x1021.jpg"],
  ["2025/06/quady-zakopane-new2.jpg", "quady-new2-1320x1120.jpg"],
  // pionowe — galeria
  ["2025/07/zakopane-bugyy-wycieczki-wyprawy-cennik-1-scaled.jpeg", "buggy-cennik-1-p.jpg"],
  ["2025/06/buggy-zakopane-zakoextreme-scaled.jpeg", "buggy-zakoextreme-p.jpg"],
  ["2025/05/IMG_3095.jpeg", "buggy6-img3095-p.jpg"],
  ["2025/05/IMG_2906.jpeg", "buggy-img2906-p.jpg"],
  ["2025/05/IMG_5816.jpeg", "buggy-img5816-p.jpg"],
  ["2025/07/zakopane-quady-wycieczki-wyprawy-cennik-2-scaled.jpeg", "quady-cennik-2-p.jpg"],
  ["2025/07/zakopane-quady-wycieczki-wyprawy-cennik-3-scaled.jpeg", "quady-cennik-3-p.jpg"],
  ["2025/06/quady-zakopane-zakoextreme-1-scaled.jpeg", "quady-1-p.jpg"],
  ["2025/06/quady-zakopane-zakoextreme-2-scaled.jpeg", "quady-2-p.jpg"],
  ["2025/07/zakoextreme-quady-66.jpeg.jpg", "quady-66-1200sq.jpg"],
  ["2025/07/zakoextreme-quady-55.jpeg.jpg", "quady-55-1200sq.jpg"],
  // grudzień 2025 — prawdopodobnie skutery
  ["2025/12/IMG_1634-scaled.jpg", "zima-img1634-p.jpg"],
  ["2025/12/IMG_2023-scaled.jpeg", "zima-img2023-p.jpg"],
  ["2025/12/IMG_3709-scaled.jpeg", "zima-img3709-p.jpg"],
  ["2025/12/IMG_3716-scaled.jpeg", "zima-img3716-p.jpg"],
  ["2025/12/IMG_1980-scaled.jpeg", "zima-img1980-p.jpg"],
  ["2025/10/IMG_1880-scaled.jpeg", "jesien-img1880-p.jpg"],
  // brakujące pozycje z zakoextreme.pl/galeria/ (podstrona /galeria/, 2026-09-10)
  ["2025/05/zakopane-quady-2.jpg", "quady-2-wide.jpg"],
  ["2025/06/ZakoExtreme_quady_Zakopane_69.png", "quady-69.png"],
  ["2025/05/IMG_5468-scaled-1.webp", "buggy-img5468-p.webp"],
];

mkdirSync(OUT, { recursive: true });
let ok = 0;
for (const [path, name] of CANDIDATES) {
  const dest = join(OUT, name);
  if (existsSync(dest)) { ok++; continue; }
  try {
    const res = await fetch(`${BASE}/${path}`);
    if (!res.ok) { console.error(`✗ ${path} → HTTP ${res.status}`); continue; }
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${path} → ${e.message}`);
  }
}
console.log(`${ok}/${CANDIDATES.length} kandydatów w ${OUT}`);
