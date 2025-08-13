"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TermsContent from "@/components/legal/TermsContent";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-8 lg:pt-12 pb-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle>Services Terms &amp; Conditions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Last updated: <time dateTime="2025-08-13">13 August 2025</time>
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* TOC */}
                <nav className="lg:col-span-1 sticky top-28 self-start bg-muted/40 rounded-md p-4 text-sm">
                  <strong className="block mb-2">Contents</strong>
                  <ol className="space-y-1 list-decimal list-inside">
                    <li>
                      <a className="hover:underline" href="#sec1">
                        Cost of service &amp; payment terms
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec2">
                        Customer responsibility and expectations
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec3">
                        Insurance and valuation coverage
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec4">
                        Building Insurance – COI
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec5">
                        Claims and refunds
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec6">
                        Safety of moving crews and customers
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec7">
                        Contactless moving services
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec8">
                        Long distance moving services
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec9">
                        Storage services
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec10">
                        Packing and unpacking
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec11">
                        Plastic moving totes/bins for hire
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec12">
                        Moving supplies to purchase
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec13">
                        TVs and electronics
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec14">
                        Special handling
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec15">
                        Furniture assembly &amp; disassembly
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec16">
                        Furniture &amp; mattress disposal
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec17">
                        Client referral programme
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec18">
                        Military moving discount programme
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec19">
                        Customer privacy
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec20">
                        Liability during state of emergency or disaster
                      </a>
                    </li>
                    <li>
                      <a className="hover:underline" href="#sec21">
                        Disclaimer of warranties; limitation of liability
                      </a>
                    </li>
                  </ol>
                </nav>

                {/* Content */}
                <div className="lg:col-span-3">
                  <ScrollArea className="h-[70vh] pr-2">
                    <TermsContent />
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
