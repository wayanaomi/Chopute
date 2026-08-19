"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchForm } from "./search-form";
import { UpgradeBanner } from "./upgrade-banner";
import { LeadFilters } from "@/components/leads/lead-filters";
import { LeadTable } from "@/components/leads/lead-table";
import { ExportCsvButton } from "@/components/leads/export-csv-button";
import { LoadingState } from "@/components/states/loading-state";
import { ErrorState } from "@/components/states/error-state";
import { EmptyState } from "@/components/states/empty-state";
import { DEFAULT_LEAD_FILTERS, type LeadFiltersState, type LeadItem } from "@/components/leads/types";
import type { UserQuota } from "@/lib/search/entitlement";

interface SearchState {
  id: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  businessType: string;
  location: string;
  errorMessage: string | null;
}

export function SearchWorkspace({ initialQuota }: { initialQuota: UserQuota }) {
  const router = useRouter();
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [quotaExhausted, setQuotaExhausted] = useState(
    initialQuota.plan === "FREE" && initialQuota.remaining === 0
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [search, setSearch] = useState<SearchState | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [filters, setFilters] = useState<LeadFiltersState>(DEFAULT_LEAD_FILTERS);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  function buildQuery() {
    const params = new URLSearchParams();
    if (filters.hasPhone) params.set("hasPhone", "true");
    if (filters.hasWebsite) params.set("hasWebsite", "true");
    if (filters.minRating !== "") params.set("minRating", String(filters.minRating));
    if (filters.status !== "ALL") params.set("status", filters.status);
    return params.toString();
  }

  async function fetchSearch(id: string) {
    const response = await fetch(`/api/search/${id}?${buildQuery()}`);
    const data = await response.json();
    if (!response.ok) return;

    setSearch(data.search);
    setLeads(data.leads);

    if (data.search.status === "COMPLETED" || data.search.status === "FAILED") {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
      router.refresh();
    }
  }

  // Re-fetch leads when filters change for an already-completed search.
  useEffect(() => {
    if (search?.status === "COMPLETED") {
      // Intentional data-fetching effect triggered by filter changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchSearch(search.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  async function handleSubmit() {
    setSubmitError(null);
    setSubmitting(true);
    setLeads([]);
    setFilters(DEFAULT_LEAD_FILTERS);

    try {
      const idempotencyKey =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`;

      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessType, location, idempotencyKey }),
      });
      const data = await response.json();

      if (response.status === 402) {
        setQuotaExhausted(true);
        setSubmitting(false);
        return;
      }
      if (!response.ok) {
        setSubmitError(data.error || "Could not start your search. Please try again.");
        setSubmitting(false);
        return;
      }

      setSearch({
        id: data.id,
        status: data.status,
        businessType,
        location,
        errorMessage: null,
      });

      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(() => fetchSearch(data.id), 2500);
      await fetchSearch(data.id);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Find Businesses</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Search by business type and location to generate a contact list.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <SearchForm
          businessType={businessType}
          location={location}
          onBusinessTypeChange={setBusinessType}
          onLocationChange={setLocation}
          onSubmit={handleSubmit}
          loading={submitting || search?.status === "PENDING" || search?.status === "PROCESSING"}
          disabled={quotaExhausted}
        />
        {submitError && <p className="mt-3 text-sm text-danger">{submitError}</p>}
      </div>

      {quotaExhausted && <UpgradeBanner />}

      {search?.status === "PROCESSING" || search?.status === "PENDING" ? (
        <LoadingState label="Searching…" />
      ) : null}

      {search?.status === "FAILED" && (
        <ErrorState
          message={search.errorMessage || "The search failed. Please try again."}
        />
      )}

      {search?.status === "COMPLETED" && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-foreground">
              {leads.length} results for {search.businessType} in {search.location}
            </h2>
            <ExportCsvButton searchId={search.id} />
          </div>

          <LeadFilters filters={filters} onChange={setFilters} />

          {leads.length === 0 ? (
            <EmptyState
              title="No businesses found"
              description="Try a broader location or a different business type."
            />
          ) : (
            <LeadTable leads={leads} />
          )}
        </div>
      )}
    </div>
  );
}
