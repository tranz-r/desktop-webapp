# Tranzr Monorepo

This is a Turborepo-based monorepo.

- apps/web: Next.js customer-facing web app
- apps/admin: (planned) Admin app
- packages/*: (planned) Shared packages (ui, config, tsconfig, tailwind-config, utils)

## Commands

- npm run dev: Run all apps in dev (parallel)
- npm run build: Build all apps
- npm run start: Start all apps

## Environment variables in a Turborepo

Each app manages its own env files. Next.js loads env files from the app directory in this order:

- .env.local (git-ignored)
- .env.development.local, .env.production.local (git-ignored)
- .env, .env.development, .env.production (checked in if needed)

For browser exposure, prefix variables with `NEXT_PUBLIC_`. Server-only keys (like Stripe secrets) must not have that prefix and remain on the server side (API routes, server actions, or backend services).

Per-app examples:

- apps/web/.env.example → copy to apps/web/.env.local and fill values
- apps/admin/.env.example → copy to apps/admin/.env.local and fill values

CI/CD: Provide env via your deploy platform. Turbo is configured (see turbo.json) to pass through `NEXT_PUBLIC_*`, `STRIPE_*`, and `SUPABASE_*` to build/dev tasks. Adjust as needed.

Tips:

- Keep secrets out of git: use .env.local for local dev and your CI secret store for builds.
- If you need shared values across apps, prefer CI-level variables or a root `.env` only for non-secrets; override per app with `.env.local`.

## IndexedDB Architecture & Data Flow

### Overview

The Tranzr web application implements an **Offline-First** architecture using IndexedDB as a smart client-side cache. This design ensures users can complete their entire quote journey without internet connectivity while maintaining data consistency with the backend.

### Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   IndexedDB     │    │   Backend       │
│   (React)       │◄──►│   (Cache)       │◄──►│   (PostgreSQL)  │
│                 │    │                 │    │                 │
│ • QuoteContext  │    │ • Local Storage │    │ • Source of     │
│ • Components    │    │ • Offline Data  │    │   Truth         │
│ • User Input    │    │ • Performance   │    │ • Persistence   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Data Flow

#### 1. User Journey Flow
```
User selects quote type (Send/Receive)
         ↓
IndexedDB creates/updates quote entry
         ↓
User fills collection-delivery form
         ↓
IndexedDB saves address data
         ↓
User adds inventory items
         ↓
IndexedDB saves inventory data
         ↓
User selects pricing tier
         ↓
IndexedDB saves pricing data
         ↓
User proceeds to payment
         ↓
Backend receives complete quote data
```

#### 2. Real-time Synchronization
```typescript
// In QuoteContext.tsx
const updateQuote = useCallback(async (updates: Partial<QuoteData>) => {
  // 1. Update React state immediately (UI responsiveness)
  setState(prev => ({
    ...prev,
    quotes: {
      ...prev.quotes,
      [activeQuoteType]: {
        ...prev.quotes[activeQuoteType],
        ...updates
      }
    }
  }));

  // 2. Save to IndexedDB (local persistence)
  await saveToIndexDB(activeQuoteType, {
    ...state.quotes[activeQuoteType],
    ...updates
  });

  // 3. Optionally save to backend (when appropriate)
  if (shouldSaveToBackend(updates)) {
    await saveQuote(activeQuoteType);
  }
}, [activeQuoteType, state.quotes, saveToIndexDB, saveQuote]);
```

### IndexedDB Data Structure

#### Database: `tranzr-web v1`
```typescript
// Key-Value Store Structure
{
  'tranzr:quotes': Record<QuoteOption, QuoteData>,
  // Other application data can be stored here
}
```

#### Quote Data Structure
```typescript
interface QuoteData {
  quoteReference?: string;        // TRZ-XXX-XXX
  items: InventoryItem[];         // User's inventory
  vanType: VanType;               // Selected van size
  driverCount: number;            // Number of drivers
  collectionDate?: Date;          // Pickup date
  deliveryDate?: Date;            // Delivery date
  hours?: number;                 // Service hours
  flexibleTime?: boolean;         // Time flexibility
  timeSlot?: TimeSlot;            // Morning/Afternoon/Evening
  origin?: Address;               // Pickup address
  destination?: Address;          // Delivery address
  distanceMiles?: number;         // Calculated distance
  pricingTier?: PricingTier;      // Service tier
  totalCost?: number;             // Calculated cost
  // ... other quote properties
}
```

### Technical Implementation

#### Database Operations
```typescript
// IndexedDB operations are asynchronous
const db = await openDB('tranzr-web', 1, {
  upgrade(db) {
    // Create object store for quotes
    if (!db.objectStoreNames.contains('kv')) {
      db.createObjectStore('kv');
    }
  }
});

// Save operation
await db.put('kv', value, key);

// Load operation
const value = await db.get('kv', key);
```

#### Data Transformation
```typescript
// Frontend → Backend transformation
const transformToBackend = (quoteData: QuoteData): BackendQuote => ({
  sessionId: null, // Set by backend
  quoteReference: quoteData.quoteReference,
  type: quoteData.type,
  vanType: quoteData.vanType,
  driverCount: quoteData.driverCount,
  origin: quoteData.origin,
  destination: quoteData.destination,
  // ... other transformations
  version: quoteData.version || 0
});
```

#### Frontend Integration
```typescript
// Loading data on component mount
useEffect(() => {
  const loadQuoteData = async () => {
    const savedData = await loadFromIndexDB(activeQuoteType);
    if (savedData) {
      setState(prev => ({
        ...prev,
        quotes: {
          ...prev.quotes,
          [activeQuoteType]: savedData
        }
      }));
    }
  };
  
  if (activeQuoteType) {
    loadQuoteData();
  }
}, [activeQuoteType]);

// Form submission flow
const onSubmit = async (data: FormData) => {
  // 1. Update local state and IndexedDB
  await updateQuote({
    origin: data.origin,
    destination: data.destination,
    distanceMiles: data.distance
  });
  
  // 2. Navigate to next step
  router.push('/inventory');
};
```

#### Backend Integration
```typescript
// When saving to backend
const saveQuote = async (quoteType: QuoteOption) => {
  const quoteData = state.quotes[quoteType];
  
  // Transform frontend data to backend format
  const backendQuote = transformToBackend(quoteData);
  
  // Send to backend API
  const response = await quoteApi.saveQuote(quoteType, backendQuote);
  
  if (response.success) {
    // Update local data with backend response
    await updateQuote({
      quoteReference: response.quote.quoteReference,
      version: response.quote.version
    });
  }
};

// ETag/Version Management
interface QuoteResponse {
  quote: BackendQuote;
  etag: string; // PostgreSQL xmin version
}

// Frontend stores version for future updates
await updateQuote({
  version: parseInt(response.etag)
});
```

### Error Handling & Recovery

#### IndexedDB Failures
```typescript
try {
  await saveToIndexDB(key, value);
} catch (error) {
  console.error('IndexedDB save failed:', error);
  // Fallback to localStorage or show user error
  // Data is still in React state, so UI remains functional
}
```

#### Backend Sync Failures
```typescript
try {
  await saveQuote(quoteType);
} catch (error) {
  console.error('Backend sync failed:', error);
  // Data remains in IndexedDB
  // Can retry later or show user notification
  // User can continue working offline
}
```

### Key Benefits

#### 1. Offline-First Architecture
- **IndexedDB stores data locally** even when internet is unavailable
- **User can continue working** through the entire quote flow offline
- **Data syncs to backend** when connection is restored

#### 2. Performance Optimization
- **No network delays** for local data operations
- **Instant UI updates** from local cache
- **Reduced server load** by minimizing API calls

#### 3. Data Persistence
- **Survives page refreshes** and browser restarts
- **Maintains user progress** across sessions
- **Prevents data loss** during form completion

#### 4. User Experience
- **Seamless navigation** between pages without data loss
- **Instant form population** from cached data
- **Smooth user experience** without loading delays
- **Resilient to network issues**

### Storage Layer Structure

```
IndexedDB (tranzr-web v1)
├── KV Store
    ├── 'tranzr:quotes' → Record<QuoteOption, QuoteData>
    └── Other application data
```

### Data Flow Summary

**IndexedDB serves as the "smart cache"** in the system:

- **Frontend**: Provides instant data access and offline capability
- **Backend**: Receives complete, validated data when ready
- **User**: Experiences smooth, uninterrupted quote creation flow
- **System**: Maintains data integrity and performance

The architecture follows the **"Offline-First"** principle, ensuring users can complete their entire quote journey even without internet connectivity, while maintaining data consistency with the backend when possible.

