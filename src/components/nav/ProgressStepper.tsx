"use client";

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { usePathname, useRouter } from 'next/navigation';

const STEPS = [
  { path: '/inventory', label: 'Inventory' },
  { path: '/van-selection', label: 'Van' },
  { path: '/origin-destination', label: 'Addresses' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/payment', label: 'Payment' },
  { path: '/confirmation', label: 'Confirm' },
];

export default function ProgressStepper() {
  const pathname = usePathname();
  const router = useRouter();
  const currentIndex = Math.max(0, STEPS.findIndex(s => pathname.startsWith(s.path)));
  const percent = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <div className="w-full py-2 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-xs">
          {STEPS.map((s, idx) => (
            <button key={s.path} onClick={() => router.push(s.path)} className={`truncate ${idx <= currentIndex ? 'text-primary-700' : 'text-gray-500'}`}>{s.label}</button>
          ))}
        </div>
        <div className="mt-2">
          <Progress value={percent} />
        </div>
      </div>
    </div>
  );
}
