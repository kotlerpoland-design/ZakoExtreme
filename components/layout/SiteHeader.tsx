import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";
import { Container } from "@/components/primitives/Container";
import { BookCta } from "@/components/primitives/BookCta";
import { Wordmark } from "./Wordmark";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileMenu, type MenuLink, type MobileMenuLabels } from "./MobileMenu";
import { navGroups, resolveNavHref, type NavItem } from "./nav";
import { isVoucherMenuSeason } from "@/config/season";

const NAV_LINK =
  "group relative inline-flex h-11 items-center whitespace-nowrap font-display text-[0.8125rem] font-medium uppercase tracking-[0.1em] text-ink-2 transition-colors hover:text-foreground xl:text-sm xl:tracking-[0.12em]";
const NAV_UNDERLINE =
  "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 after:ease-soft group-hover:after:scale-x-100";

function NavLinks({ items, label }: { items: MenuLink[]; label: string }) {
  return (
    <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label={label}>
      {items.map((item) => (
        <Link key={item.href} href={item.href} prefetch={false} className={`${NAV_LINK} ${NAV_UNDERLINE}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

/**
 * Header: 56 px mobile / 72 px lg (token --header-h), sticky, nie zasłania H1 (scroll-padding).
 * Desktop: [filary] · LOGO · [vouchery · galeria · kontakt] ……… Rezerwuj online · EN.
 * Mobile:  [☰] · LOGO · [Rezerwuj]. Bez telefonu w nawigacji (decyzja 2026-09-10: nie zachęcamy do dzwonienia,
 * numer zostaje tylko w stopce, sekcji Kontakt i przy „masz pytania"). Linki rozwiązane na serwerze — klient nie ładuje next-intl.
 */
export async function SiteHeader() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const resolve = (items: readonly NavItem[]): MenuLink[] => items.map((item) => ({ href: resolveNavHref(item, locale), label: t(`nav.${item.labelKey}`) }));
  // Vouchery w menu tylko 1 XI – 31 XII; poza oknem prowadzi do nich wyłącznie stopka.
  const groups = navGroups({ vouchers: isVoucherMenuSeason() });
  const left = resolve(groups.left);
  const right = resolve(groups.right);
  const menuLabels: MobileMenuLabels = {
    openMenu: t("header.openMenu"),
    closeMenu: t("header.closeMenu"),
    menuTitle: t("header.menuTitle"),
    switchLocaleAria: t("header.switchLocaleAria"),
    bookOnline: t("common.bookOnline"),
  };

  return (
    <header className="sticky top-0 z-40 h-header border-b border-border/60 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <Container className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-6">
        {/* lewa: hamburger na mobile, filary dosunięte do logo na desktopie */}
        <div className="flex items-center justify-start -ml-2 lg:ml-0 lg:justify-end">
          <MobileMenu items={[...left, ...right]} labels={menuLabels} locale={locale} />
          <NavLinks items={left} label={t("header.menuTitle")} />
        </div>

        <Link
          href={localizedPath("/", locale)}
          prefetch={false}
          className="inline-flex h-11 items-center justify-self-center rounded-md px-2 text-foreground"
          aria-label={`${site.name} — ${t("header.home")}`}
        >
          <Wordmark />
        </Link>

        {/* prawa: intencje przy logo, narzędzia przy krawędzi */}
        <div className="flex items-center justify-end gap-1 -mr-2 lg:mr-0 lg:justify-between lg:gap-6">
          <NavLinks items={right} label={t("header.menuTitle")} />
          <div className="flex items-center gap-1 lg:gap-3">
            {/* jedyne CTA w nawigacji = rezerwacja online (mobile: krótsze „Rezerwuj", desktop: „Rezerwuj online") */}
            <BookCta location="menu" variant="compact" className="whitespace-nowrap lg:hidden">
              {t("common.book")}
            </BookCta>
            <BookCta location="menu" variant="compact" className="hidden whitespace-nowrap lg:inline-flex">
              {t("common.bookOnline")}
            </BookCta>
            <LocaleSwitch locale={locale} ariaLabel={t("header.switchLocaleAria")} className="hidden lg:inline-flex" />
          </div>
        </div>
      </Container>
    </header>
  );
}
