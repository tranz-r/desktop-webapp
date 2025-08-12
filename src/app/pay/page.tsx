"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { useBooking } from '@/contexts/BookingContext';
import { useCart } from '@/contexts/CartContext';
import { computeCost } from '@/lib/cost';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function PayContent() {
  const params = useSearchParams();
  const clientSecret = params.get('cs') || '';
  const booking = useBooking();
  const { items: cartItems } = useCart();

  const { isHydrated, vehicle, originDestination, pricing, customer } = booking;
  // Pull stable references we actually need (avoid depending on whole booking object)
  const scheduleDateISO = booking.schedule?.dateISO;
  const updatePayment = booking.updatePayment; // assumed stable via context
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const origin = originDestination.origin;
  const destination = originDestination.destination;
  const distanceMiles = originDestination.distanceMiles;
  const pricingTier = pricing.pricingTier;

  // Compute cost breakdown for payload CostDto
  const costBreakdown = React.useMemo(() => {
    if (!selectedVan) return undefined;
    return computeCost({
      van: selectedVan as any,
      driverCount: driverCount ?? 1,
      distanceMiles: Math.max(0, distanceMiles ?? 0),
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier: pricingTier as any,
    });
  }, [selectedVan, driverCount, distanceMiles, origin, destination, pricingTier]);

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

  // Ensure we have a bookingId as early as possible (fallback if user bypassed /summary)
  const postedRef = React.useRef(false); // retained for backward compatibility (no longer used to post job)
  // (No job persistence here anymore; moved to /summary)
  // We keep only the bookingId generation safety net.
  React.useEffect(() => {
    if (!booking.isHydrated) return;
    if (booking.payment?.bookingId) return;
    let quoteId: string | undefined;
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      quoteId = crypto.randomUUID();
    } else {
      quoteId = `q-${Date.now()}`;
    }
    updatePayment({ bookingId: quoteId });
  // we only want to run once when hydrated & missing id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking.isHydrated]);

  const options = React.useMemo<StripeElementsOptions | undefined>(() => {
    if (!clientSecret) return undefined;
    return {
      clientSecret,
      appearance: { theme: 'stripe' },
    };
  }, [clientSecret]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
  <StreamlinedHeader hideCart />
      <main className="flex-1">
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              {!clientSecret && (
                <div className="text-sm text-red-600">
                  Missing client secret. Please restart checkout.
                </div>
              )}
              {clientSecret && options && (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    returnUrl={`${window.location.origin}/confirmation${booking.payment?.bookingId ? `?ref=${encodeURIComponent(booking.payment.bookingId)}` : ''}`}
                  />
                </Elements>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PayContent />
    </Suspense>
  );
}
