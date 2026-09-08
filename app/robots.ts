import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** Nie blokujemy crawlerów AI — firma żyje z tego, że ktoś ją znajdzie (docs/pakiet/04-SEO-GEO-SCHEMA.md §6). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
