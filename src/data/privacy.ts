/** Content for the /privacy page — Formulyn's company policies. */

export const privacyHero = {
  eyebrow: "Company policies",
  heading: "Formulyn — Company Policies",
  body: "A few things we like to be upfront about with everyone we work with.",
} as const;

/**
 * When the policies last changed. `iso` feeds the `<time datetime>` attribute
 * so the date is machine-readable; `label` is the form the page prints.
 */
export const privacyUpdated = {
  iso: "2026-08-09",
  label: "9 August 2026",
} as const;

export type PolicyClause = {
  /** Display number, and the map key. */
  index: string;
  title: string;
  /** Body copy, one string per paragraph. */
  body: string[];
  /** Bulleted points under the body, where the clause has any. */
  points?: string[];
};

export const policyClauses: PolicyClause[] = [
  {
    index: "01",
    title: "How We Work",
    body: [
      "Every project moves through three stages — Formulation, Regulatory & Compliance, and Manufacturer Sourcing. We keep you in the loop at each stage, and nothing moves forward without your sign-off.",
    ],
  },
  {
    index: "02",
    title: "Confidentiality & NDAs",
    body: ["Whatever you share with us about your product or idea stays between us."],
    points: [
      "Happy to sign an NDA whenever you'd like — before, during, or after our first call.",
      "We don't pass your information on to anyone else, including manufacturers, without your okay.",
    ],
  },
  {
    index: "03",
    title: "Intellectual Property",
    body: ["It's your product, your idea, and your IP — always."],
    points: [
      "Once we hand a project over, the formula, the research behind it, and all the documentation are fully yours.",
      "We don't hold onto any rights to reuse your formula or brand for anything else.",
    ],
  },
  {
    index: "04",
    title: "Manufacturing Independence",
    body: [
      "We don't manufacture, and we don't get anything from pointing you toward a manufacturer. Whoever you choose to produce with — including someone we didn't recommend — is entirely up to you.",
    ],
  },
  {
    index: "05",
    title: "Cancellations & Changes",
    body: [
      "Things change, and we get that. If a project needs to pause or stop, we'll work it out together based on what's already been done. If the scope of a project shifts along the way, we'll always talk it through and agree on it in writing before doing any extra work.",
    ],
  },
  {
    index: "06",
    title: "Regulatory Guidance",
    body: [
      "We stay on top of the frameworks that matter for your product (TGA, FDA, CPNP, and others), and we'll guide you through them. That said, our guidance supports your journey — it isn't a substitute for your own independent legal sign-off where that's needed.",
    ],
  },
  {
    index: "07",
    title: "How We Communicate",
    body: [
      "You'll be working directly with Rumi, start to finish — not passed between account managers. We check in at every major milestone, and you can always reach out with questions in between.",
    ],
  },
  {
    index: "08",
    title: "Data & Privacy",
    body: [
      "Any personal or business information you share with us is used only for the purposes of your project, and we take reasonable care to keep it secure.",
    ],
  },
];
