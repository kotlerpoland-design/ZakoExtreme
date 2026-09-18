# `/buggy-zakopane/` — architektura treści

**Wersja:** 1.2 · **Data:** 2026-09-11 · **Status:** **wdrożona 2026-09-11** (`app/[locale]/buggy-zakopane/page.tsx`, testy `tests/buggy.spec.ts`), **cennik potwierdzony** (§6)
**Szablon:** T1 (produktowy) z `docs/ARCHITEKTURA-INFORMACJI.md` §3, z odstępstwami opisanymi w §4
**Lustro EN:** `/en/buggy-tours-zakopane/`
**Strona pokrewna:** `/buggy-bialka-bukowina/` — patrz §8, dane zmieniają jej rangę

> **Odstępstwa wdrożenia od tego dokumentu (2026-09-11):**
> - **Telefon nie jest CTA** (decyzja właścicielki 2026-09-10, CLAUDE.md) — „Zadzwoń" z tabeli w §4 zastępuje „Rezerwuj online";
>   numer zostaje w tabeli dojazdu, sekcji Kontakt i przy FAQ. Z meta description (§10) wypadł numer telefonu.
> - **Hero = ten sam render co slajd buggy na stronie głównej** (`media.hero.buggy`), nie zdjęcie ze starej strony.
> - **Cennik = trzy bloki pod sobą**: buggy 2-os. na grzbiecie góry z listą „W cenie", 6-os. pod `#buggy-6-osobowe`, Maverick
>   pod `#maverick-xrs`. Id wariantów buggy: `buggy-standard-1h` … (osobne `item_id` w `select_item`, §11).
> - **H2 „Wynajem buggy w Zakopanem"** (§5) = sekcja 8 „— jak to działa" z trzema krokami wyprawy (jak na skuterach); bez zdjęcia.
> - **Sezon przejściowy**: lead z §5 + zdanie „Skutery śnieżne wracają w listopadzie"; meta description = to samo zdanie leadu
>   (title wspólny — §10 nie daje osobnego copy). Zima = stan standardowy (blokada F otwarta).
> - **Link do `/buggy-bialka-bukowina/`** (§6, §8) czeka na tę stronę; w tabeli dojazdu Białka jest podświetlona (`highlight="bialka"`).
> - Ceny potwierdzone 2026-09-11 (§6): za pojazd, 2-os. od 500 zł; 6-os. jako **cztery karty** osoby × czas („DO 4 OSÓB" / „DO 6 OSÓB",
>   decyzja: „do", nie „dokładnie"). Blokady A/B/C zamknięte; otwarte zostaje, czy cena quada jest za osobę (03-COPY §8 poz. 18).
> - Galeria: 5 pierwszych zdjęć grupy buggy podstrony `/galeria/`; kafle i „Zobacz galerię" → `/galeria/#buggy`.

---

## 1. Po co ta strona

Buggy to **największa pojedyncza grupa reklam w koncie — 17 z 56 reklam** — a jednocześnie
produkt, dla którego brief nie miał potwierdzonego zdjęcia. Ta strona jest ważniejsza,
niż sugeruje sam wolumen kliknięć.

| Metryka | Wartość | Kontekst |
|---|---:|---|
| Frazy | 70 | wszystkie warianty pisowni |
| Wyświetlenia | **4 996** | |
| Kliki | **918** | |
| Konwersje | 106 | |
| Koszt konwersji | 27,80 zł | podobnie jak quady (28,90), 4,5× drożej niż skutery |

**Trzy role tej strony, w kolejności ważności:**

1. **Sezon przejściowy (marzec–czerwiec) — to jest strona ratunkowa.** To najdroższy okres
   w koncie: 34,77 zł za konwersję w marcu wobec 4,41 zł w sierpniu. Ludzie przychodzą
   po skutery, których nie ma. **Buggy jest tym, co można im sprzedać zamiast.**
2. **Lato** — drugi filar obok quadów.
3. **Odpowiedź na „co z dzieckiem" bez podawania wieku** — przez buggy 6-osobowe,
   którym prowadzi dorosły. Brief nazywa ten produkt najbardziej niedocenionym w ofercie.

---

## 2. Kto tu wchodzi

| Intencja | Wolumen | Uwaga |
|---|---:|---|
| **Produktowa ogólna** | `buggy zakopane` **2 596 wyśw / 538 klików** | fraza wiodąca |
| **Lokalna** | 16 fraz, **1 409 wyśw, 207 klików** | **28% całego ruchu buggy** — patrz §8 |
| **Wynajem** | `wynajem buggy zakopane` 106, `buggy zakopane wynajem` 88 | ~200 wyśw |
| **Cenowa** | 4 frazy, 348 wyśw, 50 klików | **73% z tego to Białka**, nie Zakopane |
| **Markowa** | `maverick zakopane` 55 wyśw / 9 klików | realna, choć mała |

### Najmocniejsze frazy

```
buggy zakopane                      2 596 wyśw /  538 klików
buggy białka tatrzańska               721 /  94
zakopane buggy                        260 /  52
buggy białka tatrzańska cennik        255 /  39
buggy bialka tatrzanska                119 /  24
białka tatrzańska buggy                109 /  22
wynajem buggy zakopane                 106 /  21
buggy bukowina tatrzańska               75 /  14
maverick zakopane                       55 /   9
```

### Dwa zera, które są równie ważne jak liczby

| Temat | Wolumen | Wniosek |
|---|---:|---|
| **buggy + grupy / integracje / firmy** | **0** | brak podstaw do sekcji SEO; jako oferta może istnieć |
| **buggy + rodzina / dzieci** | **0** | **buggy 6-osobowe nie ma żadnego popytu wyszukiwarkowego** |
| buggy 6-osobowy / wieloosobowy | 4 wyśw | to samo |

> **To nie jest argument przeciw buggy 6-osobowemu — to jest instrukcja, gdzie je umieścić.**
> Ten produkt nie przyciągnie ruchu. Jego wartość polega na tym, że **odpowiada na obiekcję
> rodzica już będącego na stronie**, i to bez podawania ani jednej liczby lat.
> Ma być **widoczny, nie wyszukiwalny** — mocna karta w cenniku, nie sekcja pod frazę.

Ta sama logika dotyczy porównania quad/buggy: genuinalne `quady buggy zakopane` to 14 wyświetleń.
To obiekcja do FAQ, nie temat na sekcję.

---

## 3. Trzy stany sezonowe

Ta strona jako jedyna zmienia **rolę**, nie tylko hero.

| | **PRZEJŚCIOWY** (III–VI) | **LATO** (VII–IX) | **ZIMA** (XI–II) |
|---|---|---|---|
| Rola | **produkt główny** | filar obok quadów | produkt drugi po skuterach |
| Hero | „przygoda bez śniegu" | standardowy | standardowy |
| Zdanie wiodące | odnosi się wprost do braku śniegu | widoki, 4×4 | 4×4 zimą *(o ile jeżdżą)* |
| Wzmianka o skuterach | **„Skutery śnieżne wracają w listopadzie"** — jedno zdanie | brak | link do skuterów |
| Kolejność w menu | 1. pozycja | 2. pozycja | 2. pozycja |

**Stan przejściowy jest tu najważniejszy i najbardziej niedoceniony.** Marzec–czerwiec
to 26 131 zł wydane na 961 konwersji. Człowiek, który trafia tu w kwietniu, przyszedł
po skuter śnieżny. Zadaniem hero jest przechwycić go, a nie udawać, że śnieg leży.

> **Nie pokazujemy wtedy skuterów w ofercie.** Jedno zdanie o listopadzie i tyle.

Sterowanie: `config/season.ts`.

---

## 4. Architektura sekcji

⭐ = obowiązkowe.

| # | Sekcja | Zadanie | Zawartość | CTA | Event |
|---|---|---|---|---|---|
| 1 ⭐ | **Hero** | test 5 sekund + różnicowanie od quada | H1 · zdanie o 4×4 · **cena od** · ★ 4,8 · ponad 800 opinii · „blisko centrum · 24 h" · zdjęcie buggy | **Zadzwoń** · Sprawdź wolne terminy | `phone_click{hero}` |
| 2 ⭐ | **Pasek zaufania + pasek miejscowości** | lęki + 28% ruchu lokalnego | 4 ikony; pod nimi linia z **Białką na pierwszym miejscu**, kotwica do §7 | — | — |
| 3 ⭐ | **Cennik — trzy produkty** | to jest strona trójproduktowa | 3a buggy 2-os. (warianty czasowe) · 3b **buggy 6-osobowe** · 3c Maverick XRS · pod spodem „co zawiera cena" | Zarezerwuj ten wariant | `select_item` |
| 4 ⭐ | **Rezerwacja** `#rezerwacja` | jedna ścieżka | widżet SlotWise (`embed.js`) lazy | Rezerwuj | lejek |
| 5 ⭐ | **Jak wyglądają trasy** | 4×4 tam, gdzie quad nie wjedzie | galeria — **zdjęcia buggy istnieją**, §12 | — | — |
| 6 ⭐ | **Skąd do nas dojedziesz** | **207 klików lokalnych** | tabela z czasami, link do `/buggy-bialka-bukowina/` | Zadzwoń | `directions_click` |
| 7 | **Dla kogo** | tu mieszka buggy 6-osobowe | pary · **rodziny → buggy 6-os.** · grupy · wieczory kawalerskie | Zadzwoń | `phone_click{pricing}` |
| 8 ⭐ | **FAQ** | snippet + obiekcje | §9 | „Nie wiesz, co wybrać? Zadzwoń." | `faq_open` |
| 9 ⭐ | **Opinie** | dowód | 3 cytaty, ręcznie wybrane | — | — |
| 10 ⭐ | **Domknięcie** | telefon + NAP | duży telefon · adres · mapa | Zadzwoń | `phone_click{footer}` |

### Czym ta strona różni się od skuterów i quadów

**To jest strona trójproduktowa, nie trójwariantowa.** Skutery mają jeden produkt w trzech
długościach. Buggy ma **trzy różne pojazdy**: dwuosobowe, sześcioosobowe i Maverick.
Sekcja cennika musi to odzwierciedlać strukturalnie — trzy bloki, a nie trzy karty w rzędzie.

**Różnicowanie od quada idzie do hero, nie do osobnej sekcji.** Kto wpisał „buggy zakopane",
już wybrał buggy. Jedno zdanie w hero wystarczy, pełna odpowiedź siedzi w FAQ.

**Cennik nie awansuje tak wysoko jak na skuterach.** Tam intencja cenowa to 896 klików,
tu 50 — i w większości dotyczy Białki. Cena „od" zostaje w ekranie 1, ale pełny cennik
nie musi wypychać galerii.

---

## 5. Copy — nagłówki i frazy

### H1

```
Buggy 4×4 w Zakopanem — górska przygoda z napędem na cztery koła
```

Zawiera frazę wiodącą i lokalizację.

### Zdanie pod H1 (lato i zima)

```
Buggy prowadzisz sam, ale nie jedziesz sam — instruktor prowadzi grupę
na sprawdzonej, legalnej trasie. Napęd 4×4 radzi sobie tam, gdzie quad już nie wjedzie.
```

### Zdanie pod H1 (sezon przejściowy)

```
Sezon skuterowy się skończył, trasy są przejezdne. Buggy z napędem 4×4
na widokowych trasach nad Zakopanem — z instruktorem, bez prawa jazdy.
```

> To zdanie robi całą robotę stanu przejściowego. Adresuje wprost człowieka,
> który szukał skuterów, nie udając, że nic się nie stało.

### H2 — z przypisanymi frazami

| H2 | Fraza | Wolumen |
|---|---|---:|
| **Buggy Zakopane — cennik i co zawiera cena** | `buggy zakopane cennik`, `cena` | 348 wyśw |
| **Buggy 6-osobowe — cała rodzina jednym pojazdem** | — *(zero popytu, sekcja konwersyjna)* | 0 |
| **Maverick XRS 240 KM** | `maverick zakopane` | 55 wyśw |
| **Wynajem buggy w Zakopanem** | `wynajem buggy zakopane` | ~200 wyśw |
| **Zarezerwuj termin** | — | — |
| **Jak wyglądają nasze trasy** | — | — |
| **Skąd do nas dojedziesz** | klaster lokalny | 207 klików |
| **Dla kogo są wyprawy buggy** | — | — |
| **Pytania o buggy** | — | — |

---

## 6. Cennik — rozbieżność, którą trzeba rozstrzygnąć przed publikacją

> **Rozstrzygnięte 2026-09-11 — właściciel potwierdził cennik, cena ZA POJAZD.** Odpowiada na wszystkie trzy pytania
> poniżej (A: za pojazd; B: ULTRA 3 h istnieje; C: 6-os. od 550 zł, z wariantami na osoby i czas):
>
> | Produkt | Wariant | Cena od |
> |---|---|---:|
> | Buggy 2-os. (do 2 osób) | 1 h · 2 h · 3 h | 500 · 900 · 1200 zł |
> | Buggy 6-os., do 4 osób | 1 h · 2 h | 550 · 1000 zł |
> | Buggy 6-os., do 6 osób | 1 h · 2 h | 650 · 1200 zł |
> | Maverick XRS (do 2 osób) | 1 h | 750 zł |
>
> Wdrożone w `content/prices.ts` (jedno źródło), na kartach (`unit` „za buggy · do 2 osób", nagłówki „DO 4 OSÓB"/„DO 6 OSÓB"),
> w FAQ `cena-buggy`, meta i schema. Brief §3 i CLAUDE.md zaktualizowane: quad i buggy **nie** mają już wspólnej drabinki.
> Reszta tej sekcji to zapis stanu sprzed odpowiedzi — zostaje jako uzasadnienie, dlaczego to było pilne.

**To był najpoważniejszy problem tej strony i najważniejsza pozycja do wyjaśnienia
w całym projekcie po cenniku skuterów.**

### Co mówi brief

| Wariant | Czas | Cena |
|---|---|---:|
| STANDARD | 1 h | od 250 zł |
| PREMIUM | 2 h | od 450 zł |
| ULTRA | 3 h | od 650 zł |
| Buggy 6-os. STANDARD | 1 h | od 550 zł |
| Buggy 6-os. PREMIUM | 2 h | od 1000 zł |

Brief mówi wprost: *„quad i buggy mają TĘ SAMĄ drabinkę"*.

### Co pokazuje stara strona

| Wariant | Czas | Osób | Cena |
|---|---|---|---:|
| STANDARD | 60 min | 2 osoby | **500 zł** |
| PREMIUM | 120 min | 2 osoby | **800 zł** |
| BUGGY 6 OSÓB | 60 min | 6 osób | **500 zł** |

### Gdzie to się zgadza, a gdzie nie

| | Brief | Stara strona | Status |
|---|---:|---:|---|
| STANDARD 1 h | 250 | 500 za 2 osoby | **zgadza się, jeśli 250 to cena za osobę** (250 × 2 = 500) |
| PREMIUM 2 h | 450 | 800 za 2 osoby | **nie zgadza się** (450 × 2 = 900 ≠ 800) |
| ULTRA 3 h | 650 | **nie istnieje** | rozbieżność |
| Buggy 6-os. 1 h | 550 | 500 za 6 osób | rozbieżność, stara strona **tańsza** |
| Buggy 6-os. 2 h | 1000 | **nie istnieje** | rozbieżność |

### Dlaczego to jest pilne

Jeśli opublikujemy „od 250 zł", a klient na miejscu zapłaci 500 zł za buggy,
**odtwarzamy dokładnie ten mechanizm, który już generuje jedynki**:
w negatywnych opiniach powtarza się zarzut *„300 za osobę, 600 za dwie — zdzierstwo"*,
czyli człowiek porównujący cenę ze strony z ceną na miejscu.

Różnica 250 → 500 jest większa niż ta, która już kosztuje firmę opinie.

### Trzy pytania do Piotrka, w tej kolejności

1. **Czy 250 zł przy buggy to cena za osobę, czy za pojazd?**
2. **Czy buggy ma wariant ULTRA (3 h)?** Brief mówi tak, strona nie.
3. **Ile naprawdę kosztuje buggy 6-osobowe — 500 czy 550 zł?** I czy ma wariant dwugodzinny?

Do czasu odpowiedzi `content/prices.ts` dla buggy zostaje z wartościami z briefu,
ale **karta cenowa buggy musi jasno mówić, ile osób obejmuje cena** — patrz §13 pkt 2.

### Co zawiera cena — i dlaczego to nie jest jedna odpowiedź dla całego serwisu

Stara strona buggy: **„wynajem buggy / ATV, kask, szkolenie oraz paliwo"**
Stara strona skuterów: **„skuter, kask, szkolenie, paliwo i poczęstunek"**

**Listy są różne — skutery mają poczęstunek, buggy nie.** To znaczy, że FAQ
„co jest wliczone w cenę" **nie może mieć jednej odpowiedzi na wszystkich stronach**.
Każdy produkt potrzebuje własnej. Obie listy są `[[DO POTWIERDZENIA]]`.

---

## 7. Buggy 6-osobowe — produkt bez popytu i z najwyższą wartością

Zero wyświetleń w wyszukiwarce. A mimo to:

- to **jedyny produkt, który odpowiada na „czy dziecko może z nami jechać"
  bez podawania jakiegokolwiek wieku** — bo prowadzi dorosły
- rozwiązuje problem grupy, która nie chce dzielić się na osobne pojazdy
- przy cenie ze starej strony (500 zł za 6 osób) jest **najtańszy per osoba w całej ofercie**

**Gdzie go umieścić:** karta w cenniku (§4 poz. 3b) z widoczną etykietą *„cała rodzina
jednym pojazdem"*, plus wzmianka w sekcji „Dla kogo" i w FAQ o dzieciach.

**Gdzie go NIE umieszczać:** w H1, w meta description, jako osobna sekcja pod frazę.
Nie ma frazy, którą mógłby wygrać.

---

## 8. Sekcja lokalna — Białka jest tu większa niż gdziekolwiek indziej

### Dane

```
buggy białka tatrzańska              721 wyśw /  94 kliki
buggy białka tatrzańska cennik       255 /  39
buggy bialka tatrzanska              119 /  24
białka tatrzańska buggy              109 /  22
wypożyczalnia buggy białka tatrzańska 54 /  10
buggy bukowina tatrzańska             75 /  14
```

**Sama Białka to ~1 258 wyświetleń i 189 kliknięć — około jednej czwartej całego
ruchu buggy.** Intencja cenowa w Białce (255 wyświetleń) jest **czterokrotnie silniejsza**
niż cenowa w Zakopanem (65 wyświetleń).

### Konsekwencja

Pakiet szacował `/buggy-bialka-bukowina/` na „~40 fraz, ~120 klików" i traktował ją
jako najmniejszą ze stron lokalnych. **Dane mówią 207 klików i 1 409 wyświetleń.**

Ta strona zasługuje na traktowanie poważniejsze niż przypis:
- własny, mocny cennik (bo tam siedzi intencja cenowa)
- realny opis dojazdu z Białki i Bukowiny
- link z tej strony w sekcji 6, widoczny, nie w stopce

---

## 9. FAQ dla tej strony

| # | Pytanie | Status |
|---|---|---|
| 1 | **Ile kosztuje wyprawa buggy w Zakopanem?** | ⛔ zależy od §6 — **najwyższy priorytet** |
| 2 | **Czy cena jest za osobę, czy za pojazd?** | ⛔ §6 — pytanie, które chroni przed jedynkami |
| 3 | **Co jest wliczone w cenę?** | ⛔ własna odpowiedź dla buggy, inna niż dla skuterów |
| 4 | **Co będzie lepsze — quad czy buggy?** | ⛔ kandydat ze starej strony, odpowiedź istnieje |
| 5 | **Czy na buggy potrzebne jest prawo jazdy?** | ✅ mamy |
| 6 | **Czy można jechać z dzieckiem?** | ✅ mamy — tu prowadzi do buggy 6-osobowego |
| 7 | **Czy można zabrać pasażera?** | ⛔ kandydat ze starej strony |
| 8 | **Ile trwa wyprawa?** | ✅ mamy |
| 9 | **Jak zarezerwować termin?** | ✅ mamy |
| 10 | **Skąd startujemy?** | ⛔ kandydat ze starej strony — dobre pytanie lokalizacyjne, którego nie mieliśmy |

---

## 10. Meta, schema, wydajność

### Meta (lato)

```
Title:       Buggy 4×4 Zakopane — wyprawy z instruktorem | ZakoExtreme
Description: Wyprawy buggy 4×4 nad Zakopanem z instruktorem, po legalnych trasach.
             Buggy 6-osobowe dla całej rodziny. Bez prawa jazdy. Zadzwoń: 539 320 700.
```

> **Celowo bez kwoty w description do czasu rozstrzygnięcia §6.** Pakiet proponował
> „od 250 zł" i „6-osobowe od 550 zł" — obie liczby są przedmiotem rozbieżności.
> Po potwierdzeniu wracają, bo cena w opisie podnosi CTR.

Sezon przejściowy ma własny title i description, przez `generateMetadata()`.

### Schema

- `Product` + `AggregateOffer`; `lowPrice`/`highPrice` dopiero po rozstrzygnięciu §6
- `alternateName`: `"buggy zakopane"`, `"bugi zakopane"`, `"wynajem buggy Zakopane"`
- `availability`: `InStock` przez cały rok *(buggy nie ma sezonu — do potwierdzenia, czy jeżdżą zimą)*
- `FAQPage` z tego samego obiektu co widoczna treść
- `BreadcrumbList`
- **Bez `aggregateRating`, bez `Review`**

### Hreflang

Dwukierunkowo z `/en/buggy-tours-zakopane/`, `x-default` → PL.

### Wydajność

Zdjęcie hero to LCP — `priority`, AVIF/WebP. Reszta galerii leniwie.
SlotWise przez `IntersectionObserver`. Cel: LCP < 2 s na 4G, pierwszy ekran < 300 kB.

---

## 11. Tracking

```js
{ page_type: 'product', product: 'buggy', language: 'pl' | 'en' }
```

Standardowy zestaw z `lib/tracking.ts`. Jedna rzecz specyficzna dla tej strony:

> **Rozdziel `item_id` dla trzech produktów** — `buggy-standard-1h`, `buggy6-standard-1h`,
> `maverick-1h`. Po miesiącu `select_item` powie, czy buggy 6-osobowe faktycznie jest
> „najbardziej niedocenionym produktem", czy tylko tak nam się wydaje. To jedyny sposób,
> żeby to zweryfikować — w wyszukiwarce nie zostawia śladu.

---

## 12. Materiały — jedna dobra wiadomość

Brief mówi: *„Nie ma potwierdzonego zdjęcia buggy… buggy to 17 z 56 reklam w koncie,
czyli największa pojedyncza grupa, a nie mamy do niej zdjęcia."*

**Stara strona ma zdjęcia buggy** — niebieski CFMOTO w hero, flota w tle, pojazdy
w kartach cennika, Can-Am przy sekcji „dlaczego warto". Blokada nr 12 z briefu
jest więc do zamknięcia bez sesji zdjęciowej: **wystarczy poprosić programistę
o oryginały w wysokiej rozdzielczości.**

To zmienia priorytet — z „trzeba zorganizować zdjęcia" na „trzeba poprosić o pliki".

---

## 13. Co to znaczy dla projektu graficznego

1. **Cennik to trzy bloki produktowe, nie trzy karty w rzędzie.** Buggy 2-osobowe
   z wariantami czasowymi, buggy 6-osobowe, Maverick. Każdy blok ma inną wagę wizualną.
2. **Każda karta cenowa musi mówić, ile osób obejmuje cena.** To nie jest detal
   typograficzny — to jest zabezpieczenie przed mechanizmem, który już generuje jedynki.
   Liczba osób obok ceny, tym samym stopniem, nie w przypisie.
3. **Buggy 6-osobowe potrzebuje wyróżnienia, mimo zerowego popytu.** Etykieta
   „cała rodzina jednym pojazdem", inne tło albo szersza karta. To jedyny produkt
   odpowiadający na pytanie o dzieci bez podawania wieku.
4. **Maverick jako górna kotwica cenowa.** 240 KM to konkret, który warto pokazać dużą
   liczbą. Nie musi być duży powierzchniowo — musi być ostatni i najdroższy.
5. **Białka wchodzi do pierwszego przewinięcia.** Jedna linia w pasku miejscowości,
   Białka pierwsza. To jedna czwarta ruchu tej strony.
6. **Zdjęcia buggy są kolorowe — niebieskie i czerwone pojazdy na zielonej trawie.**
   To zupełnie inna paleta niż zimowa biel skuterów. Akcent marki musi działać na obu,
   inaczej dostaniemy dwa różne serwisy zamiast jednego.
7. **Sezon przejściowy potrzebuje własnego hero**, nie tylko podmienionego nagłówka.
   To jedyny moment w roku, kiedy ta strona jest najważniejsza w serwisie.

---

## 14. Czego nie przenosimy ze starej strony

| Element | Dlaczego |
|---|---|
| **Opisy kart mówiące o „quadach" na stronie buggy** | copy wklejone ze strony quadów — trzy karty „Co oferujemy?" opisują wynajem quadów |
| „Czy jazda buggy daje frajdę?" | pytanie-wypełniacz, trzeci raz w serwisie |
| Zduplikowane pytanie o prawo jazdy | „Czy muszę mieć prawo jazdy, żeby jechać buggy?" i „Czy potrzebuję prawa jazdy?" to to samo |
| Widget opinii z Google | nieprzefiltrowany — na innych podstronach wpuszcza oceny 1★ i 3★ |
| Karta „Przywiezienie własnego ATV" | **zero fraz w danych** — jeśli usługa istnieje, jedno zdanie w ofercie |
| Sekcja „buggy dla grup i osób indywidualnych" jako blok SEO | `buggy + grupy` to **zero wyświetleń**; treść może zostać, nagłówek pod frazę nie ma sensu |
| Urwany tekst pod FAQ | pozostałość po edycji, obecna na wszystkich podstronach |
| Mapa ze stopki | współrzędne oddalone o ~2,5 km od faktycznej lokalizacji |
| Hero bez ceny, telefonu i oceny | to jest problem, który naprawiamy |

---

## 15. Blokady

| # | Czego brakuje | Blokuje | Priorytet |
|---|---|---|---|
| ~~**A**~~ | ~~Czy 250 zł to cena za osobę, czy za pojazd~~ — **zamknięte 2026-09-11**: cena za pojazd, 2-os. od 500 zł (§6) | — | — |
| ~~**B**~~ | ~~Czy buggy ma wariant ULTRA (3 h)~~ — **zamknięte 2026-09-11**: tak, od 1200 zł | — | — |
| ~~**C**~~ | ~~Cena buggy 6-osobowego~~ — **zamknięte 2026-09-11**: 550 / 650 zł za 1 h (do 4 / do 6 osób), 1000 / 1200 zł za 2 h | — | — |
| D | Co zawiera cena — **własna lista dla buggy** (dziś: lista quad/buggy z `content/included.ts`, potwierdzona 2026-09-10) | cennik, FAQ-3 | 2 |
| E | Czy są wyprawy bez przewodnika | H1, pasek zaufania, FAQ | 2 |
| F | Czy buggy jeżdżą zimą | stan zimowy, `availability` | 3 |
| G | Czasy dojazdu z Białki i Bukowiny | sekcja 2 i 6 | 3 |
| H | Zdjęcia buggy w wysokiej rozdzielczości | hero, galeria — **pliki istnieją**, §12 | 3 |
| I | Skąd dokładnie startują wyprawy | FAQ-10 | 4 |

~~**A, B i C to jedno pytanie do Piotrka: „pokaż mi aktualny cennik buggy".**~~ Odpowiedziane 2026-09-11 (§6).
Pierwszy ekran stoi na „od 500 zł" — cenie za buggy, którą klient faktycznie zapłaci.
