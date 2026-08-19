import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

export interface SearchHistoryItem {
  id: string;
  businessType: string;
  location: string;
  status: string;
  resultCount: number;
  createdAt: string;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function SearchHistoryCard({ item }: { item: SearchHistoryItem }) {
  const dateLabel = format(new Date(item.createdAt), "dd/MM/yyyy");

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-medium text-foreground">
            {capitalize(item.businessType)} in {item.location}
          </p>
          <p className="mt-1 text-sm text-foreground-muted">
            {item.status === "COMPLETED"
              ? `${item.resultCount} results · ${dateLabel}`
              : item.status === "FAILED"
                ? `Search failed · ${dateLabel}`
                : `Processing · ${dateLabel}`}
          </p>
        </div>
        <Link href={`/app/searches/${item.id}`} className="text-sm font-medium text-brand hover:underline">
          View leads →
        </Link>
      </CardContent>
    </Card>
  );
}
