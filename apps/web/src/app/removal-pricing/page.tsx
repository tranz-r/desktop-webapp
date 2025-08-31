"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/contexts/QuoteContext';

import { Users, Wrench, Calculator, Info, Clock, PoundSterling } from 'lucide-react';
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';
import {
  fetchRemovalPricing,
  calculateTotalPrice
} from '@/lib/api/removal-pricing';
import type { RemovalPricingDto, CachedRemovalPricing } from '@/types/booking';

// Utility function to check if cached removal pricing is still valid
function isCachedRemovalPricingValid(cached: CachedRemovalPricing | undefined): boolean {
  if (!cached) return false;
  
  const now = new Date();
  const lastFetched = new Date(cached.lastFetched);
  const maxAgeMs = cached.maxAge * 1000;
  
  return (now.getTime() - lastFetched.getTime()) < maxAgeMs;
}

export default function RemovalPricingPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();

  // Get data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const items = activeQuote?.items || [];
  
  // Debug logging
  console.log('🔍 RemovalPricingPage render:', {
    isHydrated,
    activeQuoteType,
    hasActiveQuote: !!activeQuote,
    itemsLength: items.length,
    quotes: Object.keys(quotes),
    activeQuoteKeys: activeQuote ? Object.keys(activeQuote) : [],
    hasRemovalPricing: activeQuote?.removalPricing ? 'YES' : 'NO'
  });

  // Crew size and service state
  const [selectedCrewSize, setSelectedCrewSize] = React.useState<number>(2);
  
  // Use quote data from backend instead of local state
  const selectedTier = activeQuote?.pricingTier;
  const dismantleCount = activeQuote?.numberOfItemsToDismantle || 0;
  const assemblyCount = activeQuote?.numberOfItemsToAssemble || 0;
  
  // Debug logging for selectedTier
  React.useEffect(() => {
    console.log('🔍 selectedTier changed:', {
      selectedTier,
      activeQuotePricingTier: activeQuote?.pricingTier,
      hasActiveQuote: !!activeQuote,
      activeQuoteKeys: activeQuote ? Object.keys(activeQuote) : []
    });
  }, [selectedTier, activeQuote?.pricingTier]);



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

  // Calculate additional service costs
  const additionalServiceCosts = React.useMemo(() => {
    let total = 0;
    return total;
  }, []);

  // Validate quote type only (removal pricing doesn't require inventory)
  React.useEffect(() => {
    if (isHydrated && activeQuoteType !== 'removals') {
      router.replace('/quote-option');
      return;
    }
  }, [isHydrated, activeQuoteType, router]);

  // Load existing data from quote context
  React.useEffect(() => {
    if (isHydrated && activeQuote) {
      setSelectedCrewSize(activeQuote.driverCount || recommendedCrewSize);
    }
  }, [isHydrated, activeQuote, recommendedCrewSize]);

  // Fetch removal pricing data
  const fetchPricingData = React.useCallback(async () => {
    console.log('🚀 === fetchPricingData START ===');
    console.log('🔍 fetchPricingData called with:', {
      hasActiveQuote: !!activeQuote,
      itemsLength: items.length,
      activeQuoteType
    });
    
    if (!activeQuote) {
      console.log('⏸️ fetchPricingData early return: no activeQuote');
      return;
    }

    setIsCalculating(true);
    setPricingError(null);

    try {
      console.log('📡 Fetching removal pricing data...');
      console.log('📡 Using ETag for conditional request:', etag || 'none');

      const { data, etag: responseEtag } = await fetchRemovalPricing(etag);
      
      // Create cached data and save to quote context (storage version - no functions)
      if (activeQuoteType) {
        const cachedPricing = {
          data,
          etag: responseEtag,
          lastFetched: new Date().toISOString(),
          maxAge: 21600 // 6 hours in seconds
        };
        
        console.log('📝 Saving removalPricing to quote context:', cachedPricing);
        console.log('📝 Calling updateQuote with:', { activeQuoteType, removalPricing: cachedPricing });
        
        try {
          await updateQuote(activeQuoteType, { removalPricing: cachedPricing });
          console.log('✅ removalPricing saved to quote context');
          
          // Verify the save worked by checking the current state
          setTimeout(() => {
            console.log('🔍 Verifying save - Current quotes state:', quotes);
            console.log('🔍 Verifying save - Current activeQuote:', activeQuoteType ? quotes[activeQuoteType] : 'NO ACTIVE QUOTE');
          }, 100);
        } catch (error) {
          console.error('❌ Error calling updateQuote:', error);
        }
      }
      
      setPricingData(data);
      setEtag(responseEtag);

      console.log('✅ Removal pricing data fetched and cached successfully:', data);
      console.log('✅ New ETag received:', responseEtag);
      console.log('🚀 === fetchPricingData END ===');
    } catch (error) {
      if (error instanceof Error && error.message === 'NotModified') {
        console.log('✅ Pricing data unchanged, using cached version');
        return;
      }

      console.error('❌ Error fetching removal pricing:', error);
      setPricingError('Failed to fetch pricing data. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  }, [activeQuote, etag, activeQuoteType]); // Removed items dependency since pricing is independent

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
        return rateLeaf?.baseBlockHours || 4; // fallback to 3 if not available
      };

      const standardHours = getHoursForCrewAndService(selectedCrewSize, 'standard');
      const premiumHours = getHoursForCrewAndService(selectedCrewSize, 'premium');

      const standardPricing = calculateTotalPrice(
        selectedCrewSize,
        'standard',
        standardHours,
        dismantleCount,
        assemblyCount,
        pricingData
      );

      const premiumPricing = calculateTotalPrice(
        selectedCrewSize,
        'premium',
        premiumHours,
        dismantleCount,
        assemblyCount,
        pricingData
      );

      return {
        standard: standardPricing,
        premium: premiumPricing
      };
    } catch (error) {
      console.error('❌ Error calculating current pricing:', error);
      return null;
    }
  }, [pricingData, selectedCrewSize, dismantleCount, assemblyCount]);

  // Track if we're setting a tier to prevent reset interference
  const isSettingTier = React.useRef(false);
  
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

  // Track if we've already fetched pricing data to prevent duplicate calls
  const hasFetchedPricing = React.useRef(false);

  // Load cached data and fetch pricing data if needed
  React.useEffect(() => {
    console.log('🔍 useEffect triggered:', {
      isHydrated,
      hasActiveQuote: !!activeQuote,
      hasFetchedPricing: hasFetchedPricing.current
    });
    
    if (isHydrated && activeQuote && !hasFetchedPricing.current) {
      // Check if we have valid cached data first
      const cachedPricing = activeQuote.removalPricing;
      
      if (cachedPricing && isCachedRemovalPricingValid(cachedPricing)) {
        console.log('✅ Using cached removal pricing data');
        console.log('✅ Cache details:', {
          lastFetched: cachedPricing.lastFetched,
          maxAge: cachedPricing.maxAge,
          etag: cachedPricing.etag
        });
        setPricingData(cachedPricing.data);
        setEtag(cachedPricing.etag);
        hasFetchedPricing.current = true;
      } else {
        if (cachedPricing) {
          console.log('⏰ Cache expired or invalid:', {
            lastFetched: cachedPricing.lastFetched,
            maxAge: cachedPricing.maxAge,
            isValid: isCachedRemovalPricingValid(cachedPricing)
          });
        } else {
          console.log('📭 No cached data found');
        }
        console.log('🚀 Calling fetchPricingData...');
        hasFetchedPricing.current = true;
        fetchPricingData();
      }
    } else {
      console.log('⏸️ Skipping fetchPricingData:', {
        reason: !isHydrated ? 'not hydrated' : !activeQuote ? 'no active quote' : 'already fetched'
      });
    }
  }, [isHydrated, activeQuote, fetchPricingData]);

  // Reset tier selection when services or crew size changes
  React.useEffect(() => {
    if (activeQuoteType && activeQuote?.pricingTier && !isSettingTier.current) {
      console.log('🔄 Resetting pricing tier due to changes:', {
        numberOfItemsToDismantle: activeQuote?.numberOfItemsToDismantle,
        numberOfItemsToAssemble: activeQuote?.numberOfItemsToAssemble,
        selectedCrewSize,
        currentPricingTier: activeQuote?.pricingTier,
        isSettingTier: isSettingTier.current
      });
      
      // Reset pricing tier when services/crew change
      updateQuote(activeQuoteType, {
        pricingTier: undefined
      });
    }
  }, [activeQuote?.numberOfItemsToDismantle, activeQuote?.numberOfItemsToAssemble, selectedCrewSize, activeQuoteType, updateQuote]);

  // Recalculate pricing when selections change (no API call needed)
  React.useEffect(() => {
    // This will trigger a re-render with updated pricing
    // The calculateCurrentPricing function will be called automatically
  }, [selectedCrewSize, dismantleCount, assemblyCount]);

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

  // Handle additional service changes




  // Handle continue to next step
  const handleContinue = () => {
    if (!selectedCrewSize) return;

    // Save the current selections to the quote context
    if (activeQuoteType) {
      updateQuote(activeQuoteType, {
        driverCount: selectedCrewSize,
        numberOfItemsToDismantle: dismantleCount,
        numberOfItemsToAssemble: assemblyCount,
        // Add service level and estimated hours if you want to track them
        // pricingTier: selectedServiceLevel,
        // estimatedHours: estimatedHours
      });
    }

    router.push('/origin-destination');
  };

  // Show loading while checking quote type only
  if (!isHydrated || activeQuoteType !== 'removals') {
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
              <QuoteReferenceBanner variant="subtle" />
            </div>

            {/* Service Info */}
            {/* <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-blue-900 text-xl font-bold flex items-center gap-2">
                  👥 Crew Size & Services
                </CardTitle>
                <p className="text-blue-800 text-base leading-relaxed">
                  Select your crew size and configure additional services. Your selections will impact the final pricing.
                </p>
              </CardHeader>
            </Card> */}



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
                      <div className="text-lg sm:text-xl font-bold mb-2">1 Mover</div>
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
                      <div className="text-lg sm:text-xl font-bold mb-2">2 Movers</div>
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
                      <div className="text-lg sm:text-xl font-bold mb-2">3 Movers</div>
                      <span className="text-xs text-muted-foreground text-center mt-1 px-2">
                        Driver & 2 mates. For large or complex moves.
                      </span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>


            </div>



            {/* Dismantle & Assembly Services */}
            {/* <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                Dismantle & Assembly
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Configure professional dismantling and assembly services.
              </p>
            </div> */}

            {/* Pricing Display */}
            {/* {pricingData && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Pricing Options
                </h2>
              </div>
            )} */}

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

                        // Get dynamic hours for display
                        const getHoursForCrewAndService = (crewSize: number, serviceLevel: 'standard' | 'premium') => {
                          if (!pricingData) return 3;
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
                              return 3;
                          }
                          const rateLeaf = serviceLevel === 'premium' ? crewRates.premium : crewRates.standard;
                          return rateLeaf?.baseBlockHours || 3;
                        };

                        const standardHours = getHoursForCrewAndService(selectedCrewSize, 'standard');

                        return (
                          <div className="space-y-2 p-3 bg-gray-50 rounded-md">
                            <div className="flex justify-between text-sm">
                              <span>Base Price ({standardHours} hours):</span>
                              <span>£{currentPricing.standard.basePrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Every Additional Hour:</span>
                              <span>£{getHourlyRate(selectedCrewSize, 'standard').toFixed(2)}</span>
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

                        // Get dynamic hours for display
                        const getHoursForCrewAndService = (crewSize: number, serviceLevel: 'standard' | 'premium') => {
                          if (!pricingData) return 3;
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
                              return 3;
                          }
                          const rateLeaf = serviceLevel === 'premium' ? crewRates.premium : crewRates.standard;
                          return rateLeaf?.baseBlockHours || 3;
                        };

                        const premiumHours = getHoursForCrewAndService(selectedCrewSize, 'premium');

                        return (
                          <div className="space-y-2 p-3 bg-purple-50 rounded-md">
                            <div className="flex justify-between text-sm">
                              <span>Base Price ({premiumHours} hours):</span>
                              <span>£{currentPricing.premium.basePrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Every Additional Hour:</span>
                              <span>£{getHourlyRate(selectedCrewSize, 'premium').toFixed(2)}</span>
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
                onClick={() => router.push('/removals')}
                className="w-full sm:w-auto px-6 py-2 text-base"
              >
                ← Back to Van & Date
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
