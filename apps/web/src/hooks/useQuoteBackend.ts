import { useCallback } from 'react';
import { quoteApi, BackendQuote, BackendCustomer, toBackendVanType, QuoteTypeResponse } from '@/lib/api/quote';
import { QuoteOption, QuoteData } from '@/types/booking';

export function useQuoteBackend() {
  // Transform frontend QuoteData to backend BackendQuote
  const transformToBackend = useCallback((quoteData: QuoteData, etag?: string): BackendQuote => {

    return {
      id: quoteData.quoteId ?? null,
      sessionId: quoteData.sessionId ?? null, // backend may set/refresh from cookie
      quoteReference: null, // Will be set by backend
      type: QuoteOption.Send, // Will be set by caller
      
      // Core Quote Data
      vanType: toBackendVanType(quoteData.vanType),
      driverCount: quoteData.driverCount ?? 0,
      
      // Addresses
      origin: quoteData.origin ? {
        id: null, // Will be set by backend
        userId: null, // Will be set by backend
        line1: quoteData.origin.line1 ?? '',
        line2: quoteData.origin.line2 ?? '',
        city: quoteData.origin.city ?? '',
        county: '',
        postCode: quoteData.origin.postcode ?? '',
        country: quoteData.origin.country ?? '',
        hasElevator: quoteData.origin.hasElevator ?? true,
        floor: quoteData.origin.floor ?? 0,
      } : undefined,
      
      destination: quoteData.destination ? {
        id: null, // Will be set by backend
        userId: null, // Will be set by backend
        line1: quoteData.destination.line1 ?? '',
        line2: quoteData.destination.line2 ?? '',
        city: quoteData.destination.city ?? '',
        county: '',
        postCode: quoteData.destination.postcode ?? '',
        country: quoteData.destination.country ?? '',
        hasElevator: quoteData.destination.hasElevator ?? true,
        floor: quoteData.destination.floor ?? 0,
      } : undefined,
      
      // Schedule
      schedule: {
        collectionDate: quoteData.collectionDate ?? undefined,
        deliveryDate: quoteData.deliveryDate ?? undefined,
        hours: quoteData.hours ?? undefined,
        flexibleTime: quoteData.flexibleTime ?? undefined,
        timeSlot: quoteData.timeSlot ?? undefined,
      },
      
      // Distance
      distanceMiles: quoteData.distanceMiles ?? 0,
      
      // Assembly/Dismantle tracking
      numberOfItemsToDismantle: quoteData.numberOfItemsToDismantle ?? 0,
      numberOfItemsToAssemble: quoteData.numberOfItemsToAssemble ?? 0,
      
      // Pricing
      pricing: {
        pricingTier: quoteData.pricingTier ?? undefined,
        totalCost: quoteData.totalCost ?? undefined,
        pickUpDropOffPrice: undefined,
      },
      
      // Items
      items: quoteData.items?.map(item => ({
        id: null, // Will be set by backend
        jobId: null, // Will be set by backend
        name: item.name ?? '',
        description: '',
        width: item.widthCm ?? undefined,
        height: item.heightCm ?? undefined,
        depth: item.lengthCm ?? undefined,
        quantity: item.quantity ?? undefined,
      })) || [],
      
      // Payment
      payment: {
        status: quoteData.paymentStatus ?? quoteData.payment?.status ?? 'Pending',
        paymentType: quoteData.paymentType ?? quoteData.payment?.paymentType ?? 'Full',
        depositAmount: quoteData.depositAmount ?? quoteData.payment?.depositAmount ?? undefined,
      },
      
      // Customer data (now included in quote data)
      customer: quoteData.customer ? {
        fullName: quoteData.customer.fullName,
        email: quoteData.customer.email,
        phoneNumber: quoteData.customer.phone,
        billingAddress: quoteData.customer.billingAddress ? {
          id: null,
          userId: null,
          line1: quoteData.customer.billingAddress.line1,
          line2: quoteData.customer.billingAddress.line2 ?? '',
          city: quoteData.customer.billingAddress.city ?? '',
          county: '',
          postCode: quoteData.customer.billingAddress.postcode ?? '',
          country: quoteData.customer.billingAddress.country ?? '',
          hasElevator: quoteData.customer.billingAddress.hasElevator ?? true,
          floor: quoteData.customer.billingAddress.floor ?? 0,
        } : undefined
      } : undefined,
      
      // Concurrency control using PostgreSQL xmin system column
      version: 0
    };
  }, []);

  // Load quotes from backend
  const loadQuotes = useCallback(async (etag?: string): Promise<{ quotes: BackendQuote[]; etag?: string } | null> => {
    try {
      const response = await quoteApi.getQuotes(etag);
      return {
        quotes: response.quotes || [],
        etag: response.etag
      };
    } catch (error) {
      console.error('Failed to load quotes from backend:', error);
      return null;
    }
  }, []);



  // Save quote to backend
  const saveQuote = useCallback(async (quoteType: QuoteOption, quoteData: QuoteData, customerData?: BackendCustomer, etag?: string): Promise<{ etag?: string } | null> => {
    try {
      const backendQuote = transformToBackend(quoteData, etag);
      // Map type to backend PascalCase enum labels
      backendQuote.type = transformQuoteTypeToBackend(quoteType) as any;
      
      const response = await quoteApi.saveQuote(backendQuote, customerData, etag);
      return response;
    } catch (error) {
      if (error instanceof Error && error.message.includes('ETag mismatch')) {
        // Re-throw ETag mismatch for context to handle
        throw error;
      } else {
        console.error('Failed to save quote to backend:', error);
        return null;
      }
    }
  }, [transformToBackend]);

  // Helper function to transform frontend quote type to backend PascalCase
  const transformQuoteTypeToBackend = useCallback((quoteType: QuoteOption): string => {
    return quoteType === 'send' ? 'Send' : quoteType === 'receive' ? 'Receive' : 'Removals';
  }, []);

  // Delete quote from backend
  const deleteQuote = useCallback(async (quoteType: QuoteOption) => {
    try {
      // Transform to PascalCase before sending to backend
      const backendType = transformQuoteTypeToBackend(quoteType);
      
      console.log('[useQuoteBackend] deleteQuote - Frontend type:', quoteType, '→ Backend type:', backendType);
      
      await quoteApi.deleteQuote(backendType as any);
    } catch (error) {
      console.error('Failed to delete quote from backend:', error);
    }
  }, [transformQuoteTypeToBackend]);



  // Ensure guest session
  const ensureGuest = useCallback(async () => {
    try {
      const { guestId } = await quoteApi.ensureGuest();
      console.log('Guest session ensured:', guestId);
      return guestId;
    } catch (error) {
      console.error('Failed to ensure guest session:', error);
      return null;
    }
  }, []);

  // Select quote type and create/get quote
  const selectQuoteType = useCallback(async (quoteType: QuoteOption): Promise<QuoteTypeResponse | null> => {
    try {
      // Transform to PascalCase before sending to backend
      const backendType = transformQuoteTypeToBackend(quoteType);
      
      console.log('[useQuoteBackend] selectQuoteType - Frontend type:', quoteType, '→ Backend type:', backendType);
      
      const response = await quoteApi.selectQuoteType(backendType as any);
      return response;
    } catch (error) {
      console.error('Failed to select quote type:', error);
      return null;
    }
  }, [transformQuoteTypeToBackend]);

  // Load customer data for a quote
  const loadCustomerData = useCallback(async (quoteId: string): Promise<BackendCustomer | null> => {
    try {
      console.log(`Attempting to load customer data for quote ID: ${quoteId}`);
      const result = await quoteApi.getCustomerData(quoteId);
      console.log(`Customer data result:`, result);
      return result;
    } catch (error) {
      console.error('Failed to load customer data:', error);
      return null;
    }
  }, [quoteApi]);

  return {
    loadQuotes,
    saveQuote,
    deleteQuote,
    ensureGuest,
    selectQuoteType,
    loadCustomerData,
  };
}
