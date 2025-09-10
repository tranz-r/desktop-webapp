# Migration Guide: Unified QuoteContext

## Overview

We've consolidated three separate contexts (`QuoteOptionContext`, `CartContext`, and `BookingContext`) into a single unified `QuoteContext`. This provides better state management, eliminates context nesting, and integrates seamlessly with the new `useQuoteSession` hook.

## What Changed

### Before (Three Separate Contexts)
```tsx
// Old way - multiple providers nested
<CartProvider>
  <BookingProvider>
    <QuoteOptionProvider>
      {children}
    </QuoteOptionProvider>
  </BookingProvider>
</CartProvider>

// Old way - multiple hooks
const { option, setOption } = useQuoteOption();
const { items, addItem } = useCart();
const { vehicle, updateVehicle } = useBooking();
```

### After (Single Unified Context)
```tsx
// New way - single provider
<QuoteProvider>
  {children}
</QuoteProvider>

// New way - single hook
const { 
  state, 
  setQuoteType, 
  addItem, 
  updateVehicle 
} = useQuote();
```

## Migration Steps

### 1. Import Changes
```tsx
// OLD
import { useQuoteOption } from '@/contexts/QuoteOptionContext';
import { useCart } from '@/contexts/CartContext';
import { useBooking } from '@/contexts/BookingContext';

// NEW
import { useQuote } from '@/contexts/QuoteContext';
```

### 2. Hook Usage Changes

#### QuoteOptionContext → QuoteContext
```tsx
// OLD
const { option, setOption, clearOption } = useQuoteOption();

// NEW
const { state: { quoteType }, setQuoteType, clearQuoteType } = useQuote();
```

#### CartContext → QuoteContext
```tsx
// OLD
const { 
  items, 
  addItem, 
  removeItem, 
  updateQuantity, 
  getTotalItems, 
  getTotalVolume 
} = useCart();

// NEW
const { 
  state: { items }, 
  addItem, 
  removeItem, 
  updateItemQuantity, 
  getTotalItems, 
  getTotalVolume 
} = useQuote();
```

#### BookingContext → QuoteContext
```tsx
// OLD
const { 
  vehicle, 
  schedule, 
  pricing, 
  customer, 
  updateVehicle, 
  updateSchedule, 
  updatePricing, 
  updateCustomer 
} = useBooking();

// NEW
const { 
  state: { vehicle, schedule, pricing, customer }, 
  updateVehicle, 
  updateSchedule, 
  updatePricing, 
  updateCustomer 
} = useQuote();
```

### 3. State Access Changes

#### Before
```tsx
const { option } = useQuoteOption();
const { items } = useCart();
const { vehicle } = useBooking();

// Access individual properties
const quoteType = option;
const cartItems = items;
const selectedVan = vehicle.selectedVan;
```

#### After
```tsx
const { state } = useQuote();

// Access all properties from single state object
const quoteType = state.quoteType;
const cartItems = state.items;
const selectedVan = state.vehicle.selectedVan;
```

### 4. Function Name Changes

Some function names have been updated for consistency:

- `updateQuantity` → `updateItemQuantity`
- `clearCart` → `clearItems`
- `resetBooking` → `resetQuote`

## Complete Example

### Before
```tsx
import { useQuoteOption } from '@/contexts/QuoteOptionContext';
import { useCart } from '@/contexts/CartContext';
import { useBooking } from '@/contexts/BookingContext';

export default function MyComponent() {
  const { option, setOption } = useQuoteOption();
  const { items, addItem, getTotalItems } = useCart();
  const { vehicle, updateVehicle } = useBooking();

  const handleSubmit = () => {
    setOption(QuoteOption.Send);
    addItem({ id: 1, name: 'Item', height: 100, width: 100, length: 100 });
    updateVehicle({ selectedVan: 'largeVan' });
  };

  return (
    <div>
      <p>Quote Type: {option}</p>
      <p>Items: {getTotalItems()}</p>
      <p>Van: {vehicle.selectedVan}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

### After
```tsx
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteOption } from '@/types/booking';

export default function MyComponent() {
  const { 
    state, 
    setQuoteType, 
    addItem, 
    updateVehicle 
  } = useQuote();

  const handleSubmit = () => {
    setQuoteType(QuoteOption.Send);
    addItem({ id: 1, name: 'Item', height: 100, width: 100, length: 100 });
    updateVehicle({ selectedVan: 'largeVan' });
  };

  return (
    <div>
      <p>Quote Type: {state.quoteType}</p>
      <p>Items: {state.items.length}</p>
      <p>Van: {state.vehicle.selectedVan}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```

## Benefits of the New Approach

1. **Single Source of Truth**: All quote data in one place
2. **Better Performance**: Single context re-render instead of multiple
3. **Cleaner API**: One context to rule them all
4. **Easier Persistence**: Integrated with `useQuoteSession` for server sync
5. **Reduced Complexity**: No more context nesting or state synchronization issues
6. **Type Safety**: Better TypeScript support with unified state interface

## Testing Your Migration

After migrating, verify that:
- All quote-related state is accessible
- State updates work correctly
- Components re-render as expected
- No console errors about missing context providers

## Need Help?

If you encounter issues during migration, check:
1. Import statements are updated
2. Hook usage follows the new pattern
3. State access uses the `state` object
4. Function names match the new API
