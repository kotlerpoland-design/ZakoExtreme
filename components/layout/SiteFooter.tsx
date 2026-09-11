import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";
import { Container } from "@/components/primitives/Container";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { DirectionsLink } from "@/components/contact/DirectionsLink";
import { Wordmark } from "./Wordmark";
import { SocialLinks } from "./SocialLinks";
import { navItems, resolveNavHref } from "./nav";

/**
 * NAP na każdej stronie (identyczny z wizytówką Google), telefon, profile social, menu główne.
 * Jedyna różnica wobec menu: „Vouchery" są tu przez CAŁY rok — to ich stałe wejście poza oknem XI–XII.
 * Lista stron na mobile jest zwinięta pod strzałką (decyzja 2026-09-10) — natywne <details>, rozwijane na stałe od md
 * przez `.footer-disclosure` w globals.css. Przełącznika PL/EN tu nie ma: zostaje w headerze i w menu mobilnym.
 */
export async function SiteFooter() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const items = navItems({ vouchers: true });
  return (
    <footer className="bg-muted text-foreground">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8 lg:py-20">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-ink-2">{t("common.proofLine")}</p>
          <p className="mt-2 font-display text-sm font-medium tabular">{t("common.proof")}</p>
        </div>

        <div>
          <h2 className="font-display text-eyebrow font-medium uppercase text-muted-foreground">{t("footer.contactTitle")}</h2>
          <address className="mt-3 not-italic">
            <PhoneLink location="footer" variant="text" className="text-brand">
              {site.phone.displayIntl}
            </PhoneLink>
            <p className="mt-2 text-sm text-ink-2">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
            <DirectionsLink className="mt-2 inline-block text-sm text-foreground underline underline-offset-4">{t("contactClose.openMap")}</DirectionsLink>
          </address>
          {/* poza <address>: profile social to nie dane kontaktowe firmy */}
          <SocialLinks className="mt-3" />
        </div>

        <details className="footer-disclosure group">
          <summary className="flex cursor-pointer list-none items-center gap-3 border-y border-border/70 py-3 outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-[3px] focus-visible:ring-ring md:cursor-default md:border-0 md:py-0">
            <ArrowDown className="size-4 shrink-0 text-brand transition-transform duration-200 group-open:rotate-180 md:hidden" aria-hidden />
            <h2 className="font-display text-eyebrow font-medium uppercase text-muted-foreground">{t("footer.navTitle")}</h2>
          </summary>
          <ul className="mt-3 space-y-2 pb-2 md:pb-0">
            {items.map((item) => (
              <li key={`${item.key}#${item.anchor ?? ""}`}>
                <Link href={resolveNavHref(item, locale)} prefetch={false} className="text-sm text-ink-2 transition-colors hover:text-foreground">
                  {t(`nav.${item.labelKey}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link href={localizedPath("/polityka-prywatnosci", locale)} prefetch={false} className="text-sm text-ink-2 transition-colors hover:text-foreground">
                {t("footer.privacy")}
              </Link>
            </li>
          </ul>
        </details>
      </Container>
      <div className="border-t border-border/70">
        <Container className="flex flex-wrap items-center justify-between gap-2 py-4 text-xs text-muted-foreground">
          <span>
            {site.name} · {site.address.street}, {site.address.postalCode} {site.address.city}
          </span>
          <span>{site.phone.displayIntl}</span>
        </Container>
      </div>
    </footer>
  );
}
