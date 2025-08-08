import { CartItem } from '@/types/cart';

export function computeItemVolume(heightM: number, widthM: number, lengthM: number): number {
  const h = Number(heightM) || 0;
  const w = Number(widthM) || 0;
  const l = Number(lengthM) || 0;
  const v = h * w * l;
  return Number.isFinite(v) ? Number(v.toFixed(3)) : 0;
}

export function computeCartTotalVolume(items: CartItem[]): number {
  const total = items.reduce((sum, item) => sum + (item.volume * item.quantity), 0);
  return Number(total.toFixed(3));
}

export function totalItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
