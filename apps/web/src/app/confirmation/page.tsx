"use client";

export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Note: Removed unused imports - now using QuoteContext only
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';
import { API_BASE_URL } from '@/lib/api/config';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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
      console.log('[confirmation] usePaymentStatus: No clientSecret, setting loading state');
      setLoading(true);
      setError(null);
      setStatus('');
      setMessage('');
      return;
    }
    
    console.log('[confirmation] usePaymentStatus: Starting payment status check with clientSecret:', clientSecret);
    
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
        console.log('[confirmation] usePaymentStatus: Intent type:', isSetupIntent ? 'SetupIntent' : 'PaymentIntent');
        
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
          
          console.log('[confirmation] usePaymentStatus: SetupIntent status:', setupIntent.status);
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
          
          console.log('[confirmation] usePaymentStatus: PaymentIntent status:', paymentIntent.status, paymentIntent); // Debug log
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
    updateQuote,
    isHydrated,
    getQuoteReference,
    resetAllQuotes
  } = useQuote();
  const params = useSearchParams();
  const router = useRouter();
  const refFromUrl = params.get('ref');
  
  // Check for Stripe redirect parameters (payment_intent_client_secret)
  const paymentIntentClientSecret = params.get('payment_intent_client_secret');
  
  const [clientSecret, setClientSecret] = React.useState<string>('');
  const [isFetchingClientSecret, setIsFetchingClientSecret] = React.useState(false);
  const [isPaymentAlreadyCompleted, setIsPaymentAlreadyCompleted] = React.useState(false);
  const [stripeRedirectStatus, setStripeRedirectStatus] = React.useState<'processing' | 'succeeded' | 'failed' | null>(null);
  
  // State to track context clearing process
  const [isClearingContext, setIsClearingContext] = React.useState(false);
  
  // Redirecting indicator state
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  
  // Ref to prevent multiple quote updates
  const hasUpdatedQuoteRef = React.useRef(false);
  
  // Ref to store debounce timeout
  const updateTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  
  // Ref to prevent multiple context clearing attempts
  const hasClearedContextRef = React.useRef(false);
  
  // Unified function to clear context and redirect to home
  const clearContextAndRedirect = React.useCallback(() => {
    if (hasClearedContextRef.current) {
      console.log('[confirmation] Context already cleared, skipping...');
      return;
    }
    
    console.log('[confirmation] Clearing context and redirecting to home...');
    hasClearedContextRef.current = true;
    setIsRedirecting(true);
    setIsClearingContext(true);
    
    try {
      // Clear all quote data from context and IndexedDB
      console.log('[confirmation] Calling resetAllQuotes() to clear context and IndexedDB...');
      resetAllQuotes();
      console.log('[confirmation] ✅ Quote context cleared successfully');
      
      // Redirect to home page using hard replace to prevent back navigation
      setTimeout(() => {
        console.log('[confirmation] Redirecting to home page...');
        if (typeof window !== 'undefined' && window.location) {
          window.location.replace('/');
        } else {
          router.replace('/');
        }
      }, 500); // Small delay to ensure context is cleared
      
    } catch (error) {
      console.error('[confirmation] ❌ Error clearing quote context:', error);
      // Still redirect even if clearing fails
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location) {
          window.location.replace('/');
        } else {
          router.replace('/');
        }
      }, 500);
    } finally {
      setIsClearingContext(false);
    }
  }, [resetAllQuotes, router]);
  
  // Handle Stripe redirects - this is the key fix!
  React.useEffect(() => {
    if (paymentIntentClientSecret && !stripeRedirectStatus) {
      console.log('[confirmation] Detected Stripe redirect with client secret, retrieving payment intent...');
      
      const handleStripeRedirect = async () => {
        try {
          const stripe = await stripePromise;
          if (!stripe) return;
          
          const { paymentIntent } = await stripe.retrievePaymentIntent(paymentIntentClientSecret);
          console.log('[confirmation] Stripe payment intent retrieved:', paymentIntent?.status);
          
          if (paymentIntent) {
            setStripeRedirectStatus(paymentIntent.status as any);
            
            // If payment succeeded, mark as completed
            if (paymentIntent.status === 'succeeded') {
              setIsPaymentAlreadyCompleted(true);
              console.log('[confirmation] Payment already completed via Stripe redirect');
            }
          }
        } catch (error) {
          console.error('[confirmation] Error retrieving Stripe payment intent:', error);
          setStripeRedirectStatus('failed');
        }
      };
      
      handleStripeRedirect();
    }
  }, [paymentIntentClientSecret, stripeRedirectStatus]);
  const { loading, status, message, error } = usePaymentStatus(clientSecret);
  
  // Get payment data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const quoteData = activeQuote; // Use quote data directly instead of job details

  // If no active quote type, try to find a quote with payment data
  const quoteWithPayment = React.useMemo(() => {
    if (activeQuoteType && quotes[activeQuoteType]?.payment) {
      return { type: activeQuoteType, quote: quotes[activeQuoteType] };
    }
    
    // Search through all quotes to find one with payment data
    for (const [type, quote] of Object.entries(quotes)) {
      if (quote?.payment?.paymentIntentId) {
        console.log('[confirmation] Found quote with payment data:', { type, paymentIntentId: quote.payment.paymentIntentId });
        return { type: type as any, quote };
      }
    }
    
    return null;
  }, [activeQuoteType, quotes]);

  // Use the quote with payment data if available
  const effectiveQuote = quoteWithPayment?.quote || activeQuote;
  const effectiveQuoteType = quoteWithPayment?.type || activeQuoteType;

  const payment = effectiveQuote?.payment;
  const paymentIntentId = payment?.paymentIntentId;

  // Determine the effective payment status - prioritize Stripe redirect status
  const effectivePaymentStatus = stripeRedirectStatus || status;
  const isPaymentProcessing = effectivePaymentStatus === 'processing';
  const isPaidInContext = (effectiveQuote?.paymentStatus === 'paid') || (effectiveQuote?.payment?.status === 'paid');
  const hasPaymentSucceeded = (effectivePaymentStatus === 'succeeded') || isPaymentAlreadyCompleted || isPaidInContext;

  // Immediate debugging when component mounts
  console.log('[confirmation] Component mounted with:', {
    isHydrated,
    activeQuoteType,
    activeQuote: !!activeQuote,
    payment: !!payment,
    paymentIntentId,
    quotes: Object.keys(quotes),
    refFromUrl,
    paymentIntentClientSecret: !!paymentIntentClientSecret,
    stripeRedirectStatus
  });

  // Detailed inspection of QuoteContext
  console.log('[confirmation] QuoteContext inspection:', {
    allQuotes: quotes,
    activeQuoteType,
    effectiveQuoteType,
    effectiveQuote: !!effectiveQuote,
    activeQuoteDetails: activeQuote,
    effectiveQuoteDetails: effectiveQuote,
    activeQuotePayment: activeQuote?.payment,
    effectiveQuotePayment: effectiveQuote?.payment,
    activeQuotePaymentIntentId: activeQuote?.payment?.paymentIntentId,
    effectiveQuotePaymentIntentId: effectiveQuote?.payment?.paymentIntentId,
    allPaymentData: Object.values(quotes).map(q => q?.payment).filter(Boolean),
    quoteKeys: Object.keys(quotes),
    quoteValues: Object.values(quotes).map(q => ({
      hasPayment: !!q?.payment,
      paymentIntentId: q?.payment?.paymentIntentId,
      paymentType: q?.payment?.paymentType
    }))
  });

  console.log('[confirmation] Debug data:', {
    activeQuoteType,
    activeQuote,
    payment,
    paymentIntentId,
    clientSecret,
    status,
    loading,
    isPaymentAlreadyCompleted
  });

  // Summary of current state for debugging
  console.log('[confirmation] State summary:', {
    hasPaymentIntentId: !!paymentIntentId,
    hasClientSecret: !!clientSecret,
    currentStatus: effectivePaymentStatus,
    isLoading: loading,
    isPaymentCompleted: isPaymentAlreadyCompleted,
    willShowProcessing: isPaymentProcessing || (loading && !error && !isPaymentAlreadyCompleted)
  });

  // Helper function to update payment data
  const updatePayment = React.useCallback((paymentData: any) => {
    if (effectiveQuoteType) {
      updateQuote(effectiveQuoteType, { payment: { ...effectiveQuote?.payment, ...paymentData } });
    }
  }, [effectiveQuoteType, effectiveQuote?.payment, updateQuote]);

  // Fetch client secret using stored PaymentIntentId
  React.useEffect(() => {
    console.log('[confirmation] useEffect triggered for fetchClientSecret:', { 
      paymentIntentId, 
      effectiveQuoteType,
      isHydrated,
      hasPaymentIntentId: !!paymentIntentId 
    });
    
    // Don't proceed if not hydrated or no payment intent ID
    if (!isHydrated || !paymentIntentId) {
      console.log('[confirmation] Skipping fetch - not hydrated or no paymentIntentId:', { isHydrated, paymentIntentId });
      return;
    }
    
    const fetchClientSecret = async () => {
      console.log('[confirmation] Fetching client secret for paymentIntentId:', paymentIntentId);
      setIsFetchingClientSecret(true);
      try {
        const url = `${API_BASE_URL}/api/v1/checkout/payment-intent?paymentIntentId=${encodeURIComponent(paymentIntentId)}`;
        console.log('[confirmation] Making API call to:', url);
        
        const response = await fetch(url);
        
        console.log('[confirmation] API response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch payment intent: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('[confirmation] Payment intent response:', data); // Debug log
        
        if (data.clientSecret) {
          console.log('[confirmation] Setting client secret');
          setClientSecret(data.clientSecret);
        } else if (data.status === 'succeeded') {
          // Payment already completed, log this information
          console.log('[confirmation] Payment already completed, status:', data.status);
          // Set the status directly since payment is already completed
          setIsPaymentAlreadyCompleted(true);
          // Update the payment status in the context if it's not already set
          if (effectiveQuote?.paymentStatus !== 'paid') {
            updateQuote(effectiveQuoteType!, { paymentStatus: 'paid' });
          }
        } else {
          console.log('[confirmation] No client secret and payment not completed:', data);
        }
      } catch (error) {
        console.error('Error fetching client secret:', error);
      } finally {
        setIsFetchingClientSecret(false);
      }
    };

    if (paymentIntentId) {
      fetchClientSecret();
    }
  }, [paymentIntentId, isHydrated]); // Include isHydrated in dependencies

  // Promote status to Paid locally once payment succeeded (backend may still show Pending)
  // REMOVED: This useEffect was causing data loss by triggering multiple state updates
  // The payment status is already handled in the usePaymentStatus hook above
  
  // If we arrive without a bookingId in context (fresh navigation) but have ref param, hydrate it immediately
  React.useEffect(() => {
    if (refFromUrl && !payment?.bookingId) {
      updatePayment({ bookingId: refFromUrl });
    }
  }, [refFromUrl, payment?.bookingId, updatePayment]);

  // Update quote data when payment succeeds to ensure we have all necessary information
  React.useEffect(() => {
    if (!hasPaymentSucceeded) return;
    if (!effectiveQuote) return;
    
    console.log('[confirmation] Payment succeeded, updating quote data:', { effectivePaymentStatus, effectiveQuote, payment, isPaymentAlreadyCompleted });
    
    // Ensure we have a bookingId for the quote
    if (!payment?.bookingId) {
      const bookingId = refFromUrl || crypto.randomUUID();
      updatePayment({ bookingId });
    }
  }, [hasPaymentSucceeded, effectiveQuote, payment?.bookingId, refFromUrl, updatePayment]);

  // Update payment status in QuoteContext when payment succeeds to mark Journey Stepper as complete
  React.useEffect(() => {
    if (hasPaymentSucceeded && effectiveQuoteType) {
      // Prevent multiple updates that could cause loops
      if (hasUpdatedQuoteRef.current) {
        console.log('[confirmation] Quote already updated, skipping to prevent loop');
        return;
      }
      
      // Additional check: if the quote is already marked as paid, skip update
      if (effectiveQuote?.paymentStatus === 'paid' && effectiveQuote?.payment?.status === 'paid') {
        console.log('[confirmation] Quote already marked as paid, skipping update');
        hasUpdatedQuoteRef.current = true;
        return;
      }
      
      console.log('[confirmation] Payment succeeded, updating payment status to paid');
      console.log('[confirmation] Current quote state:', {
        paymentStatus: effectiveQuote?.paymentStatus,
        paymentStatusDetail: effectiveQuote?.payment?.status,
        hasUpdatedQuoteRef: hasUpdatedQuoteRef.current
      });
      
      // Clear any existing timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      // Debounce the update to prevent rapid successive calls
      updateTimeoutRef.current = setTimeout(() => {
        // Mark that we've updated this quote
        hasUpdatedQuoteRef.current = true;
        
        // Update the quote with payment success status
        updateQuote(effectiveQuoteType, { 
          paymentStatus: 'paid',
          payment: {
            ...effectiveQuote?.payment,
            status: 'paid'
          }
        });
      }, 100); // 100ms debounce
    }
  }, [hasPaymentSucceeded, effectiveQuoteType, effectiveQuote?.payment, updateQuote]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Removed 20s auto-redirect countdown per request

  // Prevent navigating back to confirmation after success: add popstate guard
  React.useEffect(() => {
    if (!hasPaymentSucceeded) return;
    const onPopState = () => {
      if (typeof window !== 'undefined' && window.location) {
        window.location.replace('/');
      }
    };
    // Push a marker state so the immediate back lands here and triggers popstate
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({ fromConfirmation: true }, '', window.location.href);
      } catch {}
      window.addEventListener('popstate', onPopState);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('popstate', onPopState);
      }
    };
  }, [hasPaymentSucceeded]);

  // UI for each payment state
  let mainContent;
  
  // Get payment type from context to show appropriate messages
  const paymentType = payment?.paymentType;
  const isSetupIntent = clientSecret && clientSecret.startsWith('seti_');
  
  // Show loading state while checking payment status
  if (loading && clientSecret && !isPaymentAlreadyCompleted) {
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
  } else if (hasPaymentSucceeded) {
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
            {effectiveQuote ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">Quote Reference</span>
                  <span className="font-mono text-lg font-bold text-primary-700 tracking-wide">
                    {effectiveQuoteType ? getQuoteReference(effectiveQuoteType) || 'N/A' : 'N/A'}
                  </span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-blue-800 text-sm">
                    <strong>Important:</strong> Your payment method has been saved. The full amount of £{effectiveQuote.totalCost?.toFixed(2) || 'TBD'} will be charged automatically 72 hours before your scheduled collection date.
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
                      <TableCell>{effectiveQuote.vanType}</TableCell>
                      <TableCell>{effectiveQuote.pricingTier}</TableCell>
                      <TableCell>{effectiveQuote.driverCount}</TableCell>
                      <TableCell>{effectiveQuote.distanceMiles} miles</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pickup</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {effectiveQuote.origin ? (
                        <>
                          <div>{effectiveQuote.origin.line1}</div>
                          {effectiveQuote.origin.line2 && <div>{effectiveQuote.origin.line2}</div>}
                          <div>{effectiveQuote.origin.city}</div>
                          <div>{effectiveQuote.origin.postcode}</div>
                          {effectiveQuote.origin.country && <div>{effectiveQuote.origin.country}</div>}
                        </>
                      ) : (
                        <div className="text-muted-foreground">Address not specified</div>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Delivery</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {effectiveQuote.destination ? (
                        <>
                          <div>{effectiveQuote.destination.line1}</div>
                          {effectiveQuote.destination.line2 && <div>{effectiveQuote.destination.line2}</div>}
                          <div>{effectiveQuote.destination.city}</div>
                          <div>{effectiveQuote.destination.postcode}</div>
                          {effectiveQuote.destination.country && <div>{effectiveQuote.destination.country}</div>}
                        </>
                      ) : (
                        <div className="text-muted-foreground">Address not specified</div>
                      )}
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
                      {effectiveQuote.items?.map((item: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.heightCm} × {item.widthCm} × {item.lengthCm}</TableCell>
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
                
                {/* Return Home Button */}
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-center space-y-3">
                    <div className="text-green-800 text-sm">
                      <strong>You're all set.</strong>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" hidden={!isRedirecting}></div>
                    </div>
                    <button
                      onClick={clearContextAndRedirect}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Return Home Now
                    </button>
                  </div>
                </div>
                
                {/* Redirecting State */}
                {isRedirecting && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-blue-800 text-sm">
                        <strong>Redirecting to home page...</strong>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Context Clearing Indicator */}
                {isClearingContext && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-blue-800 text-sm">
                        <strong>Preparing fresh start:</strong> Clearing your booking data to prepare for future bookings...
                      </div>
                    </div>
                  </div>
                )}
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
            {effectiveQuote ? (
              <>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">Quote Reference</span>
                  <span className="font-mono text-lg font-bold text-primary-700 tracking-wide">
                    {effectiveQuoteType ? getQuoteReference(effectiveQuoteType) || 'N/A' : 'N/A'}
                  </span>
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
                      <TableCell>{effectiveQuote.vanType}</TableCell>
                      <TableCell>{effectiveQuote.pricingTier}</TableCell>
                      <TableCell>{effectiveQuote.driverCount}</TableCell>
                      <TableCell>{effectiveQuote.distanceMiles} miles</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pickup</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {effectiveQuote.origin ? (
                        <>
                          <div>{effectiveQuote.origin.line1}</div>
                          {effectiveQuote.origin.line2 && <div>{effectiveQuote.origin.line2}</div>}
                          <div>{effectiveQuote.origin.city}</div>
                          <div>{effectiveQuote.origin.postcode}</div>
                          {effectiveQuote.origin.country && <div>{effectiveQuote.origin.country}</div>}
                        </>
                      ) : (
                        <div className="text-muted-foreground">Address not specified</div>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Delivery</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {effectiveQuote.destination ? (
                        <>
                          <div>{effectiveQuote.destination.line1}</div>
                          {effectiveQuote.destination.line2 && <div>{effectiveQuote.destination.line2}</div>}
                          <div>{effectiveQuote.destination.city}</div>
                          <div>{effectiveQuote.destination.postcode}</div>
                          {effectiveQuote.destination.country && <div>{effectiveQuote.destination.country}</div>}
                        </>
                      ) : (
                        <div className="text-muted-foreground">Address not specified</div>
                      )}
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
                      {effectiveQuote.items?.map((item: any, idx: number) => (
                        <TableRow key={idx}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.heightCm} × {item.widthCm} × {item.lengthCm}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-6 flex flex-col items-center gap-2">
                  {(() => {
                    const displayStatus = effectivePaymentStatus === 'succeeded'
                      ? (effectiveQuote.paymentStatus && effectiveQuote.paymentStatus.toLowerCase() !== 'pending' ? effectiveQuote.paymentStatus : 'Paid')
                      : (effectiveQuote.paymentStatus || 'Pending');
                    return (
                      <Badge variant="outline" className="text-lg px-4 py-2">Status: {displayStatus}</Badge>
                    );
                  })()}
                </div>
                <div className="mt-8 text-center text-base text-muted-foreground">
                  <strong>Next steps:</strong> Our team will contact you soon to confirm your booking and arrange logistics. If you have questions, please call us or reply to your confirmation email.
                </div>
                
                {/* Return Home Button */}
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-center space-y-3">
                    <div className="text-green-800 text-sm">
                      <strong>You're all set.</strong>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" hidden={!isRedirecting}></div>
                    </div>
                    <button
                      onClick={clearContextAndRedirect}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Return To Home Page
                    </button>
                  </div>
                </div>
                
                {/* Redirecting State */}
                {isRedirecting && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-blue-800 text-sm">
                        <strong>Redirecting to home page...</strong>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Context Clearing Indicator */}
                {isClearingContext && (
                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <div className="text-blue-800 text-sm">
                        <strong>Preparing fresh start:</strong> Clearing your booking data to prepare for future bookings...
                      </div>
                    </div>
                  </div>
                )}
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
  } else if (isPaymentProcessing) {
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
  } else if (effectivePaymentStatus === 'requires_payment_method') {
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
  } else if (effectivePaymentStatus === 'requires_action') {
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
  } else if (effectivePaymentStatus === 'canceled') {
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
    } else if (!clientSecret && !isFetchingClientSecret && !isHydrated) {
      // Show loading state while hydrating instead of "not found"
      mainContent = (
        <Card className="shadow-xl border-primary-200">
          <CardHeader className="flex flex-col items-center gap-2">
            <Badge variant="outline" className="mb-2 text-lg px-4 py-2">Loading</Badge>
            <CardTitle className="text-2xl font-bold text-primary-700 text-center">Loading your booking details</CardTitle>
            <div className="text-sm text-muted-foreground text-center">Please wait while we load your booking information...</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </CardContent>
        </Card>
      );
    } else if (!clientSecret && !isFetchingClientSecret && isHydrated) {
      // Only show "not found" when we're hydrated and still don't have data
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
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Payment Confirmation</h1>
            
            
            {/* Quote Reference Banner - Subtle display */}
            <div className="mb-6 flex justify-center">
              <QuoteReferenceBanner variant="subtle" />
            </div>
            
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