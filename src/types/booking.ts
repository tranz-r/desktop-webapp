export type VanType = 'smallVan' | 'mediumVan' | 'largeVan' | 'xlLuton';

export interface VanInfo {
  id: VanType;
  name: string;
  capacityM3: number;
  basePrice: number;
  dimensions?: {
    lengthM: number;
    widthM: number;
    heightM: number;
  };
  driverBaseCount: number;
}

export type PricingTierId = 'basic' | 'standard' | 'premium';

export interface PricingTier {
  id: PricingTierId;
  name: string;
  multiplier: number; // used to adjust base costs
}

export interface Address {
  line1: string;
  line2?: string;
  city?: string;
  postcode?: string;
  country?: string;
  floor?: number;         // 0 = ground, 1+ floors
  hasElevator?: boolean;  // true if elevator available
  latitude?: number;
  longitude?: number;
}

export interface BookingState {
  selectedVan?: VanType;
  driverCount: number;
  origin?: Address;
  destination?: Address;
  distanceKm?: number;
  pricingTier?: PricingTierId;
  collectionDate?: string; // ISO
  deliveryDate?: string;   // ISO
  totalCost: number;
}
