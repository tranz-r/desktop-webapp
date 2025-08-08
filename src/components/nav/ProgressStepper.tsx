"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Check, Package, Truck, MapPin, CreditCard, FileCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/van-selection', label: 'Van Selection', icon: Truck },
  { path: '/origin-destination', label: 'Addresses', icon: MapPin },
  { path: '/pricing', label: 'Pricing', icon: CreditCard },
  { path: '/payment', label: 'Payment', icon: CreditCard },
  { path: '/confirmation', label: 'Confirm', icon: FileCheck },
];

export default function ProgressStepper() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = Math.max(0, STEPS.findIndex(s => pathname.startsWith(s.path)));
  const percent = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 shadow-sm fixed top-16 lg:top-20 left-0 right-0 z-40">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        {/* Progress Bar */}
        <div className="relative mb-3 lg:mb-4">
          <div className="h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="absolute -top-0.5 lg:-top-1 left-0 w-full flex justify-between">
            {STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full border-2 transition-all duration-300 ${
                  idx <= currentIndex 
                    ? 'bg-primary-500 border-primary-500 shadow-lg' 
                    : 'bg-white border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            const isUpcoming = idx > currentIndex;

            return (
              <div key={step.path} className="flex flex-col items-center flex-1 relative">
                {/* Connector Line */}
                {idx < STEPS.length - 1 && (
                  <div className="absolute top-3 lg:top-4 left-1/2 w-full h-0.5 bg-gray-200 -z-10">
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
                  className={`group relative flex flex-col items-center transition-all duration-300 hover:scale-105 ${
                    isActive ? 'z-10' : ''
                  }`}
                >
                  <div className={`
                    w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${isCompleted 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40' 
                      : isActive 
                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 ring-2 lg:ring-4 ring-primary-100 hover:shadow-xl hover:shadow-primary-500/40' 
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300'
                    }
                  `}>
                    {isCompleted ? (
                      <Check className="w-3 h-3 lg:w-4 lg:h-4" />
                    ) : (
                      <Icon className={`w-3 h-3 lg:w-4 lg:h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    )}
                  </div>

                  {/* Step Label */}
                  <span className={`
                    mt-1 lg:mt-2 text-xs font-medium transition-all duration-300 text-center max-w-16 lg:max-w-20
                    ${isCompleted 
                      ? 'text-primary-600' 
                      : isActive 
                        ? 'text-primary-600 font-semibold' 
                        : 'text-gray-500'
                    }
                  `}>
                    {step.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -bottom-0.5 lg:-bottom-1 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-primary-500 rounded-full animate-pulse" />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Progress Text */}
        <div className="text-center mt-2 lg:mt-3">
          <span className="text-xs text-gray-500">
            Step {currentIndex + 1} of {STEPS.length} • {Math.round(percent)}% Complete
          </span>
        </div>
      </div>
    </div>
  );
}
