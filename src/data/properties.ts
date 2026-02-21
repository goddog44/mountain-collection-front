import type { Property, PropertyType, Amenity, Badge } from "@/lib/types";
import { LOCAL_FOLDERS } from "./localFolders";

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
    "Magnifique appartement au pied des pistes, vue montagne exceptionnelle.",
    "Chalet traditionnel avec vue panoramique, ski in / ski out.",
    "Local commercial idéalement placé au cœur de la station.",
    "Superbe studio moderne au centre station pour 2 personnes.",
    "Penthouse de luxe au dernier étage avec terrasse plein sud.",
    "Résidence intimiste, très belles prestations haut de gamme.",
    "Investissement locatif garanti avec bail commercial.",
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


export const properties: Property[] = Array.from({ length: 200 }).map((_, i) => {
    const type = propertyTypes[i % propertyTypes.length];
    const station = stations[i % stations.length];
    const surface = randomBetween(20, 250);
    const price = randomBetween(120000, 2800000);

    const propNames = ["L'Écrin Blanc", "Les Carlines", "Le Dahu", "Cristal de Roche", "Altitudes", "Le Cèdre", "La Trace"];
    const prefix = propNames[i % propNames.length];

    return {
        id: `prop-${i + 1}`,
        name: `${prefix} - ${type === "chalet" ? "Chalet" : type === "commercial" ? "Local commercial" : "Appartement"} ${station}`,
        type,
        location: {
            city: station,
            station,
            altitude: randomBetween(1600, 2300),
        },
        images: (() => {
            const ALL_IMAGES: string[] = [];
            LOCAL_FOLDERS.forEach((folder) => {
                folder.files.forEach((file) => {
                    ALL_IMAGES.push(`/images/logements/${folder.name}/${file}`);
                });
            });

            const numImages = ALL_IMAGES.length;
            // Use a different prime multiplier for property images to mix them differently than accommodations
            const index1 = (i * 17) % numImages;
            const index2 = (index1 + 89) % numImages;
            const index3 = (index1 + 193) % numImages;

            return [
                ALL_IMAGES[index1],
                ALL_IMAGES[index2],
                ALL_IMAGES[index3]
            ];
        })(),
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
