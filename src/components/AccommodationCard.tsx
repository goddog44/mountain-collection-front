"use client";

import type { Accommodation } from "@/lib/types";
import AccommodationCardList from "./ui/AccommodationCardList";
import AccommodationCardMosaic from "./ui/AccommodationCardMosaic";

interface AccommodationCardProps {
  accommodation: Readonly<Accommodation>;
  viewMode?: "liste" | "mosaique";
}

export default function AccommodationCard({
  accommodation,
  viewMode = "mosaique",
}: AccommodationCardProps) {
  if (viewMode === "liste") {
    return <AccommodationCardList accommodation={accommodation} />;
  }

  return <AccommodationCardMosaic accommodation={accommodation} />;
}
