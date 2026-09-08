# ZakoExtreme — analiza master danych reklamowych
### Fundament pod nową stronę (Next.js). Stan na 2026-08-31.

**Źródła:** Google Ads `864-534-0268` (okno `last_365dT`, tj. ~2025-11-01 → 2026-08-31 — konto
ruszyło w listopadzie 2025), Meta Ads `4813638225522767` (to samo okno).
Wszystkie liczby pochodzą z API (Windsor.ai). Nic nie jest szacowane ani zmyślone.

**Zastrzeżenie metodologiczne:** rozbicia per kampania/wymiar NIE sumują się do sum kontowych —
Google liczy każde rozbicie osobno. Liczby bezwzględne bierz z sum kontowych, rozbić używaj do
udziałów i porównań.

---

# 1. Dziesięć wniosków, które przesądzają o kształcie strony

| # | Wniosek | Dowód |
|---|---|---|
| 1 | **Lejek rezerwacji przecieka w 92%** | 1 516 `BEGIN_CHECKOUT` → **119 `PURCHASE`** w 365 dni |
| 2 | **Biznes działa na telefonie, nie na koszyku** | ~18 200 kliknięć w telefon vs 119 zakupów online = **153:1** |
| 3 | **Ruch jest mobilny w ~96%** | 21 908 klików mobile / 891 desktop / 36 tablet (Google); Meta ~99% mobile |
| 4 | **72% ruchu to ludzie już na Podhalu** | Zakopane 38 002 kliki z ~60 000; +Bukowina, Poronin, Kościelisko, Białka |
| 5 | **Skutery są 4,7× tańsze w konwersji niż quady** | 6,17 zł/konw vs **28,90 zł/konw**; CPC 1,49 vs 3,32 zł |
| 6 | **Angielski konwertuje LEPIEJ niż polski** | EN 7,15 zł/konw vs PL 11,03 zł/konw |
| 7 | **Kobiety konwertują o 27% lepiej niż mężczyźni** | CR 21,5% vs 16,9%; 9,57 vs 12,48 zł/konw |
| 8 | **Marzec–czerwiec to dziura, która pali budżet** | 34,77 / 27,94 / 18,32 / 35,12 zł/konw vs 4,41 zł w sierpniu |
| 9 | **Białka i Bukowina to 382 realne frazy bez własnej strony** | 1 221 klików, 1 937 zł, brak dedykowanego URL-a |
| 10 | **Meta to najtańsze zakupy w firmie, a jest niedofinansowana** | 87,5 zł/zakup przy 5 336 zł rocznie |

---

# 2. Kto naprawdę wchodzi na stronę

## 2.1 Urządzenie — projektuj wyłącznie mobile-first

| Urządzenie | Kliki | Udział |
|---|---:|---:|
| Mobile | 21 908 | **95,9%** |
| Desktop | 891 | 3,9% |
| Tablet | 36 | 0,2% |

Meta potwierdza: `android_smartphone` + `iphone` to ~99% wyświetleń. Desktop na Meta = 0,4%.

> **Konsekwencja:** desktop to widok kontrolny, nie projektowy. Każdy layout, każdy hero,
> każdy CTA projektujesz na ekran 390×844 i dopiero potem rozciągasz. Nie odwrotnie.

## 2.2 Wiek (Google Ads, bez „nieokreślonych")

| Przedział | Kliki | Udział |
|---|---:|---:|
| 25–34 | 7 325 | **46,8%** |
| 35–44 | 3 790 | 24,2% |
| 18–24 | 2 048 | 13,1% |
| 45–54 | 1 801 | 11,5% |
| 55–64 | 424 | 2,7% |
| 65+ | 259 | 1,7% |

**25–44 = 71% ruchu.** To nie są nastolatki i nie są emeryci. To dorośli w wieku rodzicielskim
i „młodej pary".

## 2.3 Płeć — najważniejsza korekta wizerunkowa

| Płeć | Kliki | Wydatek | Konwersje | CR | zł/konw |
|---|---:|---:|---:|---:|---:|
| Mężczyźni | 8 641 | 18 228,78 | 1 460,1 | 16,9% | 12,48 |
| **Kobiety** | 6 989 | 14 369,19 | **1 502,2** | **21,5%** | **9,57** |
| Nieokreślone | 7 205 | 15 654,70 | 1 298,1 | 18,0% | 12,06 |

Kobiety klikają rzadziej, ale **konwertują częściej i taniej**, i dają więcej konwersji
w liczbach bezwzględnych mimo mniejszej liczby klików.

> **Konsekwencja:** strona NIE może być „męską stroną o adrenalinie". Nie ma czarno-czerwonego
> mroku, płomieni, błota i testosteronu. Decyzję o wyjeździe podejmuje w tej grupie kobieta —
> najczęściej dla pary lub dla rodziny. Ton: **bezpieczna, zorganizowana, widokowa przygoda,
> którą da się zrobić spontanicznie w trakcie urlopu.**
>
> Na Meta proporcje są odwrotne (mężczyźni 25–34 mają najwięcej zakupów), więc kreacje
> społecznościowe mogą być bardziej „adrenalinowe" — ale **strona docelowa musi obsłużyć oba
> ruchy**, a większy i lepiej konwertujący ruch idzie z Google.

## 2.4 Gdzie fizycznie jest użytkownik

| Lokalizacja | Kliki | Konwersje |
|---|---:|---:|
| **Zakopane** | 38 002 | 8 912,1 |
| Warszawa | 5 323 | 528,0 |
| Kraków | 2 569 | 456,9 |
| Wrocław | 1 996 | 211,5 |
| Poznań | 1 838 | 120,0 |
| Bukowina Tatrzańska | 1 350 | 319,6 |
| Katowice | 1 311 | 127,6 |
| Gdańsk | 1 096 | 105,0 |
| Poronin | 1 075 | 274,0 |
| Kościelisko | 935 | 293,2 |
| Białka Tatrzańska | 881 | 252,8 |

**Podhale łącznie ≈ 43 200 klików ≈ 72% ruchu.** Reszta to duże miasta = planowanie przed
wyjazdem (~25%).

> **Konsekwencja — dwa tryby strony:**
> - **Tryb „jestem tu teraz" (72%)** — dominujący. Potrzebuje: *czy są wolne terminy dzisiaj*,
>   *ile to kosztuje*, *jak daleko jesteście*, *dzwonię*. Wszystko above the fold, bez scrollowania.
> - **Tryb „planuję" (25%)** — potrzebuje: *co to właściwie jest*, *czy to bezpieczne dla dziecka*,
>   *czy potrzebuję prawa jazdy*, *jak wygląda trasa*. To treść głębsza, ale nie może przykryć trybu 1.

---

# 3. Czas — kiedy strona musi być gotowa na ruch

## 3.1 Godziny (Google Ads, kliki, 365 dni)

```
00 ▏1015    06 ▊991      12 ████████▌5322   18 ████████ 5049
01 ▏573     07 ███ 2338  13 ████████ 5037   19 ████████▌5378
02 ▏292     08 █████ 3642 14 ███████▉4939   20 ███████▉4971
03 ▏209     09 ███████▊4881 15 ███████▊4897 21 ███████▍4652
04 ▏207     10 ████████▊5504 16 ███████▋4838 22 █████▍3426
05 ▏413     11 █████████ 5765 17 ████████ 5015 23 ██▋1677
```

Ruch to **plateau od 09:00 do 21:00** z dwoma szczytami: **10:00–12:00** (szczyt główny, 5 765
o 11:00) i **19:00–20:00** (szczyt wieczorny). Noc 02:00–04:00 jest znikoma, ale nigdy nie zerowa —
firma jest czynna 24h i konwersje nocne występują.

## 3.2 Meta — inny rytm niż Google

Szczyt Meta to **21:00 (1 651 klików) i 22:00 (1 582)**. Google szczytuje w południe, Meta wieczorem.

> **Konsekwencja:** to są **dwa różne stany umysłu na tej samej stronie**.
> Google 10:00–12:00 = *„jestem w Zakopanem, pada, szukam co robić DZIŚ"* → cel: telefon / rezerwacja na dziś.
> Meta 21:00–22:00 = *„leżę w apartamencie, jutro wolny dzień"* → cel: obejrzenie tras, cennika, zapisanie się na jutro.
> Strona musi mieć **jawny wybór terminu „dziś / jutro"**, a nie tylko generyczny kalendarz.

## 3.3 Dni tygodnia

| Dzień | Kliki | Wydatek | Konwersje |
|---|---:|---:|---:|
| Poniedziałek | 12 437 | 14 024,85 | 1 969,4 |
| Wtorek | 11 460 | 13 811,64 | 1 916,6 |
| Środa | 10 709 | 13 812,33 | 1 866,2 |
| Czwartek | 10 392 | 13 655,14 | 2 006,3 |
| **Piątek** | 11 845 | 16 393,78 | **2 277,2** |
| **Sobota** | 11 466 | 16 213,01 | **2 250,5** |
| **Niedziela** | 12 722 | 15 452,92 | **2 225,2** |

Piątek–niedziela to najmocniejsze dni (i to uzasadnia cięcie budżetu pon–czw opisane
w `LOG-BUDZET-2026-08-31.md`).

## 3.4 Sezonowość — największa dziura w roku

| Miesiąc | Kliki | Wydatek | Konwersje | **zł/konw** |
|---|---:|---:|---:|---:|
| 2025-11 | 2 869 | 2 879 | 556 | 5,17 |
| 2025-12 | 9 082 | 10 729 | 2 232 | 4,80 |
| 2026-01 | 14 263 | 15 737 | 3 083 | 5,10 |
| 2026-02 | 8 889 | 16 599 | 1 779 | 9,32 |
| **2026-03** | 1 856 | 6 085 | 175 | **34,77** |
| **2026-04** | 2 375 | 3 388 | 121 | **27,94** |
| 2026-05 | 8 047 | 7 333 | 400 | 18,32 |
| **2026-06** | 7 824 | 9 325 | 265 | **35,12** |
| 2026-07 | 10 336 | 12 920 | 1 738 | 7,43 |
| **2026-08** | 15 493 | 18 369 | 4 159 | **4,41** |

Dwa sezony (zima: skutery XII–II, lato: quady/buggy VII–VIII) i **martwe pole III–VI**,
w którym konto przepala 26 131 zł na 961 konwersji.

> **Konsekwencja — strona musi umieć przełączyć sezon.** Nie ręcznie, nie przez podmianę
> hero'a raz na pół roku przez programistę. Potrzebny jest **jeden plik konfiguracyjny sezonu**,
> który przełącza: hero (skutery vs quady), kolejność kart oferty, treść FAQ, `Offer.availability`
> w schema i obrazy OG. Marzec–czerwiec powinien mieć **własny wariant** („sezon przejściowy" —
> buggy 4×4 i quady na trasach bez śniegu), a nie pokazywać skutery, których nie ma.

---

# 4. Czego ludzie faktycznie szukają — 4 322 unikalne zapytania

## 4.1 Podział wg produktu

| Produkt | Fraz | Kliki | Wydatek | Konwersje | zł/konw | CPC |
|---|---:|---:|---:|---:|---:|---:|
| **Skutery śnieżne** | 714 | 11 558 | 17 205 | 2 789,3 | **6,17** | 1,49 |
| Quady / ATV | 1 075 | 5 016 | 16 657 | 576,4 | 28,90 | 3,32 |
| Buggy | 132 | 908 | 2 963 | 106,6 | 27,80 | 3,26 |
| Inne / okołotematyczne | 2 401 | 851 | 1 690 | 123,5 | 13,69 | 1,99 |

**Skutery to najzdrowszy biznes w koncie**: najtańszy klik, najtańsza konwersja, największy wolumen.
Quady mają 2× więcej fraz, ale kosztują 4,7× więcej za konwersję.

## 4.2 Podział wg intencji

| Intencja | Fraz | Kliki | Wydatek | Konwersje | zł/konw |
|---|---:|---:|---:|---:|---:|
| Produktowa / ogólna | 3 624 | 16 667 | 36 131 | 3 409,0 | 10,60 |
| **Cenowa** | 137 | 1 299 | 1 761 | 173,8 | **10,13** |
| Kwalifikacyjna (wiek, prawo jazdy, dzieci) | 300 | 177 | 301 | 5,0 | 60,40 |
| Informacyjna | 166 | 120 | 171 | 4,0 | 42,84 |
| Reputacyjna (opinie, najlepsze) | 89 | 69 | 150 | 37,71 | 37,71 |

Dwie rzeczy do wyciągnięcia:

1. **Intencja cenowa konwertuje tak samo dobrze jak produktowa (10,13 vs 10,60 zł/konw).**
   Ludzie szukający „cennik" i „ile kosztuje" to nie są łowcy okazji — to są klienci gotowi kupić,
   którzy chcą wiedzieć, na co się piszą. **Cena musi być jawna na stronie.** Ukrycie ceny za
   formularzem zabije tę grupę.
2. **555 fraz kwalifikacyjnych/informacyjnych/reputacyjnych kosztuje 622 zł i daje 13 konwersji
   (48 zł/konw).** To są zapytania, na które **nie warto płacić w Google Ads, ale trzeba na nie
   odpowiedzieć treścią.** To jest dokładnie ten materiał, który wygrywa w AI Overviews,
   ChatGPT i Perplexity — i który sprowadzi ten ruch za darmo.

## 4.3 Języki

| Język | Fraz | Kliki | Wydatek | Konwersje | zł/konw |
|---|---:|---:|---:|---:|---:|
| Polski | 1 133 | 13 264 | 24 037 | 2 178,5 | 11,03 |
| **Angielski** | 590 | 2 876 | 7 736 | 1 082,5 | **7,15** |
| Ukraiński / rosyjski | 46 | 108 | 185 | 18,0 | 10,28 |
| Niemiecki | 17 | 18 | 29 | 9,0 | 3,29 |

> **Angielski konwertuje o 35% taniej niż polski.** Wersja EN nie jest dodatkiem — jest
> równorzędnym produktem i musi mieć własne, natywnie napisane teksty, własne URL-e i własne
> schema, a nie automatyczne tłumaczenie. Obecnie EN działa na `/en/` z TranslatePress.
>
> Cyrylica (59 klików na samo `квадроцикли закопане`) to tania, niewykorzystana nisza —
> warto rozważyć wersję UA w drugim etapie.

## 4.4 Najmocniejsze pojedyncze frazy

| Fraza | Kliki | Wydatek | Konwersje |
|---|---:|---:|---:|
| skutery śnieżne zakopane | 3 968 | 4 148 | 829,1 |
| quady zakopane | 2 610 | 9 618 | 339,3 |
| snowmobile zakopane | 1 346 | 3 846 | 569,7 |
| skutery sniezne zakopane *(bez diakrytyki)* | 682 | 844 | 153,1 |
| buggy zakopane | 538 | 2 045 | 66,0 |
| zakopane snowmobile | 469 | 1 312 | 204,9 |
| zakopane skutery śnieżne | 394 | 497 | 77,4 |
| **skutery śnieżne zakopane cennik** | 385 | 388 | 61,5 |
| zakopane quady | 379 | 1 272 | 47,5 |
| quady białka tatrzańska | 178 | 353 | 14,5 |
| **zako extreme** *(marka)* | 163 | 256 | 16,9 |
| **quady zakopane cennik** | 159 | 387 | 11,5 |
| snowdoo / snowdoo adventure zakopane | 224 | 501 | 68,3 |

Uwagi:
- **Warianty bez polskich znaków mają realny wolumen** (682 kliki na `skutery sniezne zakopane`).
  Strona musi być znajdowalna bez diakrytyki — to kwestia treści i `alternateName` w schema,
  nie przekierowań.
- **`snowdoo` to marka konkurencji**, na którą konto zbiera ruch. Nie kopiuj tej nazwy na stronę.
- **Marka `zako extreme` ma tylko 163 kliki/rok.** Rozpoznawalność marki jest niska —
  strona nie może zakładać, że ktokolwiek wie, kim jest ZakoExtreme.

## 4.5 Klaster lokalny — największa pojedyncza luka

| Miejscowość | Fraz | Kliki | Wydatek | Konwersje |
|---|---:|---:|---:|---:|
| **Białka Tatrzańska** | 251 | 939 | 1 507 | 78,0 |
| **Bukowina Tatrzańska** | 131 | 282 | 430 | 45,0 |
| Kościelisko | 40 | 181 | 419 | 33,4 |
| Gubałówka | 43 | 176 | 179 | 39,4 |
| Poronin | 54 | 142 | 268 | 18,0 |
| Kościelisko / Witów | 51 | 60 | 122 | 8,4 |
| Murzasichle | 9 | 71 | 77 | 19,0 |

**579 fraz lokalnych, 1 851 klików, 3 002 zł — i ani jednego dedykowanego URL-a.**
Wszystko trafia na strony ogólne, więc message match jest zerowy, a Landing Page Experience
w Google Ads spada.

---

# 5. Lejek — dlaczego strona jest wąskim gardłem

## 5.1 Akcje konwersji (365 dni, `all_conversions`)

| Akcja | Kategoria | Liczba |
|---|---|---:|
| Local actions - Other engagements | ENGAGEMENT | 18 515 |
| **Kliknięcie w telefon** | CONTACT | **10 067** |
| Local actions - Directions | GET_DIRECTIONS | 7 862 |
| zakoextreme.pl (web) phone_click | CONTACT | 6 737 |
| Przejście na stronę „Kontakt" | PAGE_VIEW | 2 742 |
| zakoextreme.pl (web) przejscie_na_kontakt | PAGE_VIEW | 2 246 |
| Local actions - Website visits | PAGE_VIEW | 2 271 |
| **Rozpoczęcie realizacji płatności** | BEGIN_CHECKOUT | **1 516** |
| Reklamy „kliknij, aby połączyć" | CONTACT | 1 387 |
| Store visits | STORE_VISIT | 1 034 |
| **Dodanie do koszyka** | ADD_TO_CART | **729** |
| **Zakup** | PURCHASE | **119** |
| Kliknięcie w mail / kopiowanie | CONTACT | 174 (łącznie) |

## 5.2 Trzy diagnozy z tej tabeli

**(a) Lejek rezerwacji traci 92%.**
`BEGIN_CHECKOUT 1 516 → PURCHASE 119` = **7,8% domknięcia**. Dla porównania zdrowy
booking engine w turystyce lokalnej domyka 40–60%. To jest **pojedynczy największy problem
biznesowy do rozwiązania przez nową stronę.** Do zdiagnozowania z programistą i SlotWise:
czy checkout wymaga konta, ile ma kroków, czy działa płatność mobilna (BLIK/Apple Pay/Google Pay),
czy nie ma przekierowania na inną domenę, czy działa na wolnym LTE w górach.

**(b) `ADD_TO_CART (729) < BEGIN_CHECKOUT (1 516)`.**
Można rozpocząć płatność, nie przechodząc przez koszyk — czyli są dwie różne ścieżki zakupu
i co najmniej jedna z nich nie odpala pełnego lejka. Nowa strona musi mieć **jedną ścieżkę**.

**(c) Zdarzenia są liczone podwójnie.**
`Kliknięcie w telefon` (10 067) i `zakoextreme.pl (web) phone_click` (6 737) to niemal na pewno
to samo zdarzenie mierzone dwoma tagami. Tak samo `Przejście na stronę „Kontakt"` (2 742) vs
`przejscie_na_kontakt` (2 246). Na nowej stronie ma być **jedno kanoniczne zdarzenie na akcję**.

## 5.3 Proporcja, która definiuje stronę

```
Kontakt telefoniczny (wszystkie źródła):  ~18 200
Zakup online:                                 119
                                       ─────────
Stosunek:                                   153 : 1
```

Firma sprzedaje przez telefon. Nowa strona **nie może udawać e-commerce'u**. Musi być
**stroną, która doprowadza do telefonu w jednym kliknięciu**, i równolegle mieć poprawnie
działającą rezerwację online dla tych, którzy nie chcą dzwonić (a ich liczba wzrośnie,
gdy checkout przestanie się psuć).

---

# 6. Co konto mówi o języku, jakim trzeba pisać

## 6.1 Nagłówki reklam, które są w koncie (ranking wg liczby wystąpień)

Najczęściej używane, polskie:
`Legalny Offroad Zakopane` (19×) · `Bezpiecznie i Legalnie` (14×) · `Adrenalina w Tatrach` (13×) ·
`Zarezerwuj Termin` (12×) · `Zadzwoń Teraz` (12×) · `Zadzwoń i Zarezerwuj` (12×) ·
`Sprawdzone i Widokowe Trasy` (12×) · `Off-road w Górach` (12×) · `Doświadczeni Instruktorzy` (12×) ·
`Blisko Centrum Zakopanego` (12×) · `Wolne Terminy na Dziś` (11×) · `Szybka Rezerwacja Online` (11×) ·
`Bez Prawa Jazdy` (11×) · `Dla Par, Rodzin i Grup` (7×) · `Quady Zakopane od 250 zł` (5×)

Angielskie:
`Near Zakopane Center` (14×) · `Experienced Instructors` (14×) · `Call Now` (14×) ·
`Call and Book` (14×) · `Book Your Date` (14×) · `Safe and Legal Rides` (8×) ·
`Scenic & Verified Routes` (8×) · `Check Availability` (8×)

## 6.2 Pięć filarów komunikacji, które wynikają z danych

Te motywy powtarzają się w każdej kampanii i mają pokrycie w zapytaniach użytkowników.
To jest **kontrakt komunikacyjny nowej strony** — każdy z nich musi mieć swoje miejsce na stronie.

| Filar | Co znaczy | Skąd wiadomo, że działa |
|---|---|---|
| **1. Legalnie i bezpiecznie** | Trasy są legalne, jest instruktor, jest ubezpieczenie | Najczęstszy nagłówek w koncie (19×); odpowiada na lęk „czy to w ogóle wolno" |
| **2. Bez prawa jazdy** | Nie potrzebujesz uprawnień | 8 dedykowanych fraz + osobna grupa reklam; usuwa główną barierę wejścia |
| **3. Blisko centrum** | Jesteś w Zakopanem, my jesteśmy tuż obok | 72% ruchu jest już na miejscu; `Near Zakopane Center` 14× |
| **4. Wolne terminy dziś** | Możesz pojechać w ciągu godziny | Szczyt ruchu 10:00–12:00 = decyzja na ten sam dzień |
| **5. Widokowe trasy i doświadczeni instruktorzy** | To nie jest błotnista pętla, to Tatry | `Sprawdzone i Widokowe Trasy` 12×, `Doświadczeni Instruktorzy` 12× |

## 6.3 Błąd, który jest teraz w koncie i nie może trafić na stronę

W 8 aktywnych nagłówkach reklam znajduje się `Ocena 4,8 z 769 Opinii`, a w 5 nowszych
`Ocena 4,8 z +800 Opinii`. **Na stronie obowiązuje wyłącznie forma „ponad 800 opinii" /
„+800 opinii".** Nigdy dokładna liczba — dezaktualizuje się z dnia na dzień i psuje wiarygodność.
*(Do naprawy również po stronie reklam — poza zakresem tego pakietu.)*

---

# 7. Meta Ads — mały budżet, najlepszy wynik

## 7.1 Struktura

Konto jest wyjątkowo proste: **jedna kreacja wideo („Video #1")** w trzech kampaniach,
targetowanie `broad + 17 km`.

| Kampania | Placement | Wyświetlenia | Kliki | Wydatek | Zakupy |
|---|---|---:|---:|---:|---:|
| **PV \| Video #1 – Sprzedaż** | FB | 499 080 | 13 511 | 5 336,21 | **61** |
| PV \| Video #1 – Sprzedaż | IG | 9 994 | 279 | 112,05 | 1 |
| PV \| Video #1 - Ruch | FB | 142 173 | 4 706 | 1 011,35 | 6 |
| PV \| Video #1 - Ruch | IG | 56 534 | 2 316 | 398,58 | 1 |
| Aktywność \| Reklama Video #1 | FB + IG | 1 079 | 9 | 9,17 | 0 |

**Kampania sprzedażowa: 5 336 zł → 61 zakupów = 87,5 zł/zakup.**
To najtańszy zakup w całej firmie — tańszy niż najlepsza kampania Google (145 zł/zakup).

## 7.2 Wideo — ludzie nie oglądają, ale klikają

| Metryka | 2026-07 | 2026-08 |
|---|---:|---:|
| Odtworzenia | 234 782 | 355 016 |
| Obejrzane 25% | 18 133 (7,7%) | 23 750 (6,7%) |
| Obejrzane 100% | 1 858 (0,8%) | 2 412 (0,7%) |
| Średni czas | **4 s** | **4 s** |
| Zasięg | 106 771 | 160 739 |
| Częstotliwość | 2,46 | 2,45 |

Średnio 4 sekundy oglądania, a mimo to 87,5 zł/zakup. To znaczy, że **wideo działa jako
thumb-stopper, nie jako opowieść** — decyzja zapada w pierwszych 2–3 sekundach na podstawie
obrazu, nie narracji.

> **Konsekwencja dla strony:** ruch z Meta przychodzi **rozgrzany obrazem, ale bez żadnej wiedzy**.
> Nie widział ceny, nie zna nazwy firmy, nie wie, gdzie to jest. Strona docelowa dla Meta musi
> w pierwszym ekranie odpowiedzieć: **co to jest, gdzie to jest, ile kosztuje, jak to zamówić** —
> inaczej ten ruch odbija.

## 7.3 Placement

| Placement | Wyświetlenia | Kliki | CTR | Zakupy |
|---|---:|---:|---:|---:|
| FB feed / android | 234 996 | 8 870 | 3,77% | 21 |
| FB feed / iPhone | 154 824 | 3 671 | 2,37% | 9 |
| FB Reels / android | 67 550 | 2 393 | 3,54% | 6 |
| IG Reels / iPhone | 54 036 | 1 230 | 2,28% | 5 |
| IG Stories / iPhone | 36 480 | 522 | 1,43% | 5 |
| FB Reels / iPhone | 35 895 | 1 423 | 3,96% | 4 |
| IG feed / iPhone | 32 269 | 684 | 2,12% | 6 |

Android ma wyższy CTR niż iPhone praktycznie wszędzie. Desktop to 0,4% wyświetleń.

## 7.4 Demografia Meta — odwrotna niż w Google

| Grupa | Kliki | Zakupy |
|---|---:|---:|
| Mężczyźni 25–34 | 4 419 | **22** |
| Mężczyźni 35–44 | 3 923 | 12 |
| Mężczyźni 18–24 | 2 195 | 11 |
| Kobiety 35–44 | 2 087 | 2 |
| Kobiety 25–34 | 1 866 | 7 |
| Kobiety 18–24 | 1 140 | 9 |

Na Meta kupują mężczyźni 25–34. W Google konwertują kobiety. **Strona obsługuje oba ruchy** —
dlatego ton musi być „przygoda, która jest zorganizowana i bezpieczna", a nie wybór
między adrenaliną a rodziną.

---

# 8. Podsumowanie ekonomiczne — ile naprawdę kosztuje klient

| Kanał / segment | Koszt realnego zakupu |
|---|---:|
| **Meta — kampania sprzedażowa** | **87,5 zł** |
| Google — QUADY \| BUGGY \| ATV \| 2026 | 145,4 zł |
| Google — Quady \| Białka & Bukowina | 145,6 zł |
| Google — Quady \| Bez Prawa Jazdy \| Młodzież | 204,6 zł |
| Google — P \| 2026 (PMax) | 406,2 zł |
| Google — P \| L \| 2026 (PMax lokalny) | 410,9 zł |
| Google — QUADY \| BUGGY \| ATV \| ENG | 536,0 zł |

Koszt kontaktu telefonicznego (realny lead) waha się od **3,63 zł** (P | 2026) do
**117,85 zł** (P | L | 2026).

> Cała ta tabela zmieni się, gdy lejek przestanie tracić 92% na checkoucie. **Naprawa strony
> jest tańszym sposobem na obniżenie kosztu zakupu niż jakakolwiek optymalizacja kampanii.**
> Przy 1 516 rozpoczętych płatnościach i domknięciu podniesionym z 7,8% do choćby 30%
> to **455 zakupów zamiast 119** — bez złotówki więcej w budżecie.

---

# 9. Pliki źródłowe

| Plik | Zawartość |
|---|---|
| `../google-ads/search_terms_365d.json` | 4 326 zapytań z metrykami |
| `../google-ads/geo_city_365d.json` | 963 lokalizacje użytkowników |
| `../google-ads/rsa_ads_365d.json` | 56 reklam: nagłówki, opisy, URL-e docelowe |
| `../google-ads/keywords_adgroups.md` | pełna lista słów kluczowych wg grup reklam |
| `../google-ads/daily_campaign_365d.json` | dzienne dane per kampania (sezonowość) |
| `../meta-ads/meta_daily.json` | Meta: dzienne wydatki, wyniki, koszt zakupu |
| `../meta-ads/meta_demo.json` | Meta: rozbicie wiek × płeć |
| `../meta-ads/meta_hourly.json` | Meta: rozkład godzinowy (szczyt 21:00–22:00) |
| `../meta-ads/meta_placements.json` | Meta: umiejscowienia (Feed / Stories / Reels) |
| `../meta-ads/meta_video.json` | Meta: statystyki jedynej kreacji wideo |
| `LOG-BUDZET-2026-08-31.md` | log cięcia budżetu i automatyzacja przywracania |

> Eksporty Meta pochodzą z konta **4813638225522767** i obejmują lipiec–sierpień 2026.
> Oryginały leżą w `../../RAPORT-2026-08/dane/raw/` — tutaj są kopie, żeby katalog
> `SKLEP-2026/` był samowystarczalny i dało się go przekazać w całości.
