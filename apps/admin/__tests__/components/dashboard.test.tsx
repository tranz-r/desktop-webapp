import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import DashboardPage from '../../src/app/(admin)/dashboard/page';

describe('Dashboard Page', () => {
  it('renders the Dashboard heading', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('shows placeholder metric cards', () => {
    render(<DashboardPage />);
    expect(screen.getByText('Total Quotes')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Drivers')).toBeInTheDocument();
  });
})
