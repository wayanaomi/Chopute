import { describe, it, expect } from "vitest";
import { normalizeBusiness, normalizePhone, normalizeWebsite } from "@/lib/apify/normalize-business";

describe("normalizePhone", () => {
  it("strips formatting but keeps a leading +", () => {
    expect(normalizePhone("+234 (801) 234-5678")).toBe("+2348012345678");
  });
  it("returns null for empty input", () => {
    expect(normalizePhone(null)).toBeNull();
    expect(normalizePhone("")).toBeNull();
  });
});

describe("normalizeWebsite", () => {
  it("adds https:// when missing a protocol", () => {
    expect(normalizeWebsite("example.com")).toBe("https://example.com/");
  });
  it("rejects invalid URLs", () => {
    expect(normalizeWebsite("not a url")).toBeNull();
  });
});

describe("normalizeBusiness", () => {
  it("maps raw Apify fields to the internal shape", () => {
    const result = normalizeBusiness({
      placeId: "abc123",
      title: "Test Restaurant",
      address: "12 Main St, Lagos",
      phone: "+2348000000000",
      website: "testrestaurant.com",
      totalScore: 4.5,
      reviewsCount: 120,
    });

    expect(result).not.toBeNull();
    expect(result?.name).toBe("Test Restaurant");
    expect(result?.placeId).toBe("abc123");
    expect(result?.rating).toBe(4.5);
    expect(result?.reviewCount).toBe(120);
    expect(result?.website).toBe("https://testrestaurant.com/");
  });

  it("returns null when there is no business name", () => {
    expect(normalizeBusiness({})).toBeNull();
  });
});
