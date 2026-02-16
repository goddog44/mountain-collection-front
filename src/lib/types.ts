export type AccommodationType =
  | "studio"
  | "apartment_2"
  | "apartment_3"
  | "apartment_4_plus"
  | "chalet";

export interface Accommodation {
  id: string;
  name: string;
  type: AccommodationType;
  location: {
    city: string;
    station: string;
    altitude: number;
  };
  images: string[];
  capacity: {
    adults: number;
    children?: number;
    total: number;
  };
  bedrooms: number;
  bathrooms: number;
  surface: number;
  rating: number;
  reviewCount: number;
  amenities: Amenity[];
  price: {
    amount: number;
    currency: "EUR";
    freeCancellation: boolean;
    originalAmount?: number; // prix barré si réduction
  };
  badges: Badge[];
  isFavorite: boolean;
  distanceToSlopes: number;
  pmrAccessible: boolean;
  description?: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  category: "comfort" | "kitchen" | "outdoor" | "services";
}

export interface Badge {
  type: "favorite" | "discount" | "eco" | "new";
  label?: string;
  value?: string;
}

export interface SearchFilters {
  destination?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests: {
    adults: number;
    children: number;
  };
  priceRange: {
    min: number;
    max: number;
  };
  altitude: ("low" | "medium" | "high")[];
  accommodationTypes: string[];
  capacity: number;
  amenities: string[];
  minRating?: number;
  maxDistanceToSlopes?: number;
  pmrOnly: boolean;
  stations: string[];
  bedrooms?: number;
  bathrooms?: number;
  beds?: number;
  locationFilters: string[];
  comfortLevel: string[];
  stationType: string[];
}

export type SortOption =
  | "rating_desc"
  | "price_asc"
  | "price_desc"
  | "capacity"
  | "surface";

export const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, string> = {
  studio: "Studio",
  apartment_2: "Appartement 2 pièces",
  apartment_3: "Appartement 3 pièces",
  apartment_4_plus: "Appartement 4+ pièces",
  chalet: "Chalet",
};
