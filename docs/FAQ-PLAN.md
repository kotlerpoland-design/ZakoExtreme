# Plan rozbudowy FAQ — na podstawie danych z konta reklamowego

**Data:** 2026-09-10 · **Podstawa:** 3 176 unikalnych zapytań z Google Ads (365 dni), negatywne opinie z wizytówki, `docs/pakiet/01-BRIEF-I-FAKTY.md`

Ten dokument jest specyfikacją dla `content/faq.ts` i jednocześnie listą pytań do właściciela.

---

## 0. Stan obecny

W zestawie `home` jest 6 pytań, ale renderują się **4** — `co-w-cenie` i `pogoda` mają `answer: null`,
bo faktu nie mamy. To działa zgodnie z założeniem („niepotwierdzone nie idzie na stronę"),
ale widoczny efekt jest chudy jak na sekcję, która ma pracować na SEO i na obiekcje naraz.

Bank liczy 15 wpisów. Ten plan podnosi go do **33**.

## 1. Zasada podziału

FAQ ma dwa zadania i trzeba je rozdzielić, bo mają inne kryterium doboru:

| | **Rola A — łapie ruch** | **Rola B — usuwa obiekcje** |
|---|---|---|
| Kryterium | popyt w danych wyszukiwarki | blokuje telefon lub generuje 1★ |
| Wolumen | mierzalny | zerowy z definicji |
| Gdzie | wysoko, pod snippet i AI search | niżej, zwinięte |
| Test | czy ktoś to wpisuje w Google | czy brak odpowiedzi zatrzymuje rezerwację |

**Zastrzeżenie metodologiczne:** liczby to wyświetlenia *naszych reklam*, nie wolumen Google.
Tematy, na które konto nie licytuje, mają zero niezależnie od realnego popytu.
Liczby dodatnie są dowodem, zera nie są.

---

## 2. ROLA A — pytania pod SEO i AI search

| # | Pytanie | Dane (365 dni) | Strony | Odpowiedź |
|---|---|---|---|---|
| A1 | **Ile kosztuje wyprawa quadem w Zakopanem?** | 14 fraz, **2 360 wyśw**, 319 klik. `quady zakopane cennik` 1 045/159, `zakopane quady cennik` 879/99 | `/quady-zakopane/`, `/cennik/`, home | ✅ mamy (250/450/650) |
| A2 | **Ile kosztuje wypożyczenie skutera śnieżnego w Zakopanem?** | 34 frazy, **4 275 wyśw**, 896 klik. `skutery śnieżne zakopane cennik` 2 081/385. Dosłowne pytanie „ile kosztuja skutery sniezne w zakopanem" — 135 wyśw, 25 klik, **najmocniejsze dosłowne pytanie w koncie** | `/skutery-sniezne-zakopane/`, `/cennik/`, home ZIMA | ⛔ blokada #1 |
| A3 | **Ile kosztuje buggy w Zakopanem?** | 4 frazy, 348 wyśw, 50 klik. Uwaga: `buggy białka tatrzańska cennik` 255/39 — **intencja lokalna jest tu silniejsza niż zakopiańska** | `/buggy-zakopane/`, `/buggy-bialka-bukowina/` | ✅ mamy |
| A4 | **Czy cena jest za osobę, czy za pojazd?** | SEO słabe, ale to **dosłowna treść negatywnych opinii**: „300 za osobę, 600 za dwie — zdzierstwo" | wszystkie z cennikiem | ⛔ nowa blokada, wysoki priorytet |
| A5 | **Czym różni się quad od ATV?** | 51 fraz, 581 wyśw, 76 klik. `atv zakopane` 203/29, `zakopane atv` 90/18 | `/quady-zakopane/` | ✅ jest w banku (`atv`) |
| A6 | **Czy quady jeżdżą zimą?** | 73 wyśw. `quady zakopane zima` 36/5, `quady zima zakopane` 31/2 | `/quady-zakopane/`, home ZIMA | ⛔ potwierdzić |
| A7 | **Gdzie dokładnie jesteście?** | 186 fraz, **1 371 wyśw** PL. EN: `snowmobile near me` 490/134 | wszystkie produktowe, lokalne, **EN obowiązkowo** | ✅ jest (`gdzie`), czasy ⛔ #8 |
| A8 | **Ile jedzie się do was z Białki / z Bukowiny?** | klaster lokalny 579 fraz, 1 851 klików | `/quady-bialka-tatrzanska/`, `/quady-bukowina-tatrzanska/`, `/buggy-bialka-bukowina/` | ⛔ blokada #8 |
| A9 | **Jakie macie atrakcje dla nastolatków?** | 19 fraz, 169 wyśw. `zakopane atrakcje dla nastolatków` 47/5, `atrakcje zakopane dla młodzieży` 30+28+12 | `/quady-dla-dzieci-i-mlodziezy/` | ✅ mamy, bez podawania wieku |

> **A9 to osobna intencja od „dzieci".** Rodzic nastolatka pyta o co innego niż rodzic ośmiolatka —
> i to jest wariant, w którym młody człowiek prowadzi sam. Odpowiedź nadal bez ani jednej liczby lat.

**Czego świadomie NIE robimy:** `co robić w Zakopanem` i pochodne (38+28+19+16 wyśw) to intencja
przewodnikowa, wykluczona w koncie jako negatywy. Strona odpowiada na intencję transakcyjną.
Tak samo `opinie` (398 wyśw) — to zadanie strony `/opinie/`, nie akapitu w FAQ.

---

## 3. ROLA B — brakujące obiekcje

### 3.1 Do odzyskania ze starej strony

Stara strona ma na nie **napisane odpowiedzi** — widać je w rozwijanym FAQ. To najtańsze
odblokowanie: kopiujemy, weryfikujemy u Piotrka, wstawiamy. Nie traktujemy jako źródła prawdy,
bo ta sama strona podaje 300 zł i Rybkówkę 13.

| # | Pytanie | Dlaczego potrzebne |
|---|---|---|
| B1 | **Czy to jest legalne?** | `Legalny offroad` to **najczęstszy nagłówek w koncie (19×)** i filar komunikacji #1. Realny wyróżnik — część konkurencji jeździ nielegalnie. Brak tego pytania w FAQ to największa luka roli B |
| B2 | **Czy to jest bezpieczne?** | Kobiety konwertują o 27% lepiej i to one podejmują decyzję dla pary lub rodziny. Ton bezpieczeństwa jest tu walutą |
| B3 | **Czy jadę sam, czy z przewodnikiem?** | Rozstrzyga lęk „zostanę sam w górach" i jednocześnie „nie chcę, żeby ktoś mnie prowadził za rękę" |
| B4 | **Czy można zabrać pasażera?** | Wiąże się z buggy 6-osobowym i z pytaniem o dzieci |
| B5 | **Co zabrać ze sobą?** | Praktyczne. **Nie mylić z B8** — to co przynosi klient, nie co daje firma |
| B6 | **Co będzie lepsze — quad czy buggy?** | Stara strona ma na to dobrą odpowiedź. Uwaga: to **inne pytanie niż A5** — ATV to synonim produktu, a to jest pytanie o wybór |
| B7 | **Dam radę, jeśli nigdy nie jeździłem?** | Jest w banku jako `pierwszy-raz`, ale **nie ma go w zestawie `home`** — a to obiekcja pierwszego kontaktu |

### 3.2 Nowe — wszystkie czekają na fakt od Piotrka

| # | Pytanie | Dlaczego potrzebne | Blokada |
|---|---|---|---|
| B8 | **Co jest wliczone w cenę?** | Kask, kombinezon, paliwo, instruktor, ubezpieczenie. Odwrotność B5 | #2, jest w banku |
| B9 | **Czy trzeba płacić z góry? Jest zadatek?** | **1 516 rozpoczętych płatności → 119 zakupów.** 1 397 osób rocznie porzuca koszyk. To najbardziej prawdopodobny pojedynczy powód | #3 — **najwyższy priorytet w projekcie** |
| B10 | **Co, jeśli muszę odwołać albo przełożyć?** | Ten sam przeciek. Człowiek nie zapłaci z góry, jeśli nie wie, co się stanie przy zmianie planów | #4 |
| B11 | **Czy godzina to czas na trasie, czy razem ze szkoleniem?** | Negatywna opinia mówi wprost: **„2 h skrócone do 1 h"**. Ten zarzut wraca jako 1★ i psuje ranking wizytówki | nowa |
| B12 | **Co, jeśli uszkodzę pojazd? Jest kaucja?** | Realna obiekcja przy pojeździe silnikowym. Brief nie ma odpowiedzi | #3 z briefu |
| B13 | **Czy jeździcie, kiedy pada?** | Deszczowy dzień w Zakopanem to moment, w którym ludzie szukają zajęcia. Jeśli firma jeździ — to przewaga do napisania wprost | #7, jest w banku |
| B14 | **Ile macie pojazdów?** | Wiarygodność przy rezerwacji grupowej + świetny konkret pod AI search | #7 z briefu |
| B15 | **Czy odbieracie z hotelu?** | Pojawia się w zapytaniach wg briefu; wolumen minimalny | #10 z briefu |
| B16 | **Czy jedziemy w grupie z obcymi, czy tylko my?** | **Propozycja bez pokrycia w danych** — realna obiekcja, ale nie mam na nią dowodu. Zapytać Piotrka, czy chce ją adresować | do decyzji |
| B17 | *(EN)* **Do your instructors speak English?** | Ruch EN konwertuje 35% taniej, a „English-speaking instructors" jest w reklamach bez potwierdzenia | #11 |

---

## 4. Rozkład per strona

| Strona | Ile | Skład |
|---|---:|---|
| **Strona główna** | 6 | prawo jazdy · dzieci · **A1 cena** · ile trwa · **B1 legalne** · jak zarezerwować |
| `/quady-zakopane/` | 9 | A1 · A5 ATV · A6 zima · prawo jazdy · dzieci · B8 co w cenie · B11 czas · B1 legalne · A7 gdzie |
| `/buggy-zakopane/` | 8 | A3 cena · B6 quad czy buggy · B4 pasażer · prawo jazdy · dzieci · B8 · B1 · A7 |
| `/skutery-sniezne-zakopane/` | 7 | **A2 cena** · sezon · skutery prawo jazdy · co zabrać · B1 legalne · A7 gdzie · B13 pogoda |
| `/cennik/` | 6 | A1 · A2 · A3 · **A4 za osobę czy pojazd** · B8 · B9 zadatek · B10 odwołanie |
| `/quady-dla-dzieci-i-mlodziezy/` | 6 | dzieci · dziecko samo · **A9 nastolatki** · B4 pasażer · B2 bezpieczne · B8 |
| `/quady-bez-prawa-jazdy/` | 5 | prawo jazdy · uprawnienia · B7 pierwszy raz · B3 przewodnik · B1 legalne |
| Lokalne (Białka, Bukowina) | 5 | **A8 dojazd** · A7 gdzie · A1/A3 cena · prawo jazdy · jak zarezerwować |
| **EN produktowe** | 6 | **A7 where** · A2 price · B17 English · prawo jazdy · B7 beginner · jak zarezerwować |

Strona główna zostaje na sześciu celowo — 72% ruchu jest już w Zakopanem i chce ceny
i telefonu, nie czytania. Zmiana jest jakościowa: **wchodzi cena i legalność**, wychodzi nic.

---

## 5. Konsekwencja dla projektu sekcji

Obecny layout to akordeon w lewej kolumnie i zdjęcie w prawej, dobrany pod 4 pozycje.
Przy dziewięciu kolumna ze zdjęciem przestanie się bilansować.

Propozycja, która rozwiązuje layout i podział ról naraz — **dwie podpisane grupy**:

```
Zanim zarezerwujesz     ← rola A: cena, gdzie, ATV, sezon        (rozwinięte pierwsze)
Praktyczne              ← rola B: legalne, co w cenie, czas, pogoda  (zwinięte)
```

Zdjęcie przechodzi nad sekcję albo między grupy. Numeracja `01–04` ma sens tylko wtedy,
gdy pytania są ciągiem — przy dwóch grupach lepiej ją zastąpić podpisami grup.

---

## 6. Co odblokowuje ile

| Priorytet | Fakt od Piotrka | Odblokowuje |
|---|---|---|
| **1** | Zadatek, metody i moment płatności | B9 — i prawdopodobnie część przecieku 92% |
| **2** | Polityka odwołania i zmiany terminu | B10 — ten sam przeciek |
| **3** | Cennik skuterów | **A2 — najmocniejsze pytanie w całym koncie** + cały sezon zimowy |
| **4** | Cena za osobę czy za pojazd | A4 — i przestajemy generować 1★ |
| **5** | Co zawiera cena | B8 na każdej stronie |
| **6** | Co wlicza się w czas wyprawy | B11 — drugi zarzut z opinii |
| **7** | Czasy dojazdu | A8 + blok „Skąd do nas dojedziesz" |
| **8** | Kaucja i odpowiedzialność za pojazd | B12 |
| **9** | Polityka pogodowa | B13 |
| **10** | Flota, hotel, języki instruktorów | B14, B15, B17 |

Pozycje 1–4 to jeden telefon i cztery odpowiedzi. Zamykają najdroższy problem w firmie
(przeciek na checkoucie), najmocniejsze pytanie w koncie i jedno źródło negatywnych opinii.
