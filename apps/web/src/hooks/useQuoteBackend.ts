import { useCallback } from 'react';
import { quoteApi, BackendQuote } from '@/lib/api/quote';
import { QuoteOption, QuoteData } from '@/types/booking';

export function useQuoteBackend() {
  // Transform frontend QuoteData to backend BackendQuote
  const transformToBackend = useCallback((quoteData: QuoteData, etag?: string): BackendQuote => {

    return {
      id: '', // Will be set by backend
      sessionId: '', // Will be set by backend
      type: QuoteOption.Send, // Will be set by caller
      etag: etag || '',
      
      // Core Quote Data
      vanType: quoteData.vanType || '',
      driverCount: quoteData.driverCount || 0,
      quoteId: '', // Not used in current implementation
      
      // Addresses
      origin: quoteData.origin ? {
        id: '',
        userId: '',
        addressLine1: quoteData.origin.line1 || '',
        addressLine2: quoteData.origin.line2 || '',
        city: quoteData.origin.city || '',

        postCode: quoteData.origin.postcode || '',
        country: quoteData.origin.country || '',
      } : undefined,
      
      destination: quoteData.destination ? {
        id: '',
        userId: '',
        addressLine1: quoteData.destination.line1 || '',
        addressLine2: quoteData.destination.line2 || '',
        city: quoteData.destination.city || '',

        postCode: quoteData.destination.postcode || '',
        country: quoteData.destination.country || '',
      } : undefined,
      
      // Schedule
      collectionDate: quoteData.collectionDate || undefined,
      deliveryDate: quoteData.deliveryDate || undefined,
      hours: quoteData.hours || undefined,
      flexibleTime: quoteData.flexibleTime || undefined,
      timeSlot: quoteData.timeSlot || undefined,
      
      // Distance
      distanceMiles: quoteData.distanceMiles || 0,
      
      // Assembly/Dismantle tracking
      numberOfItemsToDismantle: quoteData.numberOfItemsToDismantle || 0,
      numberOfItemsToAssemble: quoteData.numberOfItemsToAssemble || 0,
      
      // Pricing
      pricingTier: quoteData.pricingTier || undefined,
      totalCost: quoteData.totalCost || undefined,
      cost: undefined, // Not used in current implementation
      
      // Items
      inventoryItems: quoteData.items?.map(item => ({
        id: String(item.id || ''),
        jobId: '',
        name: item.name || '',
        description: undefined, // Not available in CartItem
        width: item.widthCm || undefined,
        height: item.heightCm || undefined,
        depth: item.lengthCm || undefined,
        quantity: item.quantity || undefined,
      })) || [],
      
      // Customer
      customer: quoteData.customer ? {
        fullName: quoteData.customer.fullName || undefined,
        email: quoteData.customer.email || undefined,
        phone: quoteData.customer.phone || undefined,
        billingAddress: quoteData.customer.billingAddress ? {
          id: '',
          userId: '',
          addressLine1: quoteData.customer.billingAddress.line1 || '',
          addressLine2: '',
          city: '',
          postCode: quoteData.customer.billingAddress.postcode || '',
          country: '',
        } : undefined,
        preferences: undefined, // Not matching current customer preferences structure
      } : undefined,
      
      // Payment
      paymentStatus: quoteData.payment?.status || undefined,
      receiptUrl: undefined, // Not available in current payment structure
      
      // Audit (will be set by backend)
      createdAt: '',
      createdBy: '',
      modifiedAt: '',
      modifiedBy: '',
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
