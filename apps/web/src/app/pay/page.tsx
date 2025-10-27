"use client";

export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import CheckoutForm from '@/components/CheckoutForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { useQuote } from '@/contexts/QuoteContext';
import Spinner from '@/components/ui/spinner';

import { API_BASE_URL } from '@/lib/api/config';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

function PayPageContent() {
  const { activeQuoteType, quotes, updateQuote, isHydrated, getCurrentEtag, resetAllQuotes } = useQuote();
  const router = useRouter();
  
  // Get data from active quote and shared data
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const cartItems = activeQuote?.items || [];
  const customer = activeQuote?.customer;
  const payment = activeQuote?.payment;
  
  // Get origin and destination from active quote
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;
  
  // Helper function to update payment data
  const updatePayment = (paymentData: Partial<typeof payment>) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { payment: { ...payment, ...paymentData } });
    }
  };
  
  const [clientSecret, setClientSecret] = React.useState<string>('');
  const [isLoadingClientSecret, setIsLoadingClientSecret] = React.useState(true);
  const [isCreatingIntent, setIsCreatingIntent] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<'full' | 'deposit' | 'later'>('full');
  const [paymentStatus, setPaymentStatus] = React.useState<string>('');
  const [isPaymentCompleted, setIsPaymentCompleted] = React.useState(false);
  const [isCheckingPaymentStatus, setIsCheckingPaymentStatus] = React.useState(false);
  const [initDelayDone, setInitDelayDone] = React.useState(false);
  const [hasAttemptedPaymentInit, setHasAttemptedPaymentInit] = React.useState(false);

  // Grace delay to avoid flashing errors while initializing client/Stripe
  React.useEffect(() => {
    const t = setTimeout(() => setInitDelayDone(true), 700);
    return () => clearTimeout(t);
  }, []);

  // Pull stable references we actually need (avoid depending on whole state object)
  const scheduleDateISO = activeQuote?.collectionDate;
  const selectedVan = activeQuote?.vanType;
  const driverCount = activeQuote?.driverCount || 2;
  const pricingTier = activeQuote?.pricingTier;
  const paymentIntentId = payment?.paymentIntentId;

  // Helper: backend enum mapping (Full=0, Deposit=1, Later=2)
  const mapPaymentTypeToEnum = React.useCallback((t: 'full' | 'deposit' | 'later') => {
    switch (t) {
      case 'full': return 0;
      case 'deposit': return 1;
      case 'later': return 2;
    }
  }, []);

  // Check payment status to prevent duplicate payments
  React.useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!paymentIntentId || !isHydrated) return;
      
      setIsCheckingPaymentStatus(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/checkout/payment-intent?paymentIntentId=${encodeURIComponent(paymentIntentId)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch payment intent: ${response.status}`);
        }
        
        const data = await response.json();
        const clientSecret = data.clientSecret;
        
        // Check if this is a completed payment/setup
        const isSetupIntent = clientSecret.startsWith('seti_');
        
        if (isSetupIntent) {
          // For Setup Intents, check status via Stripe
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
          if (stripe) {
            const { setupIntent } = await stripe.retrieveSetupIntent(clientSecret);
            if (setupIntent && setupIntent.status === 'succeeded') {
              setPaymentStatus('Payment method setup completed');
              setIsPaymentCompleted(true);
              return;
            }
          }
        } else {
          // For Payment Intents, check status via Stripe
          const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
          if (stripe) {
            const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
            if (paymentIntent && paymentIntent.status === 'succeeded') {
              setPaymentStatus('Payment completed');
              setIsPaymentCompleted(true);
              return;
            }
          }
        }
        
        // If not completed, set the client secret for payment
        setClientSecret(clientSecret);
      } catch (error) {
        console.error('Error checking payment status:', error);
        setPaymentStatus('Error checking payment status');
      } finally {
        setIsCheckingPaymentStatus(false);
        setIsLoadingClientSecret(false);
      }
    };

    if (isHydrated && paymentIntentId) {
      setHasAttemptedPaymentInit(true);
      checkPaymentStatus();
    } else if (isHydrated) {
      setIsLoadingClientSecret(false);
    }
  }, [isHydrated, paymentIntentId]);

  // Fetch client secret using stored PaymentIntentId (only if not completed)
  React.useEffect(() => {
    const fetchClientSecret = async () => {
      if (!paymentIntentId || isPaymentCompleted) {
        setIsLoadingClientSecret(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/checkout/payment-intent?paymentIntentId=${encodeURIComponent(paymentIntentId)}`);
        
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

    if (isHydrated && paymentIntentId && !isPaymentCompleted) {
      setHasAttemptedPaymentInit(true);
      fetchClientSecret();
    } else if (isHydrated) {
      setIsLoadingClientSecret(false);
    }
  }, [isHydrated, paymentIntentId, isPaymentCompleted]);

  // Check if payment is already completed
  React.useEffect(() => {
    if (payment?.status === 'paid') {
      setIsPaymentCompleted(true);
    }
  }, [payment?.status]);



  const totalCost = React.useMemo(() => {
    if (activeQuote?.pricingTier) {
      // For now, use the totalCost directly since pickUpDropOffPrice is not in QuoteData
      return activeQuote.totalCost || 0;
    }
    return activeQuote?.totalCost || 0;
  }, [activeQuote]);

  const depositPercentage = 25; // default deposit %
  const depositAmount = React.useMemo(() => {
    return Math.round((totalCost * (depositPercentage / 100)) * 100) / 100;
  }, [totalCost]);

  // Calculate if move date is more than 72 hours away
  const isMoveDateMoreThan72Hours = React.useMemo(() => {
    if (!scheduleDateISO) return false;
    
    const moveDate = new Date(scheduleDateISO);
    const now = new Date();
    const timeDifference = moveDate.getTime() - now.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    
    return hoursDifference > 72;
  }, [scheduleDateISO]);

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
    if (!activeQuote?.vanType || !origin || !destination) return;
    setIsCreatingIntent(true);
    
    try {
      setHasAttemptedPaymentInit(true);
      // OPTIMIZATION: Save quote to backend before payment to ensure data persistence
      console.log('Saving quote to backend before payment...');
      
      // Get current ETag for concurrency control
      const currentEtag = getCurrentEtag();
      console.log('Using ETag for backend save:', currentEtag || 'none (new quote)');
      
      // Transform frontend data to backend contract format
      const quotePayload = {
        quote: {
          id: activeQuote.quoteId || null,
          sessionId: activeQuote.sessionId || null, // backend will still set/refresh from cookie
          quoteReference: activeQuote.quoteReference || null,
          type: activeQuoteType === 'send' ? 'Send' : activeQuoteType === 'receive' ? 'Receive' : 'Removals',
          vanType: toBackendVanType(activeQuote.vanType as string),
          driverCount: driverCount ?? 1,
          distanceMiles: Math.max(0, distanceMiles ?? 0),
          numberOfItemsToDismantle: activeQuote.numberOfItemsToDismantle || 0,
          numberOfItemsToAssemble: activeQuote.numberOfItemsToAssemble || 0,
          origin: origin ? {
            line1: origin.line1 || '',
            line2: origin.line2 || '',
            city: origin.city || '',
            county: origin.county || '',
            postCode: origin.postcode || '',
            country: origin.country || 'United Kingdom',
            hasElevator: Boolean(origin.hasElevator),
            floor: origin.floor ?? 0,
            // Extended Mapbox fields
            fullAddress: origin.fullAddress || '',
            addressNumber: origin.addressNumber || '',
            street: origin.street || '',
            neighborhood: origin.neighborhood || '',
            district: origin.district || '',
            region: origin.region || '',
            regionCode: origin.regionCode || '',
            countryCode: origin.countryCode || '',
            placeName: origin.placeName || '',
            accuracy: origin.accuracy || '',
            mapboxId: origin.mapboxId || '',
            latitude: origin.latitude || 0,
            longitude: origin.longitude || 0,
          } : undefined,
          destination: destination ? {
            line1: destination.line1 || '',
            line2: destination.line2 || '',
            city: destination.city || '',
            county: destination.county || '',
            postCode: destination.postcode || '',
            country: destination.country || 'United Kingdom',
            hasElevator: Boolean(destination.hasElevator),
            floor: destination.floor ?? 0,
            // Extended Mapbox fields
            fullAddress: destination.fullAddress || '',
            addressNumber: destination.addressNumber || '',
            street: destination.street || '',
            neighborhood: destination.neighborhood || '',
            district: destination.district || '',
            region: destination.region || '',
            regionCode: destination.regionCode || '',
            countryCode: destination.countryCode || '',
            placeName: destination.placeName || '',
            accuracy: destination.accuracy || '',
            mapboxId: destination.mapboxId || '',
            latitude: destination.latitude || 0,
            longitude: destination.longitude || 0,
          } : undefined,
          schedule: {
            dateISO: scheduleDateISO || undefined,
            deliveryDateISO: activeQuote.deliveryDate || undefined,
            hours: activeQuote.hours || undefined,
            flexibleTime: activeQuote.flexibleTime || undefined,
            timeSlot: activeQuote.timeSlot || undefined
          },
          pricing: {
            pricingTier: toBackendPricingTier(pricingTier),
            totalCost: totalCost || undefined,
            pickUpDropOffPrice: activeQuote.pickUpDropOffPrice || undefined
          },
          items: (activeQuote.items || []).map(item => ({
            name: item.name || '',
            width: item.widthCm || undefined,
            height: item.heightCm || undefined,
            depth: item.lengthCm || undefined,
            quantity: item.quantity || 1
          })),
          payment: {
            status: 'pending',
            paymentType: option === 'full' ? 'Full' : option === 'deposit' ? 'Deposit' : 'Later',
            depositAmount: option === 'deposit' ? depositAmount : undefined
          },
          version: currentEtag ? parseInt(currentEtag) : 0 // Use stored ETag or default to 0
        },
        customer: customer ? {
          fullName: customer.fullName || '',
          email: customer.email || '',
          phoneNumber: customer.phone || '',
          role: null,
          billingAddress: customer.billingAddress ? {
            line1: customer.billingAddress.line1 || '',
            line2: customer.billingAddress.line2 || '',
            city: customer.billingAddress.city || '',
            county: customer.billingAddress.county || '',
            postCode: customer.billingAddress.postcode || '',
            country: customer.billingAddress.country || 'United Kingdom',
            hasElevator: customer.billingAddress.hasElevator || false,
            floor: customer.billingAddress.floor || 0,
            // Extended Mapbox fields
            fullAddress: customer.billingAddress.fullAddress || '',
            addressNumber: customer.billingAddress.addressNumber || '',
            street: customer.billingAddress.street || '',
            neighborhood: customer.billingAddress.neighborhood || '',
            district: customer.billingAddress.district || '',
            region: customer.billingAddress.region || '',
            regionCode: customer.billingAddress.regionCode || '',
            countryCode: customer.billingAddress.countryCode || '',
            placeName: customer.billingAddress.placeName || '',
            accuracy: customer.billingAddress.accuracy || '',
            mapboxId: customer.billingAddress.mapboxId || '',
            latitude: customer.billingAddress.latitude || 0,
            longitude: customer.billingAddress.longitude || 0,
          } : undefined
        } : undefined,
        ETag: currentEtag || "0" // Use stored ETag or default to "0"
      };

      // Create the payment intent and save the quote
      const resp = await fetch(`${API_BASE_URL}/api/v1/checkout/payment-sheet`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(quotePayload),
      });
      if (!resp.ok) {
        throw new Error(`Failed to create payment intent: ${resp.status}`);
      }
      const data = await resp.json();

      // Update context and local state
      updatePayment({
        paymentIntentId: data.paymentIntentId,
        paymentType: option,
        depositAmount: option === 'deposit' ? depositAmount : undefined,
        dueDate: scheduleDateISO,
      });
      
      setClientSecret(data.paymentIntent);
    } catch (e) {
      console.error('Error in createPaymentForOption:', e);
      // Show error to user
      if (e instanceof Error) {
        if (e.message.includes('Failed to save quote to backend')) {
          setPaymentStatus('Failed to save quote data. Please try again.');
        } else if (e.message.includes('Failed to create payment intent')) {
          setPaymentStatus('Failed to create payment. Please try again.');
        } else {
          setPaymentStatus('An error occurred. Please try again.');
        }
      } else {
        setPaymentStatus('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsCreatingIntent(false);
    }
  }, [isHydrated, activeQuote?.vanType, origin, destination, driverCount, distanceMiles, pricingTier, scheduleDateISO, customer, totalCost, depositAmount, updatePayment, mapPaymentTypeToEnum, activeQuote, activeQuoteType, depositAmount]);

  // Ensure we have a bookingId as early as possible (fallback if user bypassed /summary)
  const postedRef = React.useRef(false); // retained for backward compatibility (no longer used to post job)
  // (No job persistence here anymore; moved to /summary)
  // We keep only the bookingId generation safety net.
  React.useEffect(() => {
    if (!isHydrated) return;
    if (payment?.bookingId) return;
    let quoteId: string | undefined;
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      quoteId = crypto.randomUUID();
    } else {
      quoteId = `q-${Date.now()}`;
    }
    updatePayment({ bookingId: quoteId });
  // we only want to run once when hydrated & missing id
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  // Reset selected option if 'Pay later' is selected but move date is now less than 72 hours away
  React.useEffect(() => {
    if (selectedOption === 'later' && !isMoveDateMoreThan72Hours) {
      setSelectedOption('full');
      // Also trigger payment creation for 'full' when switching from 'later'
      if (isHydrated && !isCreatingIntent) {
        createPaymentForOption('full');
      }
    }
  }, [selectedOption, isMoveDateMoreThan72Hours, isHydrated, isCreatingIntent, createPaymentForOption]);

  // Auto-select "Pay in full" by default and create payment intent
  React.useEffect(() => {
    if (isHydrated && !clientSecret && !isCreatingIntent && selectedOption === 'full') {
      createPaymentForOption('full');
    }
  }, [isHydrated, clientSecret, isCreatingIntent, selectedOption, createPaymentForOption]);

  // Browser navigation protection - detect when user navigates back to payment page
  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPaymentCompleted) {
        event.preventDefault();
        event.returnValue = 'Payment already completed. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

          const handlePopState = (event: PopStateEvent) => {
        if (isPaymentCompleted) {
          console.log('[pay] Browser back button detected after completed payment - clearing IndexedDB and redirecting');
          // Clear IndexedDB before redirecting
          resetAllQuotes();
          // If user navigates back and payment is completed, redirect to confirmation with replace
          const confirmationUrl = `/confirmation${payment?.bookingId ? `?ref=${encodeURIComponent(payment.bookingId)}` : ''}`;
          window.history.pushState(null, '', confirmationUrl);
          router.replace(confirmationUrl); // Changed from push to replace
        }
      };

    if (isPaymentCompleted) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isPaymentCompleted, payment?.bookingId, router, resetAllQuotes]);

  const options = React.useMemo<StripeElementsOptions | undefined>(() => {
    if (!clientSecret) return undefined;
    return {
      clientSecret,
      appearance: { theme: 'stripe' }
    };
  }, [clientSecret]);

  // Force re-render of Elements when payment option changes
  const elementsKey = React.useMemo(() => {
    return `${selectedOption}-${clientSecret}`;
  }, [selectedOption, clientSecret]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
  <StreamlinedHeader hideCart />
      <main className="flex-1">
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          {isPaymentCompleted && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="text-yellow-800 text-sm">
                  <strong>Payment Already Completed:</strong> You have already completed your payment for this booking. 
                  If you need to make changes, please contact our support team.
                </div>
              </div>
            </div>
          )}
          <Card>
            <CardHeader>
              <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Removed busy text during payment status check for cleaner UX */}
              
              {isPaymentCompleted && (
                <div className="mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">{paymentStatus}</h3>
                    <p className="text-green-700 mb-4">
                      {payment?.paymentType === 'later' 
                        ? 'Your payment method has been saved successfully. We will charge the full amount 72 hours before your collection date.'
                        : 'Your payment has been processed successfully. Your booking is confirmed.'
                      }
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        onClick={() => {
                          // Build confirmation URL with all necessary payment data
                          const params = new URLSearchParams();
                          if (payment?.bookingId) params.append('ref', payment.bookingId);
                          if (paymentIntentId) params.append('paymentIntentId', paymentIntentId);
                          if (clientSecret) params.append('clientSecret', clientSecret);
                          const queryString = params.toString();
                          router.replace(`/confirmation${queryString ? `?${queryString}` : ''}`);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        View Confirmation
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          // Clear IndexedDB before navigating home
                          console.log('[pay] Return Home button clicked - clearing IndexedDB');
                          resetAllQuotes();
                          // Use window.location.replace to prevent back navigation
                          setTimeout(() => {
                            window.location.replace('/');
                          }, 100);
                        }}
                      >
                        Return Home
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {!isPaymentCompleted && (
                <>
                  {/* Removed initial spinner/text to avoid visible flicker */}
                  <div className="space-y-4 mb-6">
                    <div className={`grid grid-cols-1 gap-3 ${isMoveDateMoreThan72Hours ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                      <button
                        type="button"
                        onClick={async () => { setSelectedOption('full'); await createPaymentForOption('full'); }}
                        disabled={isCreatingIntent || isPaymentCompleted}
                        className={`text-left rounded-lg border-2 p-6 transition-all duration-200 ${
                          selectedOption === 'full' 
                            ? 'border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg' 
                            : 'border-muted hover:border-primary/40 hover:shadow-md'
                        } ${isPaymentCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                        disabled={isCreatingIntent || isPaymentCompleted}
                        className={`text-left rounded-lg border-2 p-6 transition-all duration-200 ${
                          selectedOption === 'deposit' 
                            ? 'border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg' 
                            : 'border-muted hover:border-primary/40 hover:shadow-md'
                        } ${isPaymentCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                      
                      {isMoveDateMoreThan72Hours && (
                        <button
                          type="button"
                          onClick={async () => { setSelectedOption('later'); await createPaymentForOption('later'); }}
                          disabled={isCreatingIntent || isPaymentCompleted}
                          className={`text-left rounded-lg border-2 p-6 transition-all duration-200 ${
                            selectedOption === 'later' 
                              ? 'border-primary bg-primary/5 ring-4 ring-primary/20 shadow-lg' 
                              : 'border-muted hover:border-primary/40 hover:shadow-md'
                          } ${isPaymentCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                      )}
                    </div>
                    {!isMoveDateMoreThan72Hours && scheduleDateISO && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                          <div className="text-yellow-800 text-sm">
                            <strong>Pay Later Unavailable:</strong> Your move date is less than 72 hours away. 
                            Please choose "Pay in full" or "Pay deposit" to secure your booking.
                          </div>
                        </div>
                      </div>
                    )}
                    {isCreatingIntent && (
                      <div className="text-sm text-blue-600 flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Preparing your payment…
                      </div>
                    )}
                  </div>
                  {!isLoadingClientSecret && initDelayDone && isHydrated && hasAttemptedPaymentInit && !clientSecret && paymentIntentId && (
                    <div className="text-sm text-red-600">
                      Failed to load payment details. Please try again.
                    </div>
                  )}
                  {clientSecret && options && (
                    <Elements key={elementsKey} stripe={stripePromise} options={options}>
                      <CheckoutForm
                        returnUrl={`${window.location.origin}/confirmation${payment?.bookingId ? `?ref=${encodeURIComponent(payment.bookingId)}` : ''}`}
                        clientSecret={clientSecret}
                        paymentIntentId={paymentIntentId}
                      />
                    </Elements>
                  )}
                </>
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
  const router = useRouter();
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
      <PayPageContent />
    </Suspense>
  );
}

