import type { Property, PropertyType, Amenity, Badge } from "@/lib/types";

const stations = [
    "Les Arcs",
    "Tignes",
    "Val Thorens",
    "Méribel",
    "Courchevel",
    "La Plagne",
    "Val d'Isère",
    "Les Menuires",
];

const propertyTypes: PropertyType[] = ["apartment", "chalet", "commercial"];

const descriptions = [
    "Magnifique appartement au pied des pistes",
    "Chalet traditionnel avec vue panoramique",
    "Local commercial idéalement placé",
    "Studio rénové au centre station",
    "Penthouse de luxe avec spa privé",
];

const amenitiesList: Amenity[] = [
    { id: "wifi", name: "Wifi", icon: "wifi", category: "services" },
    { id: "parking", name: "Parking", icon: "parking", category: "services" },
    { id: "ski-locker", name: "Casier à ski", icon: "snowflake", category: "services" },
    { id: "balcony", name: "Balcon", icon: "sun", category: "outdoor" },
    { id: "pool", name: "Piscine", icon: "waves", category: "services" },
];

function pick<T>(arr: T[], n: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}

function randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const properties: Property[] = Array.from({ length: 20 }).map((_, i) => {
    const type = propertyTypes[i % propertyTypes.length];
    const station = stations[i % stations.length];
    const surface = randomBetween(30, 250);
    const price = randomBetween(150000, 2500000);

    return {
        id: `prop-${i + 1}`,
        name: `${type === "chalet" ? "Chalet" : "Appartement"} ${station} - ${surface}m²`,
        type,
        location: {
            city: station,
            station,
            altitude: randomBetween(1600, 2300),
        },
        images: [
            `https://picsum.photos/seed/prop${i + 1}a/400/280`,
            `https://picsum.photos/seed/prop${i + 1}b/400/280`,
            `https://picsum.photos/seed/prop${i + 1}c/400/280`,
        ],
        bedrooms: type === "commercial" ? 0 : randomBetween(1, 6),
        bathrooms: type === "commercial" ? 1 : randomBetween(1, 4),
        surface,
        price,
        description: descriptions[i % descriptions.length],
        amenities: pick(amenitiesList, randomBetween(2, 5)),
        badges: i % 3 === 0 ? [{ type: "new", label: "Nouveauté" }] : [],
        isFavorite: false,
    };
});
