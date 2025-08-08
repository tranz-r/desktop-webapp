"use client";

import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DriverSelectorProps {
  value: number; // 1 or 2
  onChange: (val: number) => void;
}

export default function DriverSelector({ value, onChange }: DriverSelectorProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Driver Options</div>
      <RadioGroup value={String(value)} onValueChange={(v) => onChange(Number(v))} className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="1" id="drivers-1" />
          <Label htmlFor="drivers-1">1 Driver</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="2" id="drivers-2" />
          <Label htmlFor="drivers-2">2 Drivers</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
