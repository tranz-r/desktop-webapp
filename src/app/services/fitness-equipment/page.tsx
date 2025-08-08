"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Dumbbell, Shield, Users, Clock, CheckCircle, Star, Award, Truck } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function FitnessEquipmentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Fitness Equipment Movers"
        title="Professional Fitness Equipment Moving"
        description="Specialized moving services for all types of fitness equipment. From treadmills and weight machines to home gyms and commercial equipment, we handle it all with care."
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
              Why Choose Tranzr for Fitness Equipment Moving?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fitness equipment requires specialized handling and expertise. Our team has the experience 
              and equipment to safely move your valuable fitness investments.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Dumbbell className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Equipment Specialists</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Trained professionals with extensive experience in moving 
                  all types of fitness equipment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Specialized Equipment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Custom dollies, straps, and protective materials designed 
                  specifically for fitness equipment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Assembly Services</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Complete disassembly and reassembly of fitness equipment 
                  at your new location.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fitness Equipment We Move
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We handle all types of fitness equipment, from small home gym items to large commercial machines.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">C</span>
                </div>
                <CardTitle>Cardio Equipment</CardTitle>
                <CardDescription>Treadmills, Ellipticals, Bikes, Rowers</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Treadmills, elliptical machines, stationary bikes, rowing machines, and more
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">W</span>
                </div>
                <CardTitle>Weight Equipment</CardTitle>
                <CardDescription>Machines, Free Weights, Benches</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Weight machines, free weights, benches, racks, and strength training equipment
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">H</span>
                </div>
                <CardTitle>Home Gyms</CardTitle>
                <CardDescription>Multi-Station, Compact, Commercial</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Multi-station home gyms, compact equipment, and commercial fitness setups
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Fitness Equipment Moving
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive fitness equipment moving service covers every aspect of safely transporting your equipment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Equipment Assessment</h3>
                <p className="text-gray-600">Evaluate equipment type, size, and moving requirements</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Safe Disassembly</h3>
                <p className="text-gray-600">Careful disassembly of equipment for transport</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Protective Packing</h3>
                <p className="text-gray-600">Specialized packing materials for equipment protection</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Secure Transport</h3>
                <p className="text-gray-600">Safe transport using specialized equipment and vehicles</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Professional Assembly</h3>
                <p className="text-gray-600">Complete reassembly and setup at new location</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Testing & Calibration</h3>
                <p className="text-gray-600">Test equipment functionality after assembly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fitness Equipment Moving Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures your fitness equipment is moved safely and efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600">
                Evaluate equipment and plan the move
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Disassembly</h3>
              <p className="text-gray-600">
                Carefully disassemble equipment for transport
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Transport</h3>
              <p className="text-gray-600">
                Secure transport to new location
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Assembly</h3>
              <p className="text-gray-600">
                Reassemble and test equipment
              </p>
            </div>
          </div>
        </div>
      </section>

      <GuaranteeComponent />
      <StorageSection
        title="Need storage for your items? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600<StorageSection />q=80"
        imageAlt="Storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
