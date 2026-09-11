import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSeason } from "@/config/season";
import { priceFrom } from "@/content/prices";
import { faqSets } from "@/content/faq";
import { confirmedMedia, galleryPageGroups, media } from "@/content/media";
import { absoluteUrl, pageAlternates } from "@/lib/seo";
import { productOffersSchema } from "@/lib/schema";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/trust/TrustBar";
import { PlacesLine } from "@/components/trust/PlacesLine";
import { Section } from "@/components/primitives/Section";
import { PricingCards } from "@/components/offer/PricingCards";
import { PricingSpotlight, SpotlightBackdrop } from "@/components/offer/PricingSpotlight";
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

/** Sezon liczy się w build time (SSG) — odświeżamy co godzinę, żeby lead i meta same przełączyły stan przejściowy. */
export const revalidate = 3600;

/** Hashe bloków cennika — cele linków z kart ofert na stronie głównej (components/offer/ProductCard.tsx, PRODUCT_PAGE). */
const BUGGY6_ANCHOR = "buggy-6-osobowe";
const MAVERICK_ANCHOR = "maverick-xrs";

/**
 * `alternateName` w schema Product — warianty pisowni frazy wiodącej (docs/strony/BUGGY.md §10):
 * „bugi" i „wynajem buggy" nie trafiają do treści ani H1, tylko tutaj.
 */
const ALTERNATE_NAMES = {
  pl: ["buggy zakopane", "bugi zakopane", "wynajem buggy Zakopane"],
  en: ["buggy zakopane", "buggy rental zakopane"],
} as const;

/** Sezon przejściowy (III–VI) ma własny opis: człowiek szukał skuterów, opis mówi mu wprost, że sezon się skończył (BUGGY.md §3, §10). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "buggy.meta" });
  const shoulder = getSeason() === "shoulder";
  return {
    title: t("title"),
    description: shoulder ? t("descriptionShoulder") : t("description"),
    ...pageAlternates("/buggy-zakopane", locale),
  };
}

/**
 * T1 — strona produktowa buggy (docs/strony/BUGGY.md). Największa grupa reklam w koncie (17/56) i strona ratunkowa
 * sezonu przejściowego: kto trafia tu w kwietniu, szukał skuterów — lead mówi mu to wprost, plus jedno zdanie o listopadzie.
 *
 * Trójproduktowa, nie trójwariantowa: cennik to trzy bloki pod sobą (buggy 2-os. na grzbiecie góry z listą „W cenie",
 * buggy 6-os. pod #buggy-6-osobowe, Maverick pod #maverick-xrs jako górna kotwica cenowa), nie trzy karty w rzędzie.
 * Buggy 6-os. ma zero popytu w wyszukiwarce, ale odpowiada na „co z dzieckiem" bez podawania wieku — dlatego widoczne
 * w cenniku, w kaflu „Rodziny" (kotwica do bloku) i w FAQ, a nie w H1 ani meta.
 * Tabela dojazdu przed „Dla kogo" (28 % ruchu lokalnego; bez podświetlania Białki — decyzja 2026-09-11). Telefon nie jest CTA (decyzja 2026-09-10).
 * Zajawka galerii = pierwsze pięć zdjęć grupy buggy podstrony /galeria/; kafle i „Zobacz galerię" → /galeria/#buggy.
 */
export default async function BuggyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const season = getSeason();
  const t = await getTranslations();
  const price = priceFrom("buggy");
  const heroMedia = confirmedMedia(media.hero.buggy);
  const maverickMedia = confirmedMedia(media.sections.maverick);
  const gallery = galleryPageGroups().find((g) => g.id === "buggy")?.items.slice(0, 5) ?? [];
  const reviews = hasReviews();
  const url = absoluteUrl("/buggy-zakopane", locale);
  /* trzy produkty = trzy węzły Product; 6-os. i Maverick z adresem bloku, żeby Google mógł je odróżnić */
  const offers = [
    productOffersSchema("buggy", locale, season, t("products.names.buggy"), url, { alternateName: ALTERNATE_NAMES[locale] }),
    productOffersSchema("buggy6", locale, season, t("products.names.buggy6"), `${url}#${BUGGY6_ANCHOR}`),
    productOffersSchema("maverick", locale, season, t("products.names.maverick"), `${url}#${MAVERICK_ANCHOR}`),
  ].filter((o) => o !== null);

  /* stan przejściowy: lead o końcu sezonu skuterowego + jedno zdanie o listopadzie; skuterów w ofercie nie pokazujemy (BUGGY.md §3) */
  const lead = season === "shoulder" ? `${t("buggy.leadShoulder")} ${t("products.snowNotice")}` : t("buggy.lead");

  return (
    <TrackingProvider ctx={{ page_type: "product", product: "buggy", language: locale }}>
      {offers.map((o, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(o) }} />
      ))}
      <main className="flex-1">
        <Hero variant="product" locale={locale} h1={t("buggy.h1")} lead={lead} priceFrom={price} media={heroMedia} eyebrow={t("hero.eyebrowProduct")} />
        <TrustBar />
        <PlacesLine text={t("buggy.placesLine")} linkLabel={t("buggy.placesLink")} href="#dojazd" />

        {/* blok A: buggy 2-os. na grzbiecie góry (isolate/overflow-hidden — patrz PricingCards), lista „W cenie" tylko tutaj */}
        <Section title={t("buggy.sections.pricing")} marginLabel="Zakopane · Tatry" tone="fog" className="isolate overflow-hidden">
          <PricingCards ladder="buggy" locale={locale} />
        </Section>

        {/* blok B: buggy 6-osobowe — inne tło, własny H2 i zdanie; cel kotwicy z karty oferty na stronie głównej i z kafla „Rodziny" */}
        <Section id={BUGGY6_ANCHOR} title={t("buggy.sections.buggy6")} intro={t("buggy.buggy6Intro")} tone="paper" className="scroll-mt-header">
          <PricingCards ladder="buggy6" locale={locale} layout="stack" included={false} />
        </Section>

        {/* blok C: Maverick — ostatni i najdroższy (górna kotwica cenowa, BUGGY.md §13); jedyny blok ze zdjęciem (decyzja 2026-09-11):
            mobile = tło bloku pod gradientem (Section backdrop), desktop = zdjęcie po prawej obok karty */}
        <Section
          id={MAVERICK_ANCHOR}
          title={t("buggy.sections.maverick")}
          tone="fog"
          className="scroll-mt-header overflow-hidden"
          backdrop={<SpotlightBackdrop media={maverickMedia} />}
        >
          <PricingSpotlight media={maverickMedia} locale={locale}>
            <PricingCards ladder="maverick" locale={locale} layout="stack" included={false} />
          </PricingSpotlight>
        </Section>

        <BookingSection labels={await bookingLabels(t("buggy.sections.booking"))} />

        <Section title={t("buggy.sections.gallery")} tone="paper">
          <Gallery items={gallery} locale={locale} more={{ href: "/galeria", hash: "buggy", label: t("gallery.seeAll") }} />
        </Section>

        {/* id="dojazd": cel kotwicy z paska miejscowości (BUGGY.md §8) */}
        <Section id="dojazd" title={t("buggy.sections.directions")} tone="fog" className="scroll-mt-header">
          <DirectionsTable locale={locale} />
        </Section>

        <Section title={t("buggy.sections.forWhom")} tone="paper">
          <ForWhom familiesAnchor={`#${BUGGY6_ANCHOR}`} />
        </Section>

        {/* intencja „wynajem buggy zakopane" (~200 wyśw.): H2 z frazą + trzy kroki wyprawy; zdjęcia kroków dla buggy nie ma — sama lista */}
        <Section title={t("buggy.sections.howItWorks")} intro={t("buggy.howItWorksIntro")} tone="fog">
          <Steps locale={locale} />
        </Section>

        <Section title={t("buggy.sections.faq")} tone="paper">
          <FAQ ids={faqSets.buggy} locale={locale} media={confirmedMedia(media.sections.faq)} />
        </Section>

        {reviews ? (
          <Section title={t("buggy.sections.reviews")} tone="fog">
            <Reviews limit={3} />
          </Section>
        ) : null}

        <Section title={t("home.sections.contact")} tone={reviews ? "paper" : "fog"}>
          <ContactClose />
        </Section>
      </main>
      <StickyCallBar labels={{ book: t("common.bookOnline") }} />
    </TrackingProvider>
  );
}
