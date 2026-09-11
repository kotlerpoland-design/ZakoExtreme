import { getTranslations } from "next-intl/server";
import { publishedFaq, type FaqId } from "@/content/faq";
import type { MediaItem } from "@/content/media";
import type { Locale } from "@/i18n/routing";
import { faqPageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { PhoneLink } from "@/components/primitives/PhoneLink";
import { WashImage } from "@/components/graphics/WashImage";
import { WatercolorDefs } from "@/components/graphics/WatercolorDefs";
import { FaqAccordion } from "./FaqAccordion";

type Props = {
  ids: readonly FaqId[];
  locale: Locale;
  /** zdjęcie po prawej na lg+ (strona główna); rodzic podaje wynik `confirmedMedia()`, tu nie sprawdzamy flagi */
  media?: MediaItem | null;
};

/* ziarno szumu poza zajętymi w Hero.tsx (7/13/21/29): id filtrów SVG pochodzą z ziarna, a hero ma własne WatercolorDefs na tej samej stronie */
const SEED = 37;
/* kontener zdjęcia ≈ 45 % Container + 40 % wysunięcia ≈ 746 px przy 1280 (58 vw); Container ma max-w-7xl, więc dalej ≤ 60 vw */
const SIZES = "(min-width: 1024px) 60vw, 100vw";

/**
 * Treść widoczna I schema FAQPage z JEDNEGO obiektu (content/faq.ts). Pytania bez odpowiedzi nie istnieją tu wcale.
 * Opcjonalne `media` (decyzja 2026-09-10, tylko strona główna): na lg+ zdjęcie w prawej kolumnie (45 %), zatopione w tło tym samym
 * mechanizmem co hero (WashImage: lewa krawędź eroduje najsilniej, dolna słabiej). Kontener wysunięty 40 % komórki w lewo, żeby
 * rampa `.wash-base` (0→38 % szerokości) liczyła się od szerszego pudełka — rdzeń zdjęcia zaczyna się ~70 px w głąb komórki,
 * a ogon (alpha ≤ 0,3) ląduje w odstępie kolumn i na prawym skraju akordeonu (akordeon jest nad nim: z-10, zdjęcie bez pointer-events).
 * Poniżej lg zdjęcia nie ma wcale (`hidden` + lazy = zero requestu).
 */
export async function FAQ({ ids, locale, media }: Props) {
  const entries = publishedFaq(ids);
  if (entries.length === 0) return null;
  const t = await getTranslations("common");
  const items = entries.map((e) => ({ id: e.id, question: e.question[locale], answer: e.answer[locale] }));
  return (
    <div className={cn("relative", media && "lg:grid lg:grid-cols-[minmax(0,1fr)_45%] lg:gap-10")}>
      <div className="relative z-10 max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema(items)) }} />
        <FaqAccordion items={items} />
        <div className="mt-8">
          <PhoneLink location="faq" variant="outline">
            {t("notSureCall")}
          </PhoneLink>
        </div>
      </div>
      {media ? (
        <div className="pointer-events-none relative hidden lg:block lg:min-h-[420px]">
          {/* tylko filtry desktopowe i bez blur: HTML ekranu 1 jest na granicy budżetu 310 kB (tests/first-screen.spec.ts) */}
          <WatercolorDefs seed={SEED} breakpoints={["desktop"]} />
          <div className="absolute inset-y-0 right-0 left-[-40%]">
            <WashImage src={media.src} alt={media.alt[locale]} sizes={SIZES} lazy position={media.position} seed={SEED} quality={62} blur={false} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
