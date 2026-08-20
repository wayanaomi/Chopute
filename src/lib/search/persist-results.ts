import { prisma } from "@/lib/db/prisma";
import { normalizeBusiness } from "@/lib/apify/normalize-business";
import type { ApifyRawBusiness } from "@/lib/apify/types";

/**
 * Persists raw Apify results for a search.
 *
 * Business records are globally deduplicated by placeId when available,
 * otherwise by normalizedKey. Leads are deduplicated by the database's
 * unique (searchId, businessId) constraint.
 *
 * The function is intentionally idempotent: if the same Apify results are
 * processed more than once, existing leads are skipped instead of causing
 * a unique-constraint error.
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

    /*
     * First-level deduplication against the raw Apify results.
     */
    const dedupeKey =
      normalized.placeId || normalized.normalizedKey;

    if (seenKeysInThisRun.has(dedupeKey)) {
      continue;
    }

    seenKeysInThisRun.add(dedupeKey);

    /*
     * Create/update the shared Business record.
     */
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

    /*
     * Second-level deduplication.
     *
     * Different Apify records can sometimes resolve to the same
     * database Business record. Never attempt to create the same
     * business's lead twice during this persistence pass.
     */
    if (seenBusinessIds.has(business.id)) {
      continue;
    }

    seenBusinessIds.add(business.id);

    /*
     * Check the actual database before creating the lead.
     *
     * This protects us from:
     * - duplicate Apify records
     * - repeated polling
     * - reprocessing an already-completed search
     */
    const existingLead = await prisma.lead.findUnique({
      where: {
        searchId_businessId: {
          searchId,
          businessId: business.id,
        },
      },
    });

    if (existingLead) {
      continue;
    }

    /*
     * Create the lead only when it does not already exist.
     *
     * The unique constraint on (searchId, businessId) remains the
     * final database-level protection against duplicates.
     */
    try {
      await prisma.lead.create({
        data: {
          searchId,
          businessId: business.id,
          userId,
        },
      });

      created += 1;
    } catch (error) {
      /*
       * A second request may have created the same lead between our
       * findUnique() check and create(). If that happened, simply
       * ignore the duplicate and continue processing the remaining
       * businesses.
       */
      if (
        error instanceof Error &&
        error.message.includes(
          "Unique constraint failed"
        )
      ) {
        continue;
      }

      throw error;
    }
  }

  return created;
}