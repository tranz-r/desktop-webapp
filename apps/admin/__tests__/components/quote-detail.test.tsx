import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuoteDetailPage from '../../src/app/(admin)/quotes/[id]/page';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: 'demo-id' })
}));

describe('Quote Detail Page', () => {
  it('renders pricing and timeline sections', async () => {
    render(<QuoteDetailPage />);
    const titles = await screen.findAllByText(/Quote/i);
    expect(titles.length).toBeGreaterThan(0);
    expect(screen.getByText(/Pricing Breakdown/)).toBeInTheDocument();
    expect(screen.getByText(/Timeline/)).toBeInTheDocument();
  });

  it('renders actions controls', async () => {
    render(<QuoteDetailPage />);
    await screen.findAllByText(/Quote/i);
    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes.length).toBeGreaterThan(0);
  });

  it('renders payment actions controls', async () => {
    render(<QuoteDetailPage />);
    await screen.findAllByText(/Quote/i);
    expect(screen.getByText(/Charge remaining/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Amount (£)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
    expect(screen.getByText(/Create payment link/)).toBeInTheDocument();
  });
});
