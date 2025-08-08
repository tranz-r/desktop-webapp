"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import VanCard from '@/components/van/VanCard';
import DriverSelector from '@/components/van/DriverSelector';
import RecommendationBanner from '@/components/van/RecommendationBanner';
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

  React.useEffect(() => {
    if (!hasInventory(items.length)) router.replace('/inventory');
  }, [items.length, router]);

  const totalVolume = getTotalVolume();
  const recommended = React.useMemo(() => recommendVanByVolume(totalVolume), [totalVolume]);

  React.useEffect(() => {
    if (!selectedVan) setVan(recommended);
  }, [recommended, selectedVan, setVan]);

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Select Your Van"
        title="Choose the van size that fits your move"
        description={`Estimated total volume: ${totalVolume.toFixed(3)} m³`}
      />

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          <RecommendationBanner text={`Based on ${totalVolume.toFixed(3)} m³, we recommend the ${VAN_TABLE[recommended].name}.`} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(VAN_TABLE).map(v => (
              <VanCard
                key={v.id}
                name={v.name}
                capacityM3={v.capacityM3}
                basePrice={v.basePrice}
                dimensions={v.dimensions}
                selected={selectedVan === v.id}
                onSelect={() => setVan(v.id)}
              />
            ))}
          </div>

          <DriverSelector value={driverCount} onChange={setDriverCount} />

          <div className="flex justify-end">
            <Button onClick={() => router.push('/origin-destination')}>Next: Addresses</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
