import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Typowane Link/redirect/usePathname/useRouter — używaj ich zamiast next/link. */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
