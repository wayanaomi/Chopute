"use client";

import { useCallback, useEffect, useState } from "react";
import { LeadFilters } from "@/components/leads/lead-filters";
import { LeadTable } from "@/components/leads/lead-table";
import { ExportCsvButton } from "@/components/leads/export-csv-button";
import { LoadingState } from "@/components/states/loading-state";
import { ErrorState } from "@/components/states/error-state";
import { EmptyState } from "@/components/states/empty-state";
import { DEFAULT_LEAD_FILTERS, type LeadFiltersState, type LeadItem } from "@/components/leads/types";

interface SearchInfo {
  id: string;
  businessType: string;
  location: string;
  status: string;
  errorMessage: string | null;
}

export function SearchLeadsView({ searchId }: { searchId: string }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState<SearchInfo | null>(null);
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [filters, setFilters] = useState<LeadFiltersState>(DEFAULT_LEAD_FILTERS);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.hasPhone) params.set("hasPhone", "true");
    if (filters.hasWebsite) params.set("hasWebsite", "true");
    if (filters.minRating !== "") params.set("minRating", String(filters.minRating));
    if (filters.status !== "ALL") params.set("status", filters.status);

    const response = await fetch(`/api/search/${searchId}?${params.toString()}`);
    const data = await response.json();
    if (response.ok) {
      setSearch(data.search);
      setLeads(data.leads);
    }
    setLoading(false);
  }, [searchId, filters]);

  useEffect(() => {
    // Intentional data-fetching effect: reload leads whenever the search id
    // or filters change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  if (loading && !search) return <LoadingState label="Loading leads…" />;
  if (!search) return <ErrorState message="This search could not be found." />;
  if (search.status === "FAILED") {
    return <ErrorState message={search.errorMessage || "This search failed."} />;
  }
  if (search.status !== "COMPLETED") {
    return <LoadingState label="This search is still processing…" />;
  }

  return (
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
          title="No leads match your filters"
          description="Try adjusting or clearing the filters above."
        />
      ) : (
        <LeadTable leads={leads} />
      )}
    </div>
  );
}
