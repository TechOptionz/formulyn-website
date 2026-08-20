/**
 * Global site configuration: identity, navigation and contact details.
 * Anything that appears in more than one place lives here.
 */

import { serviceNavItems } from "@/data/services";

/** Icon keys for nav children; resolved by `serviceIcons` in ui/icons.tsx. */
export type NavIconName = "flask" | "dossier" | "facility";

/**
 * A page listed underneath a nav item. Carrying the blurb and the icon here
 * keeps the dropdown and the mobile accordion driven entirely by data.
 */
export type NavChild = {
  label: string;
  href: string;
  description: string;
  icon: NavIconName;
};

export type NavLink = {
  label: string;
  href: string;
  /**
   * When present the item renders as a dropdown on the desktop rail and an
   * accordion in the mobile drawer, instead of a plain link.
   */
  children?: NavChild[];
  /**
   * Label for the link back to the section's own page, shown in the head of
   * the dropdown. Defaults to "All <label>".
   */
  overviewLabel?: string;
};

export const site = {
  name: "Formulyn",
  url: "https://formulyn.com.au",
  tagline: "From brief to batch.",
  description:
    "Boutique nutraceutical and cosmetic formulation consultancy. Evidence-led supplement, skincare, and wellness formulations from molecular brief to regulatory-ready product.",
  email: "info@formulyn.com.au",
  location: "Brisbane, Australia",
  locationLong: "Brisbane, Australia · Serving clients globally",
  googleReviewsUrl: "https://www.google.com/search?q=Formulyn+Brisbane",
  /** The company page, not the founder's profile — that one lives on `founder`
      in data/about.ts. Also emitted as `sameAs` on the Organization JSON-LD. */
  linkedin: "https://www.linkedin.com/company/formulyn/",
  instagram: "https://www.instagram.com/formulyn/",
  availability: "Accepting briefs for Q3",
  copyright: "© 2026 Formulyn. All rights reserved.",
} as const;

/**
 * Primary navigation, in order. The CTA is defined separately below.
 *
 * Contact and the Initiate Brief button both land on /contact — the brief
 * intake form and the contact details live on the same page. The plain link
 * is there for people looking for an address rather than a call to action,
 * which is how the live site does it too.
 */
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    // The /services page frames the practice as four mandates.
    overviewLabel: "All four mandates",
    children: serviceNavItems,
  },
  { label: "Process", href: "/process" },
  { label: "Industries", href: "/industries" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const navCta: NavLink = { label: "Initiate Brief", href: "/contact" };

/**
 * Footer "Practice" column — the nav minus Home and Contact. Services leads
 * the column because it leads the nav. Contact is omitted here because the
 * adjacent Consultancy column already carries the address, the email and the
 * discovery-call link.
 */
const FOOTER_OMIT = new Set(["/", "/contact"]);

export const footerPracticeLinks: NavLink[] = navLinks.filter(
  (link) => !FOOTER_OMIT.has(link.href),
);

export const footerBlurb =
  "Research and development consultancy building evidence-led formulations for supplement, skincare, and wellness brands across Australia and beyond.";
