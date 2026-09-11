import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Props = {
  price: number;
  size?: "hero" | "card" | "inline";
  className?: string;
};

/**
 * „od 250 zł" / „from 250 PLN" — string z messages (jedno źródło formatu), liczba wizualnie największa na ekranie.
 * Dzielimy gotowy string wokół liczby, żeby nie duplikować copy w komponencie.
 */
export function PriceFrom({ price, size = "hero", className }: Props) {
  const t = useTranslations("common");
  const text = t("priceFrom", { price });
  const [before, after] = text.split(String(price));
  const numberClass = { hero: "text-price", card: "text-display-lg", inline: "text-2xl" }[size];
  const wordClass = { hero: "text-lg md:text-xl", card: "text-base", inline: "text-sm" }[size];
  return (
    <p className={cn("flex items-baseline gap-2 font-display text-foreground", className)} data-price-from={price} aria-label={text}>
      {before?.trim() ? <span className={cn("font-medium uppercase tracking-wide text-muted-foreground", wordClass)}>{before.trim()}</span> : null}
      <span className={cn("font-semibold tabular", numberClass)}>{price}</span>
      {after?.trim() ? <span className={cn("font-medium uppercase tracking-wide text-muted-foreground", wordClass)}>{after.trim()}</span> : null}
    </p>
  );
}
