"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { useCart } from '@/contexts/CartContext';
import { computeCost } from '@/lib/cost';
import { email } from 'zod';

export default function SummaryPage() {
  const router = useRouter();
  const booking = useBooking();
  const { vehicle, originDestination, pricing, schedule, customer, setTotalCost, updatePayment } = booking;
  const { items: cartItems } = useCart();
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const origin = originDestination.origin;
  const destination = originDestination.destination;
  const distanceMiles = originDestination.distanceMiles;
  const pricingTier = pricing.pricingTier;
  const collectionDate = schedule.dateISO;
  const deliveryDate = schedule.deliveryDateISO;
  const [loading, setLoading] = React.useState(false);

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

  function toBackendVanType(v?: string) {
    if (!v) return undefined as unknown as string;
    const map: Record<string, string> = {
      smallVan: 'SmallVan',
      mediumVan: 'MediumVan',
      largeVan: 'LargeVan',
      xlLuton: 'XlLuton',
    };
    return map[v] ?? v;
  }

  function toBackendPricingTier(t?: string) {
    if (!t) return undefined as unknown as string;
    const map: Record<string, string> = {
      eco: 'Eco',
      ecoPlus: 'EcoPlus',
      standard: 'Standard',
      premium: 'Premium',
    };
    return map[t] ?? t;
  }

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // Branch A only: Payment Element via PaymentIntent clientSecret from backend (.NET)
      const targetUrl = process.env.NEXT_PUBLIC_PAYMENT_INIT_URL;
      console.log('Initializing payment with URL:', targetUrl);
      if (!targetUrl) throw new Error('Missing NEXT_PUBLIC_PAYMENT_INIT_URL for payment initialization');

      // Ensure bookingId early
      let quoteId = booking.payment?.bookingId;
      if (!quoteId) {
        quoteId = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `q-${Date.now()}`;
        updatePayment({ bookingId: quoteId });
      }

      // Persist Job BEFORE payment init (if not already persisted)
      if (!booking.payment?.jobDetails) {
        const jobsBaseUrl = process.env.NEXT_PUBLIC_JOBS_BASE_URL;
        if (!jobsBaseUrl) throw new Error('Missing NEXT_PUBLIC_JOBS_BASE_URL for job persistence');

        if (!selectedVan || !origin || !destination || !pricingTier) {
          throw new Error('Missing required booking details for job creation');
        }

        const payloadJob: any = {
          quoteId,
          vanType: toBackendVanType(selectedVan),
          origin: {
            addressLine1: origin.line1 || '',
            addressLine2: origin.line2 || undefined,
            city: origin.city || '',
            county: undefined,
            postCode: origin.postcode || '',
            country: origin.country || undefined,
          },
          destination: {
            addressLine1: destination.line1 || '',
            addressLine2: destination.line2 || undefined,
            city: destination.city || '',
            county: undefined,
            postCode: destination.postcode || '',
            country: destination.country || undefined,
          },
          paymentStatus: 'Pending',
          pricingTier: toBackendPricingTier(pricingTier),
          collectionDate: collectionDate || new Date().toISOString(),
          driverCount: driverCount ?? 1,
          distanceMiles: Math.max(0, Math.round(distanceMiles || 0)),
          cost: cost ? {
            baseVan: Math.round(cost.baseVan),
            distance: cost.distance,
            floor: Math.round(cost.floors),
            elevatorAdjustment: Math.round(cost.elevatorAdjustment),
            driver: Math.round(cost.drivers),
            tierAdjustment: cost.tierAdjustment,
            total: cost.total,
          } : undefined,
          inventoryItems: cartItems.map(ci => ({
            name: ci.name,
            width: Math.round(ci.width),
            height: Math.round(ci.height),
            depth: Math.round(ci.length),
            quantity: ci.quantity,
          })),
          user: customer ? {
            fullName: customer.fullName || '',
            email: customer.email || '',
            phoneNumber: customer.phone || '',
            billingAddress: customer.billingAddress ? {
              addressLine1: customer.billingAddress.line1 || '',
              postCode: customer.billingAddress.postcode || '',
            } : undefined,
          } : undefined,
        };

        console.log('[summary] Persisting job pre-payment', { url: jobsBaseUrl, payloadJob });
        const jobRes = await fetch(jobsBaseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payloadJob),
        });
        if (!jobRes.ok) throw new Error(`Failed to persist job (status ${jobRes.status})`);
        const jobData = await jobRes.json();
        updatePayment({ bookingId: jobData.quoteId || quoteId, jobDetails: jobData });
        quoteId = jobData.quoteId || quoteId;
      }

      let payload = {
        van: selectedVan,
        driverCount,
        distanceMiles: distanceMiles || 0,
        origin,
        destination,
        pricingTier,
        collectionDate,
        deliveryDate,
        quoteId: booking.payment?.bookingId, // allow backend to embed metadata if supported
        customer: {
          fullName: customer?.fullName,
          email: customer?.email,
          phone: customer?.phone,
          billingAddress: customer?.billingAddress,
        },
        cost: cost
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
        // Navigate to /pay including booking reference for continuity
        const ref = booking.payment?.bookingId ? `&ref=${encodeURIComponent(booking.payment.bookingId)}` : '';
        router.push(`/pay?cs=${encodeURIComponent(data.paymentIntent)}${ref}`);
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
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
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
                  <div className="flex items-center justify-between"><span className="text-gray-600">Distance</span><span className="font-semibold">{(distanceMiles || 0).toFixed(1)} miles</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Collection</span><span className="font-semibold">{formatDateShort(collectionDate)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Delivery</span><span className="font-semibold">{formatDateShort(collectionDate)}</span></div>
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
      </main>
      <Footer />
    </div>
  );
}
