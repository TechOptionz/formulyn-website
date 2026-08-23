import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/**
 * The live site returns 404 for /robots.txt — this replaces that gap.
 *
 * AI crawlers are allowed, deliberately rather than by default. The trade is
 * real: allowing them means the content may be used in training and in
 * answers without a guaranteed click. For a consultancy whose buyers
 * increasingly research through an assistant, and which has no ad-supported
 * content to protect, being quotable is worth more than the withheld click.
 * Reverse it by moving a user agent into its own `disallow: "/"` rule.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
