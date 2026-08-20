/** Content for the home page. */

export const hero = {
  eyebrow: "Methodology · 4 Phases · 8–16 Weeks to Dossier",
  /** Rendered as two lines, with a gold full stop after the last word. */
  headingLines: ["From brief", "to batch"],
  body: "A fixed-scope, fixed-price protocol. Each phase has one tangible deliverable and a clear go / no-go gate, so you are never committed beyond the next milestone.",
  primaryCta: { label: "Book a 30-min call", href: "/contact" },
  secondaryCta: { label: "The methodology →", href: "/process" },
  image: {
    /* Served from public/ — never hot-link the domain this site replaces. */
    src: "/hero-amber.jpg",
    alt: "Amber botanical tincture in laboratory glass",
  },
  badge: { value: "340+", label: "Reference compounds" },
} as const;

export const heroStats = [
  { value: "5+", label: "Years in R&D" },
  { value: "07", label: "Active categories" },
  { value: "340", label: "Reference compounds" },
  { value: "30 min", label: "Discovery call" },
] as const;

/**
 * The industries ticker below the hero. Repeated twice in the marquee to make
 * the loop seamless. Categories only — a delivery method (liposomal, say)
 * breaks the pattern and reads as incoherent alongside the rest.
 */
export const marqueeItems = [
  "Supplements",
  "Nutraceuticals",
  "Skincare",
  "Cosmeceuticals",
  "Pet Wellness",
  "Functional Food & Beverages",
  "Topicals",
] as const;

export const intro = {
  eyebrow: "What we do",
  heading: "Someone has to care about your product as much as you do",
  lead: "Formulyn is a boutique nutraceutical and cosmetic formulation consultancy, crafting evidence-led supplement, skincare, and wellness formulations, from raw molecular brief to regulatory-ready product, without manufacturing conflicts.",
  body: "You get the same people from the first call to the final dossier. We don't just hand you a formula — we hand you the reasoning behind it, so you own it like it's your own intellectual property, because it is.",
  tags: ["Evidence-led", "Regulatory-ready", "No manufacturing conflicts"],
} as const;

/** `lead` renders in cream, `highlight` in gold, as one continuous sentence. */
export const manifesto = {
  eyebrow: "Why founders come to us",
  lead: "Somewhere between your idea and a real product, most consultancies hand you a catalogue and call it formulation. We don't.",
  highlight:
    "We start from what's in your head — not what's already on a shelf — and build the evidence to back it.",
} as const;

export const situationsSection = {
  eyebrow: "How we help",
  heading: "Three situations we're usually called into",
  intro:
    "Different starting points, same outcome: a formula you own, backed by evidence you can defend.",
} as const;

/** `index` is carried in the data, as the mandates and principles are. */
export type Situation = {
  index: string;
  quote: string;
  problem: string;
  response: string;
};

export const situations: Situation[] = [
  {
    index: "[01]",
    quote: `"I'm not a scientist, and I don't want to walk into a manufacturer meeting sounding like I don't know what I'm talking about."`,
    problem:
      "You know exactly what you want the product to do. What's missing is the technical vocabulary to hold your ground while it gets built.",
    response:
      "We arm you with a formula and a dossier you understand inside out — so you walk into every room as the expert on your own product.",
  },
  {
    index: "[02]",
    quote: `"My product works, but the margin and shelf life don't."`,
    problem:
      "Costs climb, stability fails at month nine, and customers notice the texture changing.",
    response:
      "Reformulate around the actives that earn their place, then design the stability protocol that proves it holds.",
  },
  {
    index: "[03]",
    quote: `"I can't tell whether my claims will survive a regulator."`,
    problem:
      "Dosages are guesswork, the label promises more than the evidence supports, and launch keeps slipping.",
    response:
      "Grade the literature, set defensible dosages, and map the TGA / FDA / EU pathway before anything goes to print.",
  },
];

export const practiceSection = {
  eyebrow: "Practice · 01–03",
  heading: "Molecular rigor",
  intro:
    "Three core mandates, each scoped, costed, and delivered with the same scientific discipline regardless of brand stage.",
  /**
   * The section's single route out, in place of a link on every card. Left
   * unanchored: /services is meant to be read from the top, and it carries a
   * fourth mandate beyond the three summarised here.
   */
  more: { label: "See all mandates", href: "/services" },
} as const;

export type Mandate = {
  index: string;
  title: string;
  body: string;
};

export const mandates: Mandate[] = [
  {
    index: "[01]",
    title: "Custom Formulation",
    body: "From a single-line brief to a fully validated formula — ingredient selection, dose optimisation, and a stability protocol built in from the first draft, not bolted on at the end.",
  },
  {
    index: "[02]",
    title: "Optimisation & Reformulation",
    body: "Refine efficacy, sensorial profile, cost basis, and regulatory posture without compromising integrity.",
  },
  {
    index: "[03]",
    title: "Dosage Consultancy",
    body: "Precision dosing, synergistic combinations, and safety-threshold review for known ingredient lists.",
  },
];

export const caseStudiesSection = {
  eyebrow: "Case studies · Selected work",
  heading: "Briefs we've taken to batch",
  intro:
    "Client names withheld under NDA. These case studies reflect the depth of work included once a project begins — book a discovery call to scope yours.",
} as const;

export type CaseStudy = {
  category: string;
  title: string;
  body: string;
  /**
   * Served from public/ at 1024×640 (16:10), matching the card thumbnail.
   * Representative product photography — never a client's actual packaging,
   * and never anything bearing a legible label or mark.
   */
  image: { src: string; alt: string };
  /** One or two figures. Anything stated here has to be defensible under NDA. */
  metrics: { value: string; label: string }[];
};

/**
 * Real engagements, anonymised. Identified by industry and work performed only —
 * client names are withheld under NDA, so never add one here.
 */
export const caseStudies: CaseStudy[] = [
  {
    category: "Skincare · EU market",
    title: "EU-market entry for a manuka-based skincare ointment",
    body: "A therapeutic skincare product needed full EU compliance to launch — safety documentation, ingredient compliance, and regulatory sign-off, not just a formula.",
    image: {
      src: "/case-skincare-manuka.webp",
      alt: "An open amber glass jar of golden manuka balm on a dark laboratory bench, with manuka blossom, honeycomb, pipettes and a microscope alongside",
    },
    metrics: [
      { value: "2 SKUs", label: "Cleared" },
      { value: "EU CPNP", label: "Pathway navigated" },
    ],
  },
  {
    category: "Supplements · Paediatric",
    title: "A five-active chewable vitamin built for young children",
    body: "Gluten- and lactose-free, five variable actives, and a delivery format kids will actually take — built for reliable dosing on a commercial tablet press.",
    image: {
      src: "/case-paediatric-chewable.webp",
      alt: "Pastel chewable vitamin tablets gathered on a dark slate surface under warm side light",
    },
    metrics: [
      { value: "5", label: "Actives at full dose" },
      { value: "GF+DF", label: "Free-from compliant" },
    ],
  },
  {
    category: "Functional food & beverage",
    title:
      "A frozen-format collagen product, engineered to sidestep therapeutic classification",
    body: "The brief called for a popsicle-format marine collagen stick — formulated deliberately as a food product, not a therapeutic good, to simplify the regulatory pathway.",
    image: {
      src: "/case-collagen-frozen.jpg",
      alt: "A frozen collagen popsicle standing on a dark slate surface",
    },
    metrics: [
      { value: "2", label: "Formulation options" },
      { value: "3", label: "Flavour variants delivered" },
    ],
  },
  {
    category: "Supplements · TGA listed",
    title: "A magnesium gummy built for ARTG listing",
    body: "A returning client's second product with Formulyn — reformulated and structured specifically for TGA ARTG listing requirements.",
    image: {
      src: "/case-magnesium-gummy.webp",
      alt: "Translucent amber gummies in clear glass dishes on dark slate, backlit so the light passes through them",
    },
    metrics: [{ value: "ARTG", label: "Listing done" }],
  },
  {
    category: "Functional beverage",
    title: "An adaptogenic drink built from concept to formula",
    body: "A functional adaptogenic beverage taken from concept through to a deliverable formula.",
    image: {
      src: "/case-adaptogenic-drink.jpg",
      alt: "A glass of steaming amber adaptogenic infusion on dark slate, with ginseng root, a beaker and flasks behind",
    },
    metrics: [{ value: "Ready", label: "For production" }],
  },
];

export const testimonialsSection = {
  eyebrow: "Field Notes · Verified Google Reviews",
  heading: "What clients say",
  /** Both are fallbacks — the live listing's score and total replace them
      once GOOGLE_PLACE_ID is set. */
  rating: "5.0",
  reviewCount: "7 curated reviews",
} as const;

export type Testimonial = {
  quote: string;
  attribution: string;
  /** Stars drawn on the card, 1–5. Omit for the five-star default. */
  rating?: number;
  /** Link to the review on Google. Set on synced reviews, not curated ones. */
  href?: string;
};

/**
 * Verified Google reviews, as published on formulyn.com.au.
 *
 * Hand-curated, and the fallback whenever the Places API is unset or
 * unreachable — so this list is what the homepage shows on its own. Reviews
 * Google returns that are not already here are appended to it at render time;
 * see src/lib/reviews/index.ts.
 */
export const testimonials: Testimonial[] = [
  {
    quote: `"Formulyn are masters at what they do. Glad I found them."`,
    attribution: "Murad A (unomed) · Ireland · April 2026",
  },
  {
    quote: `"I have been working with them for the past three months and have received excellent support in formulation as well as compliance with Australian TGA and EU regulations. I would highly recommend their services."`,
    attribution: "Babar K. · March 2026",
  },
  {
    quote: `"The team was professional and communicative throughout the process. They took the time to clearly explain their research findings and how certain ingredients were chosen or excluded, which I found particularly valuable."`,
    attribution: "Fatima M. · UAE · December 2025",
  },
  {
    quote: `"Great formulations. Love the results. And this scientist is great to communicate with."`,
    attribution: "Manahil · January 2026",
  },
  {
    quote: `"She helped me optimise my formula! Great experience."`,
    attribution: "James W. · March 2026",
  },
  {
    quote: `"She is super talented! Loved her formulations!!"`,
    attribution: "Olivia P. · November 2025",
  },
  {
    quote: `"Great experience!!"`,
    attribution: "Washma A. · March 2026",
  },
];
