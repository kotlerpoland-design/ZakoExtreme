# `/skutery-sniezne-zakopane/` — architektura treści

**Wersja:** 1.1 · **Data:** 2026-09-11 · **Status:** **wdrożone** (`app/[locale]/skutery-sniezne-zakopane/page.tsx`, copy w `messages/*.json` → `skutery`, testy `tests/snowmobiles.spec.ts`)
**Szablon:** T1 (produktowy) z `docs/ARCHITEKTURA-INFORMACJI.md` §3, z odstępstwami opisanymi niżej
**Lustro EN:** `/en/snowmobile-tours-zakopane/` — patrz §10, to osobny produkt, nie tłumaczenie

> **Co zmieniło się przy wdrożeniu (2026-09-11):** cennik, lista „w cenie", brak prawa jazdy i instruktor **potwierdzone** przez
> właścicielkę (blokady A–D zamknięte, §12). Zgodnie z decyzją 2026-09-10 (CLAUDE.md) **telefon nie jest CTA** — tam, gdzie tabela §4
> pisze „Zadzwoń", na stronie jest „Rezerwuj online" → `#rezerwacja`; numer zostaje w fallbacku rezerwacji poza sezonem, FAQ, dojeździe,
> Kontakcie i stopce. Zero „24 h" poza „Rezerwacja online 24 h" (bramka A8) — zapisy „czynne 24 h" w §4 i §9 są nieaktualne.
> Poza sezonem cena „od 200 zł" **zostaje w hero** (to fakt i klaster cenowy nr 1); notkę o listopadzie niesie lead hero z linkiem
> do oferty letniej i sekcja rezerwacji (bez kalendarza: notka + telefon + „Zobacz ofertę letnią"). Sekcja 8 „Zanim przyjedziesz"
> weszła jako „Wypożyczalnia skuterów śnieżnych — jak to działa" (trzy kroki wyprawy); „co zabrać" nadal niepotwierdzone (blokada E).

---

## 1. Po co ta strona

To **najważniejsza strona produktowa w całym serwisie** — nie dlatego, że tak uważamy,
tylko dlatego, że tak mówi konto.

| Metryka | Skutery | Quady | Co z tego wynika |
|---|---:|---:|---|
| Kliki | **11 558** | 5 016 | 2,3× większy wolumen |
| Koszt konwersji | **6,17 zł** | 28,90 zł | **4,7× taniej** |
| CPC | 1,49 zł | 3,32 zł | 2,2× tańszy klik |
| Fraz w klastrze | 714 | 1 075 | mniej fraz, więcej ruchu — frazy są grubsze |

Najlepiej konwertujący produkt w firmie. Zimą jest bohaterem strony głównej
i nic go nie zastępuje.

**Sezon:** listopad – luty. Szczyt to **styczeń** (14 263 kliki, 5,10 zł/konw)
i **grudzień** (9 082 kliki, 4,80 zł/konw) — dwa najlepsze miesiące w roku po sierpniu.

**Zadanie strony w jednym zdaniu:** doprowadzić człowieka, który jest już na Podhalu
i wpisał „skutery śnieżne zakopane cennik", do telefonu albo rezerwacji — pokazując cenę,
zanim zdąży ją gdzieś indziej sprawdzić.

---

## 2. Kto tu wchodzi — cztery intencje, każda z własną sekcją

| Intencja | Wolumen | Czego szuka | Gdzie ją obsługujemy |
|---|---:|---|---|
| **Produktowa ogólna** | `skutery śnieżne zakopane` 3 968 klików | co to jest, ile kosztuje | hero + cennik |
| **Cenowa** | 34 frazy, **4 275 wyśw, 896 klików** — największy klaster cenowy w koncie | konkretna kwota | cennik wysoko, §5 |
| **Lokalna** | 60 fraz, **4 879 wyśw, 728 klików, 118 konw** | jak daleko to jest ode mnie | pasek miejscowości + tabela dojazdu, §6 |
| **Wypożyczalniowa** | 54 frazy, **2 666 wyśw, 493 kliki, 68 konw** | czy da się wynająć | H2 i treść, §4 |

Do tego **ruch angielski: 153 frazy, 12 354 wyświetlenia, 2 611 klików, 1 028 konwersji**
— obsługiwany osobną stroną, §10.

### Najmocniejsze pojedyncze frazy

```
skutery śnieżne zakopane                 3 968 klików
snowmobile zakopane                      1 346 klików
skutery sniezne zakopane (bez diakrytyki)  682 kliki
zakopane snowmobile                        469 klików
zakopane skutery śnieżne                   394 kliki
skutery śnieżne zakopane cennik            385 klików
wypozyczalnia skuterow snieznych zakopane   91 klików
```

> **Warianty bez polskich znaków mają realny wolumen** — `skutery sniezne zakopane` to 682 kliki,
> więcej niż `buggy zakopane` (538). Obsługujemy je przez `alternateName` w schema
> i **jedno** naturalne wystąpienie w cytowanym pytaniu FAQ. Nie przez upychanie w treści.

### Dosłowne pytanie, które trzeba wygrać

> `ile kosztuja skutery sniezne w zakopanem` — 135 wyświetleń, 25 klików

To **najmocniejsze pytanie zadane pełnym zdaniem w całym koncie**. Idealny materiał
pod featured snippet i AI Overviews — pod warunkiem, że mamy cenę (§5).

---

## 3. Dwa stany sezonowe

Strona istnieje cały rok i **nigdy nie jest przekierowywana** — pracuje na SEO także latem.
Zmienia się hero, CTA i dostępność rezerwacji.

| | **SEZON** (XI–II) | **POZA SEZONEM** (III–X) |
|---|---|---|
| Hero | pełny, z ceną i rezerwacją | „Sezon skuterowy zaczyna się w listopadzie" |
| CTA główne | Zadzwoń | Zadzwoń — powiemy, kiedy ruszamy |
| CTA drugie | Sprawdź wolne terminy | **Zobacz ofertę letnią** → `/quady-zakopane/` |
| Cennik | widoczny | **widoczny** (SEO — to klaster cenowy nr 1) |
| Widżet rezerwacji | aktywny | ukryty, bez pustego kalendarza |
| `Offer.availability` | `InStock` | `PreOrder` |
| Galeria | zimowa | zimowa (pokazujemy, co będzie) |

Sterowanie: `config/season.ts`, `getSeason() === 'winter'`.
Nadpisanie ręczne obowiązkowe — Piotrek musi móc powiedzieć „w tym roku ruszamy 20 listopada".

> **Nie pokazujemy pustego kalendarza poza sezonem.** Widżet, który nie ma wolnych terminów,
> wygląda jak firma, która nie działa.

---

## 4. Architektura sekcji

Kolejność wynika z wolumenu intencji, nie z przyzwyczajenia.
⭐ = obowiązkowe. Odstępstwa od szablonu T1 opisane pod tabelą.

| # | Sekcja | Zadanie | Zawartość | CTA | Event |
|---|---|---|---|---|---|
| 1 ⭐ | **Hero** | test 5 sekund | H1 · zdanie · **cena od** · ★ 4,8 · ponad 800 opinii · „blisko centrum · 24 h" · zdjęcie zimowe | **Zadzwoń** · Sprawdź wolne terminy | `phone_click{hero}` |
| 2 ⭐ | **Pasek zaufania + pasek miejscowości** | zamknąć lęki i obsłużyć lokalnych | 4 ikony; **pod nimi jedna linia**: „Dojeżdżają do nas z Białki, Bukowiny, Poronina, Kościeliska i Murzasichla" z kotwicą do §6 | — | — |
| 3 ⭐ | **Cennik + co obejmuje cena** | intencja nr 2 w wolumenie | 3 karty · pod nimi lista „w cenie" | Zarezerwuj ten wariant | `select_item` |
| 4 ⭐ | **Rezerwacja** `#rezerwacja` | jedna ścieżka | widżet SlotWise (`embed.js`) lazy | Rezerwuj | lejek e-commerce |
| 5 ⭐ | **Jak wyglądają zimowe trasy** | persona planująca i ruch z Meta | 4–6 zdjęć + wideo z Meta, bez autoplay dźwięku | — | — |
| 6 ⭐ | **Skąd do nas dojedziesz** | **728 klików lokalnych** | pełna tabela z czasami + linki do stron lokalnych | Zadzwoń | `directions_click` |
| 7 | **Dla kogo** | pary · rodziny · grupy · wieczory kawalerskie | 4 kafle | Zadzwoń | `phone_click{pricing}` |
| 8 ⭐ | **Zanim przyjedziesz** | obniżyć wysiłek | co zabrać · jak przebiega wyprawa · ile trwa przygotowanie | — | — |
| 9 ⭐ | **FAQ** | snippet + obiekcje | §7 | „Nie wiesz, co wybrać? Zadzwoń." | `faq_open` |
| 10 ⭐ | **Opinie** | dowód | 3 prawdziwe cytaty, **ręcznie wybrane** | — | — |
| 11 ⭐ | **Domknięcie** | telefon + NAP | duży telefon · adres · mapa · 24 h | Zadzwoń | `phone_click{footer}` |

### Trzy odstępstwa od szablonu T1 i dlaczego

**Cennik wchodzi na pozycję 3, przed galerię.** W T1 cennik jest na 3, ale galeria na 5 —
tu różnica jest taka, że intencja cenowa na skuterach to 896 klików i jest drugą co do wielkości.
Cena nie może być poniżej zgięcia.

**Pasek miejscowości w sekcji 2.** Klaster lokalny (728 klików) jest trzecią intencją,
a pełna tabela jest dopiero na 6. Jedna linia w sekcji 2 z kotwicą obsługuje kogoś z Białki
w pierwszym przewinięciu, bez spychania galerii w dół.

**„Skąd do nas dojedziesz" awansuje z 8 na 6.** Na quadach klaster lokalny to margines,
tutaj to 4 879 wyświetleń. Tabela musi być nad FAQ, nie pod.

---

## 5. Copy — nagłówki i frazy

### H1

```
Skutery śnieżne w Zakopanem — wyprawy w Tatry
```

Zawiera frazę wiodącą (3 968 klików) i lokalizację. Krótki, mieści się na 390 px w dwóch liniach.

> **Świadomie bez „z instruktorem" w H1.** Stara strona ma w ofercie wariant „bez przewodnika",
> a FAQ „Czy mogę jechać samodzielnie?" — dopóki to nie jest rozstrzygnięte (blokada B w §12),
> nie wpisujemy obietnicy w H1. W treści piszemy to, co bezsporne.

### Zdanie pod H1

```
Wyprawa skuterem śnieżnym w góry nad Zakopanem, po legalnych trasach.
Zimą to jest najpopularniejsza rzecz, jaką robimy.
```

### H2 — z przypisanymi frazami

| H2 | Fraza, którą obsługuje | Wolumen |
|---|---|---:|
| **Skutery śnieżne Zakopane — cennik i co obejmuje cena** | `skutery śnieżne zakopane cennik`, `cena` | 896 klików |
| **Wypożyczalnia skuterów śnieżnych — jak to działa** | `wypożyczalnia/wynajem skuterów śnieżnych zakopane` | 493 kliki |
| **Zarezerwuj termin** | — | — |
| **Jak wyglądają nasze zimowe trasy** | — | — |
| **Skąd do nas dojedziesz** | klaster lokalny | 728 klików |
| **Dla kogo są wyprawy skuterami** | — | — |
| **Zanim przyjedziesz** | `co zabrać` | niski |
| **Pytania o skutery śnieżne** | pytania pełnym zdaniem | 135 wyśw |
| **Opinie** | — | — |

> **Nagłówek cennika jest tu ważniejszy niż gdziekolwiek indziej.** Stara strona ma dobrą
> *treść* cennika („cena obejmuje skuter, kask, szkolenie, paliwo i poczęstunek"),
> ale nagłówek nad nią nie zawiera ani słowa „cennik", ani „skutery śnieżne" —
> czyli nie pracuje na największy klaster cenowy w koncie. Na stronie quadów jest odwrotnie:
> nagłówek dobry, treść uboga. **Bierzemy nagłówek stamtąd, treść stąd.**

### Zdanie obsługujące wariant bez diakrytyki

Jedno, w cytowanym pytaniu FAQ. Nigdzie indziej:

```
H3: Ile kosztują skutery śnieżne w Zakopanem?
```

---

## 6. Cennik — struktura i status

### Drabinka ze starej strony — POTWIERDZONA 2026-09-11 (`content/prices.ts`)

| Wariant | Czas | 1 osoba | 2 osoby |
|---|---|---:|---:|
| STANDARD | 30 min | 200 zł | 250 zł |
| PREMIUM | 60 min | 300 zł | 350 zł |
| ULTRA | 120 min | 550 zł | 600 zł |

> Właścicielka potwierdziła 2026-09-11 cały cennik, dopłatę +50 zł za drugą osobę i listę „w cenie" (skuter · kask · szkolenie ·
> paliwo · poczęstunek). Poniższe uzasadnienie ostrożności zostaje jako historia decyzji. Bramka A2 („nigdy 300 zł") pomija kontekst skuterów.

**Dlaczego to jest mocna poszlaka:** brief podaje dla skuterów wyłącznie „zakres 200–600 zł".
Ten cennik zaczyna się na 200 i kończy na 600. Zgadza się co do złotówki.

**Dlaczego mimo to zostaje `confirmed: false`:** ta sama strona pokazuje 300 zł za quada,
gdzie prawdą jest 250 — a właściciel zareagował na to stanowczo. Rozbieżność między stroną
a tym, co klient słyszy na miejscu, realnie generuje jedynki.

**Pytanie do Piotrka brzmi więc nie „podaj cennik", tylko „czy ten cennik ze strony jest aktualny?".**
To minuta rozmowy zamiast kwadransa, i odblokowuje cały sezon zimowy.

### Uwaga strukturalna

Czasy skuterów (**30 / 60 / 120 min**) są inne niż quadów (60 / 120 / 180 min).
Te same nazwy wariantów znaczą co innego per produkt — `content/prices.ts` to obsługuje,
bo czas jest polem wariantu, nie kolumną globalną.

### Co obejmuje cena — kandydat ze starej strony

```
Skuter · kask · szkolenie · paliwo · poczęstunek
```

Również `[[DO POTWIERDZENIA]]`, ale to gotowa odpowiedź na FAQ „co jest wliczone w cenę"
na wszystkich stronach, nie tylko tej.

### Cena za osobę czy za pojazd

Stary cennik ma kolumny **1 OSOBA / 2 OSOBY** — czyli cena jest za pojazd, a druga osoba
to dopłata. Nowy cennik musi rozdzielić trzy rzeczy wprost, bo ich mylenie jest
udokumentowanym źródłem negatywnych opinii:

```
cena za pojazd  ·  dopłata za drugą osobę  ·  cena za dwa pojazdy
```

---

## 7. FAQ dla tej strony

Kolejność: najpierw największa bariera. Pytania bez potwierdzonej odpowiedzi
nie renderują się (`answer: null`).

| # | Pytanie | Status |
|---|---|---|
| 1 | **Ile kosztują skutery śnieżne w Zakopanem?** | ⛔ zależy od §6 — **pytanie o najwyższym priorytecie** |
| 2 | **Co jest wliczone w cenę?** | ⛔ kandydat ze starej strony |
| 3 | **Czy na skuter śnieżny potrzebne jest prawo jazdy?** | ⛔ inny pojazd i inne przepisy niż quad — **nie kopiować odpowiedzi z quadów** |
| 4 | **Czy jazda skuterem śnieżnym jest trudna?** | ⛔ kandydat ze starej strony |
| 5 | **Co zabrać na wyprawę skuterem śnieżnym?** | ⛔ kandydat ze starej strony |
| 6 | **Kiedy zaczyna się sezon na skutery śnieżne?** | ✅ mamy |
| 7 | **Gdzie dokładnie jesteście?** | ✅ mamy |
| 8 | **Czy można jechać z dzieckiem?** | ✅ mamy — `skutery śnieżne dla dzieci zakopane` to 53 wyśw |
| 9 | **Jak zarezerwować termin?** | ✅ mamy |

Dziś z tej listy renderują się **cztery**. Po jednym telefonie do Piotrka — dziewięć.

---

## 8. Sekcja lokalna — wzmocnienie i konsekwencja architektoniczna

### Dane

| Miejscowość | Wyświetlenia | Kliki |
|---|---:|---:|
| **Białka Tatrzańska** | **1 019** | 127 |
| Bukowina Tatrzańska | 492 | 83 |
| Poronin | 347 | 62 |
| Kościelisko | 298 + 224 | 93 |
| Gubałówka | 293 | 52 |
| Murzasichle | 270 | 52 |

Razem **4 879 wyświetleń, 728 klików, 118 konwersji**.

### Konsekwencja, którą trzeba rozstrzygnąć przed projektem

Architektura przewiduje `/quady-bialka-tatrzanska/` i `/quady-bukowina-tatrzanska/`
z warunkową sekcją zimową. Ale **`skutery śnieżne białka tatrzańska` to 1 019 wyświetleń** —
więcej, niż miała Bukowina, której przyznaliśmy własny URL.

Zimą `/quady-bialka-tatrzanska/` jest złym H1 dla kogoś, kto szukał skuterów.

Trzy opcje, do decyzji:

| Opcja | Za | Przeciw |
|---|---|---|
| **A.** Dwie nowe strony zimowe `/skutery-sniezne-bialka-tatrzanska/` i `…-bukowina…` | pełny message match | +2 strony, więcej treści unikalnej do napisania |
| **B.** H1 stron lokalnych sterowany sezonem | zero nowych URL-i | H1 zmienny w czasie miesza w Search Console i w reklamach |
| **C.** Zostawić jak jest, mocna sekcja zimowa | najtańsze | zimą tracimy message match na największym klastrze lokalnym |

**Rekomendacja: A**, ale dopiero po publikacji pierwszej wersji — to rozbudowa,
nie warunek startu. Do czasu decyzji tabela dojazdu na tej stronie linkuje do stron lokalnych.

---

## 9. Meta, schema, wydajność

### Meta (sezon)

```
Title:       Skutery śnieżne Zakopane — wypożyczalnia | ZakoExtreme
Description: Wyprawy skuterami śnieżnymi w Tatrach, po legalnych trasach.
             Blisko centrum Zakopanego, czynne 24 h. Sprawdź wolne terminy.
```

> Po potwierdzeniu cennika **dopisać „od 200 zł" do description** — intencja cenowa
> to największy klaster na tej stronie, a cena w opisie podnosi CTR.

Poza sezonem title i description zmieniają się razem ze stanem — przez `generateMetadata()`,
nie przez statyczny obiekt.

### Schema

- `Product` + `AggregateOffer`, `lowPrice`/`highPrice` z `content/prices.ts` po potwierdzeniu
- `alternateName`: **`"skutery sniezne zakopane"`** (bez diakrytyki), `"skuter śnieżny Zakopane"`, `"wypożyczalnia skuterów śnieżnych Zakopane"`
- `availability` sterowane sezonem — `PreOrder` poza XI–II
- `FAQPage` generowane z tego samego obiektu co widoczna treść
- `BreadcrumbList`
- **Bez `aggregateRating`, bez `Review`**

### Hreflang

Dwukierunkowo z `/en/snowmobile-tours-zakopane/`, `x-default` → PL.

### Wydajność

Zdjęcie hero to LCP — `priority`, AVIF/WebP. Reszta galerii leniwie.
Widżet SlotWise przez `IntersectionObserver`, nigdy w `<head>`.
Cel: LCP < 2 s na 4G, pierwszy ekran < 300 kB.

---

## 10. Wersja EN — najcenniejsza podstrona w serwisie

**153 frazy, 12 354 wyświetlenia, 2 611 klików, 1 028 konwersji.**

```
snowmobile zakopane        6 043 wyśw / 1 346 klików
zakopane snowmobile        2 097 / 469
snowmobile                 1 170 / 146
snowmobile near me           490 / 134
snowmobiles zakopane         356 / 65
zakopane snowmobile rental   207 / 54
snowmobile zakopane price    195 / 55
```

Angielski konwertuje o 35% taniej niż polski, a ruch EN to **w przeważającej części skutery,
nie quady**. To odwrotnie niż po polsku.

**Trzy rzeczy, które odróżniają EN od PL:**

1. **`snowmobile near me` (490 wyświetleń) to zapytanie geolokalizacyjne.**
   Sekcja **„Where to find us" jest obowiązkowa i musi być w treści**, nie w stopce.
   Model AI musi umieć odpowiedzieć „gdzie to jest" bez zgadywania.
2. **`rental` i `price` są w zapytaniach** — H2 „Snowmobile rental in Zakopane" i „Prices".
3. **Własne teksty, nie tłumaczenie.** Waluta jako `PLN`, nie `zł`.
   FAQ „Do your instructors speak English?" tylko po potwierdzeniu.

---

## 11. Tracking

Kontekst strony dla wszystkich zdarzeń:

```js
{ page_type: 'product', product: 'skutery', language: 'pl' | 'en' }
```

| Miejsce | Zdarzenie |
|---|---|
| telefon w hero, sticky, FAQ, cenniku, stopce | `phone_click` z `cta_location` |
| karta wariantu | `select_item` z `item_id` |
| widżet w viewport | `view_item` |
| wybór wariantu i terminu | `add_to_cart` |
| przejście do płatności | `begin_checkout` |
| opłacone | `purchase` z `transaction_id` |
| rozwinięcie pytania | `faq_open` z `faq_id` |
| mapa / dojazd | `directions_click` |

> Jeśli SlotWise `embed.js` sam pushuje lejek — **nie dublować**. Własny listener tylko
> jako fallback dla surowego iframe. To trzeba sprawdzić przed budową sekcji 4.

---

## 12. Blokady

| # | Czego brakuje | Blokuje | Priorytet |
|---|---|---|---|
| ~~**A**~~ | ~~Potwierdzenie cennika 200/300/550~~ — **zamknięte 2026-09-11** | — | — |
| ~~**B**~~ | ~~Czy są wyprawy bez przewodnika~~ — **zamknięte 2026-09-11**: instruktor na każdej wyprawie (H1 zostaje bez „z instruktorem" — fraza w leadzie, pasku zaufania i kartach) | — | — |
| ~~C~~ | ~~Co obejmuje cena~~ — **zamknięte 2026-09-11**: skuter · kask · szkolenie · paliwo · poczęstunek | — | — |
| ~~D~~ | ~~Prawo jazdy na skuter~~ — **zamknięte 2026-09-11**: nie jest wymagane | — | — |
| E | Co zabrać ze sobą | sekcja 8, FAQ-5 | 4 |
| F | Czasy dojazdu z 6 miejscowości | sekcja 2 i 6 | 4 |
| G | Zdjęcia skuterów w rozdzielczości na stronę | hero, galeria | 4 |
| H | Wideo z Meta (najtańsze zakupy w firmie) | galeria | 5 |
| I | Flota — ile skuterów, jakie modele | sekcja 8, wiarygodność | 5 |

> **Blokada B jest delikatna.** Stara strona deklaruje „własne, prywatne i legalne trasy
> off-road", co wyglądałoby na podstawę prawną dla jazdy bez uprawnień. Ale ta sama firma
> ma publiczną opinię 1★ od osoby przedstawiającej się jako właścicielka działek na Podhalu,
> kwestionującą właśnie to. Nie rozstrzygamy, kto ma rację — stwierdzamy, że jest to
> **twierdzenie publicznie zakwestionowane**, a jednocześnie filar komunikacyjny nr 1.
> Powtarzamy je dopiero po wyraźnym potwierdzeniu.

---

## 13. Materiały i to, czego nie przenosimy

### Do wykorzystania ze starej strony

- struktura cennika i lista „co obejmuje cena" (§6, po potwierdzeniu)
- siedem punktów „Dlaczego warto" → sekcja „Dla kogo" i pasek zaufania
- treść „dla początkujących" → sekcja 8 i FAQ-4 *(jako treść — fraza ma zero wyświetleń)*
- zdjęcie hero: wschód słońca, dwa skutery, jeźdźcy w kadrze — mocne i sezonowe

### Czego nie przenosimy

| Element | Dlaczego |
|---|---|
| „Czy jazda skuterem śnieżnym daje frajdę?" | pytanie-wypełniacz, zero SEO i zero obiekcji |
| widget opinii z Google | pokazuje opinię 3★ na tej stronie i 1★ na voucherach — na nowej stronie opinie są **ręcznie wybrane** z `content/reviews.json` |
| urwany tekst pod FAQ | pozostałość po edycji na żywej stronie |
| blok o E-Crossie | 4 wyświetlenia w całym roku — jeśli usługa istnieje, jedno zdanie, nie sekcja |
| mapa ze stopki | współrzędne oddalone o ~2,5 km od faktycznej lokalizacji |
| hero bez ceny, telefonu i oceny | to jest właśnie problem, który naprawiamy |

---

## 14. Co to znaczy dla projektu graficznego

1. **Cena jest największą liczbą na pierwszym ekranie.** Nie nagłówek, nie logo — cena.
2. **Trzy karty cenowe jak bilety**, PREMIUM wyróżniony jako środkowy.
   Każda karta pokazuje czas, cenę za pojazd i dopłatę za drugą osobę — trzy liczby, czytelnie.
3. **Lista „w cenie" pod kartami, nie w karcie.** Jest wspólna dla wszystkich wariantów,
   powtarzanie jej trzy razy to szum.
4. **Pasek miejscowości musi wyglądać na treść, nie na listę słów kluczowych.**
   Jedna linia, zwykły tekst, kotwica.
5. **Zima daje przewagę wizualną, której nie ma żaden inny produkt** — biel, światło,
   panorama Tatr. Jedno pełnoekranowe zdjęcie w hero robi tu więcej niż cała galeria.
6. **Kontrast na śniegu.** Biały tekst na zimowym zdjęciu prawie zawsze przepada.
   Hero potrzebuje nakładki albo dolnego pasa pod tekst — do sprawdzenia na telefonie
   na dworze, nie w Figmie.
7. **Sekcja 8 „Zanim przyjedziesz" to dobre miejsce na ikony** — rękawice, kurtka, buty.
   Jedyna sekcja, gdzie ikonografia niesie treść, a nie dekoruje.
