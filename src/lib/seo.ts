import type { Metadata } from "next";
import { site } from "@/data/site";

/**
 * The build-time share card from app/opengraph-image.tsx.
 *
 * Restated here because Next replaces — rather than merges — an inherited
 * `openGraph` object when a page declares its own, which drops the image the
 * file convention would otherwise attach. Setting it explicitly keeps every
 * page's card intact.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name}: ${site.tagline}`,
};

type PageSeo = {
  /** Route path, leading slash. The homepage is "/". */
  path: string;
  /** Runs through the `%s | Formulyn` template unless `absoluteTitle`. */
  title: string;
  description: string;
  /**
   * Set on the homepage, whose title is already the full brand string and so
   * must not pick up the suffix a second time.
   */
  absoluteTitle?: boolean;
};

/**
 * Builds a page's metadata: its own canonical, and its own Open Graph card.
 *
 * Both used to be set once in the root layout and inherited. That is why
 * /industries, /journal, /contact and /process each canonicalised to the
 * homepage — telling Google they were duplicates of it — and why every page
 * on the site shared the homepage's OG title, description and URL.
 *
 * Routing every page through here means a new route cannot repeat either
 * mistake: both are computed from the path it is given. The root layout no
 * longer sets `alternates` at all, so a page that somehow skips this helper
 * emits no canonical (harmless — Google self-canonicalises) rather than
 * inheriting a wrong one.
 */
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: PageSeo): Metadata {
  const url = new URL(path, site.url).toString();

  // The layout's title template applies to <title> but not to the OG or
  // Twitter cards, so the suffixed form is spelled out for them here.
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_AU",
      title: socialTitle,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
