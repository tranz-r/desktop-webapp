import { HybridStorage } from '@/lib/storage/HybridStorage';

// Simple localStorage wrapper for small, simple data (tokens, preferences, etc.)
// For quote data and large objects, use HybridStorage (IndexedDB) directly
export function simpleStorageGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem('tranzr:' + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function simpleStorageSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('tranzr:' + key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function simpleStorageRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('tranzr:' + key);
  } catch {
    // ignore
  }
}

// Legacy functions for backward compatibility - use HybridStorage for quote data
export const safeGet = simpleStorageGet;
export const safeSet = simpleStorageSet;
export const safeRemove = simpleStorageRemove;
