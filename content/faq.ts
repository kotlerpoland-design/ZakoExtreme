/**
 * Bank FAQ — z tego obiektu generujemy treść widoczną I schema FAQPage (identyczna treść, jedno źródło).
 * Źródło: docs/pakiet/03-COPY-NAGLOWKI.md §5. Skład zestawów: docs/FAQ-PLAN.md §4.
 *
 * Reguły:
 * - Pierwsze zdanie odpowiedzi = pełna, samodzielna odpowiedź (do 320 znaków).
 * - Żadna odpowiedź nie zawiera liczby lat. Nigdy.
 * - `answer: null` = fakt niepotwierdzony; pytanie NIE jest renderowane ani wystawiane w schema.
 * - Znaczniki [[DO POTWIERDZENIA]] / [[TO CONFIRM]] tylko w komentarzach — w stringu wywalają bramkę A4.
 */
import { bringWithYou, listSentence, priceIncludes, priceIncludesSnowmobile } from "@/content/included";
import { prices } from "@/content/prices";

export type FaqId =
  // rdzeń (03-COPY-NAGLOWKI.md §5.1)
  | "prawo-jazdy" | "buggy-prawo-jazdy" | "uprawnienia" | "dzieci" | "dziecko-samo" | "co-w-cenie" | "ile-trwa"
  | "pogoda" | "jak-zarezerwowac" | "gdzie" | "atv" | "pierwszy-raz"
  // zimowe (§5.2 + docs/strony/SKUTERY-SNIEZNE.md §7)
  | "skutery-cena" | "skutery-co-w-cenie" | "skutery-prawo-jazdy" | "skutery-co-zabrac" | "skutery-sezon"
  // rola A — łapie ruch (FAQ-PLAN §2)
  | "cena-quad-buggy" | "cena-buggy" | "cena-za-osobe" | "quady-zima" | "dojazd-czas" | "nastolatki"
  // rola B — usuwa obiekcje (FAQ-PLAN §3)
  | "legalne" | "bezpieczenstwo" | "z-instruktorem" | "quad-czy-buggy" | "pasazer" | "co-zabrac"
  | "zadatek" | "odwolanie" | "czas-na-trasie" | "kaucja" | "flota" | "odbior-z-hotelu"
  | "jezyk-instruktorow" | "grupa-prywatna"
  // vouchery (/vouchery/) — treść przeniesiona ze starej strony, patrz 03-COPY §4
  | "voucher-jak-kupic" | "voucher-kwota" | "voucher-kiedy-realizacja"
  | "voucher-waznosc" | "voucher-forma" | "voucher-skutery";

export type FaqEntry = {
  id: FaqId;
  question: { pl: string; en: string };
  /** null = [[DO POTWIERDZENIA]] — nie publikować */
  answer: { pl: string; en: string } | null;
};

/** Czas wariantu słowami do zdania FAQ (skutery: 30 / 60 / 120 min). */
const DURATION_WORDS: Record<"pl" | "en", Record<number, string>> = {
  pl: { 30: "30 minut", 60: "godzinę", 120: "dwie godziny", 180: "trzy godziny" },
  en: { 30: "30 minutes", 60: "an hour", 120: "two hours", 180: "three hours" },
};

/** „od 200 zł za 30 minut, od 300 zł za godzinę i od 550 zł za dwie godziny" — z content/prices.ts, żeby FAQ nie rozjechało się z kartami. */
function snowmobilePriceList(locale: "pl" | "en"): string {
  const parts = prices.skutery.variants.map((v) => {
    const time = DURATION_WORDS[locale][v.durationMin] ?? `${v.durationMin} min`;
    return locale === "pl" ? `od ${v.priceFrom} zł za ${time}` : `from ${v.priceFrom} PLN for ${time}`;
  });
  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(", ")} ${locale === "pl" ? "i" : "and"} ${last}`;
}

function snowmobileSecondRider(): number {
  return prices.skutery.variants[0]?.secondRider ?? 0;
}

/** Cena „od" n-tego wariantu drabinki — do zdań FAQ o buggy (cennik potwierdzony 2026-09-11, cena za pojazd). */
function priceAt(product: "quady" | "buggy" | "buggy6" | "maverick", index: number): number {
  return prices[product].variants[index]?.priceFrom ?? 0;
}

export const faq: Record<FaqId, FaqEntry> = {
  "prawo-jazdy": {
    id: "prawo-jazdy",
    question: { pl: "Czy na quada potrzebne jest prawo jazdy?", en: "Do I need a driving licence to ride a quad in Zakopane?" },
    answer: {
      pl: "Nie, na wyprawę quadem z ZakoExtreme nie potrzebujesz prawa jazdy. Jeździsz z instruktorem po naszych sprawdzonych trasach, a przed wyjazdem dostajesz krótkie szkolenie i przejażdżkę próbną. Jeśli wolisz w ogóle nie prowadzić, weź buggy 6-osobowe — prowadzi jedna dorosła osoba, reszta jedzie razem.",
      en: "No, you do not need a driving licence for our quad tours. You ride with an instructor on our verified routes, after a short briefing and a practice ride.",
    },
  },
  "buggy-prawo-jazdy": {
    // Ten sam potwierdzony fakt co `prawo-jazdy` (bez prawa jazdy, z instruktorem), sformułowany o buggy — na stronie buggy
    // pytanie o quada brzmiałoby jak wklejone (docs/strony/BUGGY.md §9 poz. 5, §14).
    id: "buggy-prawo-jazdy",
    question: { pl: "Czy na buggy potrzebne jest prawo jazdy?", en: "Do I need a driving licence to drive a buggy in Zakopane?" },
    answer: {
      pl: "Nie, na wyprawę buggy z ZakoExtreme nie potrzebujesz prawa jazdy. Buggy prowadzisz sam, ale instruktor prowadzi grupę po naszych sprawdzonych trasach, a przed wyjazdem dostajesz krótkie szkolenie i przejażdżkę próbną. Jeśli wolisz w ogóle nie prowadzić, weź buggy 6-osobowe — prowadzi jedna dorosła osoba, reszta jedzie razem.",
      en: "No, you do not need a driving licence for our buggy tours. You drive the buggy yourself, but an instructor leads the group on our verified routes, after a short briefing and a practice ride. If you would rather not drive at all, take the 6-seater buggy — one adult drives and everyone else rides along.",
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
    // Znacznik #2 zamknięty 2026-09-10 treścią ze starej strony, potwierdzoną przez właścicielkę.
    // Lista pochodzi z content/included.ts — nie przepisywać jej tutaj ręcznie.
    // O ubezpieczeniu MILCZYMY: nie ma go na potwierdzonej liście, więc nie obiecujemy go w żadnym miejscu.
    id: "co-w-cenie",
    question: { pl: "Co jest wliczone w cenę?", en: "What is included in the price?" },
    answer: {
      pl: `W cenie wyprawy jest ${listSentence(priceIncludes, "pl")}. Na każdym wyjeździe jest z wami instruktor, a przed wyjazdem przechodzicie krótkie szkolenie i przejażdżkę próbną.`,
      en: `The price covers ${listSentence(priceIncludes, "en")}. An instructor rides with you on every trip, and you start with a short briefing and a practice ride.`,
    },
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
    answer: null, // [[DO POTWIERDZENIA: polityka pogodowa]] — znacznik #7
  },
  "jak-zarezerwowac": {
    id: "jak-zarezerwowac",
    question: { pl: "Jak zarezerwować termin?", en: "How do I book?" },
    answer: {
      pl: "Najszybciej telefonicznie pod +48 539 320 700 — odbieramy codziennie i od razu powiemy, co jest wolne. Możesz też zarezerwować online, wybierając termin w kalendarzu na tej stronie.",
      en: "The fastest way is to call +48 539 320 700 — we answer every day and can tell you right away what is available. You can also pick a date in the booking calendar on this page.",
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
    // Cennik potwierdzony 2026-09-11 (znacznik #1 zamknięty). Kwoty z content/prices.ts — nie przepisywać ręcznie.
    // Najmocniejsze pytanie pełnym zdaniem w koncie (docs/strony/SKUTERY-SNIEZNE.md §2) — pierwsze zdanie = pełna odpowiedź.
    // Zdanie zaczyna się od „skuter", bo bramka A2 („nigdy 300 zł") pomija trafienia w kontekście skuterów.
    id: "skutery-cena",
    question: { pl: "Ile kosztują skutery śnieżne w Zakopanem?", en: "How much do snowmobiles cost in Zakopane?" },
    answer: {
      pl: `Wyprawa skuterem śnieżnym kosztuje ${snowmobilePriceList("pl")}. Cena jest za skuter — druga osoba na tym samym skuterze to dopłata ${snowmobileSecondRider()} zł. W cenie jest ${listSentence(priceIncludesSnowmobile, "pl")}.`,
      en: `A snowmobile trip costs ${snowmobilePriceList("en")}. The price is per snowmobile — a second rider on the same snowmobile is an extra ${snowmobileSecondRider()} PLN. The price covers ${listSentence(priceIncludesSnowmobile, "en")}.`,
    },
  },
  "skutery-co-w-cenie": {
    // Potwierdzone 2026-09-11 (blokada C z docs/strony/SKUTERY-SNIEZNE.md §12). Lista z content/included.ts.
    id: "skutery-co-w-cenie",
    question: { pl: "Co jest wliczone w cenę wyprawy skuterem?", en: "What is included in the snowmobile price?" },
    answer: {
      pl: `W cenie wyprawy skuterem śnieżnym jest ${listSentence(priceIncludesSnowmobile, "pl")}. Na każdym wyjeździe jest z wami instruktor, a przed wyjazdem przechodzicie krótkie szkolenie i przejażdżkę próbną.`,
      en: `The snowmobile price covers ${listSentence(priceIncludesSnowmobile, "en")}. An instructor rides with you on every trip, and you start with a short briefing and a practice ride.`,
    },
  },
  "skutery-prawo-jazdy": {
    // Potwierdzone 2026-09-11 (blokada D). Własna odpowiedź, nie kopia quadów — inny pojazd.
    id: "skutery-prawo-jazdy",
    question: { pl: "Czy na skuter śnieżny potrzebne jest prawo jazdy?", en: "Do I need a licence for a snowmobile?" },
    answer: {
      pl: "Nie, na wyprawę skuterem śnieżnym z ZakoExtreme nie potrzebujesz prawa jazdy. Jedziesz z instruktorem po naszych trasach, a przed wyjazdem dostajesz szkolenie i przejażdżkę próbną, żeby złapać czucie skutera.",
      en: "No, you do not need a driving licence for our snowmobile trips. You ride with an instructor on our routes, after a briefing and a practice ride to get the feel of the snowmobile.",
    },
  },
  "skutery-co-zabrac": {
    id: "skutery-co-zabrac",
    question: { pl: "Co zabrać na wyprawę skuterem śnieżnym?", en: "What should I bring for a snowmobile tour?" },
    answer: null, // [[DO POTWIERDZENIA: co firma daje, a co klient przynosi]] — znacznik #2
  },
  "skutery-sezon": {
    id: "skutery-sezon",
    question: { pl: "Kiedy zaczyna się sezon na skutery śnieżne?", en: "When does the snowmobile season start?" },
    answer: {
      pl: "Sezon skuterowy trwa zwykle od listopada do lutego i zależy od śniegu. Zadzwoń pod +48 539 320 700 — powiemy, jakie są aktualnie warunki.",
      en: "Snowmobile season usually runs from November to February and depends on snow. Call +48 539 320 700 and we will tell you the current conditions.",
    },
  },

  /* ——— ROLA A: pytania pod SEO i AI search (FAQ-PLAN §2) ——— */

  "cena-quad-buggy": {
    id: "cena-quad-buggy",
    question: { pl: "Ile kosztuje wyprawa quadem w Zakopanem?", en: "How much does a quad tour in Zakopane cost?" },
    answer: {
      pl: "Wyprawa quadem kosztuje od 250 zł za godzinę na trasie 12–15 km. Dwie godziny to od 450 zł, a trzy od 650 zł — przy najdłuższym wariancie można doliczyć ognisko z grillem. Wszystkie ceny są cenami wyjściowymi: ostateczna zależy od długości trasy i liczby osób.",
      en: "A quad tour starts at 250 zł for one hour on a 12–15 km route. Two hours start at 450 zł and three hours at 650 zł, with an optional bonfire and grill on the longest option. These are entry prices — the final one depends on the route length and the number of people.",
    },
  },
  "cena-buggy": {
    id: "cena-buggy",
    // Liczby z content/prices.ts (potwierdzone 2026-09-11, cena ZA POJAZD) — FAQ nie może rozjechać się z kartami.
    // Kolejność wariantów buggy6: do 4 os. 1 h · do 6 os. 1 h · do 4 os. 2 h · do 6 os. 2 h.
    question: { pl: "Ile kosztuje buggy w Zakopanem?", en: "How much does a buggy cost in Zakopane?" },
    answer: {
      pl: `Buggy 2-osobowe kosztuje od ${priceAt("buggy", 0)} zł za godzinę, od ${priceAt("buggy", 1)} zł za dwie i od ${priceAt("buggy", 2)} zł za trzy — cena za buggy, w którym jadą maksymalnie dwie osoby. Buggy 6-osobowe: godzina kosztuje od ${priceAt("buggy6", 0)} zł dla maksymalnie 4 osób albo od ${priceAt("buggy6", 1)} zł dla maksymalnie 6 osób, dwie godziny odpowiednio od ${priceAt("buggy6", 2)} zł i od ${priceAt("buggy6", 3)} zł. Maverick XRS o mocy 240 KM — od ${priceAt("maverick", 0)} zł za godzinę dla maksymalnie 2 osób.`,
      en: `A 2-seater buggy starts at ${priceAt("buggy", 0)} PLN for one hour, ${priceAt("buggy", 1)} PLN for two and ${priceAt("buggy", 2)} PLN for three — the price is per buggy, for up to two people. The 6-seater buggy costs from ${priceAt("buggy6", 0)} PLN per hour for up to 4 people or from ${priceAt("buggy6", 1)} PLN for up to 6 people; two hours start at ${priceAt("buggy6", 2)} PLN and ${priceAt("buggy6", 3)} PLN respectively. The 240 HP Maverick XRS starts at ${priceAt("maverick", 0)} PLN per hour for up to 2 people.`,
    },
  },
  "cena-za-osobe": {
    id: "cena-za-osobe",
    question: { pl: "Czy cena jest za osobę, czy za pojazd?", en: "Is the price per person or per vehicle?" },
    // [[DO POTWIERDZENIA: czy cena wejściowa QUADA dotyczy pojazdu, czy osoby]] — źródło zarzutu „300 za osobę" w opiniach 1★.
    // Buggy, buggy 6-os. i Maverick mają to rozstrzygnięte (2026-09-11: za pojazd) — mówią o tym `unit` na kartach i `cena-buggy`.
    answer: null,
  },
  "quady-zima": {
    id: "quady-zima",
    question: { pl: "Czy quady jeżdżą zimą?", en: "Do quads run in winter?" },
    answer: null, // [[DO POTWIERDZENIA: czy quady i buggy jeżdżą poza sezonem maj–wrzesień]]
  },
  "dojazd-czas": {
    id: "dojazd-czas",
    question: { pl: "Ile jedzie się do was z Białki lub z Bukowiny?", en: "How long does it take to reach you from Białka or Bukowina?" },
    answer: null, // [[DO POTWIERDZENIA: czasy dojazdu]] — znacznik #8; jedno źródło z content/directions.ts (minutes)
  },
  nastolatki: {
    id: "nastolatki",
    question: { pl: "Jakie macie atrakcje dla nastolatków?", en: "What do you offer for teenagers?" },
    answer: {
      pl: "Tak, jeździmy z młodzieżą — wariant dobieramy do konkretnej osoby, nie do metryki: osobny, ogrodzony tor pod opieką instruktora, jazda na trasie głównej z osobą dorosłą albo buggy 6-osobowe, którym prowadzi dorosły. Który wariant będzie odpowiedni, ustalamy telefonicznie przy rezerwacji, za zgodą rodzica lub opiekuna.",
      en: "Yes, we ride with teenagers — we match the option to the person, not to a birth certificate: a separate fenced track supervised by an instructor, riding with an adult on the main route, or the 6-seater buggy driven by an adult. We agree the right option by phone when you book, with the parent's or guardian's consent.",
    },
  },

  /* ——— ROLA B: obiekcje, które blokują rezerwację (FAQ-PLAN §3) ——— */

  legalne: {
    id: "legalne",
    // UWAGA: wolno napisać, ŻE jest legalnie — nie wolno napisać DLACZEGO (03-COPY §4.4, znacznik #5).
    // Zero zwrotów „teren prywatny", „to nie są drogi publiczne", „przepisy mówią X".
    question: { pl: "Czy to jest legalne?", en: "Is this legal?" },
    answer: {
      pl: "Tak. Jeździmy po własnych, sprawdzonych i legalnych trasach, zawsze z instruktorem i po krótkim szkoleniu przed wyjazdem. Legalne trasy są jednym z powodów, dla których działamy w Zakopanem najdłużej ze wszystkich firm tego typu.",
      en: "Yes. We ride on our own verified, legal routes, always with an instructor and after a short briefing. Legal routes are one of the reasons we have been operating in Zakopane longer than any other company of this kind.",
    },
  },
  bezpieczenstwo: {
    id: "bezpieczenstwo",
    // UWAGA: bez kasku, kombinezonu i ubezpieczenia — to znacznik #2, niepotwierdzony.
    question: { pl: "Czy to jest bezpieczne?", en: "Is it safe?" },
    answer: {
      pl: "Tak — na każdym wyjeździe jest z wami instruktor, trasy są sprawdzone, a tempo dobieramy do grupy, nie odwrotnie. Zaczynacie od krótkiego szkolenia i przejażdżki próbnej, żeby oswoić się z pojazdem, i dopiero potem wyjeżdżacie na trasę.",
      en: "Yes — an instructor is with you on every trip, the routes are verified, and the pace is set to the group, not the other way round. You start with a short briefing and a practice ride to get used to the vehicle, and only then head out.",
    },
  },
  "z-instruktorem": {
    id: "z-instruktorem",
    question: { pl: "Czy jadę sam, czy z instruktorem?", en: "Do I ride alone or with an instructor?" },
    answer: {
      pl: "Prowadzisz sam, ale nie jedziesz sam — instruktor prowadzi grupę na sprawdzonej, legalnej trasie i dobiera tempo do was. Jeździmy z doświadczonymi, lokalnymi instruktorami.",
      en: "You drive yourself, but you are not on your own — the instructor leads the group along a verified, legal route and sets the pace to you. Our instructors are experienced and local.",
    },
  },
  "quad-czy-buggy": {
    id: "quad-czy-buggy",
    question: { pl: "Co będzie lepsze — quad czy buggy?", en: "Which is better — a quad or a buggy?" },
    answer: {
      pl: `Quada prowadzisz sam i czujesz teren bezpośrednio, a buggy 4×4 ma kabinę i napęd na cztery koła, który radzi sobie tam, gdzie quad już nie wjedzie. Quad kosztuje od ${priceAt("quady", 0)} zł za godzinę, buggy 2-osobowe od ${priceAt("buggy", 0)} zł za godzinę — cena za buggy, dla maksymalnie dwóch osób. Jeśli jedziecie z dziećmi albo w większej grupie, najprostsze jest buggy 6-osobowe: prowadzi jedna dorosła osoba, reszta jedzie razem.`,
      en: `You drive a quad yourself and feel the terrain directly, while a 4×4 buggy has a cabin and four-wheel drive that gets through where a quad no longer will. A quad starts at ${priceAt("quady", 0)} PLN per hour, a 2-seater buggy at ${priceAt("buggy", 0)} PLN per hour — per buggy, for up to two people. If you are coming with children or in a larger group, the 6-seater buggy is the simplest option: one adult drives and everyone else rides along.`,
    },
  },
  pasazer: {
    id: "pasazer",
    question: { pl: "Czy można zabrać pasażera?", en: "Can I take a passenger?" },
    answer: null, // [[DO POTWIERDZENIA: czy jest opcja jazdy jako pasażer]] — znacznik #9
  },
  "co-zabrac": {
    // Odwrotność `co-w-cenie`, ten sam znacznik #2, to samo źródło (content/included.ts).
    // Dotyczy quadów i buggy. Zimowy odpowiednik `skutery-co-zabrac` zostaje niepotwierdzony — inny sprzęt, inne ubranie.
    id: "co-zabrac",
    question: { pl: "Co zabrać ze sobą na wyprawę?", en: "What should I bring for the trip?" },
    answer: {
      pl: `Weź ${listSentence(bringWithYou, "pl")} — resztę dostajesz od nas.`,
      en: `Bring ${listSentence(bringWithYou, "en")} — we provide the rest.`,
    },
  },
  zadatek: {
    id: "zadatek",
    question: { pl: "Czy trzeba płacić z góry? Jest zadatek?", en: "Do I have to pay in advance? Is there a booking deposit?" },
    answer: null, // [[DO POTWIERDZENIA: zadatek, metody i moment płatności]] — znacznik #3, priorytet 1 (przeciek 92% na checkoucie)
  },
  odwolanie: {
    id: "odwolanie",
    question: { pl: "Co, jeśli muszę odwołać albo przełożyć termin?", en: "What if I need to cancel or reschedule?" },
    answer: null, // [[DO POTWIERDZENIA: polityka odwołania i zmiany terminu]] — znacznik #4, ten sam przeciek
  },
  "czas-na-trasie": {
    id: "czas-na-trasie",
    question: { pl: "Czy godzina to czas na trasie, czy razem ze szkoleniem?", en: "Is the hour time on the route, or does it include the briefing?" },
    // [[DO POTWIERDZENIA: co dokładnie wlicza się w czas wyprawy]] — drugi zarzut z opinii 1★ („2 h skrócone do 1 h").
    // `ile-trwa` mówi „doliczcie kilkanaście minut na szkolenie" — potwierdzamy, że tak jest w praktyce, zanim obiecamy to drugi raz.
    answer: null,
  },
  kaucja: {
    id: "kaucja",
    question: { pl: "Co, jeśli uszkodzę pojazd? Jest kaucja?", en: "What if I damage the vehicle? Is there a security deposit?" },
    answer: null, // [[DO POTWIERDZENIA: kaucja, ubezpieczenie, do jakiej kwoty odpowiada klient]]
  },
  flota: {
    id: "flota",
    question: { pl: "Ile macie pojazdów?", en: "How many vehicles do you have?" },
    answer: null, // [[DO POTWIERDZENIA: liczba i modele pojazdów we flocie]] — znacznik #13
  },
  "odbior-z-hotelu": {
    id: "odbior-z-hotelu",
    question: { pl: "Czy odbieracie z hotelu?", en: "Do you pick up from the hotel?" },
    answer: null, // [[DO POTWIERDZENIA: czy jest transport / odbiór z hotelu]]
  },
  "jezyk-instruktorow": {
    id: "jezyk-instruktorow",
    question: { pl: "Czy instruktorzy mówią po angielsku?", en: "Do your instructors speak English?" },
    answer: null, // [[DO POTWIERDZENIA: języki obsługi instruktorów]] — znacznik #10; „English-speaking instructors" jest w reklamach bez pokrycia
  },
  "grupa-prywatna": {
    id: "grupa-prywatna",
    question: { pl: "Jedziemy w grupie z innymi, czy tylko my?", en: "Do we ride in a group with strangers, or just us?" },
    answer: null, // [[DO POTWIERDZENIA: czy wyprawa jest prywatna, czy łączona]] — propozycja bez pokrycia w danych, do decyzji właściciela
  },

  /* VOUCHERY. Odpowiedzi przeniesione ze starej strony (żywa treść firmy), przeliczone na obowiązującą
     drabinkę 250/450/650 — stara strona budowała kwoty wokół błędnej ceny wejściowej. */
  "voucher-jak-kupic": {
    id: "voucher-jak-kupic",
    question: { pl: "Jak kupić voucher na wyprawę?", en: "How do I buy a gift voucher?" },
    answer: {
      pl: "Zadzwoń do nas — voucher ustalamy telefonicznie, bez formularzy i bez płatności online. Wspólnie wybieramy wariant wyprawy albo kwotę, ustalamy termin lub zostawiamy go otwartym i umawiamy się na formę przekazania vouchera.",
      en: "Call us — we arrange every voucher by phone, with no forms and no online payment. Together we pick the trip option or the amount, set a date or leave it open, and agree how you receive the voucher.",
    },
  },
  "voucher-kwota": {
    id: "voucher-kwota",
    question: { pl: "Czy kwota vouchera może być dowolna?", en: "Can I choose any amount for the voucher?" },
    answer: {
      pl: "Tak, kwota vouchera może być dowolna — dopasujemy ją do Twoich potrzeb i budżetu. Możesz też wybrać gotowy wariant wyprawy: STANDARD, PREMIUM albo ULTRA. Jeśli obdarowana osoba dopłaci różnicę, voucher pokryje część droższej wyprawy.",
      en: "Yes, a voucher can be issued for any amount — we match it to your budget. You can also pick a ready trip option: STANDARD, PREMIUM or ULTRA. If the person adds the difference, the voucher covers part of a longer trip.",
    },
  },
  "voucher-kiedy-realizacja": {
    id: "voucher-kiedy-realizacja",
    question: { pl: "Kto decyduje, kiedy voucher zostanie zrealizowany?", en: "Who decides when the voucher is used?" },
    answer: {
      pl: "Obdarowana osoba sama decyduje, kiedy chce zrealizować voucher — bez presji i bez formalności. Termin możemy ustalić już przy zakupie albo zostawić otwarty, a wtedy wystarczy, że osoba obdarowana zadzwoni i umówi się na pasujący jej dzień.",
      en: "The person who receives the voucher decides when to use it — no pressure, no paperwork. We can fix a date when you buy it or leave it open, and then they simply call us and book a day that suits them.",
    },
  },
  "voucher-waznosc": {
    id: "voucher-waznosc",
    question: { pl: "Jak długo voucher jest ważny?", en: "How long is the voucher valid?" },
    answer: null, // [[DO POTWIERDZENIA: okres ważności vouchera]] — stara strona nie podaje, właścicielka nie potwierdziła (03-COPY §8)
  },
  "voucher-forma": {
    id: "voucher-forma",
    question: { pl: "Voucher jest drukowany czy elektroniczny?", en: "Is the voucher printed or digital?" },
    answer: null, // [[DO POTWIERDZENIA: dostępne formy przekazania]] — stara strona mówi „drukowany / elektroniczny", niepotwierdzone
  },
  "voucher-skutery": {
    id: "voucher-skutery",
    question: { pl: "Czy voucher można zrealizować na skuterach śnieżnych zimą?", en: "Can the voucher be used for snowmobiles in winter?" },
    answer: null, // [[DO POTWIERDZENIA: realizacja vouchera na skuterach]] — drabinka skuterów ma confirmed:false, więc i tak brak podstawy
  },
};

/**
 * Zestawy FAQ per typ strony (kolejność ma znaczenie — najpierw największa bariera).
 * Skład: docs/FAQ-PLAN.md §4. Pytania bez potwierdzonej odpowiedzi zostają w zestawie,
 * ale `publishedFaq()` je odsiewa — po odpowiedzi Piotrka wchodzą same, bez zmiany kodu stron.
 */
export const faqSets = {
  home: ["prawo-jazdy", "dzieci", "cena-quad-buggy", "ile-trwa", "legalne", "jak-zarezerwowac"],
  quady: ["cena-quad-buggy", "atv", "quady-zima", "prawo-jazdy", "dzieci", "co-w-cenie", "co-zabrac", "czas-na-trasie", "legalne", "gdzie"],
  /** Buggy (docs/strony/BUGGY.md §9): cena → quad czy buggy → pasażer (niepotwierdzony, nie renderuje się) → prawo jazdy o buggy → dzieci (prowadzi do 6-os.). */
  buggy: ["cena-buggy", "quad-czy-buggy", "pasazer", "buggy-prawo-jazdy", "dzieci", "co-w-cenie", "legalne", "gdzie"],
  /** Skutery: cena → co w cenie → prawo jazdy → sezon (docs/strony/SKUTERY-SNIEZNE.md §7). Bez `dzieci` — odpowiedź jest o torze quadowym i buggy 6-os. */
  skutery: ["skutery-cena", "skutery-co-w-cenie", "skutery-prawo-jazdy", "skutery-sezon", "skutery-co-zabrac", "legalne", "gdzie", "jak-zarezerwowac", "pogoda"],
  cennik: ["cena-quad-buggy", "cena-buggy", "skutery-cena", "cena-za-osobe", "co-w-cenie", "zadatek", "odwolanie"],
  dzieci: ["dzieci", "dziecko-samo", "nastolatki", "pasazer", "bezpieczenstwo", "co-w-cenie"],
  bezPrawaJazdy: ["prawo-jazdy", "uprawnienia", "pierwszy-raz", "z-instruktorem", "legalne"],
  lokalna: ["dojazd-czas", "gdzie", "cena-quad-buggy", "prawo-jazdy", "jak-zarezerwowac"],
  /** Vouchery: najpierw proces zakupu, potem obiekcje kupującego prezent, na końcu wspólne pytania o wyprawę. */
  vouchery: ["voucher-jak-kupic", "voucher-kwota", "voucher-kiedy-realizacja", "voucher-waznosc", "voucher-forma", "voucher-skutery", "prawo-jazdy", "gdzie"],
  /** EN produktowe — zdefiniowane, jeszcze nie podpięte: strony biorą dziś jeden zestaw niezależnie od lokalizacji. */
  enProdukt: ["gdzie", "skutery-cena", "jezyk-instruktorow", "prawo-jazdy", "pierwszy-raz", "jak-zarezerwowac"],
} as const satisfies Record<string, readonly FaqId[]>;

/** Tylko pytania z potwierdzoną odpowiedzią — to jedyna funkcja, z której powinny korzystać komponenty. */
export function publishedFaq(ids: readonly FaqId[]) {
  return ids.map((id) => faq[id]).filter((entry): entry is FaqEntry & { answer: NonNullable<FaqEntry["answer"]> } => entry.answer !== null);
}
