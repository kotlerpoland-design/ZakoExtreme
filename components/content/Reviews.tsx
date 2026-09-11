import reviewsData from "@/content/reviews.json";
import { Reveal } from "@/components/primitives/Reveal";

type Review = { name: string; date: string; text: string; product?: string | null };

function allReviews(): Review[] {
  return (reviewsData as { reviews?: Review[] }).reviews ?? [];
}

/** Strona sprawdza to PRZED renderem sekcji, żeby nie zostawić samego nagłówka „Opinie". */
export function hasReviews(): boolean {
  return allReviews().length > 0;
}

/**
 * Wyłącznie prawdziwe opinie z eksportu Google (content/reviews.json). Pusty eksport = sekcja nie istnieje.
 * Bez aggregateRating/Review w schema. Bez opinii wspominających byłego przewodnika.
 */
export function Reviews({ limit = 3 }: { limit?: number }) {
  const reviews = allReviews().slice(0, limit);
  if (reviews.length === 0) return null;
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {reviews.map((r, i) => (
        <li key={`${r.name}-${r.date}`}>
          <Reveal delay={i * 0.06} className="h-full">
            <blockquote className="flex h-full flex-col rounded-lg bg-card p-6 shadow-card">
              <p className="flex-1 text-ink-2">„{r.text}”</p>
              <footer className="mt-5 font-display text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {r.name} · <time dateTime={r.date}>{r.date}</time>
              </footer>
            </blockquote>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
