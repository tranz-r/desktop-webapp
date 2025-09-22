"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { StreamlinedHeader } from '@/components/StreamlinedHeader';
import Footer from '@/components/Footer';

export default function CheckoutCancelPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader hideCart />
      <main className="flex-1">
        <section className="pt-40 lg:pt-44 pb-10 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="rounded-lg border border-input bg-card text-card-foreground shadow-sm">
              <div className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white">
                    <span className="text-xl">!</span>
                  </div>
                  <h1 className="text-2xl font-semibold tracking-tight">Payment cancelled</h1>
                </div>

                <p className="text-muted-foreground mb-6">
                  Your Stripe Checkout session was cancelled. You can resume your booking anytime from the payment page.
                </p>

                {sessionId && (
                  <div className="mb-6 rounded-md bg-muted px-4 py-3 text-sm text-foreground">
                    <div className="font-medium">Stripe Checkout Session</div>
                    <div className="mt-1 break-all text-muted-foreground">{sessionId}</div>
                  </div>
                )}

                <div className="grid gap-3 sm:flex sm:items-center sm:gap-4">
                  <Link
                    href="/pay"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Return to payment
                  </Link>
                  <button
                    onClick={() => router.push("/")}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
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


