# components/

Jeden zestaw komponentów, siedem szablonów stron. Nazwy i props: `docs/ARCHITEKTURA-INFORMACJI.md` §4.
Język wizualny („ciemny wysokogórski" od 2026-09-09 — chłodny grafit `#101418`, biały tekst, jeden pomarańczowy akcent `--brand`
`#f5a524` (referencja OFFTIEM), linia trasy na grzbiecie Tatr): tokeny w `app/globals.css`. Akcent jako tekst/kreska = `text-brand`,
`bg-brand`, `border-brand`; podkład = `bg-brand-tint`; przycisk akcentu = `bg-primary` z **ciemnym** napisem (`text-primary-foreground`).

```
components/
├── primitives/  Container, Section (eyebrow · H2), Eyebrow,
│                DisplayHeading (H1 dzielony wizualnie na „ — ", pełny tekst w DOM), PriceFrom,
│                BookCta (jedyne CTA — jedyny pomarańczowy przycisk, decyzje 2026-09-09/10), PhoneLink (KAŻDY numer telefonu; tylko stopka, sekcja Kontakt i teksty „masz pytania?"),
│                Reveal (jedyny ruch wejścia)
├── graphics/    RidgeRoute (zdjęcie grzbietu + trasa po skyline
│                + markery-kotwice na szczytach — oferta na stronie głównej i „Warianty i ceny" w T1),
│                FogImage (next/image rozpływające się w tło), WashImage + WatercolorDefs + watercolor.ts (zdjęcie erodujące
│                akwarelowo na krawędzi — gradient CSS + filtr SVG na alphie),
│                InkMountain (ciemne zdjęcie szczytów w tle hero, assets/graphics; nazwa historyczna)
├── layout/      SiteHeader (logo pośrodku, 3 + 3 linki), MobileMenu (pełnoekranowe), LocaleSwitch, StickyCallBar, SiteFooter,
│                ConsentBanner, Wordmark (logo PNG z assets/brand), nav.ts (NAV_GROUPS left/right + FOOTER_EXTRA)
├── hero/        Hero (variant: home | product | qualifier | local; `cta` = nadpisanie CTA ekranu 1, używa go tylko /vouchery/;
│                home dostaje listę 01/02/03 z heroProducts.ts i slajdy,
│                bez eyebrow/ceny/proof, H1 tylko sr-only — decyzja 2026-09-09),
│                HeroSlides (client: rotacja 3 zdjęć co 3 s zsynchronizowana z listą — jedyny wyjątek od „zero karuzel") — ekran 1,
│                CTA telefonu ≤ ~630 px na 390×844 (baner zgód zaczyna się ~730 px)
├── trust/       TrustBar (★ 4,8 · ponad 800 opinii jako pierwsza pozycja + 4 lęki), ProofBadge,
│                TrustMarquee (client: na mobile wolna pętla auto-scroll z ręcznym przesuwaniem — decyzja 2026-09-10),
│                PlacesLine (jedna linia „Dojeżdżają do nas goście z…" + kotwica `#dojazd` pod paskiem zaufania — strona skuterów,
│                klaster lokalny; tekst z messages, wygląda na treść, nie listę fraz)
├── offer/       ProductCards + ProductCard, PricingCards (layout="route" = karty pod grzbietem, T1; "stack" = sama siatka, T4;
│                czas przez `durationParts` — „30 min"/„1 h"; lista „W cenie" per produkt z `priceIncludesFor`; skutery pokazują
│                pod ceną `unit` „za skuter" i `secondRider` „+50 zł za drugą osobę" — trzy liczby, których mylenie robiło opinie 1★;
│                `included={false}` = bez bloku „W cenie" — strona buggy ma trzy drabinki pod sobą (buggy 2-os. na grzbiecie,
│                6-os. pod `#buggy-6-osobowe`, Maverick pod `#maverick-xrs`) i listę pokazuje raz, pod pierwszą;
│                nagłówek karty przez `tierLabel` (stała STANDARD/PREMIUM albo etykieta lokalizowana „DO 4 OSÓB" — 6-os. ma
│                4 karty osoby × czas, bez wyróżnienia, siatka `lg:grid-cols-4`); `unit` „za buggy · do 2 osób" = cena za pojazd)
│                + PricingTrack (client: tor karuzeli wariantów; jedyne zadanie to pozycja startowa na wariancie wyróżnionym),
│                SeasonNotice, SelectItemLink (select_item),
│                VoucherCards (3 warianty z prices.quady + karta „dowolna kwota"; kotwica do #jak-zamowic, nie do #rezerwacja;
│                mobile = ta sama karuzela ze snapem co ProductCards, CTA przypięte do dołu przez `mt-auto` jak cena w ProductCard)
├── booking/     BookingSection (chipy Dziś / Jutro / Inny termin + SlotWise lazy) — JEDYNY punkt wejścia do rezerwacji;
│                `offSeason` (skutery III–X, decyzja 2026-09-11): bez chipów i kalendarza — notka o listopadzie, telefon
│                (jak fallback bez SlotWise) i link „Zobacz ofertę letnią"; `id="rezerwacja"` zostaje celem CTA
├── media/       Gallery (server: zajawka, siatka nie karuzela, kafle = linki do /galeria/#grupa, zero JS;
│                `more.hash` = grupa dla linku „Zobacz galerię", np. /galeria/#skutery);
│                LightboxGallery (server, tylko /galeria/; osobny plik, bo import klienckiego GalleryGrid dociąga jego chunk na
│                każdą stronę z importem) → GalleryGrid (client: kafle-przyciski) → GalleryLightbox (client, chunk po 1. kliknięciu:
│                yet-another-react-lightbox + Zoom + Counter — jedyna biblioteka UI w repo, nie liczy się do ekranu 1)
├── content/     ForWhom (`familiesLink={false}` = kafel „Rodziny" bez linku do buggy 6-os. — strona skuterów;
│                `familiesAnchor="#buggy-6-osobowe"` = kotwica do bloku 6-os. zamiast linku do tej samej strony — strona buggy),
│                Steps (od 2026-09-11 lista belkowa: indeks (01), aktywna pozycja z pomarańczową belką, hover przenosi belkę czystym CSS;
│                po prawej zdjęcie produktu z `media.sections.steps`, zwykły next/image w rounded-lg — bez zdjęcia sama lista), WhyUs,
│                DirectionsTable, FAQ + FaqAccordion (treść + FAQPage z jednego obiektu; na stronie głównej
│                opcjonalne zdjęcie WashImage po prawej na lg+, ziarno 37 — drugie użycie washu poza hero), Reviews,
│                VoucherHowTo (4 kroki zamówienia + wzór vouchera w grafitowej ramce — zwykły next/image, bez washu:
│                grafika ma twarde krawędzie i własną białą ramkę), Occasions (okazje pod długi ogon; kafel niesie zdanie, nie samą ikonę)
├── contact/     ContactClose (domknięcie stron: NAP + telefon), ContactHero (ekran 1 /kontakt/: H1 + ogromny tel: + adres +
│                jedyne CTA; data-contact-hero, własny data-hero-sentinel), CopyPhoneButton (client: „Skopiuj numer", desktop, phone_copy),
│                ContactPageView (client: contact_page_view, renderuje null), DirectionsLink (directions_click),
│                MapEmbed (server: ramka + adres + „Nawiguj") → LazyMapFrame (client: iframe Google Maps po doscrollowaniu)
├── tracking/    TrackingContext (page_type · product · language dla dataLayer)
└── ui/          (puste) shadcn/ui można dodać przez `pnpm dlx shadcn@latest add …`, ale menu i FAQ celowo stoją
                 na natywnych <dialog> i <details name> — radix kosztował ~45 kB gz na każdej stronie (budżet E < 310 kB)
```

Ruch: `Reveal` (znacznik) + `RevealObserver` (jeden IntersectionObserver w layoucie) + CSS w `globals.css`. Bez biblioteki animacji.

Zasady:
- Każdy numer telefonu = `PhoneLink` (`href="tel:+48539320700"`, `trackPhoneClick(cta_location, ctx)`), nigdy goły `<a>`.
- Telefon NIE jest CTA (decyzja 2026-09-10): nie wraca do headera, menu, sticky bara, hero ani pod sekcje. Zostaje w stopce, `ContactClose` i przy „masz pytania?" (FAQ, dojazd, fallback rezerwacji).
- Wyjątek: `/vouchery/`. Tam telefon JEST CTA („Zamów voucher", `cta_location: "voucher"`, wariant `outline`) — voucher ustala się telefonicznie, SlotWise go nie sprzedaje, a adresu e-mail firma nie potwierdziła.
- Zdjęcia wyłącznie z `content/media.ts` (`confirmed: false` → nie renderuje się). Ceny z `content/prices.ts`. FAQ z `content/faq.ts`.
- Nie owijaj w `Reveal` niczego z ekranu 1 (hero, pasek zaufania, CTA).

Grafiki (nie zdjęcia) — `assets/graphics/` i `assets/brand/`:
- `hero-mountain-ink.webp` (nazwa historyczna) to od 2026-09-09 ciemne zdjęcie szczytów (JPG 736×1445 od właścicielki:
  `~/Desktop/d5e252d1e0b9f99fadd24708b132da7e.jpg`, nie w repo), kadr 2:3 z pominięciem części nieba, z czerniami podniesionymi
  do koloru tła `#101418` (`-level` zeruje niebo, `Screen` nad tłem daje dokładnie `--background` w płaskich partiach; ≈ 26 kB).
  Maska w `InkMountain` wtapia też górę (niebo ma własny gradient). Przepis:
  ```sh
  magick zrodlo.jpg -resize 1000x -crop 1000x1499+0+300 +repage -level 5%,100% \
    \( +clone -fill "#101418" -colorize 100 \) -compose Screen -composite \
    -strip -quality 62 -define webp:method=6 assets/graphics/hero-mountain-ink.webp
  ```
  Przy zmianie `--background` przeliczyć plik tym samym poleceniem. Plik musi zostać < ~90 kB (liczy się do „lazy images",
  nie do budżetu ekranu 1, ale konkuruje o pasmo ze zdjęciem LCP).
  W hero rysunek leży po lewej, za listą 01/02/03, i częściowo pod zdjęciem; hero nie ma grzbietu SVG.
- `products-ridge.webp` — tło sekcji „Wybierz swoją wyprawę" na stronie głównej **i sekcji „Warianty i ceny" w szablonie T1**
  (`PricingCards` z `layout="route"`, od 2026-09-10): grafika szczytów z czarnym niebem i lasem
  (PNG 1536×1024 od właścicielki, trzecia wersja z 2026-09-10: `~/Downloads/ChatGPT Image 10 wrz 2026, 12_30_05.png`, nie w repo;
  ma kanał alfa, więc najpierw spłaszczenie; góry i las sięgają do obu krawędzi, wokół głównego szczytu lekka poświata w niebie).
  Ten sam przepis co wyżej: czernie do `#101418`, żeby niebo = `--background` i obraz mógł wejść pod nagłówek sekcji bez
  widocznej krawędzi; 1280 px, q50 ≈ 118 kB (rycina ma dużo detalu — las na całej szerokości; q55 daje już ~125 kB):
  ```sh
  magick zrodlo.png -background black -alpha remove -alpha off -resize 1280x -level 5%,100% \
    \( +clone -fill "#101418" -colorize 100 \) -compose Screen -composite \
    -strip -quality 50 -define webp:method=6 assets/graphics/products-ridge.webp
  ```
  Geometria (skyline co 16 px i 4 szczyty pod markery, w układzie 1536×1024) siedzi w `graphics/RidgeRoute.tsx`; przy nowym
  obrazie wyznaczyć ją ponownie (`magick -threshold 62%` → pierwszy piksel, od którego idą 2 jasne piksele w pionie;
  potem wygładzić zapadnięcia w cieniach interpolacją z sąsiadów i wstawić wierzchołki spoza siatki 16 px — sprawdzić,
  nakładając polilinię na obraz `-draw "polyline …"`). Maska (dół → tło, boki) też w `RidgeRoute`. Obraz, SVG i markery dzielą jedno pudełko 3:2.
  Markery są linkami do kart (`#oferta-<id>`, `productCardAnchor` w `offer/ProductCard.tsx`; w cenniku `#wariant-<id>`,
  `pricingCardAnchor` w `offer/PricingCards.tsx`): scroll strony i poziomej karuzeli oraz fokus na karcie robi natywna
  nawigacja fragmentowa (karta ma `tabIndex={-1}` i `:target` ring), bez JS.
  Przy 3 markerach (drabinka quadów/buggy: STANDARD · PREMIUM · ULTRA) `pickPeaks` bierze lewy grzbiet · główny szczyt ·
  prawy grzbiet — najwyższy jest środkowy, więc na wierzchołku ląduje wariant wyróżniony (`highlightTier`), a nie ostatni.
- Logo: `logo-zakoextreme-white.png` (oryginał klienta; domyślne w `Wordmark` — header, stopka, menu) i `-dark.png` (na ewentualne
  jasne powierzchnie) wygenerowany z oryginału:
  `magick logo.png -fill "#14181d" -colorize 100 -strip assets/brand/logo-zakoextreme-dark.png`.
- Zdjęcie hero „wypłukane na krawędzi" (brief 2026-09-09, runda 6: PHOTO → EDGE EROSION → TRANSPARENT → tło strony (od ciemnego
  motywu: grafit), żadnego kleksa ani overlayu; krawędź chaotyczna, wieloskalowa, a ogon washu przechodzi nad rysunek góry).
  Ghost ma `brightness(.85)`, żeby na ciemnym czytać się jak dym, nie jasna smuga. Warstwy o różnych skalach:
  kierunek = gradient CSS `.wash-base` (globals.css, %, mobile w dół / desktop w lewo + słabiej w dół) z długim ogonem niskiej
  alphy sięgającym nad rysunek; loby + falowanie = jeden szum 3-oktawowy przesuwa rampę alphy o kilkadziesiąt px wzdłuż osi
  zanikania (displacement bramkowany pasmem przejścia — rdzeń i proste krawędzie nie falują); wypłukania = szum 15–60 px ze
  stromym progiem z wagą zależną od alphy (ogon rozpada się na fragmenty, głębiej kieszenie wewnątrz strefy); mikro = ziarno
  o sile modulowanej szumem lobów (plamami, nie równomiernie); krzywa = `feComponentTransfer` z łagodną tabelą. Filtr siedzi na
  elemencie HTML (`filter: url(#id)`), więc częstotliwości, skala i blur są w px CSS niezależnie od viewportu (osobne parametry
  mobile/desktop, `watercolor.ts`). `WatercolorDefs` renderuje 4 filtry raz na hero; `WashImage` = dwie kopie zdjęcia z jednego
  requestu: ghost (przygaszona, opacity 0,25, filtr wysp i zacieków z tymi samymi lobami — to ona leży na rysunku góry, kreska
  widoczna pod alpha ≤ ~0,3) pod kopią ostrą. `seed` stały, slajdy rotacji dzielą jeden seed; nic nie jest animowane.
  **Budżet filtra**: Chrome przestaje rysować element przy ~25+ prymitywach na ekranie 2× (zmierzone: 24 OK, 29 pusty hero) —
  przed dodaniem warstwy policz prymitywy i sprawdź zrzut przy `deviceScaleFactor: 2`. Geometria nachodzenia: kontener zdjęcia
  wysunięty 44 % (lg) / 73 % (xl) kolumny w lewo (Hero.tsx; rdzeń zdjęcia od ~56 % viewportu przy 1440), rysunek szerszy z późniejszym zanikiem maski (InkMountain), na mobile zdjęcie
  wystaje 64 px pod swoją wysokość w przepływie i rozpływa się nad szczyt rysunku.
