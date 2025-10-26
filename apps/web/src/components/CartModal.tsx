"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useQuote } from "@/contexts/QuoteContext"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartIcon } from "./CartIcon"

export function CartModal() {
  const { activeQuoteType, quotes, updateQuote } = useQuote()
  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [editDimensions, setEditDimensions] = useState<{
    heightCm: number
    widthCm: number
    lengthCm: number
  } | null>(null)
  
  // Notify Chatwoot widget when cart is open/closed
  useEffect(() => {
    const event = new CustomEvent('cartModalState', {
      detail: { isOpen }
    })
    window.dispatchEvent(event)
  }, [isOpen])
  
  // Get items from active quote
  const items = activeQuoteType ? quotes[activeQuoteType]?.items || [] : []
  
  // Helper functions
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }
  
  const getTotalVolume = () => {
    return items.reduce((total, item) => {
      const volumeM3 = (item.lengthCm * item.widthCm * item.heightCm * item.quantity) / 1000000
      return total + volumeM3
    }, 0)
  }
  
  const removeItem = (itemId: number) => {
    if (!activeQuoteType) return
    const newItems = items.filter(item => item.id !== itemId)
    updateQuote(activeQuoteType, { items: newItems })
  }
  
  const updateQuantity = (itemId: number, quantity: number) => {
    if (!activeQuoteType || quantity < 1) return
    const newItems = items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    )
    updateQuote(activeQuoteType, { items: newItems })
  }
  
  const updateItemDimensions = (itemId: number, dimensions: { heightCm: number; widthCm: number; lengthCm: number }) => {
    if (!activeQuoteType) return
    const newItems = items.map(item => 
      item.id === itemId ? { ...item, ...dimensions } : item
    )
    updateQuote(activeQuoteType, { items: newItems })
  }

  const handleEditDimensions = (itemId: number) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      setEditingItem(itemId)
      setEditDimensions({
        heightCm: item.heightCm,
        widthCm: item.widthCm,
        lengthCm: item.lengthCm,
      })
    }
  }

  const handleSaveDimensions = (itemId: number) => {
    if (editDimensions) {
      updateItemDimensions(itemId, editDimensions)
      setEditingItem(null)
      setEditDimensions(null)
    }
  }

  const handleCancelEdit = () => {
    setEditingItem(null)
    setEditDimensions(null)
  }

  const updateDimension = (dimension: 'heightCm' | 'widthCm' | 'lengthCm', value: number) => {
    if (editDimensions) {
      setEditDimensions({
        ...editDimensions,
        [dimension]: value,
      })
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <CartIcon />
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full max-h-screen overflow-hidden gap-0">
        <SheetHeader className="flex-shrink-0 p-4 border-b bg-background">
          <SheetTitle className="flex items-center gap-2">
            <span>Shopping Cart</span>
            {getTotalItems() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Your cart is empty</p>
              <p className="text-sm">Add items from the inventory to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 bg-background">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.lengthCm} × {item.widthCm} × {item.heightCm} cm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Volume: {((item.lengthCm * item.widthCm * item.heightCm) / 1000000).toFixed(2)} m³
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 flex-shrink-0 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center text-sm"
                        min="1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Dimensions Editor */}
                  {editingItem === item.id ? (
                    <div className="space-y-3 border-t pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Edit Dimensions:</span>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleSaveDimensions(item.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">Length (cm)</label>
                          <Input
                            type="number"
                            value={editDimensions?.lengthCm || 0}
                            onChange={(e) => updateDimension('lengthCm', parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Width (cm)</label>
                          <Input
                            type="number"
                            value={editDimensions?.widthCm || 0}
                            onChange={(e) => updateDimension('widthCm', parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Height (cm)</label>
                          <Input
                            type="number"
                            value={editDimensions?.heightCm || 0}
                            onChange={(e) => updateDimension('heightCm', parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEditDimensions(item.id)}
                      className="w-full"
                    >
                      Edit Dimensions
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 flex-shrink-0 bg-background">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Items:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Volume:</span>
              <span>{getTotalVolume().toFixed(2)} m³</span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
