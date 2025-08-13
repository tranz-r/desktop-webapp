import { BookingState } from '@/types/booking';
import { CartItem } from '@/types/cart';
import { safeGet, safeSet, safeRemove } from '@/lib/storage';

export interface SavedBooking {
  reference: string;
  createdAtISO: string;
  booking: BookingState;
  cart: CartItem[];
  amountPence: number;
  paymentIntentId?: string | null;
}

const KEY = 'lastBooking';

export function saveLastBooking(data: SavedBooking) {
  safeSet(KEY, data);
}

export function loadLastBooking(): SavedBooking | undefined {
  return safeGet<SavedBooking | undefined>(KEY, undefined);
}

export function clearLastBooking() {
  safeRemove(KEY);
}

export function generateReference(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TRZ-${ts}-${rand}`;
}
