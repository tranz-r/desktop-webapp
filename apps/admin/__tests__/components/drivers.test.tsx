import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import DriversPage from '../../src/app/drivers/page';

describe('Drivers Page', () => {
  it('renders the Drivers heading and description', () => {
    render(<DriversPage />);
    expect(screen.getByText('Drivers')).toBeInTheDocument();
    expect(screen.getByText('Manage drivers and job assignments')).toBeInTheDocument();
  });

  it('shows a table with dummy driver rows', async () => {
    render(<DriversPage />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();

    // dummy rows
    expect(screen.getByText('David Green')).toBeInTheDocument();
    expect(screen.getByText('david@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0);
  });
});
