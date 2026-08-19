import { prisma } from "@/lib/db/prisma";
import { normalizeBusiness } from "@/lib/apify/normalize-business";
import type { ApifyRawBusiness } from "@/lib/apify/types";

/**
 * Persists raw Apify results for a search: normalizes each item, dedupes
 * business records globally (by placeId, falling back to a normalized
 * name+address key), and creates one Lead per (search, business) pair —
 * so re-running the same search never creates duplicate leads within it,
 * and the same business seen across many searches is stored only once.
 */
export async function persistSearchResults(
  searchId: string,
  userId: string,
  rawItems: ApifyRawBusiness[]
): Promise<number> {
  const seenKeysInThisRun = new Set<string>();
  let created = 0;

  for (const raw of rawItems) {
    const normalized = normalizeBusiness(raw);
    if (!normalized) continue;

    const dedupeKey = normalized.placeId || normalized.normalizedKey;
    if (seenKeysInThisRun.has(dedupeKey)) continue;
    seenKeysInThisRun.add(dedupeKey);

    const business = normalized.placeId
      ? await prisma.business.upsert({
          where: { placeId: normalized.placeId },
          update: {
            name: normalized.name,
            address: normalized.address ?? undefined,
            phone: normalized.phone ?? undefined,
            website: normalized.website ?? undefined,
            category: normalized.category ?? undefined,
            rating: normalized.rating ?? undefined,
            reviewCount: normalized.reviewCount ?? undefined,
            sourceUrl: normalized.sourceUrl ?? undefined,
          },
          create: {
            placeId: normalized.placeId,
            name: normalized.name,
            address: normalized.address,
            phone: normalized.phone,
            website: normalized.website,
            category: normalized.category,
            rating: normalized.rating,
            reviewCount: normalized.reviewCount,
            sourceUrl: normalized.sourceUrl,
            normalizedKey: normalized.normalizedKey,
          },
        })
      : await prisma.business.upsert({
          where: { normalizedKey: normalized.normalizedKey },
          update: {
            phone: normalized.phone ?? undefined,
            website: normalized.website ?? undefined,
            rating: normalized.rating ?? undefined,
            reviewCount: normalized.reviewCount ?? undefined,
          },
          create: {
            name: normalized.name,
            address: normalized.address,
            phone: normalized.phone,
            website: normalized.website,
            category: normalized.category,
            rating: normalized.rating,
            reviewCount: normalized.reviewCount,
            sourceUrl: normalized.sourceUrl,
            normalizedKey: normalized.normalizedKey,
          },
        });

    const lead = await prisma.lead.upsert({
      where: { searchId_businessId: { searchId, businessId: business.id } },
      update: {},
      create: {
        searchId,
        businessId: business.id,
        userId,
      },
    });
    if (lead) created += 1;
  }

  return created;
}
