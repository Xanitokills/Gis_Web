import type { ID, WithTimestamps } from "./common";

export type Property = WithTimestamps & {
  id: ID;
  title: string;
  description?: string;
  price: number;
  operationType: string;
  propertyType: string;
  district: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  totalArea?: number | null;
  builtArea?: number | null;
  parking?: number | null;
  phone?: string | null;
  email?: string | null;
  status: "active" | "archived";
  featured: boolean;
  images: string[];
  amenities: string[];
  clientId?: ID | null;
};
