import {
  testimonials as curatedTestimonials,
  testimonialsSection,
  type Testimonial,
} from "@/data/home";
import { fetchGoogleReviews } from "./google";

/**
 * The testimonials section's content, curated reviews merged with whatever
 * Google is currently returning.
 *
 * Curated entries come first and always win a tie: they carry detail the API
 * does not return (the client's country, the company in brackets) and they are
 * the fallback when the API is unset or unreachable. A Google review only
 * joins the grid if it is not already one of them.
 *
 * `rating` and `reviewCount` describe the whole Google listing, so they can
 * legitimately read higher than the number of cards on screen — the API hands
 * back at most five review bodies but counts every review.
 */

export type TestimonialsView = {
  /** Display string for the big score, e.g. "5.0". */
  rating: string;
  /** Display string under it, e.g. "12 Google reviews". */
  reviewCount: string;
  testimonials: (Testimonial & { rating: number })[];
};

/**
 * "Babar K. · March 2026" and a Google displayName of "Babar Khan" are the
 * same person, so match on first name plus the initial of the surname. Anything
 * looser starts merging distinct clients who share a first name.
 */
function authorKey(attribution: string): string {
  const name = attribution
    .split("·")[0]
    .replace(/\([^)]*\)/g, " ") // drop "(unomed)" and friends
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (name.length === 0) return "";
  return name.length === 1 ? name[0] : `${name[0]} ${name[1][0]}`;
}

/**
 * The curated quotes were transcribed from Google, so the text itself is the
 * strongest duplicate signal — it survives a reviewer renaming their account.
 */
function quoteKey(quote: string): string {
  return quote
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 60);
}

export async function getTestimonials(): Promise<TestimonialsView> {
  const curated = curatedTestimonials.map((testimonial) => ({
    ...testimonial,
    rating: testimonial.rating ?? 5,
  }));

  const live = await fetchGoogleReviews();

  if (!live) {
    return {
      rating: testimonialsSection.rating,
      reviewCount: testimonialsSection.reviewCount,
      testimonials: curated,
    };
  }

  const seenAuthors = new Set(curated.map((t) => authorKey(t.attribution)));
  const seenQuotes = new Set(curated.map((t) => quoteKey(t.quote)));

  const fresh = live.reviews
    .filter((review) => {
      const author = authorKey(review.attribution);
      return !seenAuthors.has(author) && !seenQuotes.has(quoteKey(review.quote));
    })
    .map((review) => ({ ...review, rating: review.rating ?? 5 }));

  const count = live.userRatingCount;

  return {
    rating: live.rating?.toFixed(1) ?? testimonialsSection.rating,
    reviewCount:
      count === null
        ? testimonialsSection.reviewCount
        : `${count} Google review${count === 1 ? "" : "s"}`,
    testimonials: [...curated, ...fresh],
  };
}
