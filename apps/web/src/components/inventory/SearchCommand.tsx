"use client"

import * as React from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useCallback, useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, X, Minus, Plus } from "lucide-react"
import { useQuote } from "@/contexts/QuoteContext"

interface Item {
  id: number
  name: string
  category_id: number
  popularity_index: number
  length: number
  width: number
  height: number
  volume_m3: number
}

interface SearchCommandProps {
  onAddItem: (item: Item, quantity?: number) => void
}

export function SearchCommand({ onAddItem }: SearchCommandProps) {
  const [items, setItems] = useState<Item[]>([])
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { activeQuoteType, quotes, updateQuote } = useQuote()

  // Load items from JSON file
  useEffect(() => {
    setLoading(true)
    fetch('/data/Tranzr_goods_enriched_dimensions-Depth.json')
      .then(res => res.json())
      .then(data => {
        setItems(data.goods || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading items:', err)
        setLoading(false)
      })
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
        setSearchTerm("")
        setSearchResults([])
        setQuantities({})
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value)
    
    if (!value.trim()) {
      setSearchResults([])
      setIsDropdownOpen(false)
      setQuantities({})
      return
    }

    const searchTerm = value.toLowerCase()
    const results = items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    )
    
    // Sort by popularity index (higher first) and limit results
    const sortedResults = results
      .sort((a, b) => (b.popularity_index || 0) - (a.popularity_index || 0))
      .slice(0, 20) // Increased from 10 to 20 results
    
    setSearchResults(sortedResults)
    setIsDropdownOpen(sortedResults.length > 0)
    
    // Initialize quantities for new results
    const newQuantities: Record<number, number> = {}
    sortedResults.forEach(item => {
      if (!(item.id in quantities)) {
        newQuantities[item.id] = 1
      }
    })
    setQuantities(prev => ({ ...prev, ...newQuantities }))
  }, [items, quantities])

  const closeDropdown = () => {
    setIsDropdownOpen(false)
    setSearchTerm("")
    setSearchResults([])
    setQuantities({})
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantities(prev => ({ ...prev, [itemId]: newQuantity }))
  }

  const handleAddToCart = (item: Item) => {
    const quantity = quantities[item.id] || 1
    
    // Call the onAddItem callback to add to the quote context
    onAddItem(item, quantity)
    
    // Add item directly to QuoteContext
    if (activeQuoteType) {
      // Get existing items from the context
      const existingItems = quotes[activeQuoteType]?.items || []
      
      // Check if item already exists and update quantity, or add new item
      const existingItemIndex = existingItems.findIndex(existing => existing.id === item.id)
      let newItems
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = [...existingItems]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        }
      } else {
        // Add new item
        newItems = [
          ...existingItems,
          {
            id: item.id,
            name: item.name,
            lengthCm: item.length,
            widthCm: item.width,
            heightCm: item.height,
            quantity: quantity
          }
        ]
      }
      
      updateQuote(activeQuoteType, { items: newItems })
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search, add, edit items from our database"
          onValueChange={handleSearch}
          className="h-12 text-base"
          value={searchTerm}
        />
      </Command>
      
      {/* Search results dropdown - only show when actively searching */}
      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-700">Search Results</div>
              <Button
                size="sm"
                variant="ghost"
                onClick={closeDropdown}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search results</span>
              </Button>
            </div>
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 hover:bg-secondary/50 rounded transition-colors duration-200"
              >
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.length}x{item.width}x{item.height}cm • {item.volume_m3.toFixed(2)}m³
                  </div>
                </div>
                
                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 mr-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) - 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <Input
                    type="number"
                    value={quantities[item.id] || 1}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 h-8 text-center text-sm"
                    min="1"
                  />
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, (quantities[item.id] || 1) + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                  onClick={() => handleAddToCart(item)}
                >
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}