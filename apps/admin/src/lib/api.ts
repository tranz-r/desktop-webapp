export interface AdminQuoteRow {
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

export interface AdminUserRow {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface AdminPaymentRow {
  id: string;
  quoteReference?: string;
  amount: number; // pennies
  status: string;
}

export interface AdminDriverRow {
  id: string;
  name?: string;
  email?: string;
  status?: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

function getApiBase(): string | null {
  return process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE || null;
}

export async function getAdminQuotesPaged(page: number, pageSize: number, search?: string, sortBy?: string, sortDir?: 'asc'|'desc'): Promise<PagedResult<AdminQuoteRow>> {
  const base = getApiBase();
  if (!base) {
    return { items: [], total: 0 };
  }
  try {
    const params = new URLSearchParams({ admin: 'true', page: String(page), pageSize: String(pageSize) });
    if (search && search.length >= 2) params.set('search', search);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortDir) params.set('sortDir', sortDir);
    const url = `${base}/api/v1/quote/admin?${params.toString()}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    const data = await res.json();
    const items = (data?.data ?? data?.items ?? data ?? []).map((q: any) => ({
      id: String(q.id ?? q.quoteId ?? crypto.randomUUID()),
      quoteReference: String(q.quoteReference ?? q.reference ?? ''),
      type: (q.quoteType ?? q.type ?? 'Send') as 'Send' | 'Receive' | 'Removals',
      status: String(q.status ?? q.paymentStatus ?? 'Unknown'),
      paymentType: String(q.paymentType ?? 'Unknown'),
      totalCost: Number(q.totalCost ?? 0),
      createdAt: String(q.createdAt ?? ''),
      customerEmail: q.customerEmail ?? q.customerName ?? q.customer?.email,
      driverName: q.driverName ?? q.driver?.fullName ?? q.assignedDriver?.name ?? undefined,
    }));
    const total = Number(data?.pagination?.totalItems ?? data?.total ?? items.length);
    return { items, total };
  } catch (error) {
    console.error('API Error:', error);
    return { items: [], total: 0 };
  }
}

export async function getAdminUsersPaged(page: number, pageSize: number, sortBy?: string, sortDir?: 'asc'|'desc'): Promise<PagedResult<AdminUserRow>> {
  const base = getApiBase();
  if (!base) return { items: [], total: 0 };
  try {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (sortBy) params.set('sortBy', sortBy);
    if (sortDir) params.set('sortDir', sortDir);
    const res = await fetch(`${base}/api/v1/auth/users?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    const data = await res.json();
    const items = (data?.items ?? data ?? []).map((u: any) => ({
      id: String(u.id ?? crypto.randomUUID()),
      name: u.fullName ?? u.name ?? undefined,
      email: u.email ?? undefined,
      role: typeof u.role === 'string' ? u.role : (u.role?.name ?? undefined),
    }));
    const total = Number(data?.total ?? items.length);
    return { items, total };
  } catch (_) {
    return { items: [], total: 0 };
  }
}

export async function getAdminPaymentsPaged(page: number, pageSize: number, sortBy?: string, sortDir?: 'asc'|'desc'): Promise<PagedResult<AdminPaymentRow>> {
  const base = getApiBase();
  if (!base) return { items: [], total: 0 };
  try {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (sortBy) params.set('sortBy', sortBy);
    if (sortDir) params.set('sortDir', sortDir);
    const res = await fetch(`${base}/api/v1/checkout/payments?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    const data = await res.json();
    const items = (data?.items ?? data ?? []).map((p: any) => ({
      id: String(p.id ?? crypto.randomUUID()),
      quoteReference: p.quoteReference ?? p.quote?.quoteReference ?? undefined,
      amount: Number(p.amount ?? 0),
      status: String(p.status ?? 'Unknown'),
    }));
    const total = Number(data?.total ?? items.length);
    return { items, total };
  } catch (_) {
    return { items: [], total: 0 };
  }
}

export async function getAdminDriversPaged(page: number, pageSize: number): Promise<PagedResult<AdminDriverRow>> {
  const base = getApiBase();
  if (!base) return { items: [], total: 0 };
  try {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    const res = await fetch(`${base}/api/v1/driver-jobs/drivers?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed: ${res.status}`);
    const data = await res.json();
    const items = (data?.items ?? data ?? []).map((d: any) => ({
      id: String(d.id ?? crypto.randomUUID()),
      name: d.fullName ?? d.name ?? undefined,
      email: d.email ?? undefined,
      status: d.status ?? (d.isActive ? 'Active' : 'Inactive'),
    }));
    const total = Number(data?.total ?? items.length);
    return { items, total };
  } catch (_) {
    return { items: [], total: 0 };
  }
}

export async function getQuoteReferenceSuggestions(search: string): Promise<string[]> {
  const base = getApiBase();
  if (!base || !search || search.length < 2) return [];
  try {
    const params = new URLSearchParams({ search });
    // Assuming backend supports suggestions endpoint; fallback to using quote endpoint
    const res = await fetch(`${base}/api/v1/quote?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed');
    const data: any = await res.json();
    const items: any[] = (data?.items ?? data ?? []) as any[];
    const refs: string[] = items
      .map((q: any) => String(q?.quoteReference ?? q?.reference ?? ''))
      .filter((s: string) => s.length > 0);
    return Array.from(new Set(refs)).slice(0, 5);
  } catch (_) {
    return [];
  }
}

export async function getAdminQuoteById(id: string): Promise<any | null> {
  const base = getApiBase();
  console.log('getAdminQuoteById - API Base:', base, 'ID:', id);
  if (!base) return null;
  try {
    const url = `${base}/api/v1/quote/${encodeURIComponent(id)}/details`;
    console.log('getAdminQuoteById - Fetching:', url);
    const res = await fetch(url, { cache: 'no-store' });
    console.log('getAdminQuoteById - Response status:', res.status);
    if (!res.ok) {
      console.log('getAdminQuoteById - Response not ok:', res.status, res.statusText);
      return null;
    }
    const data = await res.json();
    console.log('getAdminQuoteById - Response data:', data);
    // The API returns { quote: AdminQuoteDetailsDto }
    const result = data.quote || data;
    console.log('getAdminQuoteById - Returning:', result);
    return result;
  } catch (error) {
    console.error('getAdminQuoteById - Error:', error);
    return null;
  }
}

export async function assignDriverToQuote(quoteId: string, driverId: string, reason?: string, adminNote?: string): Promise<boolean> {
  const base = getApiBase();
  if (!base) return true;
  try {
    const res = await fetch(`${base}/api/v1/quote/${encodeURIComponent(quoteId)}/driver-assign/${encodeURIComponent(driverId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, adminNote, notifyDriver: false, notifyCustomer: false })
    });
    return res.ok;
  } catch (_) {
    return false;
  }
}

export async function unassignDriverFromQuote(quoteId: string, driverId: string, reason?: string, adminNote?: string): Promise<boolean> {
  const base = getApiBase();
  if (!base) return true;
  try {
    const res = await fetch(`${base}/api/v1/quote/${encodeURIComponent(quoteId)}/driver-unassign/${encodeURIComponent(driverId)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, adminNote, notifyDriver: false, notifyCustomer: false })
    });
    return res.ok;
  } catch (_) {
    return false;
  }
}

export async function updateQuoteStatus(quoteId: string, status: string, reason?: string, adminNote?: string): Promise<boolean> {
  const base = getApiBase();
  if (!base) return true;
  try {
    const res = await fetch(`${base}/api/v1/quote/${encodeURIComponent(quoteId)}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, reason, adminNote, notifyCustomer: false, notifyDriver: false })
    });
    return res.ok;
  } catch (_) {
    return false;
  }
}

export async function chargeRemainingBalance(quoteId: string): Promise<boolean> {
  const base = getApiBase();
  if (!base) return true;
  try {
    const res = await fetch(`${base}/api/v1/checkout/deposit-balance-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quoteId })
    });
    return res.ok;
  } catch (_) {
    return false;
  }
}

export async function createAdditionalPaymentLink(quoteId: string, amount: number, description?: string): Promise<string | null> {
  const base = getApiBase();
  if (!base) return 'https://example.com/payment-link-demo';
  try {
    const res = await fetch(`${base}/api/v1/checkout/create-payment-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quoteId, amount, description })
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.url ?? null;
  } catch (_) {
    return null;
  }
}

export async function createFuturePayment(quoteReference: string, extraCharges?: number, extraChargesDescription?: string): Promise<{ success: boolean; paymentIntentId?: string; error?: string }> {
  const base = getApiBase();
  if (!base) return { success: false, error: 'API base URL not configured' };
  
  try {
    const res = await fetch(`${base}/api/v1/checkout/deposit-balance-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteReference,
        extraCharges: extraCharges || null,
        extraChargesDescription: extraChargesDescription || null
      })
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      return { success: false, error: errorText || `HTTP ${res.status}` };
    }
    
    const data = await res.json();
    return { success: true, paymentIntentId: data.paymentIntentId };
  } catch (error) {
    console.error('createFuturePayment - Error:', error);
    return { success: false, error: 'Network error' };
  }
}

export interface DashboardMetrics {
  quotes: {
    total: number;
    pending: number;
    paid: number;
    partiallyPaid: number;
    succeeded: number;
    cancelled: number;
    byType: {
      send: number;
      receive: number;
      removals: number;
    };
  };
  payments: {
    totalAmount: number;
    completedAmount: number;
    pendingAmount: number;
    totalTransactions: number;
    successRate: number;
    averageOrderValue: number;
    byPaymentType: {
      full: number;
      deposit: number;
      later: number;
      balance: number;
    };
  };
  users: {
    total: number;
    customers: number;
    drivers: number;
    admins: number;
    newThisMonth: number;
    growthRate: number;
  };
  drivers: {
    total: number;
    active: number;
    available: number;
    busy: number;
    utilizationRate: number;
    averageAssignmentsPerDriver: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    lastMonth: number;
    monthOverMonthGrowth: number;
    byServiceType: {
      send: number;
      receive: number;
      removals: number;
    };
  };
  operational: {
    averageQuoteValue: number;
    quotesCompletedThisMonth: number;
    averageCompletionTime: number;
    customerSatisfactionScore: number;
  };
  lastUpdated: string;
  cacheExpiry: string;
}

export async function getDashboardMetrics(fromDate?: string, toDate?: string): Promise<DashboardMetrics | null> {
  const base = getApiBase();
  if (!base) return null;
  
  try {
    const params = new URLSearchParams();
    if (fromDate) params.set('fromDate', fromDate);
    if (toDate) params.set('toDate', toDate);
    
    const url = `${base}/api/v1/admin/dashboard/metrics${params.toString() ? `?${params.toString()}` : ''}`;
    console.log('getDashboardMetrics - Fetching:', url);
    
    const res = await fetch(url, { cache: 'no-store' });
    console.log('getDashboardMetrics - Response status:', res.status);
    
    if (!res.ok) {
      console.error('getDashboardMetrics - Response not ok:', res.status, res.statusText);
      return null;
    }
    
    const data = await res.json();
    console.log('getDashboardMetrics - Response data:', data);
    
    return data;
  } catch (error) {
    console.error('getDashboardMetrics - Error:', error);
    return null;
  }
}

export async function createCheckoutSession(quoteReference: string, amount: number, description?: string): Promise<{ success: boolean; sessionUrl?: string; error?: string }> {
  const base = getApiBase();
  if (!base) return { success: false, error: 'API base URL not configured' };
  
  try {
    const res = await fetch(`${base}/api/v1/checkout/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteReference,
        amount,
        description: description || ''
      })
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      return { success: false, error: errorText || `HTTP ${res.status}` };
    }
    
    const data = await res.json();
    return { success: true, sessionUrl: data.url };
  } catch (error) {
    console.error('createCheckoutSession - Error:', error);
    return { success: false, error: 'Network error' };
  }
}

export async function addAdminNote(quoteId: string, note: string, isInternal: boolean = true, category?: string): Promise<boolean> {
  const base = getApiBase();
  if (!base) return true;
  try {
    const res = await fetch(`${base}/api/v1/quote/${encodeURIComponent(quoteId)}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note, isInternal, category })
    });
    return res.ok;
  } catch (_) {
    return false;
  }
}
