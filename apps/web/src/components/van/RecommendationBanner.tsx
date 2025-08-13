"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';

export default function RecommendationBanner({ text }: { text: string }) {
  return (
    <div className="rounded-md bg-primary-50 border border-primary-200 p-3 text-sm flex items-center gap-2">
      <Badge variant="secondary" className="bg-primary-100 text-primary-700">Recommended</Badge>
      <div className="text-primary-800" suppressHydrationWarning>{text}</div>
    </div>
  );
}
