import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import UsersPage from '../../src/app/users/page';

describe('Users Page', () => {
  it('renders the Users heading and description', () => {
    render(<UsersPage />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Manage customers and drivers')).toBeInTheDocument();
  });

  it('shows a table with dummy user rows', async () => {
    render(<UsersPage />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByText(/Email/)).toBeInTheDocument();
    expect(screen.getByText(/Role/)).toBeInTheDocument();

    // dummy rows
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('Customer').length).toBeGreaterThan(0);
  });
});
