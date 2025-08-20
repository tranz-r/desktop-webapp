"use client";

import React, { Suspense } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBooking } from '@/contexts/BookingContext';

function ResultContent() {
  const booking = useBooking();
  const [clientSecret, setClientSecret] = React.useState<string>('');
  const [isLoadingClientSecret, setIsLoadingClientSecret] = React.useState(true);
  const [status, setStatus] = React.useState<string>('Loading payment details…');

  const { isHydrated, payment } = booking;
  const paymentIntentId = payment?.paymentIntentId;

  // Fetch client secret using stored PaymentIntentId
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      if (!paymentIntentId) {
        setIsLoadingClientSecret(false);
        setStatus('Payment intent not found. Please restart checkout.');
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
        setStatus('Failed to load payment details. Please try again.');
      } finally {
        setIsLoadingClientSecret(false);
      }
    };

    if (isHydrated && paymentIntentId) {
      fetchClientSecret();
    } else if (isHydrated) {
      setIsLoadingClientSecret(false);
      setStatus('Payment intent not found. Please restart checkout.');
    }
  }, [isHydrated, paymentIntentId]);

  // Check payment status once client secret is available
  React.useEffect(() => {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    if (!clientSecret || !publishableKey) return;

    setStatus('Checking payment status…');

    loadStripe(publishableKey).then(async (stripe) => {
      if (!stripe) return;

      try {
        // Determine if this is a Setup Intent or Payment Intent based on the client secret
        const isSetupIntent = clientSecret.startsWith('seti_');
        
        if (isSetupIntent) {
          // Handle Setup Intent (for "Pay later" option)
          const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret);

          switch (setupIntent?.status) {
            case 'succeeded':
              setStatus('Payment method setup succeeded. Your payment method has been saved for future use.');
              break;
            case 'processing':
              setStatus('Your payment method setup is processing.');
              break;
            case 'requires_payment_method':
              setStatus('Setup failed. Please try again.');
              break;
            default:
              setStatus('Unknown setup status.');
          }
        } else {
          // Handle Payment Intent (for "Pay in full" or "Pay deposit" options)
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
        }
      } catch (error) {
        console.error('Error retrieving payment intent:', error);
        setStatus('Error checking payment status. Please contact support.');
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
              {isLoadingClientSecret && (
                <div className="text-sm text-blue-600">
                  Loading payment details...
                </div>
              )}
              {!isLoadingClientSecret && !clientSecret && !paymentIntentId && (
                <div className="text-sm text-red-600">
                  Payment intent not found. Please restart checkout.
                </div>
              )}
              {!isLoadingClientSecret && !clientSecret && paymentIntentId && (
                <div className="text-sm text-red-600">
                  Failed to load payment details. Please try again.
                </div>
              )}
              {clientSecret && (
                <p className="text-sm text-gray-700">{status}</p>
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

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <ResultContent />
    </Suspense>
  );
}
