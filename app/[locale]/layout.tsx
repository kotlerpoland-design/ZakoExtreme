import type { Metadata, Viewport } from "next";
import { Oswald, Atkinson_Hyperlegible } from "next/font/google";
import Script from "next/script";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/config/site";
import { localBusinessSchema } from "@/lib/schema";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ConsentBanner } from "@/components/layout/ConsentBanner";
import { RevealObserver } from "@/components/primitives/RevealObserver";
import "../globals.css";

/*
 * Fonty: dokładnie dwie rodziny, display: swap, tylko potrzebne wagi (budżet pierwszego ekranu < 310 kB).
 * Oswald 500/600 = display (nagłówki, ceny, CTA, etykiety). Atkinson Hyperlegible 400 = tekst (700 nieużywane — emfaza idzie przez Oswald).
 */
const oswald = Oswald({ subsets: ["latin", "latin-ext"], weight: ["500", "600"], variable: "--font-oswald", display: "swap" });
const body = Atkinson_Hyperlegible({ subsets: ["latin", "latin-ext"], weight: ["400"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
};

/* Pasek przeglądarki na mobile w kolorze tła (ciemny motyw, --background w globals.css). */
export const viewport: Viewport = { themeColor: "#101418" };

/**
 * Domyślne ISR dla WSZYSTKICH tras [locale]. Header i stopka żyją tutaj, a ich zawartość jest sezonowa
 * (`isVoucherMenuSeason`), więc trasa bez `revalidate` zamroziłaby menu na dacie builda.
 * Strony z własnym `revalidate` (home, quady) nadpisują tę wartość bez zmian.
 */
export const revalidate = 3600;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const gtmId = site.tracking.gtmId;

  /* Komponenty klienckie dostają gotowe stringi w propsach — do klienta NIE idą wiadomości ani parser next-intl. */
  const t = await getTranslations("consent");
  const consentLabels = { text: t("text"), accept: t("accept"), reject: t("reject"), region: t("region") };

  // data-scroll-behavior: przy nawigacji SPA Next tymczasowo wyłącza `scroll-behavior: smooth` z globals.css (nowa strona
  // zaczyna się od góry bez animacji), a płynne przewijanie zostaje dla kotwic (#rezerwacja, numery na grzbiecie)
  return (
    <html lang={locale} className={`${oswald.variable} ${body.variable} h-full`} data-scroll-behavior="smooth">
      <head>
        {/*
         * Consent Mode v2: domyślne zgody MUSZĄ załadować się PRZED kontenerem GTM.
         * To jedyny dozwolony skrypt beforeInteractive (docs/pakiet/05-TRACKING.md §4).
         */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',true);`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(locale)) }}
        />
        {/* Bez JS sekcje z animacją wejścia mają być widoczne od razu. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;translate:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {/* Bez NextIntlClientProvider: żaden komponent kliencki nie używa next-intl (stringi idą w propsach). */}
        <SiteHeader />
        {children}
        <SiteFooter />
        <ConsentBanner labels={consentLabels} />
        <RevealObserver />
      </body>
    </html>
  );
}
