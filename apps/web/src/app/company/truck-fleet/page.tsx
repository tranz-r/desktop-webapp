"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Truck, Shield, Zap, Users, CheckCircle, Star, Fuel } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function TruckFleetPage() {
  const fleetStats = [
    {
      number: "50+",
      label: "Modern Vehicles",
      icon: Truck,
      description: "Fleet of modern, well-maintained moving vehicles"
    },
    {
      number: "100%",
      label: "GPS Tracked",
      icon: Zap,
      description: "All vehicles equipped with GPS tracking systems"
    },
    {
      number: "24/7",
      label: "Maintenance",
      icon: Shield,
      description: "Round-the-clock maintenance and support"
    },
    {
      number: "5-Star",
      label: "Safety Rating",
      icon: Star,
      description: "All vehicles meet highest safety standards"
    }
  ];

  const vehicleTypes = [
    {
      name: "Small Van",
      capacity: "1-2 rooms",
      description: "Perfect for small moves, studio apartments, or single rooms",
      features: ["GPS Tracking", "Climate Control", "Lift Gate"],
      image: "/images/van-small.jpg",
      icon: Truck
    },
    {
      name: "Medium Truck",
      capacity: "2-3 rooms",
      description: "Ideal for medium-sized moves and family homes",
      features: ["GPS Tracking", "Climate Control", "Lift Gate", "Furniture Protection"],
      image: "/images/truck-medium.jpg",
      icon: Truck
    },
    {
      name: "Large Truck",
      capacity: "3-4 rooms",
      description: "Suitable for large homes and commercial moves",
      features: ["GPS Tracking", "Climate Control", "Lift Gate", "Furniture Protection", "Extra Security"],
      image: "/images/truck-large.jpg",
      icon: Truck
    },
    {
      name: "Specialized Vehicle",
      capacity: "Custom",
      description: "For special items like pianos, artwork, or commercial equipment",
      features: ["GPS Tracking", "Climate Control", "Specialized Equipment", "Extra Security", "Custom Loading"],
      image: "/images/truck-specialized.jpg",
      icon: Truck
    }
  ];

  const fleetFeatures = [
    {
      title: "GPS Tracking",
      description: "Real-time tracking of all our vehicles for accurate delivery times",
      icon: Zap
    },
    {
      title: "Climate Control",
      description: "Temperature-controlled environments to protect your belongings",
      icon: Shield
    },
    {
      title: "Lift Gates",
      description: "Hydraulic lift gates for easy loading and unloading",
      icon: Truck
    },
    {
      title: "Furniture Protection",
      description: "Specialized equipment to protect your furniture during transport",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Our Fleet"
        title="Our Modern Truck Fleet"
        description="Our fleet of 50+ modern, well-maintained vehicles is equipped with the latest technology and safety features to ensure your belongings are transported safely and efficiently."
        primaryAction={{
          text: "View Fleet",
          onClick: () => console.log("View fleet clicked")
        }}
        secondaryAction={{
          text: "GET INSTANT QUOTE",
          href: "/quote-option"
        }}
      />

      {/* Fleet Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Fleet in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our modern fleet is designed to handle any moving requirement with efficiency and safety.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fleetStats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <stat.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary-600">
                    {stat.number}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900 mb-2">{stat.label}</p>
                  <p className="text-gray-600">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Vehicle Types
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We have the right vehicle for every type of move, from small apartments to large commercial relocations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicleTypes.map((vehicle, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <vehicle.icon className="h-5 w-5 text-primary-600" />
                      {vehicle.name}
                    </CardTitle>
                    <Badge className="bg-primary-100 text-primary-600">
                      {vehicle.capacity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fleet Features
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our vehicles are equipped with the latest technology and safety features to ensure your move goes smoothly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fleetFeatures.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Maintenance */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fleet Maintenance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain our fleet to the highest standards to ensure reliability and safety.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Regular Maintenance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  All vehicles undergo regular maintenance checks and servicing to ensure they're in perfect condition.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  Safety Inspections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive safety inspections are conducted before every journey to ensure vehicle safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary-600" />
                  Technology Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our fleet is regularly updated with the latest technology for better efficiency and safety.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fuel className="h-5 w-5 text-primary-600" />
                  Fuel Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our vehicles are designed for fuel efficiency to reduce environmental impact and costs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fleet Safety */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fleet Safety
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Safety is our top priority. Our fleet meets and exceeds all safety standards and regulations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Safety Standards</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All vehicles meet or exceed industry safety standards and regulations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Trained Drivers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All drivers are professionally trained and licensed to operate our vehicles safely.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Insurance Coverage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive insurance coverage for all vehicles and cargo during transport.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <GuaranteeComponent />
      <StorageSection
        title="Need storage for your fleet? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
        imageAlt="Truck fleet storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
