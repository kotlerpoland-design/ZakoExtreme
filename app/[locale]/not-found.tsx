import { site } from "@/config/site";

/** 404 z telefonem — użytkownik z reklamy nie może trafić w ślepą uliczkę. */
export default function NotFound() {
  return (
    <main className="flex-1 px-5 py-16 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-semibold">404</h1>
      <p className="mt-3">Tej strony nie ma, ale my jesteśmy. / This page does not exist, but we do.</p>
      <a href={`tel:${site.phone.e164}`} className="mt-6 inline-flex rounded-md bg-accent px-6 py-4 font-display text-xl font-semibold text-accent-foreground">
        {site.phone.displayIntl}
      </a>
    </main>
  );
}
