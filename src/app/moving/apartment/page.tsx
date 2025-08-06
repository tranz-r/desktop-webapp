"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building, Clock, Shield, Truck, Users, CheckCircle, Home } from "lucide-react";

export default function ApartmentMovingPage() {
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
                Apartment Moving Services
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl">
                Professional Apartment Moving Services
              </h1>
              <p className="text-xl opacity-95 drop-shadow-lg">
                Specialized moving services designed for apartment living. From studio apartments 
                to luxury penthouses, we handle all types of apartment moves with care and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 backdrop-blur-sm">
                  View Our Process
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
              Why Choose Tranzr for Apartment Moving?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Apartment moving requires special considerations. We understand the unique challenges 
              and provide solutions tailored to apartment living.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Apartment Expertise</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Specialized knowledge of apartment layouts, elevator access, 
                  and building regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Damage Prevention</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Extra care to prevent damage to walls, floors, and common areas 
                  during the moving process.
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
                  Teams specifically trained to handle apartment moves efficiently 
                  while respecting building rules and neighbors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Apartment Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Apartment Types We Handle
            </h2>
            <p className="text-lg text-gray-600">
              From cozy studios to spacious penthouses, we handle all types of apartment moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Studio Apartments</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Efficient moving services for studio apartments, 
                  maximizing space and minimizing disruption.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>1-2 Bedroom Apartments</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive moving services for 1-2 bedroom apartments 
                  with full furniture and belongings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Luxury Apartments</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Premium moving services for luxury apartments and penthouses 
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
              Apartment Moving Services Included
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive services designed specifically for apartment moves.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Building Coordination</h3>
                  <p className="text-gray-600">
                    Coordination with building management for elevator access, 
                    parking, and move-in/move-out schedules.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Disassembly</h3>
                  <p className="text-gray-600">
                    Professional disassembly and reassembly of furniture 
                    to fit through doorways and elevators.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Protective Measures</h3>
                  <p className="text-gray-600">
                    Use of protective materials to prevent damage to walls, 
                    floors, and common areas during the move.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Efficient Loading</h3>
                  <p className="text-gray-600">
                    Strategic loading to maximize space and ensure 
                    safe transport of all items.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Furniture Placement</h3>
                  <p className="text-gray-600">
                    Strategic placement of furniture in your new apartment 
                    according to your preferences and space constraints.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Clean Up</h3>
                  <p className="text-gray-600">
                    Complete cleanup of the old apartment, leaving it 
                    spotless for the next tenant.
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
            Ready to Move Your Apartment?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free, no-obligation quote today. Our apartment moving experts are ready 
            to help you move efficiently and safely.
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