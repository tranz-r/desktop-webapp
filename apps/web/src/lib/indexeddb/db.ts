import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'tranzr-web';
const DB_VERSION = 2; // Increment version to force recreation
const STORE_KV = 'kv';

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDb(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion) {
        console.log('[IndexedDB] Database upgrade from version', oldVersion, 'to', DB_VERSION);
        
        // Always ensure the kv store exists
        if (!db.objectStoreNames.contains(STORE_KV)) {
          console.log('[IndexedDB] Creating kv object store');
          db.createObjectStore(STORE_KV);
        }
        
        // Handle version upgrades
        if (oldVersion < 1) {
          console.log('[IndexedDB] Initial database creation');
        }
        
        if (oldVersion < 2) {
          console.log('[IndexedDB] Version 2 upgrade - ensuring kv store exists');
          // Force recreation if needed
          if (!db.objectStoreNames.contains(STORE_KV)) {
            db.createObjectStore(STORE_KV);
          }
        }
      },
      blocked() {
        console.warn('[IndexedDB] Database upgrade blocked by another tab');
      },
      blocking() {
        console.warn('[IndexedDB] Database upgrade blocking other tabs');
      },
      terminated() {
        console.warn('[IndexedDB] Database connection terminated');
        // Reset the promise so it can be recreated
        dbPromise = null;
      }
    });
  }
  return dbPromise;
}

export const stores = {
  KV: STORE_KV,
};