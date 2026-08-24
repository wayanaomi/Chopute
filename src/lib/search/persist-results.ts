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
 * Duplicate records caused by repeated Apify results or concurrent
 * polling requests are safely ignored so they cannot fail the search.
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

    try {
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
        await prisma.lead.upsert({
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

        created += 1;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "";

        /*
         * Another polling request may have created this lead first.
         * Ignore duplicate constraint errors and continue.
         */
        if (
          message.includes("Unique constraint failed") ||
          message.includes("P2002")
        ) {
          continue;
        }

        throw error;
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "";

      /*
       * Another concurrent polling request may have created the
       * business first. Ignore the duplicate and continue processing.
       */
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