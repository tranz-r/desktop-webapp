"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package, Truck, Clock, CheckCircle, MapPin, Users, Recycle, Shield } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function PlasticBinRentalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Plastic Bin Rental"
        title="Eco-Friendly Plastic Bin Rental"
        description="Rent durable, reusable plastic bins for your move. Better for the environment and more convenient than cardboard boxes. Clean, stackable, and secure."
        primaryAction={{
          text: "Rent Bins",
          onClick: () => console.log("Rent bins clicked")
        }}
        secondaryAction={{
          text: "View Sizes",
          onClick: () => console.log("View sizes clicked")
        }}
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Plastic Bins Over Cardboard?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Plastic bins offer numerous advantages over traditional cardboard boxes 
              for a more efficient and eco-friendly moving experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Recycle className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Reusable bins reduce waste and are better for the environment 
                  compared to disposable cardboard boxes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Better Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Durable plastic construction provides superior protection 
                  for your belongings during transport.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Stackable Design</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Uniform size and stackable design make loading and 
                  organizing much more efficient.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Sizes */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Available Bin Sizes
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer various sizes to accommodate all your packing needs, from small items to large furniture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">S</span>
                </div>
                <CardTitle>Small Bins</CardTitle>
                <CardDescription>18" x 14" x 12"</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Perfect for books, documents, small electronics, and personal items
                </p>
                <Badge variant="outline" className="text-primary-600 border-primary-600">
                  £5/week
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">M</span>
                </div>
                <CardTitle>Medium Bins</CardTitle>
                <CardDescription>24" x 18" x 16"</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Ideal for clothing, linens, kitchen items, and medium-sized objects
                </p>
                <Badge variant="outline" className="text-primary-600 border-primary-600">
                  £7/week
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-600">L</span>
                </div>
                <CardTitle>Large Bins</CardTitle>
                <CardDescription>30" x 20" x 18"</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Great for bedding, pillows, large kitchen items, and bulky objects
                </p>
                <Badge variant="outline" className="text-primary-600 border-primary-600">
                  £9/week
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple Rental Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Renting plastic bins is quick and easy with our streamlined process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Order</h3>
              <p className="text-gray-600">
                Choose your bin sizes and quantities online
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Deliver</h3>
              <p className="text-gray-600">
                We deliver clean bins to your doorstep
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Use</h3>
              <p className="text-gray-600">
                Pack and move with durable plastic bins
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Return</h3>
              <p className="text-gray-600">
                We pick up the bins when you're done
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
        imageSrc="/images/two-movers.jpg"
        imageAlt="Storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
