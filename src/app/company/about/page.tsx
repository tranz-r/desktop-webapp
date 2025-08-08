"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Award, Clock, Shield, Heart, Star, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="About Tranzr Moves"
        title="Your Trusted Moving Partner in Northamptonshire"
        description="With over 15 years of experience, we've been helping families and businesses move with confidence, care, and professionalism across the UK."
        primaryAction={{
          text: "Get Free Quote",
          onClick: () => console.log("Get quote clicked")
        }}
        secondaryAction={{
          text: "Our Story",
          onClick: () => console.log("Our story clicked")
        }}
      />

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary-600 border-primary-600">
                Our Story
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Building Trust Through Excellence Since 2008
              </h2>
              <p className="text-lg text-gray-600">
                Founded in 2008, Tranzr Moves began with a simple mission: to provide 
                exceptional moving services that put our customers first. What started as 
                a small local moving company has grown into one of Northamptonshire's 
                most trusted moving and storage providers.
              </p>
              <p className="text-lg text-gray-600">
                Over the years, we've moved thousands of families and businesses, 
                building lasting relationships and earning a reputation for reliability, 
                professionalism, and care. Our commitment to excellence has never wavered, 
                and we continue to invest in our team, equipment, and processes to ensure 
                the best possible experience for our customers.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">15+</div>
                    <div className="text-gray-600">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">10,000+</div>
                    <div className="text-gray-600">Moves Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">50+</div>
                    <div className="text-gray-600">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">4.9★</div>
                    <div className="text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These values guide everything we do and shape the way we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Customer First</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Every decision we make is guided by what's best for our customers. 
                  Your satisfaction is our top priority.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Reliability</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We understand that moving is a significant life event. That's why we 
                  commit to being there when we say we will be.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Excellence</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We strive for excellence in everything we do, from customer service 
                  to the care we take with your belongings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Teamwork</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Our success is built on the strength of our team. We work together 
                  to deliver exceptional service to every customer.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We value your time and work efficiently to complete moves quickly 
                  while maintaining the highest standards of care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We continuously improve our processes and embrace new technologies 
                  to better serve our customers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our experienced team of professionals is dedicated to making your move 
              as smooth and stress-free as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Professional Movers</h3>
                <p className="text-gray-600">
                  Our trained and experienced movers handle your belongings with care 
                  and attention to detail.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Customer Service</h3>
                <p className="text-gray-600">
                  Our customer service team is here to answer your questions and 
                  ensure your move goes smoothly.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-12 w-12 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Management Team</h3>
                <p className="text-gray-600">
                  Our experienced management team oversees every aspect of your move 
                  to ensure quality and reliability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Tranzr Moves?
            </h2>
            <p className="text-lg text-gray-600">
              We're not just another moving company. Here's what sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Local Expertise</h3>
                  <p className="text-gray-600">
                    Deep knowledge of Northamptonshire and surrounding areas, 
                    ensuring efficient and reliable service.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fully Insured</h3>
                  <p className="text-gray-600">
                    Comprehensive insurance coverage for your peace of mind 
                    throughout the entire moving process.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">
                    No hidden fees or surprises. Clear, upfront pricing 
                    for all our services.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Experienced Team</h3>
                  <p className="text-gray-600">
                    Our team has years of experience in moving and storage, 
                    ensuring professional and reliable service.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Modern Equipment</h3>
                  <p className="text-gray-600">
                    State-of-the-art moving equipment and vehicles to ensure 
                    safe and efficient moves.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
                  <p className="text-gray-600">
                    High customer satisfaction rates and positive reviews 
                    from thousands of happy customers.
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
            Ready to Experience the Tranzr Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have chosen Tranzr Moves 
            for their moving and storage needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/inventory">
              <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 