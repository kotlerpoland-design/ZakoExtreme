/**
 * Bank FAQ — z tego obiektu generujemy treść widoczną I schema FAQPage (identyczna treść, jedno źródło).
 * Źródło: docs/pakiet/03-COPY-NAGLOWKI.md §5.
 *
 * Reguły:
 * - Pierwsze zdanie odpowiedzi = pełna, samodzielna odpowiedź (do 320 znaków).
 * - Żadna odpowiedź nie zawiera liczby lat. Nigdy.
 * - `answer: null` = fakt niepotwierdzony; pytanie NIE jest renderowane ani wystawiane w schema.
 */
export type FaqId =
  | "prawo-jazdy" | "uprawnienia" | "dzieci" | "dziecko-samo" | "co-w-cenie" | "ile-trwa"
  | "pogoda" | "jak-zarezerwowac" | "gdzie" | "atv" | "pierwszy-raz"
  | "skutery-cena" | "skutery-prawo-jazdy" | "skutery-co-zabrac" | "skutery-sezon";

export type FaqEntry = {
  id: FaqId;
  question: { pl: string; en: string };
  /** null = [[DO POTWIERDZENIA]] — nie publikować */
  answer: { pl: string; en: string } | null;
};

export const faq: Record<FaqId, FaqEntry> = {
  "prawo-jazdy": {
    id: "prawo-jazdy",
    question: { pl: "Czy na quada potrzebne jest prawo jazdy?", en: "Do I need a driving licence to ride a quad in Zakopane?" },
    answer: {
      pl: "Nie, na wyprawę quadem z ZakoExtreme nie potrzebujesz prawa jazdy. Jeździsz z instruktorem po naszych sprawdzonych trasach, a przed wyjazdem dostajesz krótkie szkolenie i przejażdżkę próbną. Jeśli wolisz w ogóle nie prowadzić, weź buggy 6-osobowe — prowadzi jedna dorosła osoba, reszta jedzie razem.",
      en: "No, you do not need a driving licence for our quad tours. You ride with an instructor on our verified routes, after a short briefing and a practice ride.",
    },
  },
  uprawnienia: {
    id: "uprawnienia",
    question: { pl: "Jakie uprawnienia trzeba mieć na quada?", en: "What permits do I need to ride a quad?" },
    answer: {
      pl: "Na naszych wyprawach nie są wymagane żadne uprawnienia ani prawo jazdy. Wystarczy, że przyjdziesz na umówioną godzinę — resztę omawiamy na miejscu, przed wyjazdem na trasę.",
      en: "No permits or driving licence are required on our tours. Just arrive at the agreed time — we cover everything else on site, before heading out.",
    },
  },
  dzieci: {
    id: "dzieci",
    question: { pl: "Czy można jechać z dzieckiem?", en: "Can children join the trip?" },
    answer: {
      pl: "Tak. Mamy trzy warianty: osobny, ogrodzony tor dla dzieci pod opieką instruktora; przejazd na trasie głównej, gdzie dziecko jedzie z osobą dorosłą; oraz buggy 6-osobowe, którym prowadzi jedna dorosła osoba. Który wariant będzie odpowiedni, ustalamy telefonicznie przy rezerwacji, za zgodą rodzica lub opiekuna.",
      en: "Yes. There is a separate fenced track for children supervised by an instructor, children can ride with an adult on the main route, and the 6-seater buggy is driven by one adult with everyone else riding along. We agree the right option by phone, with the parent's or guardian's consent.",
    },
  },
  "dziecko-samo": {
    id: "dziecko-samo",
    question: { pl: "Czy dziecko może prowadzić samo?", en: "Can a child drive on their own?" },
    answer: {
      pl: "Na osobnym, ogrodzonym torze dzieci jeżdżą pod opieką instruktora, za zgodą rodzica. Na trasie głównej dziecko jedzie z osobą dorosłą. Szczegóły ustalamy telefonicznie — zadzwoń i powiedz, z kim przyjeżdżasz.",
      en: "On the separate fenced track children ride under an instructor's supervision, with a parent's consent. On the main route a child rides with an adult. Call us and tell us who is coming — we will agree the details.",
    },
  },
  "co-w-cenie": {
    id: "co-w-cenie",
    question: { pl: "Co jest wliczone w cenę?", en: "What is included in the price?" },
    answer: null, // [[DO POTWIERDZENIA: kask, kombinezon, paliwo, instruktor, ubezpieczenie]]
  },
  "ile-trwa": {
    id: "ile-trwa",
    question: { pl: "Ile trwa wyprawa?", en: "How long does a tour take?" },
    answer: {
      pl: "Do wyboru są trzy warianty: godzinny (trasa 12–15 km), dwugodzinny i trzygodzinny. Przy trzygodzinnym można doliczyć ognisko z grillem. Do czasu jazdy doliczcie kilkanaście minut na szkolenie i przygotowanie sprzętu.",
      en: "There are three options: one hour (12–15 km route), two hours and three hours. The three-hour option can include a bonfire and grill. Add around fifteen minutes for the briefing and gear.",
    },
  },
  pogoda: {
    id: "pogoda",
    question: { pl: "Czy jeździcie, kiedy pada?", en: "Do you ride in the rain?" },
    answer: null, // [[DO POTWIERDZENIA: polityka pogodowa]]
  },
  "jak-zarezerwowac": {
    id: "jak-zarezerwowac",
    question: { pl: "Jak zarezerwować termin?", en: "How do I book?" },
    answer: {
      pl: "Najszybciej telefonicznie pod +48 539 320 700 — odbieramy całą dobę i od razu powiemy, co jest wolne. Możesz też zarezerwować online, wybierając termin w kalendarzu na tej stronie.",
      en: "The fastest way is to call +48 539 320 700 — we answer 24/7 and can tell you right away what is available. You can also pick a date in the booking calendar on this page.",
    },
  },
  gdzie: {
    id: "gdzie",
    question: { pl: "Gdzie dokładnie jesteście?", en: "Where exactly are you located?" },
    answer: {
      pl: "Rybkówka 16/2 w Zakopanem, blisko centrum. Dojeżdżają do nas goście z Białki Tatrzańskiej, Bukowiny Tatrzańskiej, Poronina, Kościeliska i Murzasichla — czas dojazdu podajemy w sekcji „Skąd do nas dojedziesz”.",
      en: "We are at Rybkówka 16/2 in Zakopane, close to the town center. Guests come to us from Białka Tatrzańska, Bukowina Tatrzańska, Poronin, Kościelisko and Murzasichle.",
    },
  },
  atv: {
    id: "atv",
    question: { pl: "Czym różni się quad od ATV?", en: "What is the difference between a quad and an ATV?" },
    answer: {
      pl: "Niczym — to ten sam pojazd. ATV to angielski skrót od all-terrain vehicle, czyli pojazd terenowy. Jeśli szukasz wypożyczalni ATV w Zakopanem, to jesteśmy my.",
      en: "Nothing — it is the same vehicle. ATV stands for all-terrain vehicle. If you are looking for ATV rental in Zakopane, that is us.",
    },
  },
  "pierwszy-raz": {
    id: "pierwszy-raz",
    question: { pl: "Nigdy nie jechałem quadem. Dam radę?", en: "I have never ridden a quad. Can I do it?" },
    answer: {
      pl: "Tak — większość naszych klientów jedzie pierwszy raz w życiu. Zaczynasz od krótkiego szkolenia i przejażdżki próbnej, a instruktor dobiera tempo do grupy, nie odwrotnie.",
      en: "Yes — most of our guests ride a quad for the first time in their life. You start with a short briefing and a practice ride, and the instructor sets the pace to the group.",
    },
  },
  "skutery-cena": {
    id: "skutery-cena",
    question: { pl: "Ile kosztuje wypożyczenie skutera śnieżnego w Zakopanem?", en: "How much does a snowmobile tour in Zakopane cost?" },
    answer: null, // [[DO POTWIERDZENIA: cennik skuterów]]
  },
  "skutery-prawo-jazdy": {
    id: "skutery-prawo-jazdy",
    question: { pl: "Czy na skuter śnieżny potrzebne jest prawo jazdy?", en: "Do I need a licence for a snowmobile?" },
    answer: null, // [[DO POTWIERDZENIA — inny pojazd, inne przepisy; nie kopiować odpowiedzi z quadów]]
  },
  "skutery-co-zabrac": {
    id: "skutery-co-zabrac",
    question: { pl: "Co zabrać na wyprawę skuterem śnieżnym?", en: "What should I bring for a snowmobile tour?" },
    answer: null, // [[DO POTWIERDZENIA: co firma daje, a co klient przynosi]]
  },
  "skutery-sezon": {
    id: "skutery-sezon",
    question: { pl: "Kiedy zaczyna się sezon na skutery śnieżne?", en: "When does the snowmobile season start?" },
    answer: {
      pl: "Sezon skuterowy trwa zwykle od listopada do lutego i zależy od śniegu. Zadzwoń pod +48 539 320 700 — powiemy, jakie są aktualnie warunki.",
      en: "Snowmobile season usually runs from November to February and depends on snow. Call +48 539 320 700 and we will tell you the current conditions.",
    },
  },
};

/** Zestawy FAQ per typ strony (kolejność ma znaczenie — najpierw największa bariera). */
export const faqSets = {
  home: ["prawo-jazdy", "dzieci", "co-w-cenie", "ile-trwa", "pogoda", "jak-zarezerwowac"],
  quady: ["prawo-jazdy", "dzieci", "co-w-cenie", "ile-trwa", "pogoda", "jak-zarezerwowac", "atv"],
  buggy: ["prawo-jazdy", "dzieci", "co-w-cenie", "ile-trwa", "pogoda", "jak-zarezerwowac"],
  skutery: ["skutery-cena", "skutery-prawo-jazdy", "skutery-co-zabrac", "skutery-sezon", "gdzie"],
  bezPrawaJazdy: ["prawo-jazdy", "uprawnienia", "pierwszy-raz"],
  dzieci: ["dzieci", "dziecko-samo", "co-w-cenie", "pogoda"],
  lokalna: ["gdzie", "prawo-jazdy", "dzieci", "jak-zarezerwowac"],
  cennik: ["co-w-cenie", "ile-trwa", "jak-zarezerwowac"],
} as const satisfies Record<string, readonly FaqId[]>;

/** Tylko pytania z potwierdzoną odpowiedzią — to jedyna funkcja, z której powinny korzystać komponenty. */
export function publishedFaq(ids: readonly FaqId[]) {
  return ids.map((id) => faq[id]).filter((entry): entry is FaqEntry & { answer: NonNullable<FaqEntry["answer"]> } => entry.answer !== null);
}
