"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerItem {
  id: string;
  name: string;
  volume: number;
  quantity: number;
}

interface CartDrawerProps {
  open: boolean;
  items: CartDrawerItem[];
  onClose: () => void;
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({ open, items, onClose, onInc, onDec, onRemove }: CartDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-3">
          {items.length === 0 && (
            <div className="text-sm text-gray-600">Your cart is empty.</div>
          )}
          {items.map(it => (
            <div key={it.id} className="flex items-center justify-between gap-2 border rounded-md p-2">
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{it.name}</div>
                <div className="text-xs text-gray-600">{it.volume.toFixed(3)} m³ × {it.quantity}</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onDec(it.id)}>-</Button>
                <div className="w-8 text-center text-sm">{it.quantity}</div>
                <Button size="sm" onClick={() => onInc(it.id)}>+</Button>
                <Button variant="destructive" size="sm" onClick={() => onRemove(it.id)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
        <SheetFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
