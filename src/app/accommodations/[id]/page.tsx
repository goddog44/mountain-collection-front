import { notFound } from "next/navigation";
import { accommodations } from "@/data/accommodations";
import AccommodationDetailClient from "./AccommodationDetailClient";

export default async function AccommodationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const accommodation = accommodations.find((a) => a.id === id);

  if (!accommodation) notFound();

  return <AccommodationDetailClient accommodation={accommodation} />;
}
