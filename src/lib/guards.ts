import { BookingState } from '@/types/booking';

export function hasInventory(itemsCount: number): boolean {
  return itemsCount > 0;
}

export function canSelectVan(itemsCount: number): boolean {
  return hasInventory(itemsCount);
}

export function canEnterAddresses(state: BookingState): boolean {
  return !!state.selectedVan;
}

export function canEnterPricing(state: BookingState): boolean {
  return !!state.selectedVan && !!state.origin && !!state.destination;
}

export function canEnterPayment(state: BookingState): boolean {
  return canEnterPricing(state) && !!state.pricingTier;
}
