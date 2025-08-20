"use client"

import { useState } from "react"
import { StreamlinedHeader } from "@/components/StreamlinedHeader"
import Footer from "@/components/Footer"
import { CategoryList } from "@/components/inventory/CategoryList"
import { SearchCommand } from "@/components/inventory/SearchCommand"
import { ItemGrid } from "@/components/inventory/ItemGrid"
import { useCart } from "@/contexts/CartContext"
import { useBooking } from "@/contexts/BookingContext"
import { useQuoteOption } from "@/contexts/QuoteOptionContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { QuoteOption, QuoteRequest, QuoteItem, PickUpDropOffPrice } from "@/types/booking"
import { Loader2 } from "lucide-react"

// Popular items list for quick adding

function InventoryPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { getTotalItems, items } = useCart()
  const { updatePricing, customer, originDestination } = useBooking()
  const { option } = useQuoteOption()
  const router = useRouter()
  
  const handleAddItem = () => {
    // The actual cart functionality is handled in SearchCommand and ItemGrid components
    // This is just a callback for any additional logic if needed
  }
  
  const createQuoteRequest = (): QuoteRequest => {
    // Convert cart items to QuoteItem format
    const quoteItems: QuoteItem[] = items.map(item => ({
      id: item.id,                    
      name: item.name,                
      lengthCm: item.length,
      widthCm: item.width,
      heightCm: item.height,
      quantity: item.quantity         
    }));
    
    // Calculate stairs floors from pickup and delivery addresses
    const calculateStairsFloors = (): number => {
      let totalStairsFloors = 0;
      
      // Origin (pickup) stairs - count floors if no elevator available
      if (customer?.origin?.floor && customer.origin.floor > 0 && !customer.origin.hasElevator) {
        totalStairsFloors += customer.origin.floor;
      }
      
      // Destination (delivery) stairs - count floors if no elevator available
      if (customer?.destination?.floor && customer.destination.floor > 0 && !customer.destination.hasElevator) {
        totalStairsFloors += customer.destination.floor;
      }
      
      return totalStairsFloors;
    };
    
    // Determine if there's a long carry situation
    const hasLongCarry = (): boolean => {
      // Business rule: Consider it a long carry if either location is above 3rd floor without elevator
      const originLongCarry = customer?.origin?.floor && customer.origin.floor > 3 && !customer.origin.hasElevator;
      const destinationLongCarry = customer?.destination?.floor && customer.destination.floor > 3 && !customer.destination.hasElevator;
      
      return !!(originLongCarry || destinationLongCarry);
    };
    
    return {
      distanceMiles: customer?.distanceMiles || 0,           
      items: quoteItems,                                     
      stairsFloors: calculateStairsFloors(),                 
      longCarry: hasLongCarry(),                             
      numberOfItemsToAssemble: 0,                            
      numberOfItemsToDismantle: 0,                           
      parkingFee: 0,                                         
      ulezFee: 0,                                            
      vatRegistered: true,                                   
      requestedMovers: 0                                     
    };
  };

  const callCreateJobAsync = async (): Promise<PickUpDropOffPrice | null> => {
    try {
      // Check if we have required customer data
      if (!customer?.origin?.line1 || !customer?.destination?.line1) {
        console.error('Missing origin or destination addresses');
        return null;
      }

      // Distance should already be calculated from /collection-delivery page
      if (!customer?.distanceMiles || customer.distanceMiles === 0) {
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
    // Check if we need to make API call based on quote option
    if (option === QuoteOption.Send || option === QuoteOption.Receive) {
      
      // Validate required data before making API call
      if (!customer?.origin?.line1 || !customer?.destination?.line1) {
        alert('Please complete the pickup and delivery addresses first.');
        router.push('/collection-delivery');
        return;
      }
      
      // Validate distance is present (it should be calculated from /collection-delivery)
      if (!customer?.distanceMiles || customer.distanceMiles === 0) {
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
          
          // Navigate to pricing page only after successful API call
          router.push('/pricing');
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
      // For 'removals' option, continue with normal flow to pricing
      router.push('/pricing');
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
                'Continue to Pricing'
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