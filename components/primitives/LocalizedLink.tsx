import Link from "next/link";
import { getLocale } from "next-intl/server";
import type { ComponentProps } from "react";
import type { Locale, PageKey } from "@/i18n/routing";
import { localizedPath } from "@/i18n/paths";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: PageKey; locale?: Locale };

/** Link do strony po kluczu wewnętrznym (i18n/routing.ts), rozwiązywany na serwerze — bez next-intl w kliencie. */
export async function LocalizedLink({ href, locale, ...props }: Props) {
  const l = locale ?? ((await getLocale()) as Locale);
  return <Link href={localizedPath(href, l)} {...props} />;
}
