"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useCart } from "@/contexts/CartContext"

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

interface ItemGridProps {
  selectedCategory: number | null
  onAddItem: (item: Item) => void
}

export function ItemGrid({ selectedCategory, onAddItem }: ItemGridProps) {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const { addItem } = useCart()

  useEffect(() => {
    if (!selectedCategory) {
      setItems([])
      setQuantities({})
      return
    }

    setLoading(true)
    fetch('/data/Tranzr_goods_enriched_dimensions-Depth.json')
      .then(res => res.json())
      .then(data => {
        const categoryItems = data.goods.filter((item: Item) => item.category_id === selectedCategory)
        // Sort by popularity index (higher first)
        categoryItems.sort((a: Item, b: Item) => (b.popularity_index || 0) - (a.popularity_index || 0))
        setItems(categoryItems)
        
        // Initialize quantities for new items only
        setQuantities(prev => {
          const newQuantities: Record<number, number> = { ...prev }
          categoryItems.forEach((item: Item) => {
            if (!(item.id in newQuantities)) {
              newQuantities[item.id] = 1
            }
          })
          return newQuantities
        })
      })
      .catch(err => console.error('Error loading items:', err))
      .finally(() => setLoading(false))
  }, [selectedCategory])

  if (!selectedCategory) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Select a category to see items
      </div>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        Loading items...
      </div>
    )
  }

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantities(prev => ({ ...prev, [itemId]: newQuantity }))
  }

  const handleAddToCart = (item: Item) => {
    const quantity = quantities[item.id] || 1
    addItem({
      id: item.id,
      name: item.name,
      height: item.height,
      width: item.width,
      length: item.length,
      volume: item.volume_m3,
    }, quantity)
    
    // Call the original onAddItem callback
    onAddItem(item)
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-muted/50 rounded-md p-3"
        >
          <div className="flex-1">
            <span className="text-sm font-medium">{item.name}</span>
            <div className="text-xs text-muted-foreground">
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
  )
}
