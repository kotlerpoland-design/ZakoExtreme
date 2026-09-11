# 01 — Brief i fakty. Jedyne źródło prawdy.

Wszystko na stronie musi pochodzić z tego pliku albo bezpośrednio od Piotrka.
Cokolwiek, czego tu nie ma — nie trafia na stronę.

---

# 1. TWARDE ZAKAZY

Te reguły łamie się najłatwiej i kosztują najwięcej. Przeczytaj je zanim napiszesz
pierwszą linijkę tekstu.

### ❌ Nigdy nie podawaj minimalnego wieku
Żadnego „od 13 lat", „od 14 lat", „od 16 lat", „od 10 lat". **Nigdzie** — ani w treści,
ani w FAQ, ani w schema, ani w alt-tekstach, ani w meta description.

**Dlaczego:** wiek nie jest ustalony po stronie firmy. Notatki ze spotkań mówiły 13–14,
lipcowy wpis na wizytówce mówił 14, a właściciel mówi „ciężko powiedzieć, nawet 10-latki
jeżdżą same na specjalnym torze". Każda liczba, którą wpiszesz, będzie nieprawdziwa
w którymś przypadku — a to jest informacja o bezpieczeństwie dzieci.

**Jak pisać zamiast tego (dozwolone sformułowania):**
- „za zgodą rodzica"
- „osobny, ogrodzony tor dla dzieci pod opieką instruktora"
- „na trasie głównej dziecko jedzie z osobą dorosłą"
- „szczegóły ustalamy telefonicznie — zadzwoń, dobierzemy wariant"

> Jest to o tyle podchwytliwe, że **konto reklamowe licytuje frazę `quad dla 14 latka`**
> i inne zapytania o wiek. Musisz na tę intencję odpowiedzieć — ale bez podawania liczby.
> Gotowy tekst jest w `03-COPY-NAGLOWKI.md`.

### ❌ Nigdy nie pisz ceny wejściowej quada innej niż 250 zł
Cena wejściowa quada to **od 250 zł**. Nie 300. Nie 280.
**Buggy to osobny cennik** (potwierdzony 2026-09-11, §3.2): 2-os. od **500 zł** za buggy (do 2 osób) — nigdy „od 250 zł" przy buggy.

**Dlaczego:** stara notatka mówiła 300 zł i ta liczba rozlała się po wszystkich materiałach.
Właściciel zareagował na to bardzo stanowczo. **250 to cena nagłówkowa.**

> Uwaga: stara podstrona quadów na WordPressie **wciąż pokazuje 300/450/650**. To jest błąd
> na żywej stronie, nie źródło prawdy. Nie kopiuj z niej cennika.

**To nie jest literówka — to jest błąd, który kosztuje firmę opinie.**
W negatywnych opiniach z wizytówki powtarza się zarzut *„300 za osobę, 600 za dwie —
zdzierstwo"*. Ludzie porównują to, co przeczytali na stronie, z tym, co usłyszeli na miejscu,
i piszą jedynkę. **Nieaktualna strona generuje 1★.**

To jest najlepszy argument, jaki masz, żeby traktować dokładność treści jako bramkę,
a nie jako detal. Ta sama mechanika dotyczy dwóch innych zarzutów:
*„2 h skrócone do 1 h"* i *„trasa inna niż w opisie na stronie"*.

**Wniosek praktyczny:** opis trasy i czasu na nowej stronie musi opisywać to,
co klient **naprawdę dostanie**. Jeśli nie wiesz, jak wygląda trasa —
`[[DO POTWIERDZENIA]]`, nie kwiecisty opis. Obietnica, której firma nie dowiezie,
wraca po tygodniu jako opinia, która psuje ranking wizytówki.

### ❌ Nigdy nie podawaj dokładnej liczby opinii
Piszesz **„ponad 800 opinii"** albo **„+800 opinii"**. Nigdy „769 opinii" ani żadnej
konkretnej liczby.

**Dlaczego:** liczba zmienia się co tydzień i natychmiast się dezaktualizuje.
Ocena **4,8★** jest stabilna i można ją podawać.

### ❌ Nigdy nie wymyślaj opinii, statystyk, promocji ani terminów
Żadnych „zaufało nam 15 000 turystów", „promocja do końca miesiąca", „zostały 3 miejsca".
Jeśli nie masz tego od Piotrka — tego nie ma.

Opinie na stronę bierzesz **wyłącznie prawdziwe, z wizytówki Google**. Poproś Roberta
o eksport, jeśli będziesz ich potrzebować.

### ❌ Nie wymieniaj przewodnika „Marcel"
Marcel to **były** przewodnik (występuje w starych opiniach). Obecny przewodnik chwalony
w opiniach to **Wojtek (Wojciech)**.

### ❌ Nie pisz, że firma jest „czynna 24 h"
To nieprawda (decyzja właścicielki 2026-09-10). Całą dobę działa **strona i rezerwacja online** — jedyne dozwolone
sformułowanie to „Rezerwacja online 24 h" / „Book online 24/7". Zero „czynne 24 h", „open 24/7", „odbieramy całą dobę"
w treści, meta, schema (bez `openingHoursSpecification`). Bramka `A8` w `scripts/check-content.mjs` to blokuje.

### ❌ Nie używaj nazwy „Snowdoo"
`snowdoo` i `snowdoo adventure zakopane` to marka **konkurencji**, na którą konto zbiera ruch.
Nie umieszczaj jej na stronie.

---

# 2. Firma — dane podstawowe

| Pole | Wartość |
|---|---|
| Nazwa | **ZakoExtreme** |
| Domena | `zakoextreme.pl` |
| Telefon | **+48 539 320 700** |
| Godziny | **nie podajemy** — „czynne 24 h" to nieprawda (decyzja właścicielki 2026-09-10); całą dobę działa tylko strona i rezerwacja online. Prawdziwe godziny pracy bazy i odbierania telefonu: `[[DO POTWIERDZENIA]]` |
| Adres | **Rybkówka 16/2, 34-500 Zakopane** |
| Ocena Google | **4,8★, ponad 800 opinii** |
| System rezerwacji | SlotWise (`bookings.slotwise.pl`, business-id `cmpo09er30083og01xobb2992`) |
| Właściciel / kontakt | Piotrek |
| Profile społecznościowe | potwierdzone 2026-09-10 — Instagram `https://www.instagram.com/zako_extreme_/`, Facebook `https://www.facebook.com/zakoextreme`, TikTok `https://www.tiktok.com/@zako_extreme`, YouTube `https://www.youtube.com/@ZAKOEXTREME` |

> Facebook zapisujemy **bez** `?locale=pl_PL`. Parametr wymusza polski interfejs u anglojęzycznego
> użytkownika i zaśmieca kanoniczny adres w `sameAs`. Te cztery adresy są jedynym źródłem
> dla ikon w stopce i dla `sameAs` w schema — jedno miejsce w kodzie: `config/site.ts` (`SOCIAL_PROFILES`).

> Adres to **16/2**, nie „13". Starsze notatki miały tu błąd.

**Pozycjonowanie, które ma pokrycie w opiniach i w reklamach:**
- najdłużej działająca firma tego typu w Zakopanem
- blisko centrum Zakopanego
- legalne trasy (to jest realny wyróżnik — część konkurencji jeździ nielegalnie)
- doświadczeni, lokalni instruktorzy
- „Numer 1 na Podhalu" (pochwała powtarzająca się w opiniach)
- uczciwe ceny (motyw powtarzający się w opiniach)
- obsługa wieczorów kawalerskich i ognisk z grillem

---

# 3. Oferta i cennik

> **To jest cennik obowiązujący.** Zastępuje wszystkie wcześniejsze wersje.
> Wszystkie ceny są „od" — to ceny wejściowe, nie sztywne.

### 3.1 Wycieczka Quad / ATV

| Wariant | Czas | Cena | Uwagi |
|---|---|---:|---|
| **STANDARD** | 1 h | **od 250 zł** | trasa 12–15 km |
| **PREMIUM** | 2 h | od 450 zł | |
| **ULTRA** | 3 h | od 650 zł | opcja ogniska z grillem |

> ~~Quad i buggy mają tę samą drabinkę~~ — **nieaktualne od 2026-09-11.** Buggy ma własny cennik (§3.2), droższy i liczony
> za pojazd. Publikowanie „od 250 zł" przy buggy odtwarzało mechanizm z opinii 1★ („na stronie inna cena niż na miejscu",
> `docs/strony/BUGGY.md` §6). Otwarte zostaje, czy 250 zł quada to cena za osobę, czy za pojazd (`03-COPY` §8 poz. 18).

### 3.2 Buggy 4×4 — cennik potwierdzony przez właściciela 2026-09-11 (cena ZA POJAZD)

**Buggy 2-osobowe** — cena za buggy, do 2 osób:

| Wariant | Czas | Cena |
|---|---|---:|
| **STANDARD** | 1 h | **od 500 zł** |
| **PREMIUM** | 2 h | od 900 zł |
| **ULTRA** | 3 h | od 1200 zł |

**Buggy 6-osobowe** — cena za buggy, zależna od liczby osób i czasu:

| Osoby | 1 h | 2 h |
|---|---:|---:|
| do 4 osób | od 550 zł | od 1000 zł |
| do 6 osób | od 650 zł | od 1200 zł |

To jest produkt **dla rodzin z dziećmi i większych grup** — cała rodzina jedzie jednym
pojazdem, prowadzi dorosły. Warto go wyeksponować, bo rozwiązuje problem „co z dzieckiem"
bez podawania wieku. „Do", nie „dokładnie": trzy osoby płacą stawkę „do 4 osób" (decyzja 2026-09-11).

Opisy tras buggy i to, czy „trasa 12–15 km" / „ognisko" dotyczą też buggy — nadal niepotwierdzone (nie publikujemy).

### 3.3 Maverick XRS

| Pojazd | Moc | Czas | Osoby | Cena |
|---|---|---|---|---:|
| Maverick XRS | 240 KM | 1 h | do 2 osób | od 750 zł |

Produkt premium / „wow". Dobry jako górna kotwica cenowa. Cena za pojazd (potwierdzone 2026-09-11).

### 3.4 Skutery śnieżne (sezon zimowy)

**Potwierdzone 2026-09-11** (drabinka ze starej strony, cena **za skuter**):

| Wariant | Czas | Cena od | Druga osoba na tym samym skuterze |
|---|---|---:|---:|
| STANDARD | 30 min | 200 zł | +50 zł |
| PREMIUM | 60 min | 300 zł | +50 zł |
| ULTRA | 120 min | 550 zł | +50 zł |

**W cenie:** skuter śnieżny · kask · szkolenie przed wyjazdem · paliwo · poczęstunek.
**Bez prawa jazdy**, **z instruktorem na każdej wyprawie** (oba potwierdzone 2026-09-11).

> Czasy skuterów (30/60/120 min) są inne niż quadów (60/120/180). PREMIUM 300 zł to legalna cena skuterów —
> zakaz „300 zł" z §1 dotyczy wyłącznie ceny wejściowej quada/buggy (bramka A2 pomija kontekst skuterów).
> Nadal otwarte: co klient bierze ze sobą na skuter (`skutery-co-zabrac`), polityka pogodowa.

### 3.5 Sezonowość

| Produkt | Sezon |
|---|---|
| Skutery śnieżne | **listopad – luty** |
| Quady / buggy | **maj – wrzesień** |
| Okres przejściowy | **marzec – czerwiec** (patrz niżej) |

**Marzec–czerwiec to problem.** Śniegu już nie ma, a sezon quadowy jeszcze nie ruszył.
W tym okresie konto przepala budżet (34,77 zł za konwersję w marcu vs 4,41 zł w sierpniu).

Strona musi mieć **trzeci stan sezonowy**, nie dwa. W okresie przejściowym eksponujesz
buggy 4×4 i quady na trasach bez śniegu — a **nie pokazujesz skuterów, których nie ma**.

---

# 4. Grupa docelowa — kto to naprawdę jest

Pełne dane w `../dane/analiza/ANALIZA-MASTER.md`. Skrót:

| Wymiar | Fakt |
|---|---|
| Urządzenie | **95,9% telefon komórkowy** |
| Wiek | **25–44 to 71% ruchu**; dominują 25–34 (46,8%) |
| Płeć | ~50/50, ale **kobiety konwertują o 27% lepiej** (CR 21,5% vs 16,9%) |
| Lokalizacja | **72% jest już na Podhalu**, głównie w samym Zakopanem |
| Reszta | ~25% to duże miasta = planowanie przed wyjazdem |
| Język | PL dominuje wolumenem, ale **EN konwertuje o 35% taniej** |

### Dwie persony, które muszą się zmieścić na jednej stronie

**Persona A — „Jesteśmy tu, pada, co robimy?" (72% ruchu)**
Para lub rodzina, 28–40 lat, jest w Zakopanem od wczoraj. Telefon w ręce, godzina 11:00.
Ma wolne popołudnie i chce coś zrobić **dzisiaj**. Nie zna firmy. Nie chce czytać.
Chce wiedzieć: *ile to kosztuje, czy są miejsca dziś, gdzie to jest, czy to bezpieczne* —
i zadzwonić.

**Czego potrzebuje w pierwszym ekranie:** cena od, telefon, „wolne terminy dziś",
odległość od centrum, ocena z opiniami.

**Persona B — „Planujemy wyjazd za dwa tygodnie" (~25%)**
Warszawa/Kraków/Wrocław, wieczór, przegląda na telefonie z kanapy (szczyt Meta o 21:00–22:00).
Chce zobaczyć, **jak to wygląda** i czy da się z dzieckiem / bez prawa jazdy.
Nie zadzwoni dziś — ale zapisze albo wróci.

**Czego potrzebuje:** zdjęcia i wideo tras, jasne FAQ o prawie jazdy i dzieciach,
możliwość rezerwacji na konkretną datę w przyszłości.

> **Konflikt do rozwiązania projektowo:** persona A nie może przewijać przez treść
> dla persony B. Rozwiązanie: pierwszy ekran w 100% należy do persony A;
> persona B dostaje wszystko poniżej pierwszego zgięcia.

---

# 5. Filary komunikacji

Pięć motywów, które są najczęściej używane w reklamach i mają pokrycie w zapytaniach
użytkowników. Każdy musi mieć swoje miejsce na stronie.

| # | Filar | Dlaczego działa |
|---|---|---|
| 1 | **Legalnie i bezpiecznie** | Najczęstszy nagłówek w koncie (19×). Odpowiada na realny lęk. |
| 2 | **Bez prawa jazdy** | 8 dedykowanych fraz + osobna kampania. Usuwa główną barierę. |
| 3 | **Blisko centrum Zakopanego** | 72% ruchu jest już na miejscu. |
| 4 | **Wolne terminy na dziś** | Szczyt ruchu 10:00–12:00 = decyzja na ten sam dzień. |
| 5 | **Widokowe trasy, doświadczeni instruktorzy** | To nie błotnista pętla — to Tatry. |

---

# 6. Zasoby, które istnieją

**Zdjęcia potwierdzone w bibliotece mediów (HTTP 200):**
```
https://zakoextreme.pl/wp-content/uploads/2025/05/zakopane-quady-2.jpg
https://zakoextreme.pl/wp-content/uploads/2025/04/wyprawy_na_quadach.jpg
```
Plus zamknięta lista 17 brandowanych PNG używanych do wpisów na wizytówce
(lista w `reklamy/HARMONOGRAM-WPISOW-GBP.md`).

> **Nie ma potwierdzonego zdjęcia buggy.** `buggy.png` i `quad.png` w mediach to małe ikony,
> nie fotografie. Poproś Piotrka o materiał — buggy to 17 z 56 reklam w koncie,
> czyli największa pojedyncza grupa, a nie mamy do niej zdjęcia.

**Wideo:** na Meta działa jedna kreacja („Video #1"), która daje najtańsze zakupy w firmie
(87,5 zł/zakup). Poproś Roberta o plik — to jest materiał sprawdzony w boju i powinien
trafić na stronę.

**Istniejący landing `/start`:** wtyczka WordPress w `zakoxtreme/landing-start/`.
Warto ją przejrzeć jako referencję — ma przemyślaną strukturę oferty i FAQ
oraz działający kontrakt zdarzeń. Motyw: ciemny + limonkowy `#8CC63F`, nagłówki Oswald.

> **Ale:** nie kopiuj jej 1:1. Powstała pod ruch letni i pod Google Ads,
> nie obsługuje sezonu zimowego ani klastrów lokalnych.

---

# 7. Stack obecnej strony (kontekst, nie do odtwarzania)

- WordPress + Elementor Pro + motyw hello-elementor
- TranslatePress (PL/EN) — darmowa wersja, limit 1 dodatkowy język
- Yoast SEO v26.8
- SlotWise jako system rezerwacji
- GTM `GTM-NGRKVVNF` (jeden kontener, GA4 i Ads w środku)
- Hosting LiteSpeed z ModSecurity blokującym POST do `/wp-json/`

---

# 8. Czego NIE wiemy — pytania do Piotrka

Zbierz to w jeden telefon. **Do czasu odpowiedzi te miejsca zostają puste na stronie —
nie wypełniaj ich domysłem.**

1. **Polityka płatności i zadatku.** Czy jest zadatek? Ile? Kiedy płatność — z góry czy
   na miejscu? Jakie metody? *(To blokuje FAQ i prawdopodobnie tłumaczy część przecieku
   na checkoucie.)*
2. **Polityka odwołania i zmiany terminu.** Do kiedy można odwołać? Czy zadatek przepada?
3. **Polityka przy uszkodzeniu pojazdu.** Kaucja? Ubezpieczenie? Do jakiej kwoty odpowiada klient?
4. **Dokładny cennik skuterów śnieżnych** — warianty, czasy, ceny. Mamy tylko zakres 200–600 zł.
5. **Zasady dla dzieci** — jak dokładnie działa osobny tor, co znaczy „z opiekunem".
   *(Potrzebne, by opisać to bez podawania wieku.)*
6. **Co dokładnie zawiera cena** — kask, kombinezon, paliwo, instruktor, ubezpieczenie?
7. **Ile pojazdów jest we flocie** i jakie modele. *(Konkret buduje wiarygodność
   i jest świetnym materiałem pod AI search.)*
8. **Czy trasy mają nazwy** i czy da się je pokazać na mapie.
9. **Zdjęcia buggy i skuterów** w rozdzielczości nadającej się na stronę.
10. **Czy jest transport / odbiór z hotelu?** *(Pojawia się w zapytaniach.)*
11. **Języki, w jakich obsługują instruktorzy.** *(Ruch EN konwertuje najlepiej —
    „English-speaking instructors" jest w reklamach, ale trzeba to potwierdzić.)*
12. **Kto ma dostęp do GTM** `GTM-NGRKVVNF` i do konta SlotWise.
