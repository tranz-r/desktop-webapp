"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { QuoteOption } from '@/types/booking';

interface QuoteOptionContextType {
  option: QuoteOption | null;
  setOption: (opt: QuoteOption | null) => void;
}

const QuoteOptionContext = createContext<QuoteOptionContextType | undefined>(undefined);
const STORAGE_KEY = 'quoteOption';

export function QuoteOptionProvider({ children }: { children: React.ReactNode }) {
  const [option, setOptionState] = useState<QuoteOption | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as QuoteOption | null;
        setOptionState(parsed ?? null);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(option));
    } catch {}
  }, [option]);

  const setOption = (opt: QuoteOption | null) => setOptionState(opt);

  const value = useMemo<QuoteOptionContextType>(() => ({ option, setOption }), [option]);

  return <QuoteOptionContext.Provider value={value}>{children}</QuoteOptionContext.Provider>;
}

export function useQuoteOption(): QuoteOptionContextType {
  const ctx = useContext(QuoteOptionContext);
  if (!ctx) throw new Error('useQuoteOption must be used within QuoteOptionProvider');
  return ctx;
}
