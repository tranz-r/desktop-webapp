// Test component to verify icon fallback behavior
"use client";

import React from 'react';
import { CategoryIcon } from '@/components/icons';
import { useTranzrData } from '@/hooks/useTranzrData';

const IconFallbackTest = () => {
  const { categories } = useTranzrData();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Icon Fallback Test</h2>
      
      {categories.slice(0, 5).map(category => (
        <div key={category.id} className="flex items-center space-x-4 p-2 border rounded">
          {/* With React Component Mapping */}
          <div className="flex items-center space-x-2">
            <CategoryIcon
              categoryName={category.name}
              iconUrl={category.icon}
              className="w-8 h-8"
            />
            <span>With mapping</span>
          </div>
          
          {/* Force URL Only (no categoryName) */}
          <div className="flex items-center space-x-2">
            <CategoryIcon
              iconUrl={category.icon}
              className="w-8 h-8"
            />
            <span>URL only</span>
          </div>
          
          {/* Show the URL being used */}
          <div className="text-xs text-gray-500 flex-1">
            <div><strong>{category.name}</strong></div>
            <div className="truncate">{category.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconFallbackTest;
