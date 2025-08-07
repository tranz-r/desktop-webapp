"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Package, Shield, Clock, Users, CheckCircle, Star, Award, Box } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function HowToPackPage() {
  const packingTips = [
    {
      id: 1,
      title: "Start Early",
      description: "Begin packing at least 2-3 weeks before your move date. Start with items you use less frequently.",
      icon: Clock,
      category: "Planning"
    },
    {
      id: 2,
      title: "Gather Supplies",
      description: "Stock up on boxes, packing tape, bubble wrap, packing paper, and markers for labeling.",
      icon: Package,
      category: "Preparation"
    },
    {
      id: 3,
      title: "Declutter First",
      description: "Sort through your belongings and donate, sell, or discard items you no longer need.",
      icon: Box,
      category: "Organization"
    },
    {
      id: 4,
      title: "Pack Room by Room",
      description: "Focus on one room at a time to stay organized and avoid mixing items from different areas.",
      icon: Users,
      category: "Strategy"
    },
    {
      id: 5,
      title: "Label Everything",
      description: "Clearly label each box with the room name and a brief description of contents.",
      icon: Shield,
      category: "Organization"
    },
    {
      id: 6,
      title: "Pack Heavy Items First",
      description: "Place heavy items at the bottom of boxes and lighter items on top to prevent damage.",
      icon: Package,
      category: "Technique"
    }
  ];

  const packingGuide = [
    {
      room: "Kitchen",
      items: ["Dishes and glassware", "Cookware", "Small appliances", "Pantry items"],
      tips: "Wrap fragile items in packing paper and use dividers for plates."
    },
    {
      room: "Living Room",
      items: ["Electronics", "Books", "Decorations", "Furniture"],
      tips: "Take photos of electronics connections before disconnecting."
    },
    {
      room: "Bedroom",
      items: ["Clothing", "Bedding", "Personal items", "Furniture"],
      tips: "Use wardrobe boxes for hanging clothes to prevent wrinkles."
    },
    {
      room: "Bathroom",
      items: ["Toiletries", "Towels", "Cleaning supplies", "Medicine"],
      tips: "Pack toiletries in sealed bags to prevent leaks."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Packing Guide"
        title="How to Pack for Your Move"
        description="Master the art of packing with our comprehensive guide. Learn professional techniques to pack efficiently, safely, and stress-free for your upcoming move."
        primaryAction={{
          text: "Get Packing Supplies",
          onClick: () => console.log("Get supplies clicked")
        }}
        secondaryAction={{
          text: "Download Guide",
          onClick: () => console.log("Download guide clicked")
        }}
      />

      {/* Essential Packing Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Essential Packing Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these professional packing tips to ensure your belongings arrive safely and your move goes smoothly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packingTips.map((tip) => (
              <Card key={tip.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-primary-600 border-primary-600">
                      {tip.category}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    <tip.icon className="h-5 w-5 text-primary-600" />
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Room-by-Room Packing Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Room-by-Room Packing Guide
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detailed packing instructions for each room in your home to ensure nothing is overlooked.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {packingGuide.map((room, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary-600" />
                    {room.room}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Items to Pack:</h3>
                    <ul className="space-y-1">
                      {room.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary-600 flex-shrink-0" />
                          <span className="text-gray-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Pro Tip:</h3>
                    <p className="text-gray-600">{room.tips}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packing Materials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Essential Packing Materials
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stock up on these essential packing supplies to ensure your belongings are properly protected.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Moving Boxes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Various sizes for different items</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Bubble Wrap</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Protection for fragile items</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Box className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Packing Paper</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Wrapping and cushioning</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Packing Tape</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Secure boxes and packages</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Packing Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Packing Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow this timeline to ensure you're fully packed and ready for your move day.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">8</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">8 Weeks Before</h3>
                  <p className="text-gray-600">Start decluttering and organizing your home. Begin collecting packing supplies.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">6</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">6 Weeks Before</h3>
                  <p className="text-gray-600">Start packing non-essential items like books, decorations, and seasonal clothing.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">4 Weeks Before</h3>
                  <p className="text-gray-600">Pack kitchen items you don't use daily and start on bedrooms.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">2 Weeks Before</h3>
                  <p className="text-gray-600">Pack most remaining items, leaving only essentials for daily use.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">1 Week Before</h3>
                  <p className="text-gray-600">Pack essentials box and do final packing of remaining items.</p>
                </div>
              </div>
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
