"use client";

import Link from "next/link";
import { Heart, Home, Settings2 } from "lucide-react";
import ImageCarousel from "../ImageCarousel";
import { formatPrice } from "@/lib/utils";
import type { Accommodation } from "@/lib/types";
import { useState } from "react";

interface Props {
  accommodation: Accommodation;
}

const amenityLabels: Record<string, string> = {
  wifi: "WIFI",
  animaux: "Animaux acceptés",
  parking: "Parking",
  piscine: "Piscine",
  spa: "Spa",
  balcon: "Balcon",
  "lave-vaisselle": "Lave-vaisselle",
  "lave-linge": "Lave-linge",
  cheminee: "Cheminée",
  evasion: "Évasion",
};

function getAmenityLabel(id: string): string {
  return amenityLabels[id] ?? id;
}

// Badge icon — gear/snowflake like in screenshots
function BadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
    </svg>
  );
}

export default function AccommodationCardMosaic({ accommodation }: Props) {
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
    location,
  } = accommodation;

  // ── Badge logic ──
  const promoBadge = badges.find(
    (b) => b.type === "discount" && b.label === "Nos Promotions"
  );
  const dernierMinuteBadge = badges.find(
    (b) => b.label === "Dernière minute"
  );
  const discountValue = badges.find((b) => b.type === "discount" && b.value);
  const coupDeCoeur = badges.some((b) => b.type === "favorite");

  // Which left badge to show (priority: Dernière minute > Nos Promotions)
  const leftBadge = dernierMinuteBadge ?? promoBadge ?? null;

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((v) => !v);
  };

  // ── Amenities ──
  const displayAmenities: { id: string; label: string }[] = [];

  // Prepend "Proche des pistes" if within 400m
  if (distanceToSlopes !== undefined && distanceToSlopes < 400) {
    displayAmenities.push({ id: "proche-pistes", label: "Proche des pistes" });
  }

  amenities.slice(0, 3 - displayAmenities.length).forEach((a) => {
    displayAmenities.push({ id: a.id, label: getAmenityLabel(a.id) });
  });

  // ── Type label ──
  const typeLabel = (() => {
    const t = accommodation.type;
    if (t === "studio") return "Studio";
    if (t === "chalet") return "Chalet";
    return "Appartement";
  })();

  // ── Station ──
  const stationLabel = location?.station ?? "";

  // ── Pieces ──
  const pieces = bedrooms === 0 ? 1 : bedrooms + 1;

  return (
    <Link
      href={`/accommodations/${id}`}
      className="group flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_0_16px_rgba(0,0,0,0.14)]"
    >
      {/* ── IMAGE ── */}
      <div className="relative">
        <ImageCarousel
          images={images}
          alt={name}
          className="overflow-hidden rounded-t-[12px]"
        />

        {/* Top-left badges stack */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {/* Main badge: "Nos Promotions" or "Dernière minute" */}
          {leftBadge && (
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[#1B3D6B] px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">
              <BadgeIcon />
              {leftBadge.label}
            </span>
          )}

          {/* House icon — always shown below main badge */}
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
            <Home className="h-4 w-4 text-gray-600" strokeWidth={2} />
          </span>
        </div>

        {/* Top-right discount badge: "-16%" in amber */}
        {discountValue?.value && (
          <span className="absolute right-2 top-2 rounded-full bg-[#F5C842] px-2.5 py-1 text-xs font-bold text-gray-900 shadow-sm">
            {discountValue.value}
          </span>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="flex flex-1 flex-col p-4">

        {/* Title: "Type · Station" on two lines like screenshots */}
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-[1rem] font-bold leading-snug text-gray-900">
            {typeLabel} ·<br />{stationLabel}
          </h3>
          <button
            type="button"
            onClick={toggleFavorite}
            className="shrink-0 rounded p-0.5 hover:bg-gray-100"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Description */}
        {description && (
          <p className="mb-1.5 line-clamp-1 text-[0.875rem] text-gray-500">
            {description}
          </p>
        )}

        {/* Specs: voyageurs · m² · pièces · chambres · sdb */}
        <p className="mb-3 text-[0.875rem] text-gray-700">
          {capacity.total} voyageurs · {surface} m² · {pieces} pièce{pieces > 1 ? "s" : ""} ·{" "}
          {bedrooms} chambre{bedrooms > 1 ? "s" : ""} · {bathrooms} sdb
        </p>

        {/* Amenity pills */}
        {displayAmenities.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {displayAmenities.map((a) => (
              <span
                key={a.id}
                className="inline-flex items-center rounded-md bg-[#EBF2F9] px-2 py-0.5 text-[0.78rem] font-medium text-[#1B3D6B]"
              >
                {a.label}
              </span>
            ))}
          </div>
        )}

        {/* Price row */}
        <div className="mt-auto flex items-end justify-end gap-2">
          <div className="text-right">
            {price.originalAmount != null && (
              <span className="mr-1.5 text-sm text-gray-400 line-through">
                {formatPrice(price.originalAmount)}
              </span>
            )}
            <span className="text-base font-bold text-[#1B3D6B]">
              {formatPrice(price.amount)}
            </span>
          </div>
        </div>

        {/* Free cancellation */}
        {price.freeCancellation && (
          <p className="mt-1.5 text-xs text-green-600">Annulation gratuite</p>
        )}
      </div>
    </Link>
  );
}