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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { VanType } from '@/types/booking';

export default function VanSelectionPage() {
  const router = useRouter();
  const { getTotalVolume, items } = useCart();
  const booking = useBooking();
  const { vehicle, schedule, updateVehicle, updateSchedule } = booking;
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const hours = schedule.hours;
  const flexibleTime = schedule.flexibleTime || false;
  const timeSlot = schedule.timeSlot;
  const setVan = (van: VanType) => updateVehicle({ selectedVan: van });
  const setDriverCount = (count: number) => updateVehicle({ driverCount: Math.max(1, Math.min(3, Math.floor(count))) });
  const setHours = (h: number) => updateSchedule({ hours: Math.max(3, Math.floor(h)) });
  const setFlexibleTime = (flex: boolean) => updateSchedule({ flexibleTime: !!flex });
  const setTimeSlot = (slot: 'morning' | 'afternoon' | 'evening') => updateSchedule({ timeSlot: slot });
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [movingDate, setMovingDate] = React.useState<string>('');
 

  React.useEffect(() => {
    if (!hasInventory(items.length)) router.replace('/inventory');
  }, [items.length, router]);

  const totalVolume = getTotalVolume();
  const recommended = React.useMemo(() => recommendVanByVolume(totalVolume), [totalVolume]);

  React.useEffect(() => {
    // Auto-select the available van (3.5 Luton Van with Tail Lift)
    if (!selectedVan) setVan('largeVan');
  }, [selectedVan, setVan]);

  // Avoid hydration mismatch by rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Persist minimal schedule data (local for date only) and update booking collection date
  React.useEffect(() => {
    try {
      const schedule = { movingDate, hours, flexibleTime, timeSlot };
      localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {}
  }, [movingDate, hours, flexibleTime, timeSlot]);

  React.useEffect(() => {
    if (movingDate) {
      // Save ISO date only
      updateSchedule({ dateISO: new Date(movingDate).toISOString() });
    }
  }, [movingDate, updateSchedule]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />
      
      <main className="flex-1">
      <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          {/* Vehicle & Crew */}
          <Card className="border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700 text-base">Vehicle & Crew</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card className="border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700 text-base">Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moving-date">Moving Date</Label>
                  <Input
                    id="moving-date"
                    type="date"
                    value={movingDate}
                    onChange={(e) => setMovingDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (Minimum 3 hours)</Label>
                  <Select value={String(hours ?? 3)} onValueChange={(v) => setHours(Number(v))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => 3 + i).map(hh => (
                        <SelectItem key={hh} value={String(hh)}>{hh} hour{hh > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-md border p-3 bg-orange-50 border-orange-200">
                <div>
                  <div className="text-sm font-medium text-orange-800">Flexible Time</div>
                  <div className="text-xs text-orange-700">Save 15% by being flexible with your time slot</div>
                </div>
                <Switch checked={flexibleTime} onCheckedChange={setFlexibleTime} />
              </div>

        {!flexibleTime && (
                <div className="space-y-2">
                  <Label>Preferred Time Slot</Label>
          <RadioGroup value={timeSlot || 'morning'} onValueChange={(v) => setTimeSlot(v as any)} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 rounded-md border p-3">
                      <RadioGroupItem value="morning" id="slot-morning" />
                      <Label htmlFor="slot-morning" className="cursor-pointer">Morning (8:00 - 12:00)</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border p-3">
                      <RadioGroupItem value="afternoon" id="slot-afternoon" />
                      <Label htmlFor="slot-afternoon" className="cursor-pointer">Afternoon (12:00 - 16:00)</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md border p-3">
                      <RadioGroupItem value="evening" id="slot-evening" />
                      <Label htmlFor="slot-evening" className="cursor-pointer">Evening (16:00 - 20:00)</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Address capture moved to /origin-destination */}

          <div className="flex justify-end">
            <Button onClick={() => router.push('/origin-destination')}>Next: Addresses</Button>
          </div>
        </div>
  </section>
  </main>

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
