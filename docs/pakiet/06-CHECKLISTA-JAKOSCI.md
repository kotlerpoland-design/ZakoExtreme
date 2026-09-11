# 06 — Checklista jakości. Bramka przed publikacją.

Ten plik nie jest listą życzeń. To są **bramki** — jeśli którakolwiek nie przechodzi,
strona nie idzie live.

Kolejność jest celowa: od rzeczy, które **niszczą** (bramki blokujące), przez rzeczy,
które **kosztują**, do rzeczy, które **poprawiają**.

---

# A. Bramki blokujące — zero tolerancji

Każda z tych rzeczy oznacza wstrzymanie publikacji. Nie „poprawimy po weekendzie".

## A1. Wiek — nigdzie ani jednej liczby

```bash
# Uruchom na zbudowanym katalogu (.next lub out), nie na źródłach
grep -rEn '\b[0-9]{1,2}\s*(lat|lata|latka|latek|latki|years?|yrs?)\b' ./out
grep -rn 'suggestedMinAge\|minAge\|ageRange' ./out
```
**Oczekiwany wynik: zero trafień.** W treści, w schema, w alt-tekstach,
w meta description, w `llms.txt`, w danych strukturalnych.

Dozwolone zamienniki są w `03-COPY-NAGLOWKI.md` §5.3.

> **Dlaczego to jest bramka blokująca, a nie uwaga:** to jest informacja o bezpieczeństwie
> dzieci na pojeździe silnikowym w górach, a firma nie ma ustalonej reguły.
> Każda liczba będzie nieprawdziwa w którymś przypadku.

## A2. Cena wejściowa — 250, nigdy 300

```bash
grep -rn '300 zł\|300zł\|od 300\|300 PLN' ./out
```
**Oczekiwany wynik: zero trafień** w kontekście ceny wejściowej quada/buggy.

Poprawna drabinka: **250 / 450 / 650** (quad i buggy), **550 / 1000** (buggy 6-os.),
**750** (Maverick XRS), **200 / 300 / 550** (skutery śnieżne, 30/60/120 min, potwierdzone 2026-09-11).

> **Wyjątek skuterów:** PREMIUM 60 min to legalne **300 zł**. `pnpm check:content` pomija pliki stron
> `/skutery-sniezne-zakopane/` i `/en/snowmobile-tours-zakopane/` oraz trafienia, przed którymi w 200 znakach
> stoi „skuter"/„snowmobil" (odpowiedź FAQ, przyszły `/cennik/`). Wszędzie indziej „300 zł" nadal blokuje.

> Stara podstrona na WordPressie **nadal pokazuje 300/450/650**. To jest błąd na żywej
> stronie, nie źródło prawdy. Nie kopiuj z niej cennika.

## A3. Liczba opinii — „ponad 800", nigdy dokładna

```bash
grep -rEn '\b(76[0-9]|77[0-9]|78[0-9]|79[0-9]|8[0-9]{2})\s*(opinii|opinie|reviews)' ./out
```
Dozwolone: „ponad 800 opinii", „+800 opinii", „800+ reviews".
Ocena **4,8★** jest stabilna i można ją podawać.

Wyjątek: `reviewCount` w schema — patrz `04-SEO-GEO-SCHEMA.md` §3.1a.
Tam liczba jest wymagana i musi być **pobierana automatycznie**, nie wpisana na sztywno.

## A4. Zero wymyślonych danych

Przejdź stronę i dla **każdej** liczby, obietnicy, opinii i terminu odpowiedz sobie:
**skąd to wiem?** Dopuszczalne odpowiedzi: „z `01-BRIEF-I-FAKTY.md`" albo „od Piotrka".

```bash
# Znaczniki, które NIE MOGĄ trafić na produkcję
grep -rn 'DO POTWIERDZENIA\|TO CONFIRM\|TODO\|LOREM\|PLACEHOLDER\|XXX' ./out
```
**Oczekiwany wynik: zero trafień.** Znacznik oznacza, że fakt nie został potwierdzony —
wtedy **całe zdanie lub cała sekcja nie idzie na stronę**. Nie zastępuj znacznika domysłem.

Zakazane bez pokrycia: „zaufało nam X turystów", „promocja do", „zostały 3 miejsca",
„najlepsi w Zakopanem" bez źródła, wymyślone opinie.

## A5. Zakazane nazwy

```bash
grep -rni 'snowdoo\|marcel' ./out
```
`Snowdoo` = konkurencja. `Marcel` = były przewodnik. Obecny, chwalony w opiniach: **Wojtek**.

## A8. Firma nie jest czynna 24 h

```bash
grep -rniE "czynn[ea] *24|całą dobę|open *24 *h|around the clock" ./out
grep -rniE "24 */ *7" ./out | grep -viE "online *24 */ *7"
```
Zero trafień. „Czynne 24 h" było nieprawdą (decyzja właścicielki 2026-09-10) — całą dobę działa tylko strona
i rezerwacja online. Jedyne dozwolone sformułowanie: **„Rezerwacja online 24 h" / „Book online 24/7"**.
Schema bez `openingHoursSpecification`. `pnpm check:content` sprawdza to jako bramkę A8.

## A6. Przekierowania 301 działają

**To jest bramka, przez którą przechodzi całe konto reklamowe.** 56 aktywnych reklam
kieruje na 7 starych adresów.

```bash
for u in \
  "/wyprawy-quadami-w-zakopanem/" \
  "/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/" \
  "/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/" \
  "/start/" \
  "/en/wyprawy-quadami-w-zakopanem/" \
  "/en/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/" \
  "/en/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/" \
  "/start-sk/" ; do
  echo "== $u"; curl -sI "https://zakoextreme.pl$u" | head -3
done
```
Każdy musi zwrócić **301** i `Location` zgodny z mapą w `02-ARCHITEKTURA-URL.md` §5.

**Sprawdź też, czy query string przeżywa przekierowanie:**
```bash
curl -sI "https://zakoextreme.pl/start/?gclid=TEST123" | grep -i location
```
`gclid` musi być w `Location`. Bez tego wszystkie konwersje z reklam
przestają się przypisywać do kampanii.

## A7. Jeden kontener GTM

```bash
curl -s https://zakoextreme.pl/ | grep -o 'GTM-[A-Z0-9]*' | sort -u
```
Dokładnie jedno trafienie: **`GTM-NGRKVVNF`**.
Nie `GTM-T3PTPJ4K`, nie `GTM-KGM2CNF4`. Dwa kontenery = podwójne konwersje
= algorytm licytuje na zawyżonych liczbach.

---

# B. Bramki konwersyjne — testowane na prawdziwym telefonie

**Nie w DevTools. Na telefonie, na LTE, na dworze.**
95,9% ruchu to komórka, a spora część tego ruchu jest fizycznie w górach.

## B1. Test pierwszego ekranu

Otwórz każdą stronę produktową na 390×844. **Nie przewijaj.**

- [ ] Widzę **frazę główną** w H1 (tę samą, która jest w reklamie)
- [ ] Widzę **cenę od** (strony produktowe; hero strony głównej celowo bez ceny — decyzja 2026-09-09)
- [ ] Widzę **przycisk „Zadzwoń"** i jest to najbardziej widoczny element po H1
- [ ] Widzę **ocenę 4,8 i „ponad 800 opinii"** (pierwsza pozycja paska zaufania tuż pod hero)
- [ ] Widzę **„blisko centrum Zakopanego"**
- [ ] Baner zgód **nie zasłania** przycisku „Zadzwoń"

Jeśli którakolwiek pozycja wypada — pierwszy ekran jest do przeprojektowania.

> Persona A to 72% ruchu: jest w Zakopanem, trzyma telefon, ma wolne popołudnie.
> Wszystko, co musi przewinąć, żeby zadzwonić, jest kosztem.

## B2. Ścieżka telefoniczna

- [ ] Kliknięcie w numer **otwiera dialer** z poprawnym `+48539320700`
- [ ] Numer działa w FAQ („Nie wiesz, co wybrać? Zadzwoń."), przy dojeździe, w stopce i w sekcji Kontakt — i **nigdzie indziej** (header, menu, sticky bar, hero, „Dla kogo" prowadzą wyłącznie do `#rezerwacja`; decyzja 2026-09-10)
- [ ] **Wyjątek: `/vouchery/`.** Tam telefon JEST CTA („Zamów voucher”, `cta_location: 'voucher'`, przycisk konturowy w ekranie 1 i w sekcji „Jak zamówić voucher”), bo voucher ustala się telefonicznie — SlotWise go nie sprzedaje, a adresu e-mail firma nie potwierdziła. Pomarańczowy `#rezerwacja` zostaje na tej stronie osobno i prowadzi do rezerwacji przejazdu.
- [ ] `phone_click` strzela z **każdego** z tych miejsc, z poprawnym `cta_location`
- [ ] Sticky bar pojawia się po przewinięciu i **nie zasłania treści**

## B3. Ścieżka rezerwacyjna — najważniejszy test w całym projekcie

Przejdź **całą** ścieżkę do opłacenia, na telefonie, na LTE:

- [ ] Widżet SlotWise ładuje się i jest używalny na 390 px szerokości
- [ ] Da się wybrać wariant i termin bez zoomowania
- [ ] **BLIK działa**
- [ ] Sesja **nie gubi się** przy przejściu do bramki płatniczej
- [ ] Po płatności następuje powrót na stronę potwierdzenia
- [ ] `purchase` strzela z poprawnym `transaction_id` i `value`
- [ ] `add_to_cart` strzela **przed** `begin_checkout`

> **Jeśli ten test nie przechodzi, cała reszta pracy jest bezwartościowa.**
> Obecnie 1 397 osób rocznie rozpoczyna płatność i jej nie kończy.
> Zbuduj najlepszą stronę świata i nadal stracisz 92% z nich.
>
> Ten test wykonaj **na początku projektu**, na obecnej stronie — żeby wiedzieć,
> czy problem jest po stronie strony, czy po stronie SlotWise. Od tej odpowiedzi
> zależy, czy widżet ma być iframe'em, czy przekierowaniem.

## B4. Ścieżka informacyjna (persona B)

- [ ] Zdjęcia i wideo ładują się szybko i pokazują **realne trasy**
- [ ] FAQ odpowiada na prawo jazdy, dzieci, cenę i pogodę **bez rozwijania trzech poziomów**
- [ ] Da się zarezerwować termin **w przyszłości**, nie tylko na dziś
- [ ] Sekcja „Skąd do nas dojedziesz" ma **realne czasy dojazdu**, nie listę nazw

---

# C. Bramki Google Ads — czyli te „100/100"

## C1. Message match

Dla **każdej** grupy reklam z tabeli w `03-COPY-NAGLOWKI.md` §7:

- [ ] Fraza wiodąca grupy jest w **H1** strony docelowej
- [ ] Nagłówki reklam mają odpowiedniki **w pierwszym ekranie** strony
- [ ] Cena z reklamy („od 250 zł") zgadza się z ceną na stronie
- [ ] Obietnica z reklamy („bez prawa jazdy", „legalne trasy") jest na stronie **wprost**

**Test praktyczny:** otwórz reklamę i stronę docelową obok siebie.
Czy człowiek, który kliknął, widzi **to samo**, co obiecywała reklama?
Jeśli musi szukać — Google też to widzi i podnosi CPC.

## C2. Landing Page Experience

- [ ] Strona ładuje się **poniżej 2,5 s na 4G**
- [ ] Zero interstitiali i pop-upów zasłaniających treść po wejściu
- [ ] Zero automatycznie odtwarzanego dźwięku
- [ ] Polityka prywatności istnieje i jest linkowana ze stopki
- [ ] Dane kontaktowe (NAP) są widoczne na każdej stronie
- [ ] Strona nie ma treści wprowadzającej w błąd ani ukrytych kosztów

## C3. Kompletność pokrycia intencji

- [ ] Każdy z 10 klastrów z `02-ARCHITEKTURA-URL.md` §2.2 ma swój URL
- [ ] Każda grupa reklam ma przypisany URL i **Robert to dostał**
- [ ] Białka i Bukowina mają **własną, unikalną treść**, nie kopię strony quadów
  (minimum 40% treści unikalnej — sprawdź porównywarką tekstu)

---

# D. Bramki SEO / GEO

- [ ] Każda strona ma **unikalny** title i description w limitach (60 / 140–160)
- [ ] Każda strona ma **dokładnie jeden H1**
- [ ] `hreflang` jest **dwukierunkowy** na każdej parze PL↔EN, z `x-default`
- [ ] `canonical` na każdej stronie wskazuje na siebie
- [ ] Schema przechodzi **Rich Results Test** bez błędów
- [ ] Treść `FAQPage` w schema jest **identyczna** z treścią widoczną na stronie
- [ ] **W schema NIE MA `aggregateRating` ani `Review`** — patrz `04` §3.1a
- [ ] **NAP zgodny z wizytówką:** Rybkówka **16/2** (nie 13), geo `49.3177 / 19.9962`,
      tel. `+48 539 320 700` — identycznie w treści, w stopce i w schema
- [ ] `robots.txt` **nie blokuje** `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`
- [ ] `/llms.txt` istnieje i zawiera aktualne ceny
- [ ] `sitemap.xml` zawiera wszystkie 20 stron, tylko w wersjach kanonicznych
- [ ] Każdy obraz ma `alt` opisujący **co widać**, nie listę słów kluczowych
- [ ] Akapity przechodzą **test cytowalności** z `04-SEO-GEO-SCHEMA.md` §1

**Test cytowalności w praktyce:** wybierz losowo pięć akapitów, wyrwij je z kontekstu
i sprawdź, czy nadal wiadomo kto, gdzie, co i za ile. Jeśli nie —
model AI ich nie zacytuje.

---

# E. Bramki wydajnościowe

Mierz na **prawdziwym telefonie średniej klasy, na LTE**. Nie na MacBooku na Wi-Fi.

| Metryka | Próg | Krytyczne? |
|---|---|---|
| LCP | < 2,0 s | **tak** |
| INP | < 200 ms | tak |
| CLS | < 0,05 | tak |
| Waga pierwszego ekranu | < 310 kB | tak |
| Lighthouse mobile — Performance | ≥ 90 | nie, ale blisko |

> Waga pierwszego ekranu: **310 kB od 2026-09-10** (decyzja właścicielki), wcześniej 300 kB. Powód: zdjęcie sekcji
> FAQ na stronie głównej (`media.sections.faq`) dokłada ~2 kB gz do HTML, a strona stała dokładnie na progu.
> Bramkę mierzy `tests/first-screen.spec.ts` („budżet pierwszego ekranu") — próg zmieniać w obu miejscach naraz.

- [ ] Obraz hero: `next/image` + `priority` + AVIF/WebP
- [ ] Widżet SlotWise ładowany **leniwie** (`IntersectionObserver`), nie w `<head>`
- [ ] Maksymalnie dwie rodziny fontów, `display: swap`
- [ ] Piksele przez GTM ze `strategy="afterInteractive"`
- [ ] Zarezerwowana wysokość dla hero, sticky bara i widżetu (żeby nie skakało)

---

# F. Bramki dostępności i poprawności

- [ ] Kontrast tekstu ≥ 4,5:1 (szczególnie na zdjęciach w hero). Ciemny motyw (2026-09-09): tokeny w `app/globals.css`
      policzone (audyt 2026-09-09, 44 pary: foreground 16,9:1 · muted-foreground 8,1:1 · brand `#f5a524` 9,1:1 / 8,3:1 na karcie ·
      grafit na primary 9,1:1 (biały miałby 2,0:1 — dlatego napis CTA jest ciemny) · najsłabszy tekst `text-muted-foreground/70`
      4,56:1). UI ≥ 3:1: ring pełny 9,1:1, primary vs tło 9,1:1, obwódka karty PREMIUM `ring-brand/80` > 3:1. `--border` (1,5:1)
      uznany za dekorację — żaden komponent nie jest identyfikowany samą obwódką. Przy zmianie tokenu przeliczyć pary skryptem
      (skill contrast-checker).
- [ ] Przyciski mają minimum **44×44 px** obszaru dotyku
- [ ] Nawigacja klawiaturą działa, focus jest widoczny
- [ ] Formularze mają etykiety powiązane z polami
- [ ] Strona działa z wyłączonym JS na tyle, że **widać numer telefonu**
- [ ] Poprawna polska typografia: „cudzysłowy", półpauzy –, `nbsp` po spójnikach
- [ ] Teksty EN sprawdzone przez człowieka znającego angielski —
      to jest ruch, który konwertuje **o 35% taniej**, nie miejsce na kalki z polskiego

---

# G. Procedura publikacji — kolejność jest obowiązkowa

1. [ ] Wszystkie bramki A przechodzą
2. [ ] Wszystkie bramki B przechodzą **na prawdziwym telefonie**
3. [ ] Nowa strona live pod docelową domeną
4. [ ] Wszystkie 301 zweryfikowane przez `curl -I`, **z zachowaniem query string**
5. [ ] Search Console: zgłoszony sitemap, sprawdzony raport indeksowania
6. [ ] Robert potwierdza, że widzi konwersje z nowego adresu w Google Ads
7. [ ] **Dopiero teraz** Robert podmienia final URL-e w Google Ads i Meta
8. [ ] Stare adresy zostają z 301 **na zawsze** — nie usuwaj ich po miesiącu

> **Punkt 7 nie może wyprzedzić punktu 3.** Podmiana URL-i w reklamach przed publikacją
> strony to kilkaset złotych dziennie wydane na błędy 404, przy 56 aktywnych reklamach.

---

# H. Pierwsze 14 dni po publikacji

Publikacja nie jest końcem. To jest moment, w którym zaczynają spływać dane,
których dziś nie ma.

**Codziennie przez pierwszy tydzień:**
- [ ] Search Console — błędy indeksowania, spadki wyświetleń
- [ ] Google Ads — czy konwersje spływają; czy CPC nie skoczył
- [ ] GA4 — czy `add_to_cart` ≥ `begin_checkout` (naprawiony lejek)
- [ ] Realtime — czy `phone_click` strzela z każdego `cta_location`

**Po 14 dniach — pierwsze wnioski, na które te dane pozwolą:**
- Który `cta_location` generuje telefony → czy sticky bar był dobrą decyzją
- Które `faq_id` jest otwierane najczęściej → co przenieść wyżej na stronie
- Czy `purchase` wzrósł względem `begin_checkout` → czy checkout naprawiony
- Czy strony lokalne (Białka, Bukowina) zbierają ruch → czy warto dołożyć kolejne

**Po 30 dniach i przy ~30 zakupach miesięcznie:** Robert przełącza główną konwersję
w Google Ads z `phone_click` na `Purchase`. To jest moment, w którym konto zaczyna
licytować pod pieniądze, a nie pod intencję — ale nie wcześniej,
bo algorytm potrzebuje danych z nowej strony.

---

# I. Jedno zdanie na koniec

Wszystko w tym pakiecie sprowadza się do jednej rzeczy:

> **Człowiek jest w Zakopanem, trzyma telefon, ma wolne popołudnie.
> Ma zadzwonić albo zarezerwować w mniej niż 30 sekund.**

Jeśli jakakolwiek decyzja projektowa stoi z tym w sprzeczności — to ta decyzja jest zła,
niezależnie od tego, jak dobrze wygląda.
