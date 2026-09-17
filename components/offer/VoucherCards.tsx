import { Check, Gift } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { prices, tierLabel } from "@/content/prices";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { PriceFrom } from "@/components/primitives/PriceFrom";
import { Reveal } from "@/components/primitives/Reveal";
import { SelectItemLink } from "./SelectItemLink";

type Props = { locale: Locale };

/** Kotwica sekcji „Jak zamówić" — karty prowadzą tam, a NIE do #rezerwacja (vouchera nie da się kupić przez rezerwację online). */
export const VOUCHER_ORDER_ANCHOR = "jak-zamowic";

/**
 * Warianty voucherów zamiast kwot. Stara strona sprzedawała „voucher 300 / 600 / 900 zł" — kwoty zbudowane wokół
 * błędnej ceny wejściowej 300 zł, przez co żadna nie odpowiadała realnemu wariantowi. Mapujemy voucher wprost na
 * obowiązującą drabinkę quadów (250 / 450 / 650): obdarowany od razu wie, CO dostaje, nie ile to kosztowało.
 * Czwarta karta to dowolna kwota — zamyka obiekcję „a jeśli 250 to za mało albo za dużo".
 *
 * Jedno źródło cen: content/prices.ts. Niepotwierdzona drabinka → null (nic się nie renderuje).
 */
export async function VoucherCards({ locale }: Props) {
  const data = prices.quady;
  if (!data.confirmed || data.variants.length === 0) return null;
  const t = await getTranslations();

  return (
    /* Mobile: ten sam poziomy scroll ze snapem co karty ofert na stronie głównej (ProductCards, decyzja 2026-09-10) —
       bez autoplay, bez JS. -mx-5/px-5 znosi padding Container, żeby karuzela szła od krawędzi ekranu, a karta po snapie
       i tak stawała w linii treści; w-[84%] sprawia, że kolejna karta wystaje (sygnał, że da się przewijać); after:
       daje ostatniej karcie miejsce na dosnapowanie. py-2, bo overflow-x-auto przycina też w pionie, a karta
       „dowolna kwota" ma ring-1 i shadow-lift. Od md: zwykła siatka. */
    <ol className="-mx-5 flex snap-x snap-mandatory scroll-smooth gap-4 overflow-x-auto px-5 py-2 [scrollbar-width:none] after:block after:w-[16%] after:shrink-0 after:content-[''] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:py-0 md:after:hidden lg:grid-cols-4">
      {data.variants.map((v, i) => {
        const hours = v.durationMin / 60;
        return (
          <li key={v.id} className="w-[84%] shrink-0 snap-start scroll-ml-5 md:w-auto md:scroll-ml-0">
            <Reveal delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-lg bg-card p-6 shadow-card transition-shadow duration-300 ease-soft hover:shadow-lift">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand">{tierLabel(v, locale)}</h3>
                  <span className="font-display text-display-md font-semibold tabular text-foreground">{t("common.hours", { hours })}</span>
                </div>

                <p className="mt-3 text-sm text-ink-2">{t("vouchers.cards.tripCaption", { tier: tierLabel(v, locale), hours })}</p>

                <PriceFrom price={v.priceFrom} size="card" className="mt-4" />

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
                    gdzie mt-auto schodzi do zera. Ten sam idiom co blok ceny w ProductCard. */}
                <div className="mt-auto pt-6">
                  {/* kind="page" celowo: to zwykła kotwica z `select_item`, bez `cta_click{book_online}` — voucher nie jest rezerwacją */}
                  <SelectItemLink
                    kind="page"
                    itemId={`voucher-${v.id}`}
                    href={`#${VOUCHER_ORDER_ANCHOR}`}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border-2 border-foreground px-4 font-display text-base font-medium uppercase tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    {t("vouchers.cards.order")}
                  </SelectItemLink>
                </div>
              </article>
            </Reveal>
          </li>
        );
      })}

      {/* dowolna kwota: nie jest PriceVariant (brak ceny i czasu), więc nie rozpycha typu w content/prices.ts */}
      <li className="w-[84%] shrink-0 snap-start scroll-ml-5 md:w-auto md:scroll-ml-0">
        <Reveal delay={data.variants.length * 0.06} className="h-full">
          <article
            className={cn(
              "flex h-full flex-col rounded-lg bg-brand-tint/60 p-6 shadow-lift ring-1 ring-brand/80",
              "transition-shadow duration-300 ease-soft",
            )}
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-eyebrow font-semibold uppercase tracking-[0.18em] text-brand">{t("vouchers.cards.anyAmount")}</h3>
              <Gift className="size-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
            </div>

            <p className="mt-3 text-sm text-ink-2">{t("vouchers.cards.anyAmountCaption")}</p>

            {/* bez mt-auto: dwa marginesy `auto` w jednej kolumnie dzieliłyby luz po równo i notka zawisłaby w środku karty */}
            <p className="mt-4 text-sm text-ink-2">{t("vouchers.cards.anyAmountNote")}</p>

            <div className="mt-auto pt-6">
              <SelectItemLink
                kind="page"
                itemId="voucher-dowolna-kwota"
                href={`#${VOUCHER_ORDER_ANCHOR}`}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-foreground px-4 font-display text-base font-medium uppercase tracking-wide text-background transition-colors hover:bg-ink-2"
              >
                {t("vouchers.cards.order")}
              </SelectItemLink>
            </div>
          </article>
        </Reveal>
      </li>
    </ol>
  );
}
