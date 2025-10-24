"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Contact Us"
        title="Get in Touch with Tranzr Moves"
        description="Ready to start your moving journey? Contact us today for a free quote or to discuss your moving needs."
        primaryAction={{
          text: "Get Free Quote",
          href: "/quote-option"
        }}
        secondaryAction={{
          text: "Call Us Now",
          onClick: () => console.log("Call us clicked")
        }}
      />

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-lg text-gray-600">
              We're here to help with all your moving and storage needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary-600 mb-2">+44 1604 279 880</p>
                <p className="text-gray-600">7 days a week • 9AM-5PM</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-primary-600 mb-2">info@tranzrmoves.com</p>
                <p className="text-gray-600">We'll respond within 24 hours</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">27 Elliot Close</p>
                <p className="text-gray-600 mb-2">Kettering, NN16 9XR</p>
                <p className="text-gray-600">United Kingdom</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="text-primary-600 border-primary-600">
                  Get in Touch
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-4 mb-4">
                  Send Us a Message
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  We're here to help with all your moving and storage needs.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-gray-600">Monday - Sunday: 9AM - 5PM</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold">Emergency Moves</p>
                    <p className="text-gray-600">Available 24/7 for urgent moves</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-gray-600">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  Tell us about your moving needs and we'll get back to you quickly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      First Name
                    </label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      Last Name
                    </label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Email
                  </label>
                  <Input type="email" placeholder="john@example.com" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Phone
                  </label>
                  <Input placeholder="+44 123 456 7890" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Service Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option>Select a service</option>
                    <option>Local Residential Moving</option>
                    <option>Commercial Moving</option>
                    <option>Long Distance Moving</option>
                    <option>Storage Services</option>
                    <option>Packing Services</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your moving needs, preferred dates, and any special requirements..."
                    rows={4}
                  />
                </div>
                
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Send Message <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Office Hours
            </h2>
            <p className="text-lg text-gray-600">
              We're available to help you with your moving needs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Monday - Friday</span>
                      <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Saturday</span>
                      <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Sunday</span>
                      <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-primary-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-primary-600 mb-2">Emergency Moves</h3>
                      <p className="text-sm text-gray-600">
                        Available 24/7 for urgent moves and last-minute relocations.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-600 mb-2">Response Time</h3>
                      <p className="text-sm text-gray-600">
                        We respond to all inquiries within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our services and contact process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">How quickly can you respond to inquiries?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours, and often much sooner. 
                  For urgent moves, we can respond within a few hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer free quotes?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we provide free, no-obligation quotes for all our moving and storage services. 
                  Contact us to get started.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">What areas do you serve?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We primarily serve Northamptonshire and surrounding areas, but we also offer 
                  long-distance moving services across the UK.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Can you handle last-minute moves?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer emergency and last-minute moving services. Contact us immediately 
                  and we'll do our best to accommodate your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Moving Journey?"
        description="Contact us today for a free quote or to discuss your moving needs. Our team is ready to help you move with confidence."
        secondaryButtonText="Call Us Now"
      />

      <Footer />
    </div>
  );
} 