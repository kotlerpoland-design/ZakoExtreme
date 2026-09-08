# Cięcie budżetu −300 zł/dzień (pon–czw) — log zmian

**Data decyzji:** 2026-08-31 (poniedziałek)
**Konto:** Google Ads 864-534-0268 (ZakoExtreme)
**Polecenie:** „ograniczyć budżet o 300 zł od poniedziałku do czwartku na najgorzej performujących rzeczach"

---

## 1. Na czym oparta jest decyzja

Nie na `conversions` (to pole jest zatrute miękkimi sygnałami), tylko na **dwóch twardych metrykach**
policzonych z rozbicia `conversion_action_name` za ostatnie 30 dni:

- **koszt / Zakup** (`PURCHASE` — realna rezerwacja w SlotWise)
- **koszt / realny kontakt** (`CONTACT` — kliknięcie w telefon, click-to-call, kopiowanie numeru)

Świadomie **pominięto** `Local actions - Directions` i `Local actions - Other engagements`.
To one nadmuchują `all_conversions` w kampaniach PMax i to przez nie kampania `P | L | 2026`
wygląda na najlepszą w koncie, będąc w rzeczywistości najgorszą.

## 2. Ranking kampanii — okno 30 dni (2026-08-01 → 2026-08-31)

| Kampania | ID | Wydatek 30d | Śr. zł/dzień | Zakup | **zł / zakup** | Kontakty | **zł / kontakt** | CPC | Werdykt |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| QUADY \| BUGGY \| ATV \| ENG - 2026 | 24013051150 | 2 144,11 | 71,5 | 4,0 | **536,03** | 34 | 63,06 | 5,58 | ❌ najgorsza |
| P \| L \| 2026 | 24008615969 | 4 360,59 | 145,4 | 10,6 | **410,91** | 37 | **117,85** | 1,52 | ❌ największy przepał |
| P \| 2026 | 24003675543 | 5 281,01 | 176,0 | 13,0 | 406,23 | 1 455 | **3,63** | 0,58 | ⚠️ motor telefonów |
| Quady \| Bez Prawa Jazdy \| Młodzież \| 2026 | 24122868925 | 613,66 | 20,5 | 3,0 | 204,55 | 7 | 87,67 | 1,70 | ⚠️ słaba |
| Quady \| Białka & Bukowina \| 2026 | 24117895667 | 582,52 | 19,4 | 4,0 | **145,63** | 23 | **25,33** | 1,22 | ✅ najlepsza efektywność |
| QUADY \| BUGGY \| ATV \| 2026 | 24008615978 | 4 904,58 | 163,5 | 33,7 | **145,44** | 108 | 45,41 | 2,59 | ✅ motor zakupów |

**Wydatek konta:** 17 886,47 zł / 30 dni = **596,2 zł/dzień**

### Dlaczego `P | L | 2026` jest cięta najmocniej
W ostatnich 90 dniach ta kampania wygenerowała 3 463 × `Directions` i 3 548 × `Other engagements`
przy zaledwie **16,6 zakupach i 39 kliknięciach w telefon**. Ponad 94% jej „konwersji" to sygnały,
których nie da się powiązać z rezerwacją. Przy 145 zł/dzień to najdroższy element konta w przeliczeniu
na realny efekt biznesowy.

### Dlaczego `QUADY | BUGGY | ATV | 2026` NIE jest cięta
33,7 zakupu w 30 dni = **29% wszystkich zakupów konta** przy koszcie 145 zł/zakup. To najlepszy
element konta w liczbach bezwzględnych.

### Dlaczego `Quady | Białka & Bukowina | 2026` NIE jest cięta
Najniższy koszt kontaktu w koncie (25,33 zł) i drugi najniższy koszt zakupu (145,63 zł),
a przy tym **traci 34,1% udziału w wyświetleniach z powodu budżetu**. To kampania niedoinwestowana,
nie do cięcia — kandydat do podniesienia budżetu po zakończeniu okna oszczędnościowego.

## 3. Wykonane zmiany budżetów

| Kampania | ID | Budżet przed (śr. wydatek) | Budżet po | Oszczędność/dzień |
|---|---|---:|---:|---:|
| P \| 2026 | 24003675543 | ~176,0 zł | **85,00 zł** | −91,0 zł |
| P \| L \| 2026 | 24008615969 | ~145,4 zł | **15,00 zł** | −130,4 zł |
| QUADY \| BUGGY \| ATV \| ENG - 2026 | 24013051150 | ~71,5 zł | **12,00 zł** | −59,5 zł |
| Quady \| Bez Prawa Jazdy \| Młodzież \| 2026 | 24122868925 | ~20,5 zł | **5,00 zł** | −15,5 zł |
| QUADY \| BUGGY \| ATV \| 2026 | 24008615978 | ~163,5 zł | bez zmian | 0 |
| Quady \| Białka & Bukowina \| 2026 | 24117895667 | ~19,4 zł | bez zmian | 0 |

**Łączna oszczędność: −296,4 zł/dzień** (cel: −300 zł)

## 4. WAŻNE — przywrócenie w piątek

Cięcie ma obowiązywać **poniedziałek–czwartek**. Piątek, sobota i niedziela to najmocniejsze dni
w koncie (najwyższy wydatek i najwyższa liczba konwersji w oknie 90 dni), więc budżety
**muszą wrócić do stanu pierwotnego w piątek rano**.

Wartości do przywrócenia (`set_campaign_budget`, `budget_type: daily`, kwoty w mikro):

```
24003675543  →  176000000   (P | 2026)
24008615969  →  145000000   (P | L | 2026)
24013051150  →   71000000   (QUADY | BUGGY | ATV | ENG - 2026)
24122868925  →   20000000   (Quady | Bez Prawa Jazdy | Młodzież | 2026)
```

## 5. Status wykonania

Wszystkie 4 akcje `set_campaign_budget` wykonane 2026-08-31 na koncie 864-534-0268 — każda zwróciła sukces:

```
24008615969  →  15000000   (P | L | 2026)                        OK
24003675543  →  85000000   (P | 2026)                            OK
24013051150  →  12000000   (QUADY | BUGGY | ATV | ENG - 2026)    OK
24122868925  →   5000000   (Quady | Bez Prawa Jazdy | Młodzież)  OK
```

Kampanie 24008615978 i 24117895667 celowo nietknięte.

## 6. Automatyzacja przywracania

Routine `trig_01VhNygKpqvUYd6JvNEMjPqh` — „ZakoExtreme — budżety pon-czw / pt-nd".

- `cron_expression: "11 5 * * 1,5"` (UTC) = **07:11 czasu polskiego, poniedziałek i piątek**
- Pierwsze uruchomienie: **2026-09-04T05:11:00Z (piątek) → PRZYWRÓCENIE**
- W poniedziałek: CIĘCIE (wartości z sekcji 3). W piątek: PRZYWRÓCENIE (wartości z sekcji 4).
- W każdy inny dzień routine kończy się bez akcji.
- Twardy zakaz dotykania 24008615978 i 24117895667.
- Po każdym przebiegu draft `[ZAKO][BUDZET][OK|FAIL|SKIP]` na rpalka.com@gmail.com.
