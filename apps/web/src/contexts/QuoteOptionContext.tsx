"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QuoteOption } from '@/types/booking';

interface QuoteOptionContextType {
  option: QuoteOption | null;
  setOption: (opt: QuoteOption | null) => void;
  clearOption: () => void; // New function to explicitly clear the option
}

const QuoteOptionContext = createContext<QuoteOptionContextType | undefined>(undefined);
const STORAGE_KEY = 'quoteOption';

export function QuoteOptionProvider({ children }: { children: React.ReactNode }) {
  const [option, setOptionState] = useState<QuoteOption | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as QuoteOption | null;
        // Only set if it's a valid QuoteOption value
        if (parsed && Object.values(QuoteOption).includes(parsed)) {
          setOptionState(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading quote option from localStorage:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage when option changes (but only after hydration)
  useEffect(() => {
    if (!isHydrated) return; // Don't persist during initial hydration
    
    try {
      if (option !== null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(option));
      } else {
        // Only remove from localStorage if explicitly cleared
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving quote option to localStorage:', error);
    }
  }, [option, isHydrated]);

  const setOption = (opt: QuoteOption | null) => {
    // Prevent setting to null unless explicitly intended
    if (opt === null && option !== null) {
      console.warn('Attempted to set quote option to null when option already exists. Use clearOption() to explicitly clear.');
      return;
    }
    
    // Only allow setting valid QuoteOption values or null
    if (opt === null || Object.values(QuoteOption).includes(opt)) {
      setOptionState(opt);
    } else {
      console.error('Invalid quote option value:', opt);
    }
  };

  const clearOption = () => {
    setOptionState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing quote option from localStorage:', error);
    }
  };

  const value = useMemo<QuoteOptionContextType>(() => ({ 
    option, 
    setOption, 
    clearOption 
  }), [option]);

  return <QuoteOptionContext.Provider value={value}>{children}</QuoteOptionContext.Provider>;
}

export function useQuoteOption(): QuoteOptionContextType {
  const ctx = useContext(QuoteOptionContext);
  if (!ctx) throw new Error('useQuoteOption must be used within QuoteOptionProvider');
  return ctx;
}
