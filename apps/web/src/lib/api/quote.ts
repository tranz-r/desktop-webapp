import { QuoteOption } from '@/types/booking';
import { API_BASE_URL } from './config';

// Quote type alias for backend compatibility
export type QuoteType = QuoteOption;

// Van type conversion helper
export function toBackendVanType(vanType: string | undefined): number | null {
  if (!vanType) return null;
  
  switch (vanType) {
    case 'largeVan': return 1;
    case 'smallVan': return 2;
    case 'mediumVan': return 3;
    case 'xlLuton': return 4;
    default: return null;
  }
}

// Backend Quote entity types (matching C# backend DTOs)
export interface BackendQuote {
  id?: string | null;
  sessionId: string | null;
  quoteReference: string | null; // Updated to match backend
  type: QuoteType;
  
  // Core Quote Data
  vanType: number | null; // VanType enum values: 1=largeVan, 2=SmallVan, 3=mediumVan, 4=xlLuton
  driverCount: number;
  distanceMiles: number;
  numberOfItemsToDismantle: number;
  numberOfItemsToAssemble: number;
  
  // Addresses
  origin?: BackendAddress;
  destination?: BackendAddress;
  
  // Schedule
  schedule?: BackendSchedule;
  
  // Pricing
  pricing?: BackendPricing;
  
  // Items
  items: BackendInventoryItem[];
  
  // Payment
  payment?: BackendPayment;
  
  // Customer data (now included in quote data)
  customer?: BackendCustomer;
  
  // Concurrency control using PostgreSQL xmin system column
  version: number;
}

export interface BackendSchedule {
  collectionDate?: string; // Updated to match backend
  deliveryDate?: string; // Updated to match backend
  hours?: number;
  flexibleTime?: boolean;
  timeSlot?: string;
}

export interface BackendPricing {
  pricingTier?: string;
  totalCost?: number;
  pickUpDropOffPrice?: number;
  // Note: Backend uses individual properties instead of nested pricing object
}

export interface BackendPayment {
  status: string;
  paymentType: string;
  depositAmount?: number;
  // Note: Backend uses individual properties instead of nested payment object
}

export interface BackendAddress {
  id: string | null;
  userId: string | null;
  line1: string;
  line2?: string;
  city?: string;
  county?: string;
  postCode: string;
  country?: string;
  hasElevator: boolean;
  floor: number;
  // Note: Backend uses individual properties instead of nested address objects
}

export interface BackendInventoryItem {
  id: string | null;
  jobId: string | null;
  name: string;
  description?: string;
  width?: number;
  height?: number;
  depth?: number;
  quantity?: number;
  // Note: Backend uses individual properties instead of nested inventory items
}

// Customer data structure matching backend UserDto
export interface BackendCustomer {
  supabaseId?: string | null;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  billingAddress?: BackendAddress;
}

// API Response types
export interface QuoteResponse {
  quote?: BackendQuote;
  quotes?: BackendQuote[];
  etag?: string; // Now represents the Version field from backend
}

// New response type for select-quote-type endpoint
export interface QuoteTypeResponse {
  quote: BackendQuote;
  etag: string; // Version field from backend
}

export interface SaveQuoteRequest {
  quote: BackendQuote; // Required in new backend
  customer?: BackendCustomer; // Customer details if provided
  etag?: string; // Now represents the Version field from backend
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
  async saveQuote(quote: BackendQuote, customerData?: BackendCustomer, etag?: string): Promise<{ etag?: string }> {
    const request: SaveQuoteRequest = {
      quote,
      customer: customerData,
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
  async selectQuoteType(type: QuoteType): Promise<QuoteTypeResponse> {
    const response = await fetch(`${this.baseUrl}/api/guest/select-quote-type?quoteType=${type}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
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

  // Get customer data for a quote
  async getCustomerData(quoteId: string): Promise<BackendCustomer | null> {
    try {
      console.log(`Making API call to: ${this.baseUrl}/api/guest/customer/${quoteId}`);
      const response = await fetch(`${this.baseUrl}/api/guest/customer/${quoteId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      console.log(`Response status: ${response.status}`);
      console.log(`Response headers:`, response.headers);

      if (response.status === 404) {
        console.log('No customer data found (404)');
        return null; // No customer data found
      }

      if (!response.ok) {
        console.log(`Response not OK: ${response.status}`);
        throw new Error(`Failed to fetch customer data: ${response.status}`);
      }

      const customerData = await response.json();
      console.log('Customer data received:', customerData);
      return customerData;
    } catch (error) {
      console.error('Error fetching customer data:', error);
      return null;
    }
  }

  // Cleanup expired sessions (maintenance endpoint)
  async cleanupExpired(): Promise<{ expiredSessions: number }> {
    const response = await fetch(`${this.baseUrl}/api/guest/cleanup-expired`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to cleanup expired sessions: ${response.status}`);
    }

    return response.json();
  }
}

// Default instance
export const quoteApi = new QuoteApiClient(API_BASE_URL);
