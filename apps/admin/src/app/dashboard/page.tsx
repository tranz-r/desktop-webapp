"use client";

import { useEffect, useState } from 'react';
import { DateRange } from "react-day-picker";
import { format, subDays, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { TrendingUp, TrendingDown, Users, DollarSign, Package, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { DateRangePicker } from "../../components/ui/date-range-picker";
import { ChartContainer, ChartTooltip, ChartLegend, ChartTooltipContent, ChartConfig, ChartLegendContent } from "../../components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { getDashboardMetrics, DashboardMetrics } from "../../lib/api";

const SUPABASE_CONFIGURED = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const fromDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
        const toDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;
        
        const data = await getDashboardMetrics(fromDate, toDate);
        if (data) {
          setMetrics(data);
        } else {
          setError('Failed to load dashboard metrics');
        }
      } catch (err) {
        console.error('Error loading dashboard metrics:', err);
        setError('Failed to load dashboard metrics');
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Generate mock chart data for demonstration
  const generateChartData = () => {
    const data = [];
    const days = dateRange?.from && dateRange?.to 
      ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
      : 30;
    // Derive a reasonable ratio to visualize Total Billed vs Completed
    // If we have metrics, scale total as completed * ratio; else default to 1.15x
    const ratio = metrics && metrics.payments && (metrics.payments.completedAmount > 0)
      ? Math.max(1, Math.min(2, metrics.payments.totalAmount / metrics.payments.completedAmount))
      : 1.15;
    
    for (let i = 0; i < Math.min(days, 30); i++) {
      const date = dateRange?.from ? new Date(dateRange.from.getTime() + i * 24 * 60 * 60 * 1000) : subDays(new Date(), 30 - i);
      const rev = Math.floor(Math.random() * 1000) + 500;
      data.push({
        date: format(date, 'MMM dd'),
        revenue: rev, // Completed Revenue series (primary)
        total: Math.round(rev * ratio), // Total Billed (secondary)
        quotes: Math.floor(Math.random() * 20) + 5,
        users: Math.floor(Math.random() * 10) + 2,
      });
    }
    return data;
  };

  const chartData = generateChartData();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Tranzr Admin Dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Tranzr Admin Dashboard</p>
        </div>

        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Tranzr Admin Dashboard</p>
          {metrics?.lastUpdated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date(metrics.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Billed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Billed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics?.payments.totalAmount || 0)}</div>
            <p className="text-xs text-muted-foreground">All quotes with value in period</p>
          </CardContent>
        </Card>

        {/* Completed Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics?.payments.completedAmount || 0)}</div>
            <p className="text-xs text-muted-foreground">Paid or succeeded</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics?.revenue.total || 0)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center">
                {metrics?.revenue.monthOverMonthGrowth && metrics.revenue.monthOverMonthGrowth > 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                {metrics?.revenue.monthOverMonthGrowth ? 
                  `${Math.abs(metrics.revenue.monthOverMonthGrowth).toFixed(1)}%` : 
                  '0%'} from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.quotes.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              {metrics?.quotes.pending || 0} pending, {metrics?.quotes.succeeded || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.users.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                {formatPercentage(metrics?.users.growthRate || 0)} from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.drivers.active || 0}</div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(metrics?.drivers.utilizationRate || 0)} utilization rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader className="flex flex-col items-stretch gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-sm font-medium">Revenue Overview</CardTitle>
              <CardDescription>Total revenue in the selected period</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pl-2">
            <ChartContainer
              config={{
                revenue: { label: 'Completed Revenue', color: 'hsl(var(--primary))' },
                total: { label: 'Total Revenue', color: 'hsl(var(--accent))' },
              } as ChartConfig}
              className="aspect-auto h-[280px] w-full"
            >
              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => value}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `£${value}`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-total)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-total)" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <Area
                  name="Completed Revenue"
                  dataKey="revenue"
                  type="natural"
                  fill="url(#fillRevenue)"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  stackId="a"
                />
                <Area
                  name="Total Revenue"
                  dataKey="total"
                  type="natural"
                  fill="url(#fillTotal)"
                  stroke="var(--color-total)"
                  strokeWidth={1}
                  stackId="a"
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Total Quotes</p>
                  <p className="text-sm text-muted-foreground">
                    {metrics?.quotes.total || 0} quotes this period
                  </p>
                </div>
                <div className="ml-auto font-medium">{metrics?.quotes.total || 0}</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">New Users</p>
                  <p className="text-sm text-muted-foreground">
                    {metrics?.users.newThisMonth || 0} new this month
                  </p>
                </div>
                <div className="ml-auto font-medium">{metrics?.users.newThisMonth || 0}</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Active Drivers</p>
                  <p className="text-sm text-muted-foreground">
                    {metrics?.drivers.active || 0} drivers working
                  </p>
                </div>
                <div className="ml-auto font-medium">{metrics?.drivers.active || 0}</div>
              </div>
              <div className="flex items-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Success Rate</p>
                  <p className="text-sm text-muted-foreground">
                    {formatPercentage(metrics?.payments.successRate || 0)} payment success
                  </p>
                </div>
                <div className="ml-auto font-medium">{formatPercentage(metrics?.payments.successRate || 0)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Charts */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-medium">{formatCurrency(metrics?.payments.completedAmount || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Pending</span>
                <span className="font-medium">{formatCurrency(metrics?.payments.pendingAmount || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transactions</span>
                <span className="font-medium">{metrics?.payments.totalTransactions || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg Order Value</span>
                <span className="font-medium">{formatCurrency(metrics?.payments.averageOrderValue || 0)}</span>
              </div>
              <div className="mt-3">
                <div className="h-2 w-full rounded bg-muted">
                  <div
                    className="h-2 rounded bg-primary"
                    style={{ width: `${(metrics && metrics.payments.totalAmount > 0) ? Math.min(100, (metrics.payments.completedAmount / metrics.payments.totalAmount) * 100) : 0}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {metrics && metrics.payments.totalAmount > 0
                    ? `${formatCurrency(metrics.payments.completedAmount)} of ${formatCurrency(metrics.payments.totalAmount)} (${formatPercentage((metrics.payments.completedAmount / metrics.payments.totalAmount) * 100)})`
                    : 'No billed revenue in range'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quote Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer>
              <BarChart
                data={[
                  { name: "Pending", value: metrics?.quotes.pending || 0 },
                  { name: "Paid", value: metrics?.quotes.paid || 0 },
                  { name: "Succeeded", value: metrics?.quotes.succeeded || 0 },
                  { name: "Cancelled", value: metrics?.quotes.cancelled || 0 },
                ]}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip />
                <Bar dataKey="value" fill="hsl(var(--accent))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Service Type Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer>
              <BarChart
                data={[
                  { name: "Send", value: metrics?.revenue.byServiceType.send || 0 },
                  { name: "Receive", value: metrics?.revenue.byServiceType.receive || 0 },
                  { name: "Removals", value: metrics?.revenue.byServiceType.removals || 0 },
                ]}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `£${value}`} />
                <ChartTooltip formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} />
                <Bar dataKey="value" fill="hsl(var(--accent))" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
