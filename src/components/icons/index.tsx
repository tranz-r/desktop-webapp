import React from 'react';

// Import your existing SVG components
import PianoMoveSVG from "@/components/PianoMoveSVG";
import ValuableItemMoveSVG from "@/components/ValuableItemMove";
import SvgFullPackingMove from "@/components/FullPackingMove";
import SvgBoxMaterialMove from "@/components/BoxMaterialMove";
import SvgLocalMovesSVG from "@/components/LocalMovesSVG";

// You'll need to create these category icon components
// For now, I'll create placeholder components that you can replace
const VehiclePartsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 7v10c0 5.55 3.84 9.06 9 9.93 5.16-.87 9-4.38 9-9.93V7l-10-5z"/>
  </svg>
);

const BedroomFurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14c1.66 0 3-1.34 3-3S8.66 8 7 8s-3 1.34-3 3 1.34 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm12-3h-8v8H3V9H1v11h2v-2h18v2h2v-9c0-1.1-.9-2-2-2z"/>
  </svg>
);

const OtherIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const LivingRoomFurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V8H1v10h2v-2h18v2h2V9c0-1.1-.9-2-2-2z"/>
  </svg>
);

const StorageSolutionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);

const DiningFurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 9c0-1.1-.9-2-2-2h-1V6c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v1H4c-1.1 0-2 .9-2 2v9h2v-2h16v2h2V9zm-6-2H8V6h8v1z"/>
  </svg>
);

const DecorativeItemsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const HomeAppliancesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 4h2v2H8V4zm0 4h8v10H8V8z"/>
  </svg>
);

const BathroomItemsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-1.1-.9-2-2-2h-1V8c0-1.66-1.34-3-3-3H8C6.34 5 5 6.34 5 8v2H4c-1.1 0-2 .9-2 2v6h2v-2h16v2h2v-6z"/>
  </svg>
);

const OfficeFurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-8 14H4v-2h8v2zm8-4H4v-2h16v2zm0-4H4V8h16v2z"/>
  </svg>
);

const SportingGoodsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L5 8.3V13h2V9.6l2.8-.7z"/>
  </svg>
);

const OutdoorFurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 22H2v-2h2V4h2v16h12V4h2v16h2v2z"/>
  </svg>
);

const MusicalInstrumentsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
  </svg>
);

const KitchenFurnitureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2.01L6 2c-1.1 0-2 .89-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.11-.9-1.99-2-1.99zM18 20H6v-9.02h12V20zm0-11H6V4h12v5zM8 5h2v3H8zm0 4h8v1H8z"/>
  </svg>
);

const GardenToolsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h6v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H4V4h16v10z"/>
  </svg>
);

const CampingEquipmentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.84L18.16 11H17v7H7v-7H5.84L12 4.84z"/>
  </svg>
);

const PetSuppliesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 9.5C5.33 9.5 6 8.83 6 8s-.67-1.5-1.5-1.5S3 7.17 3 8s.67 1.5 1.5 1.5zm0-2C4.78 7.5 5 7.72 5 8s-.22.5-.5.5S4 8.28 4 8s.22-.5.5-.5zm15 2c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S18 7.17 18 8s.67 1.5 1.5 1.5zm0-2c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-6 1c.83 0 1.5-.67 1.5-1.5S14.33 5 13.5 5 12 5.67 12 6.5s.67 1.5 1.5 1.5zm0-2c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm-3 2c.83 0 1.5-.67 1.5-1.5S11.33 5 10.5 5S9 5.67 9 6.5s.67 1.5 1.5 1.5zm0-2c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5zm2.5 11c-2.33 0-4.31-1.46-5.11-3.5C8.69 14.54 6.67 16 4.33 16c-2.76 0-5.33-2.69-5.33-5.5S1.57 5 4.33 5c2.34 0 4.36 1.46 5.17 3.5C10.19 6.46 12.17 5 14.5 5c2.76 0 5.5 2.69 5.5 5.5S17.26 16 14.5 16z"/>
  </svg>
);

const BabyItemsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const ElectronicsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v1h8v-1l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h18v10z"/>
  </svg>
);

const CleaningEquipmentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
  </svg>
);

const FitnessEquipmentIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z"/>
  </svg>
);

// Icon mapping object
export const categoryIconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  // Map category names to components
  'Vehicle Parts': VehiclePartsIcon,
  'Bedroom Furniture': BedroomFurnitureIcon,
  'Other': OtherIcon,
  'Living Room Furniture': LivingRoomFurnitureIcon,
  'Storage Solutions': StorageSolutionsIcon,
  'Dining Furniture': DiningFurnitureIcon,
  'Decorative Items': DecorativeItemsIcon,
  'Home Appliances': HomeAppliancesIcon,
  'Bathroom Items': BathroomItemsIcon,
  'Office Furniture': OfficeFurnitureIcon,
  'Sporting Goods': SportingGoodsIcon,
  'Outdoor Furniture': OutdoorFurnitureIcon,
  'Musical Instruments': MusicalInstrumentsIcon,
  'Kitchen Furniture': KitchenFurnitureIcon,
  'Garden Tools': GardenToolsIcon,
  'Camping Equipment': CampingEquipmentIcon,
  'Pet Supplies': PetSuppliesIcon,
  'Baby Items': BabyItemsIcon,
  'Electronics': ElectronicsIcon,
  'Cleaning Equipment': CleaningEquipmentIcon,
  'Fitness Equipment': FitnessEquipmentIcon,
};

// Alternative mapping by URL patterns if you prefer that approach
export const urlToComponentMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  'vehicle-parts.svg': VehiclePartsIcon,
  'bedroom-furniture.svg': BedroomFurnitureIcon,
  'other.svg': OtherIcon,
  'living-room-furniture.svg': LivingRoomFurnitureIcon,
  'storage-solutions.svg': StorageSolutionsIcon,
  'dining-furniture.svg': DiningFurnitureIcon,
  'decorative-items.svg': DecorativeItemsIcon,
  'home-appliances.svg': HomeAppliancesIcon,
  'bathroom-items.svg': BathroomItemsIcon,
  'office-furniture.svg': OfficeFurnitureIcon,
  'sporting-goods.svg': SportingGoodsIcon,
  'outdoor-furniture.svg': OutdoorFurnitureIcon,
  'musical-instruments.svg': MusicalInstrumentsIcon,
  'kitchen-furniture.svg': KitchenFurnitureIcon,
  'garden-tools.svg': GardenToolsIcon,
  'camping-equipment.svg': CampingEquipmentIcon,
};

// Helper function to get component from category name
export const getCategoryIcon = (categoryName: string): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
  return categoryIconMap[categoryName] || null;
};

// Helper function to get component from URL
export const getIconFromUrl = (iconUrl: string): React.ComponentType<React.SVGProps<SVGSVGElement>> | null => {
  const filename = iconUrl.split('/').pop() || '';
  return urlToComponentMap[filename] || null;
};

// Generic CategoryIcon component that can render based on props
interface CategoryIconProps extends React.SVGProps<SVGSVGElement> {
  categoryName?: string;
  iconUrl?: string;
  fallbackUrl?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  categoryName, 
  iconUrl, 
  fallbackUrl,
  className = "w-6 h-6",
  ...props 
}) => {
  // Try to get component by category name first
  if (categoryName) {
    const IconComponent = getCategoryIcon(categoryName);
    if (IconComponent) {
      return <IconComponent className={className} {...props} />;
    }
  }

  // Try to get component by URL (only if URL is not empty)
  if (iconUrl && iconUrl.trim() !== '') {
    const IconComponent = getIconFromUrl(iconUrl);
    if (IconComponent) {
      return <IconComponent className={className} {...props} />;
    }
  }

  // Fallback to img tag with URL (only if URL is not empty)
  if ((iconUrl && iconUrl.trim() !== '') || (fallbackUrl && fallbackUrl.trim() !== '')) {
    return (
      <img 
        src={iconUrl || fallbackUrl} 
        alt={categoryName || 'Category icon'} 
        className={className}
        {...(props as any)}
      />
    );
  }

  // Final fallback to a default icon
  return <OtherIcon className={className} {...props} />;
};

export default CategoryIcon;

// Re-export all individual icon components for direct use if needed
export {
  VehiclePartsIcon,
  BedroomFurnitureIcon,
  OtherIcon,
  LivingRoomFurnitureIcon,
  StorageSolutionsIcon,
  DiningFurnitureIcon,
  DecorativeItemsIcon,
  HomeAppliancesIcon,
  BathroomItemsIcon,
  OfficeFurnitureIcon,
  SportingGoodsIcon,
  OutdoorFurnitureIcon,
  MusicalInstrumentsIcon,
  KitchenFurnitureIcon,
  GardenToolsIcon,
  CampingEquipmentIcon,
  PetSuppliesIcon,
  BabyItemsIcon,
  ElectronicsIcon,
  CleaningEquipmentIcon,
  FitnessEquipmentIcon,
};
