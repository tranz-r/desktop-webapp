"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";

export default function MovingComponent() {

  return (
    <div className="bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-gray-800 to-gray-900 flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage:
              "url('/images/truck_on_road.jpg?w=1920&q=80&h=1000')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Extensive Moving
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                services
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                Whatever you need to move from A to B, we'll move it safely
              </p>
            </div>
            {/* Hero CTA */}
            <div className="pb-10">
              <Link href="/inventory">
                <Button
                  variant="default"
                  className="bg-secondary-400 hover:bg-secondary-500 text-white font-extrabold lg:text-lg scale-[1.3] origin-left"
                >
                  GET INSTANT QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
