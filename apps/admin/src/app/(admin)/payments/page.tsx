'use client';

import { useEffect, useMemo, useState } from 'react';
import { getAdminPaymentsPaged, type AdminPaymentRow } from '../../../lib/api';
import { Skeleton } from '../../../components/ui/skeleton';

type SortKey = 'id' | 'quoteReference' | 'amount' | 'status';

export default function PaymentsPage() {
  const [rows, setRows] = useState<AdminPaymentRow[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE;
    if (!base) {
      const demo = [
        { id: 'pay_001', quoteReference: 'TRZ-0001', amount: 10000, status: 'Succeeded' },
        { id: 'pay_002', quoteReference: 'TRZ-0002', amount: 2500, status: 'Pending' },
        { id: 'pay_003', quoteReference: 'TRZ-0003', amount: 5000, status: 'Failed' },
      ];
      setTimeout(() => { setRows(demo); setTotal(demo.length); }, 50);
      return;
    }

    (async () => {
      const { items, total } = await getAdminPaymentsPaged(page, pageSize);
      setRows(items);
      setTotal(total);
    })();
  }, [page, pageSize]);

  const formatAmount = (pennies: number) => `£${(pennies / 100).toFixed(2)}`;
  const isApi = Boolean(process.env.NEXT_PUBLIC_API_BASE);
  const rawData: AdminPaymentRow[] = rows ?? [];

  const sortedData = useMemo(() => {
    if (isApi) return rawData;
    const copy = [...rawData];
    copy.sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
      const as = String(av ?? '');
      const bs = String(bv ?? '');
      return sortDir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as);
    });
    return copy;
  }, [rawData, isApi, sortKey, sortDir]);

  const data = sortedData;
  const paged = isApi ? data : data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const isLoading = rows === null;
  const reachedEnd = total !== null && (page * pageSize) >= total;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };
  const sortIndicator = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage payments and transactions</p>
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
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('id')}>Payment ID{sortIndicator('id')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('quoteReference')}>Quote Ref{sortIndicator('quoteReference')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('amount')}>Amount{sortIndicator('amount')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('status')}>Status{sortIndicator('status')}</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{r.id}</td>
                    <td className="py-2 pr-4">{r.quoteReference ?? '-'}</td>
                    <td className="py-2 pr-4">{formatAmount(r.amount)}</td>
                    <td className="py-2 pr-4">{r.status}</td>
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
