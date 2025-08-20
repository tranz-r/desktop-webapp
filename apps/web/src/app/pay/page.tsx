"use client";

import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { useBooking } from '@/contexts/BookingContext';
import { useCart } from '@/contexts/CartContext';
import { computeCost } from '@/lib/cost';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function PayContent() {
  const booking = useBooking();
  const { items: cartItems } = useCart();
  const [clientSecret, setClientSecret] = React.useState<string>('');
  const [isLoadingClientSecret, setIsLoadingClientSecret] = React.useState(true);
  const [isCreatingIntent, setIsCreatingIntent] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<'full' | 'deposit' | 'later'>('full');

  const { isHydrated, vehicle, originDestination, pricing, customer, payment } = booking;
  // Pull stable references we actually need (avoid depending on whole booking object)
  const scheduleDateISO = booking.schedule?.dateISO;
  const updatePayment = booking.updatePayment; // assumed stable via context
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const origin = originDestination.origin;
  const destination = originDestination.destination;
  const distanceMiles = originDestination.distanceMiles;
  const pricingTier = pricing.pricingTier;
  const paymentIntentId = payment?.paymentIntentId;

  // Helper: backend enum mapping (Full=0, Deposit=1, Later=2)
  const mapPaymentTypeToEnum = React.useCallback((t: 'full' | 'deposit' | 'later') => {
    switch (t) {
      case 'full': return 0;
      case 'deposit': return 1;
      case 'later': return 2;
    }
  }, []);

  // Fetch client secret using stored PaymentIntentId
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      if (!paymentIntentId) {
        setIsLoadingClientSecret(false);
        return;
      }

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/v1/checkout/payment-intent?paymentIntentId=${encodeURIComponent(paymentIntentId)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch payment intent: ${response.status}`);
        }
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
      } finally {
        setIsLoadingClientSecret(false);
      }
    };

    if (isHydrated && paymentIntentId) {
      fetchClientSecret();
    } else if (isHydrated) {
      setIsLoadingClientSecret(false);
    }
  }, [isHydrated, paymentIntentId]);

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

  const totalCost = React.useMemo(() => {
    if (pricing.pickUpDropOffPrice && pricing.pricingTier) {
      const tier = pricing.pricingTier === 'premium' ? 'premium' : 'standard';
      return pricing.pickUpDropOffPrice[tier]?.customerTotal ?? pricing.totalCost;
    }
    return pricing.totalCost;
  }, [pricing]);

  const depositPercentage = 25; // default deposit %
  const depositAmount = React.useMemo(() => {
    return Math.round((totalCost * (depositPercentage / 100)) * 100) / 100;
  }, [totalCost]);

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

  // Build backend payload and create PaymentIntent for selected option
  const createPaymentForOption = React.useCallback(async (option: 'full' | 'deposit' | 'later') => {
    if (!isHydrated) return;
    if (!vehicle.selectedVan || !origin || !destination) return;
    setIsCreatingIntent(true);
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const payload: any = {
        van: toBackendVanType(vehicle.selectedVan as string),
        driverCount: driverCount ?? 1,
        distanceMiles: Math.max(0, distanceMiles ?? 0),
        origin: {
          line1: origin?.line1 || '',
          postcode: origin?.postcode || '',
          floor: origin?.floor ?? 0,
          hasElevator: Boolean(origin?.hasElevator),
        },
        destination: {
          line1: destination?.line1 || '',
          postcode: destination?.postcode || '',
          floor: destination?.floor ?? 0,
          hasElevator: Boolean(destination?.hasElevator),
        },
        pricingTier: toBackendPricingTier(pricingTier),
        collectionDate: booking.schedule?.dateISO || new Date().toISOString(),
        customer: {
          fullName: customer?.fullName || '',
          email: customer?.email || '',
          phone: customer?.phone || '',
          billingAddress: {
            line1: customer?.billingAddress?.line1 || origin?.line1 || '',
            postcode: customer?.billingAddress?.postcode || origin?.postcode || '',
          },
        },
        cost: {
          total: totalCost || 0,
        },
        paymentType: mapPaymentTypeToEnum(option),
        depositPercentage: option === 'deposit' ? depositPercentage : undefined,
        dueDate: booking.schedule?.dateISO || undefined,
        bookingId: booking.payment?.bookingId || undefined,
      };

      const resp = await fetch(`${apiBaseUrl}/api/v1/checkout/payment-sheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        throw new Error(`Failed to create payment intent: ${resp.status}`);
      }
      const data = await resp.json();

      // Update context and local state
      booking.updatePayment({
        paymentIntentId: data.paymentIntentId,
        paymentType: option,
        depositAmount: option === 'deposit' ? depositAmount : undefined,
        dueDate: booking.schedule?.dateISO,
      });
      setClientSecret(data.paymentIntent);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingIntent(false);
    }
  }, [isHydrated, vehicle.selectedVan, origin, destination, driverCount, distanceMiles, pricingTier, booking.schedule?.dateISO, customer, totalCost, depositAmount, booking, depositPercentage, mapPaymentTypeToEnum]);

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

  // Auto-select "Pay in full" by default and create payment intent
  React.useEffect(() => {
    if (isHydrated && !clientSecret && !isCreatingIntent && selectedOption === 'full') {
      createPaymentForOption('full');
    }
  }, [isHydrated, clientSecret, isCreatingIntent, selectedOption, createPaymentForOption]);

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
              {isLoadingClientSecret && (
                <div className="text-sm text-blue-600">
                  Loading payment details...
                </div>
              )}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={async () => { setSelectedOption('full'); await createPaymentForOption('full'); }}
                    disabled={isCreatingIntent}
                    className={`text-left rounded-lg border-2 p-6 transition-all duration-200 ${
                      selectedOption === 'full' 
                        ? 'border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg' 
                        : 'border-muted hover:border-primary/40 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg text-foreground">Pay in full</div>
                        {selectedOption === 'full' && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">
                          £{(totalCost || 0).toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          One-time payment
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={async () => { setSelectedOption('deposit'); await createPaymentForOption('deposit'); }}
                    disabled={isCreatingIntent}
                    className={`text-left rounded-lg border-2 p-6 transition-all duration-200 ${
                      selectedOption === 'deposit' 
                        ? 'border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg' 
                        : 'border-muted hover:border-primary/40 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg text-foreground">Pay deposit</div>
                        {selectedOption === 'deposit' && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">
                          £{depositAmount.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {depositPercentage}% of £{(totalCost || 0).toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Remaining: £{((totalCost || 0) - depositAmount).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={async () => { setSelectedOption('later'); await createPaymentForOption('later'); }}
                    disabled={isCreatingIntent}
                    className={`text-left rounded-lg border-2 p-6 transition-all duration-200 ${
                      selectedOption === 'later' 
                        ? 'border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg' 
                        : 'border-muted hover:border-primary/40 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-lg text-foreground">Pay later</div>
                        {selectedOption === 'later' && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">
                          £0.00
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Set up payment. We'll charge <b>£{(totalCost || 0).toFixed(2)}</b> 72 hours before collection day.
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
                {isCreatingIntent && (
                  <div className="text-sm text-blue-600">Preparing your payment…</div>
                )}
              </div>
              {!isLoadingClientSecret && !clientSecret && !paymentIntentId && (
                <div className="text-sm text-red-600">
                  Missing payment intent. Please restart checkout.
                </div>
              )}
              {!isLoadingClientSecret && !clientSecret && paymentIntentId && (
                <div className="text-sm text-red-600">
                  Failed to load payment details. Please try again.
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
