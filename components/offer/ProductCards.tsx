import { getTranslations } from "next-intl/server";
import { PRODUCT_ORDER, type Season } from "@/config/season";
import { priceFrom } from "@/content/prices";
import { confirmedMedia, media } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { RidgeRoute } from "@/components/graphics/RidgeRoute";
import { Reveal } from "@/components/primitives/Reveal";
import { ProductCard, productCardAnchor } from "./ProductCard";
import { SeasonNotice } from "./SeasonNotice";

/**
 * „Wybierz swoją wyprawę": karty w kolejności sezonu pod grzbietem góry; linia trasy biegnie po skyline, markery siedzą
 * na szczytach (pierwsza oferta = lewy szczyt) i są linkami do kart (`#oferta-<id>`): natywna nawigacja fragmentowa
 * przewija stronę I poziomą karuzelę do karty i daje jej fokus — zero JS.
 * Desktop: marker = cena od + nazwa, karty w siatce. Mobile: marker = numer 01/02/03 (ten sam, co chip na karcie),
 * karty w poziomym scrollu ze snapem, kolejna karta wystaje z prawej (decyzja właścicielki 2026-09-10, wyjątek od
 * „zero karuzel" w CLAUDE.md: bez autoplay, bez JS). Jedna lista dla obu breakpointów — id kotwic muszą być unikalne.
 * Karty wjeżdżają ujemnym marginesem na ciemny las u dołu zdjęcia, nigdy na śnieg. Sekcja-rodzic musi mieć `isolate`
 * (obraz i linia grzbietu leżą na -z-10 za nagłówkiem sekcji, markery-linki nad nim) i `overflow-hidden`.
 */
export async function ProductCards({ season, locale }: { season: Season; locale: Locale }) {
  const t = await getTranslations();
  const ids = PRODUCT_ORDER[season];
  const items = ids.map((id) => ({ id, price: priceFrom(id), media: confirmedMedia(media.cards[id]) }));

  // bez ceny (skutery: „ustalamy telefonicznie") marker pokazuje samą nazwę, nie pustą kropkę
  const markers = items.map((it, i) => ({
    id: it.id,
    number: String(i + 1).padStart(2, "0"),
    label: it.price !== null ? t("common.priceFrom", { price: it.price }) : t(`products.names.${it.id}`),
    caption: it.price !== null ? t(`products.names.${it.id}`) : undefined,
    href: `#${productCardAnchor(it.id)}`,
  }));

  return (
    <div>
      {/* grzbiet: niebo zdjęcia = kolor tła, więc może wejść pod nagłówek sekcji (ujemny margines) bez widocznej krawędzi;
          -z-10 ma sam obraz i linia (w RidgeRoute), nie opakowanie — inaczej markery-linki nie dostają kliknięć */}
      <div className="relative -mt-8 md:-mt-[12%]">
        <RidgeRoute markers={markers} />
      </div>

      {/* mobile: -mx-5/px-5 = pełna szerokość względem paddingu Container; scroll-ml-5 + snap-start = karta po snapie
          w linii treści, następna wystaje ~16 %. Pasek przewijania ukryty jak w TrustBar. Pusty element `after:` na końcu
          daje ostatniej karcie miejsce, żeby też dosnapowała do linii treści (kotwica z ostatniego numeru).
          py-2: kontener overflow-x-auto przycina też w pionie — 8 px paddingu mieści ring-2 aktywnej karty (:target).
          scroll-smooth: poziomy scroll do karty z kotwicy jest płynny (pion załatwia `html` w globals.css). */}
      <ol
        className={`-mx-5 -mt-[8%] flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto px-5 py-2 [scrollbar-width:none] after:block after:w-[16%] after:shrink-0 after:content-[''] [&::-webkit-scrollbar]:hidden md:mx-0 md:-mt-[17%] md:grid md:gap-6 md:overflow-visible md:px-0 md:py-0 md:after:hidden ${
          items.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
        }`}
      >
        {items.map((it, i) => (
          <li key={it.id} className="w-[84%] shrink-0 snap-start scroll-ml-5 md:w-auto md:scroll-ml-0">
            <Reveal delay={i * 0.06} className="h-full">
              <ProductCard id={it.id} locale={locale} priceFrom={it.price} media={it.media} index={i} className="h-full" />
            </Reveal>
          </li>
        ))}
      </ol>

      {season === "shoulder" ? <SeasonNotice className="mt-8" /> : null}
    </div>
  );
}
