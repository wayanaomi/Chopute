/**
 * Builds the actor input for a Chopute business search.
 *
 * This is the original search configuration that produced the
 * stable 20–21-result behavior, with company contact enrichment
 * enabled so available business emails are collected.
 */
export function buildActorInput(
  businessType: string,
  location: string
) {
  const maxResults = Number(
    process.env.APIFY_MAX_RESULTS_PER_SEARCH || 200
  );

  return {
    searchStringsArray: [`${businessType} in ${location}`],
    maxCrawledPlacesPerSearch: maxResults,
    language: "en",
    skipClosedPlaces: true,

    // Collect available company contact information,
    // including business email addresses.
    scrapeContacts: true,

    // Required for contact enrichment.
    scrapePlaceDetailPage: true,
  };
}