import { LEAD_STATUS_LABELS } from "@/lib/constants";

export interface CsvLeadRow {
  businessName: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  reviewCount: number | null;
  status: string;
  searchLabel: string;
  searchDate: Date;
}

const HEADERS = [
  "Business",
  "Address",
  "Phone",
  "Website",
  "Rating",
  "Review Count",
  "Status",
  "Search",
  "Search Date",
];

/** Escapes a single CSV field per RFC 4180. */
function escapeCsvField(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function toCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return escapeCsvField(String(value));
}

/** Builds a CSV string (Excel/Google Sheets compatible) from lead rows. */
export function buildLeadsCsv(rows: CsvLeadRow[]): string {
  const lines = [HEADERS.join(",")];

  for (const row of rows) {
    lines.push(
      [
        toCell(row.businessName),
        toCell(row.address),
        toCell(row.phone),
        toCell(row.website),
        toCell(row.rating ?? ""),
        toCell(row.reviewCount ?? ""),
        toCell(LEAD_STATUS_LABELS[row.status] ?? row.status),
        toCell(row.searchLabel),
        toCell(row.searchDate.toISOString().slice(0, 10)),
      ].join(",")
    );
  }

  // Prefix a BOM so Excel reliably detects UTF-8.
  return "\uFEFF" + lines.join("\r\n");
}
