import React from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteOption } from '@/types/booking';
import { Badge } from '@/components/ui/badge';

interface QuoteReferenceBannerProps {
  className?: string;
  variant?: 'subtle' | 'minimal';
}

export function QuoteReferenceBanner({ className = '', variant = 'subtle' }: QuoteReferenceBannerProps) {
  const { activeQuoteType, getQuoteReference } = useQuote();
  
  // Only show if we have an active quote type and reference
  if (!activeQuoteType || !getQuoteReference(activeQuoteType)) {
    return null;
  }

  const quoteReference = getQuoteReference(activeQuoteType);
  const quoteTypeLabel = activeQuoteType.charAt(0).toUpperCase() + activeQuoteType.slice(1);

  if (variant === 'minimal') {
    return (
      <div className={`inline-flex items-center gap-2 text-xs text-muted-foreground ${className}`}>
        <span className="font-medium">{quoteTypeLabel}:</span>
        <span className="font-mono font-semibold text-foreground">{quoteReference}</span>
      </div>
    );
  }

  // Default subtle variant
  return (
    <div className={`bg-muted/30 border border-muted rounded-md px-3 py-2 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground font-medium">{quoteTypeLabel} Quote</span>
        <span className="font-mono font-semibold text-foreground tracking-wide">
          {quoteReference}
        </span>
      </div>
    </div>
  );
}
