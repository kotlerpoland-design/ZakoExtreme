import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { confirmedMedia, galleryPageGroups, media } from "@/content/media";
import { pageAlternates } from "@/lib/seo";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/trust/TrustBar";
import { Section } from "@/components/primitives/Section";
import { LightboxGallery } from "@/components/media/LightboxGallery";
import { BookingSection } from "@/components/booking/BookingSection";
import { bookingLabels } from "@/components/booking/bookingLabels";
import { ContactClose } from "@/components/contact/ContactClose";
import { StickyCallBar } from "@/components/layout/StickyCallBar";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "galleryPage.meta" });
  return { title: t("title"), description: t("description"), ...pageAlternates("/galeria", locale) };
}

/**
 * Podstrona galerii (decyzja 2026-09-10; wcześniej kotwica /#galeria). Przejmuje indeksowany adres starej strony
 * zakoextreme.pl/galeria/. Trzy grupy (quady · buggy · skutery) z content/media.ts#galleryPageGroups — skutery cały rok,
 * bo to galeria, nie cennik. Zero faktów poza zdjęciami: H1, jedno zdanie, siatki, rezerwacja, kontakt.
 * Klik w zdjęcie → lightbox (`LightboxGallery` → YARL, chunk po pierwszym kliknięciu); `id` sekcji = kotwice z zajawek (/galeria/#buggy).
 */
export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();
  const groups = galleryPageGroups();

  return (
    <TrackingProvider ctx={{ page_type: "gallery", product: "mixed", language: locale }}>
      <main className="flex-1">
        <Hero
          variant="qualifier"
          locale={locale}
          h1={t("galleryPage.h1")}
          lead={t("galleryPage.lead")}
          priceFrom={null}
          media={confirmedMedia(media.hero.galeria)}
          eyebrow={t("hero.eyebrowHome")}
          numbered={false}
        />
        <TrustBar />

        {groups.map((g, i) => (
          <Section key={g.id} id={g.id} title={t(`galleryPage.groups.${g.id}`)} tone={i % 2 === 0 ? "fog" : "paper"}>
            <LightboxGallery items={g.items} locale={locale} />
          </Section>
        ))}

        {/* bez numerów sekcji na tej podstronie (decyzja 2026-09-10) */}
        <BookingSection labels={await bookingLabels(t("galleryPage.sections.booking"))} />

        <Section title={t("home.sections.contact")} tone="fog">
          <ContactClose />
        </Section>
      </main>
      <StickyCallBar labels={{ book: t("common.bookOnline") }} />
    </TrackingProvider>
  );
}
