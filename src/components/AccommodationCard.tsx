"use client";

import { useState } from "react";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";
import type { Accommodation } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Heart, Home } from "lucide-react";

interface AccommodationCardProps {
  accommodation: Readonly<Accommodation>;
}

const amenityLabels: Record<string, string> = {
  wifi: "WIFI",
  animaux: "Anim",
  parking: "Parking",
  piscine: "Piscine",
  spa: "Spa",
  balcon: "Balcon",
  "lave-vaisselle": "Lave-vaisselle",
  "lave-linge": "Lave-linge",
  cheminee: "Cheminée",
};

function getAmenityLabel(id: string): string {
  return amenityLabels[id] ?? id;
}

export default function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const [isFavorite, setIsFavorite] = useState(accommodation.isFavorite);
  const {
    id,
    name,
    images,
    capacity,
    bedrooms,
    bathrooms,
    surface,
    amenities,
    price,
    badges,
    description,
    distanceToSlopes,
  } = accommodation;

  const promoBadge = badges.find((b) => b.type === "discount" && b.label === "Nos Promotions");
  const discountValue = badges.find((b) => b.type === "discount" && b.value);
  const coupDeCoeur = badges.some((b) => b.type === "favorite");

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((v) => !v);
  };

  const displayAmenities = amenities.slice(0, 3).map((a) => ({
    id: a.id,
    label: getAmenityLabel(a.id),
  }));
  if (distanceToSlopes !== undefined && distanceToSlopes < 400 && !displayAmenities.some((a) => a.id === "proche-pistes")) {
    displayAmenities.unshift({ id: "proche-pistes", label: "Proche des pistes" });
    displayAmenities.pop();
  }

  const pieces = bedrooms === 0 ? 1 : bedrooms + 1;

  return (
    <Link
      href={`/search?id=${id}`}
      className="group flex flex-col overflow-hidden rounded-[12px] border-0 bg-[var(--ts-white)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-md"
    >
      <div className="relative">
        <ImageCarousel images={images} alt={name} className="overflow-hidden rounded-t-[12px]" />
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {promoBadge && (
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[var(--ts-mid-blue)] px-2.5 py-1 text-xs font-medium text-white">
              Nos Promotions
            </span>
          )}
          {(coupDeCoeur || !promoBadge) && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
              <Home className="h-4 w-4 text-[var(--ts-text-card)]" strokeWidth={2} />
            </span>
          )}
        </div>
        {discountValue?.value && (
          <span className="absolute right-2 top-2 rounded-full bg-[var(--ts-amber)] px-2.5 py-1 text-xs font-semibold text-[var(--ts-text-card)]">
            {discountValue.value}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-[1rem] font-bold leading-tight text-[var(--ts-text-card)]">{name}</h3>
          <button
            type="button"
            onClick={toggleFavorite}
            className="shrink-0 rounded p-0.5 hover:bg-[var(--ts-light-grey)]"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-[var(--ts-mid-grey)]"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>
        {description && (
          <p className="mb-1.5 line-clamp-1 text-[0.875rem] text-[var(--ts-mid-grey)]">
            {description}
          </p>
        )}
        <p className="mb-2 text-[0.875rem] text-[var(--ts-text-card)]">
          {capacity.total} voyageurs · {surface} m² · {pieces} pièce{pieces > 1 ? "s" : ""} · {bathrooms} sdb
        </p>
        <div className="mb-3 flex flex-wrap gap-1">
          {displayAmenities.map((a) => (
            <span
              key={a.id}
              className="inline-flex items-center rounded-md bg-[var(--ts-light-blue)] px-1.5 py-0.5 text-[0.8rem] font-medium text-[var(--ts-mid-blue)]"
            >
              {a.label}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="min-w-0" />
          <div className="text-right">
            {price.originalAmount != null && (
              <span className="mr-1.5 text-sm text-[var(--ts-mid-grey)] line-through">
                {formatPrice(price.originalAmount)}
              </span>
            )}
            <span className="text-base font-bold text-[var(--ts-mid-blue)]">
              {formatPrice(price.amount)}
            </span>
          </div>
        </div>
        {price.freeCancellation && (
          <p className="mt-2 text-xs text-[var(--ts-success)]">Annulation gratuite</p>
        )}
      </div>
    </Link>
  );
}
