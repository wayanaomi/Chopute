"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/states/loading-state";
import { EmptyState } from "@/components/states/empty-state";
import { SearchHistoryCard, type SearchHistoryItem } from "./search-history-card";

export function SearchHistory() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searches, setSearches] = useState<SearchHistoryItem[]>([]);

  async function loadHistory() {
    setLoading(true);
    try {
      const response = await fetch("/api/searches");
      const data = await response.json();
      setSearches(data.searches ?? []);
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  }

  if (!loaded) {
    return (
      <div className="flex justify-center">
        <Button variant="secondary" onClick={loadHistory} loading={loading}>
          Load search history
        </Button>
      </div>
    );
  }

  if (loading) return <LoadingState label="Loading your search history…" />;

  if (searches.length === 0) {
    return (
      <EmptyState
        title="No searches yet"
        description="Run your first search to start building your lead history."
      />
    );
  }

  return (
    <div className="space-y-3">
      {searches.map((item) => (
        <SearchHistoryCard key={item.id} item={item} />
      ))}
    </div>
  );
}
