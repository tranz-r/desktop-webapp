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

export default function TermsAndConditionsPage() {
  const { document, loading, error, refetch, cacheInfo } = useLegalDocument({
    documentType: 'terms-and-conditions',
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
    const cacheKey = 'tranzr:legal:terms-and-conditions';
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
                  <CardTitle>Services Terms &amp; Conditions</CardTitle>
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
                title="Services Terms & Conditions"
                lastUpdated={document ? formatDate(document.effectiveFrom) : undefined}
              />
              
              {document && !loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* TOC */}
                  <nav className="lg:col-span-1 sticky top-28 self-start bg-muted/40 rounded-md p-4 text-sm">
                    <strong className="block mb-2">Contents</strong>
                    <ol className="space-y-1 list-decimal list-inside">
                      <li>
                        <a className="hover:underline" href="#1-cost-of-service-payment-terms">
                          Cost of service &amp; payment terms
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#2-customer-responsibility-and-expectations">
                          Customer responsibility and expectations
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#3-insurance-and-valuation-coverage-for-customer-belongings">
                          Insurance and valuation coverage
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#4-building-insurance-coi-certificate-of-liability-insurance">
                          Building Insurance – COI
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#5-claims-and-refunds">
                          Claims and refunds
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#6-safety-of-moving-crews-and-customers">
                          Safety of moving crews and customers
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#7-contactless-moving-services">
                          Contactless moving services
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#8-long-distance-moving-services">
                          Long distance moving services
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#9-storage-services">
                          Storage services
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#10-packing-and-unpacking">
                          Packing and unpacking
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#11-plastic-moving-totes-bins-for-hire">
                          Plastic moving totes/bins for hire
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#12-moving-supplies-to-purchase">
                          Moving supplies to purchase
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#13-tvs-and-electronics">
                          TVs and electronics
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#14-special-handling">
                          Special handling
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#15-furniture-assembly-disassembly">
                          Furniture assembly &amp; disassembly
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#16-furniture-mattress-disposal">
                          Furniture &amp; mattress disposal
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#17-client-referral-programme">
                          Client referral programme
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#18-military-moving-discount-programme">
                          Military moving discount programme
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#19-customer-privacy">
                          Customer privacy
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#20-liability-waiver-during-a-state-of-emergency-pandemic-or-natural-disaster">
                          Liability during state of emergency or disaster
                        </a>
                      </li>
                      <li>
                        <a className="hover:underline" href="#21-disclaimer-of-warranties-limitation-of-liability">
                          Disclaimer of warranties; limitation of liability
                        </a>
                      </li>
                    </ol>
                  </nav>

                  {/* Content */}
                  <div className="lg:col-span-3">
                    <ScrollArea className="h-[70vh] pr-2">
                      <LegalDocumentRenderer markdownContent={document.markdownContent} />
                    </ScrollArea>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
