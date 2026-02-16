"use client";

import { useFilters } from "@/store/useFilters";

const CAPACITIES = [1, 2, 3, 4, 5, 6, 8, 10, 12];

export default function CapacityFilter() {
  const { filters, setFilters } = useFilters();
  const capacity = filters.capacity || 0;

  return (
    <section>
      <h3 className="mb-3 text-base font-semibold">Chambres et lits</h3>
      <div className="mb-3">
        <div className="mb-1 text-sm">Capacité (personnes)</div>
        <div className="flex flex-wrap gap-2">
          {CAPACITIES.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setFilters({ capacity: capacity === n ? 0 : n })}
              className={`flex h-9 w-9 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                capacity === n
                  ? "bg-[var(--ts-mid-blue)] text-white"
                  : "border border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              {n}+
            </button>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
    </section>
  );
}
