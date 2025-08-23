"use client"

export const dynamic = 'force-dynamic';

import { useState } from "react"
import { StreamlinedHeader } from "@/components/StreamlinedHeader"
import Footer from "@/components/Footer"
import { CategoryList } from "@/components/inventory/CategoryList"
import { SearchCommand } from "@/components/inventory/SearchCommand"
import { ItemGrid } from "@/components/inventory/ItemGrid"
import { useQuote } from "@/contexts/QuoteContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { QuoteOption, QuoteRequest, QuoteItem, PickUpDropOffPrice } from "@/types/booking"
import { Loader2 } from "lucide-react"
import { useQuoteSession } from '@/hooks/useQuoteSession'
import { API_BASE_URL } from '@/lib/api/config'

// Popular items list for quick adding

function InventoryPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { 
    activeQuoteType,
    quotes,
    updateQuote
  } = useQuote()
  
  // Get active quote data
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined
  const items = activeQuote?.items || []
  const quoteType = activeQuoteType
  const customer = activeQuote?.customer
  const origin = activeQuote?.origin
  const destination = activeQuote?.destination
  const router = useRouter()
  const quoteSession = useQuoteSession<{ items: any[]; option: string } | null>({ baseUrl: API_BASE_URL })
  
  const handleAddItem = () => {
    // The actual cart functionality is handled in SearchCommand and ItemGrid components
    // This is just a callback for any additional logic if needed
  }

  // Helper functions for the new context API
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const updatePricing = (pricingData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, pricingData);
    }
  };

  const getActiveQuoteData = () => {
    return activeQuote;
  };

  const getQuoteData = (type: QuoteOption) => {
    return quotes[type];
  };
  
  // Sync minimal canonical quote to server (items + option only)
  const syncQuote = () => {
    try {
      const minimal = { items, option: quoteType }
      quoteSession.setData(minimal as any)
    } catch {}
  }
  
  const createQuoteRequest = (): QuoteRequest => {
    // Convert cart items to QuoteItem format
    const quoteItems: QuoteItem[] = items.map(item => ({
      id: item.id,                    
      name: item.name,                
      lengthCm: item.lengthCm,
      widthCm: item.widthCm,
      heightCm: item.heightCm,
      quantity: item.quantity         
    }));
    
    // Calculate stairs floors from pickup and delivery addresses
    const calculateStairsFloors = (): number => {
      let totalStairsFloors = 0;
      
      // Origin (pickup) stairs - count floors if no elevator available
      if (origin?.floor && origin.floor > 0 && !origin.hasElevator) {
        totalStairsFloors += origin.floor;
      }
      
      // Destination (delivery) stairs - count floors if no elevator available
      if (destination?.floor && destination.floor > 0 && !destination.hasElevator) {
        totalStairsFloors += destination.floor;
      }
      
      return totalStairsFloors;
    };
    
    // Determine if there's a long carry situation
    const hasLongCarry = (): boolean => {
      // Business rule: Consider it a long carry if either location is above 3rd floor without elevator
      const originLongCarry = origin?.floor && origin.floor > 3 && !origin.hasElevator;
      const destinationLongCarry = destination?.floor && destination.floor > 3 && !destination.hasElevator;
      
      return !!(originLongCarry || destinationLongCarry);
    };
    
    return {
              distanceMiles: activeQuote?.distanceMiles || 0,           
      items: quoteItems,                                     
      stairsFloors: calculateStairsFloors(),                 
      longCarry: hasLongCarry(),                             
      numberOfItemsToAssemble: activeQuote?.numberOfItemsToAssemble || 0,                            
      numberOfItemsToDismantle: activeQuote?.numberOfItemsToDismantle || 0,                           
      parkingFee: 0,                                         
      ulezFee: 0,                                            
      vatRegistered: true,                                   
      requestedMovers: 0                                     
    };
  };

  const callCreateJobAsync = async (): Promise<PickUpDropOffPrice | null> => {
    try {
      // Check if we have required customer data
      if (!origin?.line1 || !destination?.line1) {
        console.error('Missing origin or destination addresses');
        return null;
      }

      // Distance should already be calculated from /collection-delivery page
      if (!activeQuote?.distanceMiles || activeQuote.distanceMiles === 0) {
        console.error('Distance missing - this should have been calculated on /collection-delivery page');
        return null;
      }

      const quoteRequest = createQuoteRequest();
      
      // Use environment variable for API base URL, fallback for development
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      const apiUrl = `${apiBaseUrl}/api/v1/prices`;
      
      // Ensure we have a valid payload before sending
      if (!quoteRequest || typeof quoteRequest !== 'object') {
        console.error('Invalid quote request object:', quoteRequest);
        throw new Error('Invalid quote request - payload is not an object');
      }
      
      if (!quoteRequest.items || quoteRequest.items.length === 0) {
        console.error('No items in quote request');
        throw new Error('No items to quote');
      }
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteRequest)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data: PickUpDropOffPrice = await response.json();
      return data;
    } catch (error) {
      console.error('Error calling CreateJobAsync:', error);
      return null;
    }
  };
  
  const handleContinueClick = async () => {
    syncQuote();
    // Check if we need to make API call based on quote option
    if (quoteType === QuoteOption.Send || quoteType === QuoteOption.Receive) {
      
      // Validate required data before making API call
      if (!origin?.line1 || !destination?.line1) {
        alert('Please complete the pickup and delivery addresses first.');
        router.push('/collection-delivery');
        return;
      }
      
      // Validate distance is present (it should be calculated from /collection-delivery)
      if (!activeQuote?.distanceMiles || activeQuote.distanceMiles === 0) {
        console.error('Distance is missing from customer context!');
        alert('Distance calculation missing. Please complete the address details.');
        router.push('/collection-delivery');
        return;
      }
      
      // Check if we have items to quote
      if (getTotalItems() === 0) {
        alert('Please add some items to your inventory first.');
        return;
      }
      
      setIsLoading(true);
      
      try {
        const pricingData = await callCreateJobAsync();
        
        if (pricingData) {
          // Store the API response in booking context
          updatePricing({ pickUpDropOffPrice: pricingData });
          
          // Navigate to Van & Date selection after successful API call
          router.push('/pickup-dropoff');
        } else {
          // Handle error case - show user feedback and don't navigate
          console.error('Failed to get pricing data');
          alert('Unable to calculate pricing. Please try again.');
        }
      } catch (error) {
        console.error('Error in handleContinueClick:', error);
        alert('Unable to calculate pricing. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // For 'removals' option, continue to Van & Date selection
      router.push('/pickup-dropoff');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <StreamlinedHeader />
      
      <main className="flex-1 container mx-auto px-4 pt-32 md:pt-36 lg:pt-44 pb-6">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-4 h-[calc(100vh-14rem)]">
          {/* Categories - Horizontal on mobile */}
          <div className="flex-shrink-0">
            {/* <h2 className="text-xl text-primary-600 font-medium mb-4">Categories</h2> */}
            <div className="bg-muted/50 rounded-lg p-4">
              <CategoryList
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isMobile={true}
              />
            </div>
          </div>

          {/* Search Input */}
          <div className="flex-shrink-0">
            {/* <h1 className="text-2xl text-primary-600 font-medium mb-6">Build inventory of the items you need to deliver</h1> */}
            <SearchCommand 
              onAddItem={handleAddItem}
            />
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <ItemGrid 
                selectedCategory={selectedCategory}
                onAddItem={handleAddItem}
              />
            </div>
          </div>

          {/* Continue button - always visible */}
          <div className="flex justify-end pt-4 border-t border-gray-200 flex-shrink-0">
            <Button 
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={handleContinueClick}
              disabled={getTotalItems() === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Calculating pricing...
                </>
              ) : (
                'Continue to Van Selection'
              )}
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row gap-8 h-[calc(100vh-14rem)]">
          {/* Left sidebar with categories */}
          <div className="w-[400px] flex-shrink-0">
            {/* <h2 className="text-xl text-primary-600 font-medium mb-4">Categories</h2> */}
            <div className="bg-muted/50 rounded-lg h-[calc(100vh-22rem)]">
              <CategoryList
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                isMobile={false}
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col h-[calc(100vh-14rem)]">
            <div className="mb-6">
              {/* <h1 className="text-2xl text-primary-600 font-medium mb-6">Build inventory of the items you need to deliver</h1> */}
              <SearchCommand
                onAddItem={handleAddItem}
              />
            </div>

            <div className="flex-1 overflow-hidden mb-6">
              <div className="h-[calc(100vh-34rem)] overflow-y-auto">
                <ItemGrid 
                  selectedCategory={selectedCategory}
                  onAddItem={handleAddItem}
                />
              </div>
            </div>

            {/* Continue button - always visible */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
                          <Button 
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={handleContinueClick}
              disabled={getTotalItems() === 0 || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Calculating pricing...
                </>
              ) : (
                'Continue to Van Selection'
              )}
            </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function InventoryPage() {
  return <InventoryPageContent />
}