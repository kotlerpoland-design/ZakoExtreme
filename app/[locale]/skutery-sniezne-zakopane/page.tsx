import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";
import { getSeason, isProductAvailable } from "@/config/season";
import { priceFrom } from "@/content/prices";
import { faqSets } from "@/content/faq";
import { confirmedMedia, media } from "@/content/media";
import { absoluteUrl, pageAlternates } from "@/lib/seo";
import { productOffersSchema } from "@/lib/schema";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/trust/TrustBar";
import { PlacesLine } from "@/components/trust/PlacesLine";
import { Section } from "@/components/primitives/Section";
import { PricingCards } from "@/components/offer/PricingCards";
import { BookingSection } from "@/components/booking/BookingSection";
import { bookingLabels } from "@/components/booking/bookingLabels";
import { Gallery } from "@/components/media/Gallery";
import { ForWhom } from "@/components/content/ForWhom";
import { Steps } from "@/components/content/Steps";
import { DirectionsTable } from "@/components/content/DirectionsTable";
import { FAQ } from "@/components/content/FAQ";
import { Reviews, hasReviews } from "@/components/content/Reviews";
import { ContactClose } from "@/components/contact/ContactClose";
import { StickyCallBar } from "@/components/layout/StickyCallBar";

type Props = { params: Promise<{ locale: string }> };

/** Sezon liczy się w build time (SSG) — odświeżamy co godzinę, żeby strona sama przełączyła stan. */
export const revalidate = 3600;

/**
 * `alternateName` w schema Product — jedyne miejsce, gdzie obsługujemy wariant frazy bez diakrytyki
 * (`skutery sniezne zakopane`, 682 kliki rocznie; docs/pakiet/04-SEO-GEO-SCHEMA.md §3.2). Nie w treści, nie w H1.
 */
const ALTERNATE_NAMES = {
  pl: ["skutery sniezne zakopane", "skuter śnieżny Zakopane", "wypożyczalnia skuterów śnieżnych Zakopane"],
  en: ["snowmobile zakopane", "zakopane snowmobile rental"],
} as const;

/** Meta zależy od sezonu (poza XI–II opis zaczyna się od startu sezonu), więc generateMetadata(), nie statyczny obiekt. */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "skutery.meta" });
  const inSeason = isProductAvailable("skutery", getSeason());
  return {
    title: inSeason ? t("title") : t("titleOffSeason"),
    description: inSeason ? t("description") : t("descriptionOffSeason"),
    ...pageAlternates("/skutery-sniezne-zakopane", locale),
  };
}

/**
 * T1 — strona produktowa skuterów śnieżnych (docs/strony/SKUTERY-SNIEZNE.md). Najlepiej konwertujący produkt w koncie.
 * Kolejność sekcji wynika z wolumenu intencji, nie z szablonu: cennik zaraz pod hero (klaster cenowy nr 1), pasek miejscowości
 * pod paskiem zaufania i tabela dojazdu przed „Dla kogo" (klaster lokalny 728 klików).
 * Dwa stany (config/season.ts): w sezonie SlotWise; poza sezonem lead hero z linkiem do oferty letniej i sekcja rezerwacji
 * bez pustego kalendarza. Strona istnieje cały rok i nigdy nie jest przekierowywana — pracuje na SEO także latem.
 * Galeria zimowa cały rok (pokazujemy, co będzie); kafle i „Zobacz galerię" → /galeria/#skutery.
 */
export default async function SnowmobilesPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const season = getSeason();
  const inSeason = isProductAvailable("skutery", season);
  const t = await getTranslations();
  const price = priceFrom("skutery");
  const heroMedia = confirmedMedia(media.hero.skutery);
  const gallery = media.galleryWinter.filter((m) => m.confirmed).slice(0, 5);
  const reviews = hasReviews();
  const summerHref = localizedPath("/quady-zakopane", locale);
  const offers = productOffersSchema("skutery", locale, season, t("products.names.skutery"), absoluteUrl("/skutery-sniezne-zakopane", locale), {
    alternateName: ALTERNATE_NAMES[locale],
  });

  /* poza sezonem lead niesie link do oferty letniej (03-COPY §4.3); link renderowany z serwera, bez next-intl w kliencie */
  const lead = inSeason
    ? t("skutery.lead")
    : t.rich("skutery.leadOffSeason", {
        link: (chunks) => (
          <Link href={summerHref} className="font-medium text-foreground underline underline-offset-4 hover:text-brand">
            {chunks}
          </Link>
        ),
      });

  return (
    <TrackingProvider ctx={{ page_type: "product", product: "skutery", language: locale }}>
      {offers ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} /> : null}
      <main className="flex-1">
        <Hero variant="product" locale={locale} h1={t("skutery.h1")} lead={lead} priceFrom={price} media={heroMedia} eyebrow={t("hero.eyebrowProduct")} />
        <TrustBar />
        <PlacesLine text={t("skutery.placesLine")} linkLabel={t("skutery.placesLink")} href="#dojazd" />

        {/* isolate: grzbiet góry w PricingCards leży na -z-10 za nagłówkiem, ale nad tłem sekcji; overflow-hidden: linia trasy wystaje poza pudełko */}
        <Section title={t("skutery.sections.pricing")} marginLabel="Zakopane · Tatry" tone="fog" className="isolate overflow-hidden">
          <PricingCards ladder="skutery" locale={locale} />
        </Section>

        <BookingSection
          labels={await bookingLabels(t("skutery.sections.booking"))}
          offSeason={
            inSeason
              ? undefined
              : { lead: t("skutery.booking.offSeasonLead"), notice: t("products.snowNotice"), summerHref, summerLabel: t("skutery.booking.summerOffer") }
          }
        />

        <Section title={t("skutery.sections.gallery")} tone="fog">
          <Gallery items={gallery} locale={locale} more={{ href: "/galeria", hash: "skutery", label: t("gallery.seeAll") }} />
        </Section>

        {/* id="dojazd": cel kotwicy z paska miejscowości pod paskiem zaufania */}
        <Section id="dojazd" title={t("skutery.sections.directions")} tone="paper" className="scroll-mt-header">
          <DirectionsTable locale={locale} />
        </Section>

        <Section title={t("skutery.sections.forWhom")} tone="fog">
          {/* zimą buggy 6-os. nie jeździ — kafel „Rodziny" bez linku */}
          <ForWhom familiesLink={false} />
        </Section>

        {/* intencja „wypożyczalnia skuterów śnieżnych" (493 kliki): H2 z frazą + trzy kroki wyprawy; „co zabrać" zostaje niepotwierdzone */}
        <Section title={t("skutery.sections.howItWorks")} intro={t("skutery.howItWorksIntro")} tone="paper">
          <Steps locale={locale} media={confirmedMedia(media.sections.steps.skutery)} />
        </Section>

        <Section title={t("skutery.sections.faq")} tone="fog">
          <FAQ ids={faqSets.skutery} locale={locale} />
        </Section>

        {reviews ? (
          <Section title={t("skutery.sections.reviews")} tone="paper">
            <Reviews limit={3} />
          </Section>
        ) : null}

        <Section title={t("home.sections.contact")} tone="fog">
          <ContactClose />
        </Section>
      </main>
      <StickyCallBar labels={{ book: t("common.bookOnline") }} />
    </TrackingProvider>
  );
}
