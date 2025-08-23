import { getDb, stores } from './db';

export async function idbGet<T>(key: string, fallback: T): Promise<T> {
  try {
    const db = await getDb();
    const value = await db.get(stores.KV, key);
    if (value === undefined || value === null) return fallback;
    return value as T;
  } catch {
    return fallback;
  }
}

export async function idbSet<T>(key: string, value: T): Promise<void> {
  try {
    const db = await getDb();
    await db.put(stores.KV, value, key);
  } catch {
    // ignore
  }
}

export async function idbRemove(key: string): Promise<void> {
  try {
    const db = await getDb();
    await db.delete(stores.KV, key);
  } catch {
    // ignore
  }
}


