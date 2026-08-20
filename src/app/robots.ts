import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/** The live site returns 404 for /robots.txt — this replaces that gap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
