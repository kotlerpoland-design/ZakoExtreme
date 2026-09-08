# components/

Jeden zestaw komponentów, siedem szablonów stron. Nazwy i props: `docs/ARCHITEKTURA-INFORMACJI.md` §4.

```
components/
├── layout/      SiteHeader, StickyCallBar, SiteFooter, ConsentBanner
├── hero/        Hero (variant: home | product | qualifier | local)
├── trust/       TrustBar, ProofBadge
├── offer/       ProductCards, PricingCards, SeasonNotice
├── booking/     BookingSection (chipy Dziś / Jutro / Inny termin + SlotWise lazy) — JEDYNY punkt wejścia do rezerwacji
├── media/       Gallery (siatka, nie karuzela)
├── content/     ForWhom, Steps, WhyUs, DirectionsTable, FAQ (treść + FAQPage z jednego obiektu), Reviews
├── contact/     ContactClose
└── ui/          shadcn/ui (generowane przez `pnpm dlx shadcn@latest add …`)
```

Zasady dla każdego komponentu z numerem telefonu: `href="tel:+48539320700"`, `trackPhoneClick(cta_location, ctx)` z `lib/tracking.ts`.
