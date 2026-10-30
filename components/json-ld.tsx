import { safeJsonLd } from "@/data/seo";

/** Schema.org structured data. `safeJsonLd` escapes `<` so content can't close the script tag. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
