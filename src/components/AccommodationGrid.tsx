"use client";

import { useMemo } from "react";
import AccommodationCard from "./AccommodationCard";
import { useFilters } from "@/store/useFilters";
import type { Accommodation } from "@/lib/types";
import type { SortOption } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

function sortAccommodations(
  list: Accommodation[],
  sort: SortOption
): Accommodation[] {
  const sorted = [...list];
  switch (sort) {
    case "rating_desc":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "price_asc":
      return sorted.sort((a, b) => a.price.amount - b.price.amount);
    case "price_desc":
      return sorted.sort((a, b) => b.price.amount - a.price.amount);
    case "capacity":
      return sorted.sort((a, b) => b.capacity.total - a.capacity.total);
    case "surface":
      return sorted.sort((a, b) => b.surface - a.surface);
    default:
      return sorted;
  }
}

function filterAccommodations(
  list: Accommodation[],
  filters: ReturnType<typeof useFilters.getState>["filters"]
): Accommodation[] {
  return list.filter((acc) => {
    if (
      filters.priceRange.min > 0 &&
      acc.price.amount < filters.priceRange.min
    )
      return false;
    if (
      filters.priceRange.max < 10000 &&
      acc.price.amount > filters.priceRange.max
    )
      return false;
    if (filters.capacity > 0 && acc.capacity.total < filters.capacity)
      return false;
    if (filters.bedrooms && acc.bedrooms < filters.bedrooms) return false;
    if (filters.bathrooms && acc.bathrooms < filters.bathrooms) return false;
    if (filters.beds && acc.capacity.total < filters.beds) return false;
    if (filters.stations.length > 0 && !filters.stations.includes(acc.location.station))
      return false;
    if (filters.altitude.length > 0) {
      const isHigh = acc.location.altitude >= 2000;
      const isMedium =
        acc.location.altitude >= 1600 && acc.location.altitude < 2000;
      const isLow = acc.location.altitude < 1600;
      const match =
        (filters.altitude.includes("high") && isHigh) ||
        (filters.altitude.includes("medium") && isMedium) ||
        (filters.altitude.includes("low") && isLow);
      if (!match) return false;
    }
    if (filters.locationFilters.length > 0) {
      const departSki = filters.locationFilters.includes("depart-ski");
      const piedPistes = filters.locationFilters.includes("pied-pistes-500");
      const matchDepart = departSki && acc.distanceToSlopes < 100;
      const matchPied = piedPistes && acc.distanceToSlopes < 500;
      if (departSki || piedPistes) {
        if (!matchDepart && !matchPied) return false;
      }
    }
    if (filters.amenities.length > 0) {
      const accAmenityIds = new Set(acc.amenities.map((a) => a.id));
      const idMap: Record<string, string> = {
        "piscine-ext": "piscine",
        "machine-laver": "lave-linge",
        "animaux-svc": "animaux",
        "espace-bien-etre": "spa",
      };
      const hasAll = filters.amenities.every((id) =>
        accAmenityIds.has(idMap[id] ?? id)
      );
      if (!hasAll) return false;
    }
    if (filters.accommodationTypes.length > 0) {
      const typeMap: Record<string, string> = {
        studio: "studio",
        apartment_2: "appartment",
        apartment_3: "appartment",
        apartment_4_plus: "appartment",
        chalet: "chalet",
      };
      const accType = typeMap[acc.type] ?? acc.type;
      if (!filters.accommodationTypes.includes(accType)) return false;
    }
    return true;
  });
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "rating_desc", label: "Meilleure note" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
  { value: "capacity", label: "Capacité" },
  { value: "surface", label: "Superficie" },
];

export default function AccommodationGrid({
  accommodations,
}: AccommodationGridProps) {
  const { filters, sort, setSort } = useFilters();

  const filtered = useMemo(
    () => filterAccommodations(accommodations, filters),
    [accommodations, filters]
  );
  const sorted = useMemo(
    () => sortAccommodations(filtered, sort),
    [filtered, sort]
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-bold flex-grow">
          <span className="font-bold flex-grow">{sorted.length}</span>{" "}
          hébergement{sorted.length !== 1 ? "s" : ""} trouvé
          {sorted.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-[var(--ts-mid-grey)]">
            Trier par
          </label>
          <div className="relative">
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-[var(--ts-mid-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--ts-mid-blue)]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 mb-8 grid-cols-1 lg:grid-cols-2 min-[1216px]:!grid-cols-3">
        {sorted.map((acc) => (
          <AccommodationCard key={acc.id} accommodation={acc} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
          <p className="text-lg font-medium text-gray-600">
            Aucun hébergement ne correspond à vos critères.
          </p>
          <p className="mt-1 text-sm text-[var(--ts-mid-grey)]">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      )}
    </div>
  );
}
