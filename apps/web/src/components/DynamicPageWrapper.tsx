"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic imports for pages that use useQuote to prevent static generation issues
export const DynamicQuoteOption = dynamic(() => import('../app/quote-option/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicInventory = dynamic(() => import('../app/inventory/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicCollectionDelivery = dynamic(() => import('../app/collection-delivery/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicOriginDestination = dynamic(() => import('../app/origin-destination/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicVanSelection = dynamic(() => import('../app/van-selection/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});


export const DynamicPricing = dynamic(() => import('../app/pricing/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicSummary = dynamic(() => import('../app/summary/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicPay = dynamic(() => import('../app/pay/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicConfirmation = dynamic(() => import('../app/confirmation/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicResult = dynamic(() => import('../app/result/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicQuotation = dynamic(() => import('../app/quotation/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicStorage = dynamic(() => import('../app/storage/page'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export const DynamicServices = {
  PianoMoving: dynamic(() => import('../app/services/piano-moving/page'), {
    ssr: false,
    loading: () => <div>Loading...</div>
  }),
  ValuableItems: dynamic(() => import('../app/services/valuable-items/page'), {
    ssr: false,
    loading: () => <div>Loading...</div>
  }),
  WoodenCratePacking: dynamic(() => import('../app/services/wooden-crate-packing/page'), {
    ssr: false,
    loading: () => <div>Loading...</div>
  })
};

export const DynamicResources = {
  CostCalculator: dynamic(() => import('../app/resources/cost-calculator/page'), {
    ssr: false,
    loading: () => <div>Loading...</div>
  })
};
