"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Shield, Award, Star, CheckCircle, Truck, Heart } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function MoversPage() {
  const teamStats = [
    {
      number: "100+",
      label: "Professional Movers",
      icon: Users,
      description: "Experienced and trained moving professionals"
    },
    {
      number: "5+",
      label: "Years Average Experience",
      icon: Award,
      description: "Each mover has an average of 5+ years experience"
    },
    {
      number: "98%",
      label: "Customer Satisfaction",
      icon: Star,
      description: "Consistently high customer satisfaction ratings"
    },
    {
      number: "24/7",
      label: "Availability",
      icon: CheckCircle,
      description: "Round-the-clock moving services available"
    }
  ];

  const moverProfiles = [
    {
      name: "John Smith",
      role: "Senior Moving Specialist",
      experience: "8 years",
      specialties: ["Fragile Items", "Piano Moving", "Commercial Moves"],
      image: "/images/mover-1.jpg",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Team Leader",
      experience: "6 years",
      specialties: ["Residential Moves", "Packing Services", "Long Distance"],
      image: "/images/mover-2.jpg",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Moving Coordinator",
      experience: "7 years",
      specialties: ["International Moves", "Storage Solutions", "Furniture Assembly"],
      image: "/images/mover-3.jpg",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Quality Assurance Specialist",
      experience: "5 years",
      specialties: ["Quality Control", "Customer Service", "Training"],
      image: "/images/mover-4.jpg",
      rating: 5
    }
  ];

  const trainingPrograms = [
    {
      title: "Safety Training",
      description: "Comprehensive safety protocols and procedures training",
      icon: Shield,
      duration: "40 hours"
    },
    {
      title: "Customer Service",
      description: "Professional customer service and communication skills",
      icon: Heart,
      duration: "20 hours"
    },
    {
      title: "Equipment Operation",
      description: "Training on all moving equipment and tools",
      icon: Truck,
      duration: "30 hours"
    },
    {
      title: "Specialized Moving",
      description: "Training for fragile items, pianos, and valuable objects",
      icon: Award,
      duration: "25 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Our Movers"
        title="Meet Our Professional Moving Team"
        description="Our team of 100+ experienced and trained movers are the backbone of our success. Each member is carefully selected, thoroughly trained, and committed to providing exceptional service."
        primaryAction={{
          text: "Meet the Team",
          onClick: () => console.log("Meet team clicked")
        }}
        secondaryAction={{
          text: "Join Our Team",
          onClick: () => console.log("Join team clicked")
        }}
      />

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Team in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of professionals is committed to delivering exceptional moving services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
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

      {/* Meet Our Movers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Movers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get to know some of our key team members who make your moves successful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {moverProfiles.map((mover, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {Array.from({ length: mover.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <Badge className="bg-primary-100 text-primary-600">
                      {mover.experience}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{mover.name}</CardTitle>
                  <CardDescription>{mover.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-900">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {mover.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Training Programs
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our movers undergo comprehensive training programs to ensure they meet our high standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainingPrograms.map((program, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <program.icon className="h-5 w-5 text-primary-600" />
                    {program.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-primary-600 border-primary-600 w-fit">
                    {program.duration}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Movers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Movers?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team of professional movers sets us apart from the competition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Experienced Professionals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Each mover has years of experience and specialized training in their area of expertise.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All our movers are trained in safety protocols and use proper equipment to protect your belongings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Customer Focused</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Our movers are trained to provide excellent customer service and ensure your complete satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Team Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The core values that guide our team in everything we do.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Professionalism
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain the highest standards of professionalism in all our interactions and services.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Safety is our top priority - for our team, our customers, and your belongings.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary-600" />
                  Customer Care
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We treat every customer with care and respect, ensuring their complete satisfaction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-600" />
                  Excellence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our work, from planning to execution.
                </p>
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
        imageAlt="Professional movers storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
