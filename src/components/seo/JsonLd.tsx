import { ldJson } from "@/lib/structured-data";

/**
 * Emits one JSON-LD node. Server-rendered into the HTML, so it is in the
 * markup a crawler sees on first fetch — no client JS involved.
 */
export function JsonLd({ node }: { node: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ldJson(node) }}
    />
  );
}
