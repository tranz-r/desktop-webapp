"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VanCardProps {
  name: string;
  capacityM3: number;
  basePrice: number;
  selected: boolean;
  onSelect: () => void;
  dimensions?: { lengthM: number; widthM: number; heightM: number };
  onDetails?: () => void;
  disabled?: boolean;
}

export default function VanCard({ name, capacityM3, basePrice, selected, onSelect, dimensions, onDetails, disabled = false }: VanCardProps) {
  return (
    <Card
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      onClick={() => { if (!disabled) onSelect(); }}
      onKeyDown={(e) => { if (!disabled && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onSelect(); } }}
      onDoubleClick={onDetails}
      className={`border ${selected ? 'border-primary-500' : 'border-transparent'} shadow-md ${disabled ? 'opacity-60 pointer-events-none' : 'cursor-pointer hover:border-primary-200'}`}
    > 
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm text-gray-600">~{capacityM3} m³</span>
        </CardTitle>
        {disabled && (
          <div className="flex justify-end">
            <Badge variant="destructive" className="mt-1">Unavailable</Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {dimensions && (
          <div className="text-xs text-gray-600">{dimensions.lengthM} × {dimensions.widthM} × {dimensions.heightM} m</div>
        )}
        <div className="text-sm font-semibold">From £{basePrice}</div>
        {onDetails && !disabled && (
          <div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDetails(); }}
              className="text-sm text-primary-700 hover:text-primary-800 hover:underline"
            >
              Details
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
