import { Snowflake } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

/** Jedno zdanie w sezonie przejściowym: „Skutery śnieżne wracają w listopadzie." Nic więcej. */
export async function SeasonNotice({ className }: { className?: string }) {
  const t = await getTranslations("products");
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-ink-2", className)}>
      <Snowflake className="size-4 text-muted-foreground" aria-hidden />
      {t("snowNotice")}
    </p>
  );
}
