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
import { useQuoteOption } from '@/contexts/QuoteOptionContext';
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
import { Calendar as CalendarIcon, Truck, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function PickupDropoffPage() {
  const router = useRouter();
  const { getTotalVolume, items } = useCart();
  const booking = useBooking();
  const { option } = useQuoteOption();
  const { vehicle, schedule, pricing, updateVehicle, updateSchedule, updatePricing, isHydrated } = booking;
  const selectedVan = vehicle.selectedVan;
  const driverCount = vehicle.driverCount;
  const timeSlot = schedule.timeSlot;
  const pricingData = pricing.pickUpDropOffPrice;
  const setVan = (van: VanType) => updateVehicle({ selectedVan: van });
  const setDriverCount = (count: number) => updateVehicle({ driverCount: Math.max(1, Math.min(3, Math.floor(count))) });
  const setTimeSlot = (slot: 'morning' | 'afternoon' | 'evening') => updateSchedule({ timeSlot: slot });
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [movingDate, setMovingDate] = React.useState<string>('');
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [selectedTier, setSelectedTier] = React.useState<'standard' | 'premium'>('standard');
 
 

  React.useEffect(() => {
    if (!hasInventory(items.length)) router.replace('/inventory');
    
    // If this is a send/receive quote but no pricing data is available, redirect back to inventory
    if ((option === 'send' || option === 'receive') && isHydrated && !pricingData) {
      console.log('Missing pricing data for send/receive quote, redirecting to inventory');
      router.replace('/inventory');
    }
  }, [items.length, router, option, isHydrated, pricingData]);

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
      const schedule = { movingDate, timeSlot };
      localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {}
  }, [movingDate, timeSlot]);

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
          
          {/* Pricing Display - Only show for send/receive quote options */}
          {(option === 'send' || option === 'receive') && pricingData && (
            <Card className="border-primary-200 bg-primary-50/30">
              <CardHeader>
                <CardTitle className="text-primary-700 text-base flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Pickup & Dropoff Service Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Standard Tier */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTier === 'standard' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTier('standard')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <RadioGroup value={selectedTier} onValueChange={(value: 'standard' | 'premium') => setSelectedTier(value)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-semibold text-lg">Standard Service</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-700">
                          £{pricingData.standard.customerTotal.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">inc. VAT</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base Service:</span>
                        <span>£{pricingData.standard.base.toFixed(0)}</span>
                      </div>
                      {pricingData.standard.volumeSurcharge > 0 && (
                        <div className="flex justify-between">
                          <span>Volume Surcharge:</span>
                          <span>£{pricingData.standard.volumeSurcharge.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Crew ({pricingData.standard.requestedMovers} movers):</span>
                        <span>£{pricingData.standard.crewFee.toFixed(0)}</span>
                      </div>
                      {pricingData.standard.stairsFee > 0 && (
                        <div className="flex justify-between">
                          <span>Stairs Fee:</span>
                          <span>£{pricingData.standard.stairsFee.toFixed(0)}</span>
                        </div>
                      )}
                      {pricingData.standard.longCarryFee > 0 && (
                        <div className="flex justify-between">
                          <span>Long Carry Fee:</span>
                          <span>£{pricingData.standard.longCarryFee.toFixed(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Premium Tier */}
                  <div 
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTier === 'premium' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTier('premium')}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <RadioGroup value={selectedTier} onValueChange={(value: 'standard' | 'premium') => setSelectedTier(value)}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="premium" id="premium" />
                            <Label htmlFor="premium" className="font-semibold text-lg">Premium Service</Label>
                          </div>
                        </RadioGroup>
                        <Badge variant="secondary" className="text-xs">RECOMMENDED</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-700">
                          £{pricingData.premium.customerTotal.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-600">inc. VAT</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Premium Base Service:</span>
                        <span>£{(pricingData.premium.base + pricingData.premium.tierUplift).toFixed(0)}</span>
                      </div>
                      {pricingData.premium.volumeSurcharge > 0 && (
                        <div className="flex justify-between">
                          <span>Volume Surcharge:</span>
                          <span>£{pricingData.premium.volumeSurcharge.toFixed(0)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Crew ({pricingData.premium.requestedMovers} movers):</span>
                        <span>£{pricingData.premium.crewFee.toFixed(0)}</span>
                      </div>
                      {pricingData.premium.assemblyFee > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>✓ Assembly Included:</span>
                          <span>£0</span>
                        </div>
                      )}
                      {pricingData.premium.dismantleFee > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>✓ Dismantle Included:</span>
                          <span>£0</span>
                        </div>
                      )}
                      {pricingData.premium.stairsFee > 0 && (
                        <div className="flex justify-between">
                          <span>Stairs Fee:</span>
                          <span>£{pricingData.premium.stairsFee.toFixed(0)}</span>
                        </div>
                      )}
                      {pricingData.premium.longCarryFee > 0 && (
                        <div className="flex justify-between">
                          <span>Long Carry Fee:</span>
                          <span>£{pricingData.premium.longCarryFee.toFixed(0)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Total Volume: {pricingData.standard.totalVolumeM3.toFixed(2)} m³ • 
                  Distance: {booking.customer?.distanceMiles || 0} miles
                </div>
              </CardContent>
            </Card>
          )}

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

              {/* Show crew recommendation if pricing data available */}
              {pricingData && pricingData[selectedTier]?.crewRuleReasons?.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-800 text-sm font-medium mb-1">
                    <Users className="h-4 w-4" />
                    Recommended: {pricingData[selectedTier].recommendedMinimumMovers} movers
                  </div>
                  <div className="text-blue-700 text-sm">
                    {pricingData[selectedTier].crewRuleReasons?.join(', ')}
                  </div>
                </div>
              )}

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
              </div>

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
                
                // Save the selected pricing tier to context if pricing data is available
                if (pricingData && (option === 'send' || option === 'receive')) {
                  const selectedPricing = pricingData[selectedTier];
                  updateSchedule({ 
                    dateISO: new Date(movingDate).toISOString(),
                  });
                  // Store the selected tier pricing information
                  updatePricing({ 
                    pickUpDropOffPrice: pricingData,
                    pricingTier: selectedTier,
                    totalCost: selectedPricing.customerTotal
                  });
                  // Update crew count to match the recommended or selected count
                  updateVehicle({ 
                    driverCount: Math.max(driverCount, selectedPricing.recommendedMinimumMovers)
                  });
                }
                
                router.push('/origin-destination');
              }}
              disabled={!movingDate}
            >
              Next: Addresses
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
