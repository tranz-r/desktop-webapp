"use client";

export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuoteSession } from '@/hooks/useQuoteSession';
import { API_BASE_URL } from '@/lib/api/config';

// Hook placed at module scope per React rules
function usePaymentStatus(clientSecret: string | null) {
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState<string>('');
  const [message, setMessage] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    
    // Don't start checking until we have a client secret
    if (!clientSecret) {
      setLoading(true);
      setError(null);
      setStatus('');
      setMessage('');
      return;
    }
    
    (async () => {
      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
      if (!publishableKey) {
        if (!cancelled) setError('Stripe key not configured.');
        if (!cancelled) setLoading(false);
        return;
      }
      try {
        const stripe = await loadStripe(publishableKey);
        if (!stripe) {
          if (!cancelled) setError('Failed to initialize Stripe.');
          if (!cancelled) setLoading(false);
          return;
        }

        // Determine if this is a Setup Intent or Payment Intent based on the client secret
        const isSetupIntent = clientSecret.startsWith('seti_');
        
        if (isSetupIntent) {
          // Handle Setup Intent (for "Pay later" option)
          const { setupIntent, error: siError } = await stripe.retrieveSetupIntent(clientSecret);
          if (siError) {
            if (!cancelled) setError(siError.message || 'Failed to retrieve setup intent.');
            if (!cancelled) setLoading(false);
            return;
          }
          if (!setupIntent) {
            if (!cancelled) setError('No setup intent found.');
            if (!cancelled) setLoading(false);
            return;
          }
          if (cancelled) return;
          
          setStatus(setupIntent.status);
          switch (setupIntent.status) {
            case 'succeeded':
              setMessage('Payment method setup succeeded. Your payment method has been saved for future use.');
              break;
            case 'processing':
              setMessage('Your payment method setup is processing.');
              break;
            case 'requires_payment_method':
              setMessage('Setup failed. Please try again with a different method.');
              break;
            case 'requires_action':
              setMessage('Additional authentication required. Please complete the steps.');
              break;
            case 'canceled':
              setMessage('Setup was canceled. You can attempt again.');
              break;
            default:
              setMessage('Unable to determine setup status.');
          }
        } else {
          // Handle Payment Intent (for "Pay in full" or "Pay deposit" options)
          const { paymentIntent, error: piError } = await stripe.retrievePaymentIntent(clientSecret);
          if (piError) {
            if (!cancelled) setError(piError.message || 'Failed to retrieve payment intent.');
            if (!cancelled) setLoading(false);
            return;
          }
          if (!paymentIntent) {
            if (!cancelled) setError('No payment intent found.');
            if (!cancelled) setLoading(false);
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
        }
        
        // Clear any previous errors when successful
        if (!cancelled) setError(null);
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
  const { 
    activeQuoteType, 
    quotes, 
    updateQuote 
  } = useQuote();
  const params = useSearchParams();
  const refFromUrl = params.get('ref');
  const [clientSecret, setClientSecret] = React.useState<string>('');
  const [isFetchingClientSecret, setIsFetchingClientSecret] = React.useState(false);
  const { loading, status, message, error } = usePaymentStatus(clientSecret);
  
  // Get payment data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const job = activeQuote?.payment?.jobDetails;
  const [jobFetchAttempts, setJobFetchAttempts] = React.useState(0);
  const quoteSession = useQuoteSession<any>({ baseUrl: API_BASE_URL });

  const payment = activeQuote?.payment;
  const paymentIntentId = payment?.paymentIntentId;

  // Helper function to update payment data
  const updatePayment = (paymentData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { payment: { ...activeQuote?.payment, ...paymentData } });
    }
  };

  // Fetch client secret using stored PaymentIntentId
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      if (!paymentIntentId) return;

      setIsFetchingClientSecret(true);
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
        setIsFetchingClientSecret(false);
      }
    };

    if (paymentIntentId) {
      fetchClientSecret();
    }
  }, [paymentIntentId]);

  // Promote status to Paid locally once payment succeeded (backend may still show Pending)
  React.useEffect(() => {
    if (status === 'succeeded' && job && job.paymentStatus && job.paymentStatus.toLowerCase() === 'pending') {
      updatePayment({ jobDetails: { ...job, paymentStatus: 'Paid' } });
    }
    // Snapshot final state after success
    if (status === 'succeeded') {
      try {
        quoteSession.setData((prev: any) => ({
          ...(prev ?? {}),
          bookingFinalizedAt: new Date().toISOString(),
          payment: payment,
        }));
        void quoteSession.flush();
      } catch {}
    }
  }, [status, job, payment, updatePayment, quoteSession]);

  // If we arrive without a bookingId in context (fresh navigation) but have ref param, hydrate it immediately
  React.useEffect(() => {
    if (refFromUrl && !payment?.bookingId) {
      updatePayment({ bookingId: refFromUrl });
    }
  }, [refFromUrl, payment?.bookingId, updatePayment]);

  // Refetch job details while payment succeeded but job not yet in context (race condition protection)
  React.useEffect(() => {
    if (status !== 'succeeded') return;
    if (payment?.jobDetails) return; // already have it
    if (jobFetchAttempts > 10) return; // stop after retries
    const quoteId = payment?.bookingId;
    if (!quoteId) return;
    const baseUrl = process.env.NEXT_PUBLIC_JOBS_BASE_URL;
    if (!baseUrl) return;
    const controller = new AbortController();
    fetch(`${baseUrl}?quoteId=${encodeURIComponent(quoteId)}`, { signal: controller.signal })
      .then(r => r.ok ? r.json() : Promise.reject(new Error('Failed to fetch job details')))
      .then(j => {
        const jobObj = Array.isArray(j) ? j[0] : j;
        if (jobObj && jobObj.quoteId) {
          updatePayment?.({ jobDetails: jobObj, bookingId: jobObj.quoteId });
        } else if (jobObj) {
          updatePayment?.({ jobDetails: jobObj });
        }
      })
      .catch(e => console.warn('[confirmation] job fetch attempt failed', jobFetchAttempts, e))
      .finally(() => {
        if (!payment?.jobDetails) {
          setTimeout(() => setJobFetchAttempts(a => a + 1), 1000);
        }
      });
    return () => controller.abort();
  }, [status, payment, jobFetchAttempts, updatePayment]);

  // UI for each payment state
  let mainContent;
  
  // Get payment type from context to show appropriate messages
  const paymentType = payment?.paymentType;
  const isSetupIntent = clientSecret && clientSecret.startsWith('seti_');
  
  // Show loading state while checking payment status
  if (loading && clientSecret) {
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Checking Payment</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">Verifying your payment status</CardTitle>
          <div className="text-sm text-muted-foreground text-center">Please wait while we confirm your payment details...</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="text-center text-base text-muted-foreground">
            <strong>Please wait:</strong> We're checking your payment status with our secure payment processor.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'succeeded') {
    if (isSetupIntent || paymentType === 'later') {
      // Setup Intent succeeded (Pay later option)
      mainContent = (
        <Card className="shadow-xl border-primary-200">
          <CardHeader className="flex flex-col items-center gap-2">
            <Badge variant="default" className="mb-2 text-lg px-4 py-2">Payment Method Saved</Badge>
            <CardTitle className="text-2xl font-bold text-primary-700 text-center">Thank you for setting up your payment method!</CardTitle>
            <div className="text-sm text-muted-foreground text-center">Your payment method has been saved securely. We'll charge the full amount 72 hours before your collection date.</div>
          </CardHeader>
          <CardContent className="space-y-6">
            {job ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">Reference</span>
                  <span className="font-mono text-lg font-bold text-primary-700 tracking-wide">{job.quoteId}</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-800 text-sm">
                    <strong>Important:</strong> Your payment method has been saved. The full amount of £{job.cost.total?.toFixed(2) || 'TBD'} will be charged automatically 72 hours before your scheduled collection date.
                  </div>
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
                  <Badge variant="outline" className="text-lg px-4 py-2">Status: Payment Method Saved</Badge>
                  <div className="text-sm text-muted-foreground text-center">
                    Payment will be processed automatically before collection
                  </div>
                </div>
                <div className="mt-8 text-center text-base text-muted-foreground">
                  <strong>Next steps:</strong> Our team will contact you soon to confirm your booking and arrange logistics. Your payment method has been saved and will be charged automatically 72 hours before your collection date.
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground animate-pulse">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-muted-foreground rounded-full animate-pulse"></div>
                </div>
                <div>Loading booking details...</div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    } else {
      // Payment Intent succeeded (Pay in full or Pay deposit options)
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
                  {(() => {
                    const displayStatus = status === 'succeeded'
                      ? (job.paymentStatus && job.paymentStatus.toLowerCase() !== 'pending' ? job.paymentStatus : 'Paid')
                      : (job.paymentStatus || 'Pending');
                    return (
                      <Badge variant="outline" className="text-lg px-4 py-2">Status: {displayStatus}</Badge>
                    );
                  })()}
                  {job.receiptUrl && (
                    <a href={job.receiptUrl} target="_blank" rel="noopener" className="text-primary-700 underline text-sm">Download Receipt</a>
                  )}
                </div>
                <div className="mt-8 text-center text-base text-muted-foreground">
                  <strong>Next steps:</strong> Our team will contact you soon to confirm your booking and arrange logistics. If you have questions, please call us or reply to your confirmation email.
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground animate-pulse">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-4 h-4 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-muted-foreground rounded-full animate-pulse"></div>
                  <div className="w-4 h-4 bg-muted-foreground rounded-full animate-pulse"></div>
                </div>
                <div>Loading booking details...</div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }
  } else if (status === 'processing' || (loading && !error)) {
    const isSetupIntent = clientSecret && clientSecret.startsWith('seti_');
    const title = isSetupIntent ? 'Setting up payment method' : 'Your payment is being processed';
    const description = isSetupIntent 
      ? 'Please wait while we save your payment method securely. You will receive a confirmation email shortly.'
      : 'Please wait while we confirm your booking. You will receive a confirmation email shortly.';
    
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">
            {isSetupIntent ? 'Setting Up' : 'Payment Processing'}
          </Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">{title}</CardTitle>
          <div className="text-sm text-muted-foreground text-center">{description}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> If you do not receive confirmation within a few minutes, please contact support.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'requires_payment_method') {
    const isSetupIntent = clientSecret && clientSecret.startsWith('seti_');
    const title = isSetupIntent ? 'Payment method setup failed' : 'Payment failed';
    const description = isSetupIntent 
      ? 'We were unable to save your payment method. Please try again with a different method.'
      : 'We were unable to process your payment. Please try again with a different method.';
    
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="destructive" className="mb-2 text-lg px-4 py-2">
            {isSetupIntent ? 'Setup Failed' : 'Payment Failed'}
          </Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">{title}</CardTitle>
          <div className="text-sm text-muted-foreground text-center">{description}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Return to the payment page to retry, or contact support for assistance.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'requires_action') {
    const isSetupIntent = clientSecret && clientSecret.startsWith('seti_');
    const title = isSetupIntent ? 'Payment method setup requires authentication' : 'Payment requires authentication';
    const description = isSetupIntent 
      ? 'Please return to the payment page to complete 3D Secure or other required steps for setting up your payment method.'
      : 'Please return to the payment page to complete 3D Secure or other required steps.';
    
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Action Required</Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">{title}</CardTitle>
          <div className="text-sm text-muted-foreground text-center">{description}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Go back and retry to finish authentication.
          </div>
        </CardContent>
      </Card>
    );
  } else if (status === 'canceled') {
    const isSetupIntent = clientSecret && clientSecret.startsWith('seti_');
    const title = isSetupIntent ? 'Payment method setup was canceled' : 'Payment was canceled';
    const description = isSetupIntent 
      ? 'You canceled the payment method setup or it expired. You can try again.'
      : 'You canceled the payment or it expired. You can try again.';
    
    mainContent = (
      <Card className="shadow-xl border-primary-200">
        <CardHeader className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="mb-2 text-lg px-4 py-2">
            {isSetupIntent ? 'Setup Canceled' : 'Payment Canceled'}
          </Badge>
          <CardTitle className="text-2xl font-bold text-primary-700 text-center">{title}</CardTitle>
          <div className="text-sm text-muted-foreground text-center">{description}</div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-base text-muted-foreground">
            <strong>Next steps:</strong> Return to the payment page to start again.
          </div>
        </CardContent>
      </Card>
    );
  } else {
    // Only show error state if we're not loading and actually have an error
    if (error && !loading) {
      mainContent = (
        <Card className="shadow-xl border-primary-200">
          <CardHeader className="flex flex-col items-center gap-2">
            <Badge variant="destructive" className="mb-2 text-lg px-4 py-2">Error</Badge>
            <CardTitle className="text-2xl font-bold text-primary-700 text-center">Unable to confirm payment</CardTitle>
            <div className="text-sm text-muted-foreground text-center">We encountered an issue while checking your payment status.</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-base text-muted-foreground">
              <strong>Next steps:</strong> Contact support for assistance.
            </div>
            <div className="text-sm text-red-600 break-all text-center">Error: {error}</div>
          </CardContent>
        </Card>
      );
    } else if (!clientSecret && !isFetchingClientSecret) {
      // Show message when no client secret is available
      mainContent = (
        <Card className="shadow-xl border-primary-200">
          <CardHeader className="flex flex-col items-center gap-2">
            <Badge variant="outline" className="mb-2 text-lg px-4 py-2">No Payment Found</Badge>
            <CardTitle className="text-2xl font-bold text-primary-700 text-center">Payment information not found</CardTitle>
            <div className="text-sm text-muted-foreground text-center">We couldn't find the payment details for this booking.</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center text-base text-muted-foreground">
              <strong>Next steps:</strong> Please return to the payment page or contact support for assistance.
            </div>
          </CardContent>
        </Card>
      );
    } else {
      // Fallback loading state
      mainContent = (
        <Card className="shadow-xl border-primary-200">
          <CardHeader className="flex flex-col items-center gap-2">
            <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Loading</Badge>
            <CardTitle className="text-2xl font-bold text-primary-700 text-center">Preparing your confirmation</CardTitle>
            <div className="text-sm text-muted-foreground text-center">Please wait while we load your booking details...</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </CardContent>
        </Card>
      );
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
  <StreamlinedHeader hideCart />
      <main className="flex-1">
        <section className="pt-32 lg:pt-40 pb-10 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            {isFetchingClientSecret ? (
              <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-lg text-muted-foreground">Loading payment details...</p>
                </div>
              </div>
            ) : (
              mainContent
            )}
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