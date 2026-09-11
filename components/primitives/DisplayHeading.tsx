import { cn } from "@/lib/utils";

type Props = {
  /** Pełny tekst nagłówka 1:1 z copy. Dzielony wizualnie na „ — " (pauza ze spacjami). */
  text: string;
  as?: "h1" | "h2";
  /** md = H1 jako tytuł nad inną dominantą (lista 01/02/03 w hero strony głównej) */
  size?: "md" | "xl" | "2xl";
  className?: string;
  id?: string;
};

const LEAD = { md: "text-display-md", xl: "text-display-xl", "2xl": "text-display-2xl" } as const;
/* md: ogon w jednej linii (bez limitu szerokości); xl/2xl: display-md łamany do ~22ch */
const TAIL = { md: "mt-1 text-base lg:text-lg lg:max-w-none", xl: "mt-2 text-display-md lg:mt-3", "2xl": "mt-2 text-display-md lg:mt-3" } as const;

/**
 * Gigantyczna typografia jako element kompozycji (inspiracje „HIKING", „MOUNTAIN").
 * DOM zawiera dokładnie ten sam string co copy — dzielimy tylko wizualnie, pauza zostaje w sr-only.
 */
export function DisplayHeading({ text, as: Tag = "h1", size = "xl", className, id }: Props) {
  const [lead, ...rest] = text.split(" — ");
  const tail = rest.join(" — ");
  return (
    <Tag id={id} className={cn("font-display font-semibold text-foreground", className)}>
      <span className={cn("block uppercase", LEAD[size])}>{lead}</span>
      {tail ? (
        <>
          <span className="sr-only"> — </span>
          <span className={cn("block font-medium text-muted-foreground lg:max-w-[22ch]", TAIL[size])}>{tail}</span>
        </>
      ) : null}
    </Tag>
  );
}
