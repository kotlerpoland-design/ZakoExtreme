/**
 * Kontrakt zdarzeń — jedyne źródło prawdy. Wysyłamy DOKŁADNIE te eventy i parametry.
 * Źródło: docs/pakiet/05-TRACKING.md §3. Wszystko idzie do dataLayer → GTM. Zero gołego gtag/fbq w kodzie.
 *
 * Zasady:
 * - `phone_click` z obowiązkowym `cta_location` — to jedyna rzecz, która realnie mierzy sprzedaż (153:1).
 * - Przed każdym pushem e-commerce czyścimy `ecommerce: null`.
 * - Zero danych osobowych w dataLayer.
 * - Nie wysyłamy `generate_lead` przy telefonie, nie wysyłamy scroll depth.
 */
export type CtaLocation = "hero" | "sticky" | "faq" | "footer" | "pricing" | "contact" | "menu" | "voucher";
export type PageType = "home" | "product" | "local" | "pricing" | "qualifier" | "contact" | "reviews" | "vouchers" | "gallery";
export type TrackedProduct = "quady" | "buggy" | "skutery" | "mixed";
export type TrackedLanguage = "pl" | "en";

type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function push(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

/**
 * Consent Mode v2 — aktualizacja zgód po decyzji w banerze. `gtag` z layoutu to `dataLayer.push(arguments)`,
 * więc push obiektu `arguments` jest jedyną poprawną formą (tablica NIE zadziała).
 */
export function updateConsent(granted: boolean) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  const state = granted ? "granted" : "denied";
  const consent = { ad_storage: state, ad_user_data: state, ad_personalization: state, analytics_storage: state };
  // GTM rozpoznaje polecenia consent TYLKO po obiekcie `arguments` (nie tablicy) — stąd klasyczna funkcja.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function gtagLike(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments as unknown as DataLayerEvent);
  }
  gtagLike("consent", "update", consent);
  push({ event: "consent_update", consent_state: state });
}

/** Unikalny event_id — ten sam dla GA4/Ads/Meta (deduplikacja CAPI). Dla purchase użyj transaction_id ze SlotWise. */
export function newEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export type PageContext = {
  page_type: PageType;
  product: TrackedProduct;
  language: TrackedLanguage;
};

/** Kliknięcie w numer telefonu — GDZIEKOLWIEK na stronie. Push jest synchroniczny, nie używaj preventDefault + setTimeout. */
export function trackPhoneClick(cta_location: CtaLocation, ctx: PageContext) {
  push({ event: "phone_click", cta_location, ...ctx });
}

/** Skopiowanie numeru zamiast kliknięcia (desktop). */
export function trackPhoneCopy() {
  push({ event: "phone_copy", copy_type: "phone" });
}

/** Wejście na stronę kontaktu — zliczana konwersja. */
export function trackContactPageView(language: TrackedLanguage) {
  push({ event: "contact_page_view", language });
}

/** Kliknięcie w CTA rezerwacji, jeszcze przed wejściem w widżet. */
export function trackBookCtaClick(cta_location: CtaLocation) {
  push({ event: "cta_click", cta_id: "book_online", cta_location });
}

/** Rozwinięcie pytania FAQ — mówi, która obiekcja blokuje ludzi. */
export function trackFaqOpen(faq_id: string) {
  push({ event: "faq_open", faq_id });
}

/** Wybór wariantu w cenniku. */
export function trackSelectItem(item_id: string) {
  push({ event: "select_item", item_id });
}

/** Kliknięcie w mapę / trasę dojazdu. */
export function trackDirectionsClick() {
  push({ event: "directions_click" });
}

export type EcommerceItem = {
  item_id: string;
  item_name: string;
  item_category: TrackedProduct;
  price: number;
  quantity: number;
};

/**
 * Zdarzenia lejka SlotWise: view_item → add_to_cart → begin_checkout → purchase.
 * Jeśli oficjalny embed.js SlotWise sam pushuje te eventy — NIE dubluj ich stąd.
 * Ta funkcja jest fallbackiem dla surowego iframe.
 */
export function trackEcommerce(
  event: "view_item" | "add_to_cart" | "begin_checkout" | "purchase",
  items: EcommerceItem[],
  opts: { event_id?: string; transaction_id?: string } = {},
) {
  const value = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  push({ ecommerce: null });
  push({
    event,
    event_id: opts.event_id ?? opts.transaction_id ?? newEventId(),
    ecommerce: {
      currency: "PLN",
      value,
      ...(opts.transaction_id ? { transaction_id: opts.transaction_id } : {}),
      items,
    },
  });
}
