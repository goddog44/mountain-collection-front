"use client";

import { useFilters } from "@/store/useFilters";
import { useCallback, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 8000;

export default function PriceRangeFilter() {
  const { filters, setFilters } = useFilters();
  const [min, setMin] = useState(filters.priceRange.min || MIN_PRICE);
  const [max, setMax] = useState(filters.priceRange.max || MAX_PRICE);

  const applyRange = useCallback(() => {
    setFilters({
      priceRange: {
        min: Math.min(min, max),
        max: Math.max(min, max),
      },
    });
  }, [min, max, setFilters]);

  return (
    <section>
      <h3 className="mb-3 text-base font-semibold">Budget total</h3>
      <div className="space-y-3">
        <div className="flex gap-2">
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            onMouseUp={applyRange}
            onTouchEnd={applyRange}
            className="flex-1"
          />
          <input
            type="range"
            min={MIN_PRICE}
            max={MAX_PRICE}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            onMouseUp={applyRange}
            onTouchEnd={applyRange}
            className="flex-1"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-[var(--ts-mid-grey)]">
          <span>Min {min} €</span>
          <span>Max {max} €</span>
        </div>
      </div>
      <hr className="my-4 border-gray-200" />
    </section>
  );
}
