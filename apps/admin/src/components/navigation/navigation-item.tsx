import Link from 'next/link';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavigationItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

export function NavigationItem({ 
  href, 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: NavigationItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive 
          ? 'bg-accent text-accent-foreground' 
          : 'text-muted-foreground'
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  );
}
