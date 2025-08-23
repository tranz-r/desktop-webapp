import { QuoteOption } from '@/types/booking';
import { API_BASE_URL } from './config';

// Quote type alias for backend compatibility
export type QuoteType = QuoteOption;

// Backend Quote entity types (matching C# backend)
export interface BackendQuote {
  id: string;
  sessionId: string;
  type: QuoteType;
  expiresUtc?: string;
  etag: string;
  
  // Core Quote Data
  vanType: string;
  driverCount: number;
  distanceMiles: number;
  numberOfItemsToDismantle: number;
  numberOfItemsToAssemble: number;
  quoteId: string;
  
  // Addresses
  origin?: BackendAddress;
  destination?: BackendAddress;
  
  // Schedule
  collectionDate?: string;
  deliveryDate?: string;
  hours?: number;
  flexibleTime?: boolean;
  timeSlot?: string;
  
  // Pricing
  pricingTier?: string;
  totalCost?: number;
  cost?: BackendCost;
  
  // Items
  inventoryItems: BackendInventoryItem[];
  
  // Customer
  customer?: BackendCustomerInfo;
  
  // Payment
  paymentStatus?: string;
  receiptUrl?: string;
  
  // Audit
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
}

export interface BackendAddress {
  id: string;
  userId: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  county?: string;
  postCode: string;
  country?: string;
}

export interface BackendCost {
  jobId: string;
  baseVan: number;
  distance: number;
  floor: number;
  elevatorAdjustment: number;
  driver: number;
  tierAdjustment: number;
  total: number;
}

export interface BackendInventoryItem {
  id: string;
  jobId: string;
  name: string;
  description?: string;
  width?: number;
  height?: number;
  depth?: number;
  quantity?: number;
}

export interface BackendCustomerInfo {
  fullName?: string;
  email?: string;
  phone?: string;
  billingAddress?: BackendAddress;
  preferences?: BackendCustomerPreferences;
}

export interface BackendCustomerPreferences {
  preferredVanSize?: string;
  defaultFlexibleTime?: boolean;
  emergencyContact?: BackendEmergencyContact;
}

export interface BackendEmergencyContact {
  name?: string;
  phone?: string;
  relationship?: string;
}

// API Response types
export interface QuoteResponse {
  quote?: BackendQuote;
  quotes?: BackendQuote[];
  etag?: string;
}

export interface SaveQuoteRequest {
  quote?: BackendQuote;
  quoteJson?: string; // Legacy support
  etag?: string;
}

// API Client
export class QuoteApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Get all quotes for a session
  async getQuotes(etag?: string): Promise<QuoteResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (etag) {
      headers['If-None-Match'] = etag;
    }

    const response = await fetch(`${this.baseUrl}/api/guest/quote`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (response.status === 304) {
      return { quotes: [], etag: response.headers.get('ETag') || undefined };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch quotes: ${response.status}`);
    }

    const data = await response.json();
    return {
      quotes: data.quotes || [],
      etag: response.headers.get('ETag') || undefined,
    };
  }

  // Get specific quote by type
  async getQuote(type: QuoteType, etag?: string): Promise<QuoteResponse> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (etag) {
      headers['If-None-Match'] = etag;
    }

    const response = await fetch(`${this.baseUrl}/api/guest/quote?type=${type}`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (response.status === 304) {
      return { quote: undefined, etag: response.headers.get('ETag') || undefined };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch quote: ${response.status}`);
    }

    const data = await response.json();
    return {
      quote: data.quote,
      etag: response.headers.get('ETag') || undefined,
    };
  }

  // Save quote (entity-based)
  async saveQuote(quote: BackendQuote, etag?: string): Promise<{ etag?: string }> {
    const request: SaveQuoteRequest = {
      quote,
      etag,
    };

    const response = await fetch(`${this.baseUrl}/api/guest/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(request),
    });

    if (response.status === 412) {
      throw new Error('ETag mismatch - quote was modified by another request');
    }

    if (!response.ok) {
      throw new Error(`Failed to save quote: ${response.status}`);
    }

    const data = await response.json();
    return {
      etag: response.headers.get('ETag') || data.etag,
    };
  }

  // Save quote (legacy JSON support)
  async saveQuoteJson(quoteJson: string, etag?: string): Promise<{ etag?: string }> {
    const request: SaveQuoteRequest = {
      quoteJson,
      etag,
    };

    const response = await fetch(`${this.baseUrl}/api/guest/quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(request),
    });

    if (response.status === 412) {
      throw new Error('ETag mismatch - quote was modified by another request');
    }

    if (!response.ok) {
      throw new Error(`Failed to save quote: ${response.status}`);
    }

    const data = await response.json();
    return {
      etag: response.headers.get('ETag') || data.etag,
    };
  }

  // Delete quote
  async deleteQuote(type: QuoteType): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/guest/quote?type=${type}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete quote: ${response.status}`);
    }
  }

  // Ensure guest session
  async ensureGuest(): Promise<{ guestId: string }> {
    const response = await fetch(`${this.baseUrl}/api/guest/ensure`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to ensure guest: ${response.status}`);
    }

    return response.json();
  }

  // Select quote type and create/get quote
  async selectQuoteType(type: QuoteType): Promise<{ 
    quote: { 
      id: string; 
      type: string; 
      quoteReference: string; 
      sessionId: string; 
    }; 
    etag?: string; 
  }> {
    const response = await fetch(`${this.baseUrl}/api/guest/select-quote-type`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ quoteType: type }),
    });

    if (!response.ok) {
      throw new Error(`Failed to select quote type: ${response.status}`);
    }

    const data = await response.json();
    return {
      quote: data.quote,
      etag: response.headers.get('ETag') || data.etag,
    };
  }
}

// Default instance
export const quoteApi = new QuoteApiClient(API_BASE_URL);
