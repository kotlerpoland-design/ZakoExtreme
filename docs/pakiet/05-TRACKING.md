# 05 — Tracking: kontrakt zdarzeń, piksele, zgody

**Ten plik jest ważniejszy, niż wygląda.**

Konto reklamowe wydaje pieniądze na podstawie tego, co strona mu powie. Jeśli strona
mówi nieprawdę — a obecna mówi — algorytm optymalizuje pod złe rzeczy i przepala budżet
mimo poprawnego copy i poprawnego SEO.

Obecny stan w liczbach za 365 dni:

| Zdarzenie | Ile |
|---|---:|
| `ADD_TO_CART` | 729 |
| `BEGIN_CHECKOUT` | **1 516** |
| `PURCHASE` | **119** |
| Kliknięcia w telefon | ~18 200 |

Dwie rzeczy są tu nie tak i obie musisz naprawić po drodze.

---

# 1. Dwa problemy, które ta strona ma rozwiązać

## 1.1 `ADD_TO_CART` (729) jest MNIEJSZY niż `BEGIN_CHECKOUT` (1 516)

To jest niemożliwe w poprawnie zmierzonym lejku. Nie da się rozpocząć płatności
za coś, czego się nie dodało do koszyka.

**Co to znaczy:** istnieją **co najmniej dwie ścieżki zakupowe**, a przynajmniej jedna
z nich nie wysyła pełnego lejka. Prawdopodobnie: część ludzi wchodzi do SlotWise
bezpośrednio (link, wizytówka, stara podstrona), z pominięciem kroku „koszyk" na stronie.

**Co robisz:** budujesz **jedną** ścieżkę. Każde wejście do rezerwacji przechodzi
przez ten sam komponent i ten sam zestaw eventów. Bez wyjątków, bez „skrótów" z linkiem
prosto do `bookings.slotwise.pl`.

## 1.2 Z 1 516 rozpoczętych płatności kończy się 119

**7,8% domknięcia. 92% przecieku. 1 397 osób rocznie, które chciały zapłacić i nie zapłaciły.**

To jest największy pojedynczy problem w całym biznesie — większy niż cokolwiek
w reklamach czy w SEO.

**Zbadaj to **zanim** zaczniesz projektować.** Konkretnie:

1. Wejdź na `bookings.slotwise.pl` **z prawdziwego telefonu, na LTE**, nie z DevTools.
2. Przejdź całą ścieżkę do momentu płatności.
3. Sprawdź, czy **BLIK** działa. To jest w Polsce dominująca metoda płatności mobilnej.
4. Policz kroki i pola formularza.
5. Sprawdź, czy widżet w iframe **nie gubi sesji** przy przejściu do bramki płatniczej —
   to jest najczęstsza przyczyna takiego przecieku.

**Hipotezy w kolejności prawdopodobieństwa:**
- iframe + przekierowanie do bramki płatniczej = utrata kontekstu na mobile
- brak BLIK-a
- wymóg płatności z góry przy braku informacji o polityce zwrotu
  (patrz `03-COPY-NAGLOWKI.md` §8, pozycje 3 i 4)
- zbyt wiele pól formularza na telefonie

> **Jeśli okaże się, że to wina SlotWise, a nie strony** — to jest ustalenie warte więcej
> niż cała reszta tego pakietu. Napisz to Robertowi i Piotrkowi wprost.
> Może się okazać, że najlepszą decyzją jest **przekierowanie zamiast iframe**,
> albo zmiana dostawcy rezerwacji.

---

# 2. Identyfikatory — stan faktyczny

| System | ID | Uwaga |
|---|---|---|
| GTM (aktywny) | **`GTM-NGRKVVNF`** | konto `6364848325`, kontener `257657304` |
| GA4 | **`G-SREKRLSR8B`** | |
| Google Ads | **`AW-17653880312`** | **nie twórz nowego** — historia i uczenie biddingu |
| Meta Pixel | **`2436218866859960`** | |
| TikTok Pixel | **`DA42OTBC77UFPN83M9H0`** | |
| SlotWise | `bookings.slotwise.pl`, business-id `cmpo09er30083og01xobb2992` | |

## 2.1 Stare kontenery GTM — sprawdź, zanim wystartujesz

W historii projektu istnieją **jeszcze dwa** kontenery:

```
GTM-T3PTPJ4K    — był żywy na starej stronie
GTM-KGM2CNF4    — z wcześniejszej dokumentacji
```

**Na nowej stronie ma być dokładnie jeden kontener: `GTM-NGRKVVNF`.**

Dwa kontenery na jednej stronie = podwójne tagi = podwójne konwersje = algorytm
Google Ads licytuje na podstawie zawyżonych liczb. To nie jest teoretyczne —
to już się w tym projekcie zdarzyło.

**Kontrola:** po deployu `Ctrl+U` na stronie i szukaj `GTM-`. Ma być jedno trafienie.
Żadnego gołego `gtag('config','AW-...')` ani `fbq('init',...)` w kodzie —
wszystko idzie przez GTM.

## 2.2 Zduplikowane akcje konwersji w Google Ads — do posprzątania

W koncie są pary mierzące to samo:

| Para | Liczby | Co z tym |
|---|---|---|
| `Kliknięcie w telefon` vs `zakoextreme.pl (web) phone_click` | 10 067 vs 6 737 | jedna zostaje jako **główna**, druga na „tylko obserwuj" |
| `Przejście na stronę "Kontakt"` vs `przejscie_na_kontakt` | 2 742 vs 2 246 | to samo |

**To jest robota Roberta po stronie Google Ads, nie twoja** — ale musisz o tym wiedzieć,
żeby **nie wysyłać ze strony dwóch eventów o tym samym znaczeniu**. Jeden event = jedno znaczenie.

---

# 3. Kontrakt zdarzeń — jedyne źródło prawdy

Wysyłasz **dokładnie te eventy i dokładnie te parametry**. Nic więcej, nic mniej.
Nazwy są zgodne z GA4 i z tym, co już działa w koncie — nie wymyślaj własnych.

## 3.1 Zdarzenia kontaktowe (najważniejsze — 153:1 wobec zakupów online)

```js
// Kliknięcie w numer telefonu — GDZIEKOLWIEK na stronie
dataLayer.push({
  event: 'phone_click',
  cta_location: 'hero' | 'sticky' | 'faq' | 'footer' | 'pricing' | 'contact' | 'menu' | 'voucher',
  page_type: 'home' | 'product' | 'local' | 'pricing' | 'qualifier' | 'contact' | 'reviews' | 'vouchers' | 'gallery',
  product: 'quady' | 'buggy' | 'skutery' | 'mixed',
  language: 'pl' | 'en'
});
```

> `menu` i `voucher` doszły przy wdrożeniu (kod: `CtaLocation` w `lib/tracking.ts`). `voucher` oznacza CTA „Zamów voucher”
> na `/vouchery/` — jedyne miejsce poza stopką, sekcją Kontakt i tekstami „masz pytania?”, gdzie telefon jest CTA, bo
> vouchera nie da się kupić przez SlotWise.
>
> **`cta_location` jest obowiązkowe.** Bez niego nie dowiesz się, który przycisk generuje
> telefony — a to jest jedyna rzecz, która realnie odpowiada za sprzedaż w tej firmie.
> Po miesiącu ta jedna zmienna powie ci, czy sticky bar był dobrą decyzją.

```js
// Wejście na stronę kontaktu (to jest zliczana konwersja: 2 742/rok)
dataLayer.push({ event: 'contact_page_view', language: 'pl' | 'en' });

// Skopiowanie numeru zamiast kliknięcia — realne zachowanie na desktopie
dataLayer.push({ event: 'phone_copy', copy_type: 'phone' });
```

## 3.2 Zdarzenia rezerwacyjne (lejek SlotWise)

```js
view_item        // widżet rezerwacji wszedł w viewport
add_to_cart      // wybrano wariant i termin
begin_checkout   // przejście do danych / płatności
purchase         // opłacone
```

Każde z parametrami e-commerce:
```js
dataLayer.push({
  event: 'add_to_cart',
  ecommerce: {
    currency: 'PLN',
    value: 250,
    items: [{
      item_id: 'quad-standard-1h',
      item_name: 'Wyprawa quadem STANDARD 1h',
      item_category: 'quady',
      price: 250,
      quantity: 1
    }]
  },
  event_id: '<unikalny, ten sam dla GA4/Ads/Meta>'
});
```

**Krytyczne:** czyść `ecommerce` przed każdym pushem
(`dataLayer.push({ ecommerce: null })`), inaczej parametry z poprzedniego eventu
przeciekają do następnego. To jest klasyczna przyczyna zawyżonych wartości konwersji.

**SlotWise:** jeśli używasz oficjalnego `embed.js`, widżet **sam pushuje te eventy**
do `dataLayer`. Nie pisz własnego listenera `postMessage`, dopóki `embed.js` działa —
własny listener trzymaj wyłącznie jako fallback dla surowego iframe.

> **Zweryfikuj to jako pierwszą rzecz w projekcie.** Od odpowiedzi „embed.js czy iframe"
> zależy cała architektura pomiaru **i prawdopodobnie przyczyna 92% przecieku.**

## 3.3 Zdarzenia pomocnicze

```js
// Kliknięcie w CTA rezerwacji (jeszcze przed wejściem w widżet)
dataLayer.push({ event: 'cta_click', cta_id: 'book_online', cta_location: 'hero' });

// Rozwinięcie pytania FAQ — mówi ci, która obiekcja blokuje ludzi
dataLayer.push({ event: 'faq_open', faq_id: 'prawo-jazdy' });

// Wybór wariantu w cenniku
dataLayer.push({ event: 'select_item', item_id: 'quad-premium-2h' });

// Kliknięcie w mapę / trasę dojazdu
dataLayer.push({ event: 'directions_click' });
```

> **`faq_open` warto mieć.** Po miesiącu powie ci, czy ludzi blokuje prawo jazdy,
> dzieci, cena czy pogoda — a to bezpośrednio przekłada się na to,
> co ma być wyżej na stronie.

## 3.4 Czego NIE wysyłać

- ❌ **Żadnych danych osobowych w `dataLayer`.** Ani maila, ani telefonu, ani imienia.
  Nawet zahaszowanych, dopóki nie ma to świadomej podstawy prawnej i zgody.
- ❌ **`generate_lead` przy kliknięciu w telefon.** To nie jest lead, to jest intencja.
  Lead to odebrana rozmowa.
- ❌ **Scroll depth jako konwersja.** Przewinięcie strony nie jest wartością.
- ❌ **Dwóch eventów o tym samym znaczeniu** (patrz §2.2).

---

# 4. Consent Mode v2 — obowiązkowy

Bez tego Google Ads traci dane w EOG, a firma stoi w sprzeczności z RODO.

**Kolejność ładowania ma znaczenie i jest najczęstszym błędem wdrożenia:**

```html
<!-- 1. NAJPIERW domyślne zgody — przed GTM, przed czymkolwiek -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent','default',{
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    analytics_storage:'denied',
    functionality_storage:'granted',
    security_storage:'granted',
    wait_for_update: 500
  });
  gtag('set','ads_data_redaction',true);
  gtag('set','url_passthrough',true);
</script>

<!-- 2. DOPIERO TERAZ kontener GTM-NGRKVVNF -->
```

**`url_passthrough: true` jest tu szczególnie ważne** — przenosi `gclid` w URL-u,
kiedy zgoda nie została udzielona. Bez tego tracisz przypisanie konwersji
dla wszystkich, którzy nie kliknęli „akceptuję".

**W Next.js App Router:** blok zgód wstaw przez `next/script` ze `strategy="beforeInteractive"`,
a kontener GTM ze `strategy="afterInteractive"`. To jedyny wyjątek od reguły
„nic w `beforeInteractive`" z `04-SEO-GEO-SCHEMA.md` §7.

**Baner zgód:** musi mieć równorzędne „Akceptuj" i „Odrzuć" na pierwszym ekranie
(wymóg EOG) i **nie może zasłaniać CTA telefonu**. 96% ruchu to telefon —
baner zasłaniający przycisk „Zadzwoń" kosztuje realne pieniądze co godzinę.

---

# 5. Piksele — co i kiedy

| Tag | Kiedy | Uwaga |
|---|---|---|
| GA4 `page_view` | wszystkie strony | |
| GA4 `phone_click` | `phone_click` | oznacz w GA4 jako **kluczowe zdarzenie** |
| GA4 e-commerce | `add_to_cart`, `begin_checkout`, `purchase` | „Wyślij dane e-commerce" = Data Layer |
| Google Ads — Phone | `phone_click` | dziś **główna** konwersja |
| Google Ads — Purchase | `purchase` | ma zostać główną **po naprawie checkoutu** |
| Meta — Contact | `phone_click` | |
| Meta — Purchase | `purchase` | z `event_id` do deduplikacji |
| TikTok | `phone_click`, `purchase` | pixel istnieje, kampania świeża |

## 5.1 Deduplikacja Meta

Jeśli kiedykolwiek dojdzie Conversions API po stronie serwera, **`event_id` musi być
identyczny** w pikselu przeglądarkowym i w CAPI. Dlatego generujesz go **raz**,
przy zdarzeniu, i przekazujesz do wszystkich tagów.

Dla `purchase` używaj `transaction_id` ze SlotWise jako `event_id`.
Dla pozostałych — `Date.now() + '-' + losowy`.

## 5.2 Zmiana konwersji głównej — decyzja na później, nie teraz

Dziś główną konwersją jest kliknięcie w telefon i **tak ma zostać**,
bo to odzwierciedla rzeczywistość (153:1).

**Po naprawie checkoutu** — kiedy `purchase` przekroczy ~30 konwersji miesięcznie —
Robert przełącza główną konwersję na `Purchase`, a `phone_click` przenosi
do obserwowanych. To jest moment, w którym konto zacznie licytować pod pieniądze,
a nie pod intencję.

> **Nie rób tego przełączenia sam/a i nie rób go w dniu publikacji.**
> Algorytm potrzebuje danych z nowej strony, zanim zmienisz mu cel.

---

# 6. Śledzenie kliknięć — bez pułapek `tel:`

Kliknięcie w `tel:` na iOS potrafi przerwać ładowanie i **zgubić event**.

```jsx
<a
  href="tel:+48539320700"
  onClick={() => {
    window.dataLayer?.push({
      event: 'phone_click',
      cta_location: 'hero',
      page_type: 'product',
      product: 'quady',
      language: 'pl'
    });
  }}
>
  Zadzwoń: 539 320 700
</a>
```

**Nie używaj `preventDefault` + `setTimeout`** do „zdążenia z eventem".
Opóźnia to połączenie, psuje doświadczenie i tak samo bywa gubione.
Push do `dataLayer` jest synchroniczny — w praktyce zdąży.

**Numer w `href` zawsze w formacie międzynarodowym** `+48539320700`,
bez spacji i myślników. Wyświetlany może być czytelny: `539 320 700`.

---

# 7. Parametry kampanii — nie gub `gclid`

Google Ads dokleja `gclid`, Meta `fbclid`. Jeśli użytkownik przechodzi
do SlotWise, a parametry po drodze giną — konwersja nie przypisze się do kampanii
i całe konto optymalizuje na ślepo.

**Zasady:**
- Nie usuwaj query params przy przekierowaniach ani w middleware.
- Przy przejściu do SlotWise **przekaż parametry dalej**, jeśli widżet to obsługuje.
- 301 z `02-ARCHITEKTURA-URL.md` **muszą zachowywać query string.**
  W Next.js `redirects()` robi to domyślnie, ale przy własnym middleware — sprawdź.
- Nie polegaj wyłącznie na `gclid` w URL-u — `url_passthrough` z §4 to zabezpieczenie.

---

# 8. Lista kontrolna przed publikacją

- [ ] W kodzie strony jest **dokładnie jeden** `GTM-` i jest to `GTM-NGRKVVNF`
- [ ] Nie ma gołego `gtag('config','AW-...')` ani `fbq('init',...)` poza GTM
- [ ] `consent default` ładuje się **przed** kontenerem GTM
- [ ] Baner zgód **nie zasłania** przycisku „Zadzwoń" na 390×844
- [ ] GA4 DebugView pokazuje `page_view` i `phone_click` z parametrem `cta_location`
- [ ] `phone_click` strzela z **każdego** miejsca z numerem (hero, sticky, FAQ, stopka, kontakt)
- [ ] `add_to_cart` ≥ `begin_checkout` w teście ręcznym — **jeśli nie, lejek nadal jest zepsuty**
- [ ] `purchase` przechodzi z poprawnym `transaction_id` i `value`
- [ ] `ecommerce: null` przed każdym pushem e-commerce
- [ ] `gclid` przeżywa przejście przez 301 i przez wejście do SlotWise
- [ ] Pełna ścieżka zakupu przeklikana **na prawdziwym telefonie, na LTE, z BLIK-iem**
- [ ] Zero danych osobowych w `dataLayer` (sprawdź w konsoli, nie na wiarę)
- [ ] Robert potwierdził, że konwersje spływają do Google Ads z nowej strony

> **Ostatni punkt jest bramką.** Nie zgłaszaj projektu jako gotowego, dopóki Robert
> nie zobaczy konwersji z nowego adresu w panelu Google Ads. Wszystko inne można poprawić
> po publikacji — utracone dni bez pomiaru wracają jako błędne decyzje algorytmu
> przez kolejne tygodnie.
