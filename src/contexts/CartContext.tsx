"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

interface CartItem {
  id: number
  name: string
  height: number
  width: number
  length: number
  volume: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  updateItemDimensions: (id: number, dimensions: { height: number; width: number; length: number }) => void
  getTotalItems: () => number
  getTotalVolume: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('tranzr-cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('tranzr-cart', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      } else {
        // Add new item
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const updateItemDimensions = (id: number, dimensions: { height: number; width: number; length: number }) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id 
          ? { 
              ...item, 
              height: dimensions.height,
              width: dimensions.width,
              length: dimensions.length,
              volume: (dimensions.height * dimensions.width * dimensions.length) / 1000000 // Convert to m³
            } 
          : item
      )
    )
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalVolume = () => {
    return items.reduce((total, item) => total + (item.volume * item.quantity), 0)
  }

  const clearCart = () => {
    setItems([])
  }

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    updateItemDimensions,
    getTotalItems,
    getTotalVolume,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
