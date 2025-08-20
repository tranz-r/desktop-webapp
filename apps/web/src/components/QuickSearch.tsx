"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TranzrTypeahead, { SearchResult } from '@/components/TranzrTypeahead';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';

interface QuickSearchProps {
  onSearchResult?: (result: SearchResult) => void;
  className?: string;
}

const QuickSearch: React.FC<QuickSearchProps> = ({ 
  onSearchResult,
  className = "" 
}) => {
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);

  const handleSelect = (result: SearchResult) => {
    setSelectedItem(result);
    onSearchResult?.(result);
  };



  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quick Search */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white block">
          What are you moving?
        </label>
        <TranzrTypeahead
          placeholder="Search for furniture, appliances, categories..."
          onSelect={handleSelect}
          maxResults={6}
          clearOnSelect={false}
        />
      </div>

      {/* Selected Item Display */}
      {selectedItem && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex items-center space-x-2 text-white">
            <Package className="w-4 h-4" />
            <span className="font-medium">{selectedItem.title}</span>
            <span className="text-white/70 text-sm">
              ({selectedItem.type})
            </span>
          </div>
          {selectedItem.subtitle && (
            <div className="text-white/80 text-sm mt-1">
              Category: {selectedItem.subtitle}
            </div>
          )}
        </div>
      )}

      {/* Get Instant Quote Button */}
      <Link href="/quote-option">
        <Button
          size="lg"
          variant="default"
          className="w-full bg-secondary-400 hover:bg-secondary-500 text-white"
          disabled={!selectedItem}
        >
          {selectedItem ? 'GET INSTANT QUOTE FOR THIS ITEM' : 'SELECT AN ITEM FIRST'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
};

export default QuickSearch;
