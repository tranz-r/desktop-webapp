"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TranzrCategoryDemo } from '@/components/CategoryGrid';
import TypeaheadDemo from '@/components/TypeaheadDemo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TranzrDemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header sticky={false} />
      
      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Tranzr Search & Categories Demo
            </h1>
            <p className="text-lg text-gray-600">
              Experience our intelligent search and category browsing system
            </p>
          </div>

          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Smart Search</TabsTrigger>
              <TabsTrigger value="categories">Category Grid</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="mt-6">
              <TypeaheadDemo />
            </TabsContent>
            
            <TabsContent value="categories" className="mt-6">
              <TranzrCategoryDemo />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
