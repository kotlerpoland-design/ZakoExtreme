import { ArrowDown } from "lucide-react";
import { Container } from "@/components/primitives/Container";

type Props = {
  /** jedno zdanie, zwykły tekst — „Dojeżdżają do nas goście z Białki Tatrzańskiej, …" (treść, nie lista fraz) */
  text: string;
  /** etykieta kotwicy do tabeli dojazdu */
  linkLabel: string;
  /** cel kotwicy, np. `#dojazd` */
  href: string;
};

/**
 * Pasek miejscowości pod paskiem zaufania (docs/strony/SKUTERY-SNIEZNE.md §4, sekcja 2): klaster lokalny to trzecia intencja
 * na stronie skuterów (728 klików), a pełna tabela dojazdu jest dopiero w sekcji 6. Jedna linia z kotwicą obsługuje kogoś
 * z Białki w pierwszym przewinięciu, bez spychania cennika w dół. Ma wyglądać na treść: zwykłe zdanie, jeden link.
 * Bez `Reveal` (to jeszcze ekran 1–2) i bez własnego numeru sekcji — to dopisek do paska zaufania, nie sekcja.
 */
export function PlacesLine({ text, linkLabel, href }: Props) {
  return (
    <div className="border-b border-border/70 bg-card" data-places-line>
      <Container className="flex flex-col gap-1.5 py-3 text-sm text-ink-2 sm:flex-row sm:items-baseline sm:gap-4 md:py-3.5 md:text-base">
        <p className="max-w-prose">{text}</p>
        <a
          href={href}
          className="group inline-flex min-h-8 shrink-0 items-center gap-1.5 font-display text-sm font-medium uppercase tracking-wide text-foreground underline-offset-4 hover:underline"
        >
          {linkLabel}
          <ArrowDown className="size-4 text-brand transition-transform duration-300 ease-soft group-hover:translate-y-0.5" aria-hidden />
        </a>
      </Container>
    </div>
  );
}
