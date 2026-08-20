/**
 * Raw shapes we expect back from the configured Apify actor (default:
 * compass/crawler-google-places). Different actors return slightly
 * different field names, so this type is intentionally permissive —
 * normalize-business.ts is the single place that adapts it to our
 * internal model.
 */
export interface ApifyRawBusiness {
  placeId?: string;
  title?: string;
  name?: string;
  address?: string;
  street?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  countryCode?: string;
  phone?: string;
  phoneUnformatted?: string;
  website?: string;
  emails?: string[];
  url?: string;
  categoryName?: string;
  category?: string;
  totalScore?: number;
  rating?: number;
  reviewsCount?: number;
  userRatingsTotal?: number;
  searchPageUrl?: string;
  [key: string]: unknown;
}

export interface NormalizedBusiness {
  placeId: string | null;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  category: string | null;
  rating: number | null;
  reviewCount: number | null;
  sourceUrl: string | null;
  normalizedKey: string;
}

export interface ApifyRunResult {
  runId: string;
  datasetId: string;
  status: "SUCCEEDED" | "FAILED" | "TIMED-OUT" | "ABORTED";
  items: ApifyRawBusiness[];
}
