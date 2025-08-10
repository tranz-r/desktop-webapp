"use client";

import React from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { BookingProvider } from '@/contexts/BookingContext';
import ProgressStepper from '@/components/nav/ProgressStepper';
import { usePathname } from 'next/navigation';

function StepperGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const show = ['/inventory','/van-selection','/origin-destination','/pricing','/summary','/confirmation','/pay'].some(p => pathname.startsWith(p));
  return (
    <>
      {show && <ProgressStepper />}
      {children}
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <BookingProvider>
        <StepperGate>{children}</StepperGate>
      </BookingProvider>
    </CartProvider>
  );
}
