import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSeason } from "@/config/season";
import { priceFrom } from "@/content/prices";
import { faqSets } from "@/content/faq";
import { confirmedMedia, media } from "@/content/media";
import { absoluteUrl, pageAlternates } from "@/lib/seo";
import { productOffersSchema } from "@/lib/schema";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/trust/TrustBar";
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

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "quady.meta" });
  return { title: t("title"), description: t("description"), ...pageAlternates("/quady-zakopane", locale) };
}

/** T1 — strona produktowa quadów. Message match: „Quady … w Zakopanem" · od 250 zł · bez prawa jazdy · blisko centrum — wszystko na ekranie 1. */
export default async function QuadyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const season = getSeason();
  const t = await getTranslations();
  const price = priceFrom("quady");
  const heroMedia = confirmedMedia(media.hero.quady);
  const gallery = media.gallery.filter((m) => m.confirmed && m.product === "quady").slice(0, 5);
  const reviews = hasReviews();
  const offers = productOffersSchema("quady", locale, season, t("products.names.quady"), absoluteUrl("/quady-zakopane", locale));

  return (
    <TrackingProvider ctx={{ page_type: "product", product: "quady", language: locale }}>
      {offers ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} /> : null}
      <main className="flex-1">
        <Hero
          variant="product"
          locale={locale}
          h1={t("quady.h1")}
          lead={t("quady.lead")}
          priceFrom={price}
          media={heroMedia}
          eyebrow={t("hero.eyebrowProduct")}
        />
        <TrustBar />

        {/* isolate: grzbiet góry w PricingCards leży na -z-10 za nagłówkiem, ale nad tłem sekcji; overflow-hidden: linia trasy wystaje poza pudełko */}
        <Section title={t("quady.sections.pricing")} marginLabel="Zakopane · Tatry" tone="fog" className="isolate overflow-hidden">
          <PricingCards ladder="quady" locale={locale} />
        </Section>

        <BookingSection labels={await bookingLabels(t("quady.sections.booking"))} />

        <Section title={t("quady.sections.gallery")} tone="fog">
          <Gallery items={gallery} locale={locale} intro={t("quady.atv")} more={{ href: "/galeria", label: t("gallery.seeAll") }} />
        </Section>

        <Section title={t("quady.sections.forWhom")} tone="paper">
          <ForWhom />
        </Section>

        <Section title={t("quady.sections.steps")} tone="fog">
          <Steps locale={locale} media={confirmedMedia(media.sections.steps.quady)} />
        </Section>

        <Section title={t("quady.sections.directions")} tone="paper">
          <DirectionsTable locale={locale} />
        </Section>

        <Section title={t("quady.sections.faq")} tone="fog">
          <FAQ ids={faqSets.quady} locale={locale} />
        </Section>

        {reviews ? (
          <Section title={t("quady.sections.reviews")} tone="paper">
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
