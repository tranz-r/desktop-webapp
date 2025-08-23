"use client"

import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useQuote } from "@/contexts/QuoteContext"

interface CartIconProps {
  onClick?: () => void
  className?: string
}

export function CartIcon({ onClick, className }: CartIconProps) {
  const { activeQuoteType, quotes } = useQuote()
  
  // Calculate total items from active quote
  const getTotalItems = () => {
    if (!activeQuoteType) return 0
    const items = quotes[activeQuoteType]?.items || []
    return items.reduce((total, item) => total + item.quantity, 0)
  }
  
  const totalItems = getTotalItems()

  return (
    <div 
      className={`relative cursor-pointer group transition-all duration-200 hover:scale-105 ${className || ''}`}
      onClick={onClick}
    >
      {/* Cart Icon with modern styling */}
      <div className="relative p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
        <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      
      {/* Badge with modern design */}
      {totalItems > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-6 w-6 sm:h-7 sm:w-7 rounded-full p-0 flex items-center justify-center text-xs font-bold bg-red-500 shadow-lg border-2 border-white animate-pulse sm:-top-2 sm:-right-2"
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
