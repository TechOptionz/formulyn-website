import type { SVGProps } from "react";
import type { ContactIconName } from "@/data/contact";
import type { NavIconName } from "@/data/site";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Shared frame for the nav's line icons: hairline strokes on a 24px grid,
 * drawn in `currentColor` so the parent controls the colour on hover.
 */
function LineIcon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Erlenmeyer flask — formulation development. */
export function Flask(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M9.5 3h5" />
      <path d="M10.5 3v6.4l-4.8 8.3A1.6 1.6 0 0 0 7.1 20.2h9.8a1.6 1.6 0 0 0 1.4-2.5l-4.8-8.3V3" />
      <path d="M8.3 14.4h7.4" />
    </LineIcon>
  );
}

/** Cleared dossier — regulatory compliance and market registration. */
export function Dossier(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M13.8 3H6.6v18h10.8V6.6z" />
      <path d="M13.8 3v3.6h3.6" />
      <path d="M9.4 14.1l1.9 1.9 3.5-3.9" />
    </LineIcon>
  );
}

/** Plant elevation — manufacturer sourcing and GMP clearance. */
export function Facility(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M2.8 20.6h18.4" />
      <path d="M4.6 20.6v-8.4l4.7 2.8v-2.8l4.7 2.8V6.2h5v14.4" />
      <path d="M17.2 10.4h1.6" />
    </LineIcon>
  );
}

/** Disclosure caret for the dropdown trigger and the accordion row. */
export function Caret(props: IconProps) {
  return (
    <LineIcon width="10" height="10" strokeWidth="1.6" {...props}>
      <path d="M4.5 9 12 16.2 19.5 9" />
    </LineIcon>
  );
}

/** Resolves a `NavChild.icon` key to its component. */
export const serviceIcons: Record<
  NavIconName,
  (props: IconProps) => React.ReactElement
> = {
  flask: Flask,
  dossier: Dossier,
  facility: Facility,
};

/* ---- Contact rail ---------------------------------------------------- */

/** Envelope — the email channel. */
export function Mail(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3.2 6.4h17.6v11.2H3.2z" />
      <path d="M3.2 7 12 13.1 20.8 7" />
    </LineIcon>
  );
}

/** Map pin — where the practice sits. */
export function Pin(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21.2c4.2-4.6 6.3-8 6.3-10.5a6.3 6.3 0 1 0-12.6 0c0 2.5 2.1 5.9 6.3 10.5Z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </LineIcon>
  );
}

/** Clock — the reply window. */
export function Clock(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 6.8V12l3.4 2.1" />
    </LineIcon>
  );
}

/** Cleared shield — the confidentiality undertaking. */
export function Shield(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21.2c4-1.9 6.2-5 6.2-9.2V5.6L12 3.2 5.8 5.6V12c0 4.2 2.2 7.3 6.2 9.2Z" />
      <path d="M9.2 11.9 11.3 14l3.5-3.9" />
    </LineIcon>
  );
}

/** Resolves a `ContactChannel.icon` key to its component. */
export const contactIcons: Record<
  ContactIconName,
  (props: IconProps) => React.ReactElement
> = {
  mail: Mail,
  pin: Pin,
  clock: Clock,
  shield: Shield,
};

/**
 * A logotype rather than a drawing, so it is filled rather than stroked —
 * drawn as outlines the counters in the "in" close up at the 16px this is
 * used at and the mark stops reading as LinkedIn's.
 */
export function LinkedIn(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.75h4v10.75H3zM10 9.75h3.8v1.47a4.16 4.16 0 0 1 3.75-2.06c4 0 4.75 2.63 4.75 6.05v5.29h-4v-4.69c0-1.12-.02-2.56-1.56-2.56-1.56 0-1.8 1.22-1.8 2.48v4.77h-4z" />
    </svg>
  );
}

/** Instagram camera mark icon. */
export function Instagram(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}
