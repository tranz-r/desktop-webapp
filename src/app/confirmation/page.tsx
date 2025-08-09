"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function ResultContent() {
  const params = useSearchParams();
  const clientSecret = params.get('payment_intent_client_secret') || '';
  const [status, setStatus] = React.useState<string>('Checking payment…');

  React.useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    if (!clientSecret || !publishableKey) return;

    loadStripe(publishableKey).then(async (stripe) => {
      if (!stripe) return;

      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      
      switch (paymentIntent?.status) {
        case 'succeeded':
          setStatus('Payment succeeded. Thank you!');
          break;
        case 'processing':
          setStatus('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setStatus('Payment failed. Please try again.');
          break;
        default:
          setStatus('Unknown payment status.');
      }
    });
  }, [clientSecret]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Payment Result</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">{status}</p>
            </CardContent>
          </Card>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <ResultContent />
    </Suspense>
  );
}