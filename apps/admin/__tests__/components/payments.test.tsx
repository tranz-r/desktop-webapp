import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import PaymentsPage from '../../src/app/payments/page';

describe('Payments Page', () => {
  it('renders the Payments heading and description', () => {
    render(<PaymentsPage />);
    expect(screen.getByText('Payments')).toBeInTheDocument();
    expect(screen.getByText('Manage payments and transactions')).toBeInTheDocument();
  });

  it('shows a table with dummy payment rows', async () => {
    render(<PaymentsPage />);
    expect(await screen.findByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/Payment ID/)).toBeInTheDocument();
    expect(screen.getByText(/Quote Ref/)).toBeInTheDocument();
    expect(screen.getByText(/Amount/)).toBeInTheDocument();
    expect(screen.getByText(/Status/)).toBeInTheDocument();

    // dummy rows
    expect(screen.getByText('pay_001')).toBeInTheDocument();
    expect(screen.getByText('TRZ-0001')).toBeInTheDocument();
    expect(screen.getByText('£100.00')).toBeInTheDocument();
    expect(screen.getByText('Succeeded')).toBeInTheDocument();
  });
});
