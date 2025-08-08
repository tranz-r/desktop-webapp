import { VanInfo, VanType } from '@/types/booking';

export const VAN_TABLE: Record<VanType, VanInfo> = {
  smallVan: {
    id: 'smallVan',
    name: 'Small Van',
    capacityM3: 6,
    basePrice: 45,
    dimensions: { lengthM: 1.7, widthM: 1.5, heightM: 2.5 },
    driverBaseCount: 1,
  },
  mediumVan: {
    id: 'mediumVan',
    name: 'Medium Van',
    capacityM3: 12,
    basePrice: 65,
    dimensions: { lengthM: 2.5, widthM: 1.6, heightM: 2.6 },
    driverBaseCount: 1,
  },
  largeVan: {
    id: 'largeVan',
    name: 'Large Van',
    capacityM3: 18,
    basePrice: 85,
    dimensions: { lengthM: 3.1, widthM: 1.85, heightM: 2.8 },
    driverBaseCount: 1,
  },
  xlLuton: {
    id: 'xlLuton',
    name: 'XL Luton',
    capacityM3: 24,
    basePrice: 110,
    dimensions: { lengthM: 4.0, widthM: 2.0, heightM: 3.0 },
    driverBaseCount: 1,
  },
};

export function recommendVanByVolume(totalVolumeM3: number): VanType {
  if (totalVolumeM3 <= VAN_TABLE.smallVan.capacityM3) return 'smallVan';
  if (totalVolumeM3 <= VAN_TABLE.mediumVan.capacityM3) return 'mediumVan';
  if (totalVolumeM3 <= VAN_TABLE.largeVan.capacityM3) return 'largeVan';
  return 'xlLuton';
}
