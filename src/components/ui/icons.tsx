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

/** Dismiss cross for the chat panel — same hairline grid as the nav icons. */
export function Close(props: IconProps) {
  return (
    <LineIcon strokeWidth="1.65" {...props}>
      <path d="M5.5 5.5 18.5 18.5" />
      <path d="M18.5 5.5 5.5 18.5" />
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

/**
 * Filled for the same reason as {@link LinkedIn} — the "f" is a logotype,
 * and stroking it closes up the crossbar at the 16px this renders at. Sized
 * to LinkedIn's cap height rather than the full 24 box so the three marks
 * sit on one optical line.
 */
export function Facebook(props: IconProps) {
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
      <path d="M16.538 13.219l.542-3.529h-3.386v-2.29c0-.966.473-1.907 1.99-1.907h1.539V2.488S15.823 2.25 14.489 2.25c-2.789 0-4.611 1.69-4.611 4.75v2.69h-3.1v3.529h3.1v8.531h3.815v-8.531z" />
    </svg>
  );
}

/**
 * ResearchGate's own "RG" mark. Filled like {@link LinkedIn} — both are
 * logotypes — but also stroked in the same colour, which is the one way to
 * carry it next to that mark: the "in" is a bold grotesque and this is a
 * light serif, so at a matched size it reads a good deal thinner. The stroke
 * puts about half a pixel back on each edge and closes that gap without
 * redrawing the letterforms. Past ~1.3 the G's counter fills in, so this is
 * as heavy as it goes.
 *
 * Unlike the other two marks it fills its whole 24 box rather than sitting
 * inside one, so the stylesheet sets it smaller to land on the same line.
 */
export function ResearchGate(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.586 0c-.818 0-1.508.19-2.073.565-.563.377-.97.936-1.213 1.68a3.193 3.193 0 0 0-.112.437 8.365 8.365 0 0 0-.078.53 9 9 0 0 0-.05.727c-.01.282-.013.621-.013 1.016a31.121 31.123 0 0 0 .014 1.017 9 9 0 0 0 .05.727 7.946 7.946 0 0 0 .077.53h-.005a3.334 3.334 0 0 0 .113.438c.245.743.65 1.303 1.214 1.68.565.376 1.256.564 2.075.564.8 0 1.536-.213 2.105-.603.57-.39.94-.916 1.175-1.65.076-.235.135-.558.177-.93a10.9 10.9 0 0 0 .043-1.207v-.82c0-.095-.047-.142-.14-.142h-3.064c-.094 0-.14.047-.14.141v.956c0 .094.046.14.14.14h1.666c.056 0 .084.03.084.086 0 .36 0 .62-.036.865-.038.244-.1.447-.147.606-.108.385-.348.664-.638.876-.29.212-.738.35-1.227.35-.545 0-.901-.15-1.21-.353-.306-.203-.517-.454-.67-.915a3.136 3.136 0 0 1-.147-.762 17.366 17.367 0 0 1-.034-.656c-.01-.26-.014-.572-.014-.939a26.401 26.403 0 0 1 .014-.938 15.821 15.822 0 0 1 .035-.656 3.19 3.19 0 0 1 .148-.76 1.89 1.89 0 0 1 .742-1.01c.344-.244.593-.352 1.137-.352.508 0 .815.096 1.144.303.33.207.528.492.764.925.047.094.111.118.198.07l1.044-.43c.075-.048.09-.115.042-.199a3.549 3.549 0 0 0-.466-.742 3 3 0 0 0-.679-.607 3.313 3.313 0 0 0-.903-.41A4.068 4.068 0 0 0 19.586 0zM8.217 5.836c-1.69 0-3.036.086-4.297.086-1.146 0-2.291 0-3.007-.029v.831l1.088.2c.744.144 1.174.488 1.174 2.264v11.288c0 1.777-.43 2.12-1.174 2.263l-1.088.2v.832c.773-.029 2.12-.086 3.465-.086 1.29 0 2.951.057 3.667.086v-.831l-1.49-.2c-.773-.115-1.174-.487-1.174-2.264v-4.784c.688.057 1.29.057 2.206.057 1.748 3.123 3.41 5.472 4.355 6.56.86 1.032 2.177 1.691 3.839 1.691.487 0 1.003-.086 1.318-.23v-.744c-1.031 0-2.063-.716-2.808-1.518-1.26-1.376-2.95-3.582-4.355-6.074 2.32-.545 4.04-2.722 4.04-4.9 0-3.208-2.492-4.698-5.758-4.698zm-.515 1.29c2.406 0 3.839 1.26 3.839 3.552 0 2.263-1.547 3.782-4.097 3.782-.974 0-1.404-.03-2.063-.086v-7.19c.66-.059 1.547-.059 2.32-.059z" />
    </svg>
  );
}
