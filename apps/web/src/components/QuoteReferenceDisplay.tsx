import React from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteOption } from '@/types/booking';

interface QuoteReferenceDisplayProps {
  type: QuoteOption;
  className?: string;
}

export function QuoteReferenceDisplay({ type, className = '' }: QuoteReferenceDisplayProps) {
  const { getQuoteReference } = useQuote();
  const reference = getQuoteReference(type);
  
  if (!reference) {
    return null;
  }
  
  return (
    <div className={`quote-reference ${className}`}>
      <span className="text-sm font-medium text-gray-600">Quote Reference:</span>
      <span className="ml-2 text-sm font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
        {reference}
      </span>
    </div>
  );
}
