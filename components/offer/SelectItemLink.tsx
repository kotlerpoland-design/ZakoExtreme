"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackBookCtaClick, trackSelectItem, type CtaLocation } from "@/lib/tracking";

type Base = { itemId: string; href: string; children: ReactNode; className?: string };
type Props = (Base & { kind: "page" }) | (Base & { kind: "anchor"; location: CtaLocation });

/** Wybór wariantu/produktu → `select_item`; anchor do #rezerwacja dodatkowo `cta_click{book_online}`. Href rozwiązany na serwerze. */
export function SelectItemLink(props: Props) {
  if (props.kind === "page") {
    return (
      <Link href={props.href} onClick={() => trackSelectItem(props.itemId)} className={props.className}>
        {props.children}
      </Link>
    );
  }
  return (
    <a
      href={props.href}
      onClick={() => {
        trackSelectItem(props.itemId);
        trackBookCtaClick(props.location);
      }}
      className={props.className}
    >
      {props.children}
    </a>
  );
}
