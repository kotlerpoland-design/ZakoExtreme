import { Heart, PartyPopper, Users, UsersRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { LocalizedLink } from "@/components/primitives/LocalizedLink";
import { BookCta } from "@/components/primitives/BookCta";
import { Reveal } from "@/components/primitives/Reveal";

const TILES = [
  { key: "couples", Icon: Heart },
  { key: "families", Icon: UsersRound, href: "/buggy-zakopane" as const },
  { key: "groups", Icon: Users },
  { key: "stag", Icon: PartyPopper },
] as const;

const TILE_CLASS = "block h-full rounded-lg bg-card p-5 shadow-card transition-shadow duration-300 ease-soft hover:shadow-lift";

type Props = {
  familiesLink?: boolean;
  /** kotwica zamiast linku do /buggy-zakopane/ — na samej stronie buggy kafel Rodziny skacze do bloku 6-osobowego (`#buggy-6-osobowe`) */
  familiesAnchor?: `#${string}`;
};

/**
 * „Dla kogo to jest": pary · rodziny · grupy · wieczory kawalerskie (4 kafle, decyzja 2026-09-10 — ognisko zostaje tylko w cenniku ULTRA 3 h i FAQ).
 * Same etykiety z copy — zdań per kafel nie ma w dokumencie, więc ich nie wymyślamy. Rodziny → buggy 6-osobowe
 * (`familiesLink={false}` na stronie skuterów: zimą buggy 6-os. nie jeździ, kafel zostaje bez linku;
 * `familiesAnchor` na stronie buggy: link do tej samej strony nie ma sensu, kafel prowadzi do bloku 6-os. w cenniku).
 */
export async function ForWhom({ familiesLink = true, familiesAnchor }: Props = {}) {
  const t = await getTranslations();
  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {TILES.map(({ key, Icon, ...rest }, i) => {
          const href = "href" in rest && familiesLink ? rest.href : null;
          const inner = (
            <>
              <Icon className="size-7 text-brand" strokeWidth={1.75} aria-hidden />
              <span className="mt-4 block font-display text-display-md font-semibold uppercase leading-none">{t(`forWhom.items.${key}`)}</span>
              {href ? <span className="mt-2 block font-display text-eyebrow font-medium uppercase text-muted-foreground">→ {t("forWhom.familiesHint")}</span> : null}
            </>
          );
          return (
            <li key={key}>
              <Reveal delay={i * 0.05} className="h-full">
                {href && familiesAnchor ? (
                  <a href={familiesAnchor} className={TILE_CLASS}>
                    {inner}
                  </a>
                ) : href ? (
                  <LocalizedLink href={href} className={TILE_CLASS}>
                    {inner}
                  </LocalizedLink>
                ) : (
                  <div className="h-full rounded-lg bg-card p-5 shadow-card">{inner}</div>
                )}
              </Reveal>
            </li>
          );
        })}
      </ul>
      <div className="mt-8">
        <BookCta location="pricing" variant="outline">
          {t("common.bookOnline")}
        </BookCta>
      </div>
    </div>
  );
}
