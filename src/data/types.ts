export type PropertyType =
  | 'house'
  | 'apartment'
  | 'penthouse'
  | 'villa'
  | 'land'
  | 'commercial'
  | 'office'
  | 'warehouse'
  | 'building';

export type TransactionType = 'sale' | 'rent';

export type UserType = 'agent' | 'independent' | 'owner';

export type PropertyStatus = 'active' | 'sold' | 'rented' | 'pending';

export interface PropertyImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Location {
  slug: string;
  city: string;
  sector: string;
  province: string;
  country: string;
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Agent {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  photo: string;
  company?: string;
  userType: UserType;
  verified: boolean;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  languages: string[];
  bio: string;
  propertiesCount: number;
  responseTime: string;
  specializations: PropertyType[];
  locations: string[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  transactionType: TransactionType;
  status: PropertyStatus;
  price: number;
  currency: 'USD' | 'DOP';
  pricePerSqm?: number;
  // Rental price (when property is both for sale and rent)
  rentalPrice?: number;
  rentalCurrency?: 'USD' | 'DOP';
  // Project ranges
  isProject?: boolean;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  bedroomsMin?: number;
  bedroomsMax?: number;
  bathroomsMin?: number;
  bathroomsMax?: number;
  parkingMin?: number;
  parkingMax?: number;
  location: Location;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  area: number;
  landArea?: number;
  yearBuilt?: number;
  floor?: number;
  totalFloors?: number;
  features: string[];
  images: PropertyImage[];
  videoUrl?: string;
  virtualTourUrl?: string;
  agent: Agent;
  isFeatured: boolean;
  isExclusive: boolean;
  isNew: boolean;
  isPriceReduced: boolean;
  previousPrice?: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  query?: string;
  transactionType?: TransactionType | 'all';
  propertyType?: PropertyType | 'all';
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  features?: string[];
}

export interface LocationSEO {
  slug: string;
  name: string;
  province: string;
  title: {
    es: string;
    en: string;
    fr: string;
  };
  description: {
    es: string;
    en: string;
    fr: string;
  };
  image: string;
  propertyCount: number;
}
