"use client";

import { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import { useFilters } from "@/store/useFilters";
import type { Property } from "@/lib/types";
import { ChevronDown } from "lucide-react";

interface PropertyGridProps {
    properties: Property[];
}

type SortOption = "price_asc" | "price_desc" | "surface_desc" | "surface_asc";

function sortProperties(list: Property[], sort: SortOption): Property[] {
    const sorted = [...list];
    switch (sort) {
        case "price_asc":
            return sorted.sort((a, b) => a.price - b.price);
        case "price_desc":
            return sorted.sort((a, b) => b.price - a.price);
        case "surface_desc":
            return sorted.sort((a, b) => b.surface - a.surface);
        case "surface_asc":
            return sorted.sort((a, b) => a.surface - b.surface);
        default:
            return sorted;
    }
}

function filterProperties(
    list: Property[],
    filters: ReturnType<typeof useFilters.getState>["filters"]
): Property[] {
    return list.filter((prop) => {
        // If destination is set, filter by it (mapped to station or city)
        if (filters.destination && !prop.location.station.includes(filters.destination) && !prop.location.city.includes(filters.destination)) {
            return false;
        }

        // Price range - Note: store might be using nightly rates scale, we might need to adjust or ignore if it's default
        // If max price is explicitly very low (like default 10000), we act like it's not set for properties, or we expect the user/component to set valid range for real estate.
        // However, SearchBarHome sets 'maxPrice' param which updates 'priceRange.max' via SearchPageClient if implemented.
        if (filters.priceRange.max > 10000 && prop.price > filters.priceRange.max) return false;
        // Basic safety check: if max is < 50000, it's probably a rental filter, so ignore it for sales to avoid showing nothing

        // Type
        if (filters.accommodationTypes.length > 0) {
            // Map accommodation types to property types if needed or just use loose matching
            const type = prop.type;
            // e.g. "chalet" matches, "apartment" matches "apartment_2" etc? 
            if (!filters.accommodationTypes.some(t => t.includes(type))) {
                // If strict match fails, try partial
                if (type === 'apartment' && !filters.accommodationTypes.some(t => t.includes('apartment'))) return false;
                if (type !== 'apartment' && !filters.accommodationTypes.includes(type)) return false;
            }
        }

        return true;
    });
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "price_asc", label: "Prix croissant" },
    { value: "price_desc", label: "Prix décroissant" },
    { value: "surface_desc", label: "Surface décroissante" },
    { value: "surface_asc", label: "Surface croissante" },
];

export default function PropertyGrid({ properties }: PropertyGridProps) {
    const { filters } = useFilters();
    const [sort, setSort] = useState<SortOption>("price_asc");

    const filtered = useMemo(
        () => filterProperties(properties, filters),
        [properties, filters]
    );

    const sorted = useMemo(
        () => sortProperties(filtered, sort),
        [filtered, sort]
    );

    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-bold flex-grow">
                    <span className="font-bold flex-grow">{sorted.length}</span>{" "}
                    biens trouvés
                </p>
                <div className="flex items-center gap-2 ">
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortOption)}
                            className="appearance-none font-semibold rounded-md border border-grey-300 bg-white py-2 pl-3 pr-8 text-sm focus:border-[var(--ts-mid-blue)] focus:outline-none focus:ring-1 focus:ring-[var(--ts-mid-blue)]"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option key={opt.value} value={opt.value}><span>Trier par : </span>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {sorted.map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                ))}
            </div>

            {sorted.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16 text-center">
                    <p className="text-lg font-medium text-gray-600">
                        Aucun bien ne correspond à vos critères.
                    </p>
                </div>
            )}
        </div>
    );
}
