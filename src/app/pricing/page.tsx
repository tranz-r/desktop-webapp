"use client";

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import PricingTable from '@/components/pricing/PricingTable';
import DatePickers from '@/components/pricing/DatePickers';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { computeCost } from '@/lib/cost';
import { canEnterPricing } from '@/lib/guards';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();
  const { selectedVan, driverCount, origin, destination, pricingTier, setPricingTier, collectionDate, deliveryDate, setCollectionDate, setDeliveryDate, distanceKm } = useBooking();

  React.useEffect(() => {
    if (!canEnterPricing({ selectedVan, driverCount, origin, destination, pricingTier, collectionDate, deliveryDate, totalCost: 0 })) {
      router.replace('/origin-destination');
    }
  }, [router, selectedVan, driverCount, origin, destination, pricingTier, collectionDate, deliveryDate]);

  const cost = React.useMemo(() => {
    if (!selectedVan) return null;
    return computeCost({
      van: selectedVan,
      driverCount,
      distanceKm: distanceKm || 0,
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier: pricingTier,
    });
  }, [selectedVan, driverCount, origin, destination, pricingTier, distanceKm]);

  return (
    <div className="min-h-screen bg-background">
      <StreamlinedHeader />
      
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-8">
          <PricingTable value={pricingTier} onChange={setPricingTier} />

          <DatePickers
            collectionDate={collectionDate}
            deliveryDate={deliveryDate}
            onChange={(c, d) => {
              if (c) setCollectionDate(c);
              if (d) setDeliveryDate(d);
            }}
          />

          <div className="border rounded-md p-4 text-sm">
            <div className="font-semibold mb-2">Estimated Cost Preview</div>
            {!selectedVan && <div>Select a van first.</div>}
            {selectedVan && cost && (
              <div className="grid grid-cols-2 gap-2">
                <div>Base van</div><div className="text-right">£{cost.baseVan.toFixed(2)}</div>
                <div>Distance</div><div className="text-right">£{cost.distance.toFixed(2)}</div>
                <div>Floors</div><div className="text-right">£{cost.floors.toFixed(2)}</div>
                <div>Elevator adj.</div><div className="text-right">£{cost.elevatorAdjustment.toFixed(2)}</div>
                <div>Drivers</div><div className="text-right">£{cost.drivers.toFixed(2)}</div>
                <div>Tier adj.</div><div className="text-right">£{cost.tierAdjustment.toFixed(2)}</div>
                <div className="font-semibold">Total</div><div className="text-right font-semibold">£{cost.total.toFixed(2)}</div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => router.push('/payment')}>Next: Payment</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
