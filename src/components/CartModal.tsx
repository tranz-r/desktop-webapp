"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CartIcon } from "./CartIcon"

export function CartModal() {
  const { items, removeItem, updateQuantity, updateItemDimensions, getTotalItems, getTotalVolume } = useCart()
  const [editingItem, setEditingItem] = useState<number | null>(null)
  const [editDimensions, setEditDimensions] = useState<{
    height: number
    width: number
    length: number
  } | null>(null)

  const handleEditDimensions = (itemId: number) => {
    const item = items.find(i => i.id === itemId)
    if (item) {
      setEditingItem(itemId)
      setEditDimensions({
        height: item.height,
        width: item.width,
        length: item.length,
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

  const updateDimension = (dimension: 'height' | 'width' | 'length', value: number) => {
    if (editDimensions) {
      setEditDimensions({
        ...editDimensions,
        [dimension]: value,
      })
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <CartIcon />
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span>Shopping Cart</span>
            {getTotalItems() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Your cart is empty</p>
              <p className="text-sm">Add items from the inventory to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.length} × {item.width} × {item.height} cm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Volume: {item.volume.toFixed(2)} m³
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
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
                            value={editDimensions?.length || 0}
                            onChange={(e) => updateDimension('length', parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Width (cm)</label>
                          <Input
                            type="number"
                            value={editDimensions?.width || 0}
                            onChange={(e) => updateDimension('width', parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Height (cm)</label>
                          <Input
                            type="number"
                            value={editDimensions?.height || 0}
                            onChange={(e) => updateDimension('height', parseInt(e.target.value) || 0)}
                            className="h-8 text-sm"
                            min="1"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
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
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Items:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Total Volume:</span>
              <span>{getTotalVolume().toFixed(2)} m³</span>
            </div>
            <Button className="w-full bg-primary-600 hover:bg-primary-700">
              Continue to Van Selection
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
