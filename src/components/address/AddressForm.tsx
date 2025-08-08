"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Address } from '@/types/booking';

interface AddressFormProps {
  label: string;
  value?: Address;
  onChange: (addr: Address) => void;
}

export default function AddressForm({ label, value, onChange }: AddressFormProps) {
  const [line1, setLine1] = React.useState(value?.line1 || '');
  const [postcode, setPostcode] = React.useState(value?.postcode || '');
  const [floor, setFloor] = React.useState<number>(value?.floor ?? 0);
  const [hasElevator, setHasElevator] = React.useState<boolean>(!!value?.hasElevator);

  React.useEffect(() => {
    onChange({ line1, postcode, floor, hasElevator });
  }, [line1, postcode, floor, hasElevator, onChange]);

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">{label}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor={`${label}-line1`}>Address line</Label>
          <Input id={`${label}-line1`} placeholder="e.g., 221B Baker Street" value={line1} onChange={(e) => setLine1(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${label}-postcode`}>Postcode</Label>
          <Input id={`${label}-postcode`} placeholder="e.g., NW1 6XE" value={postcode} onChange={(e) => setPostcode(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Floor</Label>
          <Select value={String(floor)} onValueChange={(v) => setFloor(Number(v))}>
            <SelectTrigger>
              <SelectValue placeholder="Select floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Ground (0)</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4">4</SelectItem>
              <SelectItem value="5">5</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Switch id={`${label}-elevator`} checked={hasElevator} onCheckedChange={setHasElevator} />
          <Label htmlFor={`${label}-elevator`}>Elevator available</Label>
        </div>
      </div>
    </div>
  );
}
