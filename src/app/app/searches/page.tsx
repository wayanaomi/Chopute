import { ReferralCard } from "@/components/referral/referral-card";
import { SearchHistory } from "@/components/search/search-history";

export const metadata = { title: "My Searches — Chopute" };

export default function MySearchesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Searches</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          View and track leads from your past searches.
        </p>
      </div>

      <ReferralCard />

      <SearchHistory />
    </div>
  );
}
