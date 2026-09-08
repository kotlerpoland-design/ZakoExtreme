import type { Metadata } from "next";
import { Oswald, Atkinson_Hyperlegible } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/config/site";
import { localBusinessSchema } from "@/lib/schema";
import "../globals.css";

/*
 * Fonty: maksymalnie dwie rodziny, display: swap (docs/pakiet/04-SEO-GEO-SCHEMA.md §7).
 * Oswald = obecna twarz marki (nagłówki). Atkinson Hyperlegible = tekst. Do zmiany w design systemie.
 */
const oswald = Oswald({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-oswald", display: "swap" });
const body = Atkinson_Hyperlegible({ subsets: ["latin", "latin-ext"], weight: ["400", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
};

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

  return (
    <html lang={locale} className={`${oswald.variable} ${body.variable} h-full`}>
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
      </head>
      <body className="min-h-full flex flex-col">
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
