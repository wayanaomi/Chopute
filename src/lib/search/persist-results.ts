import { prisma } from "@/lib/db/prisma";
import { normalizeBusiness } from "@/lib/apify/normalize-business";
import type { ApifyRawBusiness } from "@/lib/apify/types";

/**
 * Persists raw Apify results for a search.
 *
 * Businesses are globally deduplicated by placeId when available,
 * otherwise by normalizedKey. Leads are uniquely identified by
 * (searchId, businessId).
 *
 * The lead upsert is wrapped so concurrent polling requests cannot
 * turn an otherwise successful search into a visible failure.
 */
export async function persistSearchResults(
  searchId: string,
  userId: string,
  rawItems: ApifyRawBusiness[]
): Promise<number> {
  const seenKeysInThisRun = new Set<string>();
  const seenBusinessIds = new Set<string>();

  let created = 0;

  for (const raw of rawItems) {
    const normalized = normalizeBusiness(raw);

    if (!normalized) {
      continue;
    }

    const dedupeKey =
      normalized.placeId || normalized.normalizedKey;

    if (seenKeysInThisRun.has(dedupeKey)) {
      continue;
    }

    seenKeysInThisRun.add(dedupeKey);

    const business = normalized.placeId
      ? await prisma.business.upsert({
          where: {
            placeId: normalized.placeId,
          },
          update: {
            name: normalized.name,
            address: normalized.address ?? undefined,
            phone: normalized.phone ?? undefined,
            email: normalized.email ?? undefined,
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
            email: normalized.email,
            website: normalized.website,
            category: normalized.category,
            rating: normalized.rating,
            reviewCount: normalized.reviewCount,
            sourceUrl: normalized.sourceUrl,
            normalizedKey: normalized.normalizedKey,
          },
        })
      : await prisma.business.upsert({
          where: {
            normalizedKey: normalized.normalizedKey,
          },
          update: {
            name: normalized.name,
            address: normalized.address ?? undefined,
            phone: normalized.phone ?? undefined,
            email: normalized.email ?? undefined,
            website: normalized.website ?? undefined,
            category: normalized.category ?? undefined,
            rating: normalized.rating ?? undefined,
            reviewCount: normalized.reviewCount ?? undefined,
            sourceUrl: normalized.sourceUrl ?? undefined,
          },
          create: {
            name: normalized.name,
            address: normalized.address,
            phone: normalized.phone,
            email: normalized.email,
            website: normalized.website,
            category: normalized.category,
            rating: normalized.rating,
            reviewCount: normalized.reviewCount,
            sourceUrl: normalized.sourceUrl,
            normalizedKey: normalized.normalizedKey,
          },
        });

    if (seenBusinessIds.has(business.id)) {
      continue;
    }

    seenBusinessIds.add(business.id);

    try {
      const lead = await prisma.lead.upsert({
        where: {
          searchId_businessId: {
            searchId,
            businessId: business.id,
          },
        },
        update: {},
        create: {
          searchId,
          businessId: business.id,
          userId,
        },
      });

      /*
       * If the lead already existed, it was not newly created.
       * Prisma returns the existing record from upsert.
       *
       * We don't need to increment the count here because the caller
       * recalculates the final count directly from the database.
       */
      if (lead) {
        created += 1;
      }
    } catch (error) {
      /*
       * Concurrent polling can still race at the database level.
       * If another request created this exact lead first, ignore the
       * duplicate and continue processing the remaining businesses.
       */
      const message =
        error instanceof Error ? error.message : "";

      if (
        message.includes("Unique constraint failed") ||
        message.includes("P2002")
      ) {
        continue;
      }

      throw error;
    }
  }

  return created;
}