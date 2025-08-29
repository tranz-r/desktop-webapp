"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import VanCard from '@/components/van/VanCard';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
 
import { useQuote } from '@/contexts/QuoteContext';
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

import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';

export default function RemovalsPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();
  
  // Get data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const items = activeQuote?.items || [];
  
  const selectedVan = activeQuote?.vanType;
  const timeSlot = activeQuote?.timeSlot;
  
  // Helper functions to update quote data
  const setVan = React.useCallback((van: VanType) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { vanType: van });
    }
  }, [activeQuoteType, updateQuote]);
  
  const setTimeSlot = React.useCallback((slot: 'morning' | 'afternoon' | 'evening') => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { timeSlot: slot });
    }
  }, [activeQuoteType, updateQuote]);
  
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [movingDate, setMovingDate] = React.useState<string>('');
  const [dateOpen, setDateOpen] = React.useState(false);
  const [dateError, setDateError] = React.useState<string | null>(null);

  // Validate quote type and inventory
  React.useEffect(() => {
    if (isHydrated && activeQuoteType !== 'removals') {
      router.replace('/quote-option');
      return;
    }
    
    if (!hasInventory(items.length)) {
      router.replace('/inventory');
      return;
    }
  }, [isHydrated, activeQuoteType, items.length, router]);

  // Calculate total volume from items
  const totalVolume = React.useMemo(() => {
    return items.reduce((total, item) => {
      const itemVolume = (item.lengthCm * item.widthCm * item.heightCm * item.quantity) / 1000000; // Convert to m³
      return total + itemVolume;
    }, 0);
  }, [items]);
  
  const recommended = React.useMemo(() => recommendVanByVolume(totalVolume), [totalVolume]);

  React.useEffect(() => {
    // Auto-select the available van (3.5 Luton Van with Tail Lift) after hydration
    if (isHydrated && !selectedVan) setVan('largeVan');
  }, [isHydrated, selectedVan, setVan]);

  // Rehydrate moving date from schedule if available
  React.useEffect(() => {
    if (isHydrated && !movingDate && activeQuote?.collectionDate) {
      try {
        const d = new Date(activeQuote.collectionDate);
        if (!isNaN(d.getTime())) {
          setMovingDate(format(d, 'yyyy-MM-dd'));
        }
      } catch (error) {
        console.error('Error parsing collection date:', error);
      }
    }
  }, [isHydrated, movingDate, activeQuote?.collectionDate]);

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setMovingDate(formattedDate);
      
      if (activeQuoteType) {
        updateQuote(activeQuoteType, { collectionDate: date.toISOString() });
      }
      
      setDateOpen(false);
      setDateError(null);
    }
  };

  // Handle continue to next step
  const handleContinue = () => {
    if (!selectedVan) {
      setDateError('Please select a van type');
      return;
    }
    
    if (!movingDate) {
      setDateError('Please select a moving date');
      return;
    }
    
    if (!timeSlot) {
      setDateError('Please select a time slot');
      return;
    }
    
    // Navigate to removal-pricing (crew size selection)
    router.push('/removal-pricing');
  };

  // Show loading while checking quote type and inventory
  if (!isHydrated || activeQuoteType !== 'removals' || !hasInventory(items.length)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StreamlinedHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading removals configuration...</p>
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
            
            {/* Quote Reference Banner */}
            <div className="flex justify-center">
              <QuoteReferenceBanner variant="subtle" />
            </div>
            
            {/* Service Info */}
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-blue-900 text-xl font-bold flex items-center gap-2">
                  🚚 Removals Service
                </CardTitle>
                <p className="text-blue-800 text-base leading-relaxed">
                  Configure your removal service with van selection and scheduling. Crew size selection will be handled in the next step.
                </p>
              </CardHeader>
            </Card>

            {/* Van Selection */}
            <Card className="border-primary-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-primary-700 text-lg font-semibold flex items-center gap-2">
                  🚐 Van Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border">
                  Based on <span className="font-semibold">{totalVolume.toFixed(3)} m³</span>, we recommend the <span className="font-semibold text-primary-700">{VAN_TABLE[recommended].name}</span>.
                </div>

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
              </CardContent>
            </Card>

            {/* Date and Time Selection */}
            <Card className="border-primary-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-primary-700 text-lg font-semibold flex items-center gap-2">
                  📅 Date & Time
                </CardTitle>
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
                          onSelect={handleDateSelect}
                          disabled={{ before: new Date() }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    {dateError && (
                      <p id="moving-date-error" className="text-sm text-red-600">{dateError}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">Preferred Time Slot</Label>
                  <RadioGroup value={timeSlot || 'morning'} onValueChange={(v: string) => {
                    const newTimeSlot = v as 'morning' | 'afternoon' | 'evening';
                    setTimeSlot(newTimeSlot);
                  }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all cursor-pointer hover:border-primary/50 ${
                      timeSlot === 'morning' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value="morning" id="slot-morning" />
                      <Label htmlFor="slot-morning" className="cursor-pointer font-medium">
                        <div className="font-semibold text-gray-900">Morning</div>
                        <div className="text-sm text-gray-600">8:00 - 12:00</div>
                      </Label>
                    </div>
                    <div className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all cursor-pointer hover:border-primary/50 ${
                      timeSlot === 'afternoon' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value="afternoon" id="slot-afternoon" />
                      <Label htmlFor="slot-afternoon" className="cursor-pointer font-medium">
                        <div className="font-semibold text-gray-900">Afternoon</div>
                        <div className="text-sm text-gray-600">12:00 - 16:00</div>
                      </Label>
                    </div>
                    <div className={`flex items-center gap-3 rounded-lg border-2 p-4 transition-all cursor-pointer hover:border-primary/50 ${
                      timeSlot === 'evening' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'
                    }`}>
                      <RadioGroupItem value="evening" id="slot-evening" />
                      <Label htmlFor="slot-evening" className="cursor-pointer font-medium">
                        <div className="font-semibold text-gray-900">Evening</div>
                        <div className="text-sm text-gray-600">16:00 - 20:00</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
              <Button
                variant="outline"
                onClick={() => router.push('/inventory')}
                className="px-6 py-2 text-base"
              >
                ← Back to Inventory
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={!selectedVan || !movingDate || !timeSlot}
                className="bg-primary hover:bg-primary/90 px-8 py-2 text-base font-medium shadow-sm"
              >
                Continue to Crew Selection →
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
