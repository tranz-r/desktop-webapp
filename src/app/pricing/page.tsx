"use client";

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import DatePickers from '@/components/pricing/DatePickers';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { computeCost } from '@/lib/cost';
import { canEnterPricing } from '@/lib/guards';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ChevronDown, Info, Shield } from 'lucide-react';
import type { PricingTierId } from '@/types/booking';

export default function PricingPage() {
  const router = useRouter();
  const { isHydrated, selectedVan, driverCount, origin, destination, pricingTier, setPricingTier, collectionDate, deliveryDate, setCollectionDate, setDeliveryDate, distanceKm } = useBooking();
  const [expandedTier, setExpandedTier] = React.useState<PricingTierId | null>(null);

  React.useEffect(() => {
    if (!isHydrated) return;
    if (!canEnterPricing({ selectedVan, driverCount, origin, destination, pricingTier, collectionDate, deliveryDate, totalCost: 0 })) {
      router.replace('/origin-destination');
    }
  }, [router, isHydrated, selectedVan, driverCount, origin, destination, pricingTier, collectionDate, deliveryDate]);

  const cost = React.useMemo(() => {
    if (!selectedVan) return null;
    return computeCost({
      van: selectedVan,
      driverCount,
      distanceKm: distanceKm || 0,
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier: pricingTier,
    });
  }, [selectedVan, driverCount, origin, destination, pricingTier, distanceKm]);

  // Reference mobile implementation: present tiers as cards with features and a popular badge
  const tiers: { id: PricingTierId; name: string; popular?: boolean; features: { name: string; included: boolean; value?: string; info?: string }[] }[] = [
    {
      id: 'basic',
      name: 'Tranzr Basic',
      features: [
        { name: 'Standard service', included: true },
        { name: 'Careful protection', included: true },
        { name: 'Two men team', included: true },
        { name: 'Level of service', included: true, value: 'ground floor' },
        { name: 'Damage cover', included: true, value: 'up to £100' },
        { name: 'Time slot', included: true, value: '4 hours' },
        { name: 'Real time tracking', included: false },
        { name: 'SMS updates', included: false },
      ],
    },
    {
      id: 'standard',
      name: 'Tranzr Standard',
      popular: true,
      features: [
        { name: 'Priority service', included: true },
        { name: 'Careful protection', included: true },
        { name: 'Two men team', included: true },
        { name: 'Level of service', included: true, value: 'ground floor' },
        { name: 'Damage cover', included: true, value: 'up to £150' },
        { name: 'Time slot', included: true, value: '3 hours' },
        { name: 'SMS updates', included: true },
        { name: 'Real time tracking', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Tranzr Premium',
      features: [
        { name: 'Priority service', included: true },
        { name: 'Careful protection', included: true },
        { name: 'Two men team', included: true },
        { name: 'Level of service', included: true, value: 'any floor' },
        { name: 'Damage cover', included: true, value: 'up to £200' },
        { name: 'Time slot', included: true, value: '2 hours' },
        { name: 'Real time tracking', included: true },
        { name: 'SMS updates', included: true },
      ],
    },
  ];

  const tierCost = (tierId: PricingTierId) => {
    if (!selectedVan) return null;
    const c = computeCost({
      van: selectedVan,
      driverCount,
      distanceKm: distanceKm || 0,
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier: tierId,
    });
    return c.total;
  };

  return (
    <div className="min-h-screen bg-background">
      <StreamlinedHeader />
      
      <section className="pt-40 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-8">
          {/* Service Info */}
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-blue-600" />
              <div className="text-blue-900 font-semibold text-sm">Professional Moving Service</div>
            </div>
            <div className="text-blue-800 text-sm">
              All tiers include professional movers, insurance coverage, and careful handling of your belongings.
              Choose based on your timeline and service preferences.
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => {
              const selected = pricingTier === t.id;
              const price = tierCost(t.id);
              const expanded = expandedTier === t.id;
              return (
                <Card key={t.id} className={`overflow-hidden ${selected ? 'border-red-500 shadow-red-100' : ''}`}>
                  {t.popular && (
                    <div className="bg-gradient-to-r from-red-500 to-red-600 px-3 py-2 text-center">
                      <span className="text-white text-xs font-bold tracking-wide">MOST POPULAR</span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-start justify-between gap-2 text-base">
                      <span>{t.name}</span>
                      {t.popular && <Badge>Popular</Badge>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Estimated</div>
                      <div className="text-xl font-bold text-red-600">{price !== null ? `£${price?.toFixed(2)}` : '—'}</div>
                    </div>
                    <Button variant={selected ? 'default' : 'secondary'} className="w-full" onClick={() => setPricingTier(t.id)}>
                      {selected ? 'Selected' : 'Select'}
                    </Button>

                    <Button variant="ghost" className="w-full justify-center gap-2" type="button" onClick={() => setExpandedTier(expanded ? null : t.id)}>
                      <span className="text-sm font-medium">{expanded ? 'Hide details' : 'View details'}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </Button>

                    {expanded && (
                      <div className="border-t pt-4 space-y-2">
                        {t.features.map((f) => (
                          <div key={f.name} className="flex items-center justify-between py-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-700">{f.name}</span>
                              {f.info && <Info className="h-3.5 w-3.5 text-gray-400" />}
                            </div>
                            <div className="text-sm font-medium text-gray-800">
                              {f.included ? (
                                f.value ? (
                                  <span>{f.value}</span>
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                                )
                              ) : (
                                <span className="inline-block w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-end">
            <Button onClick={() => router.push('/payment')}>Next: Payment</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
