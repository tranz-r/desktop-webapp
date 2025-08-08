"use client"

import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"

interface CartIconProps {
  onClick?: () => void
  className?: string
}

export function CartIcon({ onClick, className }: CartIconProps) {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <div 
      className={`relative cursor-pointer group transition-all duration-200 hover:scale-105 ${className || ''}`}
      onClick={onClick}
    >
      {/* Cart Icon with modern styling */}
      <div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
        <ShoppingCart className="h-8 w-8 text-white" />
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      
      {/* Badge with modern design */}
      {totalItems > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-1 -right-1 h-7 w-7 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-500 shadow-lg border-2 border-white animate-pulse"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </Badge>
      )}
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {totalItems} item{totalItems !== 1 ? 's' : ''} in cart
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  )
}
