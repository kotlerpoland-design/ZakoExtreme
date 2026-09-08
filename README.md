# ZakoExtreme — nowa strona

Strona firmy [ZakoExtreme](https://zakoextreme.pl) (wyprawy quadami, buggy 4×4 i skuterami śnieżnymi w Zakopanem), budowana od zera na Next.js. PL/EN, trzy stany sezonowe, mobile-first, telefon jako główne CTA.

## Start

```bash
pnpm install
cp .env.example .env.local   # uzupełnij NEXT_PUBLIC_GTM_ID i NEXT_PUBLIC_SLOTWISE_BUSINESS_ID
pnpm dev                     # http://localhost:3006
```

## Komendy

| Komenda | Co robi |
|---|---|
| `pnpm dev` | dev server (Turbopack, port 3006) |
| `pnpm lint` | ESLint, 0 ostrzeżeń |
| `pnpm check-types` | typy routera + `tsc --noEmit` |
| `pnpm build` | typecheck + `next build` |
| `pnpm check:content` | bramki treści z checklisty jakości (po buildzie) |

## Struktura

```
app/[locale]/        strony (PL bez prefiksu, EN pod /en/), sitemap.ts, robots.ts
components/          komponenty wg docs/ARCHITEKTURA-INFORMACJI.md §4
config/              site.ts (NAP, telefon, GTM, SlotWise) · season.ts (przełącznik sezonu)
content/             prices.ts · faq.ts · directions.ts · reviews.json — jedno źródło każdego faktu
i18n/                routing.ts (lokalizowane ścieżki) · request.ts · navigation.ts
lib/                 tracking.ts (kontrakt zdarzeń) · seo.ts (canonical, hreflang) · schema.ts · utils.ts
messages/            pl.json · en.json
proxy.ts             routing językowy (Next 16: zamiast middleware.ts)
next.config.ts       trailingSlash, obrazy, przekierowania 301 ze starej strony
scripts/             check-content.mjs — bramki blokujące
docs/                architektura informacji, pakiet startowy, analiza danych reklamowych
```

## Dokumentacja

- `docs/ARCHITEKTURA-INFORMACJI.md` — szkielet strony: mapa, szablony, komponenty, ścieżki, zasady premium.
- `docs/pakiet/` — brief i fakty (jedyne źródło prawdy), architektura URL, copy, SEO/GEO/schema, tracking, checklista jakości.
- `docs/dane/` — analiza danych Google Ads i Meta Ads za 365 dni oraz surowe eksporty.

Reguły pracy dla agentów i ludzi: `CLAUDE.md`.
