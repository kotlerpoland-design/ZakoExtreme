import type { StaticImageData } from "next/image";
import type { ProductId, Season } from "@/config/season";

import heroQuadsPeaksRender from "@/assets/images/hero-quads-peaks-render.jpg";
import heroBuggyGravelPeaksRender from "@/assets/images/hero-buggy-gravel-peaks-render.jpg";
import heroSnowmobilesDawnRender from "@/assets/images/hero-snowmobiles-dawn-render.jpg";
import sectionFaqBuggyDuskRender from "@/assets/images/section-faq-buggy-dusk-render.jpg";
import voucherZakoextreme from "@/assets/images/voucher-zakoextreme.jpg";
import heroVoucherQuadSunsetRender from "@/assets/images/hero-voucher-quad-sunset-render.jpg";
import heroQuadZakopanePanorama from "@/assets/images/hero-quad-zakopane-panorama.jpg";
import heroQuadTrackSunsetRender from "@/assets/images/hero-quad-track-sunset-render.jpg";
import heroBuggyMeadowPeaks from "@/assets/images/hero-buggy-meadow-peaks.jpg";
import heroSnowmobilesSunset from "@/assets/images/hero-snowmobiles-sunset.jpg";
import cardQuadRider from "@/assets/images/card-quad-rider.jpg";
import cardBuggySixSeater from "@/assets/images/card-buggy-six-seater.jpg";
import cardMaverickDusk from "@/assets/images/card-maverick-dusk.jpg";
import cardSnowmobileRide from "@/assets/images/card-snowmobile-ride.jpg";
import galleryGroupPeaks from "@/assets/images/gallery-group-peaks.jpg";
import galleryBuggiesStormPeaks from "@/assets/images/gallery-buggies-storm-peaks.jpg";
import galleryTwoQuadsAutumn from "@/assets/images/gallery-two-quads-autumn.jpg";
import galleryFleetSnowyPeaks from "@/assets/images/gallery-fleet-snowy-peaks.jpg";
import galleryBuggyPanorama from "@/assets/images/gallery-buggy-panorama.jpg";
import gallerySnowmobilesDusk from "@/assets/images/gallery-snowmobiles-dusk.jpg";
import gallerySnowmobilesPeaks from "@/assets/images/gallery-snowmobiles-peaks.jpg";
import gallerySnowmobileRider from "@/assets/images/gallery-snowmobile-rider.jpg";
import heroQuadRidePeaks from "@/assets/images/hero-quad-ride-peaks.jpg";
import heroGalleryBuggiesSunsetRender from "@/assets/images/hero-gallery-buggies-sunset-render.jpg";
// podstrona /galeria/ — pozostałe zdjęcia z zakoextreme.pl/galeria/ (2026-09-10), obejrzane: prawdziwa flota, prawdziwe grupy
import galleryQuadThumbsUp from "@/assets/images/gallery-quad-thumbs-up.jpg";
import galleryQuadsMeadowRow from "@/assets/images/gallery-quads-meadow-row.jpg";
import galleryQuadsRidgeRoad from "@/assets/images/gallery-quads-ridge-road.jpg";
import galleryQuadStream from "@/assets/images/gallery-quad-stream.jpg";
import galleryQuadsFieldLine from "@/assets/images/gallery-quads-field-line.jpg";
import galleryQuadGroupRain from "@/assets/images/gallery-quad-group-rain.jpg";
import galleryBuggyCockpitPeaks from "@/assets/images/gallery-buggy-cockpit-peaks.jpg";
import galleryThreeBuggies from "@/assets/images/gallery-three-buggies.jpg";
import galleryTwoBuggiesMuddy from "@/assets/images/gallery-two-buggies-muddy.jpg";
import galleryBuggySixSeaterWide from "@/assets/images/gallery-buggy-six-seater-wide.jpg";
// render wskazany przez właścicielkę 2026-09-11 (~/Downloads/ChatGPT Image 11 wrz 2026, 11_11_23.png, nie w repo;
// JPG q70, 1448×1086 jak pozostałe rendery: `magick zrodlo.png -strip -quality 70 …`) — galeria skuterów
import gallerySnowmobilesSunsetRender from "@/assets/images/gallery-snowmobiles-sunset-render.jpg";
// rendery wskazane przez właścicielkę 2026-09-11 do sekcji „Jak przebiega wyprawa" (nie w repo; JPG q70, 1448×1086):
// quady ~/Desktop/zakoextreme/ChatGPT Image 9 wrz 2026, 12_37_26.png · skutery ~/Downloads/ChatGPT Image 11 wrz 2026, 12_05_26.png
import sectionStepsQuadsTrailRender from "@/assets/images/section-steps-quads-trail-render.jpg";
import sectionStepsSnowmobilesDuskRender from "@/assets/images/section-steps-snowmobiles-dusk-render.jpg";
// render wskazany przez właścicielkę 2026-09-11 do bloku „Maverick XRS" na /buggy-zakopane/ (~/Desktop/zakoextreme/ChatGPT Image
// 11 wrz 2026, 13_17_50.png, nie w repo; JPG q70, 1448×1086): mobile = tło bloku pod ciemnym gradientem, desktop = zdjęcie po prawej
import sectionMaverickXrsRender from "@/assets/images/section-maverick-xrs-render.jpg";

/**
 * REJESTR MEDIÓW — jedyne źródło zdjęć na stronie.
 * Pochodzenie: biblioteka mediów starego WordPressa zakoextreme.pl (scripts/fetch-media.mjs), przejrzane ręcznie:
 * prawdziwa flota (CFMoto / Can-Am), prawdziwe grupy klientów, panorama Tatr z Zakopanego, prawdziwe skutery z grudnia.
 * Odrzucone: grafiki generowane AI (ChatGPT-Image-*), kreacje GBP-*, WPIS-*, miniatury < 1200 px.
 * Wyjątek: rendery wskazane przez właścicielkę (`*-render.jpg`, sceny z prawdziwych wypraw i prawdziwa flota) — hero i sekcje.
 *
 * `confirmed: false` = zdjęcie NIE renderuje się nigdzie (sekcja przechodzi na sam grzbiet SVG / znika).
 * Właściciel może odrzucić każde zdjęcie jedną zmianą flagi.
 *
 * Alt: opisuje to, co widać na zdjęciu (docs/pakiet/06-CHECKLISTA-JAKOSCI.md §D). Bez wieku, bez listy fraz.
 */
export type MediaItem = {
  id: string;
  src: StaticImageData;
  alt: { pl: string; en: string };
  confirmed: boolean;
  /** kadr: gdzie trzymać środek przy przycinaniu do pasma (szczyty muszą zostać) */
  position?: string;
  product?: ProductId;
  /** true = zdjęcie zimowe; pokazujemy tylko w sezonie zimowym */
  winter?: boolean;
};

const item = (m: MediaItem): MediaItem => m;

export const media = {
  hero: {
    home: {
      /* Render na podstawie prawdziwego zdjęcia hero (hero-quad-ride-peaks.jpg, ta sama scena i flota) — wskazany przez
         właścicielkę projektu 2026-09-09 pod kompozycję „kleksa akwareli"; oryginał zostaje w assets/images. */
      summer: item({
        id: "hero-quads-peaks-render",
        src: heroQuadsPeaksRender,
        alt: {
          pl: "Osoba w kasku jedzie quadem polną drogą w stronę aparatu, za nią kolejne quady i ośnieżone szczyty gór",
          en: "A rider in a helmet on a quad coming down a dirt track towards the camera, more quads behind and snow-capped peaks in the distance",
        },
        confirmed: true,
        position: "62% 45%",
        product: "quady",
      }),
      shoulder: item({
        id: "hero-quads-peaks-render",
        src: heroQuadsPeaksRender,
        alt: {
          pl: "Osoba w kasku jedzie quadem polną drogą w stronę aparatu, za nią kolejne quady i ośnieżone szczyty gór",
          en: "A rider in a helmet on a quad coming down a dirt track towards the camera, more quads behind and snow-capped peaks in the distance",
        },
        confirmed: true,
        position: "62% 45%",
        product: "quady",
      }),
      winter: item({
        id: "hero-snowmobiles-sunset",
        src: heroSnowmobilesSunset,
        alt: {
          pl: "Trzy skutery śnieżne na śniegu o zachodzie słońca, w tle zarys gór",
          en: "Three snowmobiles on snow at sunset with a mountain outline behind",
        },
        confirmed: true,
        position: "50% 50%",
        product: "skutery",
        winter: true,
      }),
    } satisfies Record<Season, MediaItem>,
    /* Rotacja hero strony głównej (decyzja 2026-09-09): po jednym renderze na filar, wszystkie na podstawie scen z prawdziwych
       wypraw (flota, trasy nad Zakopanem). Kolejność slajdów = kolejność listy 01/02/03 (components/hero/heroProducts.ts).
       Slajd buggy podmieniony 2026-09-10 na render wskazany przez właścicielkę (~/Desktop/zakoextreme/ChatGPT Image 9 wrz 2026,
       17_07_49.png, nie w repo; JPG q70, 1448×1086 jak pozostałe rendery); poprzedni hero-buggy-dusk-render.jpg zostaje w assets/images. */
    slides: {
      quady: item({
        id: "slide-quads-peaks",
        src: heroQuadsPeaksRender,
        alt: {
          pl: "Osoba w kasku jedzie quadem polną drogą w stronę aparatu, za nią kolejne quady i ośnieżone szczyty gór",
          en: "A rider in a helmet on a quad coming down a dirt track towards the camera, more quads behind and snow-capped peaks in the distance",
        },
        confirmed: true,
        position: "62% 45%",
        product: "quady",
      }),
      buggy: item({
        id: "slide-buggy-gravel-peaks",
        src: heroBuggyGravelPeaksRender,
        alt: {
          pl: "Osoba w kasku i goglach prowadzi buggy 4×4 szutrową drogą, w tle hale i ośnieżone szczyty gór",
          en: "A rider in a helmet and goggles driving a 4×4 buggy up a gravel track, alpine pastures and snow-capped peaks behind",
        },
        confirmed: true,
        position: "55% 50%",
        product: "buggy",
      }),
      skutery: item({
        id: "slide-snowmobiles-dawn",
        src: heroSnowmobilesDawnRender,
        alt: {
          pl: "Grupa na skuterach śnieżnych jedzie przez śnieg o wschodzie słońca, w tle ośnieżone szczyty",
          en: "A group on snowmobiles riding through fresh snow at sunrise with snow-capped peaks behind",
        },
        confirmed: true,
        position: "42% 55%",
        product: "skutery",
      }),
    } satisfies Record<"quady" | "buggy" | "skutery", MediaItem>,
    /* render wskazany przez właścicielkę (2026-09-10), hero /quady-zakopane/ — prawdziwa scena: szutrowa droga nad
       Zakopanem o zachodzie słońca, panorama Tatr. Poprzednie zdjęcie (hero-quad-zakopane-panorama.jpg) to prawdziwa
       fotografia — zostaje w zestawie podstrony /galeria/ (galleryPageQuady). */
    quady: item({
      id: "hero-quad-track-sunset-render",
      src: heroQuadTrackSunsetRender,
      alt: {
        pl: "Osoba w kasku jedzie czerwonym quadem szutrową drogą o zachodzie słońca, w tle świerki i ośnieżone szczyty Tatr",
        en: "A helmeted rider on a red quad on a gravel track at sunset, spruces and snow-capped Tatra peaks behind",
      },
      confirmed: true,
      /* quad w prawej-dolnej części kadru, szczyty w górnej — przy przycinaniu do pasma trzymamy środek po prawej */
      position: "60% 50%",
      product: "quady",
    }),
    /* hero /buggy-zakopane/ = ten sam render co slajd buggy na stronie głównej (decyzja 2026-09-11, jak skutery);
       prawdziwe zdjęcie hero-buggy-meadow-peaks.jpg zostaje w media.cards.buggy */
    buggy: item({
      id: "hero-buggy-gravel-peaks-render",
      src: heroBuggyGravelPeaksRender,
      alt: {
        pl: "Osoba w kasku i goglach prowadzi buggy 4×4 szutrową drogą, w tle hale i ośnieżone szczyty gór",
        en: "A rider in a helmet and goggles driving a 4×4 buggy up a gravel track, alpine pastures and snow-capped peaks behind",
      },
      confirmed: true,
      /* buggy w środkowo-prawej części kadru, szczyty u góry — jak na slajdzie */
      position: "55% 50%",
      product: "buggy",
    }),
    /* hero /skutery-sniezne-zakopane/ = ten sam render co slajd skuterów na stronie głównej (decyzja 2026-09-11);
       prawdziwe zdjęcie hero-snowmobiles-sunset.jpg zostaje w galleryWinter */
    skutery: item({
      id: "hero-snowmobiles-dawn-render",
      src: heroSnowmobilesDawnRender,
      alt: {
        pl: "Grupa na skuterach śnieżnych jedzie przez śnieg o wschodzie słońca, w tle ośnieżone szczyty",
        en: "A group on snowmobiles riding through fresh snow at sunrise with snow-capped peaks behind",
      },
      confirmed: true,
      /* grupa w lewej-środkowej części kadru, szczyty u góry — jak na slajdzie */
      position: "42% 55%",
      product: "skutery",
      winter: true,
    }),
    // render od właścicielki (2026-09-10), tylko hero /galeria/
    galeria: item({
      id: "hero-gallery-buggies-sunset-render",
      src: heroGalleryBuggiesSunsetRender,
      alt: {
        pl: "Trzy buggy Maverick na polnej drodze o zachodzie słońca, grupa patrzy na panoramę Tatr",
        en: "Three Maverick buggies on a dirt track at sunset, a group looking out over the Tatra panorama",
      },
      confirmed: true,
      position: "50% 45%",
      product: "buggy",
    }),
    // render wskazany przez właścicielkę (2026-09-10), tylko hero /vouchery/
    vouchery: item({
      id: "hero-voucher-quad-sunset-render",
      src: heroVoucherQuadSunsetRender,
      alt: {
        pl: "Osoba w kasku jedzie czerwonym quadem szutrową drogą o zachodzie słońca, w tle ośnieżone szczyty Tatr i świerki",
        en: "A helmeted rider on a red quad on a gravel track at sunset, snow-capped Tatra peaks and spruces behind",
      },
      confirmed: true,
      /* quad w prawej-dolnej części kadru, szczyty w górnej; lewa krawędź eroduje w tło, więc trzymamy środek po prawej */
      position: "62% 50%",
      product: "quady",
    }),
  },

  cards: {
    quady: item({
      id: "card-quad-rider",
      src: cardQuadRider,
      alt: { pl: "Uśmiechnięta osoba w kasku na quadzie Can-Am na polnej drodze, za nią kolejne quady", en: "A smiling rider in a helmet on a Can-Am quad on a dirt track, more quads behind" },
      confirmed: true,
      position: "50% 40%",
      product: "quady",
    }),
    buggy: item({
      id: "hero-buggy-meadow-peaks",
      src: heroBuggyMeadowPeaks,
      alt: { pl: "Niebieskie buggy Can-Am na łące z widokiem na Tatry", en: "A blue Can-Am buggy on a meadow facing the Tatra peaks" },
      confirmed: true,
      position: "65% 50%",
      product: "buggy",
    }),
    buggy6: item({
      id: "card-buggy-six-seater",
      src: cardBuggySixSeater,
      alt: { pl: "Sześcioosobowe buggy CFMoto z dwoma rzędami siedzeń na łące, obok quady", en: "A six-seat CFMoto buggy with two rows of seats on a meadow, quads parked beside it" },
      confirmed: true,
      position: "50% 60%",
      product: "buggy6",
    }),
    maverick: item({
      id: "card-maverick-dusk",
      src: cardMaverickDusk,
      alt: { pl: "Buggy Can-Am Maverick o zmierzchu na drodze nad Zakopanem, w dole światła miasta", en: "A Can-Am Maverick buggy at dusk on a road above Zakopane, town lights below" },
      confirmed: true,
      position: "50% 65%",
      product: "maverick",
    }),
    skutery: item({
      id: "card-snowmobile-ride",
      src: cardSnowmobileRide,
      alt: { pl: "Osoba jedzie skuterem śnieżnym po zaśnieżonej trasie w słońcu", en: "A rider on a snowmobile on a snowy trail in sunshine" },
      confirmed: true,
      position: "50% 55%",
      product: "skutery",
      winter: true,
    }),
  } satisfies Record<ProductId, MediaItem>,

  gallery: [
    item({
      id: "gallery-group-peaks",
      src: galleryGroupPeaks,
      alt: { pl: "Grupa w kaskach na quadach ustawionych w rzędzie na grani, w tle panorama Tatr", en: "A group in helmets on quads lined up on a ridge with the Tatra panorama behind" },
      confirmed: true,
      position: "50% 45%",
      product: "quady",
    }),
    item({
      id: "gallery-buggies-storm-peaks",
      src: galleryBuggiesStormPeaks,
      alt: { pl: "Dwa buggy na łące pod burzowym niebem, na horyzoncie grzbiet Tatr", en: "Two buggies on a meadow under a stormy sky with the Tatra ridge on the horizon" },
      confirmed: true,
      position: "50% 50%",
      product: "buggy",
    }),
    item({
      id: "gallery-two-quads-autumn",
      src: galleryTwoQuadsAutumn,
      alt: { pl: "Dwa quady na jesiennej drodze, przed nimi rozległy widok na ośnieżone Tatry", en: "Two quads on an autumn track with a wide view of snow-covered Tatras ahead" },
      confirmed: true,
      product: "quady",
    }),
    item({
      id: "gallery-fleet-snowy-peaks",
      src: galleryFleetSnowyPeaks,
      alt: { pl: "Rząd quadów z kierowcami na łące, za nimi ośnieżone szczyty Tatr", en: "A row of quads with riders on a meadow, snow-capped Tatra peaks behind" },
      confirmed: true,
      position: "50% 55%",
      product: "quady",
    }),
    item({
      id: "gallery-buggy-panorama",
      src: galleryBuggyPanorama,
      alt: { pl: "Niebieskie buggy na polnej drodze, w tle łąki i pasmo Tatr", en: "A blue buggy on a field track with meadows and the Tatra range behind" },
      confirmed: true,
      product: "buggy",
    }),
    item({
      id: "card-maverick-dusk",
      src: cardMaverickDusk,
      alt: { pl: "Buggy Maverick o zmierzchu nad światłami Zakopanego", en: "A Maverick buggy at dusk above the lights of Zakopane" },
      confirmed: true,
      position: "50% 65%",
      product: "maverick",
    }),
  ] as readonly MediaItem[],

  /* Zimowa galeria: pierwszy = duży kafel 2×2 zajawki na /skutery-sniezne-zakopane/ (5 zdjęć domyka mozaikę);
     ta sama lista idzie do zimowej galerii „/" (galleryFor) i grupy skuterów na /galeria/ (galleryPageGroups). */
  galleryWinter: [
    item({
      id: "gallery-snowmobiles-sunset-render",
      src: gallerySnowmobilesSunsetRender,
      alt: {
        pl: "Trzy osoby w kaskach na skuterach śnieżnych na zaśnieżonej polanie o zachodzie słońca, w tle ośnieżone szczyty gór",
        en: "Three riders in helmets on snowmobiles on a snowy clearing at sunset, snow-capped peaks behind",
      },
      confirmed: true,
      /* pomarańczowy skuter w prawej-dolnej części kadru, szczyty w górnej trzeciej — środek trzymamy nisko */
      position: "50% 60%",
      product: "skutery",
      winter: true,
    }),
    item({
      id: "gallery-snowmobiles-peaks",
      src: gallerySnowmobilesPeaks,
      alt: { pl: "Skutery śnieżne na zaśnieżonym polu, w tle szczyty Tatr", en: "Snowmobiles on a snowy field with Tatra peaks behind" },
      confirmed: true,
      product: "skutery",
      winter: true,
    }),
    item({
      id: "gallery-snowmobiles-dusk",
      src: gallerySnowmobilesDusk,
      alt: { pl: "Dwa skutery śnieżne o zmierzchu, w dole światła wsi, na horyzoncie góry", en: "Two snowmobiles at dusk, village lights below and mountains on the horizon" },
      confirmed: true,
      product: "skutery",
      winter: true,
    }),
    item({
      id: "gallery-snowmobile-rider",
      src: gallerySnowmobileRider,
      alt: { pl: "Osoba na skuterze śnieżnym jedzie śnieżną trasą pod słońce", en: "A rider on a snowmobile heading up a snowy trail into the sun" },
      confirmed: true,
      product: "skutery",
      winter: true,
    }),
    item({
      id: "hero-snowmobiles-sunset",
      src: heroSnowmobilesSunset,
      alt: { pl: "Trzy skutery śnieżne o zachodzie słońca", en: "Three snowmobiles at sunset" },
      confirmed: true,
      product: "skutery",
      winter: true,
    }),
  ] as readonly MediaItem[],

  /* Zdjęcia sekcji treści (od 2026-09-10). FAQ strony głównej: render wskazany przez właścicielkę
     (~/Downloads/ChatGPT Image 10 wrz 2026, 10_05_18.png, nie w repo; JPG q88 jak rendery hero) — scena buggy o zmierzchu
     jak rendery hero. Renderowany tylko na lg+ (content/FAQ.tsx), zatopiony w tło jak zdjęcie hero. */
  sections: {
    faq: item({
      id: "section-faq-buggy-dusk-render",
      src: sectionFaqBuggyDuskRender,
      alt: {
        pl: "Osoba w żółtej kurtce opiera się o buggy 4×4 na wzgórzu o zmierzchu, w dole światła miasta, w tle ośnieżone szczyty gór",
        en: "A person in a yellow jacket leaning on a 4×4 buggy on a hillside at dusk, town lights below and snow-capped peaks behind",
      },
      confirmed: true,
      /* buggy i postać w lewej-środkowej części kadru, szczyty zostają; lewa krawędź i tak eroduje w tło */
      position: "40% 55%",
      product: "buggy",
    }),

    /* „Jak przebiega wyprawa" (decyzja 2026-09-11: lista belkowa + zdjęcie produktu po prawej, zwykły next/image w rounded-lg —
       twarda krawędź jak na referencji, bez washu). Per produkt; strona bez wpisu renderuje samą listę. */
    steps: {
      quady: item({
        id: "section-steps-quads-trail-render",
        src: sectionStepsQuadsTrailRender,
        alt: {
          pl: "Osoba w kasku jedzie czarnym quadem polną drogą wśród traw, za nią kolejne quady w kurzu, w tle panorama Tatr",
          en: "A helmeted rider on a black quad on a dirt track through grass, more quads in the dust behind, the Tatra panorama in the distance",
        },
        confirmed: true,
        /* quad w prawej połowie kadru, szczyty w górnej trzeciej */
        position: "60% 50%",
        product: "quady",
      }),
      skutery: item({
        id: "section-steps-snowmobiles-dusk-render",
        src: sectionStepsSnowmobilesDuskRender,
        alt: {
          pl: "Dwa skutery śnieżne na zaśnieżonym wzgórzu o zmierzchu, w dole światła wsi, na horyzoncie ośnieżone Tatry",
          en: "Two snowmobiles on a snowy hillside at dusk, village lights below and the snow-capped Tatras on the horizon",
        },
        confirmed: true,
        position: "50% 55%",
        product: "skutery",
        winter: true,
      }),
    } satisfies Partial<Record<ProductId, MediaItem>>,

    /* Blok „Maverick XRS — 240 KM" na /buggy-zakopane/ (decyzja 2026-09-11): jedyny blok cennika ze zdjęciem —
       górna kotwica cenowa dostaje „wow". Mobile: tło bloku (gradient trzyma kontrast nagłówka), desktop: po prawej obok karty. */
    maverick: item({
      id: "section-maverick-xrs-render",
      src: sectionMaverickXrsRender,
      alt: {
        pl: "Buggy Maverick na szutrowej drodze nad doliną o zachodzie słońca, w tle panorama ośnieżonych Tatr",
        en: "A Maverick buggy on a gravel track above the valley at sunset, the snow-capped Tatra panorama behind",
      },
      confirmed: true,
      /* pojazd w prawej-środkowej części kadru, szczyty w górnej trzeciej — przy pionowym kadrze na mobile trzymamy środek po prawej */
      position: "62% 50%",
      product: "maverick",
    }),

    /* Wzór vouchera — plik od właścicielki (~/Desktop/zakoextreme/voucher.jpg), stara oprawa graficzna.
       Pokazujemy realny produkt, więc NIE podmieniamy grafiki na własną kompozycję; oprawę daje sekcja.
       Uwaga: oryginał ma tylko 729×344 px — nie skalować w górę (VoucherHowTo trzyma max-w ~730 px).
       [[DO POTWIERDZENIA: wersja w wyższej rozdzielczości]] — poprosić właścicielkę, patrz 03-COPY §8. */
    voucher: item({
      id: "voucher-zakoextreme",
      src: voucherZakoextreme,
      alt: {
        pl: "Wzór vouchera ZakoExtreme: quad jadący w tumanach błota, napis „voucher” i logo firmy",
        en: "The ZakoExtreme voucher artwork: a quad riding through flying mud, the word “voucher” and the company logo",
      },
      confirmed: true,
      product: "quady",
    }),
  },
} as const;

/** Zdjęcie do renderowania albo null — komponenty NIE sprawdzają flagi same. */
export function confirmedMedia(m: MediaItem | undefined | null): MediaItem | null {
  return m && m.confirmed ? m : null;
}

/** Galeria per sezon: zimą zimowe + letnie „z widokiem", poza zimą bez skuterów. */
export function galleryFor(season: Season, limit = 6): MediaItem[] {
  const pool = season === "winter" ? [...media.galleryWinter, ...media.gallery] : media.gallery;
  return pool.filter((m) => m.confirmed).slice(0, limit);
}

/**
 * Podstrona /galeria/ (2026-09-10): pełny zestaw ze starej galerii WP (12 quady + 8 buggy) plus zimowe skutery z repo.
 * Zdjęcia, które już są w siatkach/kartach, to te same obiekty (jeden alt, jeden plik). Odrzucone z WP:
 * `zakopane-quady-2.jpg` — kopia 360 px zdjęcia ze strumieniem; `quady-zakopane-zakoextreme-1-scaled.jpg` — duplikat .jpeg.
 */
const galleryPageQuady: readonly MediaItem[] = [
  item({
    id: "gallery-quad-thumbs-up",
    src: galleryQuadThumbsUp,
    alt: { pl: "Osoba w kasku na quadzie pokazuje kciuk w górę, obok drugi quad, w tle zielone łąki i chmury nad Tatrami", en: "A rider in a helmet on a quad giving a thumbs up, another quad beside, green meadows and clouds over the Tatras behind" },
    confirmed: true,
    product: "quady",
  }),
  item({
    id: "gallery-quads-meadow-row",
    src: galleryQuadsMeadowRow,
    alt: { pl: "Rząd quadów z grupą w żółtych czapkach na zielonej łące, w tle pełna panorama Tatr w słoneczny dzień", en: "A row of quads with a group in yellow caps on a green meadow, the full Tatra panorama behind on a sunny day" },
    confirmed: true,
    position: "50% 60%",
    product: "quady",
  }),
  item({
    id: "gallery-quads-ridge-road",
    src: galleryQuadsRidgeRoad,
    alt: { pl: "Grupa na quadach zjeżdża polną drogą pod ciemnym, burzowym niebem", en: "A group on quads heading down a dirt track under a dark, stormy sky" },
    confirmed: true,
    position: "50% 55%",
    product: "quady",
  }),
  item({
    id: "gallery-quad-stream",
    src: galleryQuadStream,
    alt: { pl: "Dwie osoby na czerwonym quadzie przejeżdżają przez górski strumień w lesie", en: "Two people on a red quad crossing a mountain stream in the forest" },
    confirmed: true,
    product: "quady",
  }),
  item({
    id: "hero-quad-zakopane-panorama",
    src: heroQuadZakopanePanorama,
    alt: {
      pl: "Czerwony quad na zboczu nad Zakopanem, w dole miasto, w tle grzbiet Tatr",
      en: "A red quad on a hillside above Zakopane, the town below and the Tatra ridge behind",
    },
    confirmed: true,
    position: "55% 40%",
    product: "quady",
  }),
  item({
    id: "hero-quad-ride-peaks",
    src: heroQuadRidePeaks,
    alt: { pl: "Quad w chmurze kurzu na polnej drodze, za nim kolejne, na horyzoncie pasmo Tatr", en: "A quad in a cloud of dust on a dirt track, more quads behind, the Tatra range on the horizon" },
    confirmed: true,
    product: "quady",
  }),
  item({
    id: "gallery-quads-field-line",
    src: galleryQuadsFieldLine,
    alt: { pl: "Quady i buggy ustawione w rzędzie na zaoranym polu, w tle pasmo gór pod zachmurzonym niebem", en: "Quads and a buggy lined up on a ploughed field, a mountain range behind under an overcast sky" },
    confirmed: true,
    position: "50% 60%",
    product: "quady",
  }),
  item({
    id: "gallery-quad-group-rain",
    src: galleryQuadGroupRain,
    alt: { pl: "Grupa w kurtkach przeciwdeszczowych wokół quada na leśnej drodze w deszczowy dzień", en: "A group in rain jackets around a quad on a forest track on a rainy day" },
    confirmed: true,
    position: "50% 60%",
    product: "quady",
  }),
];

const galleryPageBuggy: readonly MediaItem[] = [
  item({
    id: "gallery-buggy-cockpit-peaks",
    src: galleryBuggyCockpitPeaks,
    alt: { pl: "Widok zza kierownicy niebieskiego buggy na łąkę i ośnieżone szczyty Tatr", en: "View from behind the wheel of a blue buggy over a meadow to the snow-capped Tatra peaks" },
    confirmed: true,
    position: "50% 35%",
    product: "buggy",
  }),
  item({
    id: "gallery-three-buggies",
    src: galleryThreeBuggies,
    alt: { pl: "Trzy buggy — pomarańczowe, niebieskie i żółte — na polnej drodze pod błękitnym niebem", en: "Three buggies, orange, blue and yellow, on a dirt track under a blue sky" },
    confirmed: true,
    position: "50% 55%",
    product: "buggy",
  }),
  item({
    id: "gallery-two-buggies-muddy",
    src: galleryTwoBuggiesMuddy,
    alt: { pl: "Dwa zabłocone buggy na łące o zmierzchu, na horyzoncie Tatry", en: "Two mud-covered buggies on a meadow at dusk with the Tatras on the horizon" },
    confirmed: true,
    position: "50% 55%",
    product: "buggy",
  }),
  item({
    id: "gallery-buggy-six-seater-wide",
    src: galleryBuggySixSeaterWide,
    alt: { pl: "Sześcioosobowe buggy na łące, obok quady i grupa, w tle chmury nad górami", en: "A six-seater buggy on a meadow with quads and a group beside it, clouds over the mountains behind" },
    confirmed: true,
    product: "buggy6",
  }),
];

export type GalleryGroupId = "quady" | "buggy" | "skutery";
export type GalleryGroup = { id: GalleryGroupId; items: MediaItem[] };

/** Grupy podstrony /galeria/ w kolejności starej galerii; tylko potwierdzone, puste grupy wypadają. Skutery cały rok (to galeria, nie cennik). */
export function galleryPageGroups(): GalleryGroup[] {
  const byId = (id: string) => media.gallery.find((m) => m.id === id);
  const [thumbsUp, meadowRow, ridgeRoad, stream, zakopanePanorama, ridePeaks, fieldLine, groupRain] = galleryPageQuady;
  const [cockpit, threeBuggies, twoMuddy, sixSeaterWide] = galleryPageBuggy;
  const groups: { id: GalleryGroupId; items: (MediaItem | undefined)[] }[] = [
    {
      id: "quady",
      items: [byId("gallery-group-peaks"), thumbsUp, meadowRow, ridgeRoad, stream, zakopanePanorama, ridePeaks, byId("gallery-two-quads-autumn"), media.cards.quady, fieldLine, byId("gallery-fleet-snowy-peaks"), groupRain],
    },
    {
      id: "buggy",
      items: [cockpit, byId("gallery-buggy-panorama"), threeBuggies, twoMuddy, sixSeaterWide, media.cards.buggy6, byId("gallery-buggies-storm-peaks"), byId("card-maverick-dusk")],
    },
    { id: "skutery", items: [...media.galleryWinter] },
  ];
  return groups
    .map(({ id, items }) => ({ id, items: items.filter((m): m is MediaItem => Boolean(m && m.confirmed)) }))
    .filter((g) => g.items.length > 0);
}
