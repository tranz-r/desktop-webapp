"use client";

import React from 'react';
import { QuoteProvider } from '@/contexts/QuoteContext';
import { CartProvider } from '@/contexts/CartContext';
import ProgressStepper from '@/components/nav/ProgressStepper';
import { usePathname } from 'next/navigation';

function StepperGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const show = ['/inventory','/collection-delivery','/van-selection','/pickup-dropoff','/origin-destination','/pricing','/summary','/confirmation','/pay'].some(p => pathname.startsWith(p));
  return (
    <>
      {show && <ProgressStepper />}
      {children}
    </>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QuoteProvider>
      <CartProvider>
        <StepperGate>{children}</StepperGate>
      </CartProvider>
    </QuoteProvider>
  );
}
