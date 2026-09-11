import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Jedna szerokość treści na całej stronie. 20 px marginesu na 390, szerokie marginesy na desktopie („spokój = luksus"). */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-12", className)} {...props} />;
}
