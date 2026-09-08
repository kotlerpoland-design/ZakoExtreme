# ZakoExtreme — architektura informacji nowej strony (Next.js)

**Wersja:** 1.0 · **Data:** 2026-09-08 · **Status:** szkielet do akceptacji przed projektowaniem UI

Ten dokument zamienia materiał z pakietu (`00`–`06`) i analizy danych reklamowych w **jeden szkielet
strony**: mapę stron, elementy globalne, szablony z kolejnością sekcji, bibliotekę komponentów
i zasady, które pozwalają uzyskać efekt premium bez utraty czytelności.

Nie powtarza copy, schema ani kontraktu zdarzeń — do tego są pliki `03`, `04` i `05`.
Tam, gdzie sekcja zależy od faktu, którego nie mamy, stoi znacznik `[[DO POTWIERDZENIA]]`.

---

## 0. Trzy zdania, które porządkują wszystko

1. **Strona jest maszyną do umawiania przejazdów na dziś i jutro**, nie wizytówką i nie sklepem.
   Człowiek jest w Zakopanem, trzyma telefon, ma wolne popołudnie. Ma zadzwonić albo zarezerwować
   w mniej niż 30 sekund.
2. **Pierwszy ekran należy w całości do osoby, która już jest na miejscu** (72% ruchu).
   Wszystko dla osoby planującej wyjazd (25%) jest **pod pierwszym zgięciem** — bogate, wizualne,
   ale nigdy nie zasłania ceny i telefonu.
3. **Premium bierze się z hierarchii, zdjęć i spokoju, nie z efektów.** 96% ruchu to telefon na LTE
   w górach. Zero karuzel, pop-upów i interstitiali. Jedno mocne zdjęcie, jedna cena, jeden numer.

### Liczby, które projektują tę stronę

| Liczba | Konsekwencja projektowa |
|---|---|
| 95,9% ruchu to telefon | Projekt na 390×844. Desktop to widok kontrolny. |
| 72% użytkowników jest już na Podhalu | Cena, telefon, „wolne terminy dziś", odległość — w ekranie 1. |
| ~18 200 kliknięć w telefon vs 119 zakupów online (153:1) | „Zadzwoń" jest CTA nr 1. „Rezerwuj" jest CTA nr 2. Zawsze. |
| 1 516 rozpoczętych płatności → 119 zakupów | Rezerwacja online to jedna ścieżka, jeden komponent, zbadana na telefonie zanim powstanie projekt. |
| Kobiety konwertują o 27% lepiej | Ton: bezpieczna, widokowa, zorganizowana przygoda. Nie „ekstremalnie i męsko". |
| Marzec–czerwiec pali budżet | Strona ma **trzy** stany sezonowe, nie dwa. |

---

## 1. Mapa strony

### 1.1 Drzewo (12 stron PL + 8 EN + strony techniczne)

```
/                                   HOME        strona główna — przełącznik sezonu
│
├── /quady-zakopane/                PRODUKT     filar letni (obsługuje też frazę ATV)
├── /buggy-zakopane/                PRODUKT     filar letni (buggy 4×4, buggy 6-os., Maverick)
├── /skutery-sniezne-zakopane/      PRODUKT     filar zimowy — najlepiej konwertujący produkt
│
├── /quady-bez-prawa-jazdy/         KWALIFIKACJA  usuwa główną barierę wejścia
├── /quady-dla-dzieci-i-mlodziezy/  KWALIFIKACJA  rodziny — bez podawania wieku
│
├── /quady-bialka-tatrzanska/       LOKALNA     251 fraz, własna treść (min. 40% unikalne)
├── /quady-bukowina-tatrzanska/     LOKALNA     131 fraz
├── /buggy-bialka-bukowina/         LOKALNA     ~40 fraz
│
├── /cennik/                        CENNIK      intencja cenowa konwertuje jak produktowa
├── /opinie/                        OPINIE      reputacja — tylko prawdziwe opinie z Google
├── /kontakt/                       KONTAKT     domknięcie + NAP (2 742 konwersje/rok)
│
├── /en/                            HOME EN     własne teksty; zimą skutery na pierwszym miejscu
│   ├── /en/quad-tours-zakopane/
│   ├── /en/buggy-tours-zakopane/
│   ├── /en/snowmobile-tours-zakopane/
│   ├── /en/no-drivers-licence-required/
│   ├── /en/prices/
│   ├── /en/reviews/
│   └── /en/contact/
│
└── techniczne (noindex, poza sitemapą)
    ├── /dziekujemy/  /en/thank-you/   potwierdzenie po płatności (tu strzela `purchase`)
    ├── /polityka-prywatnosci/  /en/privacy-policy/   wymagana przez Landing Page Experience
    └── /404                            z telefonem i linkami do trzech filarów
```

Zasada: **jedna intencja = jeden URL = jeden H1 = jedna grupa reklam.** Nie dodajemy stron bez
własnego klastra fraz (ATV, Poronin, Kościelisko, Gubałówka, Murzasichle obsługujemy sekcjami,
nie stronami). Mapowanie 301 ze starych adresów jest w `02-ARCHITEKTURA-URL.md` §5 i jest bramką
publikacji.

### 1.2 Siedem typów stron = siedem szablonów

| Typ | Strony | Szablon |
|---|---|---|
| HOME | `/`, `/en/` | T0 |
| PRODUKT | quady, buggy, skutery (+ EN) | T1 |
| KWALIFIKACJA | bez prawa jazdy, dzieci (+ EN) | T2 |
| LOKALNA | Białka, Bukowina, buggy B/B | T3 |
| CENNIK | `/cennik/`, `/en/prices/` | T4 |
| OPINIE | `/opinie/`, `/en/reviews/` | T5 |
| KONTAKT | `/kontakt/`, `/en/contact/` | T6 |

Wszystkie szablony składają się z tych samych komponentów (sekcja 4). Różni je **kolejność
i dobór**, nie kod.

### 1.3 Nawigacja

Pakiet nie definiuje nawigacji — poniżej propozycja, która wynika z priorytetów.

**Header (mobile, 56 px, sticky u góry):**
`[logo]  ·  [PL/EN]  ·  [ikona telefonu → tel:]  ·  [☰]`

Telefon jest w headerze zawsze, także przed przewinięciem do sticky bara. Menu otwiera pełnoekranową
listę (nie dropdown), z dużymi polami dotyku.

**Menu główne (kolejność sterowana sezonem):**

| Zima (XI–II) | Przejściowy (III–VI) | Lato (VII–IX) |
|---|---|---|
| Skutery śnieżne | Buggy 4×4 | Quady |
| Buggy 4×4 | Quady | Buggy 4×4 |
| Quady | *(skutery ukryte w menu)* | *(skutery ukryte w menu)* |
| Cennik | Cennik | Cennik |
| Opinie | Opinie | Opinie |
| Kontakt | Kontakt | Kontakt |

Pod listą w menu: duży przycisk **Zadzwoń: 539 320 700** i mniejszy **Sprawdź wolne terminy**.

**Menu drugorzędne (stopka + linki kontekstowe w treści):**
Bez prawa jazdy · Dla dzieci i młodzieży · Białka Tatrzańska · Bukowina Tatrzańska ·
Buggy Białka i Bukowina · Polityka prywatności.

Strony kwalifikacyjne i lokalne **nie idą do menu głównego** — mają ruch z reklam i SEO, a w menu
rozmywałyby trzy filary. Linkujemy do nich z FAQ („Czy można jechać z dzieckiem?" → strona dzieci)
i z sekcji „Skąd do nas dojedziesz" (Białka → strona Białki).

**Desktop:** ten sam header, menu rozwinięte poziomo, telefon jako tekst z numerem po prawej,
„Rezerwuj" jako przycisk. Bez megamenu.

---

## 2. Elementy globalne (na każdej stronie)

| Element | Co robi | Reguła |
|---|---|---|
| **Header** | logo, język, telefon, menu | 56 px, sticky, nie zasłania H1 |
| **Sticky bar (mobile)** | `[📞 Zadzwoń]` + `[Rezerwuj]` | pojawia się po przewinięciu ekranu 1; „Zadzwoń" większe i bardziej kontrastowe; `padding-bottom` na `<main>` |
| **Pasek zaufania** | 4 ikony: legalne trasy · instruktor na każdym wyjeździe · bez prawa jazdy · czynne 24 h | zaraz pod hero na każdej stronie z hero |
| **Blok dowodu społecznego** | ★ 4,8 · ponad 800 opinii · najdłużej działająca firma w Zakopanem | w hero (skrót) i przed stopką (pełny); nigdy dokładna liczba opinii |
| **Stopka** | NAP (Rybkówka 16/2, 34-500 Zakopane), telefon `tel:`, godziny 24 h, mapa, menu drugorzędne, polityka prywatności, PL/EN | NAP identyczny z wizytówką i ze schema |
| **Baner zgód** | Consent Mode v2, „Akceptuj" i „Odrzuć" równorzędne | **nie zasłania** przycisku „Zadzwoń" na 390×844 |
| **Przełącznik sezonu** | `config/season.ts` z datami i ręcznym nadpisaniem | steruje hero, kolejnością kart, menu, FAQ, `availability`, `og:image`, meta |
| **Schema globalna** | `LocalBusiness` w `layout.tsx` | bez `aggregateRating`, bez `Review` |

---

## 3. Szablony stron — kolejność sekcji

Konwencja: **numer · nazwa sekcji · po co jest · co zawiera · CTA · zdarzenie**.
Sekcje oznaczone ⭐ są obowiązkowe dla szablonu. Sekcje w nawiasie `(sezon)` pokazują się warunkowo.

### T0 — Strona główna `/` i `/en/`

Strona główna ma **trzy stany**; różni je hero i kolejność kart. Reszta sekcji jest wspólna.

| # | Sekcja | Po co | Zawartość | CTA | Event |
|---|---|---|---|---|---|
| 1 ⭐ | **Hero sezonowy** | test 5 sekund dla persony A | H1 sezonowy · jedno zdanie · **cena od** (duża) · ★ 4,8 · ponad 800 opinii · „Blisko centrum Zakopanego · czynne 24 h" · jedno zdjęcie/wideo pełnoekranowe | **Zadzwoń** (główny) · Sprawdź wolne terminy | `phone_click{hero}` · `cta_click{book_online,hero}` |
| 2 ⭐ | **Pasek zaufania** | zamknąć 4 lęki zanim zaczną się pytania | 4 ikony (2.) | — | — |
| 3 ⭐ | **Wybierz swoją wyprawę** | rozdzielić ruch na trzy filary | karty produktów w kolejności sezonu: nazwa · czas · cena od · jedno zdjęcie · link do strony produktu. Zima: skutery → buggy → quady. Przejściowy: buggy → quady → buggy 6-os. (+ zdanie „Skutery wracają w listopadzie"). Lato: quady → buggy → buggy 6-os. → Maverick | „Zobacz warianty" na karcie | `select_item` |
| 4 ⭐ | **Rezerwacja** `#rezerwacja` | jedna ścieżka zakupu | selektor **Dziś / Jutro / Inny termin** + widżet SlotWise ładowany leniwie | Rezerwuj | `view_item` → `add_to_cart` → `begin_checkout` |
| 5 | **Jak to wygląda** | persona B chce zobaczyć | 4–6 zdjęć w siatce + wideo z Meta („Video #1") bez autoplay dźwięku; realne trasy, Tatry w tle | — | — |
| 6 | **Dla kogo to jest** | pokazać, że to nie „męska rozrywka" | pary · rodziny (→ buggy 6-os.) · grupy · wieczory kawalerskie · ognisko z grillem | Zadzwoń | `phone_click{pricing}` |
| 7 | **Dlaczego ZakoExtreme** | zaufanie dla persony B | 5 punktów: najdłużej działająca firma · legalne, sprawdzone trasy · lokalni instruktorzy · blisko centrum · 4,8★ i ponad 800 opinii | — | — |
| 8 ⭐ | **Skąd do nas dojedziesz** | 579 fraz lokalnych bez własnych stron | tabela: Zakopane centrum, Białka, Bukowina, Poronin, Kościelisko, Murzasichle → „ok. X min" `[[DO POTWIERDZENIA]]`; linki do stron lokalnych | Zadzwoń | `directions_click` |
| 9 ⭐ | **Najczęstsze pytania** | ostatnie obiekcje + AI search | 6 pytań z banku FAQ (prawo jazdy, dzieci, co w cenie, ile trwa, pogoda, jak zarezerwować); akordeon otwarty na pierwsze pytanie | „Nie wiesz, co wybrać? Zadzwoń." | `faq_open{id}` · `phone_click{faq}` |
| 10 | **Opinie** | dowód | 3 prawdziwe cytaty z Google z imieniem i datą + link „Zobacz wszystkie" | — | — |
| 11 ⭐ | **Zadzwoń i ustalmy termin** | domknięcie | NAP · duży telefon · mapa · „czynne 24 h" | Zadzwoń | `phone_click{footer}` |

> „Dlaczego ZakoExtreme" jest celowo nisko. 72% ruchu chce ceny i telefonu, nie historii firmy.
> Persona planująca doczyta.

### T1 — Strona produktowa (quady · buggy · skutery)

| # | Sekcja | Po co | Zawartość | CTA | Event |
|---|---|---|---|---|---|
| 1 ⭐ | **Hero** | message match 100/100 z reklamą | H1 z frazą i lokalizacją · jedno zdanie (co to jest, ile trwa) · **cena od** · ★ 4,8 · ponad 800 opinii · „Blisko centrum Zakopanego · czynne 24 h" · zdjęcie produktu | **Zadzwoń** · Sprawdź wolne terminy | `phone_click{hero}` |
| 2 ⭐ | **Pasek zaufania** | jw. | 4 ikony | — | — |
| 3 ⭐ | **Warianty i ceny** | intencja cenowa | karty STANDARD / PREMIUM / ULTRA (czas · cena od · co wyróżnia, np. trasa 12–15 km, ognisko przy ULTRA). Buggy: dodatkowo **Buggy 6-osobowe** (550 / 1000) i **Maverick XRS** (750) jako górna kotwica. Skutery: `[[DO POTWIERDZENIA: pełna drabinka]]` | „Zarezerwuj ten wariant" → `#rezerwacja` | `select_item{item_id}` |
| 4 ⭐ | **Rezerwacja** `#rezerwacja` | jedna ścieżka | Dziś / Jutro / Inny termin + SlotWise (lazy) | Rezerwuj | lejek e-commerce |
| 5 ⭐ | **Jak wyglądają trasy** | „to nie błotnista pętla, to Tatry" | galeria 4–6 zdjęć + opcjonalnie wideo; opis trasy tylko taki, jaki klient naprawdę dostanie (`[[DO POTWIERDZENIA: nazwy tras, mapa]]`) | — | — |
| 6 | **Dla kogo** | pary · rodziny · grupy · wieczór kawalerski | 4 kafle z jednym zdaniem; rodziny → link do strony dzieci lub buggy 6-os. | Zadzwoń | `phone_click{pricing}` |
| 7 | **Jak przebiega wyprawa** | obniżyć wysiłek/lęk (persona B) | 3 kroki: szkolenie i omówienie pojazdu → przejażdżka próbna → wyjazd na trasę z instruktorem. Skutery: zamiast tego „Co zabrać ze sobą" `[[DO POTWIERDZENIA]]` | — | — |
| 8 ⭐ | **Skąd do nas dojedziesz** | frazy lokalne | tabela dojazdu | Zadzwoń | `directions_click` |
| 9 ⭐ | **FAQ** | snippet + obiekcje | quady: FAQ-1, 2, 3, 4, 5, 6, 8 · buggy: 1, 2, 3, 4, 5, 6 · skutery: FAQ zimowe (5.2) | „Nie wiesz, co wybrać? Zadzwoń." | `faq_open` |
| 10 ⭐ | **Opinie** | dowód | 3 cytaty z Google (bez Marcela; obecny przewodnik: Wojtek) | — | — |
| 11 ⭐ | **Domknięcie** | telefon + NAP | jak T0/11 | Zadzwoń | `phone_click{footer}` |

**Warianty szablonu:**
- **Quady:** w sekcji 5 lub 7 naturalne zdanie „Quad i ATV to ten sam pojazd" (obsługa frazy ATV).
- **Buggy:** buggy 6-osobowe wyeksponowane w sekcji 3 jako osobna karta z etykietą „cała rodzina
  jednym pojazdem" — to jedyny produkt, który odpowiada na „co z dzieckiem" bez podawania wieku.
- **Skutery:** cennik **od razu pod hero** (intencja cenowa jest tu najsilniejsza). Poza sezonem
  hero zmienia się na „Sezon skuterowy zaczyna się w listopadzie — zobacz ofertę letnią", strona
  zostaje w indeksie, `availability` = `PreOrder`.

### T2 — Strona kwalifikacyjna (bez prawa jazdy · dzieci i młodzież)

Strona odpowiada na **jedno pytanie w pierwszym zdaniu** (pod featured snippet), a potem prowadzi
do telefonu. Jest krótsza niż produktowa.

| # | Sekcja | Po co | Zawartość | CTA |
|---|---|---|---|---|
| 1 ⭐ | **Hero z odpowiedzią** | snippet + test 5 s | H1 z frazą · **pierwsze zdanie = pełna odpowiedź** (do 320 znaków) · cena od (bez prawa jazdy) lub sam telefon (dzieci) · ★ 4,8 | **Zadzwoń** · Sprawdź wolne terminy |
| 2 ⭐ | **Pasek zaufania** | | 4 ikony | |
| 3 ⭐ | **Jak to działa** | usunąć lęk krok po kroku | bez prawa jazdy: 3 kroki pierwszego razu. Dzieci: **trzy warianty** (ogrodzony tor pod opieką instruktora · trasa główna z osobą dorosłą · buggy 6-os.) — **bez żadnej liczby lat** | Zadzwoń |
| 4 | **Alternatywy** | „wolisz nie prowadzić?" | buggy 6-os. · przejazd z instruktorem `[[DO POTWIERDZENIA: pasażer]]` | |
| 5 | **Rezerwacja** `#rezerwacja` | | Dziś / Jutro / Inny termin + SlotWise | Rezerwuj |
| 6 ⭐ | **FAQ tematyczne** | | bez prawa jazdy: FAQ-1, 1b, 9 · dzieci: FAQ-2, 2b, 3, 5 (+ „Deszczowy dzień?" `[[DO POTWIERDZENIA]]`) | „Nie wiesz, co wybrać? Zadzwoń." |
| 7 | **Opinie** | | 2–3 cytaty pasujące tematycznie (pierwszy raz / z dziećmi) | |
| 8 ⭐ | **Domknięcie** | | telefon + NAP | Zadzwoń |

> Strona dzieci: przed publikacją regex na cały build — zero liczb lat w treści, schema, alt, meta.

### T3 — Strona lokalna (Białka · Bukowina · buggy Białka/Bukowina)

Nie jest kopią strony produktu. Minimum 40% treści unikalnej. Mówi wprost, że **wyjazd jest
z Zakopanego**, i odpowiada na „jak daleko".

| # | Sekcja | Po co | Zawartość | CTA |
|---|---|---|---|---|
| 1 ⭐ | **Hero** | „Nocujesz w Białce?" | H1 z miejscowością · zdanie z **czasem dojazdu** `[[DO POTWIERDZENIA]]` i adresem · cena od · ★ 4,8 | **Zadzwoń** · Sprawdź wolne terminy |
| 2 ⭐ | **Pasek zaufania** | | | |
| 3 ⭐ | **Cennik** | intencja „cennik" w frazach lokalnych | te same karty co produkt (komponent współdzielony) | Zarezerwuj ten wariant |
| 4 ⭐ | **Jak do nas dojechać z [miejscowości]** | unikalna treść | opis trasy dojazdu, czas, parking, mapa z dwoma pinezkami | `directions_click` |
| 5 `(zima)` | **Zimą — skutery śnieżne** | „skutery śnieżne Białka" to mocny klaster zimowy | krótki blok + link do strony skuterów; tylko w sezonie zimowym | |
| 6 | **Rezerwacja** `#rezerwacja` | | Dziś / Jutro / Inny termin + SlotWise | Rezerwuj |
| 7 ⭐ | **FAQ** | | FAQ-7 (gdzie jesteście) + FAQ-1, 2, 6 | Zadzwoń |
| 8 | **Opinie** | | 2–3 cytaty | |
| 9 ⭐ | **Domknięcie** | | telefon + NAP | Zadzwoń |

### T4 — Cennik `/cennik/` · `/en/prices/`

To strona dla ludzi gotowych kupić (10,13 zł/konw, tyle co produktowa). Cena jawna, bez formularza.
Dwie ostatnie sekcje prawdopodobnie odpowiadają za przeciek 92% na checkoucie.

| # | Sekcja | Zawartość | CTA |
|---|---|---|---|
| 1 ⭐ | **Hero cenowy** | H1 · zdanie „wszystkie ceny są wyjściowe, ostateczna zależy od trasy i liczby osób" · telefon | **Zadzwoń** |
| 2 ⭐ | **Quady i buggy** | STANDARD 1 h od 250 · PREMIUM 2 h od 450 · ULTRA 3 h od 650 (ognisko) | Zarezerwuj ten wariant |
| 3 ⭐ | **Buggy 6-osobowe** | 1 h od 550 · 2 h od 1000 · „prowadzi dorosły, cała rodzina jednym pojazdem" | |
| 4 ⭐ | **Maverick XRS 240 KM** | 1 h od 750 | |
| 5 `(zima)` | **Skutery śnieżne** | `[[DO POTWIERDZENIA: drabinka]]`; poza sezonem jedno zdanie o listopadzie | |
| 6 ⭐ | **Co zawiera cena** | `[[DO POTWIERDZENIA: kask, kombinezon, paliwo, instruktor, ubezpieczenie]]` | |
| 7 ⭐ | **Płatność i rezerwacja** | `[[DO POTWIERDZENIA: zadatek, metody, moment płatności]]` | |
| 8 ⭐ | **Odwołanie i zmiana terminu** | `[[DO POTWIERDZENIA: polityka]]` | |
| 9 | **FAQ cenowe** | FAQ-3, 4, 6 | „Zadzwoń — powiemy dokładną cenę dla waszej grupy" |
| 10 ⭐ | **Domknięcie** | telefon + NAP | Zadzwoń |

### T5 — Opinie `/opinie/` · `/en/reviews/`

| # | Sekcja | Zawartość |
|---|---|---|
| 1 ⭐ | **Hero** | H1 · „4,8★ i ponad 800 opinii w Google. Nie skracamy ich i nie wybieramy tylko piątek." · telefon |
| 2 ⭐ | **Opinie** | lista prawdziwych opinii z wizytówki: imię, data, treść, produkt (jeśli wynika z treści); filtr chipami: wszystkie · quady · buggy · skutery · z dziećmi |
| 3 ⭐ | **Link do Google** | „Zobacz wszystkie opinie w Google" (outbound) |
| 4 | **Karty produktów** | 3 filary w kolejności sezonu — żeby z opinii dało się wejść w ofertę |
| 5 ⭐ | **Domknięcie** | telefon + NAP |

Bez `aggregateRating` i bez `Review` w schema. Bez opinii o Marcelu. EN: te same opinie po polsku
z krótkim tłumaczeniem kursywą.

### T6 — Kontakt `/kontakt/` · `/en/contact/`

Telefon w pierwszych 100 px. Strona ma być najszybsza w serwisie.

| # | Sekcja | Zawartość | Event |
|---|---|---|---|
| 1 ⭐ | **Karta kontaktu** | **+48 539 320 700** (ogromny, `tel:`) · czynne 24 h · Rybkówka 16/2, 34-500 Zakopane · przycisk kopiowania numeru (desktop) | `contact_page_view` · `phone_click{contact}` · `phone_copy` |
| 2 ⭐ | **Gdzie nas znajdziesz** | mapa (statyczny obraz z linkiem do Google Maps, nie ciężki embed) · „blisko centrum Zakopanego" | `directions_click` |
| 3 ⭐ | **Skąd do nas dojedziesz** | tabela dojazdu | |
| 4 | **Zarezerwuj online** | Dziś / Jutro / Inny termin + SlotWise | lejek |
| 5 | **Godziny i sezon** | „czynne 24 h" + aktualny stan sezonu (co dziś jeździ) | |

### Wersja EN — czym różni się od PL

- **Zimą skutery na pierwszym miejscu wszędzie** (hero, karty, menu). Ruch EN to w większości
  `snowmobile zakopane`, nie quady.
- Sekcja **„Where to find us" jest obowiązkowa** na każdej stronie produktowej (`snowmobile near me`).
- Własne H1 i teksty, nie tłumaczenie. Waluta jako `PLN`.
- FAQ „Do your instructors speak English?" tylko po potwierdzeniu `[[DO POTWIERDZENIA: języki]]`.
- Pełne lustro `hreflang` w obie strony, `x-default` → PL.

---

## 4. Biblioteka komponentów

Jeden zestaw komponentów, siedem szablonów. Nazwy robocze pod Next.js App Router.

| Komponent | Używany w | Warianty / props | Uwagi |
|---|---|---|---|
| `SiteHeader` | wszystkie | `season`, `lang` | telefon zawsze widoczny |
| `StickyCallBar` | wszystkie (mobile) | `product`, `page_type` | pojawia się po ekranie 1 |
| `Hero` | T0–T3 | `variant: home\|product\|qualifier\|local`, `price`, `media` | obraz `priority`, wysokość zarezerwowana |
| `TrustBar` | T0–T3 | `lang` | 4 ikony, jedna linia na mobile (scroll poziomy tylko tu, bez karuzeli) |
| `ProofBadge` | Hero, Footer | `size` | „★ 4,8 · ponad 800 opinii" |
| `ProductCards` | T0, T5 | `order` z `season` | 3–4 karty |
| `PricingCards` | T1, T3, T4 | `ladder: quad\|buggy6\|maverick\|snowmobile` | jedno źródło cen: `content/prices.ts` |
| `BookingSection` | T0–T3, T4, T6 | `dateChips: today\|tomorrow\|other` | SlotWise lazy (`IntersectionObserver`); **jedyny** punkt wejścia do rezerwacji |
| `Gallery` | T0, T1 | `images[]`, `video?` | siatka, nie karuzela; `next/image` |
| `ForWhom` | T0, T1 | | 4–5 kafli |
| `Steps` | T1, T2 | `steps[3]` | „jak przebiega wyprawa" |
| `WhyUs` | T0 | | 5 punktów |
| `DirectionsTable` | T0, T1, T3, T6 | `highlight?: 'bialka'\|'bukowina'` | „ok. X min", linki do stron lokalnych |
| `FAQ` | wszystkie z FAQ | `ids[]` | generuje treść **i** `FAQPage` z tego samego obiektu `content/faq.ts` |
| `Reviews` | T0–T3, T5 | `limit`, `filter?` | dane z `content/reviews.json` (eksport z Google) |
| `ContactClose` | wszystkie | | NAP + telefon + mapa |
| `SeasonNotice` | T1 skutery, T3, T4 | `season` | „Skutery wracają w listopadzie" |
| `ConsentBanner` | layout | | nie zasłania CTA |
| `SiteFooter` | wszystkie | | NAP, menu drugorzędne, PL/EN |

**Źródła treści (jedno miejsce na każdy fakt):**
- `config/season.ts` — daty graniczne + ręczne nadpisanie.
- `content/prices.ts` — cała drabinka; z niej `PricingCards`, `/cennik/`, schema `Offer`, `llms.txt`.
- `content/faq.ts` — pytania i odpowiedzi PL/EN; z nich `FAQ` i `FAQPage`.
- `content/reviews.json` — prawdziwe opinie z eksportu Google.
- `content/directions.ts` — czasy dojazdu.
- Strony jako MDX w repo (12 PL + 8 EN). CMS niepotrzebny na start.

---

## 5. Ścieżki użytkownika, które szkielet musi obsłużyć

| Ścieżka | Skąd | Co widzi | Sukces |
|---|---|---|---|
| **A. „Jesteśmy tu, co robimy dziś?"** (72%) | Google 10–12, reklama produktowa | Hero: fraza z reklamy, cena od, telefon, 4,8★, „blisko centrum" | `phone_click{hero}` lub `phone_click{sticky}` w < 30 s |
| **B. „Planujemy za dwa tygodnie"** (25%) | duże miasta, wieczór | Hero → karty → galeria → FAQ (prawo jazdy, dzieci) → rezerwacja na przyszłą datę | `add_to_cart` z datą w przyszłości, albo powrót |
| **C. Ruch z Meta** (21–22) | wideo, 4 s obejrzane, zero wiedzy o firmie | Hero musi powiedzieć: co, gdzie, ile, jak zamówić. Wideo z reklamy w „Jak to wygląda" | `phone_click` lub `add_to_cart` z „Jutro" |
| **D. Intencja cenowa** | „quady zakopane cennik" | `/cennik/` albo sekcja „Warianty i ceny" wysoko na produkcie | `select_item` → telefon/rezerwacja |
| **E. Rodzic** | „quad dla dziecka" | strona dzieci: trzy warianty, zero liczb, telefon | `phone_click` |
| **F. Gość z Białki/Bukowiny** | frazy lokalne | strona lokalna: czas dojazdu, wyjazd z Zakopanego, cennik | `directions_click`, `phone_click` |

Wspólny mianownik: **z każdej sekcji jest jedno dotknięcie do telefonu** (hero, sticky, FAQ, cennik,
stopka), a rezerwacja online ma **jeden** komponent.

---

## 6. Premium bez utraty czytelności — zasady projektowe

Efekt „wow" ma wynikać z **jakości**, nie z **ilości** efektów. Zasady, które godzą premium
z twardymi ograniczeniami (mobile, LTE, 30 sekund do telefonu):

1. **Jedno zdjęcie na ekran, ale najlepsze.** Hero pełnoekranowe, poziome, Tatry w tle, ludzie
   w kadrze (para/rodzina, nie samotny „twardziel"). Brak potwierdzonych zdjęć buggy i skuterów —
   to blokada wizualna, nie techniczna. Sesja zdjęciowa jest częścią projektu.
2. **Hierarchia zamiast dekoracji.** Trzy poziomy typografii: H1 (display, ciasny tracking),
   cena (największa liczba na ekranie), reszta. Maksymalnie dwie rodziny fontów, `display: swap`.
3. **Spokój = luksus.** Duże marginesy, sekcje oddzielone przestrzenią, nie liniami i tłem.
   Jeden akcent kolorystyczny na CTA telefonu, nigdzie indziej.
4. **Ruch tylko tam, gdzie prowadzi wzrok.** Delikatne wejście sekcji przy scrollu (opacity +
   8–12 px), liczniki w cenniku, hover na kartach. Wszystko z `prefers-reduced-motion`.
   Zero parallaxu na mobile, zero animowanych teł, zero autoplay z dźwiękiem.
5. **Wideo jako tło, nie jako treść.** Krótka pętla bez dźwięku w hero na desktopie, poster na
   mobile (LTE). Wideo z Meta w galerii, uruchamiane dotknięciem.
6. **Karty cenowe jak bilety, nie jak tabela.** Trzy warianty obok siebie (na mobile stos),
   PREMIUM wyróżniony wizualnie jako środkowy. Cena „od" duża, czas obok, jeden przycisk.
7. **Tekst krótki, ale konkretny.** Każdy akapit ma przejść test cytowalności: kto, gdzie, co,
   za ile. Konkret („Rybkówka 16/2", „12–15 km", „ok. 20 min z Białki") jest bardziej premium
   niż przymiotnik.
8. **Ton.** Bezpiecznie · widokowo · z instruktorem · dla par, rodzin i grup · w swoim tempie.
   Adrenalina zostaje jako tło, nie jako obietnica.
9. **Ciemny motyw tylko jeśli przejdzie kontrast na słońcu.** Obecny landing `/start` ma ciemne
   tło + limonkę `#8CC63F`. Na telefonie w górach w południe ciemne tło z jasnym tekstem czyta
   się gorzej niż jasne. Decyzja projektowa do testu na urządzeniu, nie w Figmie.
10. **Wydajność jest częścią estetyki.** LCP < 2 s, CLS < 0,05, pierwszy ekran < 300 kB.
    Strona, która skacze albo ładuje się 5 s, nie jest premium niezależnie od projektu.

---

## 7. Co blokuje poszczególne sekcje — do jednego telefonu z Piotrkiem

| # | Czego brakuje | Blokuje w szkielecie |
|---|---|---|
| 1 | Cennik skuterów (drabinka) | T1 skutery §3, T4 §5, hero ZIMA na T0 — **cały sezon zimowy** |
| 2 | Co zawiera cena | T4 §6, FAQ-3 na każdej stronie |
| 3 | Zadatek i metody płatności | T4 §7 — prawdopodobny powód przecieku 92% |
| 4 | Polityka odwołań | T4 §8 |
| 5 | Podstawa „bez prawa jazdy" | T2 bez prawa jazdy §3 (treść uzasadniająca) |
| 6 | Prawo jazdy na skuter | FAQ zimowe |
| 7 | Polityka pogodowa | FAQ-5, T2 dzieci „Deszczowy dzień?" |
| 8 | Czasy dojazdu | `DirectionsTable` wszędzie, hero T3 |
| 9 | Opcja pasażera | T2 bez prawa jazdy §4 |
| 10 | Języki instruktorów | FAQ EN, hero EN |
| 11 | Zasady toru dla dzieci | T2 dzieci §3 |
| 12 | Zdjęcia buggy i skuterów | hero T1 buggy/skutery, karty T0 |
| 13 | Flota (liczba, modele) | „Jak przebiega wyprawa", wiarygodność, AI search |
| 14 | SlotWise: embed.js czy iframe, czy działa BLIK | `BookingSection` — architektura pomiaru i decyzja iframe/przekierowanie |

Priorytet: **1, 3, 4 i 14**. Bez pierwszego nie ma sezonu zimowego, bez trzech pozostałych
nie naprawimy checkoutu.

---

## 8. Kolejność pracy nad szkieletem

1. **Akceptacja tego dokumentu** (mapa, szablony, nawigacja, zasady premium).
2. **Test SlotWise na telefonie, na LTE** — decyzja iframe/przekierowanie zanim powstanie
   `BookingSection`.
3. **Telefon do Piotrka** z listą z sekcji 7.
4. **Low-fi wireframe** T0 + T1 na 390×844 z prawdziwym copy z `03` — test 5 sekund na 5 osobach.
5. **Sesja zdjęciowa / materiały** (buggy, skutery, ludzie w kadrze).
6. **Design system**: typografia, kolor akcentu, karty, przyciski, sticky bar.
7. **Hi-fi T0 + T1**, potem pozostałe szablony jako warianty.
8. Build w Next.js: `config/season.ts`, `content/*`, komponenty z sekcji 4, strony MDX.
9. Bramki z `06-CHECKLISTA-JAKOSCI.md`, potem 301, potem Robert podmienia URL-e w reklamach.
