"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock } from "lucide-react";
import { useLegalDocument } from "@/hooks/useLegalDocument";
import LegalDocumentRenderer from "@/components/legal/LegalDocumentRenderer";
import { LegalDocumentLoading } from "@/components/legal/LegalDocumentLoading";

export default function PrivacyPolicyPage() {
  const { document, loading, error, refetch, cacheInfo } = useLegalDocument({
    documentType: 'privacy-policy',
    autoFetch: true,
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCacheAge = () => {
    const cacheKey = 'tranzr:legal:privacy-policy';
    const cache = cacheInfo[cacheKey];
    if (!cache) return null;
    
    const ageMinutes = Math.floor(cache.age / (1000 * 60));
    if (ageMinutes < 1) return 'Just now';
    if (ageMinutes < 60) return `${ageMinutes}m ago`;
    
    const ageHours = Math.floor(ageMinutes / 60);
    if (ageHours < 24) return `${ageHours}h ago`;
    
    const ageDays = Math.floor(ageHours / 24);
    return `${ageDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-8 lg:pt-12 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Privacy Policy</CardTitle>
                  {document && (
                    <p className="text-sm text-muted-foreground">
                      Last updated: <time dateTime={document.effectiveFrom}>
                        {formatDate(document.effectiveFrom)}
                      </time>
                      {document.version && (
                        <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                          v{document.version}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {getCacheAge() && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Cached {getCacheAge()}</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refetch}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <LegalDocumentLoading
                loading={loading}
                error={error}
                onRetry={refetch}
                title="Privacy Policy"
                lastUpdated={document ? formatDate(document.effectiveFrom) : undefined}
              />
              
              {document && !loading && !error && (
                <ScrollArea className="h-[70vh] pr-2">
                  <LegalDocumentRenderer markdownContent={document.markdownContent} />
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
