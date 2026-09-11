import { cn } from "@/lib/utils";

/** Numer sekcji „01"–„11" w koralu + cienka linia. Motyw z inspiracji (01 / 02 / 03), zero ozdób. */
export function SectionNumber({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-hidden>
      <span className="font-display text-sm font-semibold tabular text-brand">{String(n).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-brand" />
    </span>
  );
}
