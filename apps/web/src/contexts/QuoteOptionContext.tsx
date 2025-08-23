"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QuoteOption } from '@/types/booking';
import { safeGet, safeSet, safeRemove } from '@/lib/storage';

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

  // Load from HybridStorage (with localStorage fallback) on mount
  useEffect(() => {
    const loaded = safeGet<QuoteOption | null>(STORAGE_KEY, null);
    if (loaded && Object.values(QuoteOption).includes(loaded)) {
      setOptionState(loaded);
    }
    setIsHydrated(true);
  }, []);

  // Persist via HybridStorage when option changes (but only after hydration)
  useEffect(() => {
    if (!isHydrated) return; // Don't persist during initial hydration
    if (option !== null) {
      safeSet(STORAGE_KEY, option);
    } else {
      safeRemove(STORAGE_KEY);
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
    safeRemove(STORAGE_KEY);
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
