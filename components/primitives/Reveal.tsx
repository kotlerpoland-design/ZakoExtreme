import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** opóźnienie w sekundach (stagger w siatkach) */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * Jedyny dozwolony ruch wejścia: opacity + 10 px w górę, raz, przy wejściu w viewport.
 * Serwerowy znacznik + CSS (globals.css `[data-reveal]`) + jeden IntersectionObserver (RevealObserver w layoucie).
 * Bez JS: <noscript> w layoucie pokazuje wszystko od razu. `prefers-reduced-motion`: bez przesunięcia.
 * NIE owijać hero, paska zaufania, sticky bara ani CTA — muszą być widoczne od razu i nie opóźniać LCP.
 */
export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const style = delay ? ({ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties) : undefined;
  return (
    <Tag data-reveal className={className} style={style}>
      {children}
    </Tag>
  );
}
