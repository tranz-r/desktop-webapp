import { Address } from '@/types/booking';

export function isNonEmptyString(value?: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}

export function isValidPostcode(value?: string): boolean {
  if (!isNonEmptyString(value)) return false;
  // Very loose UK postcode check placeholder
  return /^[A-Za-z0-9\s-]{3,10}$/.test(value!.trim());
}

export function validateAddress(address?: Address): boolean {
  if (!address) return false;
  return isNonEmptyString(address.line1) && isNonEmptyString(address.postcode);
}
