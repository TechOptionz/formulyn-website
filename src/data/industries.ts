/** Content for the /industries page. */

export const industriesHero = {
  eyebrow: "Industries · 07 Active Categories",
  heading: "Where our formulas end up",
  body: "Seven categories, one standard of evidence. Each has its own regulatory pathway, stability profile, and sensory expectations.",
} as const;

export type Industry = {
  index: string;
  /** Also the expected image filename — see `image` below. */
  slug: string;
  title: string;
  body: string;
  /** Capability pills under the copy. Six to eight reads best. */
  tags: string[];
  /**
   * Photography for the card.
   *
   * Drop the file in `public/industries/` and set `src` to its path — the
   * placeholder frame states the expected path on the card itself. While `src`
   * is empty the card renders that frame in the photo's place, so the layout
   * is already final and nothing shifts when the image lands.
   *
   * Portrait crop, roughly 4:5, 1200×1500 or larger.
   */
  image: { src: string; alt: string };
};

export const industries: Industry[] = [
  {
    index: "01",
    slug: "supplements",
    title: "Supplements",
    body: "Capsules, powders, and sachets dosed to the level the evidence supports — formulated across demographic segments rather than to a single generic adult profile.",
    tags: [
      "Vitamins & minerals",
      "Capsules",
      "Powders",
      "Sachets",
      "Gummies",
      "Pre/post-workout",
      "Sleep",
      "Immune",
    ],
    image: {
      src: "/industries/supplements.webp",
      alt: "Capsules and powdered actives weighed out on a formulation bench",
    },
  },
  {
    index: "02",
    slug: "nutraceuticals",
    title: "Nutraceuticals",
    body: "Clinically-positioned actives with graded evidence behind every claim, so the dossier holds when a regulator, a retailer, or a competitor decides to read it closely.",
    tags: [
      "Adaptogens",
      "Nootropics",
      "Probiotics",
      "Cardiovascular",
      "Digestive",
      "Clinical dossiers",
    ],
    image: {
      src: "/industries/nutraceuticals.webp",
      alt: "Botanical extracts and reference literature laid out for review",
    },
  },
  {
    index: "03",
    slug: "skincare",
    title: "Skincare",
    body: "Emulsions and serums built as systems rather than single products, balanced for efficacy, texture, and preservation at the concentration the evidence supports.",
    tags: [
      "Serums",
      "Moisturisers",
      "Cleansers",
      "Acne systems",
      "Sensitive skin",
      "Preservation",
    ],
    image: {
      src: "/industries/skincare.webp",
      alt: "Serum dropper and cream jar on a pale stone surface",
    },
  },
  {
    index: "04",
    slug: "pet-wellness",
    title: "Pet Wellness",
    body: "Species-appropriate dosing and palatability that survives real feeding — companion formulas are not scaled-down human formulas, and we do not treat them as such.",
    tags: [
      "Joint",
      "Digestive",
      "Skin & coat",
      "Anxiety",
      "Palatability",
      "AU / EU / US",
    ],
    image: {
      src: "/industries/pet-wellness.webp",
      alt: "Pet supplement chews and powder beside a feeding bowl",
    },
  },
  {
    index: "05",
    slug: "functional-food-beverages",
    title: "Functional Food & Beverages",
    body: "Actives delivered at dose without wrecking taste or mouthfeel, then held there through the shelf life the format and the supply chain actually demand.",
    tags: [
      "Beverages",
      "Powders",
      "Chews",
      "Bars",
      "Masking",
      "Mouthfeel",
      "Shelf stability",
    ],
    image: {
      src: "/industries/functional-food-beverages.webp",
      alt: "Functional beverage being poured beside blended powders",
    },
  },
  {
    index: "06",
    slug: "topicals",
    title: "Topicals",
    body: "Penetration, stability, and microbiological safety, all at once — balms, gels, and creams where the delivery system decides whether the active ever reaches its target.",
    tags: [
      "Balms",
      "Gels",
      "Creams",
      "Transdermal",
      "Actives delivery",
      "Micro safety",
    ],
    image: {
      src: "/industries/topicals.webp",
      alt: "An open tin of balm and a dish of cream beside a swatch drawn across pale stone",
    },
  },
  {
    index: "07",
    slug: "cosmeceuticals",
    title: "Cosmeceuticals",
    body: "Actives positioned between skincare and pharma, backed by evidence strong enough to defend — and dosed to the concentration the studies used, not the one that markets well.",
    tags: [
      "Retinoids",
      "Peptides",
      "Exfoliating acids",
      "Brightening",
      "Barrier repair",
      "Claim substantiation",
    ],
    image: {
      src: "/industries/cosmeceuticals.webp",
      alt: "Active concentrate in amber glass beside a dish of pearlescent cream",
    },
  },
];

/** The inverted final tile that closes the run of industry cards. */
export const industriesCta = {
  index: "[ + ]",
  title: "Something else?",
  body: "If it can be formulated and defended with evidence, bring it to the call. Constraint-heavy briefs are the interesting ones.",
  cta: { label: "Start a brief →", href: "/contact" },
} as const;
