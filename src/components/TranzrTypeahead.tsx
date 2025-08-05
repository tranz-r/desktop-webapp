"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CategoryIcon } from '@/components/icons';
import { useTranzrData } from '@/hooks/useTranzrData';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define search result types
export interface SearchResult {
  id: string;
  type: 'category' | 'product';
  title: string;
  subtitle?: string;
  categoryName?: string;
  categoryId?: number;
  iconUrl?: string;
}

interface TranzrTypeaheadProps {
  placeholder?: string;
  onSelect?: (result: SearchResult) => void;
  onInputChange?: (value: string) => void;
  className?: string;
  maxResults?: number;
  minSearchLength?: number;
  showCategories?: boolean;
  showProducts?: boolean;
  autoFocus?: boolean;
  clearOnSelect?: boolean;
}

const TranzrTypeahead: React.FC<TranzrTypeaheadProps> = ({
  placeholder = "Search categories and products...",
  onSelect,
  onInputChange,
  className = "",
  maxResults = 10,
  minSearchLength = 1,
  showCategories = true,
  showProducts = true,
  autoFocus = false,
  clearOnSelect = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const { categories, products, loading, error } = useTranzrData();

  // Generate search results
  const searchResults = useMemo(() => {
    if (!searchTerm || searchTerm.length < minSearchLength) {
      return [];
    }

    const results: SearchResult[] = [];
    const searchLower = searchTerm.toLowerCase();

    // Search categories
    if (showCategories) {
      categories
        .filter(category => 
          category.name.toLowerCase().includes(searchLower)
        )
        .slice(0, Math.floor(maxResults / 2))
        .forEach(category => {
          results.push({
            id: `category-${category.id}`,
            type: 'category',
            title: category.name,
            subtitle: 'Category',
            categoryName: category.name,
            categoryId: category.id,
            iconUrl: category.icon,
          });
        });
    }

    // Search products
    if (showProducts) {
      products
        .filter(product => 
          product.name.toLowerCase().includes(searchLower)
        )
        .slice(0, maxResults - results.length)
        .forEach(product => {
          const category = categories.find(cat => cat.id === product.category_id);
          results.push({
            id: `product-${product.id}`,
            type: 'product',
            title: product.name,
            subtitle: category?.name || 'Unknown Category',
            categoryName: category?.name,
            categoryId: product.category_id,
            iconUrl: category?.icon,
          });
        });
    }

    return results;
  }, [searchTerm, categories, products, minSearchLength, maxResults, showCategories, showProducts]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(value.length >= minSearchLength);
    setHighlightedIndex(-1);
    onInputChange?.(value);
  };

  // Handle result selection
  const handleSelect = (result: SearchResult) => {
    onSelect?.(result);
    setIsOpen(false);
    setHighlightedIndex(-1);
    
    if (clearOnSelect) {
      setSearchTerm('');
    } else {
      setSearchTerm(result.title);
    }
    
    inputRef.current?.blur();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < searchResults.length) {
          handleSelect(searchResults[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Clear search
  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && resultsRef.current) {
      const highlightedElement = resultsRef.current.children[highlightedIndex] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length >= minSearchLength && setIsOpen(true)}
          className="pl-10 pr-10"
          autoFocus={autoFocus}
          disabled={loading}
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-80 overflow-hidden shadow-lg">
          <CardContent className="p-0">
            {loading && (
              <div className="p-4 text-center text-gray-500">
                Loading...
              </div>
            )}
            
            {error && (
              <div className="p-4 text-center text-red-500">
                Error loading data
              </div>
            )}
            
            {!loading && !error && searchResults.length === 0 && searchTerm.length >= minSearchLength && (
              <div className="p-4 text-center text-gray-500">
                No results found for "{searchTerm}"
              </div>
            )}
            
            {!loading && !error && searchResults.length > 0 && (
              <div ref={resultsRef} className="max-h-80 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    className={cn(
                      "flex items-center space-x-3 p-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0",
                      highlightedIndex === index 
                        ? "bg-primary-50 text-primary-900" 
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => handleSelect(result)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary-100 rounded-lg">
                      <CategoryIcon
                        categoryName={result.categoryName}
                        iconUrl={result.iconUrl}
                        className="w-5 h-5 text-primary-600"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {result.title}
                      </div>
                      {result.subtitle && (
                        <div className="text-sm text-gray-500 truncate">
                          {result.subtitle}
                        </div>
                      )}
                    </div>

                    {/* Type Badge */}
                    <div className="flex-shrink-0">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                        result.type === 'category' 
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      )}>
                        {result.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TranzrTypeahead;
