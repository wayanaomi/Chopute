import { describe, it, expect } from "vitest";
import { buildLeadsCsv } from "@/lib/exports/csv";

describe("buildLeadsCsv", () => {
  it("includes a header row and escapes fields with commas/quotes", () => {
    const csv = buildLeadsCsv([
      {
        businessName: 'Joe "The Best" Diner, Inc.',
        address: "1 Main St",
        phone: "+15551234567",
        website: "https://example.com",
        rating: 4.2,
        reviewCount: 10,
        status: "NEW",
        searchLabel: "restaurant in Lagos, Nigeria",
        searchDate: new Date("2026-08-15T00:00:00Z"),
      },
    ]);

    expect(csv).toContain("Business,Address,Phone,Website,Rating,Review Count,Status,Search,Search Date");
    expect(csv).toContain('"Joe ""The Best"" Diner, Inc."');
    expect(csv).toContain("New");
    expect(csv).toContain("2026-08-15");
  });
});
