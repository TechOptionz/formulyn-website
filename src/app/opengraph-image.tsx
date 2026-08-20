import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Share card, generated at build time so there is no binary asset to keep
 * in sync. The live site's og:image is a stale preview screenshot on a
 * third-party bucket; this replaces it.
 *
 * Colours are the design tokens, hard-coded because satori does not read
 * CSS custom properties.
 */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d1310",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#c9963f",
          }}
        >
          {site.location}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              lineHeight: 1.05,
              color: "#ede8dc",
            }}
          >
            {site.tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#b9c0b4",
              maxWidth: 900,
            }}
          >
            Evidence-led formulation R&amp;D for supplement, skincare and
            wellness brands.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(237, 232, 221, 0.14)",
            paddingTop: 28,
            fontSize: 26,
            color: "#ede8dc",
          }}
        >
          <div style={{ display: "flex", letterSpacing: "0.1em" }}>
            {site.name.toUpperCase()}
          </div>
          <div style={{ display: "flex", color: "#9aa396" }}>
            formulyn.com.au
          </div>
        </div>
      </div>
    ),
    size,
  );
}
