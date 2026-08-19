import { Checkbox, Label, Select } from "@/components/ui/form-controls";
import { LEAD_STATUS_OPTIONS, LEAD_STATUS_LABELS } from "@/lib/constants";
import type { LeadFiltersState } from "./types";

export function LeadFilters({
  filters,
  onChange,
}: {
  filters: LeadFiltersState;
  onChange: (next: LeadFiltersState) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-xl border border-border bg-card px-4 py-3">
      <span className="text-xs font-medium uppercase tracking-wide text-foreground-muted">
        Filters
      </span>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox
          checked={filters.hasPhone}
          onChange={(e) =>
            onChange({ ...filters, hasPhone: e.target.checked })
          }
        />
        Has phone
      </label>

      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox
          checked={filters.hasWebsite}
          onChange={(e) =>
            onChange({ ...filters, hasWebsite: e.target.checked })
          }
        />
        Has website
      </label>

      <div className="flex items-center gap-2">
        <Label htmlFor="minRating" className="whitespace-nowrap">
          Min rating
        </Label>

        <Select
          id="minRating"
          value={filters.minRating}
          onChange={(e) =>
            onChange({
              ...filters,
              minRating: e.target.value === "" ? "" : Number(e.target.value),
            })
          }
          className="w-20"
        >
          <option value="">Any</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <Label htmlFor="statusFilter" className="whitespace-nowrap">
          Status
        </Label>

        <Select
          id="statusFilter"
          value={filters.status}
          onChange={(e) =>
            onChange({
              ...filters,
              status: e.target.value as LeadFiltersState["status"],
            })
          }
          className="w-32"
        >
          <option value="ALL">All statuses</option>

          {LEAD_STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {LEAD_STATUS_LABELS[option]}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}