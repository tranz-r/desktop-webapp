"use client";

import { useEffect, useState, useTransition } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '../../../../components/ui/skeleton';
import { getAdminQuoteById, assignDriverToQuote, unassignDriverFromQuote, updateQuoteStatus, chargeRemainingBalance, getAdminDriversPaged, addAdminNote, createCheckoutSession, createFuturePayment } from '../../../../lib/api';

interface TimelineEvent { timestamp?: string; event?: string; description?: string }

export default function QuoteDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : (params?.id as string | undefined);

  const [data, setData] = useState<any | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [drivers, setDrivers] = useState<{ id: string; name?: string; email?: string }[]>([]);
  const [adminNote, setAdminNote] = useState<string>('');
  
  // Request Payment state
  const [requestAmount, setRequestAmount] = useState<string>('');
  const [requestDescription, setRequestDescription] = useState<string>('');
  
  // Charge Remaining state
  const [chargeAmount, setChargeAmount] = useState<string>('');
  const [chargeDescription, setChargeDescription] = useState<string>('');

  useEffect(() => {
    if (!id) return;
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) {
      setTimeout(() => {
        setData({
          id,
          quoteReference: 'TRZ-0001',
          type: 'Send',
          status: 'Pending',
          customer: { email: 'alice@example.com', name: 'Alice Johnson' },
          driverId: null,
          origin: { line1: '1 Demo St', city: 'London' },
          destination: { line1: '2 Example Ave', city: 'Manchester' },
          pricing: { total: 15000, items: [ { label: 'Base', amount: 12000 }, { label: 'Surcharge', amount: 3000 } ] },
          timeline: [
            { timestamp: new Date().toISOString(), event: 'Created', description: 'Quote created' },
            { timestamp: new Date().toISOString(), event: 'Pending Payment', description: 'Awaiting deposit' }
          ]
        });
      }, 50);
      return;
    }

    (async () => {
      const q = await getAdminQuoteById(id);
      setData(q);
    })();
  }, [id]);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) {
      // Demo drivers
      setDrivers([
        { id: 'driver1', name: 'Driver One', email: 'driver1@example.com' },
        { id: 'driver2', name: 'Driver Two', email: 'driver2@example.com' },
        { id: 'driver3', name: 'Driver Three', email: 'driver3@example.com' },
      ]);
      return;
    }
    (async () => {
      try {
        const { items } = await getAdminDriversPaged(1, 50);
        setDrivers(items.map(d => ({ id: d.id, name: d.name, email: d.email })));
      } catch (_) {
        setDrivers([]);
      }
    })();
  }, []);

  if (!data) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

          const formatAmount = (amount?: number) => typeof amount === 'number' ? `£${amount.toFixed(2)}` : '-';

  const formatAddress = (address: any) => {
    if (!address) return 'Not provided';
    
    const parts = [];
    
    // Use FullAddress if available, otherwise build from components
    if (address.fullAddress) {
      parts.push(address.fullAddress);
    } else {
      // Build address from components
      if (address.line1) parts.push(address.line1);
      if (address.line2) parts.push(address.line2);
      if (address.city) parts.push(address.city);
      if (address.county) parts.push(address.county);
      if (address.postCode) parts.push(address.postCode);
      if (address.country) parts.push(address.country);
    }
    
    return parts.length > 0 ? parts.join(', ') : 'Not provided';
  };

  const getAddressDetails = (address: any) => {
    if (!address) return [];
    
    const details = [];
    
    // Basic address info
    if (address.line1) details.push({ label: 'Address Line 1', value: address.line1 });
    if (address.line2) details.push({ label: 'Address Line 2', value: address.line2 });
    if (address.city) details.push({ label: 'City', value: address.city });
    if (address.county) details.push({ label: 'County', value: address.county });
    if (address.postCode) details.push({ label: 'Postcode', value: address.postCode });
    if (address.country) details.push({ label: 'Country', value: address.country });
    
    // Extended Mapbox fields
    if (address.street) details.push({ label: 'Street', value: address.street });
    if (address.neighborhood) details.push({ label: 'Neighborhood', value: address.neighborhood });
    if (address.district) details.push({ label: 'District', value: address.district });
    if (address.region) details.push({ label: 'Region', value: address.region });
    
    // Property details
    if (address.hasElevator !== null && address.hasElevator !== undefined) {
      details.push({ label: 'Has Elevator', value: address.hasElevator ? 'Yes' : 'No' });
    }
    if (address.floor) details.push({ label: 'Floor', value: address.floor.toString() });
    
    // Coordinates
    if (address.coordinates) {
      details.push({ 
        label: 'Coordinates', 
        value: `${address.coordinates.latitude}, ${address.coordinates.longitude}` 
      });
    }
    
    return details;
  };
          
          // Build pricing breakdown from the API data
          const pricingItems: { label: string; amount: number }[] = [
            { label: 'Base Cost', amount: data.baseCost || 0 },
            { label: 'Deposit Amount', amount: data.depositAmount || 0 },
            { label: 'Additional Payments', amount: data.additionalPaymentsTotal || 0 }
          ];
          const total = data.totalCost || null;
          
          // Build timeline from payment history and additional payments
          const timeline: TimelineEvent[] = [
            { timestamp: data.createdAt, event: 'Quote Created', description: `Quote created by ${data.createdBy}` },
            ...(data.additionalPayments || []).map((payment: any) => ({
              timestamp: payment.createdAt,
              event: 'Payment Received',
              description: `${payment.description} - ${formatAmount(payment.amount)}`
            }))
          ];

  const handleChangeStatus = (newStatus: string) => {
    if (!id) return;
    const prev = data.status;
    setData({ ...data, status: newStatus });
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) return;
    startTransition(async () => {
      const ok = await updateQuoteStatus(id, newStatus, 'Status changed via admin panel', 'Status updated by admin');
      if (!ok) setData({ ...data, status: prev });
    });
  };

  const handleAssignDriver = (driverId: string) => {
    if (!id) return;
    const prev = data.driver?.id ?? null;
    setData({ ...data, driver: { id: driverId, fullName: drivers.find(d => d.id === driverId)?.name ?? 'Unknown Driver' } });
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) return;
    startTransition(async () => {
      const ok = await assignDriverToQuote(id, driverId, 'Admin assignment', 'Assigned via admin panel');
      if (!ok) setData({ ...data, driver: prev ? { id: prev, fullName: 'Previous Driver' } : null });
    });
  };

  const handleUnassignDriver = () => {
    if (!id) return;
    const prev = data.driver?.id ?? null;
    setData({ ...data, driver: null });
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) return;
    startTransition(async () => {
      const ok = await unassignDriverFromQuote(id, prev ?? '', 'Admin unassignment', 'Unassigned via admin panel');
      if (!ok) setData({ ...data, driver: prev ? { id: prev, fullName: 'Previous Driver' } : null });
    });
  };

  const handleChargeRemaining = () => {
    if (!id || !data?.quoteReference) return;
    
    setMessage(null);
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) { 
      setMessage(`Charged £${chargeAmount || 'remaining balance'}${chargeDescription ? ` - ${chargeDescription}` : ''} (demo).`); 
      setChargeAmount('');
      setChargeDescription('');
      return; 
    }
    
    startTransition(async () => {
      try {
        const extraCharges = chargeAmount ? parseFloat(chargeAmount) : undefined;
        const result = await createFuturePayment(
          data.quoteReference,
          extraCharges,
          chargeDescription || undefined
        );
        
        if (result.success && result.paymentIntentId) {
          setMessage(`Payment processed successfully! Payment Intent: ${result.paymentIntentId}`);
          setChargeAmount('');
          setChargeDescription('');
        } else {
          setMessage(`Failed to process payment: ${result.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error creating future payment:', error);
        setMessage('Failed to process payment. Please try again.');
      }
    });
  };

  const handleAddAdminNote = () => {
    if (!id || !adminNote.trim()) return;
    setMessage(null);
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) { setMessage('Note added (demo).'); return; }
    startTransition(async () => {
      const ok = await addAdminNote(id, adminNote.trim(), true, 'Admin Note');
      setMessage(ok ? 'Note added successfully.' : 'Failed to add note.');
      if (ok) setAdminNote('');
    });
  };

  const handleRequestPayment = () => {
    if (!id || !data?.quoteReference) return;
    
    const amount = parseFloat(requestAmount || '0');
    if (amount <= 0) {
      setMessage('Please enter a valid amount greater than zero.');
      return;
    }
    
    setMessage(null);
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE;
    if (!base) { 
      setMessage(`Payment request sent for £${requestAmount} (demo).`); 
      setRequestAmount('');
      setRequestDescription('');
      return; 
    }
    
    startTransition(async () => {
      try {
        const result = await createCheckoutSession(
          data.quoteReference,
          amount,
          requestDescription || `Payment request for quote ${data.quoteReference}`
        );
        
        if (result.success && result.sessionUrl) {
          setMessage(`Payment request created successfully! Checkout link sent to customer via email.`);
          setRequestAmount('');
          setRequestDescription('');
        } else {
          setMessage(`Failed to create payment request: ${result.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error creating checkout session:', error);
        setMessage('Failed to create payment request. Please try again.');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quote {data.quoteReference ?? data.id}</h1>
          <p className="text-muted-foreground">Type: {data.type ?? '-' } • Status: {data.status ?? '-'}</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="rounded border px-2 py-1 text-sm"
            value={data.status ?? ''}
            onChange={(e) => handleChangeStatus(e.target.value)}
            disabled={isPending}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
                  <div className="flex items-center gap-2">
                    {data.driver?.id ? (
                      <>
                        <span className="text-sm text-muted-foreground">Driver: {data.driver.fullName}</span>
                        <button className="rounded border px-2 py-1 text-sm" onClick={handleUnassignDriver} disabled={isPending}>Unassign</button>
                      </>
                    ) : (
                      <>
                        <select
                          className="rounded border px-2 py-1 text-sm"
                          defaultValue=""
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value) handleAssignDriver(value);
                          }}
                          disabled={isPending || drivers.length === 0}
                        >
                          <option value="" disabled>
                            {drivers.length === 0 ? 'No drivers available' : 'Select driver'}
                          </option>
                          {drivers.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name ?? d.email ?? d.id}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
        </div>
      </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-4">
                  <h2 className="text-sm font-semibold mb-2">Customer</h2>
                  <p className="text-sm text-muted-foreground">{data.customer?.fullName ?? '-'} ({data.customer?.email ?? '-'})</p>
                  {data.customer?.phone && <p className="text-sm text-muted-foreground">Phone: {data.customer.phone}</p>}
                  
                  {/* Customer Billing Address */}
                  {data.customer?.billingAddress && (
                    <div className="mt-3 pt-3 border-t">
                      <h3 className="text-xs font-semibold text-muted-foreground mb-1">Billing Address</h3>
                      <p className="text-sm">{formatAddress(data.customer.billingAddress)}</p>
                      {getAddressDetails(data.customer.billingAddress).length > 0 && (
                        <details className="mt-2">
                          <summary className="text-xs text-muted-foreground cursor-pointer">View Details</summary>
                          <div className="mt-1 space-y-1">
                            {getAddressDetails(data.customer.billingAddress).map((detail, idx) => (
                              <div key={idx} className="text-xs text-muted-foreground">
                                <span className="font-medium">{detail.label}:</span> {detail.value}
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="rounded-lg border bg-card p-4">
                  <h2 className="text-sm font-semibold">Driver</h2>
                  <p className="text-sm text-muted-foreground">{data.driver?.fullName ?? 'Not assigned'}</p>
                  {data.driver?.email && <p className="text-sm text-muted-foreground">Email: {data.driver.email}</p>}
                  {data.driver?.phone && <p className="text-sm text-muted-foreground">Phone: {data.driver.phone}</p>}
                </div>
                
                <div className="rounded-lg border bg-card p-4">
                  <h2 className="text-sm font-semibold mb-2">Origin Address</h2>
                  <p className="text-sm">{formatAddress(data.origin)}</p>
                  {getAddressDetails(data.origin).length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer">View Details</summary>
                      <div className="mt-1 space-y-1">
                        {getAddressDetails(data.origin).map((detail, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground">
                            <span className="font-medium">{detail.label}:</span> {detail.value}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
                
                <div className="rounded-lg border bg-card p-4">
                  <h2 className="text-sm font-semibold mb-2">Destination Address</h2>
                  <p className="text-sm">{formatAddress(data.destination)}</p>
                  {getAddressDetails(data.destination).length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer">View Details</summary>
                      <div className="mt-1 space-y-1">
                        {getAddressDetails(data.destination).map((detail, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground">
                            <span className="font-medium">{detail.label}:</span> {detail.value}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </div>
              </div>

      <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border bg-card p-4">
                  <h2 className="text-sm font-semibold mb-2">Pricing Breakdown</h2>
                  <div className="space-y-1 text-sm">
                    {pricingItems.length === 0 && <p className="text-muted-foreground">No pricing items available.</p>}
                    {pricingItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>{item.label}</span>
                        <span>{formatAmount(item.amount)}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between border-t pt-2 font-medium">
                      <span>Total</span>
                      <span>{formatAmount(total)}</span>
                    </div>
                  </div>
                  
                  {/* Receipt URL - Show whenever it exists */}
                  {data.receiptUrl && (
                    <div className="mt-4 pt-3 border-t">
                      <h3 className="text-xs font-semibold text-muted-foreground mb-2">Payment Receipt</h3>
                      <a 
                        href={data.receiptUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-accent underline hover:text-accent/80 text-sm"
                      >
                        View Receipt
                      </a>
                    </div>
                  )}
                  
                  {/* Payment Actions */}
          <div className="mt-6 space-y-4">
            {/* Charge Remaining Section - Only show when paymentStatus is PartiallyPaid and paymentMethod is Deposit */}
            {data.paymentStatus === 'PartiallyPaid' && data.paymentMethod === 'Deposit' && (
              <div className="border rounded-lg p-3">
                <h3 className="text-xs font-semibold text-muted-foreground mb-2">Charge Remaining Balance</h3>
                <p className="text-xs text-muted-foreground mb-2">Charge the customer for remaining balance or a specific amount.</p>
                <div className="space-y-2">
                  <input 
                    className="rounded border px-2 py-1 text-sm w-full" 
                    placeholder="Amount (£) - leave empty for remaining balance" 
                    value={chargeAmount} 
                    onChange={(e) => setChargeAmount(e.target.value)} 
                  />
                  <input 
                    className="rounded border px-2 py-1 text-sm w-full" 
                    placeholder="Description (optional)" 
                    value={chargeDescription} 
                    onChange={(e) => setChargeDescription(e.target.value)} 
                  />
                  <button 
                    className="rounded border px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 disabled:opacity-50 font-medium shadow-sm" 
                    onClick={handleChargeRemaining} 
                    disabled={isPending}
                  >
                    Charge {chargeAmount ? `£${chargeAmount}` : 'Remaining Balance'}
                  </button>
                </div>
              </div>
            )}

                    {/* Request Payment Section */}
                    <div className="border rounded-lg p-3">
                      <h3 className="text-xs font-semibold text-muted-foreground mb-2">Request Payment</h3>
                      <p className="text-xs text-muted-foreground mb-2">Create a Stripe checkout session and send payment link to customer via email.</p>
                      <div className="space-y-2">
                        <div>
                          <input 
                            className="rounded border px-2 py-1 text-sm w-full" 
                            placeholder="Amount (£) - required" 
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={requestAmount} 
                            onChange={(e) => setRequestAmount(e.target.value)} 
                            disabled={isPending}
                          />
                          {requestAmount && parseFloat(requestAmount) <= 0 && (
                            <p className="text-xs text-destructive mt-1">Amount must be greater than zero</p>
                          )}
                        </div>
                        <div>
                          <input 
                            className="rounded border px-2 py-1 text-sm w-full" 
                            placeholder="Description (required)" 
                            value={requestDescription} 
                            onChange={(e) => setRequestDescription(e.target.value)} 
                            disabled={isPending}
                            required
                          />
                          {!requestDescription && (
                            <p className="text-xs text-destructive mt-1">Description is required</p>
                          )}
                        </div>
                        <button 
                          className="rounded border px-3 py-1 text-sm bg-accent/10 hover:bg-accent/20 text-accent border-accent/20 disabled:opacity-50 font-medium shadow-sm" 
                          onClick={handleRequestPayment} 
                          disabled={isPending || !requestAmount || parseFloat(requestAmount) <= 0 || !requestDescription.trim()}
                        >
                          {isPending ? 'Creating...' : `Request Payment ${requestAmount ? `£${requestAmount}` : ''}`}
                        </button>
                      </div>
                    </div>
          </div>
          
          {/* Message Display */}
          {message && (
            <div className="mt-4 p-2 bg-muted/50 border border-border rounded text-sm text-muted-foreground">
              {message}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold mb-2">Timeline</h2>
          <ol className="space-y-2">
            {timeline.length === 0 && <p className="text-sm text-muted-foreground">No timeline events to display.</p>}
            {timeline.map((t, i) => (
              <li key={i} className="text-sm">
                <div className="font-medium">{t.event ?? '-'}</div>
                <div className="text-muted-foreground">{new Date(t.timestamp ?? '').toLocaleString() || '-'}</div>
                {t.description && <div className="text-muted-foreground">{t.description}</div>}
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold mb-2">Additional Payments</h2>
          <div className="space-y-2">
            {data.additionalPayments && data.additionalPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left" role="table">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 pr-4 font-medium text-xs text-muted-foreground" scope="col">Amount</th>
                      <th className="py-2 pr-4 font-medium text-xs text-muted-foreground" scope="col">Description</th>
                      <th className="py-2 pr-4 font-medium text-xs text-muted-foreground" scope="col">Status</th>
                      <th className="py-2 pr-4 font-medium text-xs text-muted-foreground" scope="col">Receipt</th>
                      <th className="py-2 pr-4 font-medium text-xs text-muted-foreground" scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.additionalPayments.map((payment: any, index: number) => (
                      <tr key={payment.id || index} className="border-b last:border-0">
                        <td className="py-2 pr-4 text-sm">{formatAmount(payment.amount)}</td>
                        <td className="py-2 pr-4 text-sm">{payment.description || '-'}</td>
                        <td className="py-2 pr-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            payment.status === 'Completed' 
                              ? 'bg-accent/10 text-accent' 
                              : payment.status === 'Pending'
                              ? 'bg-secondary/10 text-secondary-foreground'
                              : 'bg-muted/10 text-muted-foreground'
                          }`}>
                            {payment.status || 'Unknown'}
                          </span>
                        </td>
                        <td className="py-2 pr-4 text-sm">
                          {payment.receiptUrl ? (
                            <a 
                              href={payment.receiptUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-accent underline hover:text-accent/80"
                            >
                              View Receipt
                            </a>
                          ) : (
                            <span className="text-muted-foreground">No receipt</span>
                          )}
                        </td>
                        <td className="py-2 pr-4 text-sm text-muted-foreground">
                          {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-GB') : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No additional payments</p>
            )}
          </div>
        </div>
      </div>

              <div className="rounded-lg border bg-card p-4">
                <h2 className="text-sm font-semibold mb-2">Inventory Items</h2>
                <div className="space-y-2">
                  {data.inventoryItems && data.inventoryItems.length > 0 ? (
                    data.inventoryItems.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          {item.description && <span className="text-muted-foreground ml-2">({item.description})</span>}
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                            {item.dimensions && (
                              <span> • {item.dimensions.length}×{item.dimensions.width}×{item.dimensions.height}cm</span>
                            )}
                            {item.fragile && <span className="text-destructive ml-2">• Fragile</span>}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No inventory items</p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border bg-card p-4">
                <h2 className="text-sm font-semibold mb-2">Admin Notes</h2>
                <div className="space-y-2">
                  <textarea
                    className="w-full rounded border px-3 py-2 text-sm"
                    placeholder="Add an admin note..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    rows={3}
                    disabled={isPending}
                  />
                  <button
                    className="rounded border px-3 py-1 text-sm bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleAddAdminNote}
                    disabled={isPending || !adminNote.trim()}
                  >
                    Add Note
                  </button>
                </div>
              </div>
    </div>
  );
}
