/**
 * Builds the actor input for a Chopute business search. Kept isolated so
 * swapping the configured Apify actor only requires changes here (and in
 * normalize-business.ts if the response shape differs).
 */
export function buildActorInput(businessType: string, location: string) {
  const maxResults = Number(process.env.APIFY_MAX_RESULTS_PER_SEARCH || 200);

  return {
    searchStringsArray: [`${businessType} in ${location}`],
    maxCrawledPlacesPerSearch: maxResults,
    language: "en",
    skipClosedPlaces: true,
  };
}
