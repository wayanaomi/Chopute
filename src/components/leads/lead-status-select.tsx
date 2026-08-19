"use client";

import { useState } from "react";
import { Select } from "@/components/ui/form-controls";
import { LEAD_STATUS_OPTIONS, LEAD_STATUS_LABELS } from "@/lib/constants";
import type { LeadItem } from "./types";

export function LeadStatusSelect({
  leadId,
  status,
}: {
  leadId: string;
  status: LeadItem["status"];
}) {
  const [current, setCurrent] = useState(status);
  const [saving, setSaving] = useState(false);

  async function handleChange(next: LeadItem["status"]) {
    const previous = current;
    setCurrent(next);
    setSaving(true);
    try {
      const response = await fetch(`/api/leads/${leadId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!response.ok) throw new Error("Failed to update status");
    } catch {
      setCurrent(previous);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Select
      aria-label="Lead status"
      value={current}
      disabled={saving}
      onChange={(event) => handleChange(event.target.value as LeadItem["status"])}
      className="h-8 py-0 text-xs"
    >
      {LEAD_STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {LEAD_STATUS_LABELS[option]}
        </option>
      ))}
    </Select>
  );
}
