"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { useQuoteBackend } from '@/hooks/useQuoteBackend';
import { QuoteOption, QuoteData, SharedData } from '@/types/booking';
import { HybridStorage } from '@/lib/storage/HybridStorage';

// Unified quote state interface
export interface QuoteState {
  // Active quote type
  activeQuoteType: QuoteOption | null;
  
  // All quote data by type (includes quoteReference)
  quotes: Record<QuoteOption, QuoteData | undefined>;
  
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
  // Quote Management
  updateQuote: (type: QuoteOption, data: Partial<QuoteData>) => Promise<void>;
  setActiveQuoteType: (type: QuoteOption) => Promise<void>;
  resetQuote: () => Promise<void>;
  resetAllQuotes: () => Promise<void>;
  updateSharedData: (data: Partial<SharedData>) => Promise<void>;
  getQuoteReference: (type: QuoteOption) => string | null;
  getCurrentEtag: () => string | undefined;
  
  // State Management
  isHydrated: boolean;
  
  // Debug & Maintenance
  debugIndexedDB: () => Promise<void>;
  cleanupIndexedDBData: () => Promise<Record<QuoteOption, QuoteData | undefined> | null>;
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

  // Load quotes from IndexDB
  const loadFromIndexDB = useCallback(async () => {
    try {
      const savedQuotes = await HybridStorage.get('quotes', null);
      if (savedQuotes) {
        console.log('[QuoteContext] Loaded quotes from IndexDB:', savedQuotes);
        return savedQuotes;
      }
    } catch (error) {
      console.error('[QuoteContext] Failed to load quotes from IndexDB:', error);
    }
    return null;
  }, []);

  // Save quotes to IndexDB
  const saveToIndexDB = useCallback(async (quotes: Record<QuoteOption, QuoteData | undefined>) => {
    try {
      console.log('[QuoteContext] Attempting to save quotes to IndexDB:', quotes);
      await HybridStorage.set('quotes', quotes);
      console.log('[QuoteContext] Successfully saved quotes to IndexDB');
      
      // Verify the save worked by reading it back
      const verifyQuotes = await HybridStorage.get('quotes', null);
      if (verifyQuotes) {
        console.log('[QuoteContext] Verified IndexedDB save - data is persistent');
      } else {
        console.warn('[QuoteContext] IndexedDB save verification failed - data may not be persistent');
      }
    } catch (error) {
      console.error('[QuoteContext] Failed to save quotes to IndexDB:', error);
      // Don't throw - we don't want to break the app if storage fails
    }
  }, []);

  // Clean up corrupted IndexedDB data (fixes casing mismatches)
  const cleanupIndexedDBData = useCallback(async () => {
    try {
      console.log('[QuoteContext] Cleaning up corrupted IndexedDB data...');
      const savedQuotes = await HybridStorage.get('quotes', null);
      
      if (savedQuotes) {
        let hasCorruptedData = false;
        const cleanedQuotes: Record<QuoteOption, QuoteData | undefined> = {
          [QuoteOption.Send]: undefined,
          [QuoteOption.Receive]: undefined,
          [QuoteOption.Removals]: undefined
        };
        
        // Check for corrupted keys and normalize them
        for (const [key, value] of Object.entries(savedQuotes)) {
          if (value && typeof value === 'object') {
            const normalizedKey = key.toLowerCase() as QuoteOption;
            
            if (Object.values(QuoteOption).includes(normalizedKey)) {
              // Valid key, use it
              cleanedQuotes[normalizedKey] = value as QuoteData;
              if (key !== normalizedKey) {
                console.log(`[QuoteContext] Normalized key: "${key}" -> "${normalizedKey}"`);
                hasCorruptedData = true;
              }
            } else {
              console.warn(`[QuoteContext] Removing corrupted key: "${key}"`);
              hasCorruptedData = true;
            }
          }
        }
        
        // CRITICAL FIX: Only save if we actually have data to preserve
        const hasValidData = Object.values(cleanedQuotes).some(quote => quote !== undefined);
        
        if (hasCorruptedData && hasValidData) {
          await saveToIndexDB(cleanedQuotes);
          console.log('[QuoteContext] IndexedDB data cleaned up successfully');
        } else if (hasCorruptedData && !hasValidData) {
          console.warn('[QuoteContext] Cleanup would wipe all data - skipping save to prevent data loss');
          // Don't save if it would wipe everything out
          return savedQuotes; // Return original data instead
        } else {
          console.log('[QuoteContext] No corrupted data found in IndexedDB');
        }
        
        return cleanedQuotes;
      }
      
      return null;
    } catch (error) {
      console.error('[QuoteContext] Failed to cleanup IndexedDB data:', error);
      return null;
    }
  }, [saveToIndexDB]);
  
  // Save metadata to IndexedDB
  const saveMetadataToIndexDB = useCallback(async (metadata: QuoteState['metadata']) => {
    try {
      console.log('[QuoteContext] Saving metadata to IndexedDB:', metadata);
      await HybridStorage.set('quoteMetadata', metadata);
      console.log('[QuoteContext] Successfully saved metadata to IndexedDB');
    } catch (error) {
      console.error('[QuoteContext] Failed to save metadata to IndexedDB:', error);
    }
  }, []);
  
  // Load metadata from IndexedDB
  const loadMetadataFromIndexDB = useCallback(async () => {
    try {
      const savedMetadata = await HybridStorage.get('quoteMetadata', null);
      if (savedMetadata) {
        console.log('[QuoteContext] Loading metadata from IndexedDB:', savedMetadata);
        return savedMetadata;
      }
    } catch (error) {
      console.error('[QuoteContext] Failed to load metadata from IndexedDB:', error);
    }
    return null;
  }, []);

  // Load initial state from backend
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // CRITICAL FIX: Load IndexedDB data FIRST as base state
        console.log('[QuoteContext] Loading IndexedDB data as base state...');
        const baseIndexDBData = await loadFromIndexDB();
        const baseMetadata = await loadMetadataFromIndexDB();
        
        if (baseIndexDBData || baseMetadata) {
          console.log('[QuoteContext] Setting base state from IndexedDB:', { quotes: baseIndexDBData, metadata: baseMetadata });
          setState(prev => ({
            ...prev,
            quotes: baseIndexDBData || prev.quotes,
            metadata: baseMetadata || prev.metadata
          }));
        }
        
        // Load quotes from backend (guest session will be created when needed)
        const quotesResponse = await loadQuotes(etagRef.current);
        if (quotesResponse) {
          // Update ETag
          if (quotesResponse.etag) {
            etagRef.current = quotesResponse.etag;
          }

          // Process backend quotes and update context state
          if (quotesResponse.quotes && quotesResponse.quotes.length > 0) {
            // CRITICAL FIX: Start with existing state instead of undefined
            const newQuotes: Record<QuoteOption, QuoteData | undefined> = { ...state.quotes };

            let firstQuoteType: QuoteOption | null = null;

            for (const backendQuote of quotesResponse.quotes) {
              // Normalize quote type to match our enum (handle backend casing issues)
              let quoteType: QuoteOption;
              if (typeof backendQuote.type === 'string') {
                const normalizedType = backendQuote.type.toLowerCase() as QuoteOption;
                if (Object.values(QuoteOption).includes(normalizedType)) {
                  quoteType = normalizedType;
                } else {
                  console.warn('[QuoteContext] Unknown quote type from backend:', backendQuote.type, 'using default');
                  quoteType = QuoteOption.Send; // fallback
                }
              } else {
                console.warn('[QuoteContext] Invalid quote type from backend:', backendQuote.type, 'using default');
                quoteType = QuoteOption.Send; // fallback
              }
              
              if (!firstQuoteType) firstQuoteType = quoteType;

              // Transform backend quote to frontend format
              const frontendQuote: QuoteData = {
                quoteReference: backendQuote.quoteReference || undefined, // Extract from backend
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
                  country: backendQuote.destination.country || '',
                  postcode: backendQuote.destination.postCode || '',
                  hasElevator: backendQuote.destination.hasElevator || true,
                  floor: backendQuote.destination.floor || 0,
                } : undefined,
                distanceMiles: backendQuote.distanceMiles || undefined,
                numberOfItemsToDismantle: backendQuote.numberOfItemsToDismantle || 0,
                numberOfItemsToAssemble: backendQuote.numberOfItemsToAssemble || 0,
                vanType: backendQuote.vanType as any,
                driverCount: backendQuote.driverCount || 1,
                collectionDate: backendQuote.schedule?.collectionDate || undefined,
                deliveryDate: backendQuote.schedule?.deliveryDate || undefined,
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
                depositAmount: undefined,
                payment: {
                  status: (backendQuote.payment?.status as 'pending' | 'paid' | 'failed') || 'pending',
                  paymentType: (backendQuote.payment?.paymentType as 'full' | 'deposit' | 'later') || 'full',
                  depositAmount: backendQuote.payment?.depositAmount || undefined,
                }
              };

              newQuotes[quoteType] = frontendQuote;
            }

            setState(prev => {
              const newState = {
                ...prev,
                quotes: newQuotes,
                activeQuoteType: firstQuoteType,
                metadata: {
                  ...prev.metadata,
                  lastActiveQuoteType: firstQuoteType || undefined,
                  lastActivity: new Date().toISOString()
                }
              };

              // Save metadata to IndexedDB
              (async () => {
                try {
                  await saveMetadataToIndexDB(newState.metadata);
                } catch (error) {
                  console.error('[QuoteContext] Failed to save metadata to IndexedDB:', error);
                }
              })();

              return newState;
            });

            // Save to IndexedDB after loading backend data
            try {
              await saveToIndexDB(newQuotes);
            } catch (error) {
              console.error('[QuoteContext] Failed to save to IndexedDB after loading backend data:', error);
            }
          } else {
            // CRITICAL FIX: If backend has no quotes, preserve existing IndexedDB data
            console.log('[QuoteContext] Backend has no quotes - preserving existing IndexedDB data');
            const existingIndexDBData = await loadFromIndexDB();
            if (existingIndexDBData) {
              console.log('[QuoteContext] Preserving existing IndexedDB data:', existingIndexDBData);
              // Don't overwrite state with empty data - preserve what we have
              setState(prev => ({
                ...prev,
                quotes: existingIndexDBData,
                activeQuoteType: prev.metadata.lastActiveQuoteType || null, // Restore active quote type
                metadata: {
                  ...prev.metadata,
                  lastActivity: new Date().toISOString()
                }
              }));
            }
          }
        }
        
        // ✅ Load quotes from IndexDB and merge with backend data
        // Backend ALWAYS wins, IndexDB only supplements
        try {
          // First, clean up any corrupted data
          console.log('[QuoteContext] Starting IndexedDB cleanup and merge process...');
          const cleanedIndexDBData = await cleanupIndexedDBData();
          
          // Then load the cleaned data
          const indexDBData = cleanedIndexDBData || await loadFromIndexDB();
          
          console.log('[QuoteContext] IndexedDB data after cleanup:', {
            cleanedData: cleanedIndexDBData,
            fallbackData: indexDBData,
            hasData: !!indexDBData,
            dataKeys: indexDBData ? Object.keys(indexDBData) : [],
            dataValues: indexDBData ? Object.values(indexDBData).map(q => q ? 'hasData' : 'undefined') : []
          });
          
          // CRITICAL FIX: Always preserve IndexedDB data as fallback
          if (indexDBData) {
            let hasMergedData = false;
            const mergedQuotes = { ...state.quotes };
            
            for (const quoteType of Object.values(QuoteOption)) {
              const backendQuote = state.quotes[quoteType];
              const indexDBQuote = indexDBData[quoteType] as QuoteData | undefined;
              
              if (backendQuote && indexDBQuote) {
                // Merge IndexedDB payment data with backend data
                if (indexDBQuote.paymentStatus && !backendQuote.paymentStatus) {
                  mergedQuotes[quoteType] = { ...backendQuote, paymentStatus: indexDBQuote.paymentStatus };
                  hasMergedData = true;
                  console.log(`[QuoteContext] Merged payment status for ${quoteType} from IndexDB:`, indexDBQuote.paymentStatus);
                }
                
                if (indexDBQuote.payment && !backendQuote.payment) {
                  mergedQuotes[quoteType] = { ...backendQuote, payment: indexDBQuote.payment };
                  hasMergedData = true;
                  console.log(`[QuoteContext] Merged payment details for ${quoteType} from IndexDB`);
                }
              } else if (!backendQuote && indexDBQuote) {
                // CRITICAL: If no backend quote but IndexedDB has data, preserve it
                mergedQuotes[quoteType] = indexDBQuote;
                hasMergedData = true;
                console.log(`[QuoteContext] Preserved IndexedDB data for ${quoteType} (no backend quote)`);
              }
            }
            
            // Always update state if we have any data to preserve
            if (hasMergedData) {
              console.log('[QuoteContext] Merging IndexedDB data with backend data');
              setState(prev => ({
                ...prev,
                quotes: mergedQuotes
              }));
              
              // Save to IndexedDB after merging
              try {
                await saveToIndexDB(mergedQuotes);
              } catch (error) {
                console.error('[QuoteContext] Failed to save to IndexedDB after merging:', error);
              }
            } else {
              console.log('[QuoteContext] No data to merge - preserving existing state');
            }
          }
        } catch (error) {
          console.error('Failed to load from IndexDB:', error);
        }
        
        // CRITICAL FIX: Restore activeQuoteType from lastActiveQuoteType if not set
        if (!state.activeQuoteType && state.metadata.lastActiveQuoteType) {
          console.log('[QuoteContext] Restoring activeQuoteType from lastActiveQuoteType:', state.metadata.lastActiveQuoteType);
          setState(prev => ({
            ...prev,
            activeQuoteType: prev.metadata.lastActiveQuoteType || null
          }));
        }
        
        // Also restore activeQuoteType from the base state if available
        // TODO: Fix TypeScript error - temporarily commented out
        // if (!state.activeQuoteType && baseMetadata && baseMetadata.lastActiveQuoteType) {
        //   console.log('[QuoteContext] Restoring activeQuoteType from base metadata:', baseMetadata.lastActiveQuoteType);
        //   setState(prev => ({
        //     ...prev,
        //     activeQuoteType: baseMetadata.lastActiveQuoteType || null
        //   }));
        // }
        
        // Set hydrated state
        setIsHydrated(true);
      } catch (error) {
        console.error('Failed to initialize session:', error);
        // Still set hydrated to prevent infinite loading
        setIsHydrated(true);
      }
    };
    
    initializeSession();
  }, [loadQuotes]);

  // Quote Type Management
  const setActiveQuoteType = useCallback(async (type: QuoteOption | null) => {
    console.log('[QuoteContext] ===== setActiveQuoteType called =====');
    console.log('[QuoteContext] Type requested:', type);
    console.log('[QuoteContext] Current quotes state:', state.quotes);
    console.log('[QuoteContext] Quote exists for this type?', type ? !!state.quotes[type] : 'N/A');
    
    if (type === null || Object.values(QuoteOption).includes(type)) {
              if (type && !state.quotes[type]) {
          console.log('[QuoteContext] 🚀 CREATING NEW QUOTE - calling backend selectQuoteType...');
          console.log('[QuoteContext] This will call POST /api/guest/select-quote-type?quoteType=' + type);
        // If this quote type doesn't exist yet, create it via backend
        try {
          // Ensure guest session exists before creating quote
          console.log('[QuoteContext] Ensuring guest session before creating quote...');
          await ensureGuest();
          
          const quoteResponse = await selectQuoteType(type);
          console.log('[QuoteContext] selectQuoteType response:', quoteResponse);
          
          if (quoteResponse?.quote?.quoteReference) {
            console.log('[QuoteContext] Creating quote with reference:', quoteResponse.quote.quoteReference);
            
            // Store the ETag from the backend response for future concurrency control
            if (quoteResponse.etag) {
              etagRef.current = quoteResponse.etag;
              console.log('[QuoteContext] Stored ETag from backend:', quoteResponse.etag);
            }
            
            // Initialize the quote with the reference from backend
            const newQuote: QuoteData = {
              quoteReference: quoteResponse.quote.quoteReference,
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
              depositAmount: undefined,
              payment: {
                status: 'pending',
                paymentType: 'full',
                depositAmount: undefined,
              }
            };

            // Update state with new quote (quoteReference is now part of QuoteData)
            setState(prev => {
              const newState = {
                ...prev,
                quotes: {
                  ...prev.quotes,
                  [type]: newQuote
                },
                activeQuoteType: type,
                metadata: {
                  ...prev.metadata,
                  lastActiveQuoteType: type,
                  lastActivity: new Date().toISOString()
                }
              };

              // Save metadata to IndexedDB
              (async () => {
                try {
                  await saveMetadataToIndexDB(newState.metadata);
                } catch (error) {
                  console.error('[QuoteContext] Failed to save metadata to IndexedDB:', error);
                }
              })();

              return newState;
            });

            // Save to IndexedDB after creating new quote
            try {
              const updatedQuotes = { ...state.quotes, [type]: newQuote };
              await saveToIndexDB(updatedQuotes);
              console.log('[QuoteContext] Successfully saved new quote to IndexedDB with reference:', quoteResponse.quote.quoteReference);
            } catch (error) {
              console.error('[QuoteContext] Failed to save to IndexedDB after quote creation:', error);
            }
          } else {
            console.error('[QuoteContext] No quote reference received from backend');
          }
        } catch (error) {
          console.error('Failed to create quote:', error);
        }
      } else {
        // Quote type already exists, just set as active
        console.log('[QuoteContext] ✅ Quote already exists for type:', type, '- no backend call needed');
        setState(prev => {
          const newState = {
            ...prev,
            activeQuoteType: type,
            metadata: {
              ...prev.metadata,
              lastActiveQuoteType: type || undefined,
              lastActivity: new Date().toISOString()
            }
          };

          return newState;
        });

        // Save to IndexedDB when changing active quote type
        try {
          await saveToIndexDB(state.quotes);
        } catch (error) {
          console.error('[QuoteContext] Failed to save to IndexedDB after changing active quote:', error);
        }
      }
    }
  }, [state.quotes, selectQuoteType]);

  // Quote Data Management
  // 
  // 🏗️ ARCHITECTURE: IndexedDB-First with Backend Save on Payment
  // - Navigation pages: Local state + IndexedDB only (fast, offline-friendly)
  // - Payment page: Local state + IndexedDB + Backend save (persistent, source of truth)
  // - This prevents excessive backend calls during user navigation
  const updateQuote = useCallback(async (type: QuoteOption, data: Partial<QuoteData>) => {
    console.log(`[QuoteContext] 🔍 === UPDATE QUOTE DEBUG ===`);
    console.log(`[QuoteContext] Type: ${type}`);
    console.log(`[QuoteContext] Data being updated:`, data);
    console.log(`[QuoteContext] Current quotes[${type}]:`, state.quotes[type]);
    
    // Update local state first
    setState(prev => {
      const newState = {
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
      };

      console.log(`[QuoteContext] New state for quotes[${type}]:`, newState.quotes[type]);
      
      // ✅ FIXED: Save to IndexedDB using the NEW state, not the old state
      // This ensures we save the actual updated data, not stale data
      (async () => {
        try {
          console.log(`[QuoteContext] 📝 Saving NEW state to IndexedDB:`, newState.quotes[type]);
          console.log(`[QuoteContext] 📝 Full quotes object being saved:`, newState.quotes);
          
          await saveToIndexDB(newState.quotes);
          console.log(`[QuoteContext] ✅ Quote data updated locally and saved to IndexedDB for type: ${type}`);
          
          // Verify the save worked by reading it back
          const verifyQuotes = await loadFromIndexDB();
          console.log(`[QuoteContext] 🔍 Verification - Read back from IndexedDB:`, verifyQuotes);
          // TODO: Fix TypeScript error - temporarily commented out
          // if (verifyQuotes && verifyQuotes[type]) {
          //   console.log(`[QuoteContext] 🔍 Verification - removalPricing exists:`, verifyQuotes[type]?.removalPricing ? 'YES' : 'NO');
          // }
          
          // Also save metadata to IndexedDB
          await saveMetadataToIndexDB(newState.metadata);
          console.log(`[QuoteContext] ✅ Metadata also saved to IndexedDB`);
        } catch (error) {
          console.error('[QuoteContext] ❌ Failed to save to IndexedDB after update:', error);
        }
      })();
      
      return newState;
    });
    
    // 🚫 NO BACKEND SAVE HERE - Only happens on /pay page
    // This prevents excessive backend calls during navigation while maintaining data persistence
    console.log(`[QuoteContext] 📝 Data saved locally - Backend save will happen on /pay page`);
  }, [state.quotes, saveToIndexDB]);

  // 🎯 BACKEND SAVE FUNCTION: Use this ONLY when you need to persist data to backend
  // - Called from /pay page before payment processing
  // - NOT called during normal navigation (use updateQuote instead)
  const saveQuoteToBackend = useCallback(async (type: QuoteOption): Promise<boolean> => {
    if (!type || !state.quotes[type]) {
      console.warn(`Cannot save quote to backend: type ${type} not found`);
      return false;
    }

    try {
      console.log('Saving quote to backend before payment...');
      const updatedQuote = { ...state.quotes[type] };
      const response = await saveQuote(type, updatedQuote, undefined, etagRef.current);
      
      if (response?.etag) {
        etagRef.current = response.etag;
        console.log('Quote successfully saved to backend with ETag:', response.etag);
        return true;
      } else {
        console.error('Backend save failed: no ETag returned');
        return false;
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
          
          // Retry the save
          return await saveQuoteToBackend(type);
        }
      } else {
        console.error('Failed to save quote to backend:', error);
      }
      return false;
    }
  }, [state.quotes, saveQuote, loadQuotes]);

  // Utility
  const resetQuote = useCallback(async () => {
    if (!state.activeQuoteType) return;
    
    setState(prev => {
      const newState = {
        ...prev,
        quotes: {
          ...prev.quotes,
          [state.activeQuoteType!]: {
            quoteReference: undefined, // Will be set when quote is created
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
            depositAmount: undefined,
            payment: {
              status: 'pending',
              paymentType: 'full',
              depositAmount: undefined,
            }
          }
        },
        metadata: {
          ...prev.metadata,
          lastActivity: new Date().toISOString()
        }
      };

      return newState;
    });

    // Save to IndexedDB after resetting quote
    try {
      const updatedQuotes = { ...state.quotes, [state.activeQuoteType!]: undefined };
      await saveToIndexDB(updatedQuotes);
    } catch (error) {
      console.error('[QuoteContext] Failed to save to IndexedDB after quote reset:', error);
    }
  }, [state.activeQuoteType, saveToIndexDB]);

  const resetAllQuotes = useCallback(async () => {
    setState(prev => {
      const newState = {
        ...prev,
        quotes: {
          [QuoteOption.Send]: undefined,
          [QuoteOption.Receive]: undefined,
          [QuoteOption.Removals]: undefined
        },
        sharedData: {
          ...prev.sharedData,
          distanceMiles: undefined
        }
      };

      return newState;
    });

    // Save to IndexedDB after resetting all quotes
    try {
      const emptyQuotes = {
        [QuoteOption.Send]: undefined,
        [QuoteOption.Receive]: undefined,
        [QuoteOption.Removals]: undefined
      };
      await saveToIndexDB(emptyQuotes);
    } catch (error) {
      console.error('[QuoteContext] Failed to save to IndexedDB after resetting all quotes:', error);
    }
  }, [saveToIndexDB]);

  // Shared Data Management
  const updateSharedData = useCallback(async (data: Partial<SharedData>) => {
    setState(prev => {
      const newState = {
        ...prev,
        sharedData: {
          ...prev.sharedData,
          ...data
        },
        metadata: {
          ...prev.metadata,
          lastActivity: new Date().toISOString()
        }
      };

      return newState;
    });

    // Save to IndexedDB when shared data changes
    try {
      await saveToIndexDB(state.quotes);
    } catch (error) {
      console.error('[QuoteContext] Failed to save to IndexedDB after shared data update:', error);
    }
  }, [saveToIndexDB, state.quotes]);

  // Get quote reference for display
  const getQuoteReference = useCallback((type: QuoteOption): string | null => {
    return state.quotes[type]?.quoteReference || null;
  }, [state.quotes]);

  // Get current ETag for concurrency control
  const getCurrentEtag = useCallback((): string | undefined => {
    return etagRef.current;
  }, []);

  // Debug function to check IndexedDB status
  const debugIndexedDB = useCallback(async () => {
    try {
      console.log('[QuoteContext] === IndexedDB Debug Info ===');
      
      // Check if we can read from IndexedDB
      const savedQuotes = await HybridStorage.get('quotes', null);
      console.log('[QuoteContext] Current IndexedDB quotes:', savedQuotes);
      
      // Check current state
      console.log('[QuoteContext] Current React state quotes:', state.quotes);
      console.log('[QuoteContext] Active quote type:', state.activeQuoteType);
      
      // Check if there's a mismatch
      if (savedQuotes && state.quotes) {
        const hasMismatch = Object.keys(savedQuotes).some(key => {
          const saved = savedQuotes[key as QuoteOption];
          const current = state.quotes[key as QuoteOption];
          return JSON.stringify(saved) !== JSON.stringify(current);
        });
        
        if (hasMismatch) {
          console.warn('[QuoteContext] MISMATCH DETECTED: IndexedDB data differs from React state!');
        } else {
          console.log('[QuoteContext] IndexedDB and React state are in sync');
        }
      }
      
      console.log('[QuoteContext] === End Debug Info ===');
      
      // Expose globally for debugging
      if (typeof window !== 'undefined') {
        (window as any).debugIndexedDB = debugIndexedDB;
        (window as any).cleanupIndexedDBData = cleanupIndexedDBData;
        (window as any).quoteContextState = state;
        (window as any).hybridStorage = HybridStorage;
      }
    } catch (error) {
      console.error('[QuoteContext] Debug function failed:', error);
    }
  }, [state.quotes, state.activeQuoteType]);

  // Context value
  const contextValue: QuoteContextType = {
    ...state,
    setActiveQuoteType,
    updateQuote,
    resetQuote,
    resetAllQuotes,
    updateSharedData,
    getQuoteReference,
    getCurrentEtag,
    isHydrated,
    debugIndexedDB,
    cleanupIndexedDBData
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
