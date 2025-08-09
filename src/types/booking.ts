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

export type PricingTierId = 'eco' | 'ecoPlus' | 'standard' | 'premium';

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

// Nested, slice-based shapes (v2)
export interface VehicleState {
  selectedVan?: VanType;
  driverCount: number;
}

export interface ScheduleState {
  dateISO?: string; // collection date
  deliveryDateISO?: string;
  hours?: number; // duration in hours (min 3)
  flexibleTime?: boolean; // if true, timeSlot may be ignored
  timeSlot?: 'morning' | 'afternoon' | 'evening';
}


export interface PricingState {
  pricingTier?: PricingTierId;
  totalCost: number;
}

export interface PaymentState {
  bookingId?: string;
  clientSecret?: string;
  status?: 'pending' | 'paid' | 'failed';
}

export interface CustomerState {
  fullName?: string;
  email?: string;
  phone?: string;
  billingAddress?: Pick<Address, 'line1' | 'postcode'>;
  // Make customer the single source of truth for origin/destination on the origin-destination screen
  origin?: Address;
  destination?: Address;
  distanceKm?: number;
}

export interface BookingState {
  // New nested state (authoritative)
  vehicle: VehicleState;
  schedule: ScheduleState;
  pricing: PricingState;
  payment?: PaymentState;
  customer?: CustomerState;
}

