"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';
import { Check, Clock, Star, Truck } from 'lucide-react';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();
  
  // Get data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const selectedVan = activeQuote?.vanType;
  const driverCount = activeQuote?.driverCount || 2;
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;
  const pricingTier = activeQuote?.pricingTier;
  const collectionDate = activeQuote?.collectionDate;
  const deliveryDate = activeQuote?.deliveryDate;
  
  // State for selected service tier
  const [selectedServiceTier, setSelectedServiceTier] = React.useState<'standard' | 'premium'>('standard');
  
  // Get pricing data from the backend API
  const [pickUpDropOffPrice, setPickUpDropOffPrice] = React.useState<any>(null);
  const [isLoadingPricing, setIsLoadingPricing] = React.useState(false);

  // Fetch pricing data when component mounts
  React.useEffect(() => {
    const fetchPricing = async () => {
      if (!activeQuote?.items || activeQuote.items.length === 0) {
        // If no items, redirect to inventory page
        router.push('/inventory');
        return;
      }
      
      setIsLoadingPricing(true);
      try {
        const response = await fetch(`http://localhost:5247/api/v1/prices`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            distanceMiles: distanceMiles || 0,
            items: activeQuote.items.map(item => ({
              id: item.id,
              name: item.name,
              lengthCm: item.lengthCm || 0,
              widthCm: item.widthCm || 0,
              heightCm: item.heightCm || 0,
              quantity: item.quantity || 1
            })),
            stairsFloors: 0, // Default value
            longCarry: false, // Default value
            numberOfItemsToAssemble: activeQuote.numberOfItemsToAssemble || 0,
            numberOfItemsToDismantle: activeQuote.numberOfItemsToDismantle || 0,
            parkingFee: 0, // Default value
            ulezFee: 0, // Default value
            vatRegistered: true // Default value
          })
        });

        if (response.ok) {
          const data = await response.json();
          setPickUpDropOffPrice(data);
        }
      } catch (error) {
        console.error('Failed to fetch pricing:', error);
      } finally {
        setIsLoadingPricing(false);
      }
    };

    if (activeQuote?.items && activeQuote.items.length > 0) {
      fetchPricing();
    } else if (isHydrated && activeQuoteType) {
      // If hydrated but no items, redirect to inventory
      router.push('/inventory');
    }
  }, [router, isHydrated, activeQuote, origin, destination, distanceMiles, activeQuoteType]);

  // Check if this is a send/receive quote
  const isSendReceiveQuote = (activeQuoteType === 'send' || activeQuoteType === 'receive');
  const hasPricingData = isSendReceiveQuote && pickUpDropOffPrice;

  // Handle continue for send/receive quotes
  const handleSendReceiveContinue = () => {
    if (pickUpDropOffPrice && activeQuoteType) {
      const selectedPricing = pickUpDropOffPrice[selectedServiceTier];
      updateQuote(activeQuoteType, { 
        pricingTier: selectedServiceTier === 'premium' ? 'premium' : 'standard',
        totalCost: selectedPricing.customerTotal
      });
    }
    router.push('/origin-destination');
  };

  // If this is not a send/receive quote, redirect to appropriate page
  React.useEffect(() => {
    if (isHydrated && !isSendReceiveQuote) {
      if (activeQuoteType === 'removals') {
        router.replace('/removal-pricing');
      } else {
        router.replace('/origin-destination');
      }
    }
  }, [isHydrated, isSendReceiveQuote, activeQuoteType, router]);

  // Show loading while checking quote type
  if (!isHydrated || !isSendReceiveQuote) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StreamlinedHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading pricing options...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Show loading while fetching pricing data for send/receive quotes
  if (isSendReceiveQuote && !hasPricingData) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StreamlinedHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">
              {activeQuote?.items && activeQuote.items.length > 0 
                ? "Calculating pricing..." 
                : "Redirecting to inventory..."
              }
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-8">
          
          {/* Quote Reference Banner - Subtle display */}
          <div className="flex justify-center">
            <QuoteReferenceBanner variant="subtle" />
          </div>
          
          {/* Service Info */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-blue-900 font-semibold text-sm">
                Pickup & Dropoff Service
              </div>
            </div>
            <div className="text-blue-800 text-sm">
              Choose between our Standard and Premium service tiers. All include professional movers, insurance coverage, and careful handling.
            </div>
          </div>

          {/* Send/Receive Quote Pricing Display (Modern two-card design) */}
          {pickUpDropOffPrice && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standard Service */}
              <Card
                role="button"
                tabIndex={0}
                onClick={() => setSelectedServiceTier('standard')}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedServiceTier('standard')}
                aria-pressed={selectedServiceTier === 'standard'}
                className={`cursor-pointer overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  selectedServiceTier === 'standard' ? 'ring-2 ring-primary-400 shadow-lg' : 'hover:shadow'
                }`}
              >
                <div className="bg-primary-600 text-primary-50 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90">Standard</div>
                    <div className="text-xl font-semibold">Removal</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedServiceTier === 'standard' && (
                      <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">Selected</span>
                    )}
                    <Truck className="h-7 w-7 opacity-90" />
                  </div>
                </div>
                <CardContent className="p-5 space-y-5">
                  <div>
                    <div className="text-4xl font-bold text-foreground">£{pickUpDropOffPrice.standard.customerTotal.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Includes VAT</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-foreground mb-2">Includes:</div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Moving team to Load and Move</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Book now, pay later</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Complimentary Cover</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Free 48 hour Cancellation</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Waiting time up to 30 mins</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Free Home Setup Service</li>
                    </ul>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    <Clock className="inline h-3.5 w-3.5 mr-1" /> Total Volume: {pickUpDropOffPrice.standard.totalVolumeM3.toFixed(2)} m³ • Distance: {distanceMiles || 0} miles
                  </div>
                </CardContent>
              </Card>

              {/* Premium Service */}
              <Card
                role="button"
                tabIndex={0}
                onClick={() => setSelectedServiceTier('premium')}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedServiceTier('premium')}
                aria-pressed={selectedServiceTier === 'premium'}
                className={`cursor-pointer overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  selectedServiceTier === 'premium' ? 'ring-2 ring-primary-400 shadow-lg' : 'hover:shadow'
                }`}
              >
                <div className="bg-primary-700 text-primary-50 p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90">Premium</div>
                    <div className="text-xl font-semibold">Full Pack & Move</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-300" />
                    {selectedServiceTier === 'premium' && (
                      <span className="text-[10px] font-semibold bg-white/20 text-white px-2 py-0.5 rounded-full">Selected</span>
                    )}
                    <Truck className="h-7 w-7 opacity-90" />
                  </div>
                </div>
                <CardContent className="p-5 space-y-5">
                  <div>
                    <div className="text-4xl font-bold text-foreground">£{pickUpDropOffPrice.premium.customerTotal.toFixed(0)}</div>
                    <div className="text-xs text-muted-foreground mt-1">Includes VAT</div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-foreground mb-2">Includes:</div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Moving team to Pack, Load and Move</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Full Packing Service</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> All Packaging Materials</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Book now, pay later</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Dismantling & Reassembly</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Dedicated Consultant</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Protection+ Cover</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Free 48 hour Cancellation</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Extended wait time up to 2 hours</li>
                      <li className="flex items-start gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-emerald-600 mt-0.5"/> Free Home Setup Service</li>
                    </ul>
                  </div>

                  <div className="text-xs text-muted-foreground text-center">
                    <Clock className="inline h-3.5 w-3.5 mr-1" /> Total Volume: {pickUpDropOffPrice.premium.totalVolumeM3.toFixed(2)} m³ • Distance: {distanceMiles || 0} miles
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={handleSendReceiveContinue}>
              Continue to Customer Details
            </Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
