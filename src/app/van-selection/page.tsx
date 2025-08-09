"use client";

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import VanCard from '@/components/van/VanCard';
import DriverSelector from '@/components/van/DriverSelector';
import RecommendationBanner from '@/components/van/RecommendationBanner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useBooking } from '@/contexts/BookingContext';
import { VAN_TABLE, recommendVanByVolume } from '@/lib/recommend-van';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { hasInventory } from '@/lib/guards';

export default function VanSelectionPage() {
  const router = useRouter();
  const { getTotalVolume, items } = useCart();
  const { selectedVan, driverCount, setVan, setDriverCount } = useBooking();
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (!hasInventory(items.length)) router.replace('/inventory');
  }, [items.length, router]);

  const totalVolume = getTotalVolume();
  const recommended = React.useMemo(() => recommendVanByVolume(totalVolume), [totalVolume]);

  React.useEffect(() => {
    if (!selectedVan) setVan(recommended);
  }, [recommended, selectedVan, setVan]);

  // Avoid hydration mismatch by rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <StreamlinedHeader />
      
      <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          <RecommendationBanner text={`Based on ${totalVolume.toFixed(3)} m³, we recommend the ${VAN_TABLE[recommended].name}.`} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(VAN_TABLE).map(v => {
              const isEnabled = v.id === 'largeVan';
              return (
                <VanCard
                  key={v.id}
                  name={v.name}
                  capacityM3={v.capacityM3}
                  basePrice={v.basePrice}
                  dimensions={v.dimensions}
                  selected={selectedVan === v.id}
                  onSelect={() => setVan(v.id)}
                  onDetails={() => setDetailsOpen(true)}
                  disabled={!isEnabled}
                />
              );
            })}
          </div>

          <DriverSelector value={driverCount} onChange={setDriverCount} />

          <div className="flex justify-end">
            <Button onClick={() => router.push('/origin-destination')}>Next: Addresses</Button>
          </div>
        </div>
      </section>

      {/* Van details dialog (mirrors mobile double-tap modal) */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>3.5 Luton Van with Tail Lift</DialogTitle>
            <DialogDescription>
              Professional 3.5 tonne Luton van with hydraulic tail lift - perfect for 3-4 bedroom houses.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-md bg-primary-50 p-3">
                <div className="text-xs text-primary-700">Load Capacity</div>
                <div className="font-semibold text-primary-900">Up to 35m³</div>
              </div>
              <div className="rounded-md bg-green-50 p-3">
                <div className="text-xs text-green-700">Internal Dimensions</div>
                <div className="font-semibold text-green-900">5.5m × 2.1m × 2.2m</div>
              </div>
              <div className="rounded-md bg-yellow-50 p-3">
                <div className="text-xs text-yellow-700">Tail Lift Capacity</div>
                <div className="font-semibold text-yellow-900">500kg</div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDetailsOpen(false)}>Close</Button>
              <Button onClick={() => { setVan('largeVan'); setDetailsOpen(false); }}>Select This Van</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
