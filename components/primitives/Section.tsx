import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

type Props = ComponentProps<"section"> & {
  eyebrow?: string;
  title?: string;
  /** H2 renderowany jako display-lg; `intro` pod nim, jednym zdaniem */
  intro?: string;
  /** pionowa mikro-etykieta na lewym marginesie (tylko lg+) */
  marginLabel?: string;
  tone?: "fog" | "paper" | "mist";
  headingLevel?: "h2" | "h3";
  /** warstwa pod całą sekcją (nagłówek + treść), np. zdjęcie tła na mobile — renderowana przed Container; sekcja dostaje `isolate` */
  backdrop?: ReactNode;
  children: ReactNode;
};

const TONES = { fog: "bg-background", paper: "bg-card", mist: "bg-muted" } as const;

/**
 * Sekcja strony: eyebrow · H2 · treść. Sekcje oddziela przestrzeń, nie linie. Bez numerów sekcji (decyzja 2026-09-11).
 */
export function Section({ eyebrow, title, intro, marginLabel, tone = "fog", headingLevel = "h2", backdrop, className, children, ...props }: Props) {
  const Heading = headingLevel;
  return (
    <section className={cn("relative", TONES[tone], backdrop && "isolate", className)} {...props}>
      {backdrop}
      <Container className="relative py-section lg:py-section-lg">
        {marginLabel ? (
          <span
            aria-hidden
            className="absolute top-section left-0 hidden origin-top-left writing-vertical font-display text-eyebrow font-medium uppercase tracking-[0.2em] text-muted-foreground/70 lg:block lg:top-section-lg"
          >
            {marginLabel}
          </span>
        ) : null}
        {(eyebrow || title) && (
          <header className="mb-10 max-w-3xl lg:mb-14">
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
