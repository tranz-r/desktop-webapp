"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function PayContent() {
  const params = useSearchParams();
  const clientSecret = params.get('cs') || '';

  const options = React.useMemo<StripeElementsOptions | undefined>(() => {
    if (!clientSecret) return undefined;
    return {
      clientSecret,
      appearance: { theme: 'stripe' },
    };
  }, [clientSecret]);

  return (
    <div className="min-h-screen bg-background">
      <StreamlinedHeader />
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
                  <CheckoutForm returnUrl={`${window.location.origin}/confirmation`} />
                </Elements>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
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
