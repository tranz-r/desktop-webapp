"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Clock, Shield, Truck, Users, CheckCircle, Globe } from "lucide-react";


export default function LongDistanceMovingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/tranzr-van-express.png)' }}>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 gap-8 items-center">
            <div className="text-white space-y-6 text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                Long Distance Moving
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl">
                Professional Long Distance Moving Services Across the UK
              </h1>
              <p className="text-xl opacity-95 drop-shadow-lg">
                Reliable, secure, and efficient long-distance moving services. We handle moves 
                across the UK with the same care and attention as local moves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  Track Your Move
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tranzr for Long Distance Moves?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Long-distance moves require special expertise and planning. Our experienced team 
              ensures your belongings arrive safely and on time, no matter the distance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Nationwide Coverage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We provide long-distance moving services across the entire UK, 
                  from Scotland to Cornwall.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Full Insurance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive insurance coverage for the entire journey, 
                  giving you peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Timely Delivery</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Guaranteed delivery dates and real-time tracking 
                  throughout your move.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Long Distance Moving Services
            </h2>
            <p className="text-lg text-gray-600">
              From packing to delivery, we handle every aspect of your long-distance move.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Professional Packing</h3>
                  <p className="text-gray-600">
                    Expert packing services using high-quality materials designed for 
                    long-distance transport and protection.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Secure Loading</h3>
                  <p className="text-gray-600">
                    Strategic loading and securing of items to prevent damage during 
                    long-distance transportation.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Climate Control</h3>
                  <p className="text-gray-600">
                    Climate-controlled transport options for sensitive items like 
                    artwork, antiques, and electronics.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Real-Time Tracking</h3>
                  <p className="text-gray-600">
                    Track your belongings in real-time with our advanced GPS tracking 
                    system throughout the journey.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Storage Options</h3>
                  <p className="text-gray-600">
                    Flexible storage solutions at both origin and destination 
                    for your convenience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Delivery & Setup</h3>
                  <p className="text-gray-600">
                    Professional delivery and setup services at your new location, 
                    including furniture assembly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Long Distance Routes
            </h2>
            <p className="text-lg text-gray-600">
              We serve all major routes across the UK with reliable and efficient service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-8 w-8 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-lg">London to Manchester</h3>
                    <p className="text-gray-600">~200 miles</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Regular service between the capital and the North West, 
                  with flexible scheduling options.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-8 w-8 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Birmingham to Edinburgh</h3>
                    <p className="text-gray-600">~300 miles</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Direct service from the Midlands to Scotland, 
                  with overnight transport options.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-8 w-8 text-primary-600" />
                  <div>
                    <h3 className="font-semibold text-lg">Cardiff to Leeds</h3>
                    <p className="text-gray-600">~250 miles</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Reliable service from Wales to Yorkshire, 
                  with comprehensive packing included.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Plan Your Long Distance Move?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation quote today. Our long-distance moving experts are ready 
            to help you plan a successful relocation across the UK.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 