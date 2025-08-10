"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Address, BookingState, PricingTierId, VanType } from '@/types/booking';
import { safeGet, safeSet } from '@/lib/storage';

export interface BookingContextType extends BookingState {
  isHydrated: boolean;
  // Derived composite for the Origin/Destination screen (read-only view)
  originDestination: {
    origin?: Address;
    destination?: Address;
  distanceMiles?: number;
    fullName?: string;
    email?: string;
    phone?: string;
  billingAddress?: Pick<Address, 'line1' | 'postcode'>;
  };
  // Slice updaters (preferred)
  updateVehicle: (partial: Partial<BookingState['vehicle']>) => void;
  updateSchedule: (partial: Partial<BookingState['schedule']>) => void;
  updatePricing: (partial: Partial<BookingState['pricing']>) => void;
  updatePayment: (partial: Partial<BookingState['payment']>) => void;
  updateCustomer: (partial: Partial<BookingState['customer']>) => void;
  updateOriginDestination: (data: {
    origin?: Address;
    destination?: Address;
  distanceMiles?: number;
    fullName?: string;
    email?: string;
    phone?: string;
    billingAddress?: { line1: string; postcode: string };
  }) => void;
  setVan: (van: VanType) => void;
  setDriverCount: (count: number) => void;
  setPricingTier: (tier: PricingTierId) => void;
  setCollectionDate: (iso: string) => void;
  setDeliveryDate: (iso: string) => void;
  setHours: (hours: number) => void;
  setFlexibleTime: (flex: boolean) => void;
  setTimeSlot: (slot: 'morning' | 'afternoon' | 'evening') => void;
  setTotalCost: (amount: number) => void;
  setCustomerName: (name: string) => void;
  setCustomerEmail: (email: string) => void;
  setCustomerPhone: (phone: string) => void;
  setBillingAddress: (line1: string, postcode: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);
const STORAGE_KEY = 'booking';

const DEFAULT_STATE: BookingState = {
  vehicle: { selectedVan: undefined, driverCount: 1 },
  schedule: { dateISO: undefined, deliveryDateISO: undefined, hours: 4, flexibleTime: false, timeSlot: 'morning' },
  pricing: { pricingTier: undefined, totalCost: 0 },
  payment: undefined,
  customer: {},
};

export function BookingProvider({ children }: { children: React.ReactNode }) {
  // Initialize with default state to avoid SSR/CSR hydration mismatches.
  // Load from storage on mount instead.
  const [state, setState] = useState<BookingState>(DEFAULT_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved booking on client after mount
  useEffect(() => {
    const saved = safeGet<BookingState>(STORAGE_KEY, DEFAULT_STATE);
    setState(saved);
    setIsHydrated(true);
  }, []);

  // Persist on changes
  useEffect(() => {
    safeSet(STORAGE_KEY, state);
  }, [state]);

  // Slice updaters
  const updateVehicle = useCallback((partial: Partial<BookingState['vehicle']>) => setState(prev => ({
    ...prev,
    vehicle: { ...prev.vehicle, ...partial },
  })), []);
  const updateSchedule = useCallback((partial: Partial<BookingState['schedule']>) => setState(prev => ({
    ...prev,
    schedule: { ...prev.schedule, ...partial },
  })), []);
  const updatePricing = useCallback((partial: Partial<BookingState['pricing']>) => setState(prev => ({
    ...prev,
    pricing: { ...prev.pricing, ...partial },
  })), []);
  const updatePayment = useCallback((partial: Partial<BookingState['payment']>) => setState(prev => ({
    ...prev,
    payment: { ...(prev.payment ?? {}), ...partial },
  })), []);
  const updateCustomer = useCallback((partial: Partial<BookingState['customer']>) => setState(prev => ({
    ...prev,
    customer: { ...(prev.customer ?? {}), ...partial },
  })), []);
  const updateOriginDestination = useCallback((data: {
    origin?: Address;
    destination?: Address;
  distanceMiles?: number;
    fullName?: string;
    email?: string;
    phone?: string;
    billingAddress?: Pick<Address, 'line1' | 'postcode'>;
  }) => {
  const { origin, destination, distanceMiles, fullName, email, phone, billingAddress } = data;
    // Write to customer as source of truth
  updateCustomer({ origin, destination, distanceMiles, fullName, email, phone, billingAddress });
  }, [updateCustomer]);

  // Back-compat setters using slice updaters
  const setVan = useCallback((van: VanType) => updateVehicle({ selectedVan: van }), [updateVehicle]);
  const setDriverCount = useCallback((count: number) => updateVehicle({ driverCount: Math.max(1, Math.min(3, Math.floor(count))) }), [updateVehicle]);
  const setPricingTier = useCallback((tier: PricingTierId) => updatePricing({ pricingTier: tier }), [updatePricing]);
  const setCollectionDate = useCallback((iso: string) => updateSchedule({ dateISO: iso }), [updateSchedule]);
  const setDeliveryDate = useCallback((iso: string) => updateSchedule({ deliveryDateISO: iso }), [updateSchedule]);
  const setHours = useCallback((hours: number) => updateSchedule({ hours: Math.max(4, Math.floor(hours)) }), [updateSchedule]);
  const setFlexibleTime = useCallback((flex: boolean) => updateSchedule({ flexibleTime: !!flex }), [updateSchedule]);
  const setTimeSlot = useCallback((slot: 'morning' | 'afternoon' | 'evening') => updateSchedule({ timeSlot: slot }), [updateSchedule]);
  const setTotalCost = useCallback((amount: number) => updatePricing({ totalCost: Math.max(0, amount) }), [updatePricing]);
  const setCustomerName = useCallback((name: string) => updateCustomer({ fullName: name }), [updateCustomer]);
  const setCustomerEmail = useCallback((email: string) => updateCustomer({ email }), [updateCustomer]);
  const setCustomerPhone = useCallback((phone: string) => updateCustomer({ phone }), [updateCustomer]);
  const setBillingAddress = useCallback((line1: string, postcode: string) => updateCustomer({ billingAddress: { line1, postcode } }), [updateCustomer]);
  const resetBooking = useCallback(() => setState(DEFAULT_STATE), []);

  const api = useMemo<BookingContextType>(() => ({
    ...state,
    isHydrated,
    originDestination: {
      origin: state.customer?.origin,
      destination: state.customer?.destination,
  distanceMiles: state.customer?.distanceMiles,
      fullName: state.customer?.fullName,
      email: state.customer?.email,
      phone: state.customer?.phone,
      billingAddress: state.customer?.billingAddress,
    },
    updateVehicle,
    updateSchedule,
    updatePricing,
    updatePayment,
    updateCustomer,
  updateOriginDestination,
    setVan,
  setDriverCount,
    setPricingTier,
    setCollectionDate,
    setDeliveryDate,
    setHours,
    setFlexibleTime,
    setTimeSlot,
    setTotalCost,
    setCustomerName,
    setCustomerEmail,
    setCustomerPhone,
    setBillingAddress,
    resetBooking,
  }), [state, isHydrated, updateVehicle, updateSchedule, updatePricing, updatePayment, updateCustomer, updateOriginDestination, setVan, setDriverCount, setPricingTier, setCollectionDate, setDeliveryDate, setHours, setFlexibleTime, setTimeSlot, setTotalCost, setCustomerName, setCustomerEmail, setCustomerPhone, setBillingAddress, resetBooking]);

  return <BookingContext.Provider value={api}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextType {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
