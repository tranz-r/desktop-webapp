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

// API Response Types for Pricing
export interface ItemBreakdown {
  id: number;
  name: string;
  quantity: number;
  unitLengthCm: number;
  unitWidthCm: number;
  unitHeightCm: number;
  unitLongestEdgeM: number;
  unitSecondEdgeM: number;
  unitVolumeM3: number;
  lineVolumeM3: number;
  bulkiness: 'Normal' | 'Bulky' | 'VeryBulky';
  bulkinessReasons: string[];
}

export interface QuoteBreakdown {
  // pricing
  base: number;
  volumeSurcharge: number;
  tierUplift: number;
  tieredSubtotal: number;
  
  // crew
  recommendedMinimumMovers: number;
  requestedMovers: number;
  crewFee: number;
  crewRuleReasons: string[];
  
  // access & extras
  stairsFee: number;
  longCarryFee: number;
  assemblyFee: number;
  dismantleFee: number;
  extrasFee: number;
  
  // totals
  totalExVat: number;
  vatRate: number;
  customerTotal: number;
  
  // context
  totalVolumeM3: number;
  bulkyItemsCount: number;
  veryBulkyItemsCount: number;
  
  items: ItemBreakdown[];
}

export interface PickUpDropOffPrice {
  standard: QuoteBreakdown;
  premium: QuoteBreakdown;
}

// API Request Types for CreateJobAsync
export interface QuoteItem {
  id: number;        
  name: string;      
  lengthCm: number;  
  widthCm: number;   
  heightCm: number;  
  quantity: number;  
}

export interface QuoteRequest {
  distanceMiles: number;                   
  items: QuoteItem[];
  stairsFloors: number;                     
  longCarry: boolean;                       
  numberOfItemsToAssemble: number;          
  numberOfItemsToDismantle: number;         
  parkingFee: number;                       
  ulezFee: number;                          
  vatRegistered: boolean;                   
  requestedMovers: number;                  
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
  // API response from CreateJobAsync for send/receive quote options
  pickUpDropOffPrice?: PickUpDropOffPrice;
}

export interface PaymentState {
  bookingId?: string;
  clientSecret?: string;
  paymentIntentId?: string;
  status?: 'pending' | 'paid' | 'failed';
  jobDetails?: any;
  // New fields for payment options
  paymentType?: 'full' | 'deposit' | 'later';
  depositAmount?: number;
  dueDate?: string; // ISO date string
}

export interface CustomerState {
  fullName?: string;
  email?: string;
  phone?: string;
  billingAddress?: Pick<Address, 'line1' | 'postcode'>;
  // Make customer the single source of truth for origin/destination on the origin-destination screen
  origin?: Address;
  destination?: Address;
  distanceMiles?: number;
}

export interface BookingState {
  // New nested state (authoritative)
  vehicle: VehicleState;
  schedule: ScheduleState;
  pricing: PricingState;
  payment?: PaymentState;
  customer?: CustomerState;
}

// Quote option selection to drive different quote journeys
export enum QuoteOption {
  Send = 'send',
  Receive = 'receive',
  Removals = 'removals',
}

