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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function VanSelectionPage() {
  const router = useRouter();
  const { getTotalVolume, items } = useCart();
  const booking = useBooking();
  const { vehicle, schedule, updateVehicle, updateSchedule, isHydrated } = booking;
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const hours = schedule.hours;
  const flexibleTime = schedule.flexibleTime || false;
  const timeSlot = schedule.timeSlot;
  const setVan = (van: VanType) => updateVehicle({ selectedVan: van });
  const setDriverCount = (count: number) => updateVehicle({ driverCount: Math.max(1, Math.min(3, Math.floor(count))) });
  const setHours = (h: number) => updateSchedule({ hours: Math.max(4, Math.floor(h)) });
  const setFlexibleTime = (flex: boolean) => updateSchedule({ flexibleTime: !!flex });
  const setTimeSlot = (slot: 'morning' | 'afternoon' | 'evening') => updateSchedule({ timeSlot: slot });
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [movingDate, setMovingDate] = React.useState<string>('');
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateError, setDateError] = React.useState<string | null>(null);
 

  React.useEffect(() => {
    if (!hasInventory(items.length)) router.replace('/inventory');
  }, [items.length, router]);

  const totalVolume = getTotalVolume();
  const recommended = React.useMemo(() => recommendVanByVolume(totalVolume), [totalVolume]);

  React.useEffect(() => {
    // Auto-select the available van (3.5 Luton Van with Tail Lift) after hydration
    if (isHydrated && !selectedVan) setVan('largeVan');
  }, [isHydrated, selectedVan, setVan]);

  // Rehydrate moving date from schedule if available
  React.useEffect(() => {
    if (isHydrated && !movingDate && schedule?.dateISO) {
      try {
        const d = new Date(schedule.dateISO);
        if (!isNaN(d.getTime())) {
          setMovingDate(format(d, 'yyyy-MM-dd'));
        }
      } catch {}
    }
  }, [isHydrated, schedule?.dateISO, movingDate]);

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

  // Ensure minimum hours is 4 to align with new business rule
  React.useEffect(() => {
    if (mounted && (typeof hours !== 'number' || hours < 4)) {
      updateSchedule({ hours: 4 });
    }
  }, [mounted, hours, updateSchedule]);

  React.useEffect(() => {
    if (movingDate) {
      // Save ISO date only
      updateSchedule({ dateISO: new Date(movingDate).toISOString() });
  setDateError(null);
    }
  }, [movingDate, updateSchedule]);

  if (!mounted) return null;

  const today = new Date()
  today.setHours(0, 0, 0, 0)

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
                  <Label htmlFor="moving-date">Moving Date <span className="text-red-600">*</span></Label>
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <div className="relative">
                        <Input
                          id="moving-date"
                          readOnly
                          value={movingDate ? format(new Date(movingDate), 'LLL dd, y') : ''}
                          placeholder="Pick a date"
                          aria-invalid={!!dateError}
                          aria-describedby={dateError ? 'moving-date-error' : undefined}
                          className={`${dateError ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        />
                        <CalendarIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={movingDate ? new Date(movingDate) : undefined}
                        onSelect={(date) => {
                          if (date) {
                            setMovingDate(format(date, 'yyyy-MM-dd'));
                            setDateOpen(false);
                            setDateError(null);
                          }
                        }}
                        disabled={{ before: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {dateError && (
                    <p id="moving-date-error" className="text-sm text-red-600">{dateError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Duration (Minimum 4 hours)</Label>
                  <Select value={String(Math.max(4, hours ?? 4))} onValueChange={(v) => setHours(Number(v))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => 4 + i).map(hh => (
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
          <RadioGroup value={timeSlot || 'morning'} onValueChange={(v: string) => setTimeSlot(v as any)} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
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
            <Button
              onClick={() => {
                if (!movingDate) {
                  setDateError('Please select a moving date to continue.');
                  setDateOpen(true);
                  // Try to focus the input for accessibility
                  try { document.getElementById('moving-date')?.focus(); } catch {}
                  return;
                }
                router.push('/pricing');
              }}
              disabled={!movingDate}
            >
              Continue to Pricing
            </Button>
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
