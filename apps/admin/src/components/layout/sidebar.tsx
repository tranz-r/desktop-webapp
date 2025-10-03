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
import { cn } from '../../lib/utils';

interface SidebarProps {
  isCollapsed?: boolean;
}

const navigationItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard' },
  { href: '/quotes', icon: FileText, label: 'Quotes' },
  { href: '/users', icon: Users, label: 'Users' },
  { href: '/payments', icon: CreditCard, label: 'Payments' },
  { href: '/drivers', icon: Truck, label: 'Drivers' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isCollapsed = false }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn(
      'hidden lg:flex flex-col border-r bg-background transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
