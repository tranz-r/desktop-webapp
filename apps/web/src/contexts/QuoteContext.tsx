"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { useQuoteBackend } from '@/hooks/useQuoteBackend';
import { QuoteOption, QuoteData, SharedData } from '@/types/booking';

// Unified quote state interface
export interface QuoteState {
  // Active quote type
  activeQuoteType: QuoteOption | null;
  
  // All quote data by type
  quotes: Record<QuoteOption, QuoteData | undefined>;
  
  // Quote references from backend
  quoteReferences: Record<QuoteOption, string | null>;
  
  // Shared data across all quote types
  sharedData: SharedData;
  
  // Metadata
  metadata: {
    lastActiveQuoteType?: QuoteOption;
    lastActivity: string;
    version: string;
  };
}

// Context type
export interface QuoteContextType extends QuoteState {
  // Quote Type Management
  setActiveQuoteType: (type: QuoteOption | null) => Promise<void>;
  
  // Quote Data Management
  updateQuote: (type: QuoteOption, data: Partial<QuoteData>) => Promise<void>;
  resetQuote: () => void;
  resetAllQuotes: () => void;
  
  // Shared Data Management
  updateSharedData: (data: Partial<SharedData>) => void;
  
  // Quote Reference Management
  getQuoteReference: (type: QuoteOption) => string | null;
  
  // State Management
  isHydrated: boolean;
}

// Create context
const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

// Default state
const DEFAULT_STATE: QuoteState = {
  activeQuoteType: null,
  quotes: {
    [QuoteOption.Send]: undefined,
    [QuoteOption.Receive]: undefined,
    [QuoteOption.Removals]: undefined
  },
  quoteReferences: {
    [QuoteOption.Send]: null,
    [QuoteOption.Receive]: null,
    [QuoteOption.Removals]: null
  },
  sharedData: {
    // Customer data is now stored per quote, not shared
  },
  metadata: {
    lastActiveQuoteType: undefined,
    lastActivity: new Date().toISOString(),
    version: '1.0.0'
  }
};

// Provider component
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<QuoteState>(DEFAULT_STATE);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Get backend functions
  const { 
    ensureGuest, 
    loadQuotes, 
    selectQuoteType, 
    saveQuote
  } = useQuoteBackend();
  
  // ETag reference for backend synchronization
  const etagRef = useRef<string | undefined>();

  // Load initial state from backend
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Ensure guest session exists first
        await ensureGuest();
        
        // Load quotes from backend
        const quotesResponse = await loadQuotes(etagRef.current);
        if (quotesResponse) {
          // Update ETag
          if (quotesResponse.etag) {
            etagRef.current = quotesResponse.etag;
          }

          // Process backend quotes and update context state
          if (quotesResponse.quotes && quotesResponse.quotes.length > 0) {
            const newQuotes: Record<QuoteOption, QuoteData | undefined> = {
              [QuoteOption.Send]: undefined,
              [QuoteOption.Receive]: undefined,
              [QuoteOption.Removals]: undefined
            };
            const newReferences: Record<QuoteOption, string | null> = {
              [QuoteOption.Send]: null,
              [QuoteOption.Receive]: null,
              [QuoteOption.Removals]: null
            };

            let firstQuoteType: QuoteOption | null = null;

            for (const backendQuote of quotesResponse.quotes) {
              const quoteType = backendQuote.type as QuoteOption;
              if (!firstQuoteType) firstQuoteType = quoteType;

              // Transform backend quote to frontend format
              const frontendQuote: QuoteData = {
                items: backendQuote.items?.map(item => ({
                  id: item.id ? parseInt(item.id) : 0,
                  name: item.name || '',
                  heightCm: item.height || 0,
                  widthCm: item.width || 0,
                  lengthCm: item.depth || 0,
                  quantity: item.quantity || 1,
                })) || [],
                origin: backendQuote.origin ? {
                  line1: backendQuote.origin.line1,
                  line2: backendQuote.origin.line2 || '',
                  city: backendQuote.origin.city || '',
                  postcode: backendQuote.origin.postCode || '',
                  country: backendQuote.origin.country || '',
                  hasElevator: backendQuote.origin.hasElevator || true,
                  floor: backendQuote.origin.floor || 0,
                } : undefined,
                destination: backendQuote.destination ? {
                  line1: backendQuote.destination.line1,
                  line2: backendQuote.destination.line2 || '',
                  city: backendQuote.destination.city || '',
                  postcode: backendQuote.destination.postCode || '',
                  country: backendQuote.destination.country || '',
                  hasElevator: backendQuote.destination.hasElevator || true,
                  floor: backendQuote.destination.floor || 0,
                } : undefined,
                distanceMiles: backendQuote.distanceMiles || undefined,
                numberOfItemsToDismantle: backendQuote.numberOfItemsToDismantle || 0,
                numberOfItemsToAssemble: backendQuote.numberOfItemsToAssemble || 0,
                vanType: backendQuote.vanType as any,
                driverCount: backendQuote.driverCount || 1,
                collectionDate: backendQuote.schedule?.dateISO || undefined,
                deliveryDate: backendQuote.schedule?.deliveryDateISO || undefined,
                hours: backendQuote.schedule?.hours || undefined,
                flexibleTime: backendQuote.schedule?.flexibleTime || undefined,
                timeSlot: backendQuote.schedule?.timeSlot as any,
                pricingTier: backendQuote.pricing?.pricingTier as any,
                totalCost: backendQuote.pricing?.totalCost || undefined,
                customer: {
                  fullName: undefined,
                  email: undefined,
                  phone: undefined,
                  billingAddress: undefined
                },
                paymentStatus: (backendQuote.payment?.status as 'pending' | 'paid' | 'failed') || undefined,
                paymentType: undefined,
                depositAmount: undefined
              };

              newQuotes[quoteType] = frontendQuote;
              // TODO: Extract quote reference from backend response
              // For now, we'll keep the existing reference
            }

            setState(prev => ({
              ...prev,
              quotes: newQuotes,
              quoteReferences: newReferences,
              activeQuoteType: firstQuoteType,
              metadata: {
                ...prev.metadata,
                lastActiveQuoteType: firstQuoteType || undefined,
                lastActivity: new Date().toISOString()
              }
            }));
          }
        }
        
        // Set hydrated state
        setIsHydrated(true);
      } catch (error) {
        console.error('Failed to initialize session:', error);
        // Still set hydrated to prevent infinite loading
        setIsHydrated(true);
      }
    };
    
    initializeSession();
  }, [loadQuotes, ensureGuest]);

  // Quote Type Management
  const setActiveQuoteType = useCallback(async (type: QuoteOption | null) => {
    if (type === null || Object.values(QuoteOption).includes(type)) {
      if (type && !state.quotes[type]) {
        // If this quote type doesn't exist yet, create it via backend
        try {
          const quoteResponse = await selectQuoteType(type);
          if (quoteResponse?.quote?.quoteReference) {
            // Initialize the quote with the reference from backend
            const newQuote: QuoteData = {
              items: [],
              origin: undefined,
              destination: undefined,
              distanceMiles: undefined,
              numberOfItemsToDismantle: 0,
              numberOfItemsToAssemble: 0,
              vanType: undefined,
              driverCount: 1,
              collectionDate: undefined,
              deliveryDate: undefined,
              hours: undefined,
              flexibleTime: undefined,
              timeSlot: undefined,
              pricingTier: undefined,
              totalCost: undefined,
              customer: {
                fullName: undefined,
                email: undefined,
                phone: undefined,
                billingAddress: undefined
              },
              paymentStatus: undefined,
              paymentType: undefined,
              depositAmount: undefined
            };

            // Update state with new quote and reference
            setState(prev => ({
              ...prev,
              quotes: {
                ...prev.quotes,
                [type]: newQuote
              },
              quoteReferences: {
                ...prev.quoteReferences,
                [type]: quoteResponse.quote.quoteReference
              },
              activeQuoteType: type,
              metadata: {
                ...prev.metadata,
                lastActiveQuoteType: type,
                lastActivity: new Date().toISOString()
              }
            }));
          }
        } catch (error) {
          console.error('Failed to create quote:', error);
        }
      } else {
        // Quote type already exists, just set as active
        setState(prev => ({
          ...prev,
          activeQuoteType: type,
          metadata: {
            ...prev.metadata,
            lastActiveQuoteType: type || undefined,
            lastActivity: new Date().toISOString()
          }
        }));
      }
    }
  }, [state.quotes, selectQuoteType]);

  // Quote Data Management
  const updateQuote = useCallback(async (type: QuoteOption, data: Partial<QuoteData>) => {
    // Update local state first
    setState(prev => ({
      ...prev,
      quotes: {
        ...prev.quotes,
        [type]: {
          ...prev.quotes[type],
          ...data
        } as QuoteData
      },
      metadata: {
        ...prev.metadata,
        lastActivity: new Date().toISOString()
      }
    }));

    // Save to backend if quote exists
    if (state.quotes[type]) {
      try {
        const updatedQuote = { ...state.quotes[type], ...data } as QuoteData;
        const response = await saveQuote(type, updatedQuote, etagRef.current);
        
        if (response?.etag) {
          etagRef.current = response.etag;
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('ETag mismatch')) {
          // Handle ETag conflict by reloading quotes
          console.warn('ETag mismatch detected, reloading quotes...');
          
          const quotesResponse = await loadQuotes(etagRef.current);
          if (quotesResponse) {
            // Update ETag
            if (quotesResponse.etag) {
              etagRef.current = quotesResponse.etag;
            }
            // TODO: Merge the reloaded data with current state
            console.warn('Quote data reloaded due to ETag conflict');
          }
        } else {
          console.error('Failed to save quote:', error);
        }
      }
    }
  }, [state.quotes, saveQuote, loadQuotes]);

  // Utility
  const resetQuote = useCallback(() => {
    if (!state.activeQuoteType) return;
    
    setState(prev => ({
      ...prev,
      quotes: {
        ...prev.quotes,
        [state.activeQuoteType!]: {
          items: [],
          origin: {
            line1: '',
            postcode: '',
            floor: 0,
            hasElevator: true
          },
          destination: {
            line1: '',
            postcode: '',
            floor: 0,
            hasElevator: true
          },
          customer: {
            fullName: undefined,
            email: undefined,
            phone: undefined,
            billingAddress: undefined
          },
          distanceMiles: undefined,
          numberOfItemsToDismantle: 0,
          numberOfItemsToAssemble: 0,
          vanType: undefined,
          driverCount: 1,
          collectionDate: undefined,
          deliveryDate: undefined,
          hours: undefined,
          flexibleTime: undefined,
          timeSlot: undefined,
          pricingTier: undefined,
          totalCost: undefined,
          paymentStatus: undefined,
          paymentType: undefined,
          depositAmount: undefined
        }
      },
      quoteReferences: {
        ...prev.quoteReferences,
        [state.activeQuoteType!]: null
      },
      metadata: {
        ...prev.metadata,
        lastActivity: new Date().toISOString()
      }
    }));
  }, [state.activeQuoteType]);

  const resetAllQuotes = useCallback(() => {
    setState(prev => ({
      ...prev,
      quotes: {
        [QuoteOption.Send]: undefined,
        [QuoteOption.Receive]: undefined,
        [QuoteOption.Removals]: undefined
      },
      quoteReferences: {
        [QuoteOption.Send]: null,
        [QuoteOption.Receive]: null,
        [QuoteOption.Removals]: null
      },
      sharedData: {
        ...prev.sharedData,
        distanceMiles: undefined
      }
    }));
  }, []);

  // Shared Data Management
  const updateSharedData = useCallback((data: Partial<SharedData>) => {
    setState(prev => ({
      ...prev,
      sharedData: {
        ...prev.sharedData,
        ...data
      },
      metadata: {
        ...prev.metadata,
        lastActivity: new Date().toISOString()
      }
    }));
  }, []);

  // Get quote reference for display
  const getQuoteReference = useCallback((type: QuoteOption): string | null => {
    return state.quoteReferences[type];
  }, [state.quoteReferences]);

  // Context value
  const contextValue: QuoteContextType = {
    ...state,
    setActiveQuoteType,
    updateQuote,
    resetQuote,
    resetAllQuotes,
    updateSharedData,
    getQuoteReference,
    isHydrated
  };

  return (
    <QuoteContext.Provider value={contextValue}>
      {children}
    </QuoteContext.Provider>
  );
}

// Hook to use the context
export function useQuote(): QuoteContextType {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error('useQuote must be used within QuoteProvider');
  return ctx;
}
