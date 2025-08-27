"use client";

export const dynamic = 'force-dynamic';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  SendSomethingSvgComponent,
  RecieveSomethingSvgComponent,
  RemovalSvgComponent,
} from '@/components/icons';
import { QuoteOption } from '@/types/booking';
import { useQuote } from '@/contexts/QuoteContext';
import { useRouter } from 'next/navigation';

const OPTIONS: Array<{ id: QuoteOption; title: string; description: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }> = [
  {
    id: QuoteOption.Send,
    title: 'Send Items',
    description: 'Arrange a courier to send your items from A to B.',
    Icon: SendSomethingSvgComponent,
  },
  {
    id: QuoteOption.Receive,
    title: 'Receive Items',
    description: 'Expecting a delivery? We can help you receive it.',
    Icon: RecieveSomethingSvgComponent,
  },
  {
    id: QuoteOption.Removals,
    title: 'Removals',
    description: 'Book a van and crew for home or office removals.',
    Icon: RemovalSvgComponent,
  },
];

export default function QuoteOptionPage() {
  const { activeQuoteType, setActiveQuoteType } = useQuote();
  const selected = activeQuoteType;
  const router = useRouter();

  // Guest session will be created when setActiveQuoteType is called

  return (
    <div className="min-h-screen bg-background flex flex-col">
  <Header />
      <main className="flex-1">
        <section className="pt-8 lg:pt-12 pb-10 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-6 text-center">
              <h1 className="text-xl md:text-2xl font-bold text-primary-700">What would you like to do?</h1>
              <p className="mt-1 text-sm text-muted-foreground">Pick an option to get an instant quote.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OPTIONS.map(({ id, title, description, Icon }) => {
                const isSelected = selected === id;
                return (
                  <Card
                    key={id}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
            console.log('[QuoteOption] User clicked on option:', id);
            console.log('[QuoteOption] Calling setActiveQuoteType...');
            setActiveQuoteType(id);
            console.log('[QuoteOption] Navigating to /collection-delivery...');
            router.push('/collection-delivery');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              console.log('[QuoteOption] Keyboard navigation to option:', id);
              setActiveQuoteType(id);
              router.push('/collection-delivery');
            }
          }}
                    className={`transition-colors cursor-pointer border ${
                      isSelected ? 'border-primary-500 bg-primary-50' : 'border-primary-200 hover:border-primary-300'
                    }`}
                  >
                    <CardHeader className="flex items-center justify-center pt-4 pb-1">
                      {/* Icons may be large; scale with a wrapper */}
                      <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                        <Icon className="w-full h-full" />
                      </div>
                      <CardTitle className="mt-3 text-center text-base md:text-lg text-primary-700">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs md:text-sm text-muted-foreground text-center">{description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 flex justify-center">
              <Button type="button" disabled={!selected} aria-disabled={!selected} onClick={() => selected && router.push('/collection-delivery')}>
                Continue
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
