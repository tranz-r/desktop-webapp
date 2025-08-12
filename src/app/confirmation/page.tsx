"use client";

import React, { Suspense } from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Hook placed at module scope per React rules
function usePaymentIntentStatus(clientSecret: string | null) {
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
      if (!clientSecret) {
        setError('Missing client secret in URL.');
        setLoading(false);
        return;
      }
      if (!publishableKey) {
        setError('Stripe key not configured.');
        setLoading(false);
        return;
      }
      try {
        const stripe = await loadStripe(publishableKey);
        if (!stripe) {
          if (!cancelled) setError('Failed to initialize Stripe.');
          return;
        }
        const { paymentIntent, error: piError } = await stripe.retrievePaymentIntent(clientSecret);
        if (piError) {
          if (!cancelled) setError(piError.message || 'Failed to retrieve payment intent.');
          return;
        }
        if (!paymentIntent) {
          if (!cancelled) setError('No payment intent found.');
          return;
        }
        if (cancelled) return;
        setStatus(paymentIntent.status);
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded. Thank you!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Payment failed. Please try again with a different method.');
            break;
          case 'requires_action':
            setMessage('Additional authentication required. Please complete the steps.');
            break;
          case 'canceled':
            setMessage('Payment was canceled. You can attempt again.');
            break;
          default:
            setMessage('Unable to determine payment status.');
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Unexpected error retrieving payment status');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [clientSecret]);

  return { loading, status, message, error };
}

function ConfirmationContent() {
  const booking = useBooking();
  const params = useSearchParams();
  const clientSecret = params.get('payment_intent_client_secret') || params.get('cs');
  const refFromUrl = params.get('ref');
  const { loading, status, message, error } = usePaymentIntentStatus(clientSecret);
  const job = booking.payment?.jobDetails;
  const [jobFetchAttempts, setJobFetchAttempts] = React.useState(0);

  // If we arrive without a bookingId in context (fresh navigation) but have ref param, hydrate it immediately
  React.useEffect(() => {
    if (refFromUrl && !booking.payment?.bookingId) {
      booking.updatePayment({ bookingId: refFromUrl });
    }
  }, [refFromUrl, booking]);

  // Refetch job details while payment succeeded but job not yet in context (race condition protection)
  React.useEffect(() => {
    if (status !== 'succeeded') return;
    if (booking.payment?.jobDetails) return; // already have it
    if (jobFetchAttempts > 10) return; // stop after retries
    const quoteId = booking.payment?.bookingId;
    if (!quoteId) return;
    const baseUrl = process.env.NEXT_PUBLIC_JOBS_BASE_URL;
    if (!baseUrl) return;
    const controller = new AbortController();
    fetch(`${baseUrl}?quoteId=${encodeURIComponent(quoteId)}`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to fetch job details')))
      .then(j => {
        const jobObj = Array.isArray(j) ? j[0] : j;
        if (jobObj && jobObj.quoteId) {
          booking.updatePayment?.({ jobDetails: jobObj, bookingId: jobObj.quoteId });
        } else if (jobObj) {
          booking.updatePayment?.({ jobDetails: jobObj });
        }
      })
      .catch(e => console.warn('[confirmation] job fetch attempt failed', jobFetchAttempts, e))
      .finally(() => {
        if (!booking.payment?.jobDetails) {
          setTimeout(() => setJobFetchAttempts(a => a + 1), 1000);
        }
      });
    return () => controller.abort();
  }, [status, booking, jobFetchAttempts]);
  // UI for each payment state
  let mainContent;
  if (status === 'succeeded') {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="default" className="mb-2 text-lg px-4 py-2">Booking Confirmed</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Thank you for your payment!</CardTitle>
          <div className="text-sm text-muted-foreground text-center">Your booking is complete. Below are your details and next steps.</div>
        </CardHeader>
        <CardContent className="space-y-6">
          {job ? (
            <>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-muted-foreground">Reference</span>
                <span className="font-mono text-lg font-bold text-primary-700 tracking-wide">{job.quoteId}</span>
              </div>
              <Table className="mb-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Van</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Drivers</TableHead>
                    <TableHead>Distance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{job.vanType}</TableCell>
                    <TableCell>{job.pricingTier}</TableCell>
                    <TableCell>{job.driverCount}</TableCell>
                    <TableCell>{job.distanceMiles} miles</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Pickup</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div>{job.origin.addressLine1}</div>
                    {job.origin.addressLine2 && <div>{job.origin.addressLine2}</div>}
                    <div>{job.origin.city}</div>
                    <div>{job.origin.postCode}</div>
                    {job.origin.country && <div>{job.origin.country}</div>}
                  </CardContent>
                </Card>
                <Card className="bg-muted/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Delivery</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div>{job.destination.addressLine1}</div>
                    {job.destination.addressLine2 && <div>{job.destination.addressLine2}</div>}
                    <div>{job.destination.city}</div>
                    <div>{job.destination.postCode}</div>
                    {job.destination.country && <div>{job.destination.country}</div>}
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Dimensions (cm)</TableHead>
                      <TableHead>Qty</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {job.inventoryItems?.map((item: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.height} × {item.width} × {item.depth}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-6 flex flex-col items-center gap-2">
                <Badge variant="outline" className="text-lg px-4 py-2">Status: {job.paymentStatus}</Badge>
                {job.receiptUrl && (
                  <a href={job.receiptUrl} target="_blank" rel="noopener" className="text-primary-700 underline text-sm">Download Receipt</a>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground animate-pulse">
              <div className="flex flex-col items-center gap-1">
                <span className="text-xs">Reference</span>
                <span className="font-mono text-lg font-bold text-primary-700 tracking-wide">
                  {booking.payment?.bookingId || refFromUrl || '—'}
                </span>
              </div>
              <div>
                Payment succeeded. Finalizing your booking details… (attempt {jobFetchAttempts + 1}/11)
              </div>
            </div>
          )}
          <div className="mt-8 text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Our team will contact you soon to confirm your booking and arrange logistics. If you have questions, please call us or reply to your confirmation email.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'processing' || (loading && !error)) {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Payment Processing</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Your payment is being processed</CardTitle>
          <div className="text-sm text-muted-foreground text-center">Please wait while we confirm your booking. You will receive a confirmation email shortly.</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> If you do not receive confirmation within a few minutes, please contact support.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'requires_payment_method') {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="destructive" className="mb-2 text-lg px-4 py-2">Payment Failed</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Payment failed</CardTitle>
          <div className="text-sm text-muted-foreground text-center">Your payment could not be completed. Please try again or use a different payment method.</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Return to the payment page to retry, or contact support for assistance.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'requires_action') {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Action Required</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Further authentication needed</CardTitle>
          <div className="text-sm text-muted-foreground text-center">Please return to the payment page to complete 3D Secure or other required steps.</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Go back and retry payment to finish authentication.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'canceled') {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Payment Canceled</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Payment was canceled</CardTitle>
          <div className="text-sm text-muted-foreground text-center">You canceled the payment or it expired. You can try again.</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Return to the payment page to start again.
          </div>
        </CardContent>
      </Card>
    );
  } else {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Unknown Status</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Unable to confirm payment</CardTitle>
          <div className="text-sm text-muted-foreground text-center">{message || 'We could not determine your payment status.'}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Contact support for assistance.
          </div>
          {error && <div className="text-sm text-red-600 break-all">Error: {error}</div>}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-10 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            {mainContent}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}