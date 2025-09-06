"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { useRouter } from 'next/navigation';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';
import { Users, User, Wrench, Calculator, Check, Clock, Star, Truck } from 'lucide-react';
import Footer from '@/components/Footer';
import type { RemovalPricingDto, CachedRemovalPricing } from '@/types/booking';

// Utility function to check if cached removal pricing is still valid
function isCachedRemovalPricingValid(cached: CachedRemovalPricing | undefined): boolean {
  if (!cached) return false;
  
  const now = new Date();
  const lastFetched = new Date(cached.lastFetched);
  const maxAgeMs = cached.maxAge * 1000;
  
  return (now.getTime() - lastFetched.getTime()) < maxAgeMs;
}

export default function PricingPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();
  
  // Get data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const items = activeQuote?.items || [];
  
  // Crew size and service state
  const [selectedCrewSize, setSelectedCrewSize] = React.useState<number>(2);
  
  // Use quote data from backend instead of local state
  const selectedTier = activeQuote?.pricingTier;
  const dismantleCount = activeQuote?.numberOfItemsToDismantle || 0;
  const assemblyCount = activeQuote?.numberOfItemsToAssemble || 0;
  
  // Pricing state
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [pricingData, setPricingData] = React.useState<RemovalPricingDto | null>(null);
  const [pricingError, setPricingError] = React.useState<string | null>(null);
  const [etag, setEtag] = React.useState<string>('');

  // Get dynamic prices from backend data
  const dismantlePrice = React.useMemo(() => {
    return pricingData?.extraPrice?.dismantle?.price;
  }, [pricingData]);

  const assemblyPrice = React.useMemo(() => {
    return pricingData?.extraPrice?.assembly?.price;
  }, [pricingData]);

  // Get dynamic service features
  const standardFeatures = React.useMemo(() => {
    if (!pricingData) return [];
    return pricingData.rates.standardServiceTexts?.map(feature => feature.text) || [];
  }, [pricingData]);

  const premiumFeatures = React.useMemo(() => {
    if (!pricingData) return [];
    return pricingData.rates.premiumServiceTexts?.map(feature => feature.text) || [];
  }, [pricingData]);

  // Get dynamic service descriptions
  const dismantleDescription = React.useMemo(() => {
    return pricingData?.extraPrice?.dismantle?.description || 'Dismantling service';
  }, [pricingData]);

  const assemblyDescription = React.useMemo(() => {
    return pricingData?.extraPrice?.assembly?.description || 'Assembly service';
  }, [pricingData]);

  // Helper function to get hourly rate based on crew size and service level
  const getHourlyRate = React.useCallback((crewSize: number, serviceLevel: 'standard' | 'premium') => {
    if (!pricingData) return 0;
    
    let crewRates;
    switch (crewSize) {
      case 1:
        crewRates = pricingData.rates.one;
        break;
      case 2:
        crewRates = pricingData.rates.two;
        break;
      case 3:
        crewRates = pricingData.rates.three;
        break;
      default:
        return 0;
    }
    
    const rateLeaf = serviceLevel === 'premium' ? crewRates.premium : crewRates.standard;
    return rateLeaf?.hourlyAfter || 0;
  }, [pricingData]);

  // Calculate total volume and recommend crew size
  const totalVolume = React.useMemo(() => {
    return items.reduce((total, item) => {
      const itemVolume = (item.lengthCm * item.widthCm * item.heightCm * item.quantity) / 1000000;
      return total + itemVolume;
    }, 0);
  }, [items]);

  const recommendedCrewSize = React.useMemo(() => {
    if (totalVolume >= 8.0) return 3;
    if (totalVolume >= 3.0) return 2;
    return 1;
  }, [totalVolume]);

  // Calculate pricing based on current selections
  const calculateCurrentPricing = React.useCallback(() => {
    if (!pricingData || !selectedCrewSize) return null;

    try {
      // Get dynamic hours from backend data
      const getHoursForCrewAndService = (crewSize: number, serviceLevel: 'standard' | 'premium') => {
        let crewRates;
        switch (crewSize) {
          case 1:
            crewRates = pricingData.rates.one;
            break;
          case 2:
            crewRates = pricingData.rates.two;
            break;
          case 3:
            crewRates = pricingData.rates.three;
            break;
          default:
            return 3; // fallback
        }
        
        const rateLeaf = serviceLevel === 'premium' ? crewRates.premium : crewRates.standard;
        return rateLeaf?.baseBlockHours || 4; // fallback to 4 if not available
      };

      const standardHours = getHoursForCrewAndService(selectedCrewSize, 'standard');
      const premiumHours = getHoursForCrewAndService(selectedCrewSize, 'premium');

      // Get pickUpDropOff data for current crew size and tier
      const getPickUpDropOffData = (crewSize: number, serviceLevel: 'standard' | 'premium') => {
        let crewRates;
        switch (crewSize) {
          case 1:
            crewRates = pricingData.rates.one;
            break;
          case 2:
            crewRates = pricingData.rates.two;
            break;
          case 3:
            crewRates = pricingData.rates.three;
            break;
          default:
            return null;
        }
        
        const rateLeaf = serviceLevel === 'premium' ? crewRates.premium : crewRates.standard;
        return rateLeaf?.pickUpDropOff;
      };

      const standardPickUpDropOff = getPickUpDropOffData(selectedCrewSize, 'standard');
      const premiumPickUpDropOff = getPickUpDropOffData(selectedCrewSize, 'premium');

      if (!standardPickUpDropOff || !premiumPickUpDropOff) return null;

      // Calculate additional service costs - only for Standard tier
      let standardDismantleCost = 0;
      let standardAssemblyCost = 0;
      let premiumDismantleCost = 0;
      let premiumAssemblyCost = 0;
      
      // Standard tier: add dismantle and assembly costs
      standardDismantleCost = dismantleCount * (dismantlePrice || 0);
      standardAssemblyCost = assemblyCount * (assemblyPrice || 0);
      
      // Premium tier: dismantle and assembly costs are already included in base price
      // So they remain 0

      return {
        standard: {
          basePrice: standardPickUpDropOff.totalExVat, // Use totalExVat as base price (before VAT)
          totalPrice: standardPickUpDropOff.customerTotal + standardDismantleCost + standardAssemblyCost,
          dismantleCost: standardDismantleCost,
          assemblyCost: standardAssemblyCost,
          pickUpDropOff: standardPickUpDropOff
        },
        premium: {
          basePrice: premiumPickUpDropOff.totalExVat, // Use totalExVat as base price (before VAT)
          totalPrice: premiumPickUpDropOff.customerTotal + premiumDismantleCost + premiumAssemblyCost,
          dismantleCost: premiumDismantleCost, // Always 0 for premium
          assemblyCost: premiumAssemblyCost, // Always 0 for premium
          pickUpDropOff: premiumPickUpDropOff
        }
      };
    } catch (error) {
      console.error('❌ Error calculating current pricing:', error);
      return null;
    }
  }, [pricingData, selectedCrewSize, dismantleCount, assemblyCount, dismantlePrice, assemblyPrice]);

  // Fetch pricing data
  const fetchPricingData = React.useCallback(async () => {
    if (!activeQuote?.items || activeQuote.items.length === 0) {
      router.push('/inventory');
      return;
    }

    setIsCalculating(true);
    setPricingError(null);

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (etag) {
        headers['If-Match'] = etag;
      }

      const response = await fetch(`http://localhost:5247/api/v1/prices`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          distanceMiles: activeQuote.distanceMiles || 0,
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
          parkingFee: 0, // Default value
          ulezFee: 0, // Default value
          vatRegistered: true // Default value
        })
      });

      if (response.status === 304) {
        console.log('✅ Pricing data unchanged, using cached version');
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: RemovalPricingDto = await response.json();
      
      // Create cached data and save to quote context
      if (activeQuoteType) {
        const cachedPricing = {
          data,
          etag: data.version,
          lastFetched: new Date().toISOString(),
          maxAge: 21600 // 6 hours in seconds
        };
        
        try {
          await updateQuote(activeQuoteType, { removalPricing: cachedPricing });
        } catch (error) {
          console.error('❌ Error calling updateQuote:', error);
        }
      }
      
      setPricingData(data);
      setEtag(data.version);

      console.log('✅ Pickup/Dropoff pricing data fetched and cached successfully:', data);
    } catch (error) {
      if (error instanceof Error && error.message === 'NotModified') {
        console.log('✅ Pricing data unchanged, using cached version');
        return;
      }

      console.error('❌ Error fetching pickup/dropoff pricing:', error);
      setPricingError('Failed to fetch pricing data. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  }, [activeQuote, etag, activeQuoteType, updateQuote, router]);

  // Load cached data and fetch pricing data if needed
  React.useEffect(() => {
    if (isHydrated && activeQuote?.items && activeQuote.items.length > 0) {
      // Check if we have valid cached data first
      const cachedPricing = activeQuote.removalPricing;
      
      if (cachedPricing && isCachedRemovalPricingValid(cachedPricing)) {
        console.log('✅ Using cached pickup/dropoff pricing data');
        setPricingData(cachedPricing.data);
        setEtag(cachedPricing.etag);
      } else {
        console.log('🚀 Calling fetchPricingData...');
        fetchPricingData();
      }
    } else if (isHydrated && activeQuoteType && (!activeQuote?.items || activeQuote.items.length === 0)) {
      // If hydrated but no items, redirect to inventory
      router.push('/inventory');
    }
  }, [isHydrated, activeQuote, fetchPricingData, activeQuoteType, router]);

  // Reset tier selection when services or crew size changes
  React.useEffect(() => {
    if (activeQuoteType && activeQuote?.pricingTier && !isSettingTier.current && !isNavigating.current) {
      console.log('🔄 Resetting pricing tier due to changes:', {
        numberOfItemsToDismantle: activeQuote?.numberOfItemsToDismantle,
        numberOfItemsToAssemble: activeQuote?.numberOfItemsToAssemble,
        selectedCrewSize,
        currentPricingTier: activeQuote?.pricingTier,
        isSettingTier: isSettingTier.current,
        isNavigating: isNavigating.current
      });
      
      // Reset pricing tier when services/crew change
      updateQuote(activeQuoteType, {
        pricingTier: undefined
      });
    }
  }, [activeQuote?.numberOfItemsToDismantle, activeQuote?.numberOfItemsToAssemble, selectedCrewSize, activeQuoteType, updateQuote]);

  // Load existing data from quote context
  React.useEffect(() => {
    if (isHydrated && activeQuote) {
      setSelectedCrewSize(activeQuote.driverCount || recommendedCrewSize);
    }
  }, [isHydrated, activeQuote, recommendedCrewSize]);

  // Track if we're setting a tier to prevent reset interference
  const isSettingTier = React.useRef(false);
  // Track if we're about to navigate to prevent reset interference
  const isNavigating = React.useRef(false);
  
  // Handle tier selection
  const handleTierSelect = React.useCallback((tier: 'standard' | 'premium') => {
    if (!activeQuoteType) return;
    
    console.log('🎯 handleTierSelect called with tier:', tier);
    
    // Set flag to prevent reset interference
    isSettingTier.current = true;
    
    // Calculate total cost for selected tier
    const currentPricing = calculateCurrentPricing();
    if (!currentPricing) {
      console.log('❌ No current pricing available');
      isSettingTier.current = false;
      return;
    }
    
    const selectedPricing = tier === 'premium' ? currentPricing.premium : currentPricing.standard;
    const totalCost = selectedPricing.totalPrice;
    
    console.log('💰 Selected pricing:', {
      tier,
      totalCost,
      selectedPricing
    });
    
    // Update quote with new tier and total cost
    updateQuote(activeQuoteType, {
      pricingTier: tier,
      totalCost: totalCost
    });
    
    console.log('✅ Quote updated with tier:', tier, 'and totalCost:', totalCost);
    
    // Reset flag after a short delay
    setTimeout(() => {
      isSettingTier.current = false;
    }, 100);
  }, [activeQuoteType, calculateCurrentPricing, updateQuote]);

  // Handle crew size selection
  const handleCrewSizeChange = (size: number) => {
    setSelectedCrewSize(size);
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { driverCount: size });
    }
  };

  // Handle service quantity changes
  const handleDismantleChange = (count: number) => {
    if (!activeQuoteType) return;
    
    const newCount = Math.max(0, count);
    updateQuote(activeQuoteType, {
      numberOfItemsToDismantle: newCount
    });
  };

  const handleAssemblyChange = (count: number) => {
    if (!activeQuoteType) return;
    
    const newCount = Math.max(0, count);
    updateQuote(activeQuoteType, {
      numberOfItemsToAssemble: newCount
    });
  };

  // Handle continue to next step
  const handleContinue = () => {
    if (!selectedCrewSize || !selectedTier) return;

    // Set navigation flag to prevent tier reset
    isNavigating.current = true;

    // Save the current selections to the quote context
    if (activeQuoteType) {
      updateQuote(activeQuoteType, {
        driverCount: selectedCrewSize,
        numberOfItemsToDismantle: dismantleCount,
        numberOfItemsToAssemble: assemblyCount,
        pricingTier: selectedTier,
        totalCost: activeQuote?.totalCost
      });
    }

    router.push('/origin-destination');
  };

  // Check if this is a send/receive quote
  const isSendReceiveQuote = (activeQuoteType === 'send' || activeQuoteType === 'receive');

  // Validate quote type only (pricing doesn't require inventory for send/receive)
  React.useEffect(() => {
    if (isHydrated && !isSendReceiveQuote) {
      if (activeQuoteType === 'removals') {
        router.replace('/removal-pricing');
      } else {
        router.replace('/origin-destination');
      }
    }
  }, [isHydrated, isSendReceiveQuote, activeQuoteType, router]);

  // Show loading while checking quote type only
  if (!isHydrated || !isSendReceiveQuote) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <StreamlinedHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading crew selection...</p>
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
              <QuoteReferenceBanner variant="minimal" />
            </div>

            {/* Crew Size Selection */}
            <div className="space-y-4">
              <RadioGroup value={selectedCrewSize.toString()} onValueChange={(value) => handleCrewSizeChange(parseInt(value))}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <RadioGroupItem value="1" id="crew-1" className="sr-only" />
                    <Label
                      htmlFor="crew-1"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-4 sm:p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${selectedCrewSize === 1 ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-5 w-5 text-primary fill-primary" />
                        <div className="text-lg sm:text-xl font-bold">1 Mover</div>
                      </div>
                      <span className="text-xs text-muted-foreground text-center mt-1 px-2">
                        Driver only. Customer expected to lift, load, and unload.
                      </span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="2" id="crew-2" className="sr-only" />
                    <Label
                      htmlFor="crew-2"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-4 sm:p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${selectedCrewSize === 2 ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <User className="h-5 w-5 text-primary fill-primary" />
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-lg sm:text-xl font-bold">2 Movers</div>
                      </div>
                      <span className="text-xs text-muted-foreground text-center mt-1 px-2">
                        Driver & mate. Recommended for most moves.
                      </span>
                    </Label>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <RadioGroupItem value="3" id="crew-3" className="sr-only" />
                    <Label
                      htmlFor="crew-3"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-4 sm:p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${selectedCrewSize === 3 ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <User className="h-5 w-5 text-primary fill-primary" />
                          <User className="h-5 w-5 text-primary" />
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-lg sm:text-xl font-bold">3 Movers</div>
                      </div>
                      <span className="text-xs text-muted-foreground text-center mt-1 px-2">
                        Driver & 2 mates. For large or complex moves.
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Combined Layout: Services on Left, Pricing on Right */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Side: Dismantle & Assembly Services */}
              <div className="space-y-6">
                {/* Combined Dismantle & Assembly Services Card */}
                <Card className="border-2 border-gray-200 bg-white shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                      <Wrench className="h-6 w-6 text-primary" />
                      Additional Services
                    </CardTitle>
                    <p className="text-gray-600 text-sm">
                      Configure additional services for your move
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Dismantle Service Section */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Dismantle Service</h4>
                            <p className="text-md text-gray-600">
                              {dismantlePrice ? `£${dismantlePrice.toFixed(2)} per item` : 'Price not available'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 justify-center sm:justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDismantleChange(dismantleCount - 1)}
                            disabled={dismantleCount <= 0}
                            className="w-8 h-8 rounded-full"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={dismantleCount}
                            onChange={(e) => handleDismantleChange(parseInt(e.target.value) || 0)}
                            className="w-16 text-center text-sm font-medium"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDismantleChange(dismantleCount + 1)}
                            className="w-8 h-8 rounded-full"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      {dismantleCount > 0 && (
                        <div className="ml-0 sm:ml-6 p-3 bg-orange-50 rounded-md border border-orange-200">
                          <div className="text-lg font-bold text-orange-700">
                            {dismantlePrice ? `£${(dismantleCount * dismantlePrice).toFixed(2)}` : 'Price not available'}
                          </div>
                          <div className="text-sm text-orange-600">Total Dismantle Cost</div>
                        </div>
                      )}
                      <p className="text-sm text-gray-600 ml-0 sm:ml-6 px-4 sm:px-0">
                        {dismantleDescription}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Assembly Service Section */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Assembly Service</h4>
                            <p className="text-md text-gray-600">
                              {assemblyPrice ? `£${assemblyPrice.toFixed(2)} per item` : 'Price not available'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 justify-center sm:justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAssemblyChange(assemblyCount - 1)}
                            disabled={assemblyCount <= 0}
                            className="w-8 h-8 rounded-full"
                          >
                            -
                          </Button>
                          <Input
                            type="number"
                            value={assemblyCount}
                            onChange={(e) => handleAssemblyChange(parseInt(e.target.value) || 0)}
                            className="w-16 text-center text-sm font-medium"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAssemblyChange(assemblyCount + 1)}
                            className="w-8 h-8 rounded-full"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      {assemblyCount > 0 && (
                        <div className="ml-0 sm:ml-6 p-3 bg-blue-50 rounded-md border border-blue-200">
                          <div className="text-lg font-bold text-blue-700">
                            {assemblyPrice ? `£${(assemblyCount * assemblyPrice).toFixed(2)}` : 'Price not available'}
                          </div>
                          <div className="text-sm text-blue-600">Total Assembly Cost</div>
                        </div>
                      )}
                      <p className="text-sm text-gray-600 ml-0 sm:ml-6 px-4 sm:px-0">
                        {assemblyDescription}
                      </p>
                    </div>

                    {/* Total Additional Services Cost */}
                    {(dismantleCount > 0 || assemblyCount > 0) && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 p-3 bg-gray-50 rounded-md">
                          <span className="font-semibold text-gray-900 text-center sm:text-left">Total Additional Services:</span>
                          <span className="text-xl font-bold text-primary text-center sm:text-right">
                            {dismantlePrice && assemblyPrice ? 
                              `£${((dismantleCount * dismantlePrice) + (assemblyCount * assemblyPrice)).toFixed(2)}` : 
                              'Prices not available'
                            }
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Side: Pricing Options */}
              {pricingData && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Standard Tier */}
                    <Card 
                      className={`border-2 transition-all duration-200 cursor-pointer transform ${
                        selectedTier === 'standard' 
                          ? 'border-primary bg-blue-50 shadow-lg scale-[1.02]' 
                          : 'border-gray-200 hover:border-primary hover:shadow-md hover:scale-[1.01]'
                      }`}
                      onClick={() => handleTierSelect('standard')}
                    >
                      <CardHeader className={`transition-colors duration-200 ${
                        selectedTier === 'standard' ? 'bg-blue-100' : 'bg-gray-50'
                      }`}>
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>Standard</span>
                          <div className="flex items-center gap-2">
                            {selectedTier === 'standard' && (
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                            <Badge variant="secondary">Most Popular</Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {/* Total Price - Moved to top */}
                        {(() => {
                          const currentPricing = calculateCurrentPricing();
                          if (!currentPricing) return null;

                          return (
                            <div className="text-center mb-6">
                              <div className="text-2xl sm:text-3xl font-bold text-primary">
                                £{currentPricing.standard.totalPrice.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">Total Price (inc. VAT)</div>
                            </div>
                          );
                        })()}

                        {/* Separator Line */}
                        <div className="border-t border-gray-200 mb-6"></div>

                        <ul className="space-y-2 mb-4">
                          {standardFeatures.length > 0 ? (
                            standardFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-center gap-2">
                              <span className="text-gray-400">No service features available</span>
                            </li>
                          )}
                        </ul>

                        {/* Pricing Breakdown */}
                        {(() => {
                          const currentPricing = calculateCurrentPricing();
                          if (!currentPricing) return null;

                          return (
                            <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                              <div className="flex justify-between text-sm">
                                <span>Base Price:</span>
                                <span>£{currentPricing.standard.basePrice.toFixed(2)}</span>
                              </div>
                              {dismantleCount > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Dismantle ({dismantleCount} items):</span>
                                  <span>£{currentPricing.standard.dismantleCost.toFixed(2)}</span>
                                </div>
                              )}
                              {assemblyCount > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Assembly ({assemblyCount} items):</span>
                                  <span>£{currentPricing.standard.assemblyCost.toFixed(2)}</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>

                    {/* Premium Tier */}
                    <Card 
                      className={`border-2 transition-all duration-200 cursor-pointer transform ${
                        selectedTier === 'premium' 
                          ? 'border-primary bg-purple-50 shadow-lg scale-[1.02]' 
                          : 'border-gray-200 hover:border-primary hover:shadow-md hover:scale-[1.01]'
                      }`}
                      onClick={() => handleTierSelect('premium')}
                    >
                      <CardHeader className={`transition-colors duration-200 ${
                        selectedTier === 'premium' ? 'bg-purple-100' : 'bg-purple-50'
                      }`}>
                        <CardTitle className="text-lg text-purple-900 flex items-center justify-between">
                          <span>Premium</span>
                          <div className="flex items-center gap-2">
                            {selectedTier === 'premium' && (
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                            <Badge variant="default" className="bg-purple-600">Best Value</Badge>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        {/* Total Price - Moved to top */}
                        {(() => {
                          const currentPricing = calculateCurrentPricing();
                          if (!currentPricing) return null;

                          return (
                            <div className="text-center mb-6">
                              <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                                £{currentPricing.premium.totalPrice.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">Total Price (inc. VAT)</div>
                            </div>
                          );
                        })()}

                        {/* Separator Line */}
                        <div className="border-t border-gray-200 mb-6"></div>

                        <ul className="space-y-2 mb-4">
                          {premiumFeatures.length > 0 ? (
                            premiumFeatures.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <span className="text-green-500">✓</span>
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-center gap-2">
                              <span className="text-gray-400">No service features available</span>
                            </li>
                          )}
                        </ul>

                        {/* Pricing Breakdown */}
                        {(() => {
                          const currentPricing = calculateCurrentPricing();
                          if (!currentPricing) return null;

                          return (
                            <div className="space-y-2 p-3 bg-purple-50 rounded-md">
                              <div className="flex justify-between text-sm">
                                <span>Base Price:</span>
                                <span>£{currentPricing.premium.basePrice.toFixed(2)}</span>
                              </div>
                              {dismantleCount > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Dismantle ({dismantleCount} items):</span>
                                  <span>£{currentPricing.premium.dismantleCost.toFixed(2)}</span>
                                </div>
                              )}
                              {assemblyCount > 0 && (
                                <div className="flex justify-between text-sm">
                                  <span>Assembly ({assemblyCount} items):</span>
                                  <span>£{currentPricing.premium.assemblyCost.toFixed(2)}</span>
                                </div>
                              )}
                            </div>
                          );
                        })()}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {pricingError && (
              <div className="rounded-md border border-red-200 bg-red-50 p-4">
                <div className="flex items-center gap-2">
                  <div className="text-red-900 font-semibold text-sm">
                    Pricing Error
                  </div>
                </div>
                <div className="text-red-800 text-sm mt-1">
                  {pricingError}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchPricingData}
                  className="mt-2"
                >
                  Retry Fetch
                </Button>
              </div>
            )}

            {/* Loading State for Pricing */}
            {isCalculating && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Fetching pricing data...</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
              <Button
                variant="outline"
                onClick={() => router.push('/inventory')}
                className="w-full sm:w-auto px-6 py-2 text-base"
              >
                ← Back to Inventory
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!selectedCrewSize || !selectedTier || isCalculating}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-8 py-2 text-base font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Origin & Destination →
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
