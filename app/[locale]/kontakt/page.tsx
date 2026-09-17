import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageAlternates } from "@/lib/seo";
import { TrackingProvider } from "@/components/tracking/TrackingContext";
import { Section } from "@/components/primitives/Section";
import { TrustBar } from "@/components/trust/TrustBar";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactPageView } from "@/components/contact/ContactPageView";
import { DirectionsTable } from "@/components/content/DirectionsTable";
import { BookingSection } from "@/components/booking/BookingSection";
import { bookingLabels } from "@/components/booking/bookingLabels";
import { StickyCallBar } from "@/components/layout/StickyCallBar";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "contactPage.meta" });
  return { title: t("title"), description: t("description"), ...pageAlternates("/kontakt", locale) };
}

/**
 * Szablon T6 (docs/ARCHITEKTURA-INFORMACJI.md §276) — punkt domknięcia, 2 742 konwersje rocznie (03-COPY §4.11).
 * Kolejność świadomie odchodzi od T6 (decyzja 2026-09-10): rezerwacja idzie PRZED dojazdem, jak na starej stronie.
 * Sekcji „Godziny i sezon" nie ma wcale — godzin nie podajemy, a co dziś jeździ, widać w kalendarzu rezerwacji.
 * Dzięki temu nic na stronie nie zależy od sezonu: strona jest w pełni statyczna, o co T6 prosi wprost
 * („ma być najszybsza w serwisie"), a mapa Google wypada poza próg leniwego montowania i nie ładuje się na starcie.
 * „Gdzie nas znajdziesz" łączy mapę i tabelę dojazdu, bo DirectionsTable ma już w sobie MapEmbed — rozdzielenie
 * zdublowałoby mapę. Bez numerów sekcji, jak /galeria/ (decyzja 2026-09-10).
 * Bez ContactClose na dole: powielałby gigantyczny telefon z ekranu 1.
 * Bez formularza, bez e-maila i bez godzin otwarcia — żadnego z tych faktów nie ma w 01-BRIEF-I-FAKTY.md.
 * Schema: nic nowego. LocalBusiness (NAP + geo + telephone) renderuje się globalnie w [locale]/layout.tsx,
 * a 04-SEO §3 ma zamkniętą listę czterech typów — ContactPage na niej nie ma.
 */
export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();

  return (
    <TrackingProvider ctx={{ page_type: "contact", product: "mixed", language: locale }}>
      <ContactPageView language={locale} />
      <main className="flex-1">
        <ContactHero />
        <TrustBar />

        <BookingSection labels={await bookingLabels(t("contactPage.sections.booking"))} />

        <Section title={t("contactPage.sections.where")} tone="fog">
          <DirectionsTable locale={locale} />
        </Section>
      </main>
      <StickyCallBar labels={{ book: t("common.bookOnline") }} />
    </TrackingProvider>
  );
}
