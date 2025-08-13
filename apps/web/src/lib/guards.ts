import { BookingState } from '@/types/booking';

export function hasInventory(itemsCount: number): boolean {
  return itemsCount > 0;
}

export function canSelectVan(itemsCount: number): boolean {
  return hasInventory(itemsCount);
}

export function canEnterAddresses(state: BookingState): boolean {
  return !!state.vehicle.selectedVan;
}

export function canEnterPricing(state: BookingState): boolean {
  const origin = (state as any).customer?.origin;
  const destination = (state as any).customer?.destination;
  return !!state.vehicle.selectedVan && !!origin && !!destination;
}

export function canEnterPayment(state: BookingState): boolean {
  return canEnterPricing(state) && !!state.pricing.pricingTier;
}
