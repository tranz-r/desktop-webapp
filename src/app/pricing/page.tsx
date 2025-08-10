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
  const booking = useBooking();
  const { isHydrated, vehicle, originDestination, pricing, schedule, updatePricing, updateSchedule } = booking;
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const origin = originDestination.origin;
  const destination = originDestination.destination;
  const distanceMiles = originDestination.distanceMiles;
  const pricingTier = pricing.pricingTier;
  const collectionDate = schedule.dateISO;
  const deliveryDate = schedule.deliveryDateISO;
  const setPricingTier = (tier: PricingTierId) => updatePricing({ pricingTier: tier });
  const setCollectionDate = (iso: string) => updateSchedule({ dateISO: iso });
  const setDeliveryDate = (iso: string) => updateSchedule({ deliveryDateISO: iso });
  const [expandedTier, setExpandedTier] = React.useState<PricingTierId | null>(null);

  React.useEffect(() => {
    if (!isHydrated) return;
    if (!canEnterPricing(booking)) {
      router.replace('/origin-destination');
    }
  }, [router, isHydrated, booking]);

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

  // Four-tier model: Eco, Eco Plus, Standard, Premium (inspired by reference design)
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
        { name: 'Level of service', included: true, value: 'ground floor' },
        { name: 'Damage cover', included: true, value: 'up to £100' },
        { name: 'Time slot', included: true, value: '4 hours' },
        { name: 'Tracking (basic)', included: true },
        { name: 'Time slot the day before', included: false },
        { name: 'Real time tracking', included: false },
        { name: 'SMS updates', included: false },
        { name: '1-2 stops away notifications', included: false },
      ],
      popular: true,
    },
    {
      id: 'standard',
      name: 'Tranzr Standard',
      timescale: '2-4 working days',
      features: [
        { name: 'State of the art service', included: true },
        { name: 'Two men team', included: true },
        { name: 'Careful protection', included: true },
        { name: 'In time delivery', included: true },
        { name: 'Level of service', included: true, value: 'room of choice' },
        { name: 'Damage cover', included: true, value: 'up to £300' },
        { name: 'Time slot', included: true, value: '2 hours' },
        { name: 'Tracking (basic)', included: true },
        { name: 'Time slot the day before', included: true },
        { name: 'Real time tracking', included: false },
        { name: 'SMS updates', included: true },
        { name: '1-2 stops away notifications', included: false },
      ],
    },
    {
      id: 'premium',
      name: 'Tranzr Premium',
      timescale: '1-2 business days',
      features: [
        { name: 'State of the art service', included: true },
        { name: 'Two men team', included: true },
        { name: 'Careful protection', included: true },
        { name: 'In time delivery', included: true },
        { name: 'Level of service', included: true, value: 'room of choice' },
        { name: 'Damage cover', included: true, value: 'up to purchase, market, or repair cost' },
        { name: 'Time slot', included: true, value: '2 hours' },
        { name: 'Tracking (premium)', included: true },
        { name: 'Time slot the day before', included: true },
        { name: 'Real time tracking', included: true },
        { name: 'SMS updates', included: true },
        { name: '1-2 stops away notifications', included: true },
      ],
    },
  ];

  const tierCost = (tierId: PricingTierId) => {
    if (!selectedVan) return null;
    const c = computeCost({
      van: selectedVan,
      driverCount,
      distanceMiles: distanceMiles || 0,
      originFloor: origin?.floor,
      originElevator: origin?.hasElevator,
      destinationFloor: destination?.floor,
      destinationElevator: destination?.hasElevator,
      pricingTier: tierId,
    });
    return c.total;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      <main className="flex-1">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t) => {
              const selected = pricingTier === t.id;
              const price = tierCost(t.id);
              const expanded = expandedTier === t.id;
              return (
                <Card
                  key={t.id}
                  className={`overflow-hidden focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 ${selected ? 'border-primary-500 shadow-primary-100' : ''}`}
                >
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
                      <div className="text-2xl font-bold text-red-600">{price !== null ? `£${price?.toFixed(2)}` : '—'}</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">Collection</span>
                        <span className="text-xs font-medium text-gray-600">Delivery</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">{new Date(collectionDate || '').toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) || '—'}</span>
                        <span className="flex-1 mx-3 h-px bg-gray-300" />
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">{new Date(collectionDate || '').toLocaleDateString(undefined, { day: '2-digit', month: 'short' }) || '—'}</span>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">{t.timescale}</div>
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
            <Button onClick={() => router.push('/summary')}>Next: Review Summary</Button>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
