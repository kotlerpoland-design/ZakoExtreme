import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { DisplayHeading } from "@/components/primitives/DisplayHeading";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { BookCta } from "@/components/primitives/BookCta";
import { InkMountain } from "@/components/graphics/InkMountain";
import { DirectionsLink } from "./DirectionsLink";
import { CopyPhoneButton } from "./CopyPhoneButton";

/**
 * Ekran 1 strony /kontakt/ — karta kontaktu zamiast hero ze zdjęciem (decyzja 2026-09-10). Szablon T6 chce telefonu
 * najwyżej jak się da i najszybszej strony w serwisie, więc nie ma tu zdjęcia hero: zostaje sam rysunek gór w tle.
 * Telefon jest TREŚCIĄ tej strony, nie CTA — dlatego wolno mu tu być mimo zakazu z 2026-09-09/10 („telefon znika z hero
 * i z każdego przycisku"); jedynym przyciskiem jest pomarańczowy `BookCta` do #rezerwacja.
 * `data-contact-hero`, nie `data-hero` — test tests/first-screen.spec.ts pilnuje, że `[data-hero]` nie zawiera `tel:`.
 * `data-hero-sentinel` jest obowiązkowy: bez niego StickyCallBar nigdy się nie pokaże.
 */
export async function ContactHero() {
  const t = await getTranslations();
  return (
    <section data-contact-hero className="relative isolate overflow-hidden bg-background">
      <InkMountain className="left-[-14%] top-[40px] w-[86%] max-w-[440px] sm:top-[60px] sm:w-[60%] lg:left-[-4%] lg:top-[-10%] lg:w-[64%] lg:max-w-none" />

      <Container className="relative z-10 pt-6 pb-10 lg:pt-14 lg:pb-16">
        <Eyebrow>{t("hero.eyebrowProduct")}</Eyebrow>
        {/* size="md": H1 zostaje tytułem, dominantą ekranu jest numer pod nim */}
        <DisplayHeading text={t("contactPage.h1")} as="h1" size="md" className="mt-2" />

        <div className="mt-6 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-12">
          <div>
            <PhoneLink location="contact" variant="giant" ariaLabel={t("common.call", { phone: site.phone.displayIntl })}>
              {site.phone.display}
            </PhoneLink>
            <CopyPhoneButton
              label={t("contactPage.copyPhone")}
              copiedLabel={t("contactPage.copied")}
              className="mt-5 hidden md:inline-flex"
            />
          </div>

          <address className="mt-8 not-italic lg:mt-0">
            <p className="font-display text-eyebrow font-medium uppercase text-muted-foreground">{t("contactClose.address")}</p>
            <p className="mt-2 font-display text-2xl font-medium text-foreground">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </p>
            <DirectionsLink className="mt-4 inline-flex min-h-11 items-center gap-2 font-display text-base font-medium uppercase tracking-wide text-foreground underline-offset-4 hover:underline">
              <MapPin className="size-5 text-brand" aria-hidden />
              {t("contactClose.openMap")}
            </DirectionsLink>
          </address>
        </div>

        <div className="mt-8 lg:mt-10">
          <BookCta location="hero" variant="primary" className="sm:whitespace-nowrap">
            {t("common.bookOnline")}
          </BookCta>
        </div>
        {/* sentinel: gdy CTA zniknie z viewportu, pojawia się sticky bar */}
        <div data-hero-sentinel aria-hidden className="h-px w-px" />

        <p className="mt-5 font-display text-sm font-medium uppercase tracking-wide text-muted-foreground">{t("common.nearCenter")}</p>
        <p className="mt-3 max-w-[52ch] text-base leading-normal text-ink-2 lg:text-lg lg:leading-relaxed">{t("contactPage.lead")}</p>
      </Container>
    </section>
  );
}
