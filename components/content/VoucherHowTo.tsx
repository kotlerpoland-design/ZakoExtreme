import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { Reveal } from "@/components/primitives/Reveal";

type Props = {
  locale: Locale;
  /** wzór vouchera; rodzic podaje wynik `confirmedMedia()`, tu nie sprawdzamy flagi */
  media: MediaItem | null;
};

const STEPS = ["call", "amount", "date", "handover"] as const;

/* oryginał ma 729×344 px — kolumna nigdy nie przekracza tej szerokości, żeby next/image nie skalował w górę */
const SIZES = "(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 100vw";

/**
 * „Jak zamówić voucher" — najmocniejszy element starej strony, przeniesiony niemal 1:1.
 * Konkretny, uczciwy proces odpowiada na wszystkie obiekcje kupującego prezent w jednym bloku.
 *
 * Dwie świadome różnice wobec starej strony:
 * 1. Nie ma ścieżki e-mailowej — adresu firmy nie ma w config/site.ts, a nie wymyślamy danych kontaktowych.
 * 2. Krok „forma przekazania" jest neutralny. Stara strona pisała „drukowany / elektroniczny", ale to nie zostało
 *    potwierdzone — konkret czeka w content/faq.ts jako `voucher-forma` (answer: null, więc się nie renderuje).
 *
 * Telefon jest tu CTA, a nie tylko kontaktem: voucher zamawia się WYŁĄCZNIE telefonicznie (bramka B2 w 06-CHECKLISTA).
 */
export async function VoucherHowTo({ locale, media }: Props) {
  const t = await getTranslations();

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
      <div className="max-w-2xl">
        <ol className="space-y-6">
          {STEPS.map((key, i) => (
            <li key={key}>
              {/* kropka wyśrodkowana w pionie względem całej treści kroku — mobile i desktop tak samo */}
              <Reveal delay={i * 0.06} className="flex items-center gap-5">
                <span
                  aria-hidden
                  className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-brand bg-background font-display text-base font-semibold tabular text-brand"
                >
                  {i + 1}
                </span>
                <p className="text-base leading-normal text-ink-2 md:text-lg">{t(`vouchers.howTo.steps.${key}`)}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* „Kwota vouchera może być dowolna" — usuwa obiekcję „a jeśli 250 to za mało albo za dużo" */}
        <p className="mt-8 border-l-2 border-brand pl-5 font-display text-xl font-medium leading-snug text-foreground md:text-2xl">
          {t("vouchers.howTo.anyAmount")}
        </p>

        <div className="mt-8">
          <PhoneLink location="voucher" variant="outline">
            {t("vouchers.orderCta")}
          </PhoneLink>
        </div>
      </div>

      {/* Wzór vouchera w grafitowej oprawie: przy prezencie pokazanie realnego produktu podnosi konwersję.
          Grafika pochodzi ze starej oprawy graficznej — pokazujemy JĄ, nie własną kompozycję, bo to jest to, co klient dostanie. */}
      {media ? (
        <figure className="mt-12 lg:mt-0 lg:w-[38vw] lg:max-w-[456px]">
          <Reveal>
            <div className="overflow-hidden rounded-lg bg-muted p-3 shadow-card ring-1 ring-border/70">
              <Image
                src={media.src}
                alt={media.alt[locale]}
                sizes={SIZES}
                quality={62}
                className="h-auto w-full rounded-sm"
                placeholder="blur"
              />
            </div>
            <figcaption className="mt-3 font-display text-eyebrow font-medium uppercase tracking-[0.14em] text-muted-foreground">
              {t("vouchers.howTo.artworkCaption")}
            </figcaption>
          </Reveal>
        </figure>
      ) : null}
    </div>
  );
}
