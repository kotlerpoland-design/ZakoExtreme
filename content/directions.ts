/**
 * „Skąd do nas dojedziesz" — obsługuje 579 fraz lokalnych bez własnych stron.
 * Czasy: [[DO POTWIERDZENIA]] — od Piotrka albo policzone z map i oznaczone „ok.".
 * `minutes: null` = nie publikować wiersza z czasem (pokazać tylko nazwę i link).
 */
export type DirectionEntry = {
  id: string;
  name: string;
  /** przybliżony czas dojazdu samochodem w minutach; null = niepotwierdzony */
  minutes: number | null;
  /** klucz strony lokalnej w i18n/routing.ts, jeśli istnieje */
  page?: "/quady-bialka-tatrzanska" | "/quady-bukowina-tatrzanska";
};

export const directions: readonly DirectionEntry[] = [
  { id: "zakopane", name: "Zakopane, centrum", minutes: null },
  { id: "bialka", name: "Białka Tatrzańska", minutes: null, page: "/quady-bialka-tatrzanska" },
  { id: "bukowina", name: "Bukowina Tatrzańska", minutes: null, page: "/quady-bukowina-tatrzanska" },
  { id: "poronin", name: "Poronin", minutes: null },
  { id: "koscielisko", name: "Kościelisko", minutes: null },
  { id: "murzasichle", name: "Murzasichle", minutes: null },
];
