/**
 * Bramki blokujące z docs/pakiet/06-CHECKLISTA-JAKOSCI.md §A — uruchamiane na ZBUDOWANYM katalogu (.next/server/app).
 * Wynik inny niż zero = strona nie idzie live.
 *
 *  A1  wiek — żadnej liczby lat (treść, schema, alt, meta)
 *  A2  cena wejściowa 250, nigdy 300
 *  A3  liczba opinii — „ponad 800", nigdy dokładna
 *  A4  znaczniki [[DO POTWIERDZENIA]] / TODO / PLACEHOLDER nie mogą trafić na produkcję
 *  A5  zakazane nazwy (konkurencja, były przewodnik)
 *  A7  dokładnie jeden kontener GTM
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.argv[2] ?? ".next/server/app";
const EXT = new Set([".html", ".rsc", ".txt", ".json", ".js"]);

const checks = [
  { id: "A1 wiek", re: /\b\d{1,2}\s*(lat|lata|latka|latek|latki|years?|yrs?)\b/i },
  { id: "A1 schema wiek", re: /suggestedMinAge|minAge|ageRange/ },
  { id: "A2 cena 300", re: /(od\s*)?300\s*(zł|zl|PLN)/i },
  // dokładna liczba opinii; dozwolone formy: „ponad 800 opinii", „+800 opinii", „800+ reviews"
  { id: "A3 liczba opinii", re: /(?<!ponad\s)(?<!over\s)(?<!\+)\b(7[6-9]\d|[89]\d{2})(?!\+)\s*(opinii|opinie|reviews)\b/i },
  { id: "A4 znaczniki", re: /DO POTWIERDZENIA|TO CONFIRM|LOREM|PLACEHOLDER/ },
  { id: "A5 zakazane nazwy", re: /snowdoo|\bmarcel\b/i },
];

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if ([...EXT].some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
if (files.length === 0) {
  console.error(`Brak plików w ${ROOT}. Najpierw \`pnpm build\`.`);
  process.exit(2);
}

let failures = 0;
const gtmIds = new Set();

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const { id, re } of checks) {
    const m = text.match(re);
    if (m) {
      failures++;
      console.error(`✗ ${id}: ${file} → „${m[0]}”`);
    }
  }
  for (const m of text.matchAll(/GTM-[A-Z0-9]{6,}/g)) gtmIds.add(m[0]);
}

if (gtmIds.size > 1) {
  failures++;
  console.error(`✗ A7 GTM: więcej niż jeden kontener: ${[...gtmIds].join(", ")}`);
}

if (failures > 0) {
  console.error(`\n${failures} naruszeń bramek blokujących. Strona nie idzie live.`);
  process.exit(1);
}
console.log(`✓ Bramki A1–A5, A7 przeszły (${files.length} plików, GTM: ${[...gtmIds].join(", ") || "brak"}).`);
