import { z } from 'zod';

export const AddressSchema = z.object({
  line1: z.string().optional().default(''),
  postcode: z.string().optional().default(''),
  floor: z.number().int().min(0).max(50).optional(),
  hasElevator: z.boolean().optional(),
});

export const VehicleSchema = z.object({
  selectedVan: z.string().optional(),
  driverCount: z.number().int().min(1).max(10).optional(),
});

export const ScheduleSchema = z.object({
  dateISO: z.string().optional(),
  deliveryDateISO: z.string().optional(),
  hours: z.number().int().min(1).max(24).optional(),
  flexibleTime: z.boolean().optional(),
  timeSlot: z.enum(['morning', 'afternoon', 'evening']).optional(),
});

export const PricingSchema = z.object({
  pricingTier: z.enum(['eco', 'ecoPlus', 'standard', 'premium']).optional(),
  totalCost: z.number().optional(),
});

export const ItemSchema = z.object({
  id: z.any().optional(),
  name: z.string(),
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  quantity: z.number().int().optional(),
});

export const CustomerSchema = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  billingAddress: AddressSchema.optional(),
});

export const OriginDestinationSchema = z.object({
  origin: AddressSchema.optional(),
  destination: AddressSchema.optional(),
  distanceMiles: z.number().optional(),
  fullName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  billingAddress: AddressSchema.optional(),
});

export const CanonicalQuoteSchema = z.object({
  option: z.string().optional(),
  items: z.array(ItemSchema).optional(),
  vehicle: VehicleSchema.optional(),
  schedule: ScheduleSchema.optional(),
  pricing: PricingSchema.optional(),
  originDestination: OriginDestinationSchema.optional(),
  customer: CustomerSchema.optional(),
  bookingFinalizedAt: z.string().optional(),
}).passthrough();

export type CanonicalQuote = z.infer<typeof CanonicalQuoteSchema>;

export function normalizeQuote(input: unknown): CanonicalQuote {
  const parsed = CanonicalQuoteSchema.safeParse(input);
  return parsed.success ? parsed.data : {};
}


