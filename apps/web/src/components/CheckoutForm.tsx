"use client";

import React from 'react';
import { PaymentElement, useElements, useStripe, AddressElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TermsContent from '@/components/legal/TermsContent';
import { useBooking } from '@/contexts/BookingContext';
import { API_BASE_URL } from '@/lib/api/config';

type Props = {
  returnUrl: string;
};

export function CheckoutForm({ returnUrl }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const booking = useBooking();
  const [email, setEmail] = React.useState<string>('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [processing, setProcessing] = React.useState(false);
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);
  const [termsOpen, setTermsOpen] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState<string>('');

  const { payment } = booking;
  const paymentIntentId = payment?.paymentIntentId;

  // Fetch client secret using stored PaymentIntentId
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      if (!paymentIntentId) return;

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/checkout/payment-intent?paymentIntentId=${encodeURIComponent(paymentIntentId)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch payment intent: ${response.status}`);
        }
        
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        setMessage('Failed to load payment details. Please try again.');
      }
    };

    if (paymentIntentId) {
      fetchClientSecret();
    }
  }, [paymentIntentId]);

  // Remove the premature payment status check - this was causing the "payment was not successful" message
  // to appear when the Elements first load, before the user has even attempted payment

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setMessage(null);

    // Determine if this is a Setup Intent or Payment Intent based on the client secret
    const isSetupIntent = clientSecret.startsWith('seti_');
    
    if (isSetupIntent) {
      // Handle Setup Intent (for "Pay later" option)
      const { error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: returnUrl,
        },
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message || 'Setup error');
        } else {
          setMessage('An unexpected error occurred during setup.');
        }
      }
    } else {
      // Handle Payment Intent (for "Pay in full" or "Pay deposit" options)
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
    }
    
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Optionally collect/link email */}
      {/* <LinkAuthenticationElement
        onChange={(e) => setEmail(e.value.email)}
        options={{ defaultValues: { email } }}
      /> */}
      {/* Optional billing address */}
      {/* <AddressElement options={{ mode: 'billing' }} /> */}

      <PaymentElement />
      {message && <div className="text-sm text-red-600">{message}</div>}
      <div className="flex items-start gap-2 pt-1">
        <Checkbox id="accept-terms" checked={acceptedTerms} onCheckedChange={(v) => setAcceptedTerms(Boolean(v))} />
        <Label htmlFor="accept-terms" className="text-sm text-muted-foreground leading-relaxed">
          I’ve read and accept the{' '}
          <button
            type="button"
            onClick={() => setTermsOpen(true)}
            className="underline underline-offset-4 text-foreground hover:opacity-80"
          >
            Terms & Conditions
          </button>.
        </Label>
      </div>
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Terms & Conditions</DialogTitle>
          </DialogHeader>
          <div className="h-[70vh] overflow-y-auto pr-2">
            <TermsContent compact />
          </div>
        </DialogContent>
      </Dialog>
      <div className="pt-2 flex justify-end">
        <Button type="submit" disabled={!stripe || processing || !acceptedTerms}>
          {processing ? 'Processing…' : clientSecret.startsWith('seti_') ? 'Set up payment method' : 'Pay now'}
        </Button>
      </div>
    </form>
  );
}

export default CheckoutForm;
