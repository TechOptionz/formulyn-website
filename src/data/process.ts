/** Content for the /process page. */

export const processHero = {
  eyebrow: "Methodology · Steps 01 to 05",
  heading: "The process",
  body: "A five-step protocol that keeps your formulation, IP ownership, and choice of manufacturer entirely independent.",
} as const;

/**
 * The timeline bar above the step grid. `flex` is the proportional width of
 * each segment and `color` its token, matching the step durations below.
 */
export const timeline = [
  { flex: 2, color: "var(--c-gold)", label: "1 to 2" },
  { flex: 4, color: "var(--c-gold-mid)", label: "3 to 6" },
  { flex: 4, color: "var(--c-gold-pale)", label: "7 to 10" },
  { flex: 4, color: "var(--c-bronze)", label: "11 to 14" },
  { flex: 2, color: "var(--c-ink-solid)", label: "15 to 16" },
] as const;

export type Phase = {
  /** Anchor target, linked from the sticky step rail. */
  id: string;
  number: string;
  weeks: string;
  title: string;
  body: string;
  /** What the step covers, shown as the bulleted list. */
  includes: string[];
  /** What you hold at the end of the step. */
  deliverable: string;
};

export const phases: Phase[] = [
  {
    id: "discovery",
    number: "01",
    weeks: "Week 1 to 2",
    title: "Discovery call",
    body: "A structured intake to define your product vision, target market, claims, and regulatory scope before any formulation work begins.",
    includes: [
      "Product vision & positioning session",
      "Target market & claims review",
      "Regulatory pathway assessment (TGA / FDA / EU / CPNP)",
      "Feasibility & scope evaluation",
    ],
    deliverable: "Proposal & signed brief (NDA available on request)",
  },
  {
    id: "formulation",
    number: "02",
    weeks: "Week 3 to 6",
    title: "Formulation",
    body: "Evidence-led formula development, from ingredient selection to a fully validated formulation matrix, backed by published research.",
    includes: [
      "Literature review (PubMed / Cochrane)",
      "Ingredient long-list & evidence grading",
      "Bioavailability & dosage modelling",
      "Draft formulation matrix with rationale per active",
      "Reformulation & optimisation for existing products",
    ],
    deliverable: "Formula + evidence-based research dossier",
  },
  {
    id: "regulatory",
    number: "03",
    weeks: "Week 7 to 10",
    title: "Regulatory & compliance",
    body: "Translating your formula into what you can legally claim and sell, mapped to your target market's regulatory framework.",
    includes: [
      "Label & claims documentation",
      "TGA / FDA / CPNP compliance mapping",
      "Ingredient & safety documentation",
      "Regulatory dossier compilation",
    ],
    deliverable: "Regulatory file + approved claims and label copy",
  },
  {
    id: "manufacturing",
    number: "04",
    weeks: "Week 11 to 14",
    title: "Manufacturing",
    body: "Independent manufacturer matching. You choose who brings your formula to life, with full visibility on cost and capability.",
    includes: [
      "Three to four manufacturer options shortlisted",
      "MOQ, cost & location comparison",
      "Packaging & format compatibility check",
      "Manufacturer introductions on your terms",
    ],
    deliverable: "Manufacturer shortlist & comparison sheet",
  },
  {
    id: "handover",
    number: "05",
    weeks: "Week 15 to 16",
    title: "Handover",
    body: "Full sign-off and transfer: the formula, the evidence, and the IP are yours outright.",
    includes: [
      "Master formula & batch records",
      "Full IP assignment",
      "Final documentation handover",
    ],
    deliverable: "Complete dossier + IP transfer",
  },
];

/** Footnote under the step grid. */
export const processNote =
  "Optional services such as stability testing are available separately, priced on scope. They are not included in the core process above.";
