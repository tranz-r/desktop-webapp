"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle, Clock, Users, Shield, Package, Truck, Home } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function MoveDayChecklistPage() {
  const [checklistItems, setChecklistItems] = useState({
    beforeMove: {
      "Confirm move date and time": false,
      "Pack essentials box": false,
      "Charge phones and devices": false,
      "Have cash for tips": false,
      "Keep important documents handy": false,
      "Take photos of electronics connections": false,
      "Clear pathways for movers": false,
      "Have snacks and drinks ready": false
    },
    duringMove: {
      "Supervise loading process": false,
      "Check each room before leaving": false,
      "Take final photos of empty home": false,
      "Lock up and secure old home": false,
      "Follow movers to new location": false,
      "Keep essentials box with you": false
    },
    afterMove: {
      "Inspect items upon arrival": false,
      "Check utilities are working": false,
      "Unpack essentials first": false,
      "Update address with important services": false,
      "Register to vote at new address": false,
      "Explore new neighborhood": false
    }
  });

  const handleCheckboxChange = (category: string, item: string, checked: boolean) => {
    setChecklistItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [item]: checked
      }
    }));
  };

  const getProgress = (category: string) => {
    const items = checklistItems[category as keyof typeof checklistItems];
    const total = Object.keys(items).length;
    const completed = Object.values(items).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Move Day Checklist"
        title="Move Day Checklist"
        description="Stay organized and stress-free on your move day with our comprehensive checklist. Ensure nothing is forgotten and your move goes smoothly."
        primaryAction={{
          text: "Download Checklist",
          onClick: () => console.log("Download checklist clicked")
        }}
        secondaryAction={{
          text: "Print Checklist",
          onClick: () => console.log("Print checklist clicked")
        }}
      />

      {/* Interactive Checklist */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Interactive Move Day Checklist
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Use this interactive checklist to track your progress and ensure everything is completed on move day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Before Move */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary-600" />
                    Before Move
                  </CardTitle>
                  <Badge className="bg-primary-100 text-primary-600">
                    {getProgress('beforeMove')}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(checklistItems.beforeMove).map(([item, checked]) => (
                  <div key={item} className="flex items-center space-x-3">
                    <Checkbox
                      id={item}
                      checked={checked}
                      onCheckedChange={(isChecked) => 
                        handleCheckboxChange('beforeMove', item, isChecked as boolean)
                      }
                    />
                    <label 
                      htmlFor={item} 
                      className={`text-sm ${checked ? 'line-through text-gray-500' : 'text-gray-700'}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* During Move */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary-600" />
                    During Move
                  </CardTitle>
                  <Badge className="bg-primary-100 text-primary-600">
                    {getProgress('duringMove')}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(checklistItems.duringMove).map(([item, checked]) => (
                  <div key={item} className="flex items-center space-x-3">
                    <Checkbox
                      id={item}
                      checked={checked}
                      onCheckedChange={(isChecked) => 
                        handleCheckboxChange('duringMove', item, isChecked as boolean)
                      }
                    />
                    <label 
                      htmlFor={item} 
                      className={`text-sm ${checked ? 'line-through text-gray-500' : 'text-gray-700'}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* After Move */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary-600" />
                    After Move
                  </CardTitle>
                  <Badge className="bg-primary-100 text-primary-600">
                    {getProgress('afterMove')}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(checklistItems.afterMove).map(([item, checked]) => (
                  <div key={item} className="flex items-center space-x-3">
                    <Checkbox
                      id={item}
                      checked={checked}
                      onCheckedChange={(isChecked) => 
                        handleCheckboxChange('afterMove', item, isChecked as boolean)
                      }
                    />
                    <label 
                      htmlFor={item} 
                      className={`text-sm ${checked ? 'line-through text-gray-500' : 'text-gray-700'}`}
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Essential Items */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Essential Items to Keep With You
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Pack these essential items in a separate box that stays with you during the move.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Important Documents</h3>
                <p className="text-gray-600">Passports, IDs, medical records, insurance documents</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Medications</h3>
                <p className="text-gray-600">Prescription medications and first aid supplies</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Electronics</h3>
                <p className="text-gray-600">Phones, chargers, laptops, and important devices</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Clothing</h3>
                <p className="text-gray-600">Change of clothes for the next few days</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Toiletries</h3>
                <p className="text-gray-600">Toothbrush, toothpaste, soap, and personal items</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-primary-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Snacks & Drinks</h3>
                <p className="text-gray-600">Water, snacks, and any special dietary needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Move Day Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Move Day Tips
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow these tips to ensure your move day goes smoothly and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Start Early</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Begin your day early to avoid rushing and ensure everything is ready for the movers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Stay Organized</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Keep your checklist handy and check off items as you complete them.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Supervise Loading</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Be present during loading to answer questions and ensure proper handling.
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
        imageAlt="Storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
