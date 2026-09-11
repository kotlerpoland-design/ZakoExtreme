import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LocalizedLink } from "@/components/primitives/LocalizedLink";
import { directions } from "@/content/directions";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { MapEmbed } from "@/components/contact/MapEmbed";

type Props = { locale: Locale };

/**
 * Realna tabela dojazdu (579 fraz lokalnych bez własnych stron) + mapa Google z „Nawiguj" (MapEmbed).
 * Mobile: wstęp → mapa → tabela; desktop (lg+): tabela w lewej kolumnie, mapa w prawej — tylko w wierszu tabeli,
 * rozciągnięta do jej wysokości (self-stretch), żeby nie rozpychała wiersza ze wstępem.
 * Czasy z content/directions.ts; `minutes: null` = kolumna czasu w ogóle się nie renderuje — nie zgadujemy.
 * Strony lokalne są tylko po polsku, więc linki do nich tylko w PL.
 */
export async function DirectionsTable({ locale }: Props) {
  const t = await getTranslations();
  const anyTime = directions.some((d) => d.minutes !== null);
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <p className="text-lg text-ink-2 lg:col-start-1">{t("directions.intro")}</p>

      <MapEmbed
        title={t("directions.mapTitle")}
        navigateLabel={t("directions.navigate")}
        addressLabel={t("contactClose.address")}
        className="lg:col-start-2 lg:row-start-2 lg:self-stretch"
      />

      <div className="lg:col-start-1">
        <table className="w-full border-collapse text-left">
          <thead className="sr-only">
            <tr>
              <th scope="col">{t("directions.place")}</th>
              {anyTime ? <th scope="col">{t("directions.time")}</th> : null}
            </tr>
          </thead>
          <tbody>
            {directions.map((d) => {
              const link = locale === "pl" && d.page;
              return (
                <tr key={d.id} className="border-t border-border">
                  <th scope="row" className="py-3.5 pr-4 font-display text-lg font-medium text-foreground md:text-xl">
                    {link ? (
                      <LocalizedLink href={d.page!} locale={locale} className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                        {d.name}
                        <ArrowUpRight className="size-4 text-brand" aria-hidden />
                      </LocalizedLink>
                    ) : (
                      d.name
                    )}
                  </th>
                  {anyTime ? (
                    <td className="py-3.5 text-right font-display text-lg tabular text-ink-2">
                      {d.minutes !== null ? t("directions.approx", { minutes: d.minutes }) : ""}
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-6 text-ink-2">{t("directions.outro")}</p>
        <PhoneLink location="pricing" variant="text" className="mt-2 text-brand">
          {site.phone.displayIntl}
        </PhoneLink>
      </div>
    </div>
  );
}
