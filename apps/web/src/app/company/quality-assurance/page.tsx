"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, CheckCircle, Award, Users, Star, Target, Zap } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function QualityAssurancePage() {
  const qualityStandards = [
    {
      title: "Professional Training",
      description: "All our movers undergo comprehensive training programs covering safety, customer service, and proper handling techniques.",
      icon: Users,
      category: "Training"
    },
    {
      title: "Quality Equipment",
      description: "We use only the highest quality moving equipment and materials to ensure your belongings are protected.",
      icon: Shield,
      category: "Equipment"
    },
    {
      title: "Safety Protocols",
      description: "Strict safety protocols are followed at every step of the moving process to protect both our team and your belongings.",
      icon: CheckCircle,
      category: "Safety"
    },
    {
      title: "Customer Satisfaction",
      description: "We measure our success by customer satisfaction and continuously improve our services based on feedback.",
      icon: Star,
      category: "Satisfaction"
    }
  ];

  const qualityProcess = [
    {
      step: 1,
      title: "Initial Assessment",
      description: "Thorough evaluation of your moving requirements and property layout",
      icon: Target
    },
    {
      step: 2,
      title: "Planning & Preparation",
      description: "Detailed planning and preparation using our proven methodologies",
      icon: CheckCircle
    },
    {
      step: 3,
      title: "Execution",
      description: "Professional execution with quality checks at every stage",
      icon: Zap
    },
    {
      step: 4,
      title: "Final Inspection",
      description: "Comprehensive final inspection to ensure everything meets our standards",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Quality Assurance"
        title="Our Quality Assurance Program"
        description="We maintain the highest standards of quality in every aspect of our moving services. From training to execution, quality is our top priority."
        primaryAction={{
          text: "Learn More",
          onClick: () => console.log("Learn more clicked")
        }}
        secondaryAction={{
          text: "Contact Us",
          onClick: () => console.log("Contact us clicked")
        }}
      />

      {/* Quality Standards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Quality Standards
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain rigorous quality standards across all aspects of our moving services to ensure your complete satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityStandards.map((standard, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <standard.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <CardTitle>{standard.title}</CardTitle>
                  <Badge variant="outline" className="text-primary-600 border-primary-600">
                    {standard.category}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{standard.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Quality Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures consistent quality across every move we handle.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualityProcess.map((process) => (
                <Card key={process.step} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary-600">{process.step}</span>
                      </div>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <process.icon className="h-5 w-5 text-primary-600" />
                      {process.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{process.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Metrics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quality Metrics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to quality is reflected in our performance metrics and customer satisfaction scores.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  98%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Customer Satisfaction Rate</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  99.9%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Damage-Free Moves</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  100%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">On-Time Delivery</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  15+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Years of Experience</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Quality Certifications
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We hold various certifications and accreditations that demonstrate our commitment to quality and safety.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-600" />
                  ISO 9001:2015 Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our quality management system is certified to ISO 9001:2015 standards, ensuring consistent quality across all our processes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  Health and Safety Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain OHSAS 18001 certification for occupational health and safety management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  British Association of Removers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Full member of the British Association of Removers (BAR) with all required certifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Continuous Improvement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Continuous Improvement
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We continuously strive to improve our services and maintain the highest quality standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Regular Training</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Ongoing training programs for all staff to ensure they stay updated with the latest techniques and safety protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Customer Feedback</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We actively seek and incorporate customer feedback to improve our services and processes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Process Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Regular review and optimization of our processes to ensure maximum efficiency and quality.
                </p>
              </CardContent>
            </Card>
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
        imageAlt="Quality assured storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
