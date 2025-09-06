"use client";

import React from 'react';
import { MapboxMap } from '@/components/MapboxMap';

export default function TestMapPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Map Test Page</h1>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Test Map with Route</h2>
          <p className="text-muted-foreground">
            This page tests the MapboxMap component with a route from London to Manchester.
          </p>
          
          <MapboxMap 
            originAddress="London, UK"
            destinationAddress="Manchester, UK"
            className="w-full"
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Test Map with Different Route</h2>
          <p className="text-muted-foreground">
            This tests a route from Birmingham to Liverpool.
          </p>
          
          <MapboxMap 
            originAddress="Birmingham, UK"
            destinationAddress="Liverpool, UK"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
