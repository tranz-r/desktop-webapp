"use client";

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { QuoteOption } from '@/types/booking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestBackendPage() {
  const { 
    activeQuoteType, 
    quotes,
    isHydrated, 
    setActiveQuoteType,
    updateQuote
  } = useQuote();
  
  const [status, setStatus] = useState<string>('Ready');
  const [guestId, setGuestId] = useState<string | null>(null);

  const handleEnsureGuest = async () => {
    setStatus('Guest functionality not available in new API');
  };

  const handleLoadQuotes = async () => {
    setStatus('Load quotes functionality not available in new API');
  };

  const handleSaveQuote = async () => {
    setStatus('Save quote functionality not available in new API');
  };

  const handleDeleteQuote = async () => {
    setStatus('Delete quote functionality not available in new API');
  };

  const handleCreateTestData = () => {
    setActiveQuoteType(QuoteOption.Send);
    
    // Add some test data
    if (activeQuoteType) {
      updateQuote(activeQuoteType, {
        items: [{
          id: 1,
          name: 'Test Item',
          heightCm: 100,
          widthCm: 50,
          lengthCm: 75,
          quantity: 1,
        }],
        origin: {
          line1: '123 Test Street',
          line2: '',
          city: 'Test City',
          postcode: 'TE1 1ST',
          country: 'UK',
        },
        destination: {
          line1: '456 Test Avenue',
          line2: '',
          city: 'Test City',
          postcode: 'TE2 2ND',
          country: 'UK',
        },
      });
    }
    
    setStatus('Test data created');
  };

  if (!isHydrated) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Backend Integration Test</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{status}</p>
          {guestId && <p className="text-sm text-green-600">Guest ID: {guestId}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button onClick={handleEnsureGuest} className="w-full">
            Ensure Guest Session
          </Button>
          <Button onClick={handleLoadQuotes} className="w-full">
            Load Quotes
          </Button>
          <Button onClick={handleCreateTestData} className="w-full">
            Create Test Data
          </Button>
          <Button onClick={handleSaveQuote} className="w-full">
            Save Current Quote
          </Button>
          <Button onClick={handleDeleteQuote} className="w-full" variant="destructive">
            Delete Current Quote
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Active Quote Type:</strong> {activeQuoteType || 'None'}</p>
            <p><strong>Has Send Quote:</strong> {quotes[QuoteOption.Send] ? 'Yes' : 'No'}</p>
            <p><strong>Has Receive Quote:</strong> {quotes[QuoteOption.Receive] ? 'Yes' : 'No'}</p>
            <p><strong>Has Removals Quote:</strong> {quotes[QuoteOption.Removals] ? 'Yes' : 'No'}</p>
            <p><strong>Origin:</strong> {quotes[activeQuoteType!]?.origin?.line1 || 'None'}</p>
            <p><strong>Destination:</strong> {quotes[activeQuoteType!]?.destination?.line1 || 'None'}</p>
            <p><strong>Items Count:</strong> {quotes[activeQuoteType!]?.items?.length || 0}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raw State (JSON)</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-96">
            {JSON.stringify({ activeQuoteType, quotes }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
