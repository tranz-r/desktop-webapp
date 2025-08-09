"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { computeCost } from '@/lib/cost';

export default function SummaryPage() {
  const router = useRouter();
  const { selectedVan, driverCount, origin, destination, pricingTier, collectionDate, deliveryDate, distanceKm } = useBooking();
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

  const formatDateShort = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_PAYMENT_INIT_URL;
      const targetUrl = backendUrl && backendUrl.length > 0 ? backendUrl : '/api/checkout';
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          van: selectedVan,
          driverCount,
          distanceKm: distanceKm || 0,
          origin,
          destination,
          pricingTier,
          collectionDate,
          deliveryDate,
        }),
      });
      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      // Prefer checkout URL if backend returns one
      if (data?.url) {
        window.location.href = data.url;
        return;
      }
      // If using Payment Intents and returning clientSecret, you can handle Stripe.js here (future enhancement)
      if (data?.clientSecret) {
        // TODO: integrate Stripe Elements page if needed
        console.warn('clientSecret received but no Elements page is implemented. Add a Stripe Elements flow.');
        return;
      }
      throw new Error('No redirect URL or clientSecret provided by payment init endpoint');
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
