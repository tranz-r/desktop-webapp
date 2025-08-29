import { API_BASE_URL } from './config';

// Types matching the backend RemovalPricingDto structure
export interface ServiceTextDto {
  id: number;
  text: string;
}

export interface RateLeafDto {
  baseBlockHours: number;
  baseBlockPrice: number;
  hourlyAfter: number;
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
  rates: RatesDto;
}

// Helper function to get crew rates based on crew size
export function getCrewRates(crewSize: number, pricingData: RemovalPricingDto): MoversDto {
  switch (crewSize) {
    case 1:
      return pricingData.rates.one;
    case 2:
      return pricingData.rates.two;
    case 3:
      return pricingData.rates.three;
    default:
      throw new Error(`Invalid crew size: ${crewSize}. Must be 1, 2, or 3.`);
  }
}

// Calculate base price based on crew size, service level, and hours
export function calculateBasePrice(
  crewSize: number,
  serviceLevel: 'standard' | 'premium',
  hours: number,
  pricingData: RemovalPricingDto
): number {
  const crewRates = getCrewRates(crewSize, pricingData);
  const rateLeaf = serviceLevel === 'premium' ? crewRates.premium : crewRates.standard;
  
  // Calculate base price + additional hours
  const basePrice = rateLeaf.baseBlockPrice;
  
  if (hours <= rateLeaf.baseBlockHours) {
    return basePrice;
  }
  
  const additionalHours = hours - rateLeaf.baseBlockHours;
  const additionalCost = additionalHours * rateLeaf.hourlyAfter;
  
  return basePrice + additionalCost;
}

// Fetch removal pricing data with ETag caching support
export async function fetchRemovalPricing(etag?: string): Promise<{
  data: RemovalPricingDto;
  etag: string;
}> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add ETag for caching if provided
  if (etag) {
    headers['If-None-Match'] = etag;
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/prices/removal-prices`, {
    method: 'GET',
    headers,
  });

  if (response.status === 304) {
    throw new Error('NotModified');
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch removal pricing: ${response.status} ${response.statusText}`);
  }

  const data: RemovalPricingDto = await response.json();
  const responseEtag = response.headers.get('ETag') || '';

  return { data, etag: responseEtag };
}

// Get service features for a specific service level
export function getServiceFeatures(
  serviceLevel: 'standard' | 'premium',
  pricingData: RemovalPricingDto
): string[] {
  const features = serviceLevel === 'premium' 
    ? pricingData.rates.premiumServiceTexts 
    : pricingData.rates.standardServiceTexts;
  
  return features.map(feature => feature.text);
}

// Calculate total price including additional services
export function calculateTotalPrice(
  crewSize: number,
  serviceLevel: 'standard' | 'premium',
  hours: number,
  dismantleCount: number,
  assemblyCount: number,
  pricingData: RemovalPricingDto
): {
  basePrice: number;
  dismantleCost: number;
  assemblyCost: number;
  totalPrice: number;
} {
  const basePrice = calculateBasePrice(crewSize, serviceLevel, hours, pricingData);
  
  // Additional service costs (using standard rates from the existing implementation)
  const dismantleCost = dismantleCount * 18; // £18 per item dismantle
  const assemblyCost = assemblyCount * 25;   // £25 per item assembly
  
  const totalPrice = basePrice + dismantleCost + assemblyCost;
  
  return {
    basePrice,
    dismantleCost,
    assemblyCost,
    totalPrice
  };
}
