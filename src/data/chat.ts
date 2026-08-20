/**
 * Copy and demo knowledge for the chat assistant.
 *
 * The bot's actual training is the system prompt in src/data/chat-prompt.ts.
 * The Q&A below powers the DEMO provider only — the offline fallback that
 * answers when CHAT_API_URL is unset (see src/lib/chat/provider.ts). It
 * mirrors the same knowledge and obeys the same hard rules, so the bot never
 * contradicts itself depending on which provider is live. Change the prompt
 * and these entries together.
 *
 * `suggestions` and the UI copy are used in both modes.
 */

import { site } from "./site";

export const chatUi = {
  launcherLabel: "Ask a question",
  launcherAriaLabel: "Open chat",
  title: "Formulyn assistant",
  subtitle: "Formulation questions, answered",
  closeLabel: "Close chat",
  placeholder: "Ask about process, timelines, categories…",
  sendLabel: "Send",
  briefCta: "Start a brief",
  disclaimer:
    "General guidance only. Anything specific to your formula is scoped on a call.",
} as const;

export const greeting =
  "Hello. I can answer questions about how we work — the process, timelines, categories, IP and regulatory pathways. What are you working on?";

/**
 * Tappable starter questions on the opening screen. Clicking one sends it
 * through the same path as the composer, so the answer comes from the system
 * prompt rather than a canned reply.
 */
export const suggestions = [
  "What exactly does Formulyn do?",
  "What does the process look like, start to finish?",
  "Who will I be working with?",
  "How much does a project cost?",
  "I just have an idea — can you still help?",
] as const;

/** ---- Lead capture ------------------------------------------------- */

export const leadFlow = {
  intro:
    "Happy to get this in front of the team. Three quick questions — you can stop at any point.",
  name: "First, what's your name?",
  email: "Thanks. What's the best email to reach you on?",
  brief: "And in a sentence — what are you trying to make?",
  invalidEmail: "That doesn't look like an email address. Mind checking it?",
  success:
    "Got it — thank you. We'll be in touch within one business day. If you'd rather book a time directly, the discovery call link is on the contact page.",
  failure: `Something went wrong sending that through. Email ${site.email} and it'll reach the same place.`,
} as const;

/** ---- Demo knowledge base ------------------------------------------ */

export type DemoAnswer = {
  /** Lower-case keywords; more matches wins. */
  keywords: string[];
  answer: string;
};

export const demoAnswers: DemoAnswer[] = [
  {
    keywords: [
      // Matching is whole-phrase, so "what does formulyn do" alone misses
      // "what exactly does Formulyn do". Keep the short spans too.
      "formulyn do",
      "what do you do",
      "what does formulyn do",
      "who are you",
      "what is formulyn",
      "services",
      // No "help with" — it is a question template ("can you help with TGA
      // compliance?"), so as a phrase it outscored the specific entries.
    ],
    answer:
      "Formulyn is a boutique nutraceutical and cosmetic formulation R&D consultancy — we turn a product idea into a validated, evidence-backed formula and a regulatory-ready dossier. We don't manufacture, deliberately, so the formula is built around what the product needs rather than what a factory happens to stock. We then help you find and compare independent manufacturers.",
  },
  {
    keywords: ["how long", "timeline", "time", "weeks", "duration", "fast"],
    answer:
      "Indicatively around 16 weeks, though it varies with scope — category, regulatory pathway and how much testing the product needs all move it. The discovery call is where we scope yours properly.",
  },
  {
    keywords: ["cost", "price", "pricing", "budget", "quote", "expensive"],
    answer:
      "Every project is scoped and quoted against its own brief, so there's no price list and no generic range I can give you. It's phase-based with milestone payments rather than a lump sum, and the number is confirmed after the 30-minute discovery call once we understand complexity, category and scope.",
  },
  {
    // Whole-word matching, so plurals need spelling out: "own" misses "owns".
    keywords: [
      "ip",
      "own",
      "owns",
      "ownership",
      "rights",
      "patent",
      "formula mine",
    ],
    answer:
      "You do. There's a full IP assignment at Handover, including the reasoning behind every ingredient — not just the formula sheet. Your information is treated as confidential throughout, and an NDA can be signed at any point.",
  },
  {
    keywords: [
      "who will i be working with",
      "who works on",
      "team",
      "founder",
      "rumi",
      "romaisa",
      "scientist",
      "formulator",
    ],
    answer:
      "Formulyn was founded by Romaisa Irfan — \"Rumi\" — a biochemist with postgraduate R&D and formulation expertise, and its Founder and Chief Formulation Scientist. You work directly with Rumi from the first call through to handover.",
  },
  {
    keywords: [
      "just an idea",
      "only an idea",
      "idea",
      "getting started",
      "beginner",
      "first time",
      "new to this",
      "scientific background",
    ],
    answer:
      "Yes — an idea is enough to start, and no scientific background is needed; the reasoning gets explained in plain terms as we go. We work with first-time founders and established brands alike. Bring whatever you have to the call: a concept, a target market, claims you'd like to make, competitors, or just a rough sketch of the product.",
  },
  {
    keywords: ["manufacture", "manufacturing", "factory", "produce", "moq"],
    answer:
      "No — and deliberately so. We're formulation-only and manufacturer-agnostic, with no factory to fill and no ingredient stock to move. At the Manufacturing step you get a shortlist of three or four independent manufacturers with MOQ, cost, location and packaging compared. You're never required to use one of them, and we can build to your own manufacturer's capabilities instead.",
  },
  {
    keywords: [
      "categories",
      "industries",
      "what do you make",
      "products",
      "sectors",
    ],
    answer:
      "Seven active categories: supplements, nutraceuticals, skincare, pet wellness, functional food & beverages, topicals and cosmeceuticals. Each has its own regulatory pathway and stability profile.",
  },
  {
    keywords: [
      "regulatory",
      "tga",
      "fda",
      "eu",
      "compliance",
      "claims",
      "label",
      "legal",
    ],
    answer:
      "We map the TGA / FDA / EU pathway during Discovery and grade the literature before any claim reaches artwork. The distinction that catches most brands out is “clinically studied” versus “clinically proven” — one describes the ingredient, the other promises an outcome.",
  },
  {
    keywords: ["stability", "shelf life", "shelf", "expiry", "degradation"],
    answer:
      "We design and specify the stability testing; a third-party lab physically runs it. It's an optional add-on and priced separately from the main engagement — worth raising on the call so it can be scoped alongside everything else.",
  },
  {
    keywords: [
      "liposomal",
      "encapsulation",
      "bioavailability",
      "absorption",
      "delivery",
    ],
    answer:
      "Liposomal delivery is a formulation route we work in, not a category of its own. What matters is whether the data supports the claim: particle size distribution and entrapment efficiency, measured — not an encapsulation claim asserted on the label.",
  },
  {
    keywords: [
      "process",
      "phases",
      "how do you work",
      "methodology",
      "steps",
      "start to finish",
      "end to end",
    ],
    answer:
      "Five steps. Discovery Call sets the vision, target market, claims and regulatory scope. Formulation covers the literature review, ingredient selection, dosage modelling and a validated formulation matrix. Regulatory & Compliance handles label claims, ingredient compliance and documentation for TGA, FDA, CPNP and the like. Manufacturing gives you a shortlist of three or four independent manufacturers. Handover is full sign-off, complete documentation and full IP transfer to you.",
  },
  {
    keywords: ["reformulate", "existing", "improve", "fix", "margin", "cost down"],
    answer:
      "Reformulation is one of our three core mandates. The usual pattern is a long ingredient list where most actives sit under an effective dose — we rebuild around the ones that earn their place, then prove it with stability data.",
  },
  {
    keywords: ["skincare", "serum", "cream", "emulsion", "retinol", "topical"],
    answer:
      "Skincare and topicals are core categories — emulsions and serums balanced for efficacy, texture and preservation. The hard part is usually holding all three at once alongside a preservative system that survives challenge testing.",
  },
  {
    keywords: ["supplement", "capsule", "powder", "tablet", "dose", "dosage"],
    answer:
      "Supplements and nutraceuticals, with dosages set to survive scrutiny rather than to look impressive on a label. Dosage consultancy is also available standalone if you already have an ingredient list.",
  },
  {
    keywords: ["pet", "dog", "cat", "animal", "palatability"],
    answer:
      "Pet wellness is an active category — species-appropriate dosing plus palatability that survives real feeding. Getting the dose right is usually easier than getting it eaten.",
  },
  {
    keywords: ["where", "location", "based", "australia", "brisbane", "remote"],
    answer:
      "We're based in Brisbane, Australia and work with clients globally. Discovery runs remotely, so timezone hasn't been a blocker.",
  },
  {
    keywords: ["contact", "call", "book", "talk", "speak", "email", "meeting"],
    answer: `Start with a 30-minute discovery call — a focused conversation to understand your product and scope what's possible, no pressure and no pitch. You can also email ${site.email}.`,
  },
  {
    keywords: ["nda", "confidential", "secret", "protect"],
    answer:
      "No NDA is required for a first conversation; we can sign one before anything sensitive changes hands. Client names on our case studies stay withheld under NDA as a matter of course.",
  },
];

/** Shown when nothing matches — never invents an answer. */
export const fallbackAnswer = `I don't have a confident answer to that one. It's a good question for the 30-minute discovery call, where someone from the team can give you a proper response — or email ${site.email}.`;
