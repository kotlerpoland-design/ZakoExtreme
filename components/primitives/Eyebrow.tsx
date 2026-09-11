import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Mała etykieta uppercase z szerokim trackingiem — „kartograficzna" adnotacja nad nagłówkiem. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return <p className={cn("font-display text-eyebrow font-medium uppercase text-muted-foreground", className)} {...props} />;
}
