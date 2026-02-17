"use client";

import Link from "next/link";
import { Heart, Home } from "lucide-react";
import ImageCarousel from "../ImageCarousel";
import { formatPrice } from "@/lib/utils";
import type { Accommodation } from "@/lib/types";
import { useState } from "react";

interface Props {
  accommodation: Accommodation;
}

export default function AccommodationCardList({ accommodation }: Props) {
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

  const promoBadge = badges.find(
    (b) => b.type === "discount" && b.label === "Nos Promotions"
  );
  const discountValue = badges.find((b) => b.type === "discount" && b.value);
  const coupDeCoeur = badges.some((b) => b.type === "favorite");

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((v) => !v);
  };

  const pieces = bedrooms === 0 ? 1 : bedrooms + 1;

  return (
    <Link
      href={`/accommodations/${id}`}
      className="group flex flex-col md:flex-row overflow-hidden rounded-[12px] bg-[var(--ts-white)] shadow-[0_0_12px_rgba(0,0,0,0.08)] hover:shadow-[0_0_16px_rgba(0,0,0,0.12)] transition-all duration-200"
    >
      <div className="relative md:w-[280px] lg:w-[320px] flex-shrink-0">
        <ImageCarousel
          images={images}
          alt={name}
          className="h-full overflow-hidden rounded-t-[12px] md:rounded-l-[12px] md:rounded-tr-none"
        />

        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {promoBadge && (
            <span className="bg-primary rounded-md px-2 py-1 text-sm text-white">
              Nos Promotions
            </span>
          )}
          {(coupDeCoeur || !promoBadge) && (
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
              <Home className="h-4 w-4" />
            </span>
          )}
        </div>

        {discountValue?.value && (
          <span className="absolute right-2 top-2 rounded-full bg-[var(--ts-amber)] px-2.5 py-1 text-xs font-semibold">
            {discountValue.value}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 justify-between">
        <div>
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-[1.125rem] font-bold">{name}</h3>
            <button onClick={toggleFavorite}>
              <Heart
                className={`h-5 w-5 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          </div>

          {description && (
            <p className="mb-2 line-clamp-2 text-sm">{description}</p>
          )}

          <p className="text-sm">
            {capacity.total} voyageurs · {surface} m² · {pieces} pièce
            {pieces > 1 ? "s" : ""} · {bathrooms} sdb
          </p>
        </div>

        <div className="mt-4 text-right">
          {price.originalAmount && (
            <span className="mr-2 text-sm line-through">
              {formatPrice(price.originalAmount)}
            </span>
          )}
          <span className="text-xl font-bold">
            {formatPrice(price.amount)}
          </span>
        </div>
      </div>
    </Link>
  );
}
