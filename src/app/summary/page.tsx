"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { computeCost } from '@/lib/cost';
import { email } from 'zod';

export default function SummaryPage() {
  const router = useRouter();
  const booking = useBooking();
  const { vehicle, addresses, pricing, schedule, customer, setTotalCost } = booking;
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const origin = addresses.origin;
  const destination = addresses.destination;
  const distanceKm = addresses.distanceKm;
  const pricingTier = pricing.pricingTier;
  const collectionDate = schedule.dateISO;
  const deliveryDate = schedule.deliveryDateISO;
  const [loading, setLoading] = React.useState(false);

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
      pricingTier,
    });
  }, [selectedVan, driverCount, origin, destination, pricingTier, distanceKm]);

  // Persist the computed total into BookingContext (and localStorage via context)
  React.useEffect(() => {
    if (cost?.total != null && !Number.isNaN(cost.total)) {
      setTotalCost(cost.total);
    }
  }, [cost, setTotalCost]);

  const formatDateShort = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // Branch A only: Payment Element via PaymentIntent clientSecret from backend (.NET)
      const targetUrl = process.env.NEXT_PUBLIC_PAYMENT_INIT_URL;
      console.log('Initializing payment with URL:', targetUrl);
      if (!targetUrl) throw new Error('Missing NEXT_PUBLIC_PAYMENT_INIT_URL for payment initialization');

      let payload = {
          van: selectedVan,
          driverCount,
          distanceKm: distanceKm || 0,
          origin,
          destination,
          pricingTier,
          collectionDate,
          deliveryDate,
          customer: {
            fullName: customer?.fullName,
            email: customer?.email,
            phone: customer?.phone,
            billingAddress: customer?.billingAddress,
          },
          email: "mcvavy@gmail.com",
          name: customer?.fullName,
          amount: cost?.total || 0
        };

        console.log('Payload for payment init:', payload);
        
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      // Expect paymentIntent only (Payment Element flow)
      if (data?.paymentIntent) {
        // Navigate to the Stripe Elements page with the client secret
        router.push(`/pay?cs=${encodeURIComponent(data.paymentIntent)}`);
        return;
      }
      throw new Error('Payment init did not return paymentIntent (Payment Element flow only)');
    } catch (e) {
      console.error(e);
      // TODO: Show toast using shadcn toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <StreamlinedHeader />
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quote Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Vehicle</span><span className="font-semibold">{selectedVan || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Crew size</span><span className="font-semibold">{driverCount}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Tier</span><span className="font-semibold">{pricingTier || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Distance</span><span className="font-semibold">{(distanceKm || 0).toFixed(1)} km</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Collection</span><span className="font-semibold">{formatDateShort(collectionDate)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Delivery</span><span className="font-semibold">{formatDateShort(deliveryDate)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">From</span><span className="font-semibold truncate max-w-[60%]" title={origin?.line1 || ''}>{origin?.line1 || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">To</span><span className="font-semibold truncate max-w-[60%]" title={destination?.line1 || ''}>{destination?.line1 || '—'}</span></div>
                </div>
              </div>

              <div className="border-t mt-6 pt-4 flex items-center justify-between">
                <div className="text-lg font-bold">Total</div>
                <div className="text-2xl font-bold text-primary-700">{cost ? `£${cost.total.toFixed(2)}` : '—'}</div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button size="lg" className="px-8" onClick={handleCheckout} disabled={loading || !cost}>
                  {loading ? 'Processing…' : 'Checkout'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
