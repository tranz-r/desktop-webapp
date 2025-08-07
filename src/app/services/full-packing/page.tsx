"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package, Shield, Users, Clock, CheckCircle, Star } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function FullPackingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Full Packing Services"
        title="Professional Full Packing Services"
        description="Complete packing services from start to finish. Our expert packers handle everything with care, ensuring your belongings are safely packed and ready for transport."
        primaryAction={{
          text: "Get Free Quote",
          onClick: () => console.log("Get quote clicked")
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
              Why Choose Tranzr for Full Packing?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our full packing service is designed to take the stress out of moving. 
              We handle everything from fragile items to large furniture with professional care.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Complete Packing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We pack everything from kitchen items to bedroom furniture, 
                  using high-quality materials and professional techniques.
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
                  Comprehensive protection for all your belongings with 
                  specialized packing materials and techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Expert Packers</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Trained professionals with years of experience in 
                  packing all types of items and furniture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What's Included in Full Packing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive full packing service covers every aspect of preparing your belongings for transport.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Kitchen Packing</h3>
                <p className="text-gray-600">All dishes, cookware, appliances, and pantry items</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Bedroom Packing</h3>
                <p className="text-gray-600">Clothing, linens, personal items, and furniture</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Living Room Packing</h3>
                <p className="text-gray-600">Furniture, electronics, decorations, and accessories</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Bathroom Packing</h3>
                <p className="text-gray-600">Toiletries, towels, and bathroom accessories</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Office Packing</h3>
                <p className="text-gray-600">Documents, electronics, and office furniture</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Specialty Items</h3>
                <p className="text-gray-600">Artwork, antiques, and fragile items</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packing Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Packing Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We follow a systematic approach to ensure nothing is missed and everything is packed safely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600">
                We assess your home and create a detailed packing plan
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preparation</h3>
              <p className="text-gray-600">
                We bring all necessary packing materials and supplies
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Packing</h3>
              <p className="text-gray-600">
                Professional packing of all items with proper labeling
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Completion</h3>
              <p className="text-gray-600">
                Final inspection and preparation for transport
              </p>
            </div>
          </div>
        </div>
      </section>

      <GuaranteeComponent />
      <StorageSection />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
