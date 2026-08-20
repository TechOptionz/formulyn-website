/** Content for the /contact page and the closing CTA banner. */

import { site } from "@/data/site";

export const contactHero = {
  eyebrow: "Next step",
  heading: "Begin with a 30-minute discovery call",
  body: "A focused conversation to understand your product and scope what's possible — no pressure, no pitch.",
} as const;

/** A text input in the brief form's two-column field grid. */
export type BriefField = {
  name: string;
  label: string;
  type: "text" | "email";
  required: boolean;
  autoComplete: string;
};

export const briefForm = {
  title: "Send a brief",
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      autoComplete: "name",
    },
    {
      name: "company",
      label: "Brand / Company",
      type: "text",
      required: false,
      autoComplete: "organization",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      autoComplete: "email",
    },
  ] as BriefField[],
  /**
   * Rendered last in the field grid so the rows read
   * Name / Brand — Email / Category.
   */
  category: {
    name: "category",
    label: "Category",
    placeholder: "Select a category",
    options: [
      "Supplements & nutraceuticals",
      "Skincare & cosmetics",
      "Functional food & beverage",
      "Sports nutrition",
      "Pet health",
      "Something else",
    ],
  },
  message: {
    name: "message",
    label: "The brief",
    rows: 6,
    help: "What are you building, who is it for, and which market does it need to clear?",
  },
  consent: {
    name: "consent",
    label:
      "I consent to a single follow-up email about this brief. Mutual NDA available on request before any sensitive disclosure.",
  },
  submitLabel: "Initiate brief",
  footnote: "We reply to qualified briefs within one business day, AEST.",
} as const;

/** Icon keys for the contact rail; resolved by `contactIcons` in ui/icons.tsx. */
export type ContactIconName = "mail" | "pin" | "clock" | "shield";

export type ContactChannel = {
  icon: ContactIconName;
  label: string;
  value: string;
  meta?: string;
  href?: string;
};

/** The four facts a prospect checks before sending anything sensitive. */
export const contactChannels: ContactChannel[] = [
  {
    icon: "mail",
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: "pin",
    label: "Location",
    value: site.location,
    meta: "Serving clients globally",
  },
  {
    icon: "clock",
    label: "Response",
    value: "One business day",
    meta: "Qualified briefs, AEST",
  },
  {
    icon: "shield",
    label: "Confidentiality",
    value: "Mutual NDA",
    meta: "Available on request",
  },
];

/** What follows a submitted brief — numbered under the contact rail. */
export const briefSteps = [
  {
    title: "You send the brief",
    body: "What you are building, who it is for, and which market it has to clear. A paragraph is enough to start.",
  },
  {
    title: "We reply within a business day",
    body: "If it is outside what we do, we will say so immediately and point you somewhere useful.",
  },
  {
    title: "Thirty minutes on a call",
    body: "Free, confidential, no obligation. You leave with a feasibility read whether or not we work together.",
  },
] as const;

/** The gold CTA banner shown at the foot of every page except /contact. */
export const ctaBanner = {
  eyebrow: "Next step",
  heading: "Begin with a 30-minute discovery call",
  body: "A focused conversation to understand your product and scope what's possible — no pressure, no pitch.",
  /* Anchored on the brief form, not the page: the banner is rendered on every
     route, and a bare /contact href is a dead click for anyone already there. */
  cta: { label: "Book the call →", href: "/contact#brief" },
} as const;
