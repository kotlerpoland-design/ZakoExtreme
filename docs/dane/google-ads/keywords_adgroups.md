# Słowa kluczowe konta 864-534-0268 — pełna lista wg grup reklam

Źródło: `get_data` / `google_ads`, raport `ad_group_criterion`, `include_inactive: true`, `last_365dT`.
Pobrane 2026-08-31. 170 wierszy kryteriów, ale zestawy powtarzają się między zduplikowanymi
grupami reklam w kampaniach `[KS] GSN *` (stare) i `QUADY | BUGGY | ATV | *` (nowe).

Poniżej **zestawy unikalne** — to jest realny słownik intencji, na którym opiera się konto.
Wszystkie pozytywy to `PHRASE`, chyba że zaznaczono `BROAD`. `ad_group_criterion_status` zwraca
`null` (znany błąd konektora) — statusu nie da się odczytać, ale wszystkie te frazy mają wyświetlenia.

---

## A. Quady PL
Grupy: `197861664163`, `186030884142`

```
wypożyczalnia quadów
wycieczki na quadach
quady Zakopane
wyprawy na quadach Zakopane
wynajem quadów Zakopane
atrakcje zakopane                    [BROAD]
```

## B. Buggy PL
Grupy: `197861664203`, `197861664443`, `191331733600`, `188197112097`

```
wypożyczalnia buggy
buggy Zakopane
wycieczki na buggy
wynajem buggy Zakopane
wyprawy buggy Zakopane
```

## C. ATV PL
Grupy: `197861664683`, `197861664363`, `192513972127`, `188197112137`

```
wypożyczalnia atv
atv Zakopane
wyprawy atv Zakopane
wynajem atv Zakopane
wycieczki atv
ATV zakopane tours                   [BROAD]
ATV tours zakopane                   [BROAD]
```

## D. Skutery śnieżne (PL + EN w jednej grupie)
Grupy: `197861664643`, `197861664603`, `197861664123`, `190546075835`, `189633444455`, `188983803116`

```
skutery śnieżne Zakopane
wypożyczalnia skuterów śnieżnych
wycieczki na skuterach śnieżnych
wyprawy na skuterach śnieżnych Zakopane
wynajem skuterów śnieżnych Zakopane
snowmobiles
snow mobiles
snow mobiles Zakopane
snowmobile zakopane                  [PHRASE + BROAD]
snowmobile rent zakopane             [PHRASE + BROAD]
```

**Wykluczenia (EXACT, negatywne) — te same we wszystkich grupach skuterowych:**
```
zakopane guide
activities in zakopane
cose da fare a zakopane
poland zakopane winter
```
To są wykluczenia „turysta szuka co robić", nie „turysta chce skuter". Ta sama logika musi
zadziałać na stronie: strona ma odpowiadać na intencję **transakcyjną**, nie przewodnikową.

## E. Quads EN
Grupy: `197861664403`, `188197112057`

```
quad rental
quad tours
quad rental Zakopane
quads Zakopane
quad trips Zakopane
ATV tours zakopane                   [BROAD]
```

## F. Quady — Białka Tatrzańska
Grupa: `199377014055`

```
quady białka tatrzańska
quady białka
quady w białce tatrzańskiej
quad białka tatrzańska
atv białka tatrzańska
wypożyczalnia quadów białka tatrzańska
wypożyczalnia quadów białka
jazda quadem białka tatrzańska
przejażdżka quadem białka
quady białka tatrzańska cennik
atrakcje białka tatrzańska
```

## G. Buggy — Białka / Bukowina
Grupa: `199377017975`

```
buggy białka tatrzańska
buggy białka
buggy bukowina tatrzańska
buggy bukowina
wypożyczalnia buggy białka tatrzańska
wynajem buggy białka
wynajem buggy bukowina
przejażdżka buggy bukowina
buggy białka tatrzańska cennik
```

## H. Quady — Bukowina Tatrzańska
Grupa: `200693471244`

```
quady bukowina tatrzańska
quady bukowina
quady w bukowinie tatrzańskiej
quad bukowina tatrzańska
atv bukowina tatrzańska
wypożyczalnia quadów bukowina
jazda quadem bukowina
przejażdżka quadem bukowina
quady bukowina tatrzańska cennik
atrakcje bukowina tatrzańska
```

## I. Dzieci / młodzież
Grupa: `200693475524`

```
quady dla dzieci
quady dla dzieci zakopane
quady dla młodzieży
quady dla nastolatków
quad dla dziecka zakopane
quad dla 14 latka
jazda quadem dla młodzieży
atrakcje dla młodzieży zakopane
atrakcje dla nastolatków zakopane
```

> **UWAGA DLA KAROLINY — twarda zasada.** Licytujemy frazę `quad dla 14 latka`, ale na stronie
> **nigdy nie podajemy minimalnego wieku** (żadnego „od 13 lat", „od 14 lat", „od 16 lat").
> Poprawne pokrycie tej intencji bez podawania liczby: *„za zgodą rodzica"*, *osobny ogrodzony tor
> dla dzieci pod opieką instruktora*, *na trasie głównej dziecko jedzie z osobą dorosłą*,
> *szczegóły ustalamy telefonicznie*. Liczba wieku nie może pojawić się w tekście, w FAQ,
> w schema ani w alt-tekstach.

## J. Bez prawa jazdy
Grupa: `200693539404`

```
quady bez prawa jazdy
quady zakopane bez prawa jazdy
quad bez prawa jazdy zakopane
quady bez uprawnień
jazda quadem bez prawa jazdy
wynajem quada bez prawa jazdy
czy na quada potrzebne jest prawo jazdy
czy na quada potrzebne prawo jazdy
```

Dwie ostatnie frazy to **pytania**, nie zapytania zakupowe. To gotowy blok FAQ + `FAQPage` schema
i jednocześnie najlepszy materiał pod cytowanie w AI Overviews / ChatGPT.

---

## Wnioski strukturalne

1. **Konto ma 10 realnych klastrów intencji**, nie 6 kampanii. Struktura URL nowej strony
   powinna odwzorować te 10 klastrów, a nie obecne 4 strony produktowe.
2. **Duplikacja grup reklam** — te same zestawy fraz żyją równolegle w starych kampaniach
   `[KS] GSN *` i nowych `QUADY | BUGGY | ATV | *`. Konto kanibalizuje się na aukcji.
3. **Modyfikatory lokalne (Białka, Bukowina) mają własne, bogate zestawy fraz** z wariantem
   odmiany („w białce tatrzańskiej", „w bukowinie tatrzańskiej") i z intencją cenową („cennik").
   Obecnie nie mają dedykowanych landing page'y — wszystkie prowadzą na strony ogólne.
   To jest największa pojedyncza luka message-match w koncie.
4. **Intencja cenowa jest realna** (`quady białka tatrzańska cennik`, `quady bukowina tatrzańska cennik`),
   a mimo to cena nie jest wyeksponowana. Cennik musi być na stronie jawnie, nie za formularzem.
5. **Intencja pytaniowa** („czy na quada potrzebne jest prawo jazdy") jest opłacana z budżetu,
   ale nie ma na stronie odpowiedzi w formacie, który Google mógłby wyciąć jako featured snippet.
