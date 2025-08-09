"use client";

import React from 'react';
import { Users } from 'lucide-react';

interface DriverSelectorProps {
  value: number; // 1 to 3
  onChange: (val: number) => void;
}

export default function DriverSelector({ value, onChange }: DriverSelectorProps) {
  const options = [
    {
      id: 1,
      title: '1 Person',
      description: 'Driver only - you help with loading',
      additionalCost: 'Included',
      badgeClass: 'bg-green-100 text-green-700',
    },
    {
      id: 2,
      title: '2 People',
      description: 'Driver + 1 helper for loading/unloading',
      additionalCost: '+£25/hour',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
    {
      id: 3,
      title: '3 People',
      description: 'Driver + 2 helpers for heavy items',
      additionalCost: '+£45/hour',
      badgeClass: 'bg-amber-100 text-amber-700',
    },
  ] as const;

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium">Choose Crew Size</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((opt) => {
          const selected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={selected}
              className={[
                'text-left rounded-xl border-2 p-4 w-full transition-colors',
                selected ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white hover:bg-gray-50',
              ].join(' ')}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${selected ? 'bg-primary-100' : 'bg-gray-100'}`}>
                  <Users className={selected ? 'text-primary-600' : 'text-gray-500'} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-gray-900">{opt.title}</div>
                    <div className={`text-xs px-2 py-1 rounded-full ${opt.badgeClass}`}>{opt.additionalCost}</div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{opt.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
