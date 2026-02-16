"use client";

import { useFilters } from "@/store/useFilters";

const OPTIONS = [
  { id: "high" as const, label: "Haute altitude", desc: "> 2000m" },
  { id: "medium" as const, label: "Moyenne altitude", desc: "1600m à 2000m" },
  { id: "low" as const, label: "Basse altitude", desc: "< 1600m" },
];

export default function AltitudeFilter() {
  const { filters, setFilters } = useFilters();

  return (
    <section>
      <h3 className="mb-3 text-base font-semibold">Altitude</h3>
      <div className="space-y-2">
        {OPTIONS.map(({ id, label, desc }) => (
          <label
            key={id}
            className="flex cursor-pointer items-start justify-between gap-2"
          >
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={filters.altitude.includes(id)}
                onChange={(e) =>
                  setFilters({
                    altitude: e.target.checked
                      ? [...filters.altitude, id]
                      : filters.altitude.filter((x) => x !== id),
                  })
                }
                className="mt-1 h-4 w-4 rounded border-gray-300"
              />
              <div>
                <span className="text-sm font-medium">{label}</span>
                {desc && (
                  <p className="text-xs text-[var(--ts-mid-grey)]">{desc}</p>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      <hr className="my-4 border-gray-200" />
    </section>
  );
}
