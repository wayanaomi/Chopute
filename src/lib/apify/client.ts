import type { ApifyRawBusiness } from "./types";

const APIFY_BASE_URL = "https://api.apify.com/v2";

class ApifyConfigError extends Error {}
export class ApifyRequestError extends Error {}

function getToken(): string {
  const token = process.env.APIFY_API_TOKEN;
  if (!token) {
    throw new ApifyConfigError(
      "APIFY_API_TOKEN is not configured. Set it in your environment (see .env.example) to enable business search."
    );
  }
  return token;
}

function getActorId(): string {
  return process.env.APIFY_ACTOR_ID || "compass/crawler-google-places";
}

/**
 * Starts an Apify actor run and returns immediately (does not wait for the
 * run to finish). Long-running scrapes must never block a request thread,
 * so callers should persist the returned ids and poll `getApifyRunStatus`.
 */
export async function startApifyRun(input: Record<string, unknown>): Promise<{
  runId: string;
  datasetId: string;
}> {
  const token = getToken();
  const actorId = encodeURIComponent(getActorId());

  const response = await fetch(`${APIFY_BASE_URL}/acts/${actorId}/runs?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ApifyRequestError(
      `Failed to start Apify actor run (${response.status}): ${detail.slice(0, 300)}`
    );
  }

  const json = await response.json();
  const runId = json?.data?.id;
  const datasetId = json?.data?.defaultDatasetId;
  if (!runId || !datasetId) {
    throw new ApifyRequestError("Apify run response was missing run/dataset ids");
  }
  return { runId, datasetId };
}

export type ApifyRunStatus =
  | "READY"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMED-OUT"
  | "ABORTED"
  | "TIMING-OUT"
  | "ABORTING";

export async function getApifyRunStatus(runId: string): Promise<ApifyRunStatus> {
  const token = getToken();
  const response = await fetch(`${APIFY_BASE_URL}/actor-runs/${runId}?token=${token}`);
  if (!response.ok) {
    throw new ApifyRequestError(`Failed to fetch Apify run status (${response.status})`);
  }
  const json = await response.json();
  return json?.data?.status as ApifyRunStatus;
}

export async function getApifyDatasetItems(datasetId: string): Promise<ApifyRawBusiness[]> {
  const token = getToken();
  const response = await fetch(
    `${APIFY_BASE_URL}/datasets/${datasetId}/items?token=${token}&clean=true&format=json`
  );
  if (!response.ok) {
    throw new ApifyRequestError(`Failed to fetch Apify dataset items (${response.status})`);
  }
  return (await response.json()) as ApifyRawBusiness[];
}

export function isApifyConfigured(): boolean {
  return Boolean(process.env.APIFY_API_TOKEN);
}
