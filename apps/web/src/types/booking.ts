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

export type PricingTierId = 'standard' | 'premium';

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

// Removal Pricing Types
export interface ServiceTextDto {
  id: number;
  text: string;
}

export interface RateLeafDto {
  baseBlockHours: number;
  baseBlockPrice: number;
  hourlyAfter: number;
  pickUpDropOff?: QuoteBreakdown;
}

export interface MoversDto {
  standard: RateLeafDto;
  premium: RateLeafDto;
}

export interface RatesDto {
  one: MoversDto;
  two: MoversDto;
  three: MoversDto;
  standardServiceTexts: ServiceTextDto[];
  premiumServiceTexts: ServiceTextDto[];
}

export interface RemovalPricingDto {
  version: string;
  currency: string;
  generatedAt: string;
  extraPrice: ExtraPricesDto;  // Add this missing field
  rates: RatesDto;
}

export interface ExtraPricesDto {
  dismantle?: AdditionalPriceDto;
  assembly?: AdditionalPriceDto;
}

export interface AdditionalPriceDto {
  id: string;
  type: string;
  description?: string;
  price: number;
  currencyCode: string;
  effectiveFrom: string;
  effectiveTo?: string;
  isActive: boolean;
  version: number;
}

// Cached removal pricing data structure for storage (no functions)
export interface CachedRemovalPricing {
  data: RemovalPricingDto;
  etag: string;
  lastFetched: string; // ISO timestamp
  maxAge: number; // Cache duration in seconds (from backend Cache-Control)
}

// Runtime version with validation function
export interface CachedRemovalPricingWithValidation extends CachedRemovalPricing {
  isValid: () => boolean; // Function to check if cache is still valid
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
  county?: string;           // County/state (matches backend)
  postcode?: string;
  country?: string;
  floor?: number;         // 0 = ground, 1+ floors
  hasElevator?: boolean;  // true if elevator available
  latitude?: number;
  longitude?: number;
  
  // Extended Mapbox fields for complete address data
  fullAddress?: string;           // Complete formatted address
  addressNumber?: string;         // House/building number
  street?: string;               // Street name
  neighborhood?: string;         // Neighborhood/district
  district?: string;             // District/borough
  region?: string;               // State/region
  regionCode?: string;           // State/region code
  countryCode?: string;          // Country code (e.g., 'gb')
  placeName?: string;            // Full place name from Mapbox
  accuracy?: string;             // Address accuracy level
  mapboxId?: string;             // Mapbox feature ID
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

// Individual quote data structure for the context
export interface QuoteData {
  // Backend entity identifier (GUID as string)
  quoteId?: string;
  // Guest session identifier (from backend cookie/session)
  sessionId?: string;
  // Quote Reference (from backend)
  quoteReference?: string;
  
  // Inventory & Cart
  items: QuoteItem[];
  
  // Addresses
  origin?: Address;
  destination?: Address;
  
  // Distance
  distanceMiles?: number;
  
  // Assembly/Dismantle tracking
  numberOfItemsToDismantle: number;
  numberOfItemsToAssemble: number;
  
  // Vehicle & Crew
  vanType?: VanType;
  driverCount: number;
  
  // Schedule & Logistics
  collectionDate?: string; // collection date
  deliveryDate?: string;
  hours?: number; // duration in hours (min 3)
  flexibleTime?: boolean; // if true, timeSlot may be ignored
  timeSlot?: 'morning' | 'afternoon' | 'evening';
  
  // Pricing
  pricingTier?: PricingTierId;
  totalCost?: number;
  pickUpDropOffPrice?: PickUpDropOffPrice;
  removalPricing?: CachedRemovalPricing;
  
  // Customer
  customer?: {
    fullName?: string;
    email?: string;
    phone?: string;
    billingAddress?: Address; // Use full Address interface
  };
  
  // Payment
  paymentStatus?: 'pending' | 'paid' | 'failed';
  paymentType?: 'full' | 'deposit' | 'later';
  depositAmount?: number;
  
  // Payment details (for confirmation page)
  payment?: {
    bookingId?: string;
    clientSecret?: string;
    paymentIntentId?: string;
    status?: 'pending' | 'paid' | 'failed';
    jobDetails?: any;
    paymentType?: 'full' | 'deposit' | 'later';
    depositAmount?: number;
    dueDate?: string;
  };
}

// Shared data across all quote types
export interface SharedData {
  // Customer data is now stored per quote, not shared
  distanceMiles?: number;
}

