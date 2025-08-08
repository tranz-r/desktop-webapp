"use client";

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/contexts/BookingContext';
import { useCart } from '@/contexts/CartContext';
import { saveLastBooking, generateReference } from '@/lib/booking-persist';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

async function createPaymentIntent(amountPence: number) {
  const res = await fetch('/api/payments/create-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountPence, currency: 'gbp' }),
  });
  return res.json();
}

function InnerPaymentForm({ amountPence }: { amountPence: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState<string | null>(null);
  const booking = useBooking();
  const cart = useCart();

  React.useEffect(() => {
    (async () => {
      const res = await createPaymentIntent(amountPence);
      if (res?.clientSecret) setClientSecret(res.clientSecret);
    })();
  }, [amountPence]);

  const onSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;
    setLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/confirmation` },
      redirect: 'if_required',
    });
    setLoading(false);
    if (result.error) {
      alert(result.error.message);
    } else {
      const reference = generateReference();
      saveLastBooking({
        reference,
        createdAtISO: new Date().toISOString(),
        booking,
        cart: cart.items,
        amountPence,
        paymentIntentId: (result.paymentIntent && result.paymentIntent.id) || null,
      });
      window.location.assign('/confirmation');
    }
  };

  if (!clientSecret) return <div className="text-sm text-gray-600">Initializing payment...</div>;

  return (
    <div className="space-y-4">
      <PaymentElement />
      <Button onClick={onSubmit} disabled={!stripe || loading}>{loading ? 'Processing...' : 'Pay now'}</Button>
    </div>
  );
}

export default function PaymentForm({ amountPence }: { amountPence: number }) {
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    return <div className="text-sm text-red-600">Stripe not configured</div>;
  }
  return (
    <Elements stripe={stripePromise} options={{ appearance: { theme: 'stripe' } }}>
      <InnerPaymentForm amountPence={amountPence} />
    </Elements>
  );
}
