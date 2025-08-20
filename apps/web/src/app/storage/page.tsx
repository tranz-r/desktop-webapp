"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Clock, MapPin, Truck, Users, CheckCircle, Package, Building } from "lucide-react";
import StorageSection from "@/components/StorageSection";

export default function StoragePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Storage Solutions"
        title="Secure Storage Solutions in Northamptonshire"
        description="Flexible, secure, and affordable storage solutions for all your needs. From short-term to long-term storage, we've got you covered."
        primaryAction={{
          text: "Get Storage Quote",
          href: "/quote-option"
        }}
        secondaryAction={{
          text: "View Storage Units",
          onClick: () => console.log("View storage units clicked")
        }}
      />

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tranzr Storage?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our storage facilities are designed with security, convenience, and flexibility in mind. 
              We provide the perfect storage solution for every need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>24/7 Security</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  State-of-the-art security systems with CCTV monitoring, 
                  alarm systems, and secure access controls.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Flexible Access</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Access your storage unit 24/7 with secure key card entry 
                  and convenient location in Northamptonshire.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Professional Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Friendly, professional staff available to help with 
                  storage solutions and moving services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Storage Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Storage Solutions for Every Need
            </h2>
            <p className="text-lg text-gray-600">
              From small boxes to large furniture, we have the perfect storage solution for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Small Storage Units</CardTitle>
                <CardDescription>25-50 sq ft</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-4">£25-50/month</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Perfect for boxes and small items</li>
                  <li>• Ideal for seasonal storage</li>
                  <li>• Easy access</li>
                  <li>• Climate controlled</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary-500 text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Medium Storage Units</CardTitle>
                <CardDescription>75-150 sq ft</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-4">£75-150/month</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Great for furniture and appliances</li>
                  <li>• Perfect for home renovations</li>
                  <li>• 24/7 access</li>
                  <li>• Security monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Large Storage Units</CardTitle>
                <CardDescription>200-400 sq ft</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold text-primary-600 mb-4">£200-400/month</div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Full house contents</li>
                  <li>• Business storage</li>
                  <li>• Vehicle storage</li>
                  <li>• Loading dock access</li>
                </ul>
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
              Storage Services Included
            </h2>
            <p className="text-lg text-gray-600">
              We provide comprehensive storage services to make your experience seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Free Pickup & Delivery</h3>
                  <p className="text-gray-600">
                    We'll pick up your items from your location and deliver them to storage, 
                    then back when you need them.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Climate Control</h3>
                  <p className="text-gray-600">
                    Climate-controlled units available for sensitive items like electronics, 
                    artwork, and documents.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Inventory Management</h3>
                  <p className="text-gray-600">
                    Detailed inventory tracking and management system to keep 
                    track of your stored items.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Flexible Contracts</h3>
                  <p className="text-gray-600">
                    Month-to-month contracts with no long-term commitments. 
                    Pay only for what you need.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Insurance Coverage</h3>
                  <p className="text-gray-600">
                    Comprehensive insurance coverage for your stored items 
                    with flexible coverage options.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Online Management</h3>
                  <p className="text-gray-600">
                    Manage your storage account online, including payments, 
                    access scheduling, and inventory tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storage Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Storage Facility Features
            </h2>
            <p className="text-lg text-gray-600">
              Our state-of-the-art storage facility is designed for your convenience and security.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">24/7 Security</h3>
                <p className="text-gray-600 text-sm">CCTV monitoring and alarm systems</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">24/7 Access</h3>
                <p className="text-gray-600 text-sm">Access your unit anytime</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Central Location</h3>
                <p className="text-gray-600 text-sm">Easy access in Northamptonshire</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Loading Dock</h3>
                <p className="text-gray-600 text-sm">Convenient loading and unloading</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started with Storage?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free storage quote today. Our storage experts are ready to help you 
            find the perfect storage solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Get Storage Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Schedule Tour
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 