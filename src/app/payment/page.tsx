"use client";

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import OrderSummary from '@/components/payment/OrderSummary';
import PaymentForm from '@/components/payment/PaymentForm';
import { useBooking } from '@/contexts/BookingContext';
import { computeCost } from '@/lib/cost';
import { useRouter } from 'next/navigation';
import { canEnterPayment } from '@/lib/guards';

export default function PaymentPage() {
  const router = useRouter();
  const booking = useBooking();
  const { vehicle, originDestination, pricing, isHydrated } = booking;
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const origin = originDestination.origin;
  const destination = originDestination.destination;
  const distanceMiles = originDestination.distanceMiles;
  const pricingTier = pricing.pricingTier;

  React.useEffect(() => {
    if (!isHydrated) return;
    if (!canEnterPayment(booking)) {
      router.replace('/pricing');
    }
  }, [router, booking, isHydrated]);

  const cost = React.useMemo(() => {
    if (!selectedVan) return null;
    return computeCost({
      van: selectedVan,
      driverCount,
      distanceMiles: distanceMiles || 0,
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier,
    });
  }, [selectedVan, driverCount, origin, destination, pricingTier, distanceMiles]);

  const amountPence = Math.max(0, Math.round((cost?.total || 0) * 100));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      
      <main className="flex-1">
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="text-sm font-semibold mb-3">Order Summary</div>
            <OrderSummary
              lines={[
                { label: 'Van', value: selectedVan || '-' },
                { label: 'Drivers', value: driverCount },
                { label: 'Tier', value: pricingTier || '-' },
                { label: 'Distance (miles)', value: distanceMiles ?? 0 },
              ]}
              total={`£${(cost?.total || 0).toFixed(2)}`}
            />
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Payment</div>
            <PaymentForm amountPence={amountPence} />
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
