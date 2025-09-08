import { getApiUrl } from './config';

export interface LegalDocument {
  id: string;
  documentType: 'TermsAndConditions' | 'PrivacyPolicy';
  markdownContent: string;
  version: string;
  effectiveFrom: string;
  effectiveTo?: string;
  createdAt: string;
  createdBy: string;
}

export interface LegalDocumentCache {
  data: LegalDocument;
  timestamp: number;
  version: string;
}

const CACHE_KEY_PREFIX = 'tranzr:legal:';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds (legal documents change infrequently)

class LegalDocumentsService {
  private cache = new Map<string, LegalDocumentCache>();

  /**
   * Get cached legal document or fetch from API
   */
  async getLegalDocument(
    documentType: 'terms-and-conditions' | 'privacy-policy',
    forceRefresh = false
  ): Promise<LegalDocument> {
    const cacheKey = `${CACHE_KEY_PREFIX}${documentType}`;
    
    // Check cache first (unless force refresh)
    if (!forceRefresh) {
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        console.log(`[LegalDocuments] Using cached ${documentType}`);
        return cached;
      }
    }

    // Fetch from API
    console.log(`[LegalDocuments] Fetching ${documentType} from API`);
    const document = await this.fetchFromAPI(documentType);
    
    // Cache the result
    this.setCache(cacheKey, document);
    
    return document;
  }

  /**
   * Fetch legal document from API
   */
  private async fetchFromAPI(
    documentType: 'terms-and-conditions' | 'privacy-policy'
  ): Promise<LegalDocument> {
    const url = getApiUrl(`/api/v1/legal/${documentType}`);
    
    // Prepare headers for conditional requests
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add conditional request headers if we have cached data
    const cacheKey = `${CACHE_KEY_PREFIX}${documentType}`;
    const cached = this.cache.get(cacheKey);
    if (cached) {
      headers['If-None-Match'] = `"${cached.version}"`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    // Handle 304 Not Modified response
    if (response.status === 304) {
      console.log(`[LegalDocuments] ${documentType} not modified, using cached version`);
      if (cached) {
        // Update cache timestamp to extend TTL
        cached.timestamp = Date.now();
        this.cache.set(cacheKey, cached);
        return cached.data;
      }
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch ${documentType}: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get document from cache if valid
   */
  private getFromCache(cacheKey: string): LegalDocument | null {
    const cached = this.cache.get(cacheKey);
    
    if (!cached) {
      return null;
    }

    // Check if cache is expired
    const now = Date.now();
    if (now - cached.timestamp > CACHE_DURATION) {
      console.log(`[LegalDocuments] Cache expired for ${cacheKey}`);
      this.cache.delete(cacheKey);
      return null;
    }

    return cached.data;
  }

  /**
   * Set document in cache
   */
  private setCache(cacheKey: string, document: LegalDocument): void {
    this.cache.set(cacheKey, {
      data: document,
      timestamp: Date.now(),
      version: document.version,
    });
  }

  /**
   * Clear cache for specific document type
   */
  clearCache(documentType?: 'terms-and-conditions' | 'privacy-policy'): void {
    if (documentType) {
      const cacheKey = `${CACHE_KEY_PREFIX}${documentType}`;
      this.cache.delete(cacheKey);
      console.log(`[LegalDocuments] Cleared cache for ${documentType}`);
    } else {
      this.cache.clear();
      console.log('[LegalDocuments] Cleared all cache');
    }
  }

  /**
   * Get cache info for debugging
   */
  getCacheInfo(): Record<string, { timestamp: number; version: string; age: number }> {
    const now = Date.now();
    const info: Record<string, { timestamp: number; version: string; age: number }> = {};
    
    this.cache.forEach((cached, key) => {
      info[key] = {
        timestamp: cached.timestamp,
        version: cached.version,
        age: now - cached.timestamp,
      };
    });
    
    return info;
  }

  /**
   * Preload legal documents (useful for app initialization)
   */
  async preloadDocuments(): Promise<void> {
    try {
      await Promise.all([
        this.getLegalDocument('terms-and-conditions'),
        this.getLegalDocument('privacy-policy'),
      ]);
      console.log('[LegalDocuments] Preloaded all documents');
    } catch (error) {
      console.warn('[LegalDocuments] Failed to preload documents:', error);
    }
  }
}

// Export singleton instance
export const legalDocumentsService = new LegalDocumentsService();

// Export for testing
export { LegalDocumentsService };
