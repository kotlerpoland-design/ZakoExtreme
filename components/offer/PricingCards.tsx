import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ProductId } from "@/config/season";
import { durationParts, prices, tierLabel } from "@/content/prices";
import { priceIncludesFor } from "@/content/included";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { RidgeRoute } from "@/components/graphics/RidgeRoute";
import { PriceFrom } from "@/components/primitives/PriceFrom";
import { Reveal } from "@/components/primitives/Reveal";
import { PricingTrack } from "./PricingTrack";
import { SelectItemLink } from "./SelectItemLink";

type Props = {
  ladder: ProductId;
  locale: Locale;
  highlightTier?: string;
  /** route = markery na grzbiecie góry (T1); stack = zwykła siatka (T4) */
  layout?: "route" | "stack";
  /** `false` = bez bloku „W cenie" pod kartami — strona buggy ma trzy drabinki pod sobą i listę pokazuje raz, pod pierwszą */
  included?: boolean;
};

/** id karty wariantu — cel kotwicy z markera na grzbiecie (`RidgeRoute`). Prefiks trzyma je z dala od hashy sekcji strony buggy. */
export const pricingCardAnchor = (variantId: string) => `wariant-${variantId}`;

/**
 * Karty cenowe jak bilety: trzy warianty obok siebie (na mobile pod sobą), PREMIUM wyróżniony,
 * duża cena „od", czas obok, jeden przycisk. Jedno źródło cen: content/prices.ts.
 * Niepotwierdzona drabinka → null (nic się nie renderuje).
 *
 * `layout="route"` (T1): nad kartami ten sam grzbiet co w „Wybierz swoją wyprawę" na stronie głównej —
 * zdjęcie szczytów, kropkowana trasa po skyline, marker na każdym wariancie. Markery idą lewo→prawo
 * w kolejności kart, a że główny szczyt jest środkowy, na jego wierzchołku ląduje wariant wyróżniony
 * (PREMIUM). Marker to kotwica do karty (`#wariant-<id>`) — scroll i fokus robi natywna nawigacja
 * fragmentowa, zero JS. Sekcja-rodzic musi mieć `isolate` (obraz i linia leżą na -z-10 za nagłówkiem)
 * i `overflow-hidden` (linia wychodzi poza kadr). Karty wjeżdżają ujemnym marginesem na ciemny las
 * u dołu zdjęcia, nigdy na śnieg.
 */
export async function PricingCards({ ladder, locale, highlightTier = "PREMIUM", layout = "route", included: showIncluded = true }: Props) {
  const data = prices[ladder];
  if (!data.confirmed || data.variants.length === 0) return null;
  const t = await getTranslations();
  const included = priceIncludesFor(ladder);
  /* „1 h" / „30 min" — skutery mają wariant krótszy niż godzina, więc czas nie może być samym dzieleniem przez 60 */
  const duration = (durationMin: number) => {
    const d = durationParts(durationMin);
    return d.key === "hours" ? t("common.hours", { hours: d.value }) : t("common.minutes", { minutes: d.value });
  };

  /* wyróżnienie po stałej nazwie wariantu (STANDARD/PREMIUM/ULTRA); drabinka z etykietami lokalizowanymi (buggy 6-os.)
     nie ma PREMIUM, więc nic nie jest wyróżnione i karuzela zostaje na pierwszej karcie */
  const isHighlighted = (v: (typeof data.variants)[number]) => tierLabel(v, "pl") === highlightTier;
  const markers = data.variants.map((v) => {
    const time = duration(v.durationMin);
    return {
      id: v.id,
      // mobile: przy kropce sam czas — cena zostaje duża na karcie i nie dubluje się na grzbiecie
      number: time,
      label: time,
      caption: tierLabel(v, locale),
      active: isHighlighted(v),
      href: `#${pricingCardAnchor(v.id)}`,
    };
  });

  const onRidge = layout === "route";
  // karuzela na mobile otwiera się na wariancie wyróżnionym, nie na pierwszym (PREMIUM leży w środku drabinki)
  const startIndex = data.variants.findIndex(isHighlighted);
  // desktop: 4 karty (buggy 6-os.: osoby × czas) w jednym rzędzie od lg, 2×2 na md; do trzech kart siatka jak dotąd
  const gridCols = data.variants.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";

  return (
    <div>
      {onRidge ? (
        /* niebo zdjęcia = kolor tła, więc grzbiet może wejść pod nagłówek sekcji bez widocznej krawędzi;
           -z-10 ma sam obraz i linia (w RidgeRoute), nie opakowanie — inaczej markery-linki nie łapią kliknięć */
        <div className="relative -mt-8 md:-mt-[12%]">
          <RidgeRoute markers={markers} />
        </div>
      ) : null}

      {/* Mobile: poziomy scroll ze snapem NA ŚRODEK (decyzja właścicielki 2026-09-10). -mx-5 znosi padding Container,
          żeby karuzela szła od krawędzi ekranu. Karta 72vw + padding 14vw po bokach = każda karta, łącznie z pierwszą
          i ostatnią, może stanąć dokładnie na środku, a sąsiedzi wystają po ~39 px (14vw − gap) z obu stron — przy
          ciemnej karcie na ciemnym tle węższy skrawek po prostu ginie, a to on niesie informację „przewija się
          w obie strony". Dlatego nie ma tu ani spacera `after:`, ani `scroll-ml` ze strony głównej.
          Szerokości w `vw`, nie w `%`: procent liczy się od content-boxa toru, który sam zależy od paddingu — równanie
          na wyśrodkowanie jest wtedy samozwrotne. py-2, bo overflow-x-auto przycina też w pionie, a karta w stanie
          `:target` ma ring-2. Od md: siatka jak dotąd. */}
      <PricingTrack
        startIndex={startIndex}
        className={cn(
          "-mx-5 flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto px-[14vw] py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 md:py-0",
          gridCols,
          // route: karty równane do dołu, bo wyróżniona jest uniesiona; stack: równa wysokość (CTA i tak trzyma mt-auto)
          onRidge ? "md:items-end" : "md:items-stretch",
          onRidge && "-mt-[8%] md:-mt-[17%]",
        )}
      >
        {data.variants.map((v, i) => {
          const highlighted = isHighlighted(v);
          return (
            /* li nie dostaje h-full: tor jest flexem, więc `align-items: stretch` rozciąga go sam, a wysokość
               propaguje w dół przez h-full na Reveal i article (idiom z VoucherCards) */
            <li key={v.id} className="w-[72vw] shrink-0 snap-center md:w-auto">
              <Reveal delay={i * 0.06} className="h-full">
                {/* cel kotwicy z markera na grzbiecie: `tabIndex={-1}` daje fokus po nawigacji fragmentowej
                    (poza kolejnością Tab), `:target` podświetla kartę bez JS, `scroll-mt-header` trzyma ją
                    pod sticky headerem — ten sam wzorzec co ProductCard na stronie głównej */}
                <article
                  id={pricingCardAnchor(v.id)}
                  tabIndex={-1}
                  className={cn(
                    "relative flex h-full flex-col rounded-lg bg-card p-6 shadow-card outline-none transition-shadow duration-300 ease-soft scroll-mt-header hover:shadow-lift",
                    "target:ring-2 target:ring-brand focus-visible:ring-2 focus-visible:ring-ring",
                    // krycie pełne, nie /60: karta leży na zdjęciu grzbietu, a przez półprzezroczysty tint prześwitywały drzewa
                    highlighted && "bg-brand-tint shadow-lift ring-1 ring-brand/80 md:-translate-y-3",
                  )}
                  aria-current={highlighted ? "true" : undefined}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand">{tierLabel(v, locale)}</h3>
                    <span className="font-display text-display-md font-semibold tabular text-foreground">{duration(v.durationMin)}</span>
                  </div>

                  <PriceFrom price={v.priceFrom} size="card" className="mt-4" />
                  {/* skutery: cena za pojazd i dopłata za drugą osobę wprost — mylenie tych trzech liczb to udokumentowane źródło opinii 1★
                      (docs/strony/SKUTERY-SNIEZNE.md §6); buggy/Maverick: „za buggy · do 2 osób" (cena za pojazd, decyzja 2026-09-11);
                      quady nie mają `unit` ani `secondRider`, więc nic tu nie renderują */}
                  {data.unit || v.secondRider ? (
                    <p className="mt-1.5 font-display text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      {data.unit ? <span>{data.unit[locale]}</span> : null}
                      {data.unit && v.secondRider ? <span aria-hidden> · </span> : null}
                      {v.secondRider ? <span className="text-ink-2 tabular">{t("pricing.secondRider", { price: v.secondRider })}</span> : null}
                    </p>
                  ) : null}

                  {v.description ? <p className="mt-4 text-sm leading-relaxed text-ink-2">{v.description[locale]}</p> : null}

                  <dl className="mt-5 space-y-2 border-t border-border/80 pt-4 text-sm text-ink-2">
                    {v.notes ? (
                      <div className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                        <dd>{v.notes[locale]}</dd>
                      </div>
                    ) : null}
                    <div className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <dd>{t("pricing.spec.instructor")}</dd>
                    </div>
                    <div className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                      <dd>{t("pricing.spec.noLicence")}</dd>
                    </div>
                  </dl>

                  {/* mt-auto: wolna przestrzeń idzie NAD przycisk, więc CTA wszystkich kart leżą na jednej linii mimo
                      różnej liczby cech (PREMIUM nie ma `notes`). pt-6 trzyma minimalny odstęp w najwyższej karcie,
                      gdzie mt-auto schodzi do zera — musi siedzieć na opakowaniu, bo na samym linku powiększyłby przycisk.
                      Ten sam idiom co w VoucherCards i przy bloku ceny w ProductCard. */}
                  <div className="mt-auto pt-6">
                    <SelectItemLink
                      kind="anchor"
                      itemId={v.id}
                      href="#rezerwacja"
                      location="pricing"
                      className={cn(
                        "inline-flex min-h-12 w-full items-center justify-center rounded-lg px-4 font-display text-base font-medium uppercase tracking-wide transition-colors",
                        highlighted ? "bg-foreground text-background hover:bg-ink-2" : "border-2 border-foreground text-foreground hover:bg-foreground hover:text-background",
                      )}
                    >
                      {t("common.bookThisOption")}
                    </SelectItemLink>
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </PricingTrack>

      {/* „W cenie" raz pod kartami, nie cztery pozycje w każdej z trzech. Jedno źródło: content/included.ts (lista per produkt). */}
      {showIncluded ? (
        <section className="mt-8 rounded-lg border border-border/80 bg-card/60 p-5 md:mt-10 md:flex md:items-baseline md:gap-6 md:p-6">
          <h3 className="font-display text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand md:shrink-0">
            {t("pricing.included")}
          </h3>
          <ul className="mt-3 grid gap-2 text-sm text-ink-2 sm:grid-cols-2 md:mt-0 md:flex md:flex-wrap md:gap-x-6 md:gap-y-2">
            {included.map((entry) => (
              <li key={entry.id} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
                <span>{entry.label[locale]}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
