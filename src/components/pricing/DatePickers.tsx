"use client";

import React from 'react';
import { Calendar } from '@/components/ui/calendar';

interface DatePickersProps {
  collectionDate?: string;
  deliveryDate?: string;
  onChange: (collectionISO?: string, deliveryISO?: string) => void;
}

export default function DatePickers({ collectionDate, deliveryDate, onChange }: DatePickersProps) {
  const [collection, setCollection] = React.useState<Date | undefined>(collectionDate ? new Date(collectionDate) : undefined);
  const [delivery, setDelivery] = React.useState<Date | undefined>(deliveryDate ? new Date(deliveryDate) : undefined);

  React.useEffect(() => {
    onChange(collection?.toISOString(), delivery?.toISOString());
  }, [collection, delivery, onChange]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <div className="text-sm font-medium mb-2">Collection Date</div>
        <Calendar mode="single" selected={collection} onSelect={setCollection} className="rounded-md border shadow-sm" captionLayout="dropdown" />
      </div>
      <div>
        <div className="text-sm font-medium mb-2">Delivery Date</div>
        <Calendar mode="single" selected={delivery} onSelect={setDelivery} className="rounded-md border shadow-sm" captionLayout="dropdown" />
      </div>
    </div>
  );
}
