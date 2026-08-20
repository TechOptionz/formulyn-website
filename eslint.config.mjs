import next from "eslint-config-next";

/** Flat config. `eslint-config-next` ships the Core Web Vitals + TS rules. */
const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Reference material for the design port, not application code.
      "design/**",
    ],
  },
  ...next,
];

export default config;
