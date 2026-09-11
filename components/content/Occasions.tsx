import { Cake, Gift, Heart, PartyPopper, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/primitives/Reveal";

const TILES = [
  { key: "birthday", Icon: Cake },
  { key: "stag", Icon: PartyPopper },
  { key: "anniversary", Icon: Heart },
  { key: "holidays", Icon: Sparkles },
  { key: "noOccasion", Icon: Gift },
] as const;

/**
 * „Na jaką okazję" — urodziny · wieczór kawalerski · rocznica · święta · bez okazji.
 * Lista ze starej strony, przeniesiona bo pracuje na długim ogonie fraz i w wyszukiwarkach AI:
 * ludzie szukają „prezent na rocznicę w Zakopanem", nie „voucher".
 * Dlatego każdy kafel niesie ZDANIE, nie samą ikonę — ikona bez tekstu jest niecytowalna.
 */
export async function Occasions() {
  const t = await getTranslations("vouchers.occasions");
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {TILES.map(({ key, Icon }, i) => (
        <li key={key}>
          <Reveal delay={i * 0.05} className="h-full">
            <div className="h-full rounded-lg bg-card p-5 shadow-card">
              <Icon className="size-7 text-brand" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-4 font-display text-display-md font-semibold uppercase leading-none">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-normal text-ink-2">{t(`items.${key}.body`)}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
