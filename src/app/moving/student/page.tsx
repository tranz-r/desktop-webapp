"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, GraduationCap, Clock, Shield, Truck, Users, CheckCircle, BookOpen } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";
import SvgFullPackingMove from "@/components/FullPackingMove";
import SvgLocalMovesSVG from "@/components/LocalMovesSVG";
import ValuableItemMoveSVG from "@/components/ValuableItemMove";

export default function StudentMovingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Student Moving Services"
        title="Professional Student Moving Services"
        description="Specialized moving services designed for students. From university accommodation to shared houses, we make student moves easy and affordable."
        primaryAction={{
          text: "Get Free Quote",
          href: "/inventory"
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
              Why Choose Tranzr for Student Moving?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Student moving requires special considerations. We understand the unique needs 
              of students and provide affordable, efficient solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Student-Friendly</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Services designed specifically for students with flexible scheduling 
                  and convenient options.
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
                  Flexible scheduling to accommodate academic schedules, 
                  exam periods, and term dates.
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
                  Teams experienced in handling student moves, including 
                  shared accommodation and university housing.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Move Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Student Move Types We Handle
            </h2>
            <p className="text-lg text-gray-600">
              From university halls to shared houses, we handle all types of student moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>University Accommodation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Moving in and out of university halls, student apartments, 
                  and university-managed accommodation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Shared Houses</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Moving into and out of shared student houses, 
                  including room-to-room moves within the same property.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Summer Storage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Storage solutions for student belongings during 
                  summer breaks and between academic years.
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
              Student Moving Services Included
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive services designed specifically for student moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Room Packing</h3>
                  <p className="text-gray-600">
                    Professional packing of student rooms including books, 
                    electronics, clothing, and personal items.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Moving</h3>
                  <p className="text-gray-600">
                    Safe moving of student furniture including beds, 
                    desks, wardrobes, and other items.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Electronics Handling</h3>
                  <p className="text-gray-600">
                    Careful handling of laptops, computers, TVs, 
                    and other electronic devices.
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
                    Safe loading and transportation using appropriate 
                    vehicles and equipment for student moves.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Placement</h3>
                  <p className="text-gray-600">
                    Strategic placement of furniture in your new student 
                    accommodation according to your preferences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Clean Up</h3>
                  <p className="text-gray-600">
                    Complete cleanup of the old student accommodation, 
                    leaving it spotless for the next tenant.
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
            Ready for Your Student Move?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation quote today. Our student moving experts are ready 
            to help you move efficiently and affordably.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Storage Section */}
      <StorageSection
        title="Need storage for your student move? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
        imageAlt="Student storage service"
      />

      {/* Packing Services */}
      <SVGImagesComponent
        title="Student Moving Packing Services"
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
            description: "We will not only pack up all of your items, we will unpack all of your belongings into your new student accommodation. You just tell us what and where you want everything placed.",
            svgComponent: SvgLocalMovesSVG,
          },
          {
            id: "valuable-item-packing",
            title: "Valuable Item Packing",
            description: "Your valuable electronics, books, and personal items will be safely handled with the utmost care. We will build custom crates for your items.",
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
        description="We can pack your whole student accommodation, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/feet-up.jpg"
        imageAlt="Professional movers packing student furniture with care"
      />

      <Footer />
    </div>
  );
} 