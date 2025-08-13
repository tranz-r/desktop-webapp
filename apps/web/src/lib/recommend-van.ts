import { VanInfo, VanType } from '@/types/booking';

export const VAN_TABLE: Record<VanType, VanInfo> = {
  smallVan: {
    id: 'smallVan',
    name: 'Small Van',
    capacityM3: 10,
    basePrice: 45,
    dimensions: { lengthM: 3.5, widthM: 1.7, heightM: 1.8 },
    driverBaseCount: 1,
  },
  mediumVan: {
    id: 'mediumVan',
    name: 'Medium Van',
    capacityM3: 20,
    basePrice: 65,
    dimensions: { lengthM: 4.2, widthM: 1.8, heightM: 1.9 },
    driverBaseCount: 1,
  },
  largeVan: {
    id: 'largeVan',
    name: '3.5 Luton Van with Tail Lift',
    capacityM3: 35,
    basePrice: 85,
    dimensions: { lengthM: 5.5, widthM: 2.1, heightM: 2.2 },
    driverBaseCount: 1,
  },
  xlLuton: {
    id: 'xlLuton',
    name: 'Extra Large Van',
    capacityM3: 50,
    basePrice: 110,
    dimensions: { lengthM: 6.2, widthM: 2.4, heightM: 2.5 },
    driverBaseCount: 1,
  },
};

export function recommendVanByVolume(totalVolumeM3: number): VanType {
  if (totalVolumeM3 <= VAN_TABLE.smallVan.capacityM3) return 'smallVan';
  if (totalVolumeM3 <= VAN_TABLE.mediumVan.capacityM3) return 'mediumVan';
  if (totalVolumeM3 <= VAN_TABLE.largeVan.capacityM3) return 'largeVan';
  return 'xlLuton';
}
