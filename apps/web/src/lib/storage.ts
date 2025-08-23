import { HybridStorage } from '@/lib/storage/HybridStorage';

export function safeGet<T>(key: string, fallback: T): T {
  // Synchronous API preserved by using deasync-like pattern: we can't truly block,
  // so for now fall back to localStorage synchronously and let async layer write-through.
  // Consumers that need async can switch to a new API later.
  if (typeof window === 'undefined') return fallback;
  // Best-effort async read; synchronous fallback will still return immediately
  // to preserve existing calling semantics.
  let result = fallback;
  try {
    const raw = window.localStorage.getItem('tranzr:' + key);
    if (raw) result = JSON.parse(raw) as T;
  } catch {}
  // Kick off async IndexedDB fetch to refresh local cache
  void (async () => {
    const v = await HybridStorage.get<T>(key, result);
    try {
      window.localStorage.setItem('tranzr:' + key, JSON.stringify(v));
    } catch {}
  })();
  return result;
}

export function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('tranzr:' + key, JSON.stringify(value));
  } catch {}
  void HybridStorage.set(key, value);
}

export function safeRemove(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem('tranzr:' + key);
  } catch {}
  void HybridStorage.remove(key);
}
