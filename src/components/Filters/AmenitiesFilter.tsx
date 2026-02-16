"use client";

import { useFilters } from "@/store/useFilters";

const AMENITIES = [
  { id: "wifi", label: "Wifi" },
  { id: "parking", label: "Parking" },
  { id: "piscine", label: "Piscine" },
  { id: "spa", label: "Spa / Sauna" },
  { id: "lave-vaisselle", label: "Lave-vaisselle" },
  { id: "lave-linge", label: "Lave-linge" },
  { id: "balcon", label: "Balcon / Terrasse" },
  { id: "animaux", label: "Animaux acceptés" },
  { id: "cheminee", label: "Cheminée" },
];

export default function AmenitiesFilter() {
  const { filters, setFilters } = useFilters();

  return (
    <section>
      <h3 className="mb-3 text-base font-semibold">Équipements</h3>
      <div className="space-y-2">
        {AMENITIES.map(({ id, label }) => (
          <label
            key={id}
            className="flex cursor-pointer items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.amenities.includes(id)}
                onChange={(e) =>
                  setFilters({
                    amenities: e.target.checked
                      ? [...filters.amenities, id]
                      : filters.amenities.filter((x) => x !== id),
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm font-medium">{label}</span>
            </div>
          </label>
        ))}
      </div>
      <hr className="my-4 border-gray-200" />
    </section>
  );
}
