"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Truck, Users, CheckCircle, Zap } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";
import SvgFullPackingMove from "@/components/FullPackingMove";
import SvgLocalMovesSVG from "@/components/LocalMovesSVG";
import ValuableItemMoveSVG from "@/components/ValuableItemMove";

export default function TwentyFourSevenMovingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="24/7/365 Moving Services"
        title="Round-the-Clock Moving Services"
        description="The only moving company in Northamptonshire that offers 24/7/365 moving services. No matter the time or day, we're here when you need us."
        primaryAction={{
          text: "Get Free Quote",
          href: "/inventory"
        }}
        secondaryAction={{
          text: "Emergency Move",
          onClick: () => console.log("Emergency move clicked")
        }}
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tranzr for 24/7 Moving?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              When you need to move at any hour, we're the only company you can count on. 
              Our 24/7/365 service ensures you're never left waiting.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>24/7 Availability</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Available 24 hours a day, 7 days a week, 365 days a year. 
                  No matter when you need us, we're here.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Emergency Response</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Rapid response times for emergency moves, 
                  with teams ready to deploy at a moment's notice.
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
                  Our overnight and emergency teams are specially trained 
                  to handle moves at any hour with the same professionalism.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              24/7 Moving Services We Offer
            </h2>
            <p className="text-lg text-gray-600">
              From emergency moves to scheduled overnight relocations, we handle it all.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Emergency Moves</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Immediate response for urgent moves due to emergencies, 
                  evictions, or unexpected circumstances.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Overnight Moves</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Scheduled moves during overnight hours for minimal disruption 
                  to your daily routine.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Weekend Moves</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Full moving services available on weekends, 
                  including holidays and bank holidays.
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
              24/7 Moving Services Included
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive services available around the clock.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Emergency Response</h3>
                  <p className="text-gray-600">
                    Immediate response teams available 24/7 for urgent moves 
                    and emergency situations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Full Moving Services</h3>
                  <p className="text-gray-600">
                    Complete moving services including packing, loading, 
                    transport, and unloading at any hour.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Specialized Equipment</h3>
                  <p className="text-gray-600">
                    Specialized equipment and vehicles designed for 
                    overnight and emergency moving operations.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Professional Team</h3>
                  <p className="text-gray-600">
                    Experienced teams specifically trained for overnight 
                    and emergency moving operations.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Insurance Coverage</h3>
                  <p className="text-gray-600">
                    Full insurance coverage for all 24/7 moves, 
                    providing peace of mind at any hour.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-600">
                    Flexible scheduling options to accommodate your needs, 
                    whether it's 2 AM or 2 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Need a Move Right Now?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Don't wait! Our 24/7 moving team is ready to help you move at any hour. 
            Contact us now for immediate assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Emergency Move <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Call Now
            </Button>
          </div>
        </div>
      </section>

      {/* Storage Section */}
      <StorageSection
        title="Need storage for your 24/7 move? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
        imageAlt="24/7 storage service"
      />

      {/* Packing Services */}
      <SVGImagesComponent
        title="24/7 Moving Packing Services"
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
        imageAlt="Professional movers packing furniture with care for 24/7 service"
      />

      <Footer />
    </div>
  );
} 