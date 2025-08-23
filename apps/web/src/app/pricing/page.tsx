"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import DatePickers from '@/components/pricing/DatePickers';
import { useQuote } from '@/contexts/QuoteContext';
import { Button } from '@/components/ui/button';
import { computeCost } from '@/lib/cost';
import { canEnterPricing } from '@/lib/guards';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronDown, Info, Shield, Truck, Users, Clock, Check, FileDown, Star } from 'lucide-react';
import type { PricingTierId } from '@/types/booking';
import { useQuoteSession } from '@/hooks/useQuoteSession';
import { API_BASE_URL } from '@/lib/api/config';
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';

export default function PricingPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();
  const quoteSession = useQuoteSession<any>({ baseUrl: API_BASE_URL });
  
  // Get data from active quote and shared data
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  
  // Get origin and destination from active quote
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;
  
  const selectedVan = activeQuote?.vanType;
  const driverCount = activeQuote?.driverCount || 2;
  const pricingTier = activeQuote?.pricingTier;
  const collectionDate = activeQuote?.collectionDate;
  const deliveryDate = activeQuote?.deliveryDate;
  
  // Helper functions to update quote data
  const setPricingTier = (tier: PricingTierId) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { pricingTier: tier });
    }
  };
  
  const setCollectionDate = (iso: string) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { collectionDate: iso });
    }
  };
  
  const setDeliveryDate = (iso: string) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { deliveryDate: iso });
    }
  };
  
  const [expandedTier, setExpandedTier] = React.useState<PricingTierId | null>(null);

  React.useEffect(() => {
    if (!isHydrated) return;
    // Create a mock object that matches the expected BookingState structure
    const mockBookingState = {
      vehicle: { selectedVan: activeQuote?.vanType, driverCount: activeQuote?.driverCount || 2 },
      pricing: { pricingTier: activeQuote?.pricingTier, totalCost: activeQuote?.totalCost || 0 },
      originDestination: { origin, destination, distanceMiles },
      schedule: { dateISO: activeQuote?.collectionDate, deliveryDateISO: activeQuote?.deliveryDate }
    };
    if (!canEnterPricing(mockBookingState)) {
      router.replace('/origin-destination');
    }
  }, [router, isHydrated, activeQuote, origin, destination, distanceMiles]);

  // Simplified pricing logic
  const isSendReceiveQuote = false;

  const cost = React.useMemo(() => {
    if (!selectedVan) return null;
    return computeCost({
      van: selectedVan,
      driverCount,
      distanceMiles: distanceMiles || 0,
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier: pricingTier,
    });
  }, [selectedVan, driverCount, origin, destination, pricingTier, distanceMiles]);

  const snapshotQuote = React.useCallback(() => {
    try {
      quoteSession.setData((prev: any) => ({
        ...(prev ?? {}),
        vehicle: { selectedVan: activeQuote?.vanType, driverCount: activeQuote?.driverCount || 2 },
        origin: origin,
        destination: destination,
        distanceMiles: distanceMiles,
        schedule: { dateISO: activeQuote?.collectionDate, deliveryDateISO: activeQuote?.deliveryDate },
        pricing: { pricingTier: activeQuote?.pricingTier, totalCost: activeQuote?.totalCost || 0 },
      }));
      void quoteSession.flush();
    } catch {}
  }, [quoteSession, activeQuote, origin, destination, distanceMiles]);

  // Four-tier model: Eco, Eco Plus, Standard, Premium
  const tiers: { id: PricingTierId; name: string; popular?: boolean; timescale: string; features: { name: string; included: boolean; value?: string; info?: string }[] }[] = [
    {
      id: 'eco',
      name: 'Tranzr Eco',
      timescale: '7-10 working days',
      features: [
        { name: 'State of the art service', included: true },
        { name: 'Two men team', included: true },
        { name: 'Careful protection', included: true },
        { name: 'In time delivery', included: true },
        { name: 'Level of service', included: true, value: 'door to door' },
        { name: 'Damage cover', included: true, value: '£0' },
        { name: 'Time slot', included: true, value: 'whole day' },
        { name: 'Tracking (basic)', included: false },
        { name: 'Time slot the day before', included: false },
        { name: 'Real time tracking', included: false },
        { name: 'SMS updates', included: false },
        { name: '1-2 stops away notifications', included: false },
      ],
    },
    {
      id: 'ecoPlus',
      name: 'Tranzr Eco Plus',
      timescale: '5-7 working days',
      features: [
        { name: 'State of the art service', included: true },
        { name: 'Two men team', included: true },
        { name: 'Careful protection', included: true },
        { name: 'In time delivery', included: true },
        { name: 'Level of service', included: true, value: 'door to door' },
        { name: 'Damage cover', included: true, value: '£0' },
        { name: 'Time slot', included: true, value: 'whole day' },
        { name: 'Tracking (basic)', included: true },
        { name: 'Time slot the day before', included: true },
        { name: 'Real time tracking', included: false },
        { name: 'SMS updates', included: false },
        { name: '1-2 stops away notifications', included: false },
      ],
    },
    {
      id: 'standard',
      name: 'Tranzr Standard',
      popular: true,
      timescale: '3-5 working days',
      features: [
        { name: 'State of the art service', included: true },
        { name: 'Two men team', included: true },
        { name: 'Careful protection', included: true },
        { name: 'In time delivery', included: true },
        { name: 'Level of service', included: true, value: 'door to door' },
        { name: 'Damage cover', included: true, value: '£0' },
        { name: 'Time slot', included: true, value: 'whole day' },
        { name: 'Tracking (basic)', included: true },
        { name: 'Time slot the day before', included: true },
        { name: 'Real time tracking', included: true },
        { name: 'SMS updates', included: true },
        { name: '1-2 stops away notifications', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Tranzr Premium',
      timescale: '1-2 working days',
      features: [
        { name: 'State of the art service', included: true },
        { name: 'Two men team', included: true },
        { name: 'Careful protection', included: true },
        { name: 'In time delivery', included: true },
        { name: 'Level of service', included: true, value: 'door to door' },
        { name: 'Damage cover', included: true, value: '£0' },
        { name: 'Time slot', included: true, value: 'whole day' },
        { name: 'Tracking (basic)', included: true },
        { name: 'Time slot the day before', included: true },
        { name: 'Real time tracking', included: true },
        { name: 'SMS updates', included: true },
        { name: '1-2 stops away notifications', included: true },
      ],
    },
  ];

  const handleContinue = () => {
    if (!pricingTier) {
      alert('Please select a pricing tier to continue');
      return;
    }
    snapshotQuote();
    router.push('/origin-destination');
  };

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
              <Shield className="h-4 w-4 text-blue-600" />
              <div className="text-blue-900 font-semibold text-sm">
                Professional Moving Service
              </div>
            </div>
            <div className="text-blue-800 text-sm">
              All tiers include professional movers, insurance coverage, and careful handling of your belongings. Choose based on your timeline and service preferences.
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.id}
                role="button"
                tabIndex={0}
                onClick={() => setPricingTier(tier.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setPricingTier(tier.id)}
                aria-pressed={pricingTier === tier.id}
                className={`cursor-pointer overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                  pricingTier === tier.id ? 'ring-2 ring-primary-400 shadow-lg' : 'hover:shadow'
                }`}
              >
                <div className="bg-primary-600 text-primary-50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-sm opacity-90">{tier.name}</div>
                      <div className="text-xs opacity-75">{tier.timescale}</div>
                    </div>
                    {tier.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                            {feature.name}
                          </span>
                          {feature.value && (
                            <span className="text-muted-foreground ml-1">({feature.value})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!pricingTier}
              size="lg"
              className="px-8"
            >
              Continue to Address Details
            </Button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
