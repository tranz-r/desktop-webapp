import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import QuotesPage from '../../src/app/(admin)/quotes/page';

describe('Quotes Page', () => {
  it('renders the Quotes heading and description', () => {
    render(<QuotesPage />);
    expect(screen.getByText('Quotes')).toBeInTheDocument();
    expect(screen.getByText('Manage and track all quotes')).toBeInTheDocument();
  });

  it('shows a table with dummy quote rows', async () => {
    render(<QuotesPage />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/Quote Ref/)).toBeInTheDocument();
    expect(screen.getByText(/Type/)).toBeInTheDocument();
    expect(screen.getByText(/Status/)).toBeInTheDocument();
    expect(screen.getByText(/Customer/)).toBeInTheDocument();

    // dummy row evidence
    expect(screen.getByText('TRZ-0001')).toBeInTheDocument();
    expect(screen.getAllByText('Send').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Pending').length).toBeGreaterThan(0);
  });
});
