"use client"

import { useState } from "react"
import { StreamlinedHeader } from "@/components/StreamlinedHeader"
import Footer from "@/components/Footer"
import { CategoryList } from "@/components/inventory/CategoryList"
import { SearchCommand } from "@/components/inventory/SearchCommand"
import { ItemGrid } from "@/components/inventory/ItemGrid"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Popular items list for quick adding
const popularItems = [
  { id: "box-50", name: "Box approx 50x50x60cm" },
  { id: "car-roof", name: "Car Roof Rack" },
  { id: "box-100", name: "Large Box approx 100x50x70cm" },
  { id: "box-40", name: "Small Box approx 40x30x30cm" },
  { id: "wardrobe", name: "Single Wardrobe" },
  { id: "shelf", name: "Shelf" },
  { id: "shoe-cabinet", name: "Shoe Cabinet" },
  { id: "bookcase", name: "bookcase" },
  { id: "bookshelf", name: "Bookshelf" },
  { id: "corner-cabinet", name: "Corner Cabinet" },
  { id: "storage-box", name: "Storage Box" },
  { id: "display-cabinet", name: "Display Cabinet" },
  { id: "record-cabinet", name: "Record Cabinet" },
  { id: "large-bookcase", name: "Large Bookcase" },
]

function InventoryPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const { getTotalItems } = useCart()
  const router = useRouter()
  
  const handleAddItem = (item: any) => {
    // The actual cart functionality is handled in SearchCommand and ItemGrid components
    // This is just a callback for any additional logic if needed
    console.log('Item added to cart:', item)
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <StreamlinedHeader />
      
      <main className="flex-1 container mx-auto px-4 pt-36 lg:pt-40 pb-6">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-6 h-[calc(100vh-14rem)]">
          {/* Categories - Horizontal on mobile */}
          <div className="flex-shrink-0">
            <h2 className="text-xl text-primary-600 font-medium mb-4">Categories</h2>
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
            <h1 className="text-2xl text-primary-600 font-medium mb-6">Build inventory of the items you need to deliver</h1>
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
              onClick={() => router.push('/van-selection')}
              disabled={getTotalItems() === 0}
            >
              Continue to Van Selection
            </Button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row gap-8 h-[calc(100vh-14rem)]">
          {/* Left sidebar with categories */}
          <div className="w-[400px] flex-shrink-0">
            <h2 className="text-xl text-primary-600 font-medium mb-4">Categories</h2>
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
              <h1 className="text-2xl text-primary-600 font-medium mb-6">Build inventory of the items you need to deliver</h1>
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
              onClick={() => router.push('/van-selection')}
              disabled={getTotalItems() === 0}
            >
              Continue to Van Selection
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