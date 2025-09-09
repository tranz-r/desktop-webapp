"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Truck, Users, CheckCircle, DollarSign } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";
import CTASection from "@/components/CTASection";
import SvgFullPackingMove from "@/components/FullPackingMove";
import SvgLocalMovesSVG from "@/components/LocalMovesSVG";
import ValuableItemMoveSVG from "@/components/ValuableItemMove";

export default function HourlyMovingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Hourly Moving Services"
        title="Flexible Hourly Moving Services"
        description="Pay only for the time you need with our transparent hourly rates. Perfect for small moves, furniture delivery, and flexible scheduling."
        primaryAction={{
          text: "Get Free Quote",
          href: "/quote-option"
        }}
        secondaryAction={{
          text: "View Rates",
          onClick: () => console.log("View rates clicked")
        }}
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tranzr for Hourly Moving?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hourly moving services offer flexibility and cost-effectiveness for smaller moves 
              and specific moving needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Cost Effective</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Pay only for the time you need, making it perfect 
                  for smaller moves and specific tasks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Flexible Scheduling</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Choose the hours that work best for you, 
                  with no minimum time requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Experienced Team</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Professional movers who work efficiently to maximize 
                  your time and minimize costs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hourly Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hourly Moving Services We Offer
            </h2>
            <p className="text-lg text-gray-600">
              From furniture moving to small relocations, our hourly services cover all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Furniture Moving</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Moving individual pieces of furniture or small 
                  collections within your home or to a new location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Appliance Moving</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Safe and professional moving of appliances like 
                  refrigerators, washers, dryers, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Small Moves</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Complete moving services for small apartments, 
                  single rooms, or partial home moves.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hourly Moving Services Included
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive services designed for flexible, hourly-based moving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Loading & Unloading</h3>
                  <p className="text-gray-600">
                    Professional loading and unloading of items 
                    with proper care and attention.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Transportation</h3>
                  <p className="text-gray-600">
                    Safe transportation in our well-maintained vehicles 
                    with proper securing of items.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Assembly</h3>
                  <p className="text-gray-600">
                    Disassembly and reassembly of furniture 
                    as needed for safe transport.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Protective Materials</h3>
                  <p className="text-gray-600">
                    Use of protective materials like blankets, 
                    straps, and padding for safe transport.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Placement</h3>
                  <p className="text-gray-600">
                    Strategic placement of furniture in your 
                    desired locations at the destination.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Clean Up</h3>
                  <p className="text-gray-600">
                    Cleanup of any debris or packaging materials 
                    after the move is complete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <CTASection
        title="Ready for Flexible Moving?"
        description="Get your free, no-obligation quote today. Our hourly moving experts are ready to help you move efficiently and cost-effectively."
        secondaryButtonText="Schedule Consultation"
      />

      {/* Storage Section */}
      <StorageSection
        title="Need storage for your hourly move? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="/images/two-movers.jpg"
        imageAlt="Hourly storage service"
      />

      {/* Packing Services */}
      <SVGImagesComponent
        title="Hourly Moving Packing Services"
        services={[
          {
            id: "full-packing",
            title: "Full Packing",
            description: "We remove the hassle of packing up all of your valuable items safely. You can decide what you want us to pack, there is no minimum limit to our packing service.",
            svgComponent: SvgFullPackingMove,
          },
          {
            id: "platinum-packing",
            title: "Platinum Packing",
            description: "We will not only pack up all of your items, we will unpack all of your belongings into your new address. You just tell us what and where you want everything placed.",
            svgComponent: SvgLocalMovesSVG,
          },
          {
            id: "valuable-item-packing",
            title: "Valuable Item Packing",
            description: "Your valuable furniture pieces, antiques and artwork will be safely handled with the utmost care. We will build custom crates for your items.",
            svgComponent: ValuableItemMoveSVG,
          }
        ]}
      />

      {/* Guarantee Component */}
      <GuaranteeComponent
        title="We offer a guaranteed, all-inclusive flat fee, locked in before your move day. Which means the duration of your move will not impact your move price. We always include the following services at no extra charge to you."
        highlightedText="We include all of the following services at no extra charge to you."
        subtitle="Items we always pack for free, as a part of your flat fee"
        includedItems={[
          "Smart & Flat-screen TVs – Protected and packed in oversized LCD/plasma/LED box",
          "Wardrobe Clothes – Hung and packed into a Piece of Cake wardrobe box",
          "Standard sized Mirrors – Protected and packed in cardboard box",
          "Lamps – Packed in lamp box with shade removed and wrapped",
          "Paintings – Protected and packed in cardboard or picture crate",
          "Small Art Sculptures – Protected and packed in sturdy cardboard box",
          "Computers – Wrapped and packed in cardboard box and kept flat",
          "Electronics – Wrapped and packed in cardboard box with bundled cabling alongside it",
        ]}
      />

      {/* Promotional Section */}
      <PromotionalSection
        title="Put your feet up with our complete packing experience"
        highlightedText="complete packing"
        description="We can pack your whole home, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/feet-up.jpg"
        imageAlt="Professional movers packing furniture with care for hourly service"
      />

      <Footer />
    </div>
  );
} 