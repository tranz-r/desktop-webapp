import { IDBPDatabase, openDB } from 'idb';

const DB_NAME = 'tranzr-web';
const DB_VERSION = 1;
const STORE_KV = 'kv';

let dbPromise: Promise<IDBPDatabase> | null = null;

export function getDb(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_KV)) {
          db.createObjectStore(STORE_KV);
        }
      },
    });
  }
  return dbPromise;
}

export const stores = {
  KV: STORE_KV,
};


