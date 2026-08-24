import { coLeader, founder } from "@/data/about";
import { industries } from "@/data/industries";
import { site } from "@/data/site";

const ORG_ID = `${site.url}/#organization`;
const FOUNDER_ID = `${site.url}/#founder`;
const COO_ID = `${site.url}/#coo`;

/**
 * Site-wide entity graph, emitted once from the root layout.
 *
 * Written as a @graph with stable @id values so the organisation and the
 * founder cross-reference each other as one resolvable entity each, rather
 * than as two unrelated blobs repeated per page. Answer engines lean on this
 * heavily for a business they have not encountered before.
 *
 * Deliberately absent — do not add without the underlying fact:
 *   foundingDate, telephone, streetAddress, ABN  — not published anywhere on
 *     the site, and schema is the wrong place to introduce an unverifiable
 *     claim.
 *   aggregateRating — the homepage's "5.0 · 7 curated reviews" are collected
 *     and hosted by the business on its own site. Google's guidelines exclude
 *     self-serving reviews from review rich results, so marking them up risks
 *     a manual action rather than stars. Let the Google Business Profile
 *     carry the rating.
 */
export const siteLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      slogan: site.tagline,
      logo: new URL("/logo-wordmark.webp", site.url).toString(),
      image: new URL("/logo-wordmark.webp", site.url).toString(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Brisbane",
        addressRegion: "QLD",
        addressCountry: "AU",
      },
      areaServed: [
        { "@type": "Country", name: "Australia" },
        { "@type": "Place", name: "European Union" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Place", name: "Gulf Cooperation Council" },
      ],
      knowsAbout: [
        "Nutraceutical formulation",
        "Cosmetic formulation",
        "Dietary supplement development",
        "TGA listed medicines",
        "ARTG registration",
        "EU CPNP notification",
        "UK SCPN notification",
        "GCC cosmetic registration",
        "Stability testing",
        "Bioavailability",
        "GMP manufacturer sourcing",
        ...industries.map((industry) => industry.title),
      ],
      founder: [{ "@id": FOUNDER_ID }, { "@id": COO_ID }],
      sameAs: [site.linkedin, site.instagram],
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: founder.name,
      jobTitle: founder.role,
      description: founder.bio,
      image: new URL(founder.photo.src, site.url).toString(),
      worksFor: { "@id": ORG_ID },
      knowsAbout: [
        "Biochemistry",
        "Nutraceutical formulation",
        "Cosmetic formulation",
        "Pharmaceutical formulation",
      ],
      sameAs: [founder.linkedin],
    },
    {
      /* The other half of the practice. Everything here is stated on his own
         LinkedIn profile. `alumniOf` names the university and stops there —
         the profile does not name a qualification, and this is the last place
         to guess at one. */
      "@type": "Person",
      "@id": COO_ID,
      name: coLeader.name,
      jobTitle: coLeader.role,
      description: coLeader.bio,
      image: new URL(coLeader.photo.src, site.url).toString(),
      worksFor: { "@id": ORG_ID },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Griffith University",
      },
      knowsAbout: ["Business operations", "Social work", "Community services"],
      sameAs: [coLeader.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-AU",
    },
  ],
};

/** A `Service` node for a service detail page, tied to the organisation. */
export function serviceLd(detail: {
  slug: string;
  heading: string;
  metaDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${detail.slug}/#service`,
    name: detail.heading,
    description: detail.metaDescription,
    url: new URL(`/services/${detail.slug}`, site.url).toString(),
    serviceType: detail.heading,
    provider: { "@id": ORG_ID },
    areaServed: [
      { "@type": "Country", name: "Australia" },
      { "@type": "Place", name: "European Union" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Place", name: "Gulf Cooperation Council" },
    ],
  };
}

/**
 * Breadcrumb trail. Pass the ancestors only — the current page is appended
 * from the values given, and Home is prepended.
 */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}

/** Serialises a node for `dangerouslySetInnerHTML`, escaping `<` so a stray
    tag inside any string value cannot close the script element early. */
export function ldJson(node: unknown): string {
  return JSON.stringify(node).replace(/</g, "\u003c");
}
