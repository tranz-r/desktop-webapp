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
}

export default function VanCard({ name, capacityM3, basePrice, selected, onSelect, dimensions }: VanCardProps) {
  return (
    <Card className={`border ${selected ? 'border-primary-500' : 'border-transparent'} shadow-md`}> 
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <span className="text-sm text-gray-600">~{capacityM3} m³</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {dimensions && (
          <div className="text-xs text-gray-600">{dimensions.lengthM} × {dimensions.widthM} × {dimensions.heightM} m</div>
        )}
        <div className="text-sm font-semibold">From £{basePrice}</div>
        <Button className="mt-2" variant={selected ? 'default' : 'outline'} onClick={onSelect}>
          {selected ? 'Selected' : 'Select'}
        </Button>
      </CardContent>
    </Card>
  );
}
