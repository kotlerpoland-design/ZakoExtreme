# ZakoExtreme — nowy landing page. Start tutaj.

Cześć Karolina.

Ten katalog to komplet materiału do zbudowania nowej strony ZakoExtreme na **Next.js**.
Wszystko, co tu jest, wynika z **realnych danych z konta Google Ads i Meta Ads za ostatnie
365 dni** — nie z domysłów, nie z „dobrych praktyk", nie z konkurencji.

Możesz wrzucić cały ten katalog do swojego Claude Code i pracować na nim jako na kontekście.

---

## Jak czytać ten pakiet

| Plik | Po co |
|---|---|
| **`00-START-TUTAJ.md`** ← jesteś tu | Kontakty, dostępy, kolejność działania |
| `01-BRIEF-I-FAKTY.md` | Firma, oferta, ceny, **twarde zakazy** |
| `02-ARCHITEKTURA-URL.md` | Mapa intencji → struktura stron i URL-i |
| `03-COPY-NAGLOWKI.md` | Gotowe H1/H2/CTA/FAQ pod każdy URL |
| `04-SEO-GEO-SCHEMA.md` | Metadane, schema.org, optymalizacja pod AI |
| `05-TRACKING.md` | Kontrakt zdarzeń, piksele, Consent Mode |
| `06-CHECKLISTA-JAKOSCI.md` | Bramki jakości przed publikacją |
| `../dane/analiza/ANALIZA-MASTER.md` | Pełna analiza danych — czytaj, jeśli chcesz zrozumieć „dlaczego" |
| `../dane/google-ads/*` | Surowe eksporty Google Ads (JSON) — możesz je sam/a przeliczyć |
| `../dane/meta-ads/*` | Surowe eksporty Meta Ads (JSON) |

**Sugerowana kolejność:** `01` → `02` → `03`, potem budowa, potem `04` i `05` przed publikacją,
a `06` jako bramka wyjścia.

---

## 1. Z kim musisz się skontaktować, zanim zaczniesz

### 1.1 Piotrek — właściciel ZakoExtreme
**To jest pierwszy telefon.** Numer do Piotrka dostaniesz od Roberta.

Od Piotrka potrzebujesz **trzech rzeczy** — poproś o wszystkie za jednym razem:

**(a) Numer telefonu do programisty**, który obsługuje obecną stronę `zakoextreme.pl`.
To osoba, bez której nie ruszysz z DNS-em, hostingiem ani z eksportem treści.

**(b) Decyzja o hostingu.** Ustalenie jest takie: **nie migrujemy obecnej strony.
Stawiamy landing page od zera na Next.js.** Obecna strona to WordPress + Elementor
+ TranslatePress na hostingu z LiteSpeed. Nowa strona ma być osobnym projektem.
Do ustalenia z Piotrkiem i programistą: czy nowy landing wchodzi na subdomenę,
na katalog, czy przejmuje domenę główną — i kto trzyma DNS.

**(c) Odpowiedzi na pytania otwarte** z sekcji „Czego nie wiemy" w `01-BRIEF-I-FAKTY.md`.
Zwłaszcza: **polityka płatności, zadatku i odwołania rezerwacji.** Nie mamy tego
i **nie wolno tego wymyślić**.

### 1.2 Programista obecnej strony
Od niego potrzebujesz:
- dostępu do DNS / panelu domeny,
- odpowiedzi, jak dokładnie jest wpięty **SlotWise** (widget, iframe, przekierowanie?),
- dostępu do **Google Tag Managera** `GTM-NGRKVVNF` (albo potwierdzenia, kto go ma),
- informacji, czy jest gdzieś eksport treści / zdjęć w wyższej rozdzielczości.

> **Uwaga techniczna, która oszczędzi ci pół dnia:** hosting ma ModSecurity, które zwraca
> **HTTP 406 na każdy POST do `/wp-json/`**. Jeśli będziesz próbować cokolwiek wgrać
> automatem na starą stronę — nie zadziała i to nie jest twój błąd. To reguła WAF,
> którą może rozluźnić tylko klient w panelu hostingu.

### 1.3 Robert (agencja)
Robert prowadzi Google Ads i Meta Ads. Do niego idziesz z:
- pytaniami o dane w tym pakiecie,
- ustaleniem finalnych URL-i, **zanim** je opublikujesz (reklamy muszą je dostać),
- wpięciem konwersji po stronie GTM/Google Ads.

**Krytyczne:** kiedy ustalisz finalną strukturę URL-i, **daj znać Robertowi zanim strona
pójdzie live**. W Google Ads jest teraz 56 reklam kierujących na 7 konkretnych adresów.
Jeśli te adresy znikną bez przekierowań, konto przestanie działać z dnia na dzień.

Obecne adresy docelowe reklam:
```
https://zakoextreme.pl/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/   (17 reklam)
https://zakoextreme.pl/wyprawy-quadami-w-zakopanem/                                  (9 reklam)
https://zakoextreme.pl/en/wyprawy-quadami-w-zakopanem/                               (8 reklam)
https://zakoextreme.pl/en/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/ (8 reklam)
https://zakoextreme.pl/start/                                                        (5 reklam)
https://zakoextreme.pl/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/   (4 reklamy)
https://zakoextreme.pl/en/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/ (1 reklama)
```
Każdy z nich musi dostać **301 na nowy odpowiednik** (mapowanie w `02-ARCHITEKTURA-URL.md`).

---

## 2. Czego ta strona ma dokonać — w jednym zdaniu

> Doprowadzić człowieka, który **jest już w Zakopanem**, **trzyma telefon w ręce**
> i ma **wolne popołudnie**, do **telefonu albo rezerwacji w mniej niż 30 sekund** —
> i przestać tracić 92% ludzi, którzy zaczynają płatność.

To nie jest strona wizerunkowa. To nie jest sklep. To jest **maszyna do umawiania przejazdów
na dziś i jutro.**

---

## 3. Pięć liczb, które musisz mieć w głowie przez cały projekt

| Liczba | Co znaczy dla twojej pracy |
|---|---|
| **95,9% ruchu to telefon komórkowy** | Projektujesz na 390×844. Desktop to widok kontrolny. |
| **72% użytkowników jest już na Podhalu** | Nie sprzedajesz marzenia o wyjeździe. Sprzedajesz „dziś o 15:00". |
| **1 516 rozpoczętych płatności → 119 zakupów** | Checkout jest zepsuty. To jest problem numer jeden. |
| **~18 200 kliknięć w telefon vs 119 zakupów online** | Telefon to główny kanał sprzedaży. `tel:` musi być wszędzie. |
| **Kobiety konwertują o 27% lepiej niż mężczyźni** | Ton: bezpiecznie i widokowo, nie „ekstremalnie i męsko". |

---

## 4. Stack i decyzje techniczne

**Ustalone:**
- **Next.js** (App Router). Strona statyczna/ISR — nie ma powodu na SSR per request.
- Deployment: do ustalenia z programistą. Vercel jest naturalnym wyborem, ale
  **decyzja należy do Piotrka** (koszty, kto ma konto, gdzie jest domena).
- Języki: **PL i EN równorzędnie.** EN nie jest tłumaczeniem — ma własne teksty.
  (Powód: angielski konwertuje o 35% taniej niż polski. Szczegóły w analizie.)
- Rezerwacje: **SlotWise** zostaje (`bookings.slotwise.pl`, business-id
  `cmpo09er30083og01xobb2992`). Nie budujemy własnego bookingu.

**Do rozstrzygnięcia przez ciebie:**
- Czy SlotWise wchodzi jako iframe na stronie, czy jako przekierowanie.
  **Zbadaj to najpierw** — bo tu prawdopodobnie siedzi ten 92% przeciek.
  Sprawdź na prawdziwym telefonie, na wolnym LTE, czy da się zapłacić BLIK-iem.
- Czy potrzebny jest CMS dla treści, czy wystarczą pliki MDX w repo.
  Przy 12 stronach i dwóch językach — MDX prawdopodobnie wystarczy i będzie szybszy.

---

## 5. Zasada nadrzędna: zero wymyślania

Wszystko, co pojawi się na tej stronie — cena, opinia, liczba, termin, obietnica —
**musi mieć źródło**. Albo w tym pakiecie, albo od Piotrka.

Jeśli czegoś nie ma w `01-BRIEF-I-FAKTY.md` i nie dostałaś tego od Piotrka —
**nie wpisujesz tego na stronę.** Zostaw placeholder i dopisz do listy pytań.

To nie jest ostrożność dla ostrożności. Ta firma sprzedaje przejażdżki pojazdami
silnikowymi w górach. Nieprawdziwa informacja o bezpieczeństwie, wieku albo
ubezpieczeniu to realne ryzyko, nie literówka.
