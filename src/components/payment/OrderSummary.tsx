"use client";

import React from 'react';

interface OrderSummaryProps {
  lines: { label: string; value: string | number }[];
  total: string | number;
}

export default function OrderSummary({ lines, total }: OrderSummaryProps) {
  return (
    <div className="border rounded-md p-4 text-sm space-y-2">
      {lines.map((l, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div>{l.label}</div>
          <div className="text-right font-medium">{l.value}</div>
        </div>
      ))}
      <div className="pt-2 border-t flex items-center justify-between font-semibold">
        <div>Total</div>
        <div className="text-right">{total}</div>
      </div>
    </div>
  );
}
