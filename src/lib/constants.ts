/**
 * App-wide constants. Centralized so brand copy/config is never duplicated.
 */

export const APP_NAME = "Chopute";
export const APP_TAGLINE = "Automatic leads. Real growth.";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

export const FREE_SEARCH_BASE_ALLOTMENT = 2;
export const REFERRAL_REWARD_SEARCHES = 1;

export const UNLIMITED_ACCESS_PRICE_USD = Number(
  process.env.UNLIMITED_ACCESS_PRICE_USD || 25
);
export const UNLIMITED_ACCESS_PRICE_NGN = Number(
  process.env.UNLIMITED_ACCESS_PRICE_NGN || 38000
);

export const LEAD_STATUS_LABELS: Record<string, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  INTERESTED: "Interested",
  CLOSED: "Closed",
};

export const LEAD_STATUS_OPTIONS = ["NEW", "CONTACTED", "INTERESTED", "CLOSED"] as const;
