import { idbGet, idbSet, idbRemove } from '@/lib/indexeddb/kv';

const PREFIX = 'tranzr:';

export const HybridStorage = {
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      // Use only IndexedDB for data storage
      const idb = await idbGet<T>(PREFIX + key, undefined as unknown as T);
      if (idb !== undefined && idb !== null) return idb;
      return fallback;
    } catch (error) {
      console.error('[HybridStorage] GET failed for key:', key, 'Error:', error);
      return fallback;
    }
  },
  
  async set<T>(key: string, value: T): Promise<void> {
    try {
      // Store only in IndexedDB
      await idbSet(PREFIX + key, value);
      console.log('[HybridStorage] SET successful for key:', key);
    } catch (error) {
      console.error('[HybridStorage] SET failed for key:', key, 'Error:', error);
      throw error; // Re-throw to let caller handle it
    }
  },
  
  async remove(key: string): Promise<void> {
    try {
      // Remove only from IndexedDB
      await idbRemove(PREFIX + key);
      console.log('[HybridStorage] REMOVE successful for key:', key);
    } catch (error) {
      console.error('[HybridStorage] REMOVE failed for key:', key, 'Error:', error);
      throw error; // Re-throw to let caller handle it
    }
  },
};


