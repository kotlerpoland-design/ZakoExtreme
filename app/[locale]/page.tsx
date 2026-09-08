import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getSeason, PRODUCT_ORDER } from "@/config/season";
import { headlinePriceFrom } from "@/content/prices";
import { site } from "@/config/site";
import { pageAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const HOME_META: Record<Locale, Record<ReturnType<typeof getSeason>, { title: string; description: string }>> = {
  pl: {
    summer: { title: "Quady i buggy Zakopane — od 250 zł", description: "Wyprawy quadami i buggy 4×4 nad Zakopanem. Bez prawa jazdy, z instruktorem, legalne trasy. Od 250 zł. Zadzwoń: 539 320 700. Wolne terminy na dziś." },
    winter: { title: "Skutery śnieżne Zakopane — wyprawy", description: "Wyprawy skuterami śnieżnymi w Tatrach z lokalnym instruktorem. Legalne trasy, blisko centrum Zakopanego, czynne 24 h. Zadzwoń: 539 320 700." },
    shoulder: { title: "Buggy 4×4 i quady Zakopane — od 250 zł", description: "Buggy z napędem 4×4 i quady na widokowych trasach nad Zakopanem. Bez prawa jazdy, z instruktorem. Od 250 zł. Zadzwoń: 539 320 700." },
  },
  en: {
    summer: { title: "Quad & Buggy Tours Zakopane — from 250 PLN", description: "Guided quad and buggy 4×4 tours in the Tatras. No driving licence required, local instructors, legal routes. From 250 PLN. Call +48 539 320 700." },
    winter: { title: "Snowmobile Tours Zakopane, Tatras", description: "Guided snowmobile trips in the mountains above Zakopane. Legal routes, local instructors, near the town center. Open 24/7. Call +48 539 320 700." },
    shoulder: { title: "Buggy 4×4 & Quad Tours Zakopane — from 250 PLN", description: "4×4 buggy and quad tours on scenic trails above Zakopane. No driving licence required, with an instructor. From 250 PLN. Call +48 539 320 700." },
  },
};

/** Meta zależy od sezonu, więc generateMetadata(), nie statyczny obiekt. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const season = getSeason();
  return { ...HOME_META[locale][season], ...pageAlternates("/", locale) };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const season = getSeason();
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const price = headlinePriceFrom(season);

  /*
   * EKRAN 1 (390×844) — szkielet, bez projektu. Musi być tu: H1 z frazą, cena od, telefon, 4,8★, „blisko centrum".
   * Docelowy komponent: components/hero/Hero.tsx (variant="home"). Sekcje poniżej: docs/ARCHITEKTURA-INFORMACJI.md §3 T0.
   */
  return (
    <main className="flex-1 px-5 py-10 max-w-2xl mx-auto">
      <p className="text-xs uppercase tracking-widest text-muted mb-3">
        {site.name} · {season} · {PRODUCT_ORDER[season].join(" → ")}
      </p>
      <h1 className="font-display text-4xl font-semibold leading-tight text-balance">{t(`${season}.h1`)}</h1>
      <p className="mt-4 text-lg">{t(`${season}.lead`)}</p>
      {price !== null ? (
        <p className="mt-6 font-display text-5xl font-semibold tabular-nums">{tc("priceFrom", { price })}</p>
      ) : (
        // Cena niepotwierdzona (skutery) — nie zgadujemy. [[DO POTWIERDZENIA]] nie może trafić na produkcję.
        <p className="mt-6 text-warn">Cena do potwierdzenia — nie publikować tego stanu.</p>
      )}
      <p className="mt-2 text-muted">{tc("proof")}</p>
      <div className="mt-8 flex flex-col gap-3">
        <a
          href={`tel:${site.phone.e164}`}
          className="inline-flex justify-center rounded-md bg-accent px-6 py-4 font-display text-xl font-semibold text-accent-foreground"
        >
          {tc("call", { phone: site.phone.display })}
        </a>
        <a href="#rezerwacja" className="inline-flex justify-center rounded-md border border-foreground px-6 py-3 font-display text-lg">
          {tc("checkAvailability")}
        </a>
      </div>
      <p className="mt-4 text-sm text-muted">{tc("nearCenter")}</p>
      <section id="rezerwacja" className="mt-16 border-t border-line pt-8 text-muted text-sm">
        {/* BookingSection: chipy Dziś / Jutro / Inny termin + widżet SlotWise ładowany leniwie. */}
      </section>
    </main>
  );
}
