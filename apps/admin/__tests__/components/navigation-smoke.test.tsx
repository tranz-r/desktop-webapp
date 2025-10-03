import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Sidebar } from '../../src/components/layout/sidebar';

vi.mock('next/navigation', async (orig) => {
  const actual: any = await (orig as any)();
  return {
    ...actual,
    usePathname: vi.fn(() => '/dashboard'),
  };
});

describe('Navigation Smoke', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all sidebar navigation labels', () => {
    render(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Quotes')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Drivers')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('marks Dashboard as active when pathname is /dashboard', () => {
    render(<Sidebar />);
    const dashboard = screen.getByText('Dashboard');
    expect(dashboard.closest('a')?.className).toContain('bg-accent');
  });
});
