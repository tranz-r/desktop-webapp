import { useState, useEffect, useCallback } from 'react';
import { legalDocumentsService, LegalDocument } from '@/lib/api/legalDocuments';

interface UseLegalDocumentOptions {
  documentType: 'terms-and-conditions' | 'privacy-policy';
  autoFetch?: boolean;
  forceRefresh?: boolean;
}

interface UseLegalDocumentReturn {
  document: LegalDocument | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  clearCache: () => void;
  cacheInfo: Record<string, { timestamp: number; version: string; age: number }>;
}

export function useLegalDocument({
  documentType,
  autoFetch = true,
  forceRefresh = false,
}: UseLegalDocumentOptions): UseLegalDocumentReturn {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocument = useCallback(async (force = false) => {
    setLoading(true);
    setError(null);

    try {
      const doc = await legalDocumentsService.getLegalDocument(documentType, force);
      setDocument(doc);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch document';
      setError(errorMessage);
      console.error(`[useLegalDocument] Error fetching ${documentType}:`, err);
    } finally {
      setLoading(false);
    }
  }, [documentType]);

  const refetch = useCallback(() => {
    return fetchDocument(true);
  }, [fetchDocument]);

  const clearCache = useCallback(() => {
    legalDocumentsService.clearCache(documentType);
    setDocument(null);
  }, [documentType]);

  const getCacheInfo = useCallback(() => {
    return legalDocumentsService.getCacheInfo();
  }, []);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (autoFetch) {
      fetchDocument(forceRefresh);
    }
  }, [autoFetch, fetchDocument, forceRefresh]);

  return {
    document,
    loading,
    error,
    refetch,
    clearCache,
    cacheInfo: getCacheInfo(),
  };
}

// Hook for preloading all legal documents
export function usePreloadLegalDocuments() {
  const [preloading, setPreloading] = useState(false);
  const [preloaded, setPreloaded] = useState(false);

  const preload = useCallback(async () => {
    if (preloaded) return;
    
    setPreloading(true);
    try {
      await legalDocumentsService.preloadDocuments();
      setPreloaded(true);
    } catch (error) {
      console.error('[usePreloadLegalDocuments] Failed to preload:', error);
    } finally {
      setPreloading(false);
    }
  }, [preloaded]);

  useEffect(() => {
    preload();
  }, [preload]);

  return {
    preloading,
    preloaded,
    preload,
  };
}
