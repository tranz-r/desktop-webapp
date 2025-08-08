"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"
import { CategoryIcon } from "@/components/icons"
import { ChevronsUp, ChevronsDown, ChevronsLeft, ChevronsRight } from "lucide-react"

interface Category {
  id: number
  name: string
  icon: string
}

interface CategoryListProps {
  selectedCategory: number | null
  onSelectCategory: (categoryId: number) => void
  isMobile?: boolean
}

export function CategoryList({ selectedCategory, onSelectCategory, isMobile = false }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/data/Tranzr_goods_enriched_dimensions-Depth.json')
      .then(res => res.json())
      .then(data => setCategories(data.categories))
      .catch(err => console.error('Error loading categories:', err))
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const checkScrollPosition = () => {
      if (isMobile) {
        // Horizontal scroll for mobile
        const { scrollLeft, scrollWidth, clientWidth } = container
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
      } else {
        // Vertical scroll for desktop
        const { scrollTop, scrollHeight, clientHeight } = container
        setCanScrollUp(scrollTop > 0)
        setCanScrollDown(scrollTop < scrollHeight - clientHeight - 1)
      }
    }

    // Check initial scroll position
    checkScrollPosition()

    // Add scroll event listener
    container.addEventListener('scroll', checkScrollPosition)
    
    // Check on resize
    window.addEventListener('resize', checkScrollPosition)

    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [categories, isMobile])

  if (isMobile) {
    return (
      <div className="relative">
        {/* Left scroll indicator */}
        <div className={cn(
          "absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none z-20 transition-all duration-300",
          canScrollLeft ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}>
          <div className="bg-secondary/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-secondary-foreground/20 animate-pulse">
            <ChevronsLeft className="h-5 w-5 text-secondary-foreground" />
          </div>
        </div>
        
        {/* Right scroll indicator */}
        <div className={cn(
          "absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none z-20 transition-all duration-300",
          canScrollRight ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}>
          <div className="bg-secondary/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-secondary-foreground/20 animate-pulse">
            <ChevronsRight className="h-5 w-5 text-secondary-foreground" />
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="flex gap-4 p-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className={cn(
                  "flex flex-col items-center rounded-lg transition-all flex-shrink-0",
                  "bg-white hover:bg-accent hover:text-accent-foreground",
                  "border shadow-sm",
                  selectedCategory === category.id && "ring-2 ring-primary border-primary",
                  "w-24 h-24" // Fixed size for mobile
                )}
              >
                <div className="flex-1 flex items-center justify-center w-full h-full">
                  <CategoryIcon
                    categoryName={category.name}
                    iconUrl={category.icon}
                    className="w-12 h-12" // Smaller icons for mobile
                  />
                </div>
                <div className="text-center text-xs font-semibold whitespace-pre-line px-1">
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Desktop layout (existing code)
  return (
    <div className="relative h-full">
      {/* Top scroll indicator */}
      <div className={cn(
        "absolute top-2 left-1/2 transform -translate-x-1/2 pointer-events-none z-20 transition-all duration-300",
        canScrollUp ? "opacity-100 scale-100" : "opacity-0 scale-75"
      )}>
        <div className="bg-secondary/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-secondary-foreground/20 animate-pulse">
          <ChevronsUp className="h-5 w-5 text-secondary-foreground" />
        </div>
      </div>
      
      {/* Bottom scroll indicator */}
      <div className={cn(
        "absolute bottom-2 left-1/2 transform -translate-x-1/2 pointer-events-none z-20 transition-all duration-300",
        canScrollDown ? "opacity-100 scale-100" : "opacity-0 scale-75"
      )}>
        <div className="bg-secondary/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-secondary-foreground/20 animate-pulse">
          <ChevronsDown className="h-5 w-5 text-secondary-foreground" />
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="grid grid-cols-2 gap-4 p-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "flex flex-col items-center rounded-lg transition-all",
                "bg-white hover:bg-accent hover:text-accent-foreground",
                "border shadow-sm",
                selectedCategory === category.id && "ring-2 ring-primary border-primary",
                "aspect-square" // Make it square
              )}
            >
              <div className="flex-1 flex items-center justify-center w-full h-full">
                <CategoryIcon
                  categoryName={category.name}
                  iconUrl={category.icon}
                  className="w-32 h-32" // Much larger icons for better visibility
                />
              </div>
              <div className="text-center text-sm font-semibold whitespace-pre-line">
                {category.name}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}