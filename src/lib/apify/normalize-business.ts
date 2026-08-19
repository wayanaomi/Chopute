import type { ApifyRawBusiness, NormalizedBusiness } from "./types";

/** Strips formatting to compare/store phone numbers consistently. */
export function normalizePhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  if (!trimmed) return null;
  // Keep a leading + (international prefix) but strip everything else
  // that isn't a digit.
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return null;
  return hasPlus ? `+${digits}` : digits;
}

/** Ensures website URLs are well-formed absolute http(s) links. */
export function normalizeWebsite(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function normalizeText(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim().replace(/\s+/g, " ");
  return trimmed || null;
}

/** Builds a stable fallback dedup key when no external place id exists. */
function buildNormalizedKey(name: string, address: string | null): string {
  const base = `${name}|${address ?? ""}`.toLowerCase();
  return base.replace(/[^a-z0-9|]/g, "").slice(0, 300);
}

/**
 * Converts a raw Apify actor item into our internal Business shape.
 * This is the ONLY place that should understand the external provider's
 * response format — everything downstream (DB, API responses, UI) works
 * exclusively with NormalizedBusiness.
 */
export function normalizeBusiness(raw: ApifyRawBusiness): NormalizedBusiness | null {
  const name = normalizeText(raw.title || raw.name);
  if (!name) return null;

  const address =
    normalizeText(raw.address) ||
    normalizeText(
      [raw.street, raw.city, raw.state, raw.postalCode, raw.countryCode]
        .filter(Boolean)
        .join(", ")
    );

  const rating =
    typeof raw.totalScore === "number"
      ? raw.totalScore
      : typeof raw.rating === "number"
        ? raw.rating
        : null;

  const reviewCount =
    typeof raw.reviewsCount === "number"
      ? raw.reviewsCount
      : typeof raw.userRatingsTotal === "number"
        ? raw.userRatingsTotal
        : null;

  return {
    placeId: raw.placeId ?? null,
    name,
    address,
    phone: normalizePhone(raw.phone || raw.phoneUnformatted),
    website: normalizeWebsite(raw.website),
    category: normalizeText(raw.categoryName || raw.category),
    rating,
    reviewCount,
    sourceUrl: normalizeText(raw.url || raw.searchPageUrl),
    normalizedKey: buildNormalizedKey(name, address),
  };
}
