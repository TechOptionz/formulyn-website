import type { Testimonial } from "@/data/home";

/**
 * Google reviews, pulled from the Places API (New) — Place Details endpoint.
 *
 * Set GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID and the homepage testimonials
 * start syncing (see index.ts for the merge, .env.example for the setup).
 * Leave either unset and this returns null, which the caller reads as "use the
 * curated reviews only" — the section renders exactly as it did before.
 *
 * Known limits of this endpoint, all of them Google's, none of them fixable:
 *
 *   - It returns AT MOST 5 reviews, and Google chooses which 5. There is no
 *     pagination and no way to ask for the rest. Pulling every review needs
 *     the Business Profile API, which is a different product with an OAuth
 *     flow and an access-request form.
 *   - There is no country on a review, so synced entries read "Name · Month
 *     Year" and cannot reproduce the "· Ireland ·" detail the curated ones
 *     carry.
 *   - Reviews are not filtered by rating. A one-star review can come back and
 *     will be published like any other — that is the agreed behaviour, and the
 *     reason cards draw their own star count instead of a hardcoded five.
 *
 * `rating` and `userRatingCount` cover the WHOLE listing, so the score and the
 * review count in the section head stay truthful even though only five review
 * bodies arrive.
 */

const ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount,reviews";
const TIMEOUT_MS = 10_000;

/**
 * Google's terms cap caching of Places content at 30 days; a day keeps us well
 * inside that and costs ~30 API calls a month. The tag is here so a new review
 * can be pushed live early with revalidateTag("google-reviews") if a
 * refresh-now route is ever wanted.
 */
const REVALIDATE_SECONDS = 86_400;
export const REVIEWS_CACHE_TAG = "google-reviews";

/**
 * Long reviews would blow out a card — the quote is set at 22px display type
 * and the grid gives every card in a row the tallest one's height. The longest
 * curated quote is ~230 characters, so that is the house style to hold to.
 */
const MAX_QUOTE_LENGTH = 280;

export type GooglePlaceReviews = {
  /** Mean rating across every review on the listing, e.g. 4.9. */
  rating: number | null;
  /** Total number of reviews on the listing — not the number returned here. */
  userRatingCount: number | null;
  /** Up to five reviews, already shaped for the testimonials grid. */
  reviews: Testimonial[];
};

type LocalizedText = { text?: string; languageCode?: string };

type GoogleReview = {
  rating?: number;
  /** Google's translation into `languageCode`; falls back to originalText. */
  text?: LocalizedText;
  originalText?: LocalizedText;
  publishTime?: string;
  relativePublishTimeDescription?: string;
  googleMapsUri?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type GooglePlace = {
  rating?: number;
  userRatingCount?: number;
  reviews?: GoogleReview[];
};

/** "March 2026", to match how the curated attributions are written. */
function formatMonth(publishTime: string | undefined): string | null {
  if (!publishTime) return null;
  const date = new Date(publishTime);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-AU", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Trim to the house length on a word boundary rather than mid-word. */
function truncate(text: string): string {
  if (text.length <= MAX_QUOTE_LENGTH) return text;
  const cut = text.slice(0, MAX_QUOTE_LENGTH);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

function toTestimonial(review: GoogleReview): Testimonial | null {
  const body = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim();
  if (!body || !name) return null;

  const month = formatMonth(review.publishTime);
  const when = month ?? review.relativePublishTimeDescription?.trim();

  return {
    quote: `"${truncate(body)}"`,
    attribution: when ? `${name} · ${when}` : name,
    // Clamped because the API has been known to return 0 on a malformed
    // review, which would draw an empty row of stars.
    rating: Math.min(5, Math.max(1, Math.round(review.rating ?? 5))),
    href: review.googleMapsUri ?? review.authorAttribution?.uri,
  };
}

/**
 * One cached GET per day. Never throws: the testimonials section is on the
 * homepage, so a bad morning at Google must degrade to the curated reviews
 * rather than take the page down.
 */
export async function fetchGoogleReviews(): Promise<GooglePlaceReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(
      `${ENDPOINT}/${encodeURIComponent(placeId)}?languageCode=en`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": FIELD_MASK,
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        next: { revalidate: REVALIDATE_SECONDS, tags: [REVIEWS_CACHE_TAG] },
      },
    );

    if (!response.ok) {
      // 403 almost always means the key is not restricted to Places API (New),
      // 404 that GOOGLE_PLACE_ID is not a place ID for a live listing.
      console.error(
        `[reviews] Places API responded ${response.status}; keeping curated reviews`,
      );
      return null;
    }

    const place = (await response.json()) as GooglePlace;

    return {
      rating: typeof place.rating === "number" ? place.rating : null,
      userRatingCount:
        typeof place.userRatingCount === "number" ? place.userRatingCount : null,
      reviews: (place.reviews ?? [])
        .map(toTestimonial)
        .filter((review): review is Testimonial => review !== null),
    };
  } catch (error) {
    console.error("[reviews] Places API request failed:", error);
    return null;
  }
}
