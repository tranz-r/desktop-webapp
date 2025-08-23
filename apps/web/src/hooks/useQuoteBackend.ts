import { useCallback } from 'react';
import { quoteApi, BackendQuote, toBackendVanType } from '@/lib/api/quote';
import { QuoteOption, QuoteData } from '@/types/booking';

export function useQuoteBackend() {
  // Transform frontend QuoteData to backend BackendQuote
  const transformToBackend = useCallback((quoteData: QuoteData, etag?: string): BackendQuote => {

    return {
      sessionId: null, // Will be set by backend
      quoteReference: null, // Will be set by backend
      type: QuoteOption.Send, // Will be set by caller
      
      // Core Quote Data
      vanType: toBackendVanType(quoteData.vanType),
      driverCount: quoteData.driverCount || 0,
      
      // Addresses
      origin: quoteData.origin ? {
        id: null, // Will be set by backend
        userId: null, // Will be set by backend
        line1: quoteData.origin.line1 || '',
        line2: quoteData.origin.line2 || '',
        city: quoteData.origin.city || '',
        county: '',
        postCode: quoteData.origin.postcode || '',
        country: quoteData.origin.country || '',
        hasElevator: quoteData.origin.hasElevator || true,
        floor: quoteData.origin.floor || 0,
      } : undefined,
      
      destination: quoteData.destination ? {
        id: null, // Will be set by backend
        userId: null, // Will be set by backend
        line1: quoteData.destination.line1 || '',
        line2: quoteData.destination.line2 || '',
        city: quoteData.destination.city || '',
        county: '',
        postCode: quoteData.destination.postcode || '',
        country: quoteData.destination.country || '',
        hasElevator: quoteData.destination.hasElevator || true,
        floor: quoteData.destination.floor || 0,
      } : undefined,
      
      // Schedule
      schedule: {
        dateISO: quoteData.collectionDate || undefined,
        deliveryDateISO: quoteData.deliveryDate || undefined,
        hours: quoteData.hours || undefined,
        flexibleTime: quoteData.flexibleTime || undefined,
        timeSlot: quoteData.timeSlot || undefined,
      },
      
      // Distance
      distanceMiles: quoteData.distanceMiles || 0,
      
      // Assembly/Dismantle tracking
      numberOfItemsToDismantle: quoteData.numberOfItemsToDismantle || 0,
      numberOfItemsToAssemble: quoteData.numberOfItemsToAssemble || 0,
      
      // Pricing
      pricing: {
        pricingTier: quoteData.pricingTier || undefined,
        totalCost: quoteData.totalCost || undefined,
        pickUpDropOffPrice: undefined,
      },
      
      // Items
      items: quoteData.items?.map(item => ({
        id: null, // Will be set by backend
        jobId: null, // Will be set by backend
        name: item.name || '',
        description: '',
        width: item.widthCm || undefined,
        height: item.heightCm || undefined,
        depth: item.lengthCm || undefined,
        quantity: item.quantity || undefined,
      })) || [],
      
      // Payment
      payment: {
        status: quoteData.payment?.status || 'Pending',
        paymentType: quoteData.payment?.paymentType || 'Full',
        depositAmount: quoteData.payment?.depositAmount || undefined,
      },
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
  const saveQuote = useCallback(async (quoteType: QuoteOption, quoteData: QuoteData, etag?: string): Promise<{ etag?: string } | null> => {
    try {
      const backendQuote = transformToBackend(quoteData, etag);
      backendQuote.type = quoteType; // Set the quote type
      
      const response = await quoteApi.saveQuote(backendQuote, etag);
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

  // Delete quote from backend
  const deleteQuote = useCallback(async (quoteType: QuoteOption) => {
    try {
      await quoteApi.deleteQuote(quoteType);
    } catch (error) {
      console.error('Failed to delete quote from backend:', error);
    }
  }, []);

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
  const selectQuoteType = useCallback(async (quoteType: QuoteOption): Promise<{ 
    quote: { 
      id: string; 
      type: string; 
      quoteReference: string; 
      sessionId: string; 
    }; 
    etag?: string; 
  } | null> => {
    try {
      const response = await quoteApi.selectQuoteType(quoteType);
      return response;
    } catch (error) {
      console.error('Failed to select quote type:', error);
      return null;
    }
  }, []);

  return {
    loadQuotes,
    saveQuote,
    deleteQuote,
    ensureGuest,
    selectQuoteType,
  };
}
