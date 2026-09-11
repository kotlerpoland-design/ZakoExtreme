# ZakoExtreme — nowa strona (Next.js)

@AGENTS.md

Strona firmy ZakoExtreme (wyprawy quadami, buggy 4×4 i skuterami śnieżnymi w Zakopanem).
Budowana od zera na Next.js. **To jest maszyna do umawiania przejazdów na dziś i jutro** — nie wizytówka, nie sklep.

## Zacznij tutaj

1. `docs/ARCHITEKTURA-INFORMACJI.md` — mapa stron, szablony, komponenty, zasady premium.
2. `docs/pakiet/01-BRIEF-I-FAKTY.md` — **jedyne źródło prawdy o faktach**. Czego tu nie ma, nie trafia na stronę.
3. `docs/pakiet/02-ARCHITEKTURA-URL.md` → `03-COPY-NAGLOWKI.md` (copy 1:1) → `04-SEO-GEO-SCHEMA.md` → `05-TRACKING.md` → `06-CHECKLISTA-JAKOSCI.md` (bramki).
4. `docs/dane/analiza/ANALIZA-MASTER.md` — dlaczego strona wygląda tak, a nie inaczej.

## Twarde zakazy (bramki blokujące — `pnpm check:content` po buildzie)

- **Żadnej liczby lat** — nigdzie: treść, FAQ, schema, alt, meta. Dozwolone: „za zgodą rodzica", „osobny ogrodzony tor pod opieką instruktora", „dziecko jedzie z osobą dorosłą", „ustalamy telefonicznie".
- **Cena wejściowa quada: 250 zł.** Nigdy 300 (stara strona WordPress ma błąd, nie kopiuj z niej). Wyjątek: skutery śnieżne (potwierdzone 2026-09-11) — 30 min od 200 zł, 60 min od **300 zł**, 120 min od 550 zł, za skuter, +50 zł druga osoba; bramka A2 pomija kontekst skuterów.
- **Buggy mają WŁASNĄ drabinkę, cena ZA POJAZD** (potwierdzone przez właściciela 2026-09-11; „quad i buggy mają tę samą drabinkę" z briefu jest nieaktualne): 2-os. **500 / 900 / 1200 zł** za 1 / 2 / 3 h (do 2 osób); 6-os. **550** (do 4 osób) / **650** (do 6 osób) za 1 h, **1000 / 1200** za 2 h; Maverick XRS **750** za 1 h (do 2 osób). Nigdy „od 250 zł" przy buggy. Jedno źródło: `content/prices.ts`.
- **Opinie: „ponad 800" / „800+".** Nigdy dokładna liczba. Ocena 4,8 jest OK.
- **Zero wymyślonych danych** — opinii, statystyk, promocji, terminów, „zostały 3 miejsca". Fakt niepotwierdzony = `[[DO POTWIERDZENIA]]` w kodzie i sekcja **nie renderuje się** (`answer: null`, `confirmed: false`).
- Nie wymieniaj byłego przewodnika ani nazwy konkurencji (lista w `01-BRIEF-I-FAKTY.md` §1).
- Bez `aggregateRating` i `Review` w schema. Bez `suggestedMinAge`. Bez `openingHoursSpecification`.
- **Firma NIE jest czynna 24 h** (decyzja właścicielki 2026-09-10) — zero „czynne 24 h", „open 24/7", „odbieramy całą dobę". Jedyne dozwolone: „Rezerwacja online 24 h" / „Book online 24/7" (bramka A8).
- **Dokładnie jeden kontener GTM** (`NEXT_PUBLIC_GTM_ID`). Zero gołego `gtag`/`fbq` w kodzie — wszystko przez `lib/tracking.ts` → dataLayer.

## Reguły produktu

- **Mobile-first: 390×844.** Desktop to widok kontrolny. Zero karuzel, pop-upów, interstitiali. Wyjątki: (1) decyzja 2026-09-09: hero strony głównej rotuje 3 zdjęcia filarów co 3 s (`components/hero/HeroSlides.tsx`) — pauza na hover/fokus/kartę w tle, wyłączona przy `prefers-reduced-motion`; (2) decyzja 2026-09-10: karty ofert na stronie głównej na mobile = natywny poziomy scroll ze snapem, skrajna karta wystaje (`components/offer/ProductCards.tsx`) — bez autoplay, bez JS; numery na grzbiecie góry to kotwice do kart; ten sam układ mają karty voucherów (`components/offer/VoucherCards.tsx`); karty wariantów w „Warianty i ceny" (T1, `components/offer/PricingCards.tsx`) też, ale ze snapem **na środek** i z jedynym w repo JS-em w karuzeli — `components/offer/PricingTrack.tsx` ustawia raz pozycję startową na wariancie wyróżnionym (PREMIUM leży w środku drabinki), kotwica w adresie ma pierwszeństwo; (3) decyzja 2026-09-10: pasek zaufania na mobile sam wolno przewija się w pętli (`components/trust/TrustMarquee.tsx`) — ręczne przesuwanie zachowane, pauza na dotyk/fokus/kartę w tle/poza ekranem, wyłączone przy `prefers-reduced-motion`, desktop bez ruchu; (4) decyzja 2026-09-10: zdjęcia na `/galeria/` otwierają się **kliknięciem** w lightbox (`components/media/GalleryLightbox.tsx`, yet-another-react-lightbox) — nigdy „po wejściu", chunk ładowany dopiero po pierwszym kliknięciu, Escape/swipe/strzałki, bez autoplay; zajawki galerii na `/` i stronach produktowych to zwykłe linki do `/galeria/`.
- **Rezerwacja online jest JEDYNYM CTA** (`#rezerwacja`, jedyny pomarańczowy przycisk `bg-primary` z ciemnym napisem: `BookCta primary/compact/sticky`). Decyzja właścicielki 2026-09-09 (CTA nr 1) zaostrzona 2026-09-10: **telefon znika z nawigacji (header desktop i mobile, menu, sticky bar), z hero i z każdego przycisku** — nie chcemy, żeby ludzie dzwonili. Numer (`PhoneLink`, `tel:+48539320700`) zostaje TYLKO: w stopce, w sekcji Kontakt na dole stron (`ContactClose`), na podstronie `/kontakt/` (`ContactHero` — tam numer jest treścią, nie przyciskiem, `cta_location: "contact"`; „Kontakt" w menu to osobna strona, nie kotwica) i przy tekstach „masz pytania?" (FAQ „Nie wiesz, co wybrać? Zadzwoń.", dojazd, fallback rezerwacji bez SlotWise). Odwraca rekomendację analizy (153:1 na korzyść telefonu); nie wracać bez decyzji właścicielki. Sticky bar na mobile = sam „Rezerwuj online".
- **Cena „od" w ekranie 1** każdej strony produktowej. Intencja cenowa konwertuje jak produktowa.
- **Jedna ścieżka rezerwacji**: `components/booking/BookingSection` — jedyny punkt wejścia do SlotWise.
- **PL i EN równorzędnie**, EN ma własne teksty i slugi (`i18n/routing.ts`), nie tłumaczenie.
- **Trzy sezony** (`config/season.ts`): zima / przejściowy / lato. Skutery poza zimą ukryte w cenniku i kartach ofert; w nawigacji i liście hero widoczne cały rok (decyzja 2026-09-09).
- **Vouchery sezonowo w menu** (`isVoucherMenuSeason` w `config/season.ts`): `/vouchery/` jest w menu głównym **1 XI – 31 XII**, przez resztę roku prowadzi do niej wyłącznie stopka (dlatego stopka nie jest już menu 1:1). Nadpisanie: `NEXT_PUBLIC_VOUCHER_MENU=on|off`. Voucher zamawia się **telefonicznie** — to jedyna strona poza stopką, Kontaktem i tekstami „masz pytania?", gdzie telefon jest CTA (bramka B2).
- Każdy fakt ma jedno źródło: `config/site.ts` (NAP), `content/prices.ts`, `content/faq.ts`, `content/directions.ts`, `content/reviews.json`.
- Ton: bezpiecznie, widokowo, z instruktorem, dla par, rodzin i grup. Nie „ekstremalnie i męsko".

## Stack

Next.js 16 (App Router, Turbopack, `proxy.ts` zamiast middleware) · React 19 · Tailwind CSS 4 · shadcn/ui (`components.json`, dodawaj przez `pnpm dlx shadcn@latest add <komponent>`) · Motion · next-intl 4 (routing z lokalizowanymi ścieżkami, PL bez prefiksu, EN pod `/en/`).

Statyczne generowanie (SSG/ISR). `trailingSlash: true`. Przekierowania 301 ze starych adresów w `next.config.ts` — **bez nich konto reklamowe przestaje działać w dniu publikacji**.

## Komendy

| Komenda | Co robi |
|---|---|
| `pnpm dev` | dev server z Turbopack na porcie **3006** |
| `pnpm lint` | ESLint, 0 ostrzeżeń |
| `pnpm check-types` | `next typegen && tsc --noEmit` |
| `pnpm build` | `tsc --noEmit && next build` — typy sprawdzane PRZED buildem |
| `pnpm check:content` | bramki treści na zbudowanym katalogu (po `pnpm build`) |

## Workflow

1. Po zmianach: `pnpm lint`, potem `pnpm build`, potem `pnpm check:content`.
2. Copy bierz z `docs/pakiet/03-COPY-NAGLOWKI.md`. Nie wymyślaj treści.
3. Zanim dodasz stronę, sprawdź, czy ma własny klaster fraz (`02-ARCHITEKTURA-URL.md` §2). ATV, Poronin, Kościelisko itd. NIE dostają stron.
4. Nowy numer telefonu na stronie = `trackPhoneClick(cta_location, ctx)`. Nowe pytanie FAQ = wpis w `content/faq.ts`, nigdy inline.
5. Pytania otwarte do właściciela: `docs/pakiet/03-COPY-NAGLOWKI.md` §8. Nie zgaduj odpowiedzi.
