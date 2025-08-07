"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Clock, Users, CheckCircle, Video, Package, Shield } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function PackingVideosPage() {
  const videoTutorials = [
    {
      id: 1,
      title: "How to Pack Fragile Items",
      description: "Learn the proper techniques for packing delicate items like glassware, china, and electronics.",
      duration: "8:45",
      thumbnail: "/images/packing-fragile.jpg",
      category: "Fragile Items"
    },
    {
      id: 2,
      title: "Packing Clothes and Linens",
      description: "Master the art of packing clothing, bedding, and linens to prevent wrinkles and damage.",
      duration: "12:30",
      thumbnail: "/images/packing-clothes.jpg",
      category: "Clothing"
    },
    {
      id: 3,
      title: "Kitchen Packing Guide",
      description: "Step-by-step guide to packing your kitchen items safely and efficiently.",
      duration: "15:20",
      thumbnail: "/images/packing-kitchen.jpg",
      category: "Kitchen"
    },
    {
      id: 4,
      title: "Furniture Protection Techniques",
      description: "Learn how to protect and wrap furniture for safe transport.",
      duration: "10:15",
      thumbnail: "/images/packing-furniture.jpg",
      category: "Furniture"
    },
    {
      id: 5,
      title: "Electronics Packing Tips",
      description: "Essential tips for packing computers, TVs, and other electronic devices.",
      duration: "9:30",
      thumbnail: "/images/packing-electronics.jpg",
      category: "Electronics"
    },
    {
      id: 6,
      title: "Artwork and Antiques",
      description: "Specialized techniques for packing valuable artwork and antiques.",
      duration: "14:45",
      thumbnail: "/images/packing-artwork.jpg",
      category: "Valuable Items"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Packing Tutorial Videos"
        title="Professional Packing Tutorial Videos"
        description="Learn expert packing techniques with our comprehensive video tutorials. From fragile items to furniture, we cover everything you need to know for a successful move."
        primaryAction={{
          text: "Watch Videos",
          onClick: () => console.log("Watch videos clicked")
        }}
        secondaryAction={{
          text: "Download Guide",
          onClick: () => console.log("Download guide clicked")
        }}
      />

      {/* Video Tutorials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Packing Tutorial Videos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Master the art of packing with our professional video tutorials. Each video is designed to help you pack efficiently and safely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/40 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="h-8 w-8 text-primary-600 ml-1" />
                      </div>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900">
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-primary-600 border-primary-600">
                      {video.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-primary-600 hover:bg-primary-700">
                    Watch Video <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Watch Our Videos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Watch Our Packing Videos?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our video tutorials are created by professional movers with years of experience in packing and moving.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Professional Quality</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  High-quality videos with clear instructions and professional techniques.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Comprehensive Coverage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  From basic packing to specialized techniques for valuable items.
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
                  Learn techniques that prevent damage and ensure safe transport.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Video Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Video Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our video tutorials by category to find exactly what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Fragile Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Glassware, china, electronics</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Clothing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Clothes, linens, bedding</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Furniture</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Tables, chairs, sofas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Electronics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">TVs, computers, appliances</p>
              </CardContent>
            </Card>
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
