import { API_BASE_URL } from './config';
import type { RemovalPricingDto, CachedRemovalPricing } from '@/types/booking';

// Helper function to get crew rates based on crew size
export function getCrewRates(crewSize: number, pricingData: RemovalPricingDto) {
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

// Create a cached removal pricing object
export function createCachedRemovalPricing(
  data: RemovalPricingDto, 
  etag: string, 
  maxAgeSeconds: number = 21600
): CachedRemovalPricing {
  return {
    data,
    etag,
    lastFetched: new Date().toISOString(),
    maxAge: maxAgeSeconds
  };
}

// Check if cached removal pricing is valid
export function isCachedRemovalPricingValid(cached: CachedRemovalPricing | undefined): boolean {
  if (!cached) return false;
  
  const now = new Date();
  const lastFetched = new Date(cached.lastFetched);
  const maxAgeMs = cached.maxAge * 1000;
  
  return (now.getTime() - lastFetched.getTime()) < maxAgeMs;
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
  
  // Additional service costs (using dynamic rates from backend)
  const dismantleCost = dismantleCount * (pricingData.extraPrice.dismantle?.price || 0);
  const assemblyCost = assemblyCount * (pricingData.extraPrice.assembly?.price || 0);

  const totalPriceWithoutVat = basePrice + dismantleCost + assemblyCost; 
  const totalPrice = totalPriceWithoutVat * 1.2;
  
  return {
    basePrice,
    dismantleCost,
    assemblyCost,
    totalPrice
  };
}
