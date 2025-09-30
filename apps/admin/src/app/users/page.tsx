'use client';

import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '../../components/ui/skeleton';
import { getAdminUsersPaged } from '../../lib/api';

interface AdminUserRow {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

type SortKey = 'name' | 'email' | 'role';

export default function UsersPage() {
  const [rows, setRows] = useState<AdminUserRow[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE;
    if (!base) {
      const demo = [
        { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Customer' },
        { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Driver' },
        { id: '3', name: 'Chris Lee', email: 'chris@example.com', role: 'Customer' },
        { id: '4', name: 'Diana Price', email: 'diana@example.com', role: 'Customer' },
        { id: '5', name: 'Evan Reed', email: 'evan@example.com', role: 'Driver' },
      ];
      setTimeout(() => { setRows(demo); setTotal(demo.length); }, 50);
      return;
    }

    (async () => {
      try {
        const { items, total } = await getAdminUsersPaged(page, pageSize);
        setRows(items);
        setTotal(total);
      } catch (_) {
        setRows([]);
        setTotal(0);
      }
    })();
  }, [page, pageSize]);

  const isApi = Boolean(process.env.NEXT_PUBLIC_API_BASE);
  const rawData: AdminUserRow[] = rows ?? [];

  const sortedData = useMemo(() => {
    if (isApi) return rawData;
    const copy = [...rawData];
    copy.sort((a, b) => {
      const av = (a[sortKey] ?? '') as string;
      const bv = (b[sortKey] ?? '') as string;
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return copy;
  }, [rawData, isApi, sortKey, sortDir]);

  const data: AdminUserRow[] = sortedData;
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
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage customers and drivers</p>
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
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('name')}>Name{sortIndicator('name')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('email')}>Email{sortIndicator('email')}</th>
                  <th className="py-2 pr-4 font-medium cursor-pointer" scope="col" onClick={() => toggleSort('role')}>Role{sortIndicator('role')}</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{r.name ?? '-'}</td>
                    <td className="py-2 pr-4">{r.email ?? '-'}</td>
                    <td className="py-2 pr-4">{r.role ?? '-'}</td>
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
