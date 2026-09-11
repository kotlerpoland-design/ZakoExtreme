# 04 — SEO, GEO i schema.org

Ten plik odpowiada za dwie rzeczy naraz:
**klasyczne SEO** (Google wyniki organiczne) i **GEO** — *Generative Engine Optimization*,
czyli bycie cytowanym przez Google AI Overviews, ChatGPT, Perplexity i Bing Copilot.

To nie są dwa osobne zadania. To ta sama strona zbudowana tak, żeby maszyna umiała
wyciąć z niej poprawną odpowiedź.

---

# 1. Zasada nadrzędna GEO: strona ma być cytowalna, nie tylko czytelna

Model językowy nie „czyta strony". Wycina z niej **pojedynczy fragment** i wkleja go
jako odpowiedź. Jeśli fragment nie broni się sam — nie zostanie użyty.

**Test cytowalności.** Weź dowolny akapit ze strony, wyrwij go z kontekstu
i pokaż komuś, kto nigdy nie słyszał o firmie. Czy nadal wiadomo:
- **kto** to mówi (nazwa firmy),
- **gdzie** to jest (Zakopane),
- **co** to jest (usługa),
- **za ile**?

Jeśli nie — akapit jest niecytowalny i trzeba go przepisać.

**Praktycznie oznacza to trzy rzeczy:**

1. **Nazwa firmy i miejscowość co kilka akapitów, naturalnie.**
   ❌ „Nasze wyprawy trwają godzinę." → ✅ „Wyprawy quadem z ZakoExtreme w Zakopanem
   trwają godzinę, dwie albo trzy."

2. **Zero zaimków bez kotwicy.** „To trwa 2 godziny" jest bezużyteczne po wycięciu.
   „Wariant PREMIUM trwa 2 godziny i kosztuje od 450 zł" — działa.

3. **Konkretne liczby zamiast przymiotników.** „Blisko centrum" jest słabe.
   „Rybkówka 16/2, blisko centrum Zakopanego" jest cytowalne.
   Dlatego pytanie o czasy dojazdu i o skład floty (`03` §8, poz. 8 i 13)
   ma realną wartość — konkret jest walutą w AI search.

---

# 2. Meta title i description — gotowe, pod każdy URL

Limity: **title do 60 znaków**, **description 140–160 znaków**.
Marka `| ZakoExtreme` na końcu title (nie na początku — pierwsze słowa mają być frazą).

| URL | Title | Description |
|---|---|---|
| `/` (lato) | Quady i buggy Zakopane — od 250 zł \| ZakoExtreme | Wyprawy quadami i buggy 4×4 nad Zakopanem. Bez prawa jazdy, z instruktorem, legalne trasy. Od 250 zł. Zadzwoń: 539 320 700. Wolne terminy na dziś. |
| `/` (zima) | Skutery śnieżne Zakopane — wyprawy \| ZakoExtreme | Wyprawy skuterami śnieżnymi w Tatrach z lokalnym instruktorem. Legalne trasy, blisko centrum Zakopanego. Zadzwoń: 539 320 700. |
| `/` (przejściowy) | Buggy 4×4 i quady Zakopane — od 250 zł \| ZakoExtreme | Buggy z napędem 4×4 i quady na widokowych trasach nad Zakopanem. Bez prawa jazdy, z instruktorem. Od 250 zł. Zadzwoń: 539 320 700. |
| `/quady-zakopane/` | Quady Zakopane — wyprawy od 250 zł \| ZakoExtreme | Wyprawy quadami i ATV nad Zakopanem: 1, 2 lub 3 godziny. Bez prawa jazdy, z lokalnym instruktorem, legalne trasy. Od 250 zł. 4,8★ i ponad 800 opinii. |
| `/buggy-zakopane/` | Buggy 4×4 Zakopane — wyprawy od 500 zł \| ZakoExtreme | Wyprawy buggy 4×4 nad Zakopanem z instruktorem, po legalnych trasach. Od 500 zł za godzinę za buggy dla dwóch osób, buggy 6-osobowe od 550 zł. Bez prawa jazdy. Blisko centrum. Rezerwacja online 24 h. *(wdrożone 2026-09-11; ceny za pojazd, telefon nie jest CTA)* |
| `/skutery-sniezne-zakopane/` | Skutery śnieżne Zakopane — od 200 zł \| ZakoExtreme | Wyprawy skuterami śnieżnymi w Tatrach, z instruktorem, po legalnych trasach. Od 200 zł za 30 minut, bez prawa jazdy. Blisko centrum Zakopanego. Rezerwacja online 24 h. *(poza sezonem: „Skutery śnieżne Zakopane — sezon od listopada", opis zaczyna się od startu sezonu — `messages/*.json` → `skutery.meta`)* |
| `/quady-bez-prawa-jazdy/` | Quady bez prawa jazdy — Zakopane \| ZakoExtreme | Na wyprawę quadem nie potrzebujesz prawa jazdy. Krótkie szkolenie, przejażdżka próbna i jazda z instruktorem po legalnych trasach. Od 250 zł. |
| `/quady-dla-dzieci-i-mlodziezy/` | Quady dla dzieci i młodzieży — Zakopane \| ZakoExtreme | Osobny, ogrodzony tor pod opieką instruktora, przejazd z osobą dorosłą na trasie głównej albo buggy 6-osobowe dla całej rodziny. Zadzwoń i ustalmy wariant. |
| `/quady-bialka-tatrzanska/` | Quady Białka Tatrzańska — wyprawy \| ZakoExtreme | Wyprawy quadami i buggy dla gości z Białki Tatrzańskiej. Legalne trasy, instruktor, bez prawa jazdy. Od 250 zł. Zadzwoń: 539 320 700. |
| `/quady-bukowina-tatrzanska/` | Quady Bukowina Tatrzańska \| ZakoExtreme | Wyprawy quadami i buggy dla gości z Bukowiny Tatrzańskiej. Legalne trasy z widokiem na Tatry, z instruktorem. Od 250 zł. |
| `/buggy-bialka-bukowina/` | Buggy Białka i Bukowina Tatrzańska \| ZakoExtreme | Buggy 4×4 z napędem na cztery koła — wyjazd z Zakopanego, blisko Białki i Bukowiny. Od 500 zł za buggy, buggy 6-osobowe od 550 zł. |
| `/cennik/` | Cennik — quady, buggy, skutery \| ZakoExtreme Zakopane | Quady od 250 zł za godzinę, 450 zł za 2 h, 650 zł za 3 h. Buggy od 500 zł za godzinę (za buggy). Buggy 6-osobowe od 550 zł. Maverick XRS 240 KM od 750 zł. |
| `/opinie/` | Opinie o ZakoExtreme — Zakopane \| 4,8★ | Ponad 800 opinii w Google i ocena 4,8. Prawdziwe opinie klientów o wyprawach quadami, buggy i skuterami śnieżnymi w Zakopanem. |
| `/kontakt/` | Kontakt — ZakoExtreme Zakopane \| 539 320 700 | Rybkówka 16/2, 34-500 Zakopane, blisko centrum. Zadzwoń: +48 539 320 700 albo rezerwuj online 24 h. ⟵ zaktualizowane 2026-09-10 |
| `/en/` | Quad, Buggy & Snowmobile Tours Zakopane \| ZakoExtreme | Guided quad, buggy and snowmobile tours in the Tatras. No driving licence required, local English-speaking instructors, legal routes. From 250 PLN. |
| `/en/quad-tours-zakopane/` | Quad Tours Zakopane — from 250 PLN \| ZakoExtreme | Guided quad and ATV tours above Zakopane: 1, 2 or 3 hours. No driving licence required. Local instructors, legal routes. 4.8★, 800+ reviews. |
| `/en/buggy-tours-zakopane/` | Buggy 4×4 Tours Zakopane — from 500 PLN \| ZakoExtreme | Guided 4×4 buggy tours above Zakopane on legal routes. From 500 PLN per hour per buggy for two people, 6-seater buggy from 550 PLN. No driving licence required. Near the town center. Book online 24/7. |
| `/en/snowmobile-tours-zakopane/` | Snowmobile Tours Zakopane, Tatras \| ZakoExtreme | Guided snowmobile trips in the mountains above Zakopane. Legal routes, local English-speaking instructors, near the town center. |
| `/en/no-drivers-licence-required/` | Quad Tours Without a Licence — Zakopane \| ZakoExtreme | You do not need a driving licence for our quad tours. Short briefing, practice ride and an instructor leading the group. From 250 PLN. |
| `/en/prices/` | Prices — Quad, Buggy, Snowmobile \| ZakoExtreme | Quad and buggy tours from 250 PLN per hour, 450 PLN for 2 h, 650 PLN for 3 h. 6-seater buggy from 550 PLN. Maverick XRS 240 HP from 750 PLN. |
| `/en/reviews/` | ZakoExtreme Reviews — 4.8★ \| Zakopane | 800+ Google reviews and a 4.8 rating. Real guest reviews of our quad, buggy and snowmobile tours in Zakopane. |
| `/en/contact/` | Contact — ZakoExtreme Zakopane \| +48 539 320 700 | Rybkówka 16/2, 34-500 Zakopane, Poland. Call +48 539 320 700 or book online 24/7. ⟵ zaktualizowane 2026-09-10 |
| `/vouchery/` | Voucher na quady i buggy — Zakopane \| ZakoExtreme | Voucher prezentowy na wyprawę quadem lub buggy 4×4 nad Zakopanem. Wybierz wariant STANDARD, PREMIUM albo ULTRA lub dowolną kwotę — termin ustalicie później. ⟵ dodane 2026-09-10 |
| `/en/vouchers/` | Gift Vouchers — Quad & Buggy Zakopane \| ZakoExtreme | A gift voucher for a quad or buggy 4×4 trip above Zakopane. Choose the STANDARD, PREMIUM or ULTRA option, or any amount — the date can be set later. ⟵ dodane 2026-09-10 |

> **Opisy voucherów NIE kończą się „Rezerwacja online 24 h”**, mimo że bramka A8 dopuszcza to sformułowanie.
> Vouchera nie da się kupić online — obietnica rezerwacji w opisie prezentu byłaby treścią wprowadzającą w błąd (bramka C2).

> **Opisy `/kontakt/` i `/en/contact/` kończą się rezerwacją online, nie telefonem** (decyzja 2026-09-10,
> `03-COPY-NAGLOWKI.md` §2.1: meta zamiast „Zadzwoń: 539 320 700" kończą się „Rezerwacja online 24 h").
> Na tych dwóch stronach numer w opisie **zostaje** — to strona kontaktowa i po numer ludzie tu wchodzą —
> ale zdanie domyka rezerwacja. Wdrożone w `messages/*.json` → `contactPage.meta`. Nie cofaj tego do
> wcześniejszej wersji „albo zarezerwuj termin online".

> **Sezonowość w metadanych.** Title i description strony głównej zmieniają się razem
> ze stanem sezonu z `config/season.ts`. W Next.js App Router robisz to przez
> `generateMetadata()`, nie przez statyczny obiekt `metadata`.

---

# 3. Schema.org — kompletny zestaw

Cztery typy, w tej kolejności ważności:
**LocalBusiness** (globalnie) → **Product/Offer** (strony produktowe) →
**FAQPage** (wszędzie, gdzie jest FAQ) → **BreadcrumbList** (wszędzie).

## 3.1 LocalBusiness — w `layout.tsx`, na każdej stronie

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://zakoextreme.pl/#business",
  "name": "ZakoExtreme",
  "alternateName": ["Zako Extreme", "ZakoExtreme Zakopane"],
  "description": "Wyprawy quadami, buggy 4×4 i skuterami śnieżnymi w Zakopanem i Tatrach, z lokalnymi instruktorami, po legalnych trasach.",
  "url": "https://zakoextreme.pl/",
  "telephone": "+48539320700",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rybkówka 16/2",
    "addressLocality": "Zakopane",
    "postalCode": "34-500",
    "addressCountry": "PL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "49.3177",
    "longitude": "19.9962"
  },
  // bez openingHoursSpecification — „czynne 24 h" to nieprawda (decyzja 2026-09-10), prawdziwych godzin nie znamy
  "areaServed": [
    { "@type": "City", "name": "Zakopane" },
    { "@type": "Place", "name": "Białka Tatrzańska" },
    { "@type": "Place", "name": "Bukowina Tatrzańska" },
    { "@type": "Place", "name": "Poronin" },
    { "@type": "Place", "name": "Kościelisko" },
    { "@type": "Place", "name": "Murzasichle" }
  ],
  "priceRange": "250–1000 PLN",
  "sameAs": [
    "https://www.instagram.com/zako_extreme_/",
    "https://www.facebook.com/zakoextreme",
    "https://www.tiktok.com/@zako_extreme",
    "https://www.youtube.com/@ZAKOEXTREME"
  ]
}
```

> **Współrzędne i adres są zweryfikowane 31.08.2026 bezpośrednio z wizytówki Google**
> (`locations/6134296503048246089`): Rybkówka 16/2, `49.3177 / 19.9962`, tel. 539 320 700.
>
> **To jest ważne, bo stara strona ma tu błąd.** Obecna strona podaje w treści
> **Rybkówka 13** i współrzędne oddalone o ~2,5 km od faktycznej lokalizacji.
> Rozjazd NAP między stroną a wizytówką osłabia ranking lokalny — a lokalny ranking
> jest dla tej firmy kluczowy, bo 72% klientów szuka jej będąc już na Podhalu.
> **Nie przepisuj adresu ze starej strony.**
>
> `sameAs` uzupełnij o realne, istniejące profile. Nie wpisuj tam katalogów
> ani zaplecza linkowego, nawet jeśli ktoś to zaproponuje — to nie jest to,
> do czego `sameAs` służy, i nie pomaga.
>
> **Cztery profile potwierdzone 2026-09-10** (01-BRIEF-I-FAKTY.md §2). W kodzie mają jedno źródło:
> `SOCIAL_PROFILES` w `config/site.ts` — ta sama tablica zasila ikony w stopce i `sameAs` w schema,
> więc adresy nie mogą się rozjechać. Pole nadal renderuje się warunkowo (`lib/schema.ts`):
> pusta lista = brak `sameAs` w JSON-LD, nie pusta tablica.

### 3.1a `aggregateRating` — NIE wystawiaj go. To jest celowe.

Zauważ, że w bloku wyżej **nie ma `aggregateRating`**. To nie jest przeoczenie.

**Nie przepisuj oceny 4,8 ani liczby opinii z wizytówki Google do własnego schema.**

**Dlaczego — trzy powody, każdy wystarczający:**

1. **Google zabrania self-serving review markup.** Firma nie może sama wystawiać
   danych strukturalnych z oceną własnej działalności na typach `LocalBusiness`
   i `Organization`. To jest wprost w wytycznych.
2. **I tak nic z tego nie będzie.** Google **nie generuje** gwiazdek w wynikach
   dla `LocalBusiness` z `aggregateRating`. Ryzykujesz karę za coś, co i tak
   się nie wyświetli. Gwiazdki w wynikach i w mapach Google bierze
   **bezpośrednio z wizytówki** — czyli już je macie, za darmo.
3. **Rozjazd z wizytówką jest gwarantowany.** Liczba opinii rośnie co tydzień.
   Wpisana na sztywno będzie nieprawdziwa za miesiąc, a rozjazd między schema
   a rzeczywistością to realne ryzyko ręcznej kary.

> **To jest konkretna, już zgłoszona rekomendacja, którą odrzucamy.** Zewnętrzne
> narzędzie SEO proponowało klientowi wklejenie dokładnie takiego bloku
> (`aggregateRating` 4.8 z przepisaną liczbą opinii). **Nie rób tego** — również
> wtedy, gdy ktoś przyjdzie z taką sugestią w trakcie projektu.

**Co robisz zamiast tego:**
- Ocena **4,8★ i „ponad 800 opinii" zostaje w widocznej treści strony** — to jest
  uczciwa informacja dla człowieka i tam działa.
- Prawdziwe cytaty z wizytówki na `/opinie/` — jako tekst, bez `Review` w schema.
- Gwiazdki w wynikach wyszukiwania załatwia sama wizytówka.

**Stan zweryfikowany 31.08.2026:** wizytówka `locations/6134296503048246089`
ma **812 opinii i ocenę 4,8**. Liczba 4,8 jest więc prawdziwa i można ją pisać w treści.

> **Uwaga przy weryfikacji:** w tym samym koncie Windsor.ai wisi **druga wizytówka** —
> „Korona Gór – Domki Białka Tatrzańska" (99 opinii, ocena 3,0). To **inna firma**.
> Jeśli będziesz sprawdzać dane opinii przez integrację, filtruj po `location_id`,
> bo zbiorcza średnia z obu wizytówek daje bezsensowną liczbę i już raz wprowadziła
> w błąd w tym projekcie.

## 3.2 Product + Offer — na stronach produktowych

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wyprawa quadem w Zakopanem",
  "alternateName": ["Wyprawa ATV Zakopane", "quady zakopane"],
  "description": "Wyprawa quadem po widokowych, legalnych trasach nad Zakopanem, z lokalnym instruktorem. Do wyboru 1, 2 lub 3 godziny. Prawo jazdy nie jest wymagane.",
  "brand": { "@type": "Brand", "name": "ZakoExtreme" },
  "areaServed": { "@type": "City", "name": "Zakopane" },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "PLN",
    "lowPrice": "250",
    "highPrice": "650",
    "offerCount": "3",
    "availability": "https://schema.org/InStock",
    "seller": { "@id": "https://zakoextreme.pl/#business" }
  }
}
```

**Warianty per strona:**

| Strona | `lowPrice` | `highPrice` | `alternateName` |
|---|---:|---:|---|
| `/quady-zakopane/` | 250 | 650 | „Wyprawa ATV Zakopane", „quady zakopane" |
| `/buggy-zakopane/` | 500 | 1200 | „buggy zakopane", „bugi zakopane", „wynajem buggy Zakopane" — trzy węzły `Product` (buggy / buggy 6-os. / Maverick), ceny za pojazd potwierdzone 2026-09-11, `Offer.description` niesie jednostkę („za buggy · do 2 osób") |
| `/skutery-sniezne-zakopane/` | 200 | 550 | **„skutery sniezne zakopane"** (bez diakrytyki), „skuter śnieżny Zakopane", „wypożyczalnia skuterów śnieżnych Zakopane"; EN: „snowmobile zakopane", „zakopane snowmobile rental" |

> **`alternateName` bez polskich znaków to jedyne miejsce, gdzie obsługujesz wariant
> bez diakrytyki.** Fraza `skutery sniezne zakopane` ma 682 kliki rocznie — więcej niż
> `buggy zakopane`. Ale **nie wpychasz jej w treść ani w H1** — Google normalizuje
> diakrytykę sam, a keyword stuffing zaszkodzi bardziej, niż pomoże.

**`availability` steruje sezonem.** Poza sezonem skuterowym ustaw
`https://schema.org/PreOrder` albo `OutOfStock` — nie zostawiaj `InStock` na produkcie,
którego nie da się kupić. To pole podłącz do `config/season.ts`.

## 3.3 FAQPage — pod featured snippet i AI Overviews

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Czy na quada potrzebne jest prawo jazdy?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Nie, na wyprawę quadem z ZakoExtreme nie potrzebujesz prawa jazdy. Jeździsz z instruktorem po naszych sprawdzonych trasach, a przed wyjazdem dostajesz krótkie szkolenie i przejażdżkę próbną."
    }
  }]
}
```

**Trzy zasady, których nie wolno złamać:**

1. **Treść w schema musi być identyczna z treścią widoczną na stronie.**
   Nie „podobna" — identyczna. Rozjazd = ręczna kara. Dlatego generuj oba
   z **tego samego obiektu w kodzie**, a nie przepisuj ręcznie.
2. **Tylko strony, które faktycznie mają FAQ.** Nie doklejaj `FAQPage`
   do strony bez sekcji pytań.
3. **Żadne pytanie w schema nie zawiera liczby lat.** Ta sama reguła co w treści.

**Gdzie wstawić `FAQPage`:** wszystkie strony produktowe, obie strony kwalifikacyjne,
`/cennik/`, strona główna i lustra EN.

## 3.4 BreadcrumbList

Na każdej podstronie. Prosty, ale realnie wpływa na to, jak Google wyświetla ścieżkę
w wynikach mobilnych — a 96% ruchu to mobile.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ZakoExtreme", "item": "https://zakoextreme.pl/" },
    { "@type": "ListItem", "position": 2, "name": "Quady Zakopane", "item": "https://zakoextreme.pl/quady-zakopane/" }
  ]
}
```

## 3.5 Czego NIE wystawiać

- ❌ **`Event`** — nie mamy stałych, ogłoszonych terminów. Wystawienie zmyślonych dat
  to fabrykowanie danych.
- ❌ **`aggregateRating` na `LocalBusiness`** — patrz §3.1a. To jest zakaz, nie preferencja.
- ❌ **`Review`** — ani wymyślony, ani przepisany z wizytówki. Prawdziwe cytaty
  wchodzą na stronę jako **tekst**, nie jako dane strukturalne.
- ❌ **`suggestedMinAge`** / `audience.suggestedMinAge` — łamie zakaz podawania wieku.
- ❌ **`Offer.priceValidUntil`** z wymyśloną datą.
- ❌ **`TouristAttraction`** — firma nie jest atrakcją turystyczną w rozumieniu schema,
  jest usługodawcą. `LocalBusiness` jest właściwe.

---

# 4. Hreflang i kanoniczne

Na **każdej** stronie, dwukierunkowo, z `x-default`:

```html
<link rel="alternate" hreflang="pl" href="https://zakoextreme.pl/quady-zakopane/" />
<link rel="alternate" hreflang="en" href="https://zakoextreme.pl/en/quad-tours-zakopane/" />
<link rel="alternate" hreflang="x-default" href="https://zakoextreme.pl/quady-zakopane/" />
<link rel="canonical" href="https://zakoextreme.pl/quady-zakopane/" />
```

**Najczęstszy błąd:** hreflang tylko po jednej stronie. Jeśli PL wskazuje na EN,
ale EN nie wskazuje z powrotem na PL — Google ignoruje całą parę.

**Strony EN bez odpowiednika PL** (`/en/no-drivers-licence-required/` ma odpowiednik,
ale gdyby któraś go nie miała): nie wystawiaj wtedy `hreflang` do nieistniejącego URL-a.
Lepiej brak niż błędny.

**`x-default` → wersja polska**, bo 72% ruchu jest lokalne.

W Next.js App Router: `alternates` w `generateMetadata()`.

---

# 5. Fragmenty pod cytowanie przez AI

To są gotowe akapity zoptymalizowane pod wycięcie przez model.
Wklej je w treść **dosłownie** — są tak napisane, żeby broniły się samodzielnie.

**Kim jest firma:**
> ZakoExtreme to najdłużej działająca firma organizująca wyprawy quadami, buggy 4×4
> i skuterami śnieżnymi w Zakopanem. Siedziba znajduje się przy Rybkówce 16/2,
> blisko centrum Zakopanego. Firma ma ocenę 4,8 i ponad 800 opinii w Google.

**Co można u nich zrobić:**
> W ZakoExtreme w Zakopanem można wybrać się na wyprawę quadem, buggy z napędem 4×4
> albo — zimą — na skuterze śnieżnym. Wyprawy trwają godzinę, dwie lub trzy i zawsze
> odbywają się z lokalnym instruktorem, po legalnych trasach z widokiem na Tatry.

**Ile to kosztuje:**
> Godzinna wyprawa quadem lub buggy w ZakoExtreme w Zakopanem kosztuje od 250 zł,
> dwugodzinna od 450 zł, a trzygodzinna od 650 zł. Buggy 6-osobowe, którym prowadzi
> jedna dorosła osoba, kosztuje od 550 zł za godzinę.

**Prawo jazdy:**
> Na wyprawę quadem z ZakoExtreme w Zakopanem nie jest potrzebne prawo jazdy.
> Uczestnicy jeżdżą z instruktorem po trasach firmy, po krótkim szkoleniu
> i przejażdżce próbnej.

**Dzieci:**
> ZakoExtreme w Zakopanem organizuje przejazdy również dla dzieci. Do wyboru jest
> osobny, ogrodzony tor dla dzieci pod opieką instruktora, przejazd na trasie głównej,
> gdzie dziecko jedzie z osobą dorosłą, oraz buggy 6-osobowe prowadzone przez dorosłego.
> Wariant ustala się telefonicznie, za zgodą rodzica lub opiekuna.

**Gdzie to jest (pod „snowmobile near me"):**
> ZakoExtreme mieści się przy Rybkówce 16/2 w Zakopanem, w województwie małopolskim,
> blisko centrum miasta. Dojeżdżają tu goście z Białki Tatrzańskiej, Bukowiny Tatrzańskiej,
> Poronina, Kościeliska i Murzasichla.

**EN:**
> ZakoExtreme is the longest-running quad, buggy and snowmobile tour operator in Zakopane,
> Poland. It is located at Rybkówka 16/2, close to the town center, and holds a 4.8 rating
> with over 800 Google reviews. No driving licence is required for its quad tours.

> **Zauważ wzorzec:** każdy z tych akapitów zawiera nazwę firmy + miejscowość + konkret.
> Nie jest to redundancja przez nieuwagę — to jest cały mechanizm.

---

# 6. `llms.txt` i dostęp dla crawlerów AI

Umieść `/llms.txt` w `public/`. To nie jest jeszcze standard, ale jest zerowym kosztem
i rosnącą liczbą klientów, którzy go czytają.

```markdown
# ZakoExtreme

> Wyprawy quadami, buggy 4×4 i skuterami śnieżnymi w Zakopanem i Tatrach.
> Rybkówka 16/2, 34-500 Zakopane. Telefon: +48 539 320 700.
> Ocena 4,8 i ponad 800 opinii w Google. Najdłużej działająca firma tego typu w Zakopanem.

## Oferta
- Wyprawa quadem / ATV: 1 h od 250 zł, 2 h od 450 zł, 3 h od 650 zł
- Wyprawa buggy 4×4: te same warianty i ceny
- Buggy 6-osobowe: 1 h od 550 zł, 2 h od 1000 zł
- Maverick XRS 240 KM: 1 h od 750 zł
- Skutery śnieżne (sezon listopad–luty): [[DO POTWIERDZENIA]]

## Ważne fakty
- Prawo jazdy nie jest wymagane — jazda z instruktorem, po szkoleniu i jeździe próbnej.
- Trasy są legalne i sprawdzone, z widokiem na Tatry.
- Dzieci: osobny ogrodzony tor pod opieką instruktora, przejazd z osobą dorosłą
  na trasie głównej albo buggy 6-osobowe. Wariant ustalany telefonicznie,
  za zgodą rodzica lub opiekuna.
- Obsługujemy gości z Zakopanego, Białki Tatrzańskiej, Bukowiny Tatrzańskiej,
  Poronina, Kościeliska i Murzasichla.

## Strony
- /quady-zakopane/ — wyprawy quadami i ATV
- /buggy-zakopane/ — wyprawy buggy 4×4
- /skutery-sniezne-zakopane/ — skutery śnieżne
- /cennik/ — pełny cennik
- /kontakt/ — dane kontaktowe i dojazd
```

**`robots.txt` — nie blokuj crawlerów AI.**

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://zakoextreme.pl/sitemap.xml
```

> To jest jedna z częstszych pomyłek: domyślne szablony bezpieczeństwa blokują `GPTBot`.
> Dla firmy, która **żyje z tego, że ktoś ją znajdzie**, to jest strzał we własną stopę.
> `Google-Extended` musi być dozwolony, żeby treść mogła trafić do AI Overviews.

---

# 7. Wydajność — bo 95,9% ruchu to telefon w górach

Core Web Vitals nie są tu „dobrą praktyką". Są warunkiem, żeby ktokolwiek zobaczył stronę.
21 908 z 22 835 sesji to telefon, często na słabym LTE pod Tatrami.

**Cele:**

| Metryka | Cel | Uwaga |
|---|---|---|
| LCP | < 2,0 s (4G) | obraz hero to zwykle LCP — `priority`, AVIF/WebP, właściwy rozmiar |
| INP | < 200 ms | uwaga na widżet SlotWise |
| CLS | < 0,05 | rezerwuj wysokość na hero, sticky bar i widżet rezerwacji |
| Waga pierwszego ekranu | < 310 kB | łącznie z fontami (od 2026-09-10, wcześniej 300 kB) |

**Konkretnie w Next.js:**
- `next/image` wszędzie, `priority` **tylko** na obrazie hero.
- Fonty przez `next/font` z `display: swap`, **maksymalnie dwie rodziny**.
- **Widżet SlotWise ładuj leniwie**, po wejściu w viewport (`IntersectionObserver`),
  a nie w `<head>`. To jest najcięższy element na stronie i nie może blokować LCP.
- Piksele (GA4, Ads, Meta, TikTok) przez GTM z `strategy="afterInteractive"`.
  Nigdy `beforeInteractive`.
- Statyczne generowanie (SSG) albo ISR. Nie ma tu nic, co wymaga SSR per request.

> **Sprawdź to na prawdziwym telefonie, na LTE, nie w DevTools na Wi-Fi.**
> Symulacja „Slow 4G" na światłowodzie nie odtwarza tego, co się dzieje pod Gubałówką.

---

# 8. Sitemap

`sitemap.xml` generowany przez Next.js (`app/sitemap.ts`), nie ręcznie.

Zasady:
- **Tylko strony indeksowalne.** Bez `/dziekujemy/`, bez stron technicznych.
- **Wszystkie strony indeksowalne**, każda raz, w wersji kanonicznej. Liczba rośnie razem z serwisem — po dołożeniu `/galeria/` i `/vouchery/` jest ich **24**. Nie przepisuj jej z pamięci: `curl -s https://zakoextreme.pl/sitemap.xml | grep -c "<loc>"`.
- `lastmod` z realnej daty modyfikacji treści, nie z daty deploya.
- **Nie wpisuj `priority` ręcznie na oko.** Google to ignoruje, a nierówne wartości
  potrafią wprowadzić w błąd przy audycie.
- Zgłoś sitemap w Search Console **osobno dla PL i EN, jeśli używasz właściwości domenowej**
  — albo raz, jeśli jedna właściwość obejmuje całość.

---

# 9. Kolejność wdrożenia SEO

1. Struktura URL i 301 z `02-ARCHITEKTURA-URL.md` — **to jest bramka, reszta bez tego nie ma sensu**.
2. Treść z `03-COPY-NAGLOWKI.md`, ze znacznikami `[[DO POTWIERDZENIA]]` **usuniętymi**
   (nie zostawionymi na produkcji).
3. Meta title/description z sekcji 2.
4. Schema z sekcji 3, zwalidowana w Rich Results Test.
5. Hreflang z sekcji 4, sprawdzony w obie strony.
6. `llms.txt`, `robots.txt`, sitemap.
7. Wydajność — pomiar na prawdziwym urządzeniu.
8. **Dopiero teraz** Robert podmienia URL-e w Google Ads.

> Punkt 8 jest ostatni z konkretnego powodu opisanego w `02` §5.
> Podmiana URL-i w reklamach przed publikacją strony to kilkaset złotych dziennie
> wydane na błędy 404.
