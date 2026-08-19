"use client";

import { Input, Label } from "@/components/ui/form-controls";
import { Button } from "@/components/ui/button";

export function SearchForm({
  businessType,
  location,
  onBusinessTypeChange,
  onLocationChange,
  onSubmit,
  loading,
  disabled,
}: {
  businessType: string;
  location: string;
  onBusinessTypeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  disabled?: boolean;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <div>
        <Label htmlFor="businessType">Business type</Label>
        <Input
          id="businessType"
          placeholder="e.g. dental clinic, accounting firm, restaurant"
          value={businessType}
          onChange={(e) => onBusinessTypeChange(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="e.g. Lagos, Nigeria"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          required
        />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" loading={loading} disabled={disabled}>
          Search
        </Button>
      </div>
    </form>
  );
}
