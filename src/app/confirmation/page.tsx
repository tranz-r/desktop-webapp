"use client";

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { loadLastBooking, clearLastBooking } from '@/lib/booking-persist';

export default function ConfirmationPage() {
  const [ref, setRef] = React.useState<string | null>(null);
  const [summary, setSummary] = React.useState<{ amount: string; drivers: number | null; tier: string | null } | null>(null);

  React.useEffect(() => {
    const data = loadLastBooking();
    if (data) {
      setRef(data.reference);
      setSummary({ amount: `£${(data.amountPence / 100).toFixed(2)}`, drivers: data.booking.driverCount, tier: data.booking.pricingTier || null });
      // Optionally clear after reading to avoid stale data
      // clearLastBooking();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Booking Confirmed"
        title="Thank you! Your booking is confirmed."
        description="We have sent a confirmation email with your reference number and next steps."
      />
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 space-y-4">
          <div className="border rounded-md p-6 text-sm">
            <div className="font-semibold mb-2">Reference</div>
            <div className="text-gray-700">{ref ?? '—'}</div>
          </div>
          <div className="border rounded-md p-6 text-sm">
            <div className="font-semibold mb-2">Summary</div>
            <div className="text-gray-700">Amount: {summary?.amount ?? '—'}</div>
            <div className="text-gray-700">Drivers: {summary?.drivers ?? '—'}</div>
            <div className="text-gray-700">Tier: {summary?.tier ?? '—'}</div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
