"use client";

import React, { useState } from 'react';
import TranzrTypeahead, { SearchResult } from '@/components/TranzrTypeahead';
import { CategoryIcon } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const TypeaheadDemo: React.FC = () => {
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchResult[]>([]);

  const handleSelect = (result: SearchResult) => {
    setSelectedResult(result);
    
    // Add to search history (avoid duplicates)
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.id !== result.id);
      return [result, ...filtered].slice(0, 5); // Keep only last 5 searches
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tranzr Search Typeahead Demo
        </h1>
        <p className="text-gray-600">
          Intelligent search with category and product suggestions
        </p>
      </div>

      {/* Main Search */}
      <Card>
        <CardHeader>
          <CardTitle>Main Search</CardTitle>
          <CardDescription>
            Search for categories and products with full typeahead functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TranzrTypeahead
            placeholder="Search for categories or products..."
            onSelect={handleSelect}
            maxResults={8}
            autoFocus
          />
        </CardContent>
      </Card>

      {/* Different Configurations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Categories Only */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories Only</CardTitle>
            <CardDescription>Search only within categories</CardDescription>
          </CardHeader>
          <CardContent>
            <TranzrTypeahead
              placeholder="Search categories..."
              showProducts={false}
              showCategories={true}
              onSelect={handleSelect}
              maxResults={5}
            />
          </CardContent>
        </Card>

        {/* Products Only */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Products Only</CardTitle>
            <CardDescription>Search only within products</CardDescription>
          </CardHeader>
          <CardContent>
            <TranzrTypeahead
              placeholder="Search products..."
              showProducts={true}
              showCategories={false}
              onSelect={handleSelect}
              maxResults={5}
              clearOnSelect={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Selected Result Display */}
      {selectedResult && (
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle className="text-primary-800">Selected Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary-100 rounded-lg">
                <CategoryIcon
                  categoryName={selectedResult.categoryName}
                  iconUrl={selectedResult.iconUrl}
                  className="w-6 h-6 text-primary-600"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold text-primary-900">
                    {selectedResult.title}
                  </h3>
                  <Badge 
                    variant={selectedResult.type === 'category' ? 'default' : 'secondary'}
                  >
                    {selectedResult.type}
                  </Badge>
                </div>
                
                {selectedResult.subtitle && (
                  <p className="text-primary-700 mb-2">
                    {selectedResult.subtitle}
                  </p>
                )}

                <div className="text-sm text-primary-600 space-y-1">
                  <div><strong>ID:</strong> {selectedResult.id}</div>
                  {selectedResult.categoryId && (
                    <div><strong>Category ID:</strong> {selectedResult.categoryId}</div>
                  )}
                  {selectedResult.iconUrl && (
                    <div><strong>Icon URL:</strong> {selectedResult.iconUrl}</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>Your last {searchHistory.length} searches</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={clearHistory}>
              Clear History
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchHistory.map((result, index) => (
                <div key={`${result.id}-${index}`}>
                  <div 
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedResult(result)}
                  >
                    <CategoryIcon
                      categoryName={result.categoryName}
                      iconUrl={result.iconUrl}
                      className="w-5 h-5 text-gray-600"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{result.title}</div>
                      <div className="text-sm text-gray-500">{result.subtitle}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {result.type}
                    </Badge>
                  </div>
                  {index < searchHistory.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
          <CardDescription>How to integrate the typeahead in your code</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Basic Usage:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<TranzrTypeahead
  placeholder="Search..."
  onSelect={(result) => console.log(result)}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Categories Only:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<TranzrTypeahead
  showProducts={false}
  showCategories={true}
  maxResults={5}
  onSelect={handleCategorySelect}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="font-semibold mb-2">With Custom Handling:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`<TranzrTypeahead
  onSelect={(result) => {
    if (result.type === 'category') {
      // Handle category selection
      navigate(\`/category/\${result.categoryId}\`);
    } else {
      // Handle product selection
      navigate(\`/product/\${result.id.split('-')[1]}\`);
    }
  }}
  clearOnSelect={true}
/>`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypeaheadDemo;
