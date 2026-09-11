import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";
import { getSeason } from "@/config/season";
import { faqSets } from "@/content/faq";
import { confirmedMedia, galleryFor, media } from "@/content/media";
import { pageAlternates } from "@/lib/seo";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Hero } from "@/components/hero/Hero";
import { heroProductPages } from "@/components/hero/heroProducts";
import { TrustBar } from "@/components/trust/TrustBar";
import { Section } from "@/components/primitives/Section";
import { ProductCards } from "@/components/offer/ProductCards";
import { BookingSection } from "@/components/booking/BookingSection";
import { bookingLabels } from "@/components/booking/bookingLabels";
import { Gallery } from "@/components/media/Gallery";
import { ForWhom } from "@/components/content/ForWhom";
import { WhyUs } from "@/components/content/WhyUs";
import { DirectionsTable } from "@/components/content/DirectionsTable";
import { FAQ } from "@/components/content/FAQ";
import { Reviews, hasReviews } from "@/components/content/Reviews";
import { ContactClose } from "@/components/contact/ContactClose";
import { StickyCallBar } from "@/components/layout/StickyCallBar";

type Props = { params: Promise<{ locale: string }> };

/** Sezon liczy się w build time (SSG) — odświeżamy co godzinę, żeby strona sama przełączyła stan. */
export const revalidate = 3600;

const HOME_META: Record<Locale, Record<ReturnType<typeof getSeason>, { title: string; description: string }>> = {
  pl: {
    summer: { title: "Quady i buggy Zakopane — od 250 zł", description: "Wyprawy quadami i buggy 4×4 nad Zakopanem. Bez prawa jazdy, z instruktorem, legalne trasy. Od 250 zł. Zadzwoń: 539 320 700. Wolne terminy na dziś." },
    winter: { title: "Skutery śnieżne Zakopane — wyprawy", description: "Wyprawy skuterami śnieżnymi w Tatrach z lokalnym instruktorem. Legalne trasy, blisko centrum Zakopanego. Zadzwoń: 539 320 700." },
    /* buggy od 500 zł za pojazd (potwierdzone 2026-09-11), quady od 250 — w stanie przejściowym buggy jest pierwsze, więc „od 250" obok niego wprowadzałoby w błąd */
    shoulder: { title: "Buggy 4×4 i quady Zakopane — wyprawy z instruktorem", description: "Buggy z napędem 4×4 i quady na widokowych trasach nad Zakopanem. Bez prawa jazdy, z instruktorem. Quady od 250 zł, buggy od 500 zł za pojazd. Zadzwoń: 539 320 700." },
  },
  en: {
    summer: { title: "Quad & Buggy Tours Zakopane — from 250 PLN", description: "Guided quad and buggy 4×4 tours in the Tatras. No driving licence required, local instructors, legal routes. From 250 PLN. Call +48 539 320 700." },
    winter: { title: "Snowmobile Tours Zakopane, Tatras", description: "Guided snowmobile trips in the mountains above Zakopane. Legal routes, local instructors, near the town center. Call +48 539 320 700." },
    shoulder: { title: "Buggy 4×4 & Quad Tours Zakopane — guided rides", description: "4×4 buggy and quad tours on scenic trails above Zakopane. No driving licence required, with an instructor. Quads from 250 PLN, buggies from 500 PLN per vehicle. Call +48 539 320 700." },
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
  const t = await getTranslations();
  const heroMedia = confirmedMedia(media.hero.home[season]);
  const gallery = galleryFor(season, 5);
  const reviews = hasReviews();
  const pillars = heroProductPages(season);
  const products = pillars.map((p, i) => ({ n: i + 1, label: t(`nav.${p.labelKey}`), href: localizedPath(p.key, locale), product: p.product }));
  // slajd na filar w kolejności listy; niepotwierdzone zdjęcie po prostu wypada z rotacji
  const slides = pillars.flatMap((p) => {
    const m = confirmedMedia(media.hero.slides[p.product]);
    return m ? [{ id: p.product, src: m.src, alt: m.alt[locale], position: m.position }] : [];
  });

  return (
    <TrackingProvider ctx={{ page_type: "home", product: "mixed", language: locale }}>
      <main className="flex-1">
        <Hero
          variant="home"
          locale={locale}
          h1={t(`home.${season}.h1`)}
          lead={t(`home.${season}.lead`)}
          /* decyzja właścicielki 2026-09-09: hero strony głównej bez ceny i bez ★ 4,8 — cena „od" na kartach ofert, proof w TrustBar */
          priceFrom={null}
          media={heroMedia}
          eyebrow={t("hero.eyebrowHome")}
          products={products}
          slides={slides}
        />
        <TrustBar />

        {/* isolate: grzbiet góry w ProductCards leży na -z-10 za nagłówkiem, ale nad tłem sekcji; overflow-hidden: linia trasy wystaje poza pudełko */}
        {/* numeracja: hero = 01 (nie drukuje numeru), pasek zaufania bez numeru, widoczna numeracja startuje od 02 (decyzja 2026-09-10) */}
        <Section n={2} title={t("home.sections.products")} marginLabel="Zakopane · Tatry" tone="fog" className="isolate overflow-hidden">
          <ProductCards season={season} locale={locale} />
        </Section>

        <BookingSection labels={await bookingLabels(t("home.sections.booking"))} sectionNumber={3} />

        {/* id="galeria": kotwica pomocnicza (stare linki /#galeria); menu i link pod siatką prowadzą na podstronę /galeria/ (2026-09-10) */}
        <Section id="galeria" n={4} title={t("home.sections.gallery")} tone="fog">
          <Gallery items={gallery} locale={locale} more={{ href: "/galeria", label: t("gallery.seeAll") }} />
        </Section>

        <Section n={5} title={t("home.sections.forWhom")} tone="paper">
          <ForWhom />
        </Section>

        <Section n={6} title={t("home.sections.whyUs")} tone="fog" marginLabel="ZakoExtreme">
          <WhyUs />
        </Section>

        <Section n={7} title={t("home.sections.directions")} tone="paper">
          <DirectionsTable locale={locale} />
        </Section>

        <Section n={8} title={t("home.sections.faq")} tone="fog">
          {/* zdjęcie po prawej tylko na lg+ (decyzja 2026-09-10), zatopione jak hero */}
          <FAQ ids={faqSets.home} locale={locale} media={confirmedMedia(media.sections.faq)} />
        </Section>

        {reviews ? (
          <Section n={9} title={t("home.sections.reviews")} tone="paper">
            <Reviews limit={3} />
          </Section>
        ) : null}

        <Section n={reviews ? 10 : 9} title={t("home.sections.contact")} tone="fog">
          <ContactClose />
        </Section>
      </main>
      <StickyCallBar labels={{ book: t("common.bookOnline") }} />
    </TrackingProvider>
  );
}
