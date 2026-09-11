import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { priceFrom } from "@/content/prices";
import { faqSets } from "@/content/faq";
import { confirmedMedia, media } from "@/content/media";
import { pageAlternates } from "@/lib/seo";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/trust/TrustBar";
import { Section } from "@/components/primitives/Section";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { VoucherCards, VOUCHER_ORDER_ANCHOR } from "@/components/offer/VoucherCards";
import { VoucherHowTo } from "@/components/content/VoucherHowTo";
import { Occasions } from "@/components/content/Occasions";
import { BookingSection } from "@/components/booking/BookingSection";
import { bookingLabels } from "@/components/booking/bookingLabels";
import { FAQ } from "@/components/content/FAQ";
import { ContactClose } from "@/components/contact/ContactClose";
import { StickyCallBar } from "@/components/layout/StickyCallBar";

type Props = { params: Promise<{ locale: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "vouchers.meta" });
  return { title: t("title"), description: t("description"), ...pageAlternates("/vouchery", locale) };
}

/**
 * /vouchery/ — prezent, nie rezerwacja. Treść przeniesiona ze starej strony WordPress, z poprawką jej czterech błędów:
 * literówka w H1, kwoty 300/600/900 zbudowane wokół błędnej ceny wejściowej, przycisk „Kup Voucher" obiecujący
 * nieistniejący e-commerce oraz mapa z błędnymi współrzędnymi (ContactClose bierze poprawne z config/site.ts).
 *
 * CTA: vouchera nie da się kupić przez SlotWise, więc ekran 1 prowadzi do telefonu („Zamów voucher", kontur) —
 * jedyny pomarańczowy przycisk na tej stronie zostaje w sekcji rezerwacji (06), gdzie realnie rezerwuje przejazd.
 *
 * Schema: BEZ Product/Offer. Warianty 250/450/650 są już wystawione na /quady-zakopane/; powielenie ich pod drugim
 * adresem byłoby duplikatem oferty. Zostają LocalBusiness (layout) i FAQPage (komponent FAQ).
 */
export default async function VouchersPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();
  const price = priceFrom("quady");

  return (
    <TrackingProvider ctx={{ page_type: "vouchers", product: "mixed", language: locale }}>
      <main className="flex-1">
        <Hero
          variant="qualifier"
          locale={locale}
          h1={t("vouchers.h1")}
          lead={t("vouchers.lead")}
          priceFrom={price}
          media={confirmedMedia(media.hero.vouchery)}
          eyebrow={t("vouchers.eyebrow")}
          cta={
            <PhoneLink location="voucher" variant="outline" className="sm:whitespace-nowrap">
              {t("vouchers.orderCta")}
            </PhoneLink>
          }
        />
        <TrustBar />

        <Section title={t("vouchers.sections.variants")} intro={t("vouchers.sections.variantsIntro")} marginLabel="Zakopane · Tatry" tone="fog">
          <VoucherCards locale={locale} />
        </Section>

        <Section id={VOUCHER_ORDER_ANCHOR} title={t("vouchers.sections.howTo")} tone="paper">
          <VoucherHowTo locale={locale} media={confirmedMedia(media.sections.voucher)} />
        </Section>

        <Section title={t("vouchers.sections.occasions")} tone="fog">
          <Occasions />
        </Section>

        <BookingSection labels={await bookingLabels(t("vouchers.sections.booking"))} />

        <Section title={t("vouchers.sections.faq")} tone="fog">
          <FAQ ids={faqSets.vouchery} locale={locale} />
        </Section>

        <Section title={t("home.sections.contact")} tone="paper">
          <ContactClose />
        </Section>
      </main>
      <StickyCallBar labels={{ book: t("common.bookOnline") }} />
    </TrackingProvider>
  );
}
