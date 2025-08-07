"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Star, Award, Truck, CheckCircle, MapPin } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function ExperiencePage() {
  const experienceStats = [
    {
      number: "15+",
      label: "Years of Experience",
      icon: Clock,
      description: "Over 15 years of professional moving experience"
    },
    {
      number: "50,000+",
      label: "Successful Moves",
      icon: CheckCircle,
      description: "More than 50,000 successful moves completed"
    },
    {
      number: "100+",
      label: "Professional Movers",
      icon: Users,
      description: "Team of over 100 trained professionals"
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      icon: Star,
      description: "98% customer satisfaction rate"
    }
  ];

  const experienceTimeline = [
    {
      year: "2009",
      title: "Company Founded",
      description: "Tranzr was established with a vision to provide exceptional moving services",
      icon: Award
    },
    {
      year: "2012",
      title: "First 1000 Moves",
      description: "Reached our first milestone of 1000 successful moves",
      icon: CheckCircle
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Expanded services to cover the entire UK with a fleet of modern vehicles",
      icon: Truck
    },
    {
      year: "2018",
      title: "Technology Integration",
      description: "Implemented advanced technology for better customer experience",
      icon: Star
    },
    {
      year: "2021",
      title: "Industry Recognition",
      description: "Received multiple industry awards for excellence in service",
      icon: Award
    },
    {
      year: "2024",
      title: "Market Leader",
      description: "Established as one of the leading moving companies in the UK",
      icon: Star
    }
  ];

  const serviceAreas = [
    {
      area: "London",
      description: "Full moving services across Greater London and surrounding areas",
      icon: MapPin
    },
    {
      area: "Manchester",
      description: "Comprehensive moving solutions in Manchester and North West",
      icon: MapPin
    },
    {
      area: "Birmingham",
      description: "Professional moving services in Birmingham and Midlands",
      icon: MapPin
    },
    {
      area: "Leeds",
      description: "Reliable moving services in Leeds and Yorkshire",
      icon: MapPin
    },
    {
      area: "Liverpool",
      description: "Expert moving solutions in Liverpool and Merseyside",
      icon: MapPin
    },
    {
      area: "Nationwide",
      description: "Long-distance and international moving services",
      icon: MapPin
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Our Experience"
        title="15+ Years of Moving Excellence"
        description="With over 15 years of experience and more than 50,000 successful moves, we've built a reputation for reliability, professionalism, and customer satisfaction."
        primaryAction={{
          text: "Learn More",
          onClick: () => console.log("Learn more clicked")
        }}
        secondaryAction={{
          text: "Get Quote",
          onClick: () => console.log("Get quote clicked")
        }}
      />

      {/* Experience Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Experience in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself - years of experience, thousands of satisfied customers, and countless successful moves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experienceStats.map((stat, index) => (
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

      {/* Experience Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming one of the UK's leading moving companies.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experienceTimeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <Badge className="bg-primary-100 text-primary-600">
                        {item.year}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Service Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive moving services across the UK, with extensive experience in all major cities and regions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <area.icon className="h-5 w-5 text-primary-600" />
                    {area.area}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{area.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Experience */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Experience?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our years of experience translate into better service, more efficient processes, and greater peace of mind for our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Expert Team</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Our team has seen it all - from simple moves to complex relocations, we have the expertise to handle any situation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Proven Processes</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Years of experience have helped us develop efficient, reliable processes that ensure smooth moves every time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Customer Trust</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Our long history of satisfied customers speaks to our reliability and commitment to excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers about their experience with Tranzr.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <CardTitle>Excellent Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "Tranzr's experience really showed during our move. They handled everything professionally and efficiently."
                </p>
                <p className="text-sm text-gray-500 mt-2">- Sarah M., London</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <CardTitle>Professional Team</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "The team's experience was evident in how smoothly they handled our complex move. Highly recommend!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Michael T., Manchester</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <CardTitle>Reliable Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "After 15+ years in business, you can trust Tranzr to deliver. They know what they're doing!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Emma L., Birmingham</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <GuaranteeComponent />
      <StorageSection
        title="Need storage for your move? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
        imageAlt="Storage service for experienced movers"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
