"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      onDoubleClick={onDetails}
      className={`border ${selected ? 'border-primary-500' : 'border-transparent'} shadow-md ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
    > 
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm text-gray-600">~{capacityM3} m³</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {dimensions && (
          <div className="text-xs text-gray-600">{dimensions.lengthM} × {dimensions.widthM} × {dimensions.heightM} m</div>
        )}
        <div className="text-sm font-semibold">From £{basePrice}</div>
        <div className="flex gap-2">
          <Button variant={selected ? 'default' : 'outline'} onClick={onSelect} disabled={disabled}>
            {selected ? 'Selected' : 'Select'}
          </Button>
          {onDetails && (
            <Button variant="ghost" onClick={onDetails}>Details</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
