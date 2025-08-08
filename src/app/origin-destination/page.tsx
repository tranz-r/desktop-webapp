"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AddressForm from '@/components/address/AddressForm';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { computeCost } from '@/lib/cost';
import { useRouter } from 'next/navigation';
import { canEnterAddresses } from '@/lib/guards';
import { Input } from '@/components/ui/input';

export default function OriginDestinationPage() {
  const router = useRouter();
  const { origin, destination, driverCount, selectedVan, setOrigin, setDestination, distanceKm, setDistanceKm } = useBooking();

  React.useEffect(() => {
    if (!canEnterAddresses({ selectedVan, driverCount, origin, destination, pricingTier: undefined, collectionDate: undefined, deliveryDate: undefined, totalCost: 0 })) {
      router.replace('/van-selection');
    }
  }, [router, selectedVan, driverCount, origin, destination]);

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
      pricingTier: undefined,
    });
  }, [selectedVan, driverCount, origin, destination, distanceKm]);

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />

      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Addresses"
        title="Enter your origin and destination details"
        description="Floors and elevator availability help us estimate the effort and cost."
      />

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 space-y-8">
          <AddressForm label="Origin" value={origin} onChange={setOrigin} />
          <AddressForm label="Destination" value={destination} onChange={setDestination} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
              <label htmlFor="distance-km" className="text-sm font-medium">Distance (km)</label>
              <Input id="distance-km" inputMode="decimal" placeholder="e.g., 12.5" value={distanceKm ?? ''} onChange={(e) => setDistanceKm(parseFloat(e.target.value))} />
            </div>
          </div>

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
                <div className="font-semibold">Total</div><div className="text-right font-semibold">£{cost.total.toFixed(2)}</div>
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => router.push('/pricing')}>Next: Pricing</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
