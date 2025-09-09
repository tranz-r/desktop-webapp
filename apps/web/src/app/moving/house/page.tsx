"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Home, Clock, Shield, Truck, Users, CheckCircle, MapPin } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";
import CTASection from "@/components/CTASection";
import SvgFullPackingMove from "@/components/FullPackingMove";
import SvgLocalMovesSVG from "@/components/LocalMovesSVG";
import ValuableItemMoveSVG from "@/components/ValuableItemMove";

export default function HouseMovingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="House Moving Services"
        title="Professional House Moving Services"
        description="Complete house moving services from small family homes to large estates. We handle every aspect of your house move with care and professionalism."
        primaryAction={{
          text: "Get Free Quote",
          href: "/quote-option"
        }}
        secondaryAction={{
          text: "View Our Process",
          onClick: () => console.log("View process clicked")
        }}
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tranzr for House Moving?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              House moving requires comprehensive planning and execution. We provide 
              full-service house moving solutions tailored to your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Full-Service Moving</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Complete moving services including packing, loading, 
                  transport, and unloading at your new home.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Damage Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive protection for your home, furniture, 
                  and belongings throughout the moving process.
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
                  Professional teams with extensive experience in house moving 
                  and handling all types of furniture and belongings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* House Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              House Types We Handle
            </h2>
            <p className="text-lg text-gray-600">
              From cozy cottages to large family homes, we handle all types of house moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Small Houses</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Efficient moving services for small houses and cottages, 
                  perfect for couples and small families.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Family Homes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive moving services for family homes with multiple 
                  bedrooms and living spaces.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Large Estates</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Premium moving services for large estates and luxury homes 
                  with high-value items and furniture.
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
              House Moving Services Included
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive services designed specifically for house moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Complete Packing</h3>
                  <p className="text-gray-600">
                    Professional packing of all rooms including kitchen, 
                    bedrooms, living areas, and storage spaces.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Disassembly</h3>
                  <p className="text-gray-600">
                    Professional disassembly and reassembly of furniture 
                    for safe transport and efficient loading.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Specialty Items</h3>
                  <p className="text-gray-600">
                    Careful handling of specialty items like pianos, 
                    artwork, antiques, and fragile belongings.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Loading & Transport</h3>
                  <p className="text-gray-600">
                    Strategic loading and safe transportation using 
                    appropriate vehicles and equipment.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Placement</h3>
                  <p className="text-gray-600">
                    Strategic placement of furniture in your new home 
                    according to your preferences and layout.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Clean Up</h3>
                  <p className="text-gray-600">
                    Complete cleanup of the old house, leaving it 
                    spotless for the new owners or tenants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <CTASection
        title="Ready to Move Your House?"
        description="Get your free, no-obligation quote today. Our house moving experts are ready to help you move efficiently and safely."
        secondaryButtonText="Schedule Consultation"
      />

      {/* Storage Section */}
      <StorageSection
        title="Need storage for your house move? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="/images/two-movers.jpg"
        imageAlt="House storage service"
      />

      {/* Packing Services */}
      <SVGImagesComponent
        title="House Moving Packing Services"
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
            description: "We will not only pack up all of your items, we will unpack all of your belongings into your new house. You just tell us what and where you want everything placed.",
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
        description="We can pack your whole house, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/feet-up.jpg"
        imageAlt="Professional movers packing house furniture with care"
      />

      <Footer />
    </div>
  );
} 