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
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* TOC */}
                  <nav className="lg:col-span-1 sticky top-28 self-start bg-muted/40 rounded-md p-4 text-sm max-w-full overflow-hidden hidden lg:block">
                    <strong className="block mb-2 break-words">Contents</strong>
                    <ol className="space-y-1 list-decimal list-inside break-words">
                      <li><a className="hover:underline break-words" href="#1-what-information-do-we-collect">What information do we collect?</a></li>
                      <li><a className="hover:underline break-words" href="#2-how-do-we-process-your-information">How do we process your information?</a></li>
                      <li><a className="hover:underline break-words" href="#3-what-legal-bases-do-we-rely-on-to-process-your-personal-information">What legal bases do we rely on to process your personal information?</a></li>
                      <li><a className="hover:underline break-words" href="#4-when-and-with-whom-do-we-share-your-personal-information">When and with whom do we share your personal information?</a></li>
                      <li><a className="hover:underline break-words" href="#5-do-we-use-cookies-and-other-tracking-technologies">Do we use cookies and other tracking technologies?</a></li>
                      <li><a className="hover:underline break-words" href="#6-how-do-we-handle-your-social-logins">How do we handle your social logins?</a></li>
                      <li><a className="hover:underline break-words" href="#7-how-long-do-we-keep-your-information">How long do we keep your information?</a></li>
                      <li><a className="hover:underline break-words" href="#8-how-do-we-keep-your-information-safe">How do we keep your information safe?</a></li>
                      <li><a className="hover:underline break-words" href="#9-what-are-your-privacy-rights">What are your privacy rights?</a></li>
                      <li><a className="hover:underline break-words" href="#10-controls-for-do-not-track-features">Controls for Do-Not-Track features</a></li>
                      <li><a className="hover:underline break-words" href="#11-do-we-make-updates-to-this-notice">Do we make updates to this notice?</a></li>
                      <li><a className="hover:underline break-words" href="#12-how-can-you-contact-us-about-this-notice">How can you contact us about this notice?</a></li>
                      <li><a className="hover:underline break-words" href="#13-how-can-you-review-update-or-delete-the-data-we-collect-from-you">How can you review, update, or delete the data we collect from you?</a></li>
                    </ol>
                  </nav>

                  {/* Content */}
                  <div className="lg:col-span-3 max-w-full overflow-hidden">
                    <ScrollArea className="h-[70vh] pr-2">
                      <div className="max-w-full overflow-hidden">
                        <LegalDocumentRenderer markdownContent={document.markdownContent} />
                      </div>
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
