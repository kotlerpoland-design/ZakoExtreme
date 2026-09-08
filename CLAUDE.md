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
- **Cena wejściowa quada/buggy: 250 zł.** Nigdy 300 (stara strona WordPress ma błąd, nie kopiuj z niej).
- **Opinie: „ponad 800" / „800+".** Nigdy dokładna liczba. Ocena 4,8 jest OK.
- **Zero wymyślonych danych** — opinii, statystyk, promocji, terminów, „zostały 3 miejsca". Fakt niepotwierdzony = `[[DO POTWIERDZENIA]]` w kodzie i sekcja **nie renderuje się** (`answer: null`, `confirmed: false`).
- Nie wymieniaj byłego przewodnika ani nazwy konkurencji (lista w `01-BRIEF-I-FAKTY.md` §1).
- Bez `aggregateRating` i `Review` w schema. Bez `suggestedMinAge`.
- **Dokładnie jeden kontener GTM** (`NEXT_PUBLIC_GTM_ID`). Zero gołego `gtag`/`fbq` w kodzie — wszystko przez `lib/tracking.ts` → dataLayer.

## Reguły produktu

- **Mobile-first: 390×844.** Desktop to widok kontrolny. Zero karuzel, pop-upów, interstitiali.
- **Telefon jest CTA nr 1** (`tel:+48539320700`), rezerwacja nr 2. Sticky bar z oboma na mobile.
- **Cena „od" w ekranie 1** każdej strony produktowej. Intencja cenowa konwertuje jak produktowa.
- **Jedna ścieżka rezerwacji**: `components/booking/BookingSection` — jedyny punkt wejścia do SlotWise.
- **PL i EN równorzędnie**, EN ma własne teksty i slugi (`i18n/routing.ts`), nie tłumaczenie.
- **Trzy sezony** (`config/season.ts`): zima / przejściowy / lato. Skutery poza zimą ukryte.
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
