import { create } from "zustand";
import type { SearchFilters, SortOption } from "@/lib/types";

const defaultFilters: SearchFilters = {
  guests: { adults: 2, children: 0 },
  priceRange: { min: 0, max: 10000 },
  altitude: [],
  accommodationTypes: [],
  capacity: 0,
  amenities: [],
  pmrOnly: false,
  stations: [],
  locationFilters: [],
  comfortLevel: [],
  stationType: [],
};

interface FilterState {
  filters: SearchFilters;
  sort: SortOption;
  setFilters: (f: Partial<SearchFilters>) => void;
  setSort: (s: SortOption) => void;
  resetFilters: () => void;
}

export const useFilters = create<FilterState>((set) => ({
  filters: defaultFilters,
  sort: "rating_desc",
  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial },
    })),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set({ filters: defaultFilters }),
}));
