import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /**
   * The live site indexes /blog and /blog/how-to-list-a-supplement-on-the-artg.
   * This rebuild renames that section to /journal, so the old URLs are
   * redirected rather than dropped. Permanent (308) so ranking transfers.
   */
  async redirects() {
    return [
      { source: "/blog", destination: "/journal", permanent: true },
      { source: "/blog/:slug", destination: "/journal", permanent: true },
    ];
  },
};

export default nextConfig;
