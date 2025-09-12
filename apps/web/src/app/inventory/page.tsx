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
import { QuoteOption, QuoteRequest, QuoteItem } from "@/types/booking"
import { Loader2, ChevronLeft } from "lucide-react"


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
  const quoteType = activeQuoteType
  const customer = activeQuote?.customer
  const origin = activeQuote?.origin
  const destination = activeQuote?.destination
  const router = useRouter()

  
  // Get items from active quote in QuoteContext
  const items = activeQuote?.items || []
  
  const handleAddItem = () => {
    // The actual cart functionality is handled in SearchCommand and ItemGrid components
    // This is just a callback for any additional logic if needed
  }

  // Helper functions for the new context API
  const getTotalItems = () => {
    // Use QuoteContext items directly
    return items.reduce((total, item) => total + item.quantity, 0);
  };



  const getActiveQuoteData = () => {
    return activeQuote;
  };

  const getQuoteData = (type: QuoteOption) => {
    return quotes[type];
  };
  

  
  // Sync quote data to QuoteContext (local only, no backend call)
  const syncQuote = () => {
    if (!activeQuoteType) return false;
    
    try {
      // Update the active quote with current items locally
      // Don't call updateQuote here as it triggers backend API calls
      // The items are already in the QuoteContext from the components
      console.log('Items synced locally:', items);
      return true;
    } catch (error) {
      console.error('Failed to sync quote data locally:', error);
      return false;
    }
  }
  



  
  const handleContinueClick = async () => {
    console.log('Continue button clicked, starting navigation process...');
    
    // First, sync the current items to QuoteContext
    const syncSuccess = syncQuote();
    if (!syncSuccess) {
      console.error('Failed to sync quote data');
      alert('Failed to save inventory data. Please try again.');
      return;
    }
    
    // Check if we have items to quote
    if (getTotalItems() === 0) {
      alert('Please add some items to your inventory first.');
      return;
    }
    
    // Check if addresses are set (if not, redirect to collection-delivery)
    if (!origin?.line1 || !destination?.line1) {
      console.log('Addresses missing, redirecting to collection-delivery');
      router.push('/collection-delivery');
      return;
    }
    
    // Check if distance is calculated (if not, redirect to collection-delivery)
    if (!activeQuote?.distanceMiles || activeQuote.distanceMiles === 0) {
      console.log('Distance missing, redirecting to collection-delivery');
      router.push('/collection-delivery');
      return;
    }
    
    // For all quote types, continue to the Van and Date page
    console.log('Proceeding to van and date selection for quote type:', quoteType);
    
    // All validations passed, navigate to /van-and-date
    console.log('All validations passed, navigating to /van-and-date');
    console.log('Quote type:', quoteType);
    console.log('Items count:', getTotalItems());
    console.log('Origin:', origin?.line1);
    console.log('Destination:', destination?.line1);
    console.log('Distance:', activeQuote?.distanceMiles);
    
    // Add a small delay to ensure state updates are processed
    console.log('Adding small delay before navigation...');
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      console.log('Attempting navigation with router.push...');
      await router.push('/van-and-date');
      console.log('Navigation completed successfully');
    } catch (navError) {
      console.error('Navigation failed:', navError);
      // Fallback navigation
      console.log('Using fallback navigation');
      window.location.href = '/van-and-date';
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
          <div className="pt-4 border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => router.push('/collection-delivery')}
                className="px-6 py-2 text-base"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
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
                  'Next'
                )}
              </Button>
            </div>
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
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.push('/collection-delivery')}
                  className="px-6 py-2 text-base"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                
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
                    'Next'
                  )}
                </Button>
              </div>
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