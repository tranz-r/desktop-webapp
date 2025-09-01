"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuote } from '@/contexts/QuoteContext';

export default function SummaryPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();
  
  // Get data from active quote and shared data
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const cartItems = activeQuote?.items || [];
  const customer = activeQuote?.customer;
  
  const selectedVan = activeQuote?.vanType;
  const driverCount = activeQuote?.driverCount || 2;
  // Get origin and destination from active quote
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;
  const pricingTier = activeQuote?.pricingTier;
  const totalCost = activeQuote?.totalCost;
  const collectionDate = activeQuote?.collectionDate;
  const deliveryDate = activeQuote?.deliveryDate;
  
  // Helper functions to update quote data
  const setTotalCost = (totalCost: number) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { totalCost });
    }
  };
  
  const updatePayment = (paymentData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { payment: { ...activeQuote?.payment, ...paymentData } });
    }
  };
  const [loading, setLoading] = React.useState(false);

  // Note: Removed automatic cost persistence useEffect to prevent infinite loops
  // Cost is now updated only when explicitly needed

  const formatDateShort = (iso?: string) => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
  };

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

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // Branch A only: Payment Element via PaymentIntent clientSecret from backend (.NET)
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const targetUrl = `${apiBaseUrl}/api/v1/checkout/payment-sheet`;
      console.log('Initializing payment with URL:', targetUrl);
      if (!targetUrl) throw new Error('Missing NEXT_PUBLIC_API_BASE_URL for payment initialization');
      
      // Prepare the payload for the backend
      let payload = {
        van: toBackendVanType(selectedVan),
        driverCount,
        distanceMiles: distanceMiles || 0,
        origin: {
          line1: origin?.line1 || '',
          postcode: origin?.postcode || '',
          floor: origin?.floor || 0,
          hasElevator: origin?.hasElevator || false,
        },
        destination: {
          line1: destination?.line1 || '',
          postcode: destination?.postcode || '',
          floor: destination?.floor || 0,
          hasElevator: destination?.hasElevator || false,
        },
        pricingTier: toBackendPricingTier(pricingTier),
        collectionDate: collectionDate || '',
        customer: {
          fullName: customer?.fullName || '',
          email: customer?.email || '',
          phone: customer?.phone || '',
          billingAddress: {
            line1: customer?.billingAddress?.line1 || '',
            postcode: customer?.billingAddress?.postcode || '',
          },
        },
        cost: {
          total: totalCost || 0,
        },
      };

      console.log('Sending payload to backend:', payload);

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create checkout session');
      const data = await res.json();
      // Expect paymentIntent only (Payment Element flow)
      if (data?.paymentIntent) {
        // Store the PaymentIntentId in context for secure client secret retrieval
        updatePayment({ paymentIntentId: data.paymentIntentId });
        
        // Navigate to /pay with only the booking reference
        const ref = activeQuote?.payment?.bookingId ? `?ref=${encodeURIComponent(activeQuote.payment.bookingId)}` : '';
        router.push(`/pay${ref}`);
        return;
      }
      throw new Error('Payment init did not return paymentIntent (Payment Element flow only)');
    } catch (e) {
      console.error(e);
      // TODO: Show toast using shadcn toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
  <StreamlinedHeader hideCart />
      <main className="flex-1">
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Quote Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Collapsed inventory overview */}
              <div className="mb-6">
                <Accordion type="single" collapsible>
                  <AccordionItem value="inv">
                    <AccordionTrigger className="text-sm font-medium">Inventory ({cartItems.length} items, total volume {cartItems.reduce((a,c)=>a + ((c.lengthCm * c.widthCm * c.heightCm * c.quantity) / 1000000),0).toFixed(2)} m³)</AccordionTrigger>
                    <AccordionContent>
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/2">Item</TableHead>
                              <TableHead>Qty</TableHead>
                              <TableHead>Volume (m³)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cartItems.map(ci => (
                              <TableRow key={ci.id}>
                                <TableCell className="py-1 text-xs">{ci.name}</TableCell>
                                <TableCell className="py-1 text-xs">{ci.quantity}</TableCell>
                                <TableCell className="py-1 text-xs">{((ci.lengthCm * ci.widthCm * ci.heightCm * ci.quantity) / 1000000).toFixed(2)}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Vehicle</span><span className="font-semibold">{selectedVan || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Crew size</span><span className="font-semibold">{driverCount}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Tier</span><span className="font-semibold">{pricingTier || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Distance</span><span className="font-semibold">{(distanceMiles || 0).toFixed(1)} miles</span></div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between"><span className="text-gray-600">Collection</span><span className="font-semibold">{formatDateShort(collectionDate)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">Delivery</span><span className="font-semibold">{formatDateShort(deliveryDate)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">From</span><span className="font-semibold truncate max-w-[60%]" title={origin?.line1 || ''}>{origin?.line1 || '—'}</span></div>
                  <div className="flex items-center justify-between"><span className="text-gray-600">To</span><span className="font-semibold truncate max-w-[60%]" title={destination?.line1 || ''}>{destination?.line1 || '—'}</span></div>
                </div>
              </div>

              <div className="border-t mt-6 pt-4 flex items-center justify-between">
                <div className="text-lg font-bold">Total</div>
                <div className="text-2xl font-bold text-primary-700">{totalCost ? `£${totalCost.toFixed(2)}` : '—'}</div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button size="lg" className="px-8" onClick={handleCheckout} disabled={loading || !totalCost}>
                  {loading ? 'Processing…' : 'Checkout'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
