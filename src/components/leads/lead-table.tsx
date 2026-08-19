import { Star, Globe } from "lucide-react";
import { EmptyState } from "@/components/states/empty-state";
import { LeadStatusSelect } from "./lead-status-select";
import type { LeadItem } from "./types";

export function LeadTable({ leads }: { leads: LeadItem[] }) {
  if (leads.length === 0) {
    return (
      <EmptyState
        title="No leads match your filters"
        description="Try adjusting or clearing the filters above."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-border bg-background text-left text-xs font-medium uppercase tracking-wide text-foreground-muted">
            <th className="p-4">Business</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Website</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-border last:border-0">
              <td className="p-4">
                <div className="font-medium text-foreground">{lead.business.name}</div>
                {lead.business.address && (
                  <div className="mt-0.5 text-xs text-foreground-muted">
                    {lead.business.address}
                  </div>
                )}
              </td>
              <td className="p-4 text-foreground">{lead.business.phone || "—"}</td>
              <td className="p-4">
                {lead.business.website ? (
                  <a
                    href={lead.business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-brand hover:underline"
                  >
                    <Globe className="h-3.5 w-3.5" /> Visit
                  </a>
                ) : (
                  <span className="text-foreground-muted">—</span>
                )}
              </td>
              <td className="p-4">
                {lead.business.rating ? (
                  <span className="inline-flex items-center gap-1 text-foreground">
                    <Star className="h-3.5 w-3.5 fill-brand text-brand" />
                    {lead.business.rating.toFixed(1)}
                    <span className="text-foreground-muted">
                      ({lead.business.reviewCount ?? 0})
                    </span>
                  </span>
                ) : (
                  <span className="text-foreground-muted">—</span>
                )}
              </td>
              <td className="p-4">
                <LeadStatusSelect leadId={lead.id} status={lead.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
