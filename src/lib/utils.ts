import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "EUR"): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + " €";
}

export function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    studio: "Studio",
    apartment_2: "Appartement 2 pièces",
    apartment_3: "Appartement 3 pièces",
    apartment_4_plus: "Appartement 4+ pièces",
    chalet: "Chalet",
  };
  return labels[type] ?? type;
}
