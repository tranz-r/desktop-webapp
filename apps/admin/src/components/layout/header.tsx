'use client';

import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useTransition } from 'react';

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const [isPending, startTransition] = useTransition();

  async function onSignOut() {
    startTransition(async () => {
      await fetch('/auth/signout', { method: 'POST' });
      window.location.href = '/(auth)/login';
    });
  }
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-primary"></div>
          <h1 className="text-lg font-semibold">Tranzr Admin</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onSignOut} disabled={isPending}>
          {isPending ? 'Signing out…' : 'Sign out'}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
