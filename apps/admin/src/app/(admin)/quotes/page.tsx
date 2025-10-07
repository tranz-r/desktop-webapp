'use client';

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '../../../components/ui/skeleton';
import { getAdminQuotesPaged, getQuoteReferenceSuggestions } from '../../../lib/api';
import { useRouter } from 'next/navigation';

interface AdminQuoteRow {
  id: string;
  quoteReference: string;
  type: 'Send' | 'Receive' | 'Removals';
  status: string;
  paymentType: string;
  totalCost: number;
  createdAt: string;
  customerEmail?: string;
  driverName?: string;
}

type SortKey = 'quoteReference' | 'type' | 'status' | 'paymentType' | 'totalCost' | 'createdAt';
	export default function QuotesPage() {
  const [rows, setRows] = useState<AdminQuoteRow[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('quoteReference');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Debounced query
  const [debounced, setDebounced] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim()), 200);
    return () => clearTimeout(t);
  }, [query]);

  // Suggestions state
  const [serverSuggestions, setServerSuggestions] = useState<string[] | null>(null);
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base || debounced.length < 2) {
      setServerSuggestions(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const refs = await getQuoteReferenceSuggestions(debounced);
      if (!cancelled) setServerSuggestions(refs);
    })();
    return () => { cancelled = true; };
  }, [debounced]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;

    if (!base) {
      const demo: AdminQuoteRow[] = [
        { id: '1', quoteReference: 'TRZ-0001', type: 'Send', status: 'Pending', paymentType: 'Deposit', totalCost: 150.00, createdAt: '2025-01-15T10:30:00Z' },
        { id: '2', quoteReference: 'TRZ-0002', type: 'Receive', status: 'Confirmed', paymentType: 'Full', totalCost: 275.50, createdAt: '2025-01-14T14:20:00Z' },
        { id: '3', quoteReference: 'TRZ-0003', type: 'Removals', status: 'Completed', paymentType: 'Full', totalCost: 420.75, createdAt: '2025-01-13T09:15:00Z' },
        { id: '4', quoteReference: 'TRZ-0004', type: 'Send', status: 'Pending', paymentType: 'Deposit', totalCost: 180.25, createdAt: '2025-01-12T16:45:00Z' },
        { id: '5', quoteReference: 'TRZ-0005', type: 'Receive', status: 'Cancelled', paymentType: 'Deposit', totalCost: 95.00, createdAt: '2025-01-11T11:30:00Z' },
      ];
      setTimeout(() => { setRows(demo); setTotal(demo.length); }, 50);
      return;
    }

    (async () => {
      try {
        const { items, total } = await getAdminQuotesPaged(page, pageSize, debounced.length >= 2 ? debounced : undefined, sortKey, sortDir);
        setRows(items);
        setTotal(total);
      } catch (_) {
        setRows([]);
        setTotal(0);
      }
    })();
  }, [debounced, page, pageSize, sortKey, sortDir]);

  const localSuggestions = useMemo(() => {
    if (!rows || debounced.length === 0) return [] as string[];
    const q = debounced.toLowerCase();
    return rows
      .map(r => r.quoteReference)
      .filter(ref => ref.toLowerCase().includes(q))
      .slice(0, 5);
  }, [rows, debounced]);

  const suggestions = serverSuggestions ?? localSuggestions;

  const filteredDemo = useMemo(() => {
    if (!rows) return [] as AdminQuoteRow[];
    if (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE) return rows;
    if (debounced.length === 0) return rows;
    const q = debounced.toLowerCase();
    return rows.filter(r => r.quoteReference.toLowerCase().includes(q));
  }, [rows, debounced]);

  const showingDemo = rows !== null && rows.length > 0 && !(process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE);
  const rawData: AdminQuoteRow[] = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE) ? (rows ?? []) : filteredDemo;

  const sortedData = useMemo(() => {
    if (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE) return rawData; // assume API sorts server-side later
    const copy = [...rawData];
    copy.sort((a, b) => {
      const av = (a[sortKey] ?? '') as string;
      const bv = (b[sortKey] ?? '') as string;
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return copy;
  }, [rawData, sortKey, sortDir]);

  const data = sortedData;

  const paged = (process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE)
    ? data
    : data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const isLoading = rows === null;
  const reachedEnd = total !== null && (page * pageSize) >= total;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortIndicator = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '';

  const formatCurrency = (amount: number) => `£${amount.toFixed(2)}`;
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quotes</h1>
        <p className="text-muted-foreground">Manage and track all quotes</p>
      </div>

      <div className="grid gap-3">
        <div className="relative">
          <label htmlFor="quote-search" className="sr-only">Search by quote reference</label>
          <input
            id="quote-search"
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search by quote reference (e.g., TRZ-0001)"
            className="w-full rounded-md border px-3 py-2 text-sm"
            autoComplete="off"
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-controls="quote-suggestions"
            disabled={isLoading}
          />
          {suggestions.length > 0 && (
            <ul
              id="quote-suggestions"
              role="listbox"
              className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow"
            >
              {suggestions.map((ref) => (
                <li
                  key={ref}
                  role="option"
                  aria-selected={false}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  onMouseDown={() => { setQuery(ref); setPage(1); }}
                >
                  {ref}
                </li>
              ))}
            </ul>
          )}
        </div>
        {showingDemo && (
          <p className="text-sm text-muted-foreground">Showing demo data. Set NEXT_PUBLIC_API_BASE to load live results.</p>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <>
          <div className="rounded-lg border bg-card p-4 overflow-x-auto">
            <table className="w-full text-left" role="table">
              <thead>
                <tr className="border-b">
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('quoteReference')}>Quote Ref{sortIndicator('quoteReference')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('type')}>Type{sortIndicator('type')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('status')}>Status{sortIndicator('status')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('paymentType')}>Payment Type{sortIndicator('paymentType')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('totalCost')}>Total Cost{sortIndicator('totalCost')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('createdAt')}>Date{sortIndicator('createdAt')}</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b last:border-0 cursor-pointer hover:bg-accent/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
                    tabIndex={0}
                    onClick={() => router.push(`/quotes/${r.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        router.push(`/quotes/${r.id}`);
                      }
                    }}
                    aria-label={`Open quote ${r.quoteReference}`}
                  >
                    <td className="py-2 pr-4">
                      <Link href={`/quotes/${r.id}`} className="hover:underline">
                        {r.quoteReference}
                      </Link>
                    </td>
                    <td className="py-2 pr-4">{r.type}</td>
                    <td className="py-2 pr-4">{r.status}</td>
                    <td className="py-2 pr-4">{r.paymentType}</td>
                    <td className="py-2 pr-4">{formatCurrency(r.totalCost)}</td>
                    <td className="py-2 pr-4">{formatDate(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">Page {page}{total !== null ? ` of ${Math.max(1, Math.ceil(total / pageSize))}` : ''}</div>
            <div className="flex items-center gap-2">
              <button className="rounded border px-2 py-1 text-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
              <button className="rounded border px-2 py-1 text-sm" onClick={() => setPage(p => p + 1)} disabled={reachedEnd}>Next</button>
              <select
                className="rounded border px-2 py-1 text-sm"
                value={pageSize}
                onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
          </div>
          </div>
        </>
      )}
    </div>
  );
}
