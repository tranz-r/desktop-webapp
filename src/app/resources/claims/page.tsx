"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, FileText, Clock, Users, CheckCircle, AlertTriangle, Phone } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function ClaimsPage() {
  const claimSteps = [
    {
      step: 1,
      title: "Document the Issue",
      description: "Take photos and videos of any damage immediately upon discovery.",
      icon: FileText,
      category: "Documentation"
    },
    {
      step: 2,
      title: "Contact Us",
      description: "Reach out to our claims department within 48 hours of the incident.",
      icon: Phone,
      category: "Contact"
    },
    {
      step: 3,
      title: "Submit Claim",
      description: "Fill out our claims form with all necessary details and documentation.",
      icon: FileText,
      category: "Submission"
    },
    {
      step: 4,
      title: "Investigation",
      description: "Our team will investigate the claim and assess the situation.",
      icon: Shield,
      category: "Review"
    },
    {
      step: 5,
      title: "Resolution",
      description: "We'll work with you to resolve the claim quickly and fairly.",
      icon: CheckCircle,
      category: "Resolution"
    }
  ];

  const claimTypes = [
    {
      type: "Damage to Items",
      description: "Physical damage to furniture, electronics, or other belongings",
      icon: AlertTriangle,
      timeframe: "48 hours"
    },
    {
      type: "Lost Items",
      description: "Items that cannot be located after the move",
      icon: FileText,
      timeframe: "7 days"
    },
    {
      type: "Delay Claims",
      description: "Compensation for significant delays in delivery",
      icon: Clock,
      timeframe: "24 hours"
    },
    {
      type: "Service Issues",
      description: "Problems with the quality of service provided",
      icon: Users,
      timeframe: "48 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Claims Process"
        title="Claims and Insurance"
        description="We understand that sometimes things don't go as planned. Our comprehensive claims process ensures you're protected and supported throughout your move."
        primaryAction={{
          text: "File a Claim",
          onClick: () => console.log("File claim clicked")
        }}
        secondaryAction={{
          text: "Contact Support",
          onClick: () => console.log("Contact support clicked")
        }}
      />

      {/* Claims Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Claims Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined claims process ensures quick resolution and fair compensation for any issues.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {claimSteps.map((step) => (
                <Card key={step.step} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary-600">{step.step}</span>
                      </div>
                      <Badge variant="outline" className="text-primary-600 border-primary-600">
                        {step.category}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <step.icon className="h-5 w-5 text-primary-600" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Types of Claims */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Types of Claims
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We handle various types of claims to ensure comprehensive coverage for your move.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {claimTypes.map((claim, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <claim.icon className="h-5 w-5 text-primary-600" />
                    {claim.type}
                  </CardTitle>
                  <CardDescription>
                    <Badge className="bg-primary-100 text-primary-600">
                      Report within {claim.timeframe}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{claim.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Insurance Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive insurance coverage to protect your belongings during the move.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Basic Coverage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Standard coverage included with all moves - £0.60 per pound per item.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Full Value Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive coverage for the full value of your items - additional cost applies.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Special Items Coverage</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Additional coverage for valuable items like antiques, artwork, and electronics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Important Information
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key information to help you understand the claims process and your rights.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary-600" />
                  Time Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Claims must be reported within the specified timeframes. Late claims may not be eligible for full compensation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-600" />
                  Documentation Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Photos, videos, receipts, and detailed descriptions are required for all claims. The more documentation you provide, the faster we can process your claim.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You have the right to fair treatment, timely communication, and reasonable compensation for legitimate claims.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Contact Claims Department
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get in touch with our claims department for assistance and support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">0800 123 4567</p>
                <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Email Claims</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">claims@tranzr.com</p>
                <p className="text-sm text-gray-500">24/7 support</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Online Form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Submit claims online</p>
                <p className="text-sm text-gray-500">Fast processing</p>
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
