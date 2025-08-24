"use client";

import React, { useState } from 'react';
import { QuoteReferenceDisplay } from '@/components/QuoteReferenceDisplay';
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteOption } from '@/types/booking';

export default function TestQuoteReferencePage() {
  const { setActiveQuoteType, getQuoteReference, activeQuoteType, quotes, isHydrated } = useQuote();
  const [selectedType, setSelectedType] = useState<QuoteOption | null>(null);

  const handleSelectQuoteType = async (type: QuoteOption) => {
    setSelectedType(type);
    await setActiveQuoteType(type);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quote Reference Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.values(QuoteOption).map((type) => (
          <div key={type} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 capitalize">{type}</h3>
            <button
              onClick={() => handleSelectQuoteType(type)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-3"
            >
              Select {type}
            </button>
            
            <QuoteReferenceDisplay type={type} className="mt-3" />
            
            <div className="text-sm text-gray-600 mt-2">
              <p>Has Quote Data: {quotes[type] ? 'Yes' : 'No'}</p>
              <p>Reference: {getQuoteReference(type) || 'None'}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Current State</h2>
        <div className="space-y-2">
          <p><strong>Active Quote Type:</strong> {activeQuoteType || 'None'}</p>
          <p><strong>Is Hydrated:</strong> {isHydrated ? 'Yes' : 'No'}</p>
          <p><strong>Quote References:</strong></p>
          <ul className="ml-4 space-y-1">
            {Object.values(QuoteOption).map((type) => (
              <li key={type} className="text-sm">
                {type}: {quotes[type]?.quoteReference || 'None'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
