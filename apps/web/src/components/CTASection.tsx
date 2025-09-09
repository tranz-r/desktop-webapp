"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  title: string;
  description: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonOnClick?: () => void;
  className?: string;
}

export default function CTASection({
  title,
  description,
  primaryButtonText = "Get Free Quote",
  primaryButtonHref = "/quote-option",
  secondaryButtonText,
  secondaryButtonOnClick,
  className = ""
}: CTASectionProps) {
  return (
    <section className={`py-16 bg-primary-600 ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryButtonHref}>
            <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              {primaryButtonText} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          {secondaryButtonText && (
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-black hover:bg-black hover:text-white"
              onClick={secondaryButtonOnClick}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
