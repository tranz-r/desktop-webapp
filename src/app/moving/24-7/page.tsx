"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Shield, Truck, Users, CheckCircle, Zap } from "lucide-react";

export default function TwentyFourSevenMovingPage() {
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
                24/7/365 Moving Services
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl">
                Round-the-Clock Moving Services
              </h1>
              <p className="text-xl opacity-95 drop-shadow-lg">
                The only moving company in Northamptonshire that offers 24/7/365 moving services. 
                No matter the time or day, we're here when you need us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  Emergency Move
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

      <Footer />
    </div>
  );
} 