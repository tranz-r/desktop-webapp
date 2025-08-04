"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import {
  ArrowRight,
  Star,
  Truck,
  Package,
  Home,
  Calendar,
  Shield,
  Phone,
} from "lucide-react";
import PromotionalSection from "@/components/PromotionalSection";

export default function HomePage() {
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header sticky={false} />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-primary-500 to-primary-600 flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-relaxed tracking-wide font-serif">
              The best movers in Northamptonshire and the UK with the best
              reviews and customer satisfaction.
            </h1>
            <div className="space-y-2">
              <p className="text-lg lg:text-xl opacity-90">
                Affordable moving & storage services.
              </p>
              <p className="text-lg lg:text-xl opacity-90">
                Guaranteed all-inclusive quote within minutes.
              </p>
            </div>

            {/* Quote Form */}
            <div className="space-y-4 max-w-md pb-10">
              <Input
                type="text"
                placeholder="Moving from address"
                value={movingFrom}
                onChange={(e) => setMovingFrom(e.target.value)}
                className="bg-white text-gray-900 placeholder-gray-500 border-0 h-12 text-base"
              />
              <Input
                type="text"
                placeholder="Moving to address"
                value={movingTo}
                onChange={(e) => setMovingTo(e.target.value)}
                className="bg-white text-gray-900 placeholder-gray-500 border-0 h-12 text-base"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-secondary-400 hover:bg-secondary-500 text-white flex-1"
                >
                  GET QUOTE <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-accent-400 hover:bg-accent-500 text-white flex items-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Or get a call from us
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <img
              src="/images/best-movers.jpg"
              alt="Best movers in Northamptonshire"
              className="w-full h-[300px] lg:h-[600px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

            {/* Complete Moving Services */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Keep moving forward with our
            </h2>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              comprehensive moving services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whatever you need to move from point A to B, we will get it there
              safely.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 24/7/365 Moving */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7/365 Moving
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                The only moving company in Northamptonshire that offers any day and time
                moving services. No matter how big or small your move is we will
                move it.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Local Residential Moving */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Local Residential Moving Services
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We specialize in local residential Northamptonshire and UK moves.
                We can move you across all of the London Area and
                surrounding UK locations.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Long Distance Moving */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-secondary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Long Distance Moving Services
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                From Northamptonshire to Edinburgh, Manchester and Cardiff we can move you to any
                location in the UK. With on time long distance delivery dates and
                safe packing we will get you settled into your new home quickly.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Office and Commercial Moves */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Office and Commercial Moves
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We can move your office overnight, on the weekend and during
                holidays to minimize your downtime. With full office packing and
                unpacking our staff will be up and running the next morning.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Small Moves */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Small Moves
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Need to move a few small items or moving out of a studio with
                minimal furniture? Do not lift a finger with our small move
                service.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Last Minute Moves */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Last Minute Moves
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Need to move urgently, our last minute moving service will help
                you the day you get you into your new address asap! We also
                offer emergency packing and storage services.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <PromotionalSection
        title="Put your feet up with our complete packing experience"
        highlightedText="complete packing"
        description="We can pack your whole home, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/feet-up.jpg"
        imageAlt="Professional movers packing furniture with care"
      />



      {/* SVG Images Component */}
      <SVGImagesComponent />

      {/* Guarantee Section */}
      <GuaranteeComponent />

      {/* Storage Section */}
      <StorageSection
        title="Make space with our flexible short and long term "
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure storage facility, where they will be safely stored for as little or as long of you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
        imageAlt="Professional storage service with moving boxes"
        onButtonClick={() => console.log("Storage quote requested")}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
