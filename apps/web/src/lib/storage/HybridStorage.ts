import { idbGet, idbSet, idbRemove } from '@/lib/indexeddb/kv';

const PREFIX = 'tranzr:';

function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function lsSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

function lsRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

export const HybridStorage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    // Try IndexedDB first
    const idb = await idbGet<T>(PREFIX + key, undefined as unknown as T);
    if (idb !== undefined && idb !== null) return idb;
    // Fallback to localStorage
    return lsGet<T>(key, fallback);
  },
  async set<T>(key: string, value: T): Promise<void> {
    // Write to both (best effort)
    await idbSet(PREFIX + key, value).catch(() => {});
    lsSet(key, value);
  },
  async remove(key: string): Promise<void> {
    await idbRemove(PREFIX + key).catch(() => {});
    lsRemove(key);
  },
};


