import { Star } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

/**
 * „★ 4,8 · ponad 800 opinii w Google" — string z messages (bez gwiazdki; ★ to ikona lucide w kolorze marki, jak pozostałe
 * ikony paska zaufania); nigdy dokładna liczba opinii.
 */
export async function ProofBadge({ size = "md", withLine = false, className }: { size?: "sm" | "md"; withLine?: boolean; className?: string }) {
  const t = await getTranslations("common");
  return (
    <div className={cn("font-display", className)}>
      <p className={cn("flex items-center gap-2.5 font-medium tabular text-ink-2", size === "md" ? "text-base md:text-lg" : "text-sm")}>
        <Star className="size-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
        {t("proof")}
      </p>
      {withLine ? <p className="mt-0.5 text-sm text-muted-foreground">{t("proofLine")}</p> : null}
    </div>
  );
}
