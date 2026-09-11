import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  /** hero: preload zamiast deprecated `priority` (Next 16) */
  preload?: boolean;
  /** kierunek rozpływania się w mgłę */
  fog?: "bottom" | "left" | "none";
  /** object-position, np. "50% 40%" żeby zachować szczyty w kadrze */
  position?: string;
  className?: string;
  imgClassName?: string;
};

/**
 * Zdjęcie bez ostrej krawędzi — maska gradientowa wtapia je w tło (mgłę). Zawsze `fill` w kontenerze
 * z zarezerwowaną wysokością (CLS 0). Rodzic musi być `relative` i mieć wysokość/aspect.
 */
export function FogImage({ src, alt, sizes, preload = false, fog = "bottom", position = "50% 50%", className, imgClassName }: Props) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", fog === "bottom" && "fog-mask", fog === "left" && "fog-mask-x", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        loading={preload ? "eager" : undefined}
        fetchPriority={preload ? "high" : undefined}
        placeholder="blur"
        quality={70}
        className={cn("object-cover", imgClassName)}
        style={{ objectPosition: position }}
      />
    </div>
  );
}
