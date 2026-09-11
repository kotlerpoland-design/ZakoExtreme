import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/primitives/Reveal";

const ITEMS = ["longest", "legal", "local", "near", "rating"] as const;

/** Pięć punktów 1:1 z copy §3.4, numerowane jak etapy trasy. Celowo nisko na stronie. */
export async function WhyUs() {
  const t = await getTranslations("whyUs");
  return (
    <ol className="grid gap-x-10 gap-y-6 md:grid-cols-2 lg:gap-y-8">
      {ITEMS.map((key, i) => (
        <li key={key} className="flex gap-5">
          <Reveal delay={i * 0.04} className="flex gap-5">
            <span className="font-display text-display-lg font-semibold tabular leading-none text-brand" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pt-1 font-display text-xl font-medium leading-snug text-foreground md:text-2xl">{t(`items.${key}`)}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
