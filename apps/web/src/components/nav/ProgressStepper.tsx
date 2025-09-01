"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Check, Package, Truck, MapPin, CreditCard, FileCheck, ArrowRight } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';

const STEPS = [
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/pickup-dropoff', label: 'Van & Date', icon: Truck },
  { path: '/pricing', label: 'Price Tier', icon: CreditCard },
  { path: '/origin-destination', label: 'Customer', icon: MapPin },
  { path: '/summary', label: 'Checkout', icon: CreditCard },
  { path: '/confirmation', label: 'Confirm', icon: FileCheck },
];

// Alias certain routes to existing steps so the correct active state is shown
const ALIASES = new Map<string, string>([
  ['/pay', '/summary'],
  ['/collection-delivery', '/inventory'],
  ['/van-selection', '/pickup-dropoff'],
  ['/removals', '/pickup-dropoff'],
  ['/removal-pricing', '/pricing'],
]);

function normalizePath(p: string) {
  let normalized = p;
  ALIASES.forEach((to, from) => {
    if (normalized.startsWith(from)) {
      normalized = to;
    }
  });
  return normalized;
}

export default function ProgressStepper() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeQuoteType, quotes } = useQuote();
  const normalized = normalizePath(pathname);
  const currentIndex = Math.max(0, STEPS.findIndex(s => normalized.startsWith(s.path)));
  const percent = ((currentIndex + 1) / STEPS.length) * 100;
  
  // Check if payment is completed using QuoteContext
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const isPaymentCompleted = activeQuote?.paymentStatus === 'paid' || 
                            activeQuote?.payment?.status === 'paid';

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-sm fixed top-16 lg:top-20 left-0 right-0 z-40">
      <div className="container mx-auto px-2 sm:px-4 py-3 lg:py-4">

        {/* Steps */}
        <div className="flex items-center justify-between gap-0.5 sm:gap-1 lg:gap-2">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex || 
                              (idx === currentIndex && step.path === '/confirmation' && isPaymentCompleted);
            const isUpcoming = idx > currentIndex;

            return (
              <div key={step.path} className="flex flex-col items-center flex-1 relative min-w-0">
                {/* Connector Line */}
                {idx < STEPS.length - 1 && (
                  <div className="absolute top-3 lg:top-4 left-1/2 w-full h-0.5 bg-gray-200 -z-10 hidden sm:block">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'bg-primary-500' : 'bg-gray-200'
                      }`}
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}

                {/* Step Circle */}
                <button
                  onClick={() => router.push(step.path)}
                  className={`group relative flex flex-col items-center transition-all duration-300 hover:scale-105 w-full ${
                    isActive ? 'z-10' : ''
                  }`}
                >
                  <div className={`
                    relative w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 mx-auto
                    ${isCompleted 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40' 
                      : isActive 
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 ring-2 lg:ring-4 ring-primary-200 hover:shadow-xl hover:shadow-primary-500/40' 
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                    }
                  `}>
                    {isActive && !isCompleted && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full ring-2 lg:ring-4 ring-primary-400 animate-ping pointer-events-none"
                      />
                    )}
                    {isCompleted ? (
                      <Check className="w-3 h-3 lg:w-4 lg:h-4" />
                    ) : (
                      <Icon className={`w-3 h-3 lg:w-4 lg:h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </div>

                  {/* Step Label */}
                  <span className={`
                    mt-1 lg:mt-2 text-[10px] lg:text-xs font-medium transition-all duration-300 text-center w-full truncate px-0.5 lg:px-1
                    ${isCompleted 
                      ? 'text-primary-600' 
                      : isActive 
                        ? 'text-primary-600 font-semibold' 
                        : 'text-gray-500'
                    }
                  `}>
                    {step.label}
                  </span>

                  {/* Removed bottom pulse dot; active state now animates circle border */}
                </button>
              </div>
            );
          })}
        </div>

        {/* Progress Text */}
        {/* <div className="text-center mt-2 lg:mt-3">
          <span className="text-xs text-gray-500">
            Step {currentIndex + 1} of {STEPS.length} • {Math.round(percent)}% Complete
          </span>
        </div> */}
      </div>
    </div>
  );
}
