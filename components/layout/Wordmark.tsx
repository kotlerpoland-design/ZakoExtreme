import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/config/site";
import logoDark from "@/assets/brand/logo-zakoextreme-dark.png";
import logoWhite from "@/assets/brand/logo-zakoextreme-white.png";

/**
 * Logo klienta (PNG 209×70 z alfą). Motyw ciemny (2026-09-09) → domyślnie biały oryginał (`tone="light"`); ciemny wariant
 * zostaje na ewentualne jasne powierzchnie. Bez CSS filter, żeby nie tworzyć warstwy kompozycji w headerze z backdrop-blur.
 * `unoptimized`: 3,6 kB, hash w URL, bez /_next/image.
 * Wysokość 24 px na mobile = ostre przy 3× DPR z tego źródła; 28 px na lg (dominuje 2×). SVG od klienta: 03-COPY §8.
 */
export function Wordmark({ className, tone = "light" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image src={tone === "dark" ? logoDark : logoWhite} alt="" aria-hidden unoptimized className="h-6 w-auto lg:h-7" />
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
