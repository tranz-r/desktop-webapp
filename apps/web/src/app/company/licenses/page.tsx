"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Award, CheckCircle, FileText, Users, Star, Zap } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function LicensesPage() {
  const insuranceTypes = [
    {
      title: "Public Liability Insurance",
      coverage: "£5,000,000",
      description: "Comprehensive public liability coverage for all our operations",
      icon: Shield,
      category: "Liability"
    },
    {
      title: "Goods in Transit Insurance",
      coverage: "Full Value",
      description: "Complete coverage for your belongings during transport",
      icon: Shield,
      category: "Transit"
    },
    {
      title: "Employer's Liability Insurance",
      coverage: "£10,000,000",
      description: "Protection for our employees and contractors",
      icon: Users,
      category: "Employment"
    },
    {
      title: "Professional Indemnity Insurance",
      coverage: "£2,000,000",
      description: "Coverage for professional advice and services",
      icon: Award,
      category: "Professional"
    }
  ];

  const credentials = [
    {
      title: "British Association of Removers (BAR)",
      description: "Full member of the British Association of Removers with all required certifications",
      icon: Award,
      status: "Active Member"
    },
    {
      title: "ISO 9001:2015 Certification",
      description: "Quality management system certified to international standards",
      icon: CheckCircle,
      status: "Certified"
    },
    {
      title: "OHSAS 18001 Certification",
      description: "Occupational health and safety management system certification",
      icon: Shield,
      status: "Certified"
    },
    {
      title: "FTA Membership",
      description: "Member of the Freight Transport Association",
      icon: Star,
      status: "Active Member"
    }
  ];

  const licenses = [
    {
      title: "Operator's License",
      description: "Full operator's license for commercial vehicle operations",
      icon: FileText,
      number: "OL123456"
    },
    {
      title: "Transport Manager's License",
      description: "Qualified transport manager overseeing all operations",
      icon: Users,
      number: "TM789012"
    },
    {
      title: "Driver CPC",
      description: "All drivers hold Driver Certificate of Professional Competence",
      icon: CheckCircle,
      number: "CPC345678"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Insurance & Credentials"
        title="Insurance and Credentials"
        description="We maintain comprehensive insurance coverage and hold all necessary licenses and certifications to ensure your move is protected and compliant with all regulations."
        primaryAction={{
          text: "View Certificates",
          onClick: () => console.log("View certificates clicked")
        }}
        secondaryAction={{
          text: "Contact Us",
          onClick: () => console.log("Contact us clicked")
        }}
      />

      {/* Insurance Coverage */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Insurance Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive insurance coverage to protect you, your belongings, and our operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {insuranceTypes.map((insurance, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <insurance.icon className="h-5 w-5 text-primary-600" />
                      {insurance.title}
                    </CardTitle>
                    <Badge className="bg-primary-100 text-primary-600">
                      {insurance.category}
                    </Badge>
                  </div>
                  <CardDescription>
                    <span className="font-semibold text-primary-600">Coverage: {insurance.coverage}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{insurance.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Credentials
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We hold all necessary certifications and memberships to operate as a professional moving company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {credentials.map((credential, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <credential.icon className="h-5 w-5 text-primary-600" />
                      {credential.title}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-600">
                      {credential.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{credential.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Licenses and Permits
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              All necessary licenses and permits to operate legally and safely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {licenses.map((license, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <license.icon className="h-5 w-5 text-primary-600" />
                    {license.title}
                  </CardTitle>
                  <Badge variant="outline" className="text-primary-600 border-primary-600 w-fit">
                    {license.number}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{license.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Licensed Insured Movers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Licensed & Insured Movers?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Working with licensed and insured movers provides you with peace of mind and protection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Complete Protection</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive insurance coverage protects your belongings throughout the entire moving process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Legal Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All necessary licenses and permits ensure we operate legally and meet industry standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Professional Standards</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Industry certifications demonstrate our commitment to professional standards and quality service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Insurance Claims Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Insurance Claims Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined claims process ensures quick resolution if any issues arise.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary-600" />
                  Step 1: Report Incident
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Contact us immediately if you notice any damage or issues. We'll guide you through the reporting process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Step 2: Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We'll help you document the incident with photos, videos, and detailed descriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  Step 3: Claims Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our insurance team will process your claim quickly and work with you to resolve any issues.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary-600" />
                  Step 4: Resolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We'll work with you to ensure a fair and timely resolution to your claim.
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
        imageAlt="Licensed storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
