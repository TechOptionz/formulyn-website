import { founder } from "@/data/about";
import { industries } from "@/data/industries";
import { serviceDetails, serviceNavItems } from "@/data/services";
import { site } from "@/data/site";

/**
 * /llms.txt — an emerging convention: a plain-markdown brief for language
 * models, pointing at the pages worth reading rather than making them infer
 * the site's shape from navigation.
 *
 * Generated from the same data files the pages render from, so it cannot
 * drift the way a hand-maintained static file would. Every claim here is one
 * the site already makes somewhere — do not add a fact to this file that is
 * not on a page.
 */
export const dynamic = "force-static";

function url(path: string) {
  return new URL(path, site.url).toString();
}

export function GET() {
  const body = `# ${site.name}

> ${site.description}

${site.name} is an independent nutraceutical and cosmetic formulation
consultancy based in ${site.location}, founded by ${founder.name}
(${founder.role}). It develops custom supplement, skincare, functional food
and pet wellness formulations for brands entering the Australian (TGA/ARTG),
EU (CPNP), UK (SCPN) and GCC markets. Engagements are fixed-scope and
fixed-price, quoted per mandate, and each ends at a go / no-go gate.
${site.name} does not manufacture and takes no commission from manufacturers.

## Services

${serviceNavItems
  .map((item) => `- [${item.label}](${url(item.href)}): ${item.description}`)
  .join("\n")}

## Key pages

- [Services overview](${url("/services")}): the four mandates, and how each is scoped and priced.
- [Process](${url("/process")}): the four phases from brief to manufacturer-ready dossier.
- [Industries](${url("/industries")}): the categories the practice formulates for.
- [About](${url("/about")}): the practice, its principles, and the founder.
- [Journal](${url("/journal")}): notes on formulation science and regulation.
- [Contact](${url("/contact")}): brief intake and discovery call.

## Categories served

${industries.map((industry) => `- ${industry.title}`).join("\n")}

## Detailed service pages

${serviceDetails
  .map(
    (detail) =>
      `- [${detail.heading}](${url(`/services/${detail.slug}`)}): ${detail.metaDescription}`,
  )
  .join("\n")}

## Contact

- Email: ${site.email}
- Location: ${site.locationLong}
- LinkedIn: ${site.linkedin}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
