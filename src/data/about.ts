/** Content for the /about page. */

export const aboutHero = {
  eyebrow: "About the practice",
  heading: "Formulation is engineered, not assembled",
} as const;

export const aboutBody = {
  heading: "We start where the catalogue stops",
  lead: "Formulyn is a boutique nutraceutical and cosmetic formulation consultancy, crafting evidence-led supplement, skincare, and wellness formulations — from raw molecular brief to regulatory-ready product, without manufacturing conflicts.",
  paragraphs: [
    "Formulyn was founded on a specific frustration: product development is usually constrained by what contract manufacturers already produce, rather than by what the evidence supports.",
    "So we sit upstream of manufacturing. Formulyn is an independent R&D function — loyal to the evidence, the regulator, and your roadmap, and to nothing else. Not to a manufacturer's quota, not to an ingredient supplier's margin.",
    "What you receive is a complete, defensible formula and the regulatory dossier to distribute it. The workings come with it.",
  ],
} as const;

/** The practice ledger — facts, set as a hairline definition list. */
export const practiceLedger = [
  { label: "Practice", value: "Independent formulation R&D" },
  { label: "Founded on", value: "Evidence over inventory" },
  { label: "Based", value: "Brisbane, Australia" },
  { label: "Serving", value: "Clients globally" },
  { label: "Categories", value: "07 active" },
  { label: "Engagements", value: "Fixed scope, fixed price" },
] as const;

export const principlesSection = {
  eyebrow: "Principles",
  heading: "Four commitments, and what they cost us",
} as const;

export type Principle = {
  index: string;
  name: string;
  line: string;
  body: string;
};

export const principles: Principle[] = [
  {
    index: "[01]",
    name: "Independence",
    line: "No manufacturer kickbacks. Ever.",
    body: "We sit upstream of manufacturing and take nothing from it. The formula is chosen because it is right, not because someone already makes it.",
  },
  {
    index: "[02]",
    name: "Evidence",
    line: "Peer-reviewed literature as default.",
    body: "Every active is defended by published work. Where the evidence is thin, we say so in writing rather than quietly rounding up.",
  },
  {
    index: "[03]",
    name: "Discretion",
    line: "Mutual NDA on serious briefs.",
    body: "Formulations, roadmaps, and commercial context stay yours. A mutual NDA is available before any sensitive disclosure.",
  },
  {
    index: "[04]",
    name: "Velocity",
    line: "Fixed-price, fixed-scope phases.",
    body: "Scope is agreed up front and priced up front. No open-ended retainers, no billable drift, and a decision gate at the end of every phase.",
  },
];

/**
 * The leadership block. The page argues for the practice first; this
 * establishes who stands behind it.
 */
export const leadershipSection = {
  eyebrow: "Who you work with",
  heading: "Leadership rooted in science. Driven by purpose",
  intro:
    "The people behind the practice — the science it stands on, and the way it is run.",
} as const;

/** One person in the leadership row. */
export type Leader = {
  name: string;
  role: string;
  photo: { src: string; alt: string };
  bio: string;
  credentials: readonly string[];
  linkedin: string;
  quote: string;
};

export const founder = {
  name: "Romaisa Irfan",
  role: "Founder & Chief Formulation Scientist",
  photo: {
    /* Pre-masked to a circle with a transparent surround, so it sits flush
       inside the round frame in LeadershipSection.
       The filename carries the year on purpose. Replacing a portrait in place
       leaves every image cache between here and the browser — Next's
       optimizer included — free to keep serving the previous one, and those
       caches key on the URL. Name the next one for its own year rather than
       overwriting this file. */
    src: "/founder-romaisa-2026.webp",
    alt: "Romaisa Irfan, Founder and Chief Formulation Scientist at Formulyn",
  },
  bio: "A biochemist with published research credentials and Masters-level R&D expertise spanning nutraceutical, cosmetic, and pharmaceutical formulations.",
  credentials: [
    "Biochemist, peer-reviewed publications",
    "Masters-level formulation R&D",
    "Nutraceutical · Cosmetic · Pharmaceutical",
  ],
  /** Also emitted as `sameAs` on the founder's Person node in the site JSON-LD,
      which is what ties this site's founder to the same real person. */
  linkedin: "https://www.linkedin.com/in/romaisa-irfan-b7336519a/",
  quote:
    "We treat each formula as a small thesis — defended by literature, stress-tested by trial, and shipped with its workings.",
} as const satisfies Leader;

/**
 * Sourced from his own LinkedIn profile — title, employer, location, and the
 * Griffith University entry are all stated there. Nothing here is inferred
 * beyond that: no degree is named because the profile names none, and the
 * earlier career is described by what it involved rather than by a job title.
 */
export const coLeader = {
  name: "Muhammad Abubakar Latif",
  /* Reordered against the profile's "Chief Operating Officer & Co-Founder" so
     it sets parallel to the founder's line above it. Same two facts. */
  role: "Co-Founder & Chief Operating Officer",
  photo: {
    /* Same circular pre-mask and year-stamped filename convention as above. */
    src: "/leader-abubakar-latif-2026.webp",
    alt: "Muhammad Abubakar Latif, Co-Founder and Chief Operating Officer at Formulyn",
  },
  bio: "Runs the operational and financial side of the practice, from client engagement through to project delivery — backed by years of frontline experience working directly with people and navigating complex, high-stakes systems.",
  /* Ordered to set parallel with the founder's list above: the qualification
     first, then the discipline, then the dot-separated remit last. */
  credentials: [
    "Educated at Griffith University",
    "Client relations and stakeholder communication",
    "Operations · Finance · Client experience",
  ],
  linkedin:
    "https://www.linkedin.com/in/muhammad-abubakar-latif-2a220816b/",
  quote:
    "Every client is treated with genuine care, not processed like a number. This business stays personal, even as it grows.",
} as const satisfies Leader;

/**
 * The row, in order — co-leader on the left, founder on the right.
 * `LeadershipSection` renders straight off this array, so both the order and a
 * third person are data edits: reorder here, or add someone and widen the grid
 * template in `LeadershipSection.module.css`.
 */
export const leaders: readonly Leader[] = [coLeader, founder];
