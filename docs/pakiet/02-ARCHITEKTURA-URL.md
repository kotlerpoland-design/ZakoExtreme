# 02 — Architektura: mapa intencji → URL

Ten plik zamienia 4 322 realne zapytania z konta Google Ads na strukturę stron.
Zasada: **jedna intencja = jeden URL = jeden nagłówek H1 = jedna grupa reklam.**
To jest mechanizm, który daje 100% message match i maksymalną ocenę
Landing Page Experience w Google Ads.

---

# 1. Dlaczego obecna struktura nie może zostać

Dziś **całe konto (56 reklam) celuje w 7 adresów**, a realnych klastrów intencji jest **dziesięć**.
Efekt: człowiek szukający „quady białka tatrzańska cennik" ląduje na ogólnej stronie o quadach
w Zakopanem, gdzie nie ma ani słowa „Białka", ani ceny. Google widzi rozjazd między zapytaniem,
reklamą i stroną — obniża Ad Relevance i Landing Page Experience, a CPC rośnie.

To nie jest teoria. Frazy lokalne (Białka, Bukowina, Poronin, Kościelisko, Gubałówka,
Murzasichle) to **579 fraz, 1 851 klików i 3 002 zł rocznie bez ani jednego dedykowanego URL-a.**

---

# 2. Struktura docelowa

## 2.1 Drzewo

```
/                                          Strona główna (przełącznik sezonu)
│
├── /quady-zakopane/                       Quady i ATV — filar letni
├── /buggy-zakopane/                       Buggy — filar letni
├── /skutery-sniezne-zakopane/             Skutery — filar zimowy
│
├── /quady-bez-prawa-jazdy/                Kwalifikacja: bariera wejścia
├── /quady-dla-dzieci-i-mlodziezy/         Kwalifikacja: rodziny
│
├── /quady-bialka-tatrzanska/              Lokalny
├── /quady-bukowina-tatrzanska/            Lokalny
├── /buggy-bialka-bukowina/                Lokalny
│
├── /cennik/                               Intencja cenowa
├── /opinie/                               Intencja reputacyjna
├── /kontakt/                              Domknięcie + NAP
│
└── /en/                                   Pełne lustro EN (własne teksty, nie tłumaczenie)
    ├── /en/quad-tours-zakopane/
    ├── /en/buggy-tours-zakopane/
    ├── /en/snowmobile-tours-zakopane/
    ├── /en/no-drivers-licence-required/
    ├── /en/prices/
    ├── /en/reviews/
    └── /en/contact/
```

**12 stron PL + 8 stron EN.** Nie więcej. Każda dodatkowa strona bez własnego klastra fraz
to rozcieńczenie, nie zysk.

## 2.2 Mapa: klaster → URL → grupa reklam

| Klaster intencji | Fraz | Kliki | URL docelowy | H1 (skrót) |
|---|---:|---:|---|---|
| Quady / ATV Zakopane | 1 075 | 5 016 | `/quady-zakopane/` | Quady i ATV Zakopane |
| Skutery śnieżne | 714 | 11 558 | `/skutery-sniezne-zakopane/` | Skutery śnieżne Zakopane |
| Buggy Zakopane | 132 | 908 | `/buggy-zakopane/` | Buggy 4×4 Zakopane |
| Quads / ATV EN | 590* | 2 876 | `/en/quad-tours-zakopane/` | Quad Tours in Zakopane |
| Snowmobiles EN | * | * | `/en/snowmobile-tours-zakopane/` | Snowmobile Tours in the Tatras |
| Białka — quady | 251 | 939 | `/quady-bialka-tatrzanska/` | Quady Białka Tatrzańska |
| Bukowina — quady | 131 | 282 | `/quady-bukowina-tatrzanska/` | Quady Bukowina Tatrzańska |
| Białka/Bukowina — buggy | ~40 | ~120 | `/buggy-bialka-bukowina/` | Buggy Białka i Bukowina |
| Bez prawa jazdy | 8 kw | — | `/quady-bez-prawa-jazdy/` | Quady bez prawa jazdy |
| Dzieci / młodzież | 9 kw | — | `/quady-dla-dzieci-i-mlodziezy/` | Quady dla dzieci i młodzieży |
| Cena / cennik | 137 | 1 299 | `/cennik/` | Cennik ZakoExtreme |
| Opinie / najlepsze | 89 | 69 | `/opinie/` | Opinie o ZakoExtreme |

\* liczby EN podane łącznie dla całego ruchu anglojęzycznego (590 fraz, 2 876 klików).

## 2.3 Osobna decyzja: ATV nie dostaje własnej strony

W koncie są **osobne grupy reklam na ATV** (`atv Zakopane`, `wypożyczalnia atv`,
`ATV tours zakopane`). Kusi, żeby zrobić `/atv-zakopane/`.

**Nie rób tego.** ATV i quad to ten sam pojazd i ta sama usługa — osobna strona byłaby
duplikatem, który Google potraktuje jako doorway page i który rozwodni oba adresy.

**Zamiast tego:** na `/quady-zakopane/` H1 brzmi **„Quady i ATV w Zakopanem"**, w treści
pojawia się naturalne zdanie wyjaśniające, że to ten sam pojazd, a w schema dodajesz
`alternateName`. To daje pełne pokrycie frazy przy jednym URL-u.

Ta sama zasada dotyczy Poronina, Kościeliska, Gubałówki i Murzasichla — mają za mało fraz
na własne strony (40–54 frazy każda). Obsługujesz je **sekcją „Skąd do nas dojedziesz"**
na stronach produktowych, z konkretnym czasem dojazdu z każdej miejscowości.

Białka (251 fraz) i Bukowina (131 fraz) **zasługują na własne strony** — mają wolumen,
własne odmiany gramatyczne i intencję cenową.

---

# 3. Wzorzec strony produktowej

Ta sama kolejność na każdej stronie produktowej. Kolejność wynika z tego, w jakiej
kolejności użytkownik zadaje pytania.

```
┌─ EKRAN 1 (bez scrolla, 390×844) ────────────────────────┐
│  H1 z frazą główną + lokalizacją                        │
│  Jedno zdanie: co to jest i ile trwa                    │
│  CENA OD (duża, widoczna)                               │
│  ★ 4,8 · ponad 800 opinii                               │
│  [ ZADZWOŃ ]  ← główne CTA, tel:                        │
│  [ Sprawdź wolne terminy ] ← drugie CTA, do SlotWise    │
│  „Blisko centrum Zakopanego · czynne 24 h"              │
└──────────────────────────────────────────────────────────┘
   ↓
2.  Pasek zaufania: legalne trasy · instruktor · bez prawa jazdy · kask w cenie
3.  Warianty i ceny (karty: STANDARD / PREMIUM / ULTRA)
4.  Widżet rezerwacji SlotWise  ← kotwica #rezerwacja
5.  Jak to wygląda — zdjęcia / wideo
6.  Dla kogo (para / rodzina / grupa / wieczór kawalerski)
7.  Skąd do nas dojedziesz (Zakopane, Białka, Bukowina, Poronin, Kościelisko…)
8.  FAQ (pod featured snippet i AI search)
9.  Opinie (prawdziwe, z Google)
10. Stopka: NAP + telefon + mapa
```

**Reguły niepodlegające negocjacji:**

- **Cena jest w ekranie 1.** Intencja cenowa konwertuje tak samo dobrze jak produktowa
  (10,13 vs 10,60 zł/konw). Ukrycie ceny zabija tę grupę.
- **`tel:` jest głównym CTA, nie drugorzędnym.** Stosunek kontaktów telefonicznych
  do zakupów online to 153:1.
- **Sticky pasek na dole** z telefonem i rezerwacją, widoczny przez cały scroll.
- **Zero karuzel, zero pop-upów, zero interstitiali.** 96% ruchu to telefon, często
  na słabym LTE w górach.

---

# 4. Strona główna — przełącznik sezonu

Strona główna ma **trzy stany**, sterowane jednym plikiem konfiguracyjnym.
Nie przez ręczną podmianę przez programistę raz na pół roku.

| Sezon | Miesiące | Hero | Kolejność oferty |
|---|---|---|---|
| **ZIMA** | XI – II | Skutery śnieżne | skutery → buggy → quady |
| **PRZEJŚCIOWY** | III – VI | Buggy 4×4 i quady | buggy → quady → *(skutery ukryte)* |
| **LATO** | VII – IX | Quady i buggy | quady → buggy → buggy 6-os. |

Sezon przejściowy jest osobnym stanem, bo **marzec–czerwiec to najgorszy okres w koncie**
(34,77 zł/konw w marcu vs 4,41 zł w sierpniu). Pokazywanie wtedy skuterów, których nie ma,
generuje ruch, który nie ma czego kupić.

**Co przełącza konfiguracja sezonu:**
- hero (nagłówek, obraz, CTA)
- kolejność i widoczność kart oferty
- treść FAQ (zimowe vs letnie pytania)
- `availability` w schema.org `Offer`
- obraz `og:image`
- teksty w meta title / description

**Implementacja:** jeden plik `config/season.ts` z datami granicznymi i funkcją
zwracającą aktualny sezon. Musi dać się **nadpisać ręcznie** — bo śnieg nie czyta kalendarza.
Piotrek musi móc powiedzieć „w tym roku sezon skuterowy zaczyna się 20 listopada"
i żeby to była zmiana jednej linijki, a nie deploy nowego hero.

---

# 5. Przekierowania 301 — mapa krytyczna

**Bez tego konto reklamowe przestaje działać w dniu publikacji.**
56 reklam kieruje na te adresy.

| Stary URL | → | Nowy URL |
|---|---|---|
| `/wyprawy-quadami-w-zakopanem/` | 301 | `/quady-zakopane/` |
| `/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/` | 301 | `/buggy-zakopane/` |
| `/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/` | 301 | `/skutery-sniezne-zakopane/` |
| `/start/` | 301 | `/` |
| `/en/wyprawy-quadami-w-zakopanem/` | 301 | `/en/quad-tours-zakopane/` |
| `/en/buggy-zakopane-gorska-przygoda-z-napedem-4x4-zako-extreme/` | 301 | `/en/buggy-tours-zakopane/` |
| `/en/skutery-sniezne-w-zakopanem-wypozyczalnia-wyprawy-atrakcje/` | 301 | `/en/snowmobile-tours-zakopane/` |
| `/start-sk/` | 301 | `/` *(wariant SK był wyłączony)* |

**Procedura publikacji — kolejność ma znaczenie:**
1. Nowa strona live, wszystkie 301 działają, sprawdzone `curl -I`.
2. Robert **dopiero teraz** podmienia final URL-e w Google Ads i Meta.
3. Stare adresy zostają z 301 na zawsze — nie usuwaj ich po miesiącu.

> Nie odwracaj kolejności. Podmiana URL-i w reklamach przed publikacją strony
> = kilkaset złotych dziennie wydane na 404.

---

# 6. Wersja angielska — równorzędna, nie tłumaczona

**Angielski konwertuje o 35% taniej niż polski** (7,15 vs 11,03 zł/konw).
Traktowanie EN jako automatycznego tłumaczenia to marnowanie najlepszego ruchu w koncie.

**Zasady:**
- Własne teksty pisane po angielsku, nie tłumaczone z polskiego.
- Własne URL-e semantyczne (`/en/quad-tours-zakopane/`, nie `/en/wyprawy-quadami-w-zakopanem/`).
- Pełne `hreflang` `pl` / `en` / `x-default` na każdej stronie, dwukierunkowo.
- Własne schema z `inLanguage: "en"`.
- Frazy EN, na które ma odpowiadać (z realnych danych):
  `quad rental zakopane`, `quad tours`, `snowmobile zakopane`, `snowmobile near me`,
  `zakopane snowmobile rental`, `snowmobile zakopane price`, `quads zakopane`,
  `quad trips zakopane`, `atv tours zakopane`.
- Uwaga na `snowmobile near me` (134 kliki) — to zapytanie geolokalizacyjne.
  Treść musi jasno mówić, gdzie fizycznie jesteście.

**Ukraiński — do rozważenia w drugim etapie.** 46 fraz cyrylicą, 108 klików,
18 konwersji po 10,28 zł. Sama fraza `квадроцикли закопане` to 59 klików.
Tania, niewykorzystana nisza — ale nie na pierwszy release.

---

# 7. Warianty bez polskich znaków

Fraza `skutery sniezne zakopane` (bez diakrytyki) ma **682 kliki rocznie** — to więcej
niż `buggy zakopane` (538). Podobnie `skuter sniezny zakopane`, `wypozyczalnia skuterow
snieznych zakopane`, `skutery sniezne koscielisko`.

**Nie rób z tego osobnych URL-i ani przekierowań.** Google i tak normalizuje diakrytykę.
Wystarczy:
- `alternateName` w schema z wariantem bez znaków,
- naturalne wystąpienie wariantu w treści FAQ (np. w cytowanym pytaniu użytkownika),
- **nie** ukryty tekst, **nie** keyword stuffing — to zaszkodzi.

---

# 8. Zasada domykająca: jedna grupa reklam = jeden URL

Po publikacji każda grupa reklam w Google Ads musi celować w URL, którego H1 zawiera
frazę kluczową tej grupy. To jest cała tajemnica „100/100 jako strona docelowa".

| Grupa reklam (id) | Fraza wiodąca | URL |
|---|---|---|
| `197861664163` | quady Zakopane | `/quady-zakopane/` |
| `197861664203` / `197861664443` | buggy Zakopane | `/buggy-zakopane/` |
| `197861664643` / `197861664603` | skutery śnieżne Zakopane | `/skutery-sniezne-zakopane/` |
| `197861664403` | quad rental Zakopane | `/en/quad-tours-zakopane/` |
| `199377014055` | quady białka tatrzańska | `/quady-bialka-tatrzanska/` |
| `200693471244` | quady bukowina tatrzańska | `/quady-bukowina-tatrzanska/` |
| `199377017975` | buggy białka tatrzańska | `/buggy-bialka-bukowina/` |
| `200693539404` | quady bez prawa jazdy | `/quady-bez-prawa-jazdy/` |
| `200693475524` | quady dla dzieci | `/quady-dla-dzieci-i-mlodziezy/` |

Przekaż tę tabelę Robertowi — on wprowadzi to po stronie kampanii.
