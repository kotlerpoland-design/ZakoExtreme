import Link from "next/link";
import { site } from "@/config/site";

/** 404 z CTA do rezerwacji online (telefon tylko jako tekst na pytania) — użytkownik z reklamy nie może trafić w ślepą uliczkę. Renderowane poza kontekstem locale → dwujęzycznie. */
export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16">
      <p className="font-display text-display-2xl font-semibold uppercase leading-none text-muted-foreground">404</p>
      <p className="mt-4 text-lg">Tej strony nie ma, ale my jesteśmy. / This page does not exist, but we do.</p>
      <Link
        href="/#rezerwacja"
        prefetch={false}
        className="mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-lg bg-primary px-6 font-display text-xl font-semibold uppercase tracking-wide text-primary-foreground shadow-card"
      >
        Rezerwuj online / Book online
      </Link>
      <p className="mt-6 text-sm text-ink-2">
        Masz pytania? / Questions?{" "}
        <a href={`tel:${site.phone.e164}`} className="font-display font-medium tabular text-brand underline-offset-4 hover:underline">
          {site.phone.displayIntl}
        </a>
      </p>
    </main>
  );
}
