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
import { hasInventory } from '@/lib/guards';
import { Users, Wrench, Calculator, Info, Clock, PoundSterling } from 'lucide-react';
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';
import {
  fetchRemovalPricing,
  calculateTotalPrice,
  type RemovalPricingDto
} from '@/lib/api/removal-pricing';

export default function RemovalPricingPage() {
  const router = useRouter();
  const { activeQuoteType, quotes, updateQuote, isHydrated } = useQuote();

  // Get data from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const items = activeQuote?.items || [];

  // Crew size and service state
  const [selectedCrewSize, setSelectedCrewSize] = React.useState<number>(2);
  const [dismantleCount, setDismantleCount] = React.useState<number>(0);
  const [assemblyCount, setAssemblyCount] = React.useState<number>(0);



  // Pricing state
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [pricingData, setPricingData] = React.useState<RemovalPricingDto | null>(null);
  const [pricingError, setPricingError] = React.useState<string | null>(null);
  const [etag, setEtag] = React.useState<string>('');


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

  // Load existing data from quote context
  React.useEffect(() => {
    if (isHydrated && activeQuote) {
      setSelectedCrewSize(activeQuote.driverCount || recommendedCrewSize);
      setDismantleCount(activeQuote.numberOfItemsToDismantle || 0);
      setAssemblyCount(activeQuote.numberOfItemsToAssemble || 0);
    }
  }, [isHydrated, activeQuote, recommendedCrewSize]);

  // Fetch removal pricing data
  const fetchPricingData = React.useCallback(async () => {
    if (!activeQuote || !items.length) return;

    setIsCalculating(true);
    setPricingError(null);

    try {
      console.log('📡 Fetching removal pricing data...');

      const { data, etag: responseEtag } = await fetchRemovalPricing(etag);
      setPricingData(data);
      setEtag(responseEtag);

      console.log('✅ Removal pricing data fetched successfully:', data);
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
  }, [activeQuote, items, etag]);

  // Calculate pricing based on current selections
  const calculateCurrentPricing = React.useCallback(() => {
    if (!pricingData || !selectedCrewSize) return null;

    try {
      // Default to 3 hours for standard service
      const standardPricing = calculateTotalPrice(
        selectedCrewSize,
        'standard',
        3, // Default hours
        dismantleCount,
        assemblyCount,
        pricingData
      );

      const premiumPricing = calculateTotalPrice(
        selectedCrewSize,
        'premium',
        3, // Default hours
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

  // Fetch pricing data when component mounts or when needed
  React.useEffect(() => {
    if (isHydrated && activeQuote && items.length) {
      fetchPricingData();
    }
  }, [isHydrated, activeQuote, items.length, fetchPricingData]);

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
    const newCount = Math.max(0, count);
    setDismantleCount(newCount);
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { numberOfItemsToDismantle: newCount });
    }
  };

  const handleAssemblyChange = (count: number) => {
    const newCount = Math.max(0, count);
    setAssemblyCount(newCount);
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { numberOfItemsToAssemble: newCount });
    }
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

  // Show loading while checking quote type and inventory
  if (!isHydrated || activeQuoteType !== 'removals' || !hasInventory(items.length)) {
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="1" id="crew-1" className="sr-only" />
                    <Label
                      htmlFor="crew-1"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${selectedCrewSize === 1 ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                    >
                      <div className="text-xl font-bold mb-2">1 Mover</div>
                      {/* <span className="text-sm font-medium text-center">Mover</span> */}
                      <span className="text-xs text-muted-foreground text-center mt-1">
                        Driver only. Customer expected to lift, load, and unload.
                      </span>

                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="2" id="crew-2" className="sr-only" />
                    <Label
                      htmlFor="crew-2"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${selectedCrewSize === 2 ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                    >
                      <div className="text-xl font-bold mb-2">2 Movers</div>
                      {/* <span className="text-sm font-medium text-center">Movers</span> */}
                      <span className="text-xs text-muted-foreground text-center mt-1">
                        Driver & mate. Recommended for most moves.
                      </span>

                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="3" id="crew-3" className="sr-only" />
                    <Label
                      htmlFor="crew-3"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${selectedCrewSize === 3 ? 'border-primary bg-primary/5' : 'border-muted'
                        }`}
                    >
                      <div className="text-xl font-bold mb-2">3 Movers</div>
                      {/* <span className="text-sm font-medium text-center">Movers</span> */}
                      <span className="text-xs text-muted-foreground text-center mt-1">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      Configure professional dismantling and assembly services for your move
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Dismantle Service Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Dismantle Service</h4>
                            <p className="text-sm text-gray-600">£18 per item</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
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
                        <div className="ml-6 p-3 bg-orange-50 rounded-md border border-orange-200">
                          <div className="text-lg font-bold text-orange-700">£{(dismantleCount * 18).toFixed(2)}</div>
                          <div className="text-sm text-orange-600">Total Dismantle Cost</div>
                        </div>
                      )}
                      <p className="text-sm text-gray-600 ml-6">
                        Professional dismantling of furniture and equipment
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Assembly Service Section */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Assembly Service</h4>
                            <p className="text-sm text-gray-600">£25 per item</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
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
                        <div className="ml-6 p-3 bg-blue-50 rounded-md border border-blue-200">
                          <div className="text-lg font-bold text-blue-700">£{(assemblyCount * 25).toFixed(2)}</div>
                          <div className="text-sm text-blue-600">Total Assembly Cost</div>
                        </div>
                      )}
                      <p className="text-sm text-gray-600 ml-6">
                        Professional assembly at your new location
                      </p>
                    </div>

                    {/* Total Additional Services Cost */}
                    {(dismantleCount > 0 || assemblyCount > 0) && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                          <span className="font-semibold text-gray-900">Total Additional Services:</span>
                          <span className="text-xl font-bold text-primary">
                            £{((dismantleCount * 18) + (assemblyCount * 25)).toFixed(2)}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Standard Tier */}
                  <Card className="border-2 hover:border-primary transition-colors">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>Standard</span>
                        <Badge variant="secondary">Most Popular</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* Total Price - Moved to top */}
                      {(() => {
                        const currentPricing = calculateCurrentPricing();
                        if (!currentPricing) return null;

                        return (
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-primary">
                              £{currentPricing.standard.totalPrice.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">Total Price (inc. VAT)</div>
                          </div>
                        );
                      })()}

                      {/* Separator Line */}
                      <div className="border-t border-gray-200 mb-6"></div>

                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Moving team to load and move</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Professional moving equipment</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Insurance coverage included</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Careful handling of items</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">On-time service guarantee</span>
                        </li>
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
                  <Card className="border-2 hover:border-primary transition-colors">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-lg text-purple-900 flex items-center justify-between">
                        <span>Premium</span>
                        <Badge variant="default" className="bg-purple-600">Best Value</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {/* Total Price - Moved to top */}
                      {(() => {
                        const currentPricing = calculateCurrentPricing();
                        if (!currentPricing) return null;

                        return (
                          <div className="text-center mb-6">
                            <div className="text-3xl font-bold text-purple-600">
                              £{currentPricing.premium.totalPrice.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">Total Price (inc. VAT)</div>
                          </div>
                        );
                      })()}

                      {/* Separator Line */}
                      <div className="border-t border-gray-200 mb-6"></div>

                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Everything in Standard</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Priority scheduling</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Extended service hours</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Premium packaging materials</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Dedicated move coordinator</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Post-move support</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-sm">Satisfaction guarantee</span>
                        </li>
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
            <div className="flex justify-between items-center pt-8">
              <Button
                variant="outline"
                onClick={() => router.push('/removals')}
                className="px-6 py-2 text-base"
              >
                ← Back to Van & Date
              </Button>

              <Button
                onClick={handleContinue}
                disabled={!selectedCrewSize || isCalculating}
                className="bg-primary hover:bg-primary/90 px-8 py-2 text-base font-medium shadow-sm"
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
