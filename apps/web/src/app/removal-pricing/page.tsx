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
import { Users, Package, Wrench, Calculator, Info } from 'lucide-react';
import { QuoteReferenceBanner } from '@/components/QuoteReferenceBanner';

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
  const [pricingData, setPricingData] = React.useState<any>(null);
  const [pricingError, setPricingError] = React.useState<string | null>(null);

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

  // Calculate pricing based on selections
  const calculatePricing = React.useCallback(async () => {
    if (!activeQuote || !items.length) return;
    
    setIsCalculating(true);
    setPricingError(null);
    
    try {
      const requestData = {
        distanceMiles: activeQuote.distanceMiles || 0,
        items: items.map(item => ({
          id: item.id || Math.random(),
          name: item.name,
          lengthCm: item.lengthCm || 0,
          widthCm: item.widthCm || 0,
          heightCm: item.heightCm || 0,
          quantity: item.quantity || 1
        })),
        stairsFloors: 0,
        longCarry: false,
        numberOfItemsToAssemble: assemblyCount,
        numberOfItemsToDismantle: dismantleCount,
        parkingFee: 0,
        ulezFee: 0,
        vatRegistered: true,
        requestedMovers: selectedCrewSize
      };

      console.log('📡 Calculating pricing with:', requestData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5247'}/api/v1/prices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const pricing = await response.json();
        setPricingData(pricing);
        console.log('✅ Pricing calculated successfully:', pricing);
      } else {
        const errorText = await response.text();
        console.error('❌ Pricing API error:', response.status, errorText);
        setPricingError(`Failed to calculate pricing: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error calculating pricing:', error);
      setPricingError('Network error while calculating pricing');
    } finally {
      setIsCalculating(false);
    }
  }, [activeQuote, items, selectedCrewSize, dismantleCount, assemblyCount]);

  // Recalculate pricing when selections change
  React.useEffect(() => {
    if (isHydrated && activeQuote && items.length) {
      calculatePricing();
    }
  }, [isHydrated, activeQuote, items.length, selectedCrewSize, dismantleCount, assemblyCount, calculatePricing]);

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
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-blue-900 text-xl font-bold flex items-center gap-2">
                  👥 Crew Size & Services
                </CardTitle>
                <p className="text-blue-800 text-base leading-relaxed">
                  Select your crew size and configure additional services. Your selections will impact the final pricing.
                </p>
              </CardHeader>
            </Card>

            {/* Inventory Summary */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Inventory Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Total Items:</span>
                  <Badge variant="secondary" className="font-semibold">{items.length} items</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Total Volume:</span>
                  <Badge variant="secondary" className="font-semibold">{totalVolume.toFixed(2)} m³</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                  <span className="text-sm font-medium text-gray-700">Recommended Crew:</span>
                  <Badge variant={recommendedCrewSize === selectedCrewSize ? "default" : "outline"} className="font-semibold">
                    {recommendedCrewSize} {recommendedCrewSize === 1 ? 'mover' : 'movers'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Crew Size Selection */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Choose Crew Size
              </h2>
              
              <RadioGroup value={selectedCrewSize.toString()} onValueChange={(value) => handleCrewSizeChange(parseInt(value))}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="1" id="crew-1" className="sr-only" />
                    <Label
                      htmlFor="crew-1"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${
                        selectedCrewSize === 1 ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className="text-3xl font-bold mb-2">1</div>
                      <span className="text-sm font-medium text-center">Mover</span>
                      <span className="text-xs text-muted-foreground text-center mt-1">
                        Driver only. Customer expected to lift, load, and unload.
                      </span>
                      {recommendedCrewSize === 1 && (
                        <Badge variant="default" className="mt-2">Recommended</Badge>
                      )}
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="2" id="crew-2" className="sr-only" />
                    <Label
                      htmlFor="crew-2"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${
                        selectedCrewSize === 2 ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className="text-3xl font-bold mb-2">2</div>
                      <span className="text-sm font-medium text-center">Movers</span>
                      <span className="text-xs text-muted-foreground text-center mt-1">
                        Driver & mate. Recommended for most moves.
                      </span>
                      {recommendedCrewSize === 2 && (
                        <Badge variant="default" className="mt-2">Recommended</Badge>
                      )}
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem value="3" id="crew-3" className="sr-only" />
                    <Label
                      htmlFor="crew-3"
                      className={`flex flex-col items-center justify-center rounded-md border-2 bg-popover p-6 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all ${
                        selectedCrewSize === 3 ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                    >
                      <div className="text-3xl font-bold mb-2">3</div>
                      <span className="text-sm font-medium text-center">Movers</span>
                      <span className="text-xs text-muted-foreground text-center mt-1">
                        Driver & 2 mates. For large or complex moves.
                      </span>
                      {recommendedCrewSize === 3 && (
                        <Badge variant="default" className="mt-2">Recommended</Badge>
                      )}
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {/* Crew Size Recommendation */}
              {selectedCrewSize !== recommendedCrewSize && (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-800">
                      <strong>Recommendation:</strong> Based on your {totalVolume.toFixed(2)} m³ inventory, 
                      we recommend {recommendedCrewSize} {recommendedCrewSize === 1 ? 'mover' : 'movers'} for optimal service.
                    </span>
                  </div>
                </div>
              )}
            </div>



            {/* Dismantle & Assembly Services */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                Dismantle & Assembly
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                Configure professional dismantling and assembly services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dismantle Service */}
                <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Package className="h-5 w-5 text-primary" />
                      Dismantle: £18 per item
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismantleChange(dismantleCount - 1)}
                        disabled={dismantleCount <= 0}
                        className="w-10 h-10 rounded-full"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={dismantleCount}
                        onChange={(e) => handleDismantleChange(parseInt(e.target.value) || 0)}
                        className="w-20 text-center text-lg font-semibold"
                        min="0"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismantleChange(dismantleCount + 1)}
                        className="w-10 h-10 rounded-full"
                      >
                        +
                      </Button>
                    </div>
                    {dismantleCount > 0 && (
                      <div className="text-center p-3 bg-primary/5 rounded-md border border-primary/20">
                        <div className="text-lg font-bold text-primary">£{(dismantleCount * 18).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">Total Dismantle Cost</div>
                      </div>
                    )}
                    <div className="text-sm text-gray-600 text-center">
                      Professional dismantling of furniture and equipment
                    </div>
                  </CardContent>
                </Card>

                {/* Assembly Service */}
                <Card className="border-2 hover:border-primary/50 transition-colors shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                      <Wrench className="h-5 w-5 text-primary" />
                      Assemble: £25 per item
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssemblyChange(assemblyCount - 1)}
                        disabled={assemblyCount <= 0}
                        className="w-10 h-10 rounded-full"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        value={assemblyCount}
                        onChange={(e) => handleAssemblyChange(parseInt(e.target.value) || 0)}
                        className="w-20 text-center text-lg font-semibold"
                        min="0"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssemblyChange(assemblyCount + 1)}
                        className="w-10 h-10 rounded-full"
                      >
                        +
                      </Button>
                    </div>
                    {assemblyCount > 0 && (
                      <div className="text-center p-3 bg-primary/5 rounded-md border border-primary/20">
                        <div className="text-lg font-bold text-primary">£{(assemblyCount * 25).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">Total Assembly Cost</div>
                      </div>
                    )}
                    <div className="text-sm text-gray-600 text-center">
                      Professional assembly at your new location
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Service Information */}
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                    <Info className="h-5 w-5" />
                    Service Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div>
                      <h4 className="font-semibold mb-2">Dismantle Service</h4>
                      <ul className="space-y-1">
                        <li>• Professional furniture dismantling</li>
                        <li>• Safe handling of delicate items</li>
                        <li>• Organized packaging of parts</li>
                        <li>• Inventory of all components</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Assembly Service</h4>
                      <ul className="space-y-1">
                        <li>• Professional furniture assembly</li>
                        <li>• Proper tool usage</li>
                        <li>• Quality assurance check</li>
                        <li>• Cleanup of packaging materials</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pricing Display */}
            {pricingData && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Calculator className="h-6 w-6" />
                  Pricing Options
                </h2>
                
                {/* Pricing Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Pricing Summary</h3>
                    <p className="text-sm text-gray-600">Based on {selectedCrewSize} {selectedCrewSize === 1 ? 'mover' : 'movers'} and your selections</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">£{pricingData.standard?.customerTotal || 0}</div>
                      <div className="text-sm text-gray-600">Standard</div>
                    </div>
                    <div className="text-3xl font-bold text-purple-600">£{pricingData.premium?.customerTotal || 0}</div>
                      <div className="text-sm text-gray-600">Premium</div>
                  </div>
                  {pricingData.standard?.customerTotal && pricingData.premium?.customerTotal && (
                    <div className="text-center mt-2">
                      <span className="text-sm text-gray-600">
                        Premium adds £{(pricingData.premium.customerTotal - pricingData.standard.customerTotal).toFixed(2)} for enhanced service
                      </span>
                    </div>
                  )}
                </div>
                
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
                      <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Base Price:</span>
                          <span>£{pricingData.standard?.base || 0}</span>
                        </div>
                        {pricingData.standard?.volumeSurcharge > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Volume Surcharge:</span>
                            <span>£{pricingData.standard?.volumeSurcharge || 0}</span>
                          </div>
                        )}
                        {pricingData.standard?.crewFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Crew Fee ({selectedCrewSize} movers):</span>
                            <span>£{pricingData.standard?.crewFee || 0}</span>
                          </div>
                        )}
                        {dismantleCount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Dismantle ({dismantleCount} items):</span>
                            <span>£{pricingData.standard?.dismantleFee || 0}</span>
                          </div>
                        )}
                        {assemblyCount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Assembly ({assemblyCount} items):</span>
                            <span>£{pricingData.standard?.assemblyFee || 0}</span>
                          </div>
                        )}
                        {additionalServiceCosts > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Additional Services:</span>
                            <span>£{additionalServiceCosts.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center pt-4 border-t">
                        <div className="text-2xl font-bold text-primary">
                          £{pricingData.standard?.customerTotal || 'Calculating...'}
                        </div>
                        <div className="text-sm text-gray-500">Total Price (inc. VAT)</div>
                      </div>
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
                      <div className="space-y-2 mb-4 p-3 bg-purple-50 rounded-md">
                        <div className="flex justify-between text-sm">
                          <span>Base Price:</span>
                          <span>£{pricingData.premium?.base || 0}</span>
                        </div>
                        {pricingData.premium?.volumeSurcharge > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Volume Surcharge:</span>
                            <span>£{pricingData.premium?.volumeSurcharge || 0}</span>
                          </div>
                        )}
                        {pricingData.premium?.tierUplift > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Premium Enhancement:</span>
                            <span>£{pricingData.premium?.tierUplift || 0}</span>
                          </div>
                        )}
                        {pricingData.premium?.crewFee > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Crew Fee ({selectedCrewSize} movers):</span>
                            <span>£{pricingData.premium?.crewFee || 0}</span>
                          </div>
                        )}
                        {dismantleCount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Dismantle ({dismantleCount} items):</span>
                            <span>£{pricingData.premium?.dismantleFee || 0}</span>
                          </div>
                        )}
                        {assemblyCount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Assembly ({assemblyCount} items):</span>
                            <span>£{pricingData.premium?.assemblyFee || 0}</span>
                          </div>
                        )}
                        {additionalServiceCosts > 0 && (
                          <div className="flex justify-between text-sm">
                            <span>Additional Services:</span>
                            <span>£{additionalServiceCosts.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-center pt-4 border-t">
                        <div className="text-2xl font-bold text-purple-600">
                          £{pricingData.premium?.customerTotal || 'Calculating...'}
                        </div>
                        <div className="text-sm text-gray-500">Total Price (inc. VAT)</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Crew Size Impact */}
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-blue-900">
                      <Users className="h-5 w-5" />
                      Crew Size Impact on Pricing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-white rounded-md border border-blue-200">
                        <div className="text-lg font-semibold text-blue-900">1 Mover</div>
                        <div className="text-sm text-blue-700">Base price only</div>
                        <div className="text-xs text-blue-600 mt-1">Customer helps with lifting</div>
                      </div>
                      <div className="p-3 bg-white rounded-md border border-blue-200">
                        <div className="text-lg font-semibold text-blue-900">2 Movers</div>
                        <div className="text-sm text-blue-700">+£25 crew fee</div>
                        <div className="text-xs text-blue-600 mt-1">Recommended for most moves</div>
                      </div>
                      <div className="p-3 bg-white rounded-md border border-blue-200">
                        <div className="text-lg font-semibold text-blue-900">3 Movers</div>
                        <div className="text-sm text-blue-700">+£45 crew fee</div>
                        <div className="text-xs text-blue-600 mt-1">For large/complex moves</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

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
                  onClick={calculatePricing}
                  className="mt-2"
                >
                  Retry Calculation
                </Button>
              </div>
            )}

            {/* Loading State for Pricing */}
            {isCalculating && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Calculating pricing...</p>
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
