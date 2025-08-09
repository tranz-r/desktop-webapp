"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Address, BookingState, PricingTierId, VanType } from '@/types/booking';
import { safeGet, safeSet } from '@/lib/storage';

export interface BookingContextType extends BookingState {
  setVan: (van: VanType) => void;
  setDriverCount: (count: number) => void;
  setOrigin: (addr: Address) => void;
  setDestination: (addr: Address) => void;
  setDistanceKm: (km: number) => void;
  setPricingTier: (tier: PricingTierId) => void;
  setCollectionDate: (iso: string) => void;
  setDeliveryDate: (iso: string) => void;
  setTotalCost: (amount: number) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);
const STORAGE_KEY = 'booking';

const DEFAULT_STATE: BookingState = {
  driverCount: 1,
  totalCost: 0,
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default state to avoid SSR/CSR hydration mismatches.
  // Load from storage on mount instead.
  const [state, setState] = useState<BookingState>(DEFAULT_STATE);

  // Load saved booking on client after mount
  useEffect(() => {
    const saved = safeGet<BookingState>(STORAGE_KEY, DEFAULT_STATE);
    setState(saved);
  }, []);

  // Persist on changes
  useEffect(() => {
    safeSet(STORAGE_KEY, state);
  }, [state]);

  const setVan = useCallback((van: VanType) => setState(prev => ({ ...prev, selectedVan: van })), []);
  const setDriverCount = useCallback((count: number) => setState(prev => ({ ...prev, driverCount: Math.max(1, Math.min(2, Math.floor(count))) })), []);
  const setOrigin = useCallback((addr: Address) => setState(prev => ({ ...prev, origin: addr })), []);
  const setDestination = useCallback((addr: Address) => setState(prev => ({ ...prev, destination: addr })), []);
  const setDistanceKm = useCallback((km: number) => setState(prev => ({ ...prev, distanceKm: Math.max(0, Number(km) || 0) })), []);
  const setPricingTier = useCallback((tier: PricingTierId) => setState(prev => ({ ...prev, pricingTier: tier })), []);
  const setCollectionDate = useCallback((iso: string) => setState(prev => ({ ...prev, collectionDate: iso })), []);
  const setDeliveryDate = useCallback((iso: string) => setState(prev => ({ ...prev, deliveryDate: iso })), []);
  const setTotalCost = useCallback((amount: number) => setState(prev => ({ ...prev, totalCost: Math.max(0, amount) })), []);
  const resetBooking = useCallback(() => setState(DEFAULT_STATE), []);

  const api = useMemo<BookingContextType>(() => ({
    ...state,
    setVan,
    setDriverCount,
    setOrigin,
    setDestination,
    setDistanceKm,
    setPricingTier,
    setCollectionDate,
    setDeliveryDate,
    setTotalCost,
    resetBooking,
  }), [state, setVan, setDriverCount, setOrigin, setDestination, setDistanceKm, setPricingTier, setCollectionDate, setDeliveryDate, setTotalCost, resetBooking]);

  return <BookingContext.Provider value={api}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
