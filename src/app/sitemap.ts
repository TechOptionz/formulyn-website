import type { MetadataRoute } from "next";
import { serviceDetails } from "@/data/services";
import { site } from "@/data/site";

/** Every indexable route. Keeps parity with the live site's sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/process", priority: 0.8 },
    { path: "/industries", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/journal", priority: 0.6 },
    { path: "/contact", priority: 0.9 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({
      url: new URL(path, site.url).toString(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...serviceDetails.map((detail) => ({
      url: new URL(`/services/${detail.slug}`, site.url).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
