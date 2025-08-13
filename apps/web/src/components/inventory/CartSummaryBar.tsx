"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface CartSummaryBarProps {
  totalItems: number;
  totalVolumeM3: number;
  onOpenCart: () => void;
  onNext: () => void;
}

export default function CartSummaryBar({ totalItems, totalVolumeM3, onOpenCart, onNext }: CartSummaryBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 flex items-center justify-between gap-3">
      <div className="text-sm">
        <span className="font-semibold">{totalItems}</span> items • <span className="font-semibold">{totalVolumeM3.toFixed(3)} m³</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onOpenCart}>View Cart</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
}
