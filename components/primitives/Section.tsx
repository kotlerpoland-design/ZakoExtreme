import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { SectionNumber } from "./SectionNumber";
import { Eyebrow } from "./Eyebrow";

type Props = ComponentProps<"section"> & {
  /** numer porządkowy sekcji w szablonie (docs/ARCHITEKTURA-INFORMACJI.md §3) */
  n?: number;
  eyebrow?: string;
  title?: string;
  /** H2 renderowany jako display-lg; `intro` pod nim, jednym zdaniem */
  intro?: string;
  /** pionowa mikro-etykieta na lewym marginesie (tylko lg+) */
  marginLabel?: string;
  tone?: "fog" | "paper" | "mist";
  headingLevel?: "h2" | "h3";
  children: ReactNode;
};

const TONES = { fog: "bg-background", paper: "bg-card", mist: "bg-muted" } as const;

/**
 * Sekcja strony: numer · eyebrow · H2 · treść. Sekcje oddziela przestrzeń, nie linie.
 */
export function Section({ n, eyebrow, title, intro, marginLabel, tone = "fog", headingLevel = "h2", className, children, ...props }: Props) {
  const Heading = headingLevel;
  return (
    <section className={cn("relative", TONES[tone], className)} {...props}>
      <Container className="relative py-section lg:py-section-lg">
        {marginLabel ? (
          <span
            aria-hidden
            className="absolute top-section left-0 hidden origin-top-left writing-vertical font-display text-eyebrow font-medium uppercase tracking-[0.2em] text-muted-foreground/70 lg:block lg:top-section-lg"
          >
            {marginLabel}
          </span>
        ) : null}
        {(n || eyebrow || title) && (
          <header className="mb-10 max-w-3xl lg:mb-14">
            {n ? <SectionNumber n={n} className="mb-4" /> : null}
            {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
            {title ? <Heading className="text-display-lg uppercase">{title}</Heading> : null}
            {intro ? <p className="mt-4 max-w-prose text-lg text-ink-2">{intro}</p> : null}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
