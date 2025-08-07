"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Shield, Package, Truck, Home, CheckCircle, Star } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function MoveDayGuidePage() {
  const moveDaySteps = [
    {
      time: "6:00 AM",
      title: "Wake Up Early",
      description: "Start your day early to avoid rushing and ensure everything is ready for the movers.",
      icon: Clock,
      category: "Preparation"
    },
    {
      time: "7:00 AM",
      title: "Final Preparations",
      description: "Do a final walkthrough of your home, check all rooms, and ensure pathways are clear.",
      icon: Home,
      category: "Preparation"
    },
    {
      time: "8:00 AM",
      title: "Movers Arrive",
      description: "Greet the movers, show them around, and discuss any special handling requirements.",
      icon: Users,
      category: "Moving"
    },
    {
      time: "8:30 AM",
      title: "Loading Begins",
      description: "Supervise the loading process, answer questions, and ensure proper handling of items.",
      icon: Truck,
      category: "Moving"
    },
    {
      time: "12:00 PM",
      title: "Lunch Break",
      description: "Take a break for lunch while movers continue working. Keep essentials with you.",
      icon: Clock,
      category: "Break"
    },
    {
      time: "2:00 PM",
      title: "Final Inspection",
      description: "Do a final inspection of your old home before leaving. Take photos of empty rooms.",
      icon: Shield,
      category: "Inspection"
    },
    {
      time: "3:00 PM",
      title: "Travel to New Home",
      description: "Follow the movers to your new location. Keep your essentials box with you.",
      icon: Truck,
      category: "Travel"
    },
    {
      time: "4:00 PM",
      title: "Unloading Begins",
      description: "Supervise the unloading process and direct movers on item placement.",
      icon: Package,
      category: "Moving"
    },
    {
      time: "6:00 PM",
      title: "Move Complete",
      description: "Inspect all items, sign paperwork, and tip the movers if satisfied with service.",
      icon: CheckCircle,
      category: "Completion"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Move Day Guide"
        title="Complete Move Day Guide"
        description="Navigate your move day with confidence using our comprehensive guide. From early morning preparations to evening completion, we've got you covered."
        primaryAction={{
          text: "Download Guide",
          onClick: () => console.log("Download guide clicked")
        }}
        secondaryAction={{
          text: "Get Support",
          onClick: () => console.log("Get support clicked")
        }}
      />

      {/* Move Day Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Move Day Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow this detailed timeline to ensure your move day goes smoothly and efficiently.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {moveDaySteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge className="bg-primary-100 text-primary-600">
                        {step.time}
                      </Badge>
                      <Badge variant="outline" className="text-primary-600 border-primary-600">
                        {step.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What to Expect on Move Day
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding what to expect helps reduce stress and ensures a smooth moving experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Professional Team</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Experienced movers will arrive on time and work efficiently to complete your move.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Careful Handling</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All items will be handled with care and properly protected during transport.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Timely Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  The move will be completed within the estimated timeframe, weather permitting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Common Move Day Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to frequently asked questions about move day.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>What should I do if movers are late?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Contact your moving company immediately. Most companies provide real-time updates and will inform you of any delays.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Can I leave the movers alone while they work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  While you can step away briefly, it's best to stay present to answer questions and ensure proper handling of your items.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>What if something gets damaged during the move?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Document any damage immediately with photos and contact your moving company. Most companies have insurance coverage for such incidents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Should I tip the movers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tipping is appreciated but not required. A typical tip is £20-50 per mover depending on the complexity of the move.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Emergency Contacts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Keep these important contacts handy on your move day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Moving Company</h3>
                <p className="text-gray-600">Main contact number and emergency line</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Property Manager</h3>
                <p className="text-gray-600">Contact for old and new properties</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Utility Companies</h3>
                <p className="text-gray-600">Electric, gas, water, and internet providers</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Insurance Company</h3>
                <p className="text-gray-600">Home and moving insurance contacts</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Local Emergency</h3>
                <p className="text-gray-600">Police, fire, and medical emergency numbers</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Family/Friends</h3>
                <p className="text-gray-600">Trusted contacts for support and assistance</p>
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
