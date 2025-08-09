"use client";

import React from 'react';
import { PaymentElement, useElements, useStripe, AddressElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

type Props = {
  returnUrl: string;
};

export function CheckoutForm({ returnUrl }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) return;
    const cs = new URLSearchParams(window.location.search).get('payment_intent_client_secret');
    if (!cs) return;
    stripe.retrievePaymentIntent(cs).then(({ paymentIntent }) => {
      if (!paymentIntent) return;
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded.');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
      }
    });
  }, [stripe]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
        receipt_email: email || undefined,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message || 'Payment error');
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Optionally collect/link email */}
      <LinkAuthenticationElement
        onChange={(e) => setEmail(e.value.email)}
        options={{ defaultValues: { email } }}
      />
      {/* Optional billing address */}
      <AddressElement options={{ mode: 'billing' }} />
      <PaymentElement />
      {message && <div className="text-sm text-red-600">{message}</div>}
      <div className="pt-2 flex justify-end">
        <Button type="submit" disabled={!stripe || processing}>
          {processing ? 'Processing…' : 'Pay now'}
        </Button>
      </div>
    </form>
  );
}

export default CheckoutForm;
