"use client";

import { useFilters } from "@/store/useFilters";
import { X, ChevronDown, Euro } from "lucide-react";
import { useState } from "react";

function FilterCheckboxRow({
  id,
  label,
  desc,
  count,
  checked,
  onChange,
  disabled = false,
}: {
  id: string;
  label: string;
  desc?: string;
  count: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mb-2 flex flex-row justify-between gap-2 pl-2">
      <div
        className={`relative flex items-start flex-row ${disabled ? "opacity-50" : ""}`}
      >
        <div className="flex h-5 items-center">
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-label={label}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`size-4 overflow-hidden rounded-sm ring-2 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ts-mid-blue)] ${checked ? "bg-[var(--ts-mid-blue)] ring-[var(--ts-mid-blue)]" : "ring-gray-300"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
          />
        </div>
        <div className="ms-2 w-full text-sm">
          <label
            htmlFor={id}
            className={`block font-medium text-base md:text-sm ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => !disabled && onChange(!checked)}
          >
            {label}
          </label>
          {desc && (
            <p className="font-medium text-[var(--ts-mid-grey)]">{desc}</p>
          )}
        </div>
      </div>
      <span className="text-sm text-[var(--ts-mid-grey)] md:text-xs">
        {count}
      </span>
    </div>
  );
}

function RadioGroup({
  label,
  id,
  options,
  value,
  onChange,
}: {
  label: string;
  id: string;
  options: number[];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="mb-3 facet-quantity">
      <div id={id} className="mb-1 text-sm text-gray-900 md:text-sm">
        {label}
      </div>
      <div
        role="radiogroup"
        aria-labelledby={id}
        className="mb-3 flex flex-row gap-2"
      >
        {options.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(value === n ? 0 : n)}
            className={`flex h-9 w-9 items-center justify-center rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ts-mid-blue)] ${value === n ? "ring-2 ring-[var(--ts-mid-blue)] bg-[var(--ts-mid-blue)]/10 text-[var(--ts-mid-blue)]" : "ring-2 ring-gray-200 text-gray-700 hover:bg-gray-50"}`}
          >
            {n}+
          </button>
        ))}
      </div>
    </div>
  );
}

const TOP_CRITERIA = [
  { id: "pied-pistes", label: "Pied des pistes", desc: "< 100 m", count: 27 },
  { id: "animaux", label: "Animaux admis", count: 75 },
  { id: "piscine", label: "Piscine", count: 4 },
  { id: "wifi", label: "Wifi", count: 69 },
];

const EMPLACEMENT = [
  { id: "depart-ski", label: "Départ à ski", desc: "< 100m", count: 27 },
  { id: "pied-pistes-500", label: "Pied des pistes", desc: "< 500m", count: 90 },
  { id: "ecole-ski", label: "Proche école de ski", count: 52 },
  { id: "centre", label: "Centre", count: 7 },
  { id: "proche-centre", label: "Proche du centre", count: 39 },
];

const TYPES_HEBERGEMENT = [
  { id: "appartment", label: "Appartement", count: 67 },
  { id: "chalet", label: "Chalet", count: 7 },
  { id: "studio", label: "Studio", count: 16 },
];

const NIVEAU_CONFORT = [
  { id: "signature", label: "Signature", count: 5 },
  { id: "prestige", label: "Prestige", count: 4 },
  { id: "evasion", label: "Evasion", count: 37 },
  { id: "confort", label: "Confort", count: 0, disabled: true },
  { id: "essentielle", label: "Essentielle", count: 21 },
];

const TYPE_STATION = [
  { id: "village", label: "Station Village", count: 34 },
  { id: "haute-alt", label: "Haute altitude", count: 34 },
  { id: "familiale", label: "Station familiale", count: 36 },
  { id: "charme", label: "Station de charme", count: 34 },
];

const ALTITUDE_OPTIONS = [
  { id: "high", label: "Haute altitude", desc: "> 2000m", count: 1 },
  { id: "medium", label: "Moyenne altitude", desc: "de 2000m à 1600m", count: 56 },
  { id: "low", label: "Basse altitude", desc: "< 1600m", count: 61 },
];

const STATIONS = [
  "Flaine",
  "La Plagne",
  "Le Corbier",
  "Les 2 Alpes",
  "Les Menuires",
  "Les Arcs",
  "Tignes",
  "Val Thorens",
  "Méribel",
  "Courchevel",
  "Val d'Isère",
  "Serre Chevalier",
];

const INTERIEUR = [
  { id: "ascenseur", label: "Ascenseur", count: 66 },
  { id: "machine-laver", label: "Machine à laver", count: 8 },
  { id: "spa", label: "Spa", count: 7 },
  { id: "balcon", label: "Balcon / Terrasse", count: 90 },
  { id: "lave-vaisselle", label: "Lave vaisselle", count: 90 },
];

const EXTERIEUR = [
  { id: "parking", label: "Parking / Garage", count: 19 },
  { id: "piscine-ext", label: "Piscine", count: 4 },
];

const SERVICE = [{ id: "animaux-svc", label: "Animaux admis", count: 75 }];

const TRES_DEMANDES = [
  { id: "wifi-2", label: "Wifi", count: 69 },
  { id: "cheminee", label: "Cheminée", count: 4 },
  { id: "television", label: "Télévision", count: 89 },
  { id: "espace-bien-etre", label: "Espace bien être", count: 7 },
];

export default function FilterSidebar() {
  const { filters, setFilters, resetFilters } = useFilters();
  const [stationsExpanded, setStationsExpanded] = useState(false);
  const [interieurExpanded, setInterieurExpanded] = useState(false);

  const toggleAmenity = (id: string, arr: "amenities" | "locationFilters" | "comfortLevel" | "stationType") => {
    const list = filters[arr];
    setFilters({
      [arr]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    });
  };

  const isAnimauxChecked = filters.amenities.includes("animaux");

  return (
    <aside
      id="facets"
      className="max-md:mb-24 w-full rounded-t-lg bg-white md:w-[250px] md:shrink-0"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.stations.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() =>
              setFilters({
                stations: filters.stations.filter((x) => x !== s),
              })
            }
            className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium ring-2 ring-gray-200 hover:bg-gray-50"
          >
            {s}
            <X className="h-4 w-4 shrink-0" />
          </button>
        ))}
      </div>

      <div className="max-md:px-4">
        {/* Top critères */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Top critères</p>
          <div className="mb-4">
            {TOP_CRITERIA.map(({ id, label, desc, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                desc={desc}
                count={count}
                checked={filters.amenities.includes(id)}
                onChange={(c) =>
                  setFilters({
                    amenities: c
                      ? [...filters.amenities, id]
                      : filters.amenities.filter((x) => x !== id),
                  })
                }
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Chambres et lits */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Chambres et lits</p>
          <div className="mb-4">
            <RadioGroup
              label="Chambre"
              id="facet-chambre"
              options={[1, 2, 3, 4, 5]}
              value={filters.bedrooms ?? 0}
              onChange={(v) => setFilters({ bedrooms: v })}
            />
            <RadioGroup
              label="Lit"
              id="facet-lit"
              options={[1, 2, 3, 4, 5]}
              value={filters.beds ?? 0}
              onChange={(v) => setFilters({ beds: v })}
            />
            <RadioGroup
              label="Salle de bain"
              id="facet-sdb"
              options={[1, 2, 3, 4, 5]}
              value={filters.bathrooms ?? 0}
              onChange={(v) => setFilters({ bathrooms: v })}
            />
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Budget total */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Budget total</p>
          <PriceRangeSection filters={filters} setFilters={setFilters} />
          <hr className="mt-4 border-gray-200" />
        </div>

        {/* Emplacement */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Emplacement</p>
          <div className="mb-4">
            {EMPLACEMENT.map(({ id, label, desc, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                desc={desc}
                count={count}
                checked={filters.locationFilters.includes(id)}
                onChange={(c) => toggleAmenity(id, "locationFilters")}
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Types d'hébergement */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Types d&apos;hébergement</p>
          <div className="mb-4">
            {TYPES_HEBERGEMENT.map(({ id, label, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                count={count}
                checked={filters.accommodationTypes.includes(id)}
                onChange={(c) =>
                  setFilters({
                    accommodationTypes: c
                      ? [...filters.accommodationTypes, id]
                      : filters.accommodationTypes.filter((x) => x !== id),
                  })
                }
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Niveau de confort */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Niveau de confort</p>
          <div className="mb-4">
            {NIVEAU_CONFORT.map(({ id, label, count, disabled }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                count={count}
                checked={filters.comfortLevel.includes(id)}
                onChange={(c) =>
                  setFilters({
                    comfortLevel: c
                      ? [...filters.comfortLevel, id]
                      : filters.comfortLevel.filter((x) => x !== id),
                  })
                }
                disabled={!!disabled}
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Type de station */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Type de station</p>
          <div className="mb-4">
            {TYPE_STATION.map(({ id, label, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                count={count}
                checked={filters.stationType.includes(id)}
                onChange={(c) =>
                  setFilters({
                    stationType: c
                      ? [...filters.stationType, id]
                      : filters.stationType.filter((x) => x !== id),
                  })
                }
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Altitude */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Altitude</p>
          <div className="mb-4">
            {ALTITUDE_OPTIONS.map(({ id, label, desc, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                desc={desc}
                count={count}
                checked={filters.altitude.includes(id as "low" | "medium" | "high")}
                onChange={(c) =>
                  setFilters({
                    altitude: c
                      ? [...filters.altitude, id as "low" | "medium" | "high"]
                      : filters.altitude.filter((x) => x !== id),
                  })
                }
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Stations, quartiers */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Stations, quartiers</p>
          <div className="mb-4">
            {(stationsExpanded ? STATIONS : STATIONS.slice(0, 5)).map(
              (station) => (
                <FilterCheckboxRow
                  key={station}
                  id={station}
                  label={station}
                  count={Math.floor(Math.random() * 30) + 1}
                  checked={filters.stations.includes(station)}
                  onChange={(c) =>
                    setFilters({
                      stations: c
                        ? [...filters.stations, station]
                        : filters.stations.filter((x) => x !== station),
                    })
                  }
                />
              )
            )}
            <button
              type="button"
              onClick={() => setStationsExpanded(!stationsExpanded)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 md:text-xs"
            >
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${stationsExpanded ? "rotate-180" : ""}`}
              />
              Voir plus
            </button>
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Intérieur */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Intérieur</p>
          <div className="mb-4">
            {(interieurExpanded ? INTERIEUR : INTERIEUR.slice(0, 5)).map(
              ({ id, label, count }) => (
                <FilterCheckboxRow
                  key={id}
                  id={id}
                  label={label}
                  count={count}
                  checked={filters.amenities.includes(id)}
                  onChange={(c) =>
                    setFilters({
                      amenities: c
                        ? [...filters.amenities, id]
                        : filters.amenities.filter((x) => x !== id),
                    })
                  }
                />
              )
            )}
            <button
              type="button"
              onClick={() => setInterieurExpanded(!interieurExpanded)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 md:text-xs"
            >
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform ${interieurExpanded ? "rotate-180" : ""}`}
              />
              Voir plus
            </button>
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Extérieur */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Extérieur</p>
          <div className="mb-4">
            {EXTERIEUR.map(({ id, label, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                count={count}
                checked={filters.amenities.includes(id)}
                onChange={(c) =>
                  setFilters({
                    amenities: c
                      ? [...filters.amenities, id]
                      : filters.amenities.filter((x) => x !== id),
                  })
                }
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Service */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Service</p>
          <div className="mb-4">
            {SERVICE.map(({ id, label, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                count={count}
                checked={isAnimauxChecked}
                onChange={(c) =>
                  setFilters({
                    amenities: c
                      ? [...filters.amenities, "animaux"]
                      : filters.amenities.filter((x) => x !== "animaux"),
                  })
                }
              />
            ))}
          </div>
          <hr className="border-gray-200" />
        </div>

        {/* Très demandés */}
        <div className="mb-4">
          <p className="mb-4 text-base font-semibold">Très demandés</p>
          <div className="mb-4">
            {TRES_DEMANDES.map(({ id, label, count }) => (
              <FilterCheckboxRow
                key={id}
                id={id}
                label={label}
                count={count}
                checked={
                  (id === "wifi-2" && filters.amenities.includes("wifi")) ||
                  (id === "cheminee" && filters.amenities.includes("cheminee")) ||
                  (id === "television" && filters.amenities.includes("television")) ||
                  (id === "espace-bien-etre" && filters.amenities.includes("espace-bien-etre"))
                }
                onChange={(c) => {
                  const amenityId =
                    id === "wifi-2"
                      ? "wifi"
                      : id === "cheminee"
                        ? "cheminee"
                        : id === "television"
                          ? "television"
                          : "espace-bien-etre";
                  setFilters({
                    amenities: c
                      ? [...filters.amenities, amenityId]
                      : filters.amenities.filter((x) => x !== amenityId),
                  });
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-[var(--ts-mid-blue)] hover:bg-gray-50"
      >
        Réinitialiser les filtres
      </button>
    </aside>
  );
}

function PriceRangeSection({
  filters,
  setFilters,
}: {
  filters: ReturnType<typeof useFilters.getState>["filters"];
  setFilters: ReturnType<typeof useFilters.getState>["setFilters"];
}) {
  const min = filters.priceRange.min || 0;
  const max = filters.priceRange.max || 8000;
  const rangeMin = 400;
  const rangeMax = 8000;

  return (
    <div className="mb-4">
      <div className="relative mb-6 flex touch-none select-none items-center">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
        <span
  data-orientation="horizontal"
  data-slot="range"
  className="absolute h-full rounded-full bg-primary"
  style={{
    left: `${((min - rangeMin) / (rangeMax - rangeMin)) * 50}%`,
    right: `${50 - ((max - rangeMin) / (rangeMax - rangeMin)) * 50}%`,
  }}
/>
</div>

        <input
          type="range"
          min={rangeMin}
          max={rangeMax}
          value={min}
          onChange={(e) =>
            setFilters({
              priceRange: {
                min: Math.min(Number(e.target.value), max - 100),
                max,
              },
            })
          }
          className="absolute h-4 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-[var(--ts-mid-blue)]"
        />
        <input
          type="range"
          min={rangeMin}
          max={rangeMax}
          value={max}
          onChange={(e) =>
            setFilters({
              priceRange: {
                min,
                max: Math.max(Number(e.target.value), min + 100),
              },
            })
          }
          className="absolute h-4 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:ring-2 [&::-webkit-slider-thumb]:ring-[var(--ts-mid-blue)]"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="relative inline-flex items-center">
            <input
              type="number"
              value={min}
              onChange={(e) =>
                setFilters({
                  priceRange: {
                    min: Math.min(Number(e.target.value) || 0, max - 100),
                    max,
                  },
                })
              }
              placeholder="Min"
              className="w-24 rounded-md border-0 px-2.5 py-1.5 text-sm ring-2 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--ts-mid-blue)]"
            />
            <Euro className="absolute end-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ts-mid-grey)]" />
          </div>
          <span className="ml-1 text-sm text-[var(--ts-mid-grey)]">
            Min {min} €
          </span>
        </div>
        <div className="text-right">
          <div className="relative inline-flex items-center">
            <input
              type="number"
              value={max}
              onChange={(e) =>
                setFilters({
                  priceRange: {
                    min,
                    max: Math.max(Number(e.target.value) || rangeMax, min + 100),
                  },
                })
              }
              placeholder="Max"
              className="w-24 rounded-md border-0 px-2.5 py-1.5 text-right text-sm ring-2 ring-inset ring-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--ts-mid-blue)]"
            />
            <Euro className="absolute end-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ts-mid-grey)]" />
          </div>
          <span className="ml-3 text-sm text-[var(--ts-mid-grey)]">
            Max {max} €
          </span>
        </div>
      </div>
    </div>
  );
}
