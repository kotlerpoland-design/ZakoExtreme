import { CalendarCheck, IdCard, ShieldCheck, UserCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Container } from "@/components/primitives/Container";
import { ProofBadge } from "./ProofBadge";
import { TrustMarquee } from "./TrustMarquee";

const ITEMS = [
  { key: "legal", Icon: ShieldCheck },
  { key: "instructor", Icon: UserCheck },
  { key: "noLicence", Icon: IdCard },
  // „Rezerwacja online 24 h" — firma NIE jest czynna 24 h (decyzja właścicielki 2026-09-10); całą dobę działa strona i rezerwacja
  { key: "bookOnline24", Icon: CalendarCheck },
] as const;

/**
 * Dowód społeczny (★ 4,8 · ponad 800 opinii — przeniesiony z hero, decyzja 2026-09-09) + cztery lęki zamknięte zanim
 * zaczną się pytania. Jedna linia na mobile: wolna pętla auto-scroll z zachowanym ręcznym przesuwaniem (`TrustMarquee`,
 * decyzja 2026-09-10) — treść zrenderowana dwa razy, klon aria-hidden i ukryty od md; proof jako pierwszy, więc widoczny
 * bez przewijania. docs/ARCHITEKTURA-INFORMACJI.md §2.
 */
export async function TrustBar({ className }: { className?: string }) {
  const t = await getTranslations("trust");
  const renderItems = (clone: boolean) => (
    <>
      <li data-proof={clone ? undefined : ""} data-clone={clone ? "" : undefined} aria-hidden={clone || undefined} className={cn("flex shrink-0 items-center whitespace-nowrap", clone && "md:hidden")}>
        <ProofBadge size="sm" />
      </li>
      {ITEMS.map(({ key, Icon }) => (
        <li
          key={clone ? `${key}-clone` : key}
          data-clone={clone ? "" : undefined}
          aria-hidden={clone || undefined}
          className={cn(
            "flex shrink-0 items-center gap-2.5 whitespace-nowrap font-display text-sm font-medium uppercase tracking-wide text-ink-2 md:min-w-0 md:shrink md:whitespace-normal",
            clone && "md:hidden",
          )}
        >
          <Icon className="size-5 shrink-0 text-brand" strokeWidth={2} aria-hidden />
          {t(key)}
        </li>
      ))}
    </>
  );
  return (
    <div className={cn("border-y border-border/70 bg-card", className)} data-trust-bar>
      <Container className="px-0 md:px-8 lg:px-12">
        {/* desktop: flex + justify-between zamiast sztywnych kolumn — 5 pozycji o różnej długości, najdłuższa łamie się dopiero gdy brakuje miejsca */}
        <TrustMarquee className="flex gap-2 overflow-x-auto overscroll-x-contain px-5 py-3 [scrollbar-width:none] md:justify-between md:gap-6 md:overflow-visible md:px-0 md:py-4 [&::-webkit-scrollbar]:hidden">
          {renderItems(false)}
          {renderItems(true)}
        </TrustMarquee>
      </Container>
    </div>
  );
}
