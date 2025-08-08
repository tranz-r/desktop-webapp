"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ItemCardProps {
  name: string;
  volumeM3: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function ItemCard({ name, volumeM3, quantity, onAdd, onRemove }: ItemCardProps) {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold truncate">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="text-sm text-gray-600">{volumeM3.toFixed(3)} m³</div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onRemove} disabled={quantity <= 0}>-</Button>
          <div className="w-8 text-center text-sm font-medium">{quantity}</div>
          <Button variant="default" size="sm" onClick={onAdd}>+</Button>
        </div>
      </CardContent>
    </Card>
  );
}
