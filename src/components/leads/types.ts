export interface LeadBusiness {
  id: string;
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  rating: number | null;
  reviewCount: number | null;
}

export interface LeadItem {
  id: string;
  status: "NEW" | "CONTACTED" | "INTERESTED" | "CLOSED";
  business: LeadBusiness;
}

export interface LeadFiltersState {
  hasPhone: boolean;
  hasWebsite: boolean;
  minRating: number | "";
  status: "ALL" | LeadItem["status"];
}

export const DEFAULT_LEAD_FILTERS: LeadFiltersState = {
  hasPhone: false,
  hasWebsite: false,
  minRating: "",
  status: "ALL",
};
