import * as React from 'react';
import { ensureGuest, loadQuote, saveQuote } from '@/lib/api/guest';
import { safeGet, safeSet } from '@/lib/storage';
import { toast } from '@/components/ui/use-toast';
import { CanonicalQuoteSchema, normalizeQuote } from '@/types/canonical-quote';

type State<T> = {
  data: T | null;
  etag: string | null;
  loading: boolean;
  error: string | null;
  lastSyncAt: number | null;
};

const IDB_QUOTE_KEY = 'quote.session';

export function useQuoteSession<T = unknown>(options: { baseUrl: string; debounceMs?: number } ) {
  const { baseUrl, debounceMs = 600 } = options;
  const [state, setState] = React.useState<State<T>>(() => {
    const cached = safeGet<{ data: T | null; etag: string | null }>(IDB_QUOTE_KEY, { data: null, etag: null });
    return { data: cached.data, etag: cached.etag, loading: true, error: null, lastSyncAt: null };
  });

  const pendingRef = React.useRef<T | null>(state.data);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = React.useRef(false);

  // Bootstrap cookie + server state, prefer server if present
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      await ensureGuest(baseUrl);
      const loaded = await loadQuote(baseUrl, state.etag);
      if (cancelled) return;
      if (loaded && loaded.status === 304) {
        // no change; just mark synced and keep cached data
        setState(prev => ({ ...prev, loading: false, lastSyncAt: Date.now(), etag: loaded.etag ?? prev.etag }));
        return;
      }
      if (loaded && loaded.quote) {
        try {
          const parsed = JSON.parse(loaded.quote) as T;
          safeSet(IDB_QUOTE_KEY, { data: parsed, etag: loaded.etag ?? null });
          setState({ data: parsed, etag: loaded.etag ?? null, loading: false, error: null, lastSyncAt: Date.now() });
          pendingRef.current = parsed;
        } catch {
          setState(prev => ({ ...prev, loading: false }));
        }
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

  const flush = React.useCallback(async () => {
    if (savingRef.current) return;
    const toSave = pendingRef.current;
    if (toSave === null || toSave === undefined) return;
    savingRef.current = true;
    try {
      const body = JSON.stringify(toSave);
      const { etag, status } = await saveQuote(baseUrl, body, state.etag);
      if (status === 412) {
        // ETag conflict → reload latest then retry once
        const latest = await loadQuote(baseUrl);
        if (latest?.quote) {
          try {
            const parsed = JSON.parse(latest.quote) as T;
            safeSet(IDB_QUOTE_KEY, { data: parsed, etag: latest.etag });
            setState({ data: parsed, etag: latest.etag, loading: false, error: null, lastSyncAt: Date.now() });
            // merge strategy: prefer local pending data and attempt save again
            const retry = await saveQuote(baseUrl, JSON.stringify(pendingRef.current), latest.etag ?? null);
            if (retry.status === 200) {
              safeSet(IDB_QUOTE_KEY, { data: pendingRef.current, etag: retry.etag });
              setState(prev => ({ ...prev, etag: retry.etag ?? prev.etag, lastSyncAt: Date.now() }));
              toast({
                title: 'Synced latest changes',
                description: 'Your quote was updated elsewhere. We re-synced and saved your changes.',
              });
            } else {
              toast({
                title: 'Quote updated elsewhere',
                description: 'We loaded the latest version. Please try saving again.',
              });
            }
          } catch {
            // ignore
          }
        }
      } else if (status === 200) {
        safeSet(IDB_QUOTE_KEY, { data: toSave, etag });
        setState(prev => ({ ...prev, etag: etag ?? prev.etag, lastSyncAt: Date.now() }));
      }
    } finally {
      savingRef.current = false;
    }
  }, [baseUrl, state.etag]);

  // Flush on tab hide or page unload to reduce data loss
  React.useEffect(() => {
    const onVisibilityChange = () => {
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        void flush();
      }
    };
    const onPageHide = () => {
      void flush();
    };
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', onVisibilityChange);
      window.addEventListener('pagehide', onPageHide);
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        window.removeEventListener('pagehide', onPageHide);
      }
    };
  }, [flush]);

  // simple in-memory throttle for toasts
  const lastToastRef = React.useRef<number>(0);
  const showThrottledToast = (title: string, description: string) => {
    const now = Date.now();
    if (now - lastToastRef.current < 3000) return;
    lastToastRef.current = now;
    toast({ title, description });
  };

  const setData = React.useCallback((updater: T | ((prev: T | null) => T)) => {
    setState(prev => {
      const rawNext = typeof updater === 'function' ? (updater as any)(prev.data) : updater;
      // Validate/normalize if matches our expected shape; otherwise store as-is
      let next = rawNext as any;
      try {
        // attempt safe parse only for object-like payloads
        if (next && typeof next === 'object') {
          next = normalizeQuote(next);
        }
      } catch {}
      safeSet(IDB_QUOTE_KEY, { data: next, etag: prev.etag });
      pendingRef.current = next;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { void flush(); }, debounceMs);
      return { ...prev, data: next };
    });
  }, [debounceMs, flush]);

  React.useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return {
    data: state.data as T | null,
    setData,
    etag: state.etag,
    loading: state.loading,
    error: state.error,
    lastSyncAt: state.lastSyncAt,
    flush,
  } as const;
}


