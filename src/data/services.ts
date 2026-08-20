/**
 * Content for /services and its detail pages.
 *
 * These URLs exist on the live site and are in its sitemap, so the slugs
 * here must not change — renaming one drops an indexed page.
 */

import type { NavChild } from "@/data/site";

export const servicesHero = {
  eyebrow: "Services · Four Mandates",
  heading: "Practice disciplines",
  body: "Fixed scope, fixed price, quoted per mandate. Each ends at a go / no-go gate, so you are never committed beyond the next milestone.",
} as const;

export type Mandate = {
  index: string;
  title: string;
  tagline: string;
  body: string;
  /** Detail page, where one exists. */
  href?: string;
};

export const mandates: Mandate[] = [
  {
    index: "[01]",
    title: "Launch-Ready Formula Development",
    tagline: "From concept to compliant formula.",
    body: "Complete product development: ingredient research, literature review, dosage optimisation, stability testing, manufacturing recommendations, and regulatory alignment for TGA / ARTG, EU CPNP and multi-market standards. Built for new brands and first-time founders.",
  },
  {
    index: "[02]",
    title: "Formulation Optimisation & Reformulation",
    tagline: "Refine an existing product without compromising integrity.",
    body: "Cost optimisation, sensory improvement, bioavailability enhancement, stability work, and compliance reformulation for brands who already have a product and need it to perform better.",
  },
  {
    index: "[03]",
    title: "Expert Formula Consultation",
    tagline: "Precision guidance for founders who need direction, not a full build.",
    body: "Ingredient and dosage review, synergistic analysis, safety assessment, efficacy-based dosing, regulatory review, and market positioning for brands with a formula that needs an expert read.",
  },
  {
    index: "[04]",
    title: "Custom Project",
    tagline: "Bespoke engagements scoped to your exact brief.",
    body: "Complex, multi-product briefs spanning formulation, compliance and manufacturer vetting — scoped and priced up front.",
  },
];

export type ServiceDetail = {
  slug: string;
  eyebrow: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  includesHeading: string;
  includes: { title: string; body: string }[];
  processHeading: string;
  process: { step: string; title: string; body: string }[];
  audience: string;
  faqHeading: string;
  /**
   * Answers are drawn from the assistant's knowledge base in data/chat-prompt.ts
   * so the page and the bot never contradict each other, and they hold to the
   * same rules it does: no fixed prices, no guaranteed dates, nothing asserted
   * that the practice has not committed to elsewhere. Edit both together.
   *
   * Also emitted as FAQPage structured data by the detail page.
   */
  faqs: { question: string; answer: string }[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "formulation-development",
    eyebrow: "Service · Formulation Development",
    heading: "Custom nutraceutical & cosmetic formulation development",
    metaTitle: "Custom Nutraceutical & Cosmetic Formulation Development",
    metaDescription:
      "Custom supplement and skincare formulations built from the ground up — grounded in biochemistry, aligned with Australian regulatory standards, and designed to work.",
    lead: "Your product idea deserves more than a generic formula off a manufacturer's shelf. We develop custom formulations built from the ground up — grounded in biochemistry, aligned with Australian regulatory standards, and designed to actually work.",
    includesHeading: "What the engagement includes",
    includes: [
      {
        title: "Ingredient selection & rationale",
        body: "Evidence-based active selection with dose justification for every slot in the formula.",
      },
      {
        title: "Excipient & base design",
        body: "Capsules, tablets, powders, gummies, liquids and topicals — the base engineered for the format.",
      },
      {
        title: "Compatibility & stability",
        body: "Interaction screening before the pilot batch, not after the first customer complaint.",
      },
      {
        title: "Regulatory format alignment",
        body: "Built to TGA Listed Medicine and ARTG requirements from the first draft.",
      },
      {
        title: "Halal-certified pathways",
        body: "Ingredient screening for halal and plant-based product lines.",
      },
      {
        title: "Phase 1 formulation dossier",
        body: "A client-owned document you can hand to any manufacturer.",
      },
    ],
    processHeading: "How it runs",
    process: [
      {
        step: "01",
        title: "Discovery call",
        body: "Thirty minutes to scope the brief, the market and the regulatory pathway.",
      },
      {
        step: "02",
        title: "Formulation",
        body: "Literature review, dosage modelling and draft matrix, delivered as a dossier.",
      },
      {
        step: "03",
        title: "Manufacturer briefing",
        body: "The dossier goes to your manufacturer with a structured technical brief.",
      },
      {
        step: "04",
        title: "Ongoing support",
        body: "Sampling and iteration until the batch matches the brief.",
      },
    ],
    audience:
      "For founders, brand managers and entrepreneurs developing a custom product — particularly halal or plant-based lines.",
    faqHeading: "Questions we're asked before a brief",
    faqs: [
      {
        question: "Do I need a finished concept before we start?",
        answer:
          "No. Most briefs arrive as an idea and a market rather than a specification, and no scientific background is assumed — every decision is explained in plain terms. Bring the concept, the competitors and the claims you want to make, and the discovery call turns them into a scope.",
      },
      {
        question: "Do you manufacture the product as well?",
        answer:
          "No, and that is deliberate. We sit upstream of manufacturing and take nothing from it, so an active is chosen because the evidence supports it — not because a particular plant already stocks it.",
      },
      {
        question: "Who owns the formula at the end?",
        answer:
          "You do. Full IP is assigned to you at handover, and that includes the reasoning behind every ingredient and dose rather than the final matrix alone. The formula is yours to take to any manufacturer.",
      },
      {
        question: "Can you work on a product that already exists?",
        answer:
          "Yes. Reformulation and optimisation run through the same formulation step — whether the goal is a cleaner label, a better-absorbed form of an active, or a product that has stopped performing against its competitors.",
      },
      {
        question: "Is stability testing included?",
        answer:
          "We design and specify the testing; an independent laboratory runs it. It is an optional add-on, quoted separately, so a brief that does not need it is not paying for it.",
      },
      {
        question: "How long does it take, and how is it priced?",
        answer:
          "Indicatively around sixteen weeks end to end, though that moves with category, complexity and testing. Scope and price are fixed per phase and confirmed after the discovery call, with milestone payments rather than a lump sum.",
      },
    ],
  },
  {
    slug: "regulatory-compliance",
    eyebrow: "Service · Regulatory Compliance",
    heading: "Regulatory compliance & multi-market registration",
    metaTitle: "Regulatory Compliance & Multi-Market Product Registration",
    metaDescription:
      "TGA, EU CPNP, UK SCPN, GCC/SFDA and Southeast Asian registration pathways for supplement and cosmetic brands, with dossier preparation and claim scoping.",
    lead: "Regulatory compliance is the difference between a product that sells and a product that sits in a warehouse. We map the pathway before anything goes to print.",
    includesHeading: "Markets we cover",
    includes: [
      {
        title: "Australia — TGA",
        body: "Therapeutic Goods Administration listing and ARTG pathways.",
      },
      {
        title: "European Union — CPNP",
        body: "Cosmetic Products Notification Portal submissions.",
      },
      {
        title: "United Kingdom — SCPN",
        body: "Submit Cosmetic Product Notification for the post-Brexit UK market.",
      },
      {
        title: "GCC — SFDA",
        body: "Saudi Arabia, UAE, Kuwait, Bahrain, Qatar and Oman.",
      },
      {
        title: "Southeast Asia",
        body: "Malaysia, Indonesia and Singapore.",
      },
      {
        title: "Multi-market packages",
        body: "One coordinated strategy across several jurisdictions at once.",
      },
    ],
    processHeading: "What you receive",
    process: [
      {
        step: "01",
        title: "Ingredient review",
        body: "Market-specific screening against each regulator's permitted list.",
      },
      {
        step: "02",
        title: "Pathway recommendation",
        body: "The route to market, with the evidence each regulator will ask for.",
      },
      {
        step: "03",
        title: "Label & claim scoping",
        body: "Compliance review of the label, and claims graded against the literature.",
      },
      {
        step: "04",
        title: "Dossier & submission",
        body: "Documentation prepared and lodged through the relevant portal.",
      },
    ],
    audience:
      "For Australian brands planning to export, international brands entering Australia, and founders launching across several markets at once.",
    faqHeading: "Questions we're asked about market entry",
    faqs: [
      {
        question: "Which markets can you take a product into?",
        answer:
          "The TGA in Australia, CPNP in the European Union, SCPN in the United Kingdom, SFDA across the GCC, and the Southeast Asian regulators in Malaysia, Indonesia and Singapore. Several markets can run as one coordinated strategy rather than one after another.",
      },
      {
        question: "Can you tell me which claims I am allowed to make?",
        answer:
          "Yes. Claims are graded against the published literature and against each regulator's permitted indications, so you know which survive scrutiny and which need rewording — before the label goes to print rather than after.",
      },
      {
        question: "What happens if an ingredient is not permitted in my target market?",
        answer:
          "It is flagged during the ingredient review and we propose alternatives that hold the formula's intent. Finding it at submission, with packaging already printed, is what costs months.",
      },
      {
        question: "Do you lodge the submission, or only prepare it?",
        answer:
          "Both. The dossier is prepared and lodged through the relevant portal, and the documentation stays with you afterwards.",
      },
      {
        question: "How long does registration take?",
        answer:
          "It depends on the market and on the regulator's own queue. We scope an indicative timeline per jurisdiction in the proposal rather than promise a date that is not ours to control.",
      },
      {
        question: "Can you review a formula we already have?",
        answer:
          "Yes. An existing formula can be screened against a target market's permitted lists and its claims assessed against the evidence, before you commit to the launch.",
      },
    ],
  },
  {
    slug: "manufacturer-sourcing",
    eyebrow: "Service · Manufacturer Sourcing",
    heading: "Manufacturer sourcing & GMP clearance navigation",
    metaTitle: "Supplement & Cosmetic Manufacturer Sourcing and GMP Clearance",
    metaDescription:
      "Independent manufacturer shortlisting, TGA GMP clearance verification, capability matching and quote review for supplement and cosmetic brands.",
    lead: "Finding the right manufacturer is one of the hardest parts of bringing a product to market — and one of the most consequential. We take the guesswork out of it by vetting partners for TGA GMP clearance, capability fit and minimum-order viability.",
    includesHeading: "What the engagement includes",
    includes: [
      {
        title: "Identification & shortlisting",
        body: "Two to three vetted manufacturers matched to your format and volume.",
      },
      {
        title: "TGA GMP clearance verification",
        body: "Clearance confirmed before you send anyone your formula.",
      },
      {
        title: "Capability matching",
        body: "Format, volume and certification checked against what each plant can actually run.",
      },
      {
        title: "Technical briefing package",
        body: "Your dossier sent out with a structured brief, so quotes are comparable.",
      },
      {
        title: "Quote facilitation",
        body: "Quotes gathered and normalised into a like-for-like comparison.",
      },
      {
        title: "China manufacturing guidance",
        body: "For brands weighing offshore production, with the compliance trade-offs made explicit.",
      },
    ],
    processHeading: "How it runs",
    process: [
      {
        step: "01",
        title: "Discovery call",
        body: "Format, volume targets, budget and timeline.",
      },
      {
        step: "02",
        title: "Manufacturer shortlist",
        body: "Two to three suitable manufacturers identified and vetted.",
      },
      {
        step: "03",
        title: "Technical brief",
        body: "The formulation dossier goes out with a structured briefing.",
      },
      {
        step: "04",
        title: "Quote review",
        body: "Quotes compared side by side so the decision is an informed one.",
      },
    ],
    audience:
      "For founders who need a manufacturer identified, brands wanting an independent review of their current one, and anyone needing a TGA-compliant alternative at short notice.",
    faqHeading: "Questions we're asked about sourcing",
    faqs: [
      {
        question: "Do you take a commission from the manufacturers you recommend?",
        answer:
          "No, and that is the reason the shortlist is worth reading. We take nothing from manufacturing, so a plant appears on it because it fits the brief — never because it pays to be there.",
      },
      {
        question: "Am I obliged to use one of your manufacturers?",
        answer:
          "No. The shortlist is a recommendation, not a requirement. You are free to use your own, and the formulation can be built to that plant's capabilities instead.",
      },
      {
        question: "How do you know a manufacturer is legitimate?",
        answer:
          "TGA GMP clearance is verified before your formula is sent anywhere, alongside a capability check that the plant can actually run your format, your volume and any certification the line depends on.",
      },
      {
        question: "Will I know the minimum order quantities before I commit?",
        answer:
          "Yes. MOQ sits in the shortlist beside cost, location and packaging, so the commercial picture is visible before you open a conversation with anyone.",
      },
      {
        question: "Can you help if I am considering manufacturing offshore?",
        answer:
          "Yes, China included, with the compliance trade-offs stated plainly at the outset rather than discovered later at the border.",
      },
      {
        question: "What if my current manufacturer is not working out?",
        answer:
          "The incumbent is reviewed independently and, where it is warranted, we identify a TGA-compliant alternative — including at short notice when supply is at risk.",
      },
    ],
  },
];

export function getServiceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((detail) => detail.slug === slug);
}

/**
 * The Services nav dropdown.
 *
 * Each entry is a précis of the detail page it points at — the wording is
 * drawn from that page's lead, scope and process above rather than written
 * separately, so the menu never drifts from the page. Keep descriptions to
 * roughly two lines at the menu's 420px width.
 *
 * Adding an entry here adds a row to the desktop dropdown and the mobile
 * accordion; nothing in the components needs to change. `icon` resolves
 * through `serviceIcons` in components/ui/icons.tsx.
 */
export const serviceNavItems: NavChild[] = [
  {
    label: "Formulation Development",
    href: "/services/formulation-development",
    description:
      "Evidence-led formulas built from the ground up — ingredient rationale, dosage modelling and stability work, delivered as a manufacturer-ready dossier.",
    icon: "flask",
  },
  {
    label: "Regulatory Compliance & Market Registration",
    href: "/services/regulatory-compliance",
    description:
      "TGA and ARTG pathways through EU CPNP, UK SCPN and GCC — ingredient screening, label and claim review, and dossiers lodged in each market.",
    icon: "dossier",
  },
  {
    label: "Manufacturer Sourcing & GMP Clearance",
    href: "/services/manufacturer-sourcing",
    description:
      "Independent shortlisting of manufacturers, verified for TGA GMP clearance, capability and minimum-order viability — with no manufacturing conflicts.",
    icon: "facility",
  },
];
