# Formulyn — Website

Next.js (App Router) rebuild of the approved Formulyn design. The original
single-file prototype lives at `design/Formulyn Website.dc.html`; this project
is a faithful port of it — same colours, type, spacing and behaviour —
restructured so the site is maintainable.

The app sits at the repository root so any host (Vercel included) detects the
framework automatically, with no root-directory setting to configure. Design
source material — the prototype, the concept deck, the brand guide — lives
under `design/` and is not part of the build.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

## Where things live

```
src/
├── app/                      # routes — one folder per page
│   ├── layout.tsx            # fonts, metadata, Header + Footer
│   ├── page.tsx              # /            home
│   ├── process/page.tsx      # /process
│   ├── industries/page.tsx   # /industries
│   ├── journal/page.tsx      # /journal
│   ├── about/page.tsx        # /about
│   ├── contact/page.tsx      # /contact
│   ├── not-found.tsx         # 404
│   └── icon.svg              # favicon
│
├── data/                     # ALL COPY LIVES HERE — edit text without touching JSX
│   ├── site.ts               # name, email, nav links, footer blurb
│   ├── home.ts               # hero, stats, situations, mandates, cases, reviews
│   ├── process.ts            # the four phases + timeline proportions
│   ├── industries.ts         # the seven categories
│   ├── journal.ts            # hero, newsletter — posts load from content/journal.json
│   ├── about.ts              # narrative + principles
│   └── contact.ts            # contact page + the closing CTA banner
│
├── components/
│   ├── layout/               # Header, Footer, CtaBanner — on every page
│   ├── ui/                   # Reveal, PageHero, SectionHeading, Stop
│   └── sections/             # one folder per page, one component per section
│       ├── home/  process/  industries/  journal/  about/  contact/
│
├── styles/
│   ├── tokens.css            # every colour, font stack and spacing value
│   ├── keyframes.css         # fPulse, fMarquee, fHeroIn, fGlow
│   └── globals.css           # reset, base type, .shell, .srOnly
│
└── hooks/

content/
└── journal.json              # the journal posts — instructions at the top of the file

design/                       # reference only — excluded from the build
├── Formulyn Website.dc.html  # the approved prototype this port is checked against
├── support.js                # its runtime
├── mockup/                   # concept deck + screenshots
├── brand/                    # brand viewer
└── uploads/                  # brand guide PDF
```

Each component pairs a `.tsx` with a co-located `.module.css`. Styles are scoped
by CSS Modules, so a class name can never leak between sections.

## Common edits

| Task | File |
| --- | --- |
| Change any copy on the site | the matching file in `src/data/` |
| Add a case study, review or industry | push an item onto the array in `src/data/` |
| Add a journal post | copy an entry in `content/journal.json`, newest at the top |
| Change a brand colour or font | `src/styles/tokens.css` |
| Add or reorder a nav item | `navLinks` in `src/data/site.ts` |
| Add a page | new folder in `src/app/`, section components in `src/components/sections/` |

## Design fidelity

The port was verified against the original prototype: at 1440px, 768px and
390px every page renders to the **same pixel height**, and a full-page pixel
diff comes in under 0.03% (residual is image re-encoding by the Next image
optimizer and sub-pixel text antialiasing).

Two things are load-bearing for that fidelity — leave them alone unless you
mean to change the design:

- **No global `box-sizing: border-box`.** The design was authored against the
  browser default (`content-box`). Under `border-box` the aspect-ratio
  thumbnails and the mobile menu button size differently.
- **Paragraph margins are always set explicitly** in the CSS modules. A `<p>`
  without a `margin` declaration picks up the UA `margin: 1em 0` and shifts
  the layout.

The nav collapse point (900px) is a media query in `Header.module.css`; the
prototype did the same thing with a JS resize listener.

## Chat assistant

A floating assistant is mounted globally in `app/layout.tsx`. It answers
questions and can capture a lead (name, email, what they want to make)
without leaving the page.

It ships in **demo mode**: answers come from the keyword-matched knowledge
base in `src/data/chat.ts`, and it returns a fallback pointing at a discovery
call rather than guessing when nothing matches.

**To connect the real API**, set `CHAT_API_URL` (see `.env.example`). That is
the whole switch — `src/lib/chat/provider.ts` picks the live provider over the
demo one, and nothing else in the app changes. The adapter posts
`{ messages: [{ role, content }] }` and reads the reply from `content`,
`reply`, `message.content` or `content[].text`, so most APIs work as-is; if
yours differs, edit `extractContent` in `src/lib/chat/live-provider.ts`.

```
src/
├── app/api/chat/route.ts      # answers a turn (validates input)
├── app/api/leads/route.ts     # receives a captured lead
├── lib/chat/
│   ├── provider.ts            # <- the swap point: demo vs live
│   ├── live-provider.ts       # adapter for your API
│   ├── demo-provider.ts       # keyword lookup over data/chat.ts
│   ├── leads.ts               # <- the one destination for lead delivery
│   ├── lead-email.ts          # Resend send + the notification template
│   └── validate.ts
├── components/chat/ChatWidget.tsx
└── data/chat.ts               # all copy + the demo Q&A
```

The brief form on `/contact`, the chat widget and the newsletter signup all
post to `/api/leads`, which calls `deliverLead()` — so there is one destination
to maintain.

Leads are emailed to `LEADS_EMAIL_TO` (default: `site.email`) via Resend, with
the visitor's address as reply-to. Set `RESEND_API_KEY` to switch this on;
without it the lead is only logged server-side. **Logs are not durable
storage** — set the key before launch. `LEADS_WEBHOOK_URL` still works as an
optional fire-and-forget extra hop for a CRM. See `.env.example`.

## Not yet wired up

Both forms are presentational — they need an endpoint before launch:

- **Brief intake** — `src/components/sections/contact/ContactSection.tsx`
- **Newsletter** — `src/components/sections/journal/NewsletterSignup.tsx`

Add an `action` (a route handler under `src/app/api/`, or a third-party
endpoint) to each `<form>`.

The hero image is still hot-linked from `formulyn.com.au` (allow-listed in
`next.config.ts`). Move it into `public/` when convenient. Case study and
journal thumbnails are the design's own labelled placeholders, awaiting real
photography.
