"use client";

import { useEffect, useState } from 'react';
import { Skeleton } from '../../../components/ui/skeleton';
import { getAdminDriversPaged } from '../../../lib/api';

interface AdminDriverRow {
  id: string;
  name?: string;
  email?: string;
  status?: string;
}

export default function DriversPage() {
  const [rows, setRows] = useState<AdminDriverRow[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE;
    if (!base) {
      const demo: AdminDriverRow[] = [
        { name: 'David Green', email: 'david@example.com', status: 'Active', id: '1' },
        { name: 'Elena Brown', email: 'elena@example.com', status: 'Inactive', id: '2' },
        { name: 'Frank Wu', email: 'frank@example.com', status: 'Active', id: '3' },
      ];
      setTimeout(() => { setRows(demo); setTotal(demo.length); }, 50);
      return;
    }

    (async () => {
      const { items, total } = await getAdminDriversPaged(page, pageSize);
      setRows(items);
      setTotal(total);
    })();
  }, [page, pageSize]);

  const data: AdminDriverRow[] = rows ?? [];
  const showingDemo = rows !== null && data.length > 0 && !process.env.NEXT_PUBLIC_API_BASE;
  const paged = process.env.NEXT_PUBLIC_API_BASE ? data : data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

  const isLoading = rows === null;
  const reachedEnd = total !== null && (page * pageSize) >= total;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Drivers</h1>
        <p className="text-muted-foreground">Manage drivers and job assignments</p>
      </div>

      {showingDemo && (
        <p className="text-sm text-muted-foreground">Showing demo data. Set NEXT_PUBLIC_API_BASE to load live results.</p>
      )}

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
                  <th className="py-2 pr-4 font-medium" scope="col">Name</th>
                  <th className="py-2 pr-4 font-medium" scope="col">Email</th>
                  <th className="py-2 pr-4 font-medium" scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{r.name ?? '-'}</td>
                    <td className="py-2 pr-4">{r.email ?? '-'}</td>
                    <td className="py-2 pr-4">{r.status ?? '-'}</td>
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
