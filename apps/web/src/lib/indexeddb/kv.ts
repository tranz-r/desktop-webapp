import { getDb, stores } from './db';

export async function idbGet<T>(key: string, fallback: T): Promise<T> {
  try {
    const db = await getDb();
    const value = await db.get(stores.KV, key);
    console.log('[IndexedDB] GET:', key, 'Value:', value);
    if (value === undefined || value === null) return fallback;
    return value as T;
  } catch (error) {
    console.error('[IndexedDB] GET failed for key:', key, 'Error:', error);
    return fallback;
  }
}

export async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await getDb();
    await db.put(stores.KV, value, key);
    console.log('[IndexedDB] SET successful for key:', key, 'Value:', value);
  } catch (error) {
    console.error('[IndexedDB] SET failed for key:', key, 'Error:', error);
    throw error; // Re-throw to let caller handle it
  }
}

export async function idbRemove(key: string): Promise<void> {
  try {
    const db = await getDb();
    await db.delete(stores.KV, key);
    console.log('[IndexedDB] REMOVE successful for key:', key);
  } catch (error) {
    console.error('[IndexedDB] REMOVE failed for key:', key, 'Error:', error);
    throw error; // Re-throw to let caller handle it
  }
}


