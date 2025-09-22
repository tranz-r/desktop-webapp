"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { API_BASE_URL } from '@/lib/api/config';
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';
import { useQuote } from '@/contexts/QuoteContext';

interface AddressDto {
  fullAddress?: string;
  line1?: string;
  line2?: string;
  city?: string;
  county?: string;
  postCode?: string;
  country?: string;
}

interface QuoteDtoShape {
  id?: string;
  quoteReference?: string;
  type?: string;
  vanType?: string;
  driverCount?: number;
  origin?: AddressDto;
  destination?: AddressDto;
  distanceMiles?: number;
  schedule?: {
    dateISO?: string;
    deliveryDateISO?: string;
    hours?: number;
    flexibleTime?: boolean;
    timeSlot?: string;
  };
  pricing?: {
    pricingTier?: string;
    totalCost?: number;
  };
  payment?: {
    status?: string;
    paymentType?: string;
    receiptUrl?: string;
  };
}

export default function CheckoutSuccessPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");
  const [quote, setQuote] = React.useState<QuoteDtoShape | null>(null);
  const { updateQuote, activeQuoteType } = useQuote();

  const formatAddress = (addr?: AddressDto) => {
    if (!addr) return "—";
    const parts = [addr.line1, addr.line2, addr.city, addr.postCode];
    return parts.filter(Boolean).join(", ");
  };
  
  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return iso;
    }
  };

  React.useEffect(() => {
    const fetchQuote = async () => {
      if (!sessionId) {
        setLoading(false);
        setError("Missing session id");
        return;
      }
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE_URL}/api/v1/quote/checkout-session?session_id=${encodeURIComponent(sessionId)}`);
        if (!res.ok) {
          throw new Error(`Failed to load quote (${res.status})`);
        }
        const data = await res.json();
        const q = data?.quote ?? data; // backend may return { quote: QuoteDto } or QuoteDto
        setQuote({
          id: q?.id,
          quoteReference: q?.quoteReference,
          type: q?.type,
          vanType: q?.vanType,
          driverCount: q?.driverCount,
          origin: q?.origin,
          destination: q?.destination,
          distanceMiles: q?.distanceMiles,
          schedule: q?.schedule,
          pricing: q?.pricing,
          payment: {
            status: q?.payment?.status,
            paymentType: q?.payment?.paymentType,
            receiptUrl: q?.payment?.receiptUrl,
          },
        });
      } catch (e: any) {
        setError(e?.message || "Unable to load quote");
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [sessionId]);

  // Update quote context to mark payment as completed for Journey Stepper
  React.useEffect(() => {
    if (quote && activeQuoteType && quote.payment?.status === 'paid') {
      updateQuote(activeQuoteType, {
        paymentStatus: 'paid' as const,
        paymentType: (quote.payment.paymentType as 'full' | 'deposit' | 'later') || 'full',
        payment: {
          status: 'paid' as const,
          paymentType: (quote.payment.paymentType as 'full' | 'deposit' | 'later') || 'full',
          depositAmount: undefined
        }
      });
    }
  }, [quote, activeQuoteType, updateQuote]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader hideCart />
      <main className="flex-1">
        <section className="pt-40 lg:pt-44 pb-10 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="rounded-lg border border-input bg-card text-card-foreground shadow-sm">
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                    <span className="text-2xl">✓</span>
                    <span className="absolute h-12 w-12 rounded-full ring-2 ring-green-400/60 animate-ping"></span>
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight">Payment successful</h1>
                </div>

                {loading ? (
                  <p className="text-muted-foreground mb-6">Loading your booking…</p>
                ) : error ? (
                  <div className="mb-6 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm">
                    {error}
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground mb-6">
                      Thank you! Your payment has been processed. A confirmation email will be on its way shortly.
                    </p>

                    <div className="mb-6 grid gap-3 rounded-md bg-accent/40 px-4 py-4 text-sm sm:grid-cols-2">
                      {quote?.quoteReference && (
                        <div>
                          <div className="font-medium">Quote Reference</div>
                          <div className="mt-1 text-muted-foreground break-all">#{quote.quoteReference}</div>
                        </div>
                      )}
                      {typeof quote?.pricing?.totalCost === "number" && (
                        <div>
                          <div className="font-medium">Total Amount</div>
                          <div className="mt-1 text-muted-foreground">£{quote.pricing!.totalCost!.toFixed(2)}</div>
                        </div>
                      )}
                      {quote?.payment?.status && (
                        <div>
                          <div className="font-medium">Payment Status</div>
                          <div className="mt-1 text-muted-foreground capitalize">{String(quote.payment.status).toLowerCase()}</div>
                        </div>
                      )}
                      {quote?.payment?.receiptUrl && (
                        <div>
                          <div className="font-medium">Receipt</div>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-flex items-center text-primary underline underline-offset-4 hover:opacity-90"
                            href={quote.payment.receiptUrl}
                          >
                            View receipt
                          </a>
                        </div>
                      )}
                      {quote?.schedule?.dateISO && (
                        <div>
                          <div className="font-medium">Move Date</div>
                          <div className="mt-1 text-muted-foreground">{formatDate(quote.schedule.dateISO)}</div>
                        </div>
                      )}
                      {quote?.vanType && (
                        <div>
                          <div className="font-medium">Van</div>
                          <div className="mt-1 text-muted-foreground">{quote.vanType}</div>
                        </div>
                      )}
                      {typeof quote?.driverCount === 'number' && (
                        <div>
                          <div className="font-medium">Crew Size</div>
                          <div className="mt-1 text-muted-foreground">{quote.driverCount}</div>
                        </div>
                      )}
                      {typeof quote?.distanceMiles === 'number' && (
                        <div>
                          <div className="font-medium">Distance</div>
                          <div className="mt-1 text-muted-foreground">{quote.distanceMiles.toFixed(1)} miles</div>
                        </div>
                      )}
                      {quote?.origin && (
                        <div className="sm:col-span-2">
                          <div className="font-medium">Origin</div>
                          <div className="mt-1 text-muted-foreground break-words">{formatAddress(quote.origin)}</div>
                        </div>
                      )}
                      {quote?.destination && (
                        <div className="sm:col-span-2">
                          <div className="font-medium">Destination</div>
                          <div className="mt-1 text-muted-foreground break-words">{formatAddress(quote.destination)}</div>
                        </div>
                      )}
                      {sessionId && (
                        <div className="sm:col-span-2">
                          <div className="font-medium">Stripe Checkout Session</div>
                          <div className="mt-1 break-all text-muted-foreground">{sessionId}</div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="grid gap-3 sm:flex sm:items-center sm:gap-4">
                  <button
                    onClick={() => router.push("/")}
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Go to homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


