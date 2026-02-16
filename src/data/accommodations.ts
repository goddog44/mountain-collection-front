import type { Accommodation } from "@/lib/types";

const stations = [
  "Les Arcs",
  "Arc 1800",
  "Arc 2000",
  "Tignes",
  "Val Thorens",
  "Méribel",
  "Courchevel",
  "La Plagne",
  "Val d'Isère",
  "Les Menuires",
];

const amenityIds = [
  "wifi",
  "parking",
  "piscine",
  "spa",
  "lave-vaisselle",
  "lave-linge",
  "balcon",
  "animaux",
  "cheminee",
];

function pick<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const types: Accommodation["type"][] = [
  "studio",
  "apartment_2",
  "apartment_3",
  "apartment_4_plus",
  "chalet",
];

const places = [
  "Proche centre station",
  "Pied des pistes",
  "Balcon",
  "Vue montagne",
  "Résidence",
  "Appartement rénové",
  "Proche école de ski",
  "Départ à ski",
];

export function generateMockAccommodations(count: number): Accommodation[] {
  const list: Accommodation[] = [];
  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const station = stations[i % stations.length];
    const capacity = randomBetween(2, 10);
    const bedrooms = type === "studio" ? 0 : randomBetween(1, 4);
    const surface = randomBetween(25, 120);
    const amount = randomBetween(400, 2500);
    list.push({
      id: `acc-${i + 1}`,
      name: `${type === "studio" ? "Studio" : "Appartement"} · ${station}`,
      type,
      location: {
        city: station,
        station,
        altitude: randomBetween(1600, 2300),
      },
      images: [
        `https://picsum.photos/seed/${i + 1}a/400/280`,
        `https://picsum.photos/seed/${i + 1}b/400/280`,
        `https://picsum.photos/seed/${i + 1}c/400/280`,
      ],
      capacity: {
        adults: Math.min(capacity, 8),
        children: Math.max(0, capacity - 6),
        total: capacity,
      },
      bedrooms,
      bathrooms: randomBetween(1, 3),
      surface,
      rating: 3.5 + Math.random() * 1.5,
      reviewCount: randomBetween(5, 120),
      amenities: pick(amenityIds, randomBetween(3, 7)).map((id) => ({
        id,
        name: id,
        icon: id,
        category: "comfort" as const,
      })),
      price: {
        amount: i % 5 === 0 ? Math.round(amount * 0.64) : amount,
        currency: "EUR",
        freeCancellation: Math.random() > 0.5,
        originalAmount: i % 5 === 0 ? amount : undefined,
      },
      badges: (() => {
        if (i % 5 === 0)
          return [
            { type: "discount" as const, label: "Nos Promotions" },
            { type: "discount" as const, value: "-36%" },
          ];
        if (i % 7 === 0) return [{ type: "favorite" as const, label: "Coup de cœur" }];
        return [];
      })(),
      isFavorite: false,
      distanceToSlopes: randomBetween(50, 800),
      pmrAccessible: i % 10 === 0,
      description: pick(places, 3).join(" · "),
    });
  }
  return list;
}

export const accommodations: Accommodation[] =
  generateMockAccommodations(28);

export const STATIONS_LIST = stations;
