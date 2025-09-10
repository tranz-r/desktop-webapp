"use client";

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PricingTierId } from '@/types/booking';

interface PricingTableProps {
  value?: PricingTierId;
  onChange: (tier: PricingTierId) => void;
}

export default function PricingTable({ value, onChange }: PricingTableProps) {
  const tiers: { id: PricingTierId; name: string; features: string[]; popular?: boolean }[] = [
    { id: 'standard', name: 'Standard', features: ['Priority service', 'Basic packing'], popular: true },
    { id: 'premium', name: 'Premium', features: ['Priority service', 'Full packing'], popular: false },
  ];

  return (
    <div className="w-full overflow-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tier</TableHead>
            <TableHead>Features</TableHead>
            <TableHead className="text-right">Select</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tiers.map((t) => (
            <TableRow key={t.id} className={value === t.id ? 'bg-primary-50' : ''}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span>{t.name}</span>
                  {t.popular && <Badge>Popular</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-700">{t.features.join(' • ')}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={value === t.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onChange(t.id)}
                >
                  {value === t.id ? 'Selected' : 'Select'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
