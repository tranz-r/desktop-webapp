import { PricingTierId, VanType } from '@/types/booking';
import { VAN_TABLE } from '@/lib/recommend-van';

export interface CostInputs {
  van: VanType;
  driverCount: number; // 1 or 2
  distanceKm: number;  // computed later; 0 for now
  originFloor?: number; // 0 ground
  originElevator?: boolean;
  destinationFloor?: number;
  destinationElevator?: boolean;
  pricingTier?: PricingTierId;
}

export interface CostBreakdown {
  baseVan: number;
  distance: number;
  floors: number;
  elevatorAdjustment: number;
  drivers: number;
  tierAdjustment: number;
  total: number;
}

export function computeCost(inputs: CostInputs): CostBreakdown {
  const vanInfo = VAN_TABLE[inputs.van];
  const baseVan = vanInfo.basePrice;

  const perKm = 1.2; // placeholder
  const distance = Math.max(0, inputs.distanceKm || 0) * perKm;

  const floorSurchargePerFloor = 5; // placeholder
  const originFloors = Math.max(0, inputs.originFloor || 0);
  const destFloors = Math.max(0, inputs.destinationFloor || 0);
  const floors = (originFloors + destFloors) * floorSurchargePerFloor;

  const elevatorAdjustment = ((inputs.originElevator ? -1 : 0) + (inputs.destinationElevator ? -1 : 0)) * 2;

  const driverExtraFee = 25; // additional per extra driver
  const drivers = Math.max(0, (inputs.driverCount || 1) - 1) * driverExtraFee;

  const tierMultiplier: Record<PricingTierId, number> = {
    eco: 1.0,
    ecoPlus: 1.08,
    standard: 1.15,
    premium: 1.35,
  };
  const preTier = baseVan + distance + floors + elevatorAdjustment + drivers;
  const tierAdj = inputs.pricingTier ? preTier * (tierMultiplier[inputs.pricingTier] - 1) : 0;

  const total = Math.max(0, Math.round((preTier + tierAdj) * 100) / 100);
  return { baseVan, distance, floors, elevatorAdjustment, drivers, tierAdjustment: tierAdj, total };
}
