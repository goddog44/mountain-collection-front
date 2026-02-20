"use client";

import Link from "next/link";
import { Heart, Home } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { formatPrice } from "@/lib/utils"; // Assuming this exists and works for numbers
import type { Property } from "@/lib/types";
import { useState } from "react";

interface Props {
    property: Property;
}

export default function PropertyCard({ property }: Props) {
    const [isFavorite, setIsFavorite] = useState(property.isFavorite);

    const {
        id,
        name,
        images,
        bedrooms,
        bathrooms,
        surface,
        price,
        description,
        location,
        badges,
    } = property;

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFavorite((v) => !v);
    };

    // Badge logic
    const leftBadge = badges.find(b => b.type === "new" || b.type === "eco");

    const typeLabel = property.type === "chalet" ? "Chalet" :
        property.type === "commercial" ? "Local commercial" : "Appartement";
    const stationLabel = location?.station ?? "";

    return (
        <Link
            href={`/properties/${id}`} // Assuming route exists or will exist
            className="group flex flex-col overflow-hidden rounded-[12px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:shadow-[0_0_16px_rgba(0,0,0,0.14)]"
        >
            {/* ── IMAGE ── */}
            <div className="relative">
                <ImageCarousel
                    images={images}
                    alt={name}
                    className="overflow-hidden rounded-t-[12px]"
                />

                <div className="absolute left-2 top-2 flex flex-col gap-1.5">
                    {leftBadge && (
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#1B3D6B] px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                            {leftBadge.label}
                        </span>
                    )}

                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                        <Home className="h-4 w-4 text-gray-600" strokeWidth={2} />
                    </span>
                </div>
            </div>

            {/* ── CONTENT ── */}
            <div className="flex flex-1 flex-col p-4">
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

                {description && (
                    <p className="mb-1.5 line-clamp-1 text-[0.875rem] text-gray-500">
                        {description}
                    </p>
                )}

                <p className="mb-3 text-[0.875rem] text-gray-700">
                    {surface} m² · {bedrooms} chambre{bedrooms !== 1 ? "s" : ""} · {bathrooms} sdb
                </p>

                {/* Price row */}
                <div className="mt-auto flex items-end justify-end gap-2">
                    <div className="text-right">
                        <span className="text-base font-bold text-[#1B3D6B]">
                            {formatPrice(price)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
