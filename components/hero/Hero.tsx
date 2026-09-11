import Link from "next/link";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { MediaItem } from "@/content/media";
import { cn } from "@/lib/utils";
import { Container } from "@/components/primitives/Container";
import { DisplayHeading } from "@/components/primitives/DisplayHeading";
import { PriceFrom } from "@/components/primitives/PriceFrom";
import { BookCta } from "@/components/primitives/BookCta";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { WashImage } from "@/components/graphics/WashImage";
import { WatercolorDefs } from "@/components/graphics/WatercolorDefs";
import { InkMountain } from "@/components/graphics/InkMountain";
import { HeroSlides, type HeroSlide } from "./HeroSlides";
import type { HeroPillar } from "./heroProducts";

export type HeroProduct = { n: number; label: string; href: string; product: HeroPillar };

type Props = {
  variant: "home" | "product" | "qualifier" | "local";
  locale: Locale;
  h1: string;
  /** zdanie pod CTA; ReactNode, bo lead poza sezonem skuterów niesie link „zobacz ofertę letnią" (/skutery-sniezne-zakopane/) */
  lead: ReactNode;
  /** null = cena niepotwierdzona (NIE zgadujemy) albo świadomie pominięta (strona główna, decyzja 2026-09-09) → slot pominięty */
  priceFrom: number | null;
  /** null = brak potwierdzonego zdjęcia → hero na samym rysunku i grzbiecie */
  media: MediaItem | null;
  eyebrow: string;
  /** strona główna: lista „01 Quady · 02 Buggy · 03 Skutery" jako dominanta ekranu 1 */
  products?: HeroProduct[];
  /** strona główna: slajd na filar w kolejności `products`; id slajdu = `product`. Bez `slides` renderuje się `media`. */
  slides?: HeroSlide[];
  /**
   * Nadpisanie CTA ekranu 1. Domyślnie „Rezerwuj online" (jedyny pomarańczowy przycisk).
   * Używa tego wyłącznie /vouchery/, gdzie rezerwacja online nie jest właściwą akcją — vouchera nie da się kupić przez SlotWise.
   */
  cta?: ReactNode;
};

/* mobile 390×3×0,6 = 702 → kandydat 750 px q70 ≈ 32 kB (budżet < 310 kB); desktop 1440 → 1080 px, 1536+ → 1200 px */
const SIZES = "(min-width: 1024px) 70vw, 60vw";

const SEED: Record<Props["variant"], number> = { home: 7, product: 13, qualifier: 21, local: 29 };

/**
 * EKRAN 1 (390×844): zdjęcie na całą szerokość u góry (prosta krawędź pod headerem), którego dolna krawędź eroduje
 * akwarelowo w biel strony (watercolor.ts: alpha zdjęcia strzępi się w wąskiej strefie, bez overlayu i bez sylwetki plamy),
 * pod nim H1, lista produktów (home), cena, CTA rezerwacji; rysunek góry tuszem po lewej, za listą. Tekst nigdy nie leży na
 * rdzeniu zdjęcia (kontrast gwarantowany) — co najwyżej na strefie alpha ≤ ~0,3 i na rysunku (opacity 30 %).
 * Strona główna (decyzja właścicielki 2026-09-09): ekran 1 zaczyna się od listy 01/02/03 — bez eyebrow, H1 tylko w sr-only
 * (fraza SEO zostaje w DOM), bez ceny „od" i bez ★ 4,8 (dowód społeczny jest pierwszą pozycją paska zaufania pod hero).
 * Desktop: zdjęcie po prawej na 45 % kolumny, kontener wysunięty w lewo (44 % kolumny na lg, 73 % na xl), erozja głównie na lewej krawędzi
 * (słabiej u dołu); ogon washu (resztki pigmentu, alpha ≤ ~0,3) przechodzi nad prawy skłon rysunku góry — obie warstwy się
 * przenikają, kreska widoczna pod spodem (brief 2026-09-09, runda 6); dół sekcji to biel (bez grzbietu SVG — referencja Dirt Days).
 * Budżet wysokości na mobile: CTA rezerwacji kończy się ≤ ~640 px, żeby baner zgód (od ~730 px) go nie zasłonił.
 * Kolejność DOM: zdjęcie (pierwszy <img> = LCP i punkt odniesienia testu budżetu) → rysunek → treść.
 */
export async function Hero({ variant, locale, h1, lead, priceFrom, media, eyebrow, products, slides, cta }: Props) {
  const t = await getTranslations("common");
  const list = variant === "home" && products && products.length > 0 ? products : null;
  const rotation = slides && slides.length > 0 ? slides : null;
  const hasPhoto = Boolean(rotation || media);

  return (
    <section className="relative isolate overflow-hidden bg-background" data-hero={variant}>
      <div className="relative lg:grid lg:min-h-[680px] lg:grid-cols-[minmax(0,1fr)_45%]">
        {/* zdjęcie: pełna szerokość u góry na mobile, prawa kolumna na desktopie (kontener wychodzi 44 % (lg) / 73 % (xl) kolumny w lewo,
            czyli zaczyna się ~22 % viewportu przy 1440 — szerszy kontener = mniejszy crop, widać więcej sceny po lewej;
            ogon gradientu .wash-base o alpha ≤ ~0,3 kładzie się na prawym skłonie rysunku góry i sięga końca listy 01/02/03 —
            rdzeń zdjęcia zaczyna się ~56 % viewportu, nigdy pod tekstem) */}
        {/* 205 px: z dwoma CTA (56 + 48) telefon kończy się ~705 px, baner zgód zaczyna ~730 px — test „baner nie zasłania CTA" */}
        <div className={cn("relative h-[205px] w-full sm:h-[320px] lg:order-2 lg:h-auto lg:w-auto", !hasPhoto && "hidden lg:block")}>
          {hasPhoto ? <WatercolorDefs seed={SEED[variant]} /> : null}
          {/* mobile: zdjęcie wystaje 64 px poniżej wysokości w przepływie (CLS 0) i rozpływa się nad szczyt rysunku góry */}
          {/* lg (1024–1279): zostaje 44 % — przy 1024 rząd dwóch CTA sięga ~550 px i przy większym wysunięciu telefon wchodził pod rdzeń */}
          <div className="absolute inset-x-0 top-0 -bottom-16 lg:inset-y-0 lg:left-[-44%] xl:left-[-73%]">
            {rotation ? (
              <HeroSlides slides={rotation} sizes={SIZES} seed={SEED[variant]} />
            ) : media ? (
              <WashImage src={media.src} alt={media.alt[locale]} sizes={SIZES} preload position={media.position} seed={SEED[variant]} quality={70} />
            ) : null}
          </div>
        </div>

        {/* rysunek góry: po lewej, za H1 i listą, jak szary dym za tekstem w referencji; prawy skłon wchodzi pod ogon zdjęcia
            (desktop x ≈ 540–760 px na 1440), na mobile szczyt wchodzi pod dolny ogon zdjęcia */}
        <InkMountain className="left-[-14%] top-[170px] w-[86%] max-w-[440px] sm:top-[230px] sm:w-[60%] lg:left-[-4%] lg:top-[-10%] lg:w-[64%] lg:max-w-none" />

        <Container className="relative z-10 pt-1 pb-6 lg:order-1 lg:flex lg:flex-col lg:justify-center lg:py-14">
          {list ? (
            /* home: H1 z frazą zostaje w DOM (SEO, test „jeden H1"), wizualnie ekran 1 zaczyna się od listy */
            <h1 className="sr-only">{h1}</h1>
          ) : (
            <>
              <Eyebrow>{eyebrow}</Eyebrow>
              <DisplayHeading text={h1} as="h1" size="xl" className="mt-2 lg:mt-4" />
            </>
          )}

          {list ? (
            <ol className="mt-2 lg:mt-12">
              {list.map((p, i) => (
                <li key={p.href}>
                  {/* data-slide/data-active: HeroSlides podkreśla pozycję aktualnego slajdu; pierwsza podkreślona już z serwera */}
                  <Link
                    href={p.href}
                    prefetch={false}
                    data-slide={p.product}
                    data-active={rotation && i === 0 ? "true" : "false"}
                    className="group flex items-baseline gap-3 py-1 font-display text-display-lg font-semibold uppercase leading-none text-foreground lg:gap-5 lg:py-1.5 lg:text-[clamp(2.75rem,5.2vw,5rem)] lg:tracking-[-0.015em]"
                  >
                    <span aria-hidden className="w-7 shrink-0 text-sm font-semibold tabular text-brand lg:w-10 lg:text-base">
                      {String(p.n).padStart(2, "0")}
                    </span>
                    <span className="relative transition-colors duration-500 ease-soft after:absolute after:inset-x-0 after:bottom-[-0.08em] after:h-[0.06em] after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-500 after:ease-soft group-hover:after:scale-x-100 group-data-[active=true]:text-brand group-data-[active=true]:after:scale-x-100 group-data-[active=true]:after:bg-brand">
                      {p.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}

          {priceFrom !== null ? (
            <div className="mt-3 lg:mt-5">
              <PriceFrom price={priceFrom} size="hero" />
            </div>
          ) : null}

          {/* jedno CTA = rezerwacja online (decyzja 2026-09-10: telefon zniknął z ekranu 1, zostaje w stopce i sekcji Kontakt) */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3 lg:mt-24">
            {cta ?? (
              <BookCta location="hero" variant="primary" className="sm:whitespace-nowrap">
                {t("bookOnline")}
              </BookCta>
            )}
          </div>
          {/* sentinel: gdy CTA zniknie z viewportu, pojawia się sticky bar */}
          <div data-hero-sentinel aria-hidden className="h-px w-px" />

          {/* „Blisko centrum…" + lead = jeden blok odsunięty od listy i CTA (decyzja 2026-09-09: „obniż trochę od sekcji z numerkami") */}
          <p className="mt-5 font-display text-sm font-medium uppercase tracking-wide text-muted-foreground lg:mt-8">{t("nearCenter")}</p>

          {/* lead pod CTA na każdym wariancie: z dwoma CTA nad banerem zgód nie ma na niego miejsca wyżej (390×844) */}
          <p className="mt-3 max-w-[44ch] text-base leading-normal text-ink-2 lg:mt-4 lg:text-lg lg:leading-relaxed">{lead}</p>
        </Container>
      </div>
    </section>
  );
}
