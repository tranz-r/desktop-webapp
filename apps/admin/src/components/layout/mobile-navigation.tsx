'use client';

import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Users, 
  CreditCard, 
  Truck, 
  Settings 
} from 'lucide-react';
import { NavigationItem } from '../navigation/navigation-item';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/quotes', icon: FileText, label: 'Quotes' },
  { href: '/users', icon: Users, label: 'Users' },
  { href: '/payments', icon: CreditCard, label: 'Payments' },
  { href: '/drivers', icon: Truck, label: 'Drivers' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary"></div>
            Tranzr Admin
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-6 space-y-1">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              onClick={onClose}
            />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
