"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Calculator, MapPin, Package, Truck, Users, CheckCircle, DollarSign } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function CostCalculatorPage() {
  const [formData, setFormData] = useState({
    moveType: '',
    distance: '',
    rooms: '',
    additionalServices: {
      packing: false,
      furniture: false,
      storage: false,
      cleaning: false
    }
  });

  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const calculateCost = () => {
    let baseCost = 0;
    
    // Base cost by move type
    switch (formData.moveType) {
      case 'local':
        baseCost = 300;
        break;
      case 'long-distance':
        baseCost = 800;
        break;
      case 'international':
        baseCost = 1500;
        break;
      default:
        baseCost = 300;
    }

    // Add cost per room
    const roomCost = parseInt(formData.rooms) * 100;
    baseCost += roomCost;

    // Add distance cost for long-distance moves
    if (formData.moveType === 'long-distance' && formData.distance) {
      const distanceCost = parseInt(formData.distance) * 2;
      baseCost += distanceCost;
    }

    // Add costs for additional services
    if (formData.additionalServices.packing) baseCost += baseCost * 0.3; // 30% of base cost
    if (formData.additionalServices.furniture) baseCost += 200;
    if (formData.additionalServices.storage) baseCost += 150;
    if (formData.additionalServices.cleaning) baseCost += 250;

    setEstimatedCost(baseCost);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Cost Calculator"
        title="Moving Cost Calculator"
        description="Get an instant estimate for your move. Our cost calculator helps you plan your budget with accurate pricing for all types of moves."
        primaryAction={{
          text: "Calculate Now",
          onClick: () => console.log("Calculate clicked")
        }}
        secondaryAction={{
          text: "Get Free Quote",
          href: "/quote-option"
        }}
      />

      {/* Cost Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Calculate Your Moving Costs
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get an instant estimate for your move. Fill out the form below to receive a detailed cost breakdown.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-primary-600" />
                    Moving Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="moveType">Move Type</Label>
                    <Select value={formData.moveType} onValueChange={(value) => setFormData({...formData, moveType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select move type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local Move</SelectItem>
                        <SelectItem value="long-distance">Long Distance Move</SelectItem>
                        <SelectItem value="international">International Move</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rooms">Number of Rooms</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 3"
                      value={formData.rooms}
                      onChange={(e) => setFormData({...formData, rooms: e.target.value})}
                    />
                  </div>

                  {formData.moveType === 'long-distance' && (
                    <div className="space-y-2">
                      <Label htmlFor="distance">Distance (miles)</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 500"
                        value={formData.distance}
                        onChange={(e) => setFormData({...formData, distance: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="space-y-4">
                    <Label>Additional Services</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="packing"
                          checked={formData.additionalServices.packing}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              additionalServices: {
                                ...formData.additionalServices,
                                packing: checked as boolean
                              }
                            })
                          }
                        />
                        <Label htmlFor="packing">Packing Services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="furniture"
                          checked={formData.additionalServices.furniture}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              additionalServices: {
                                ...formData.additionalServices,
                                furniture: checked as boolean
                              }
                            })
                          }
                        />
                        <Label htmlFor="furniture">Furniture Assembly</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="storage"
                          checked={formData.additionalServices.storage}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              additionalServices: {
                                ...formData.additionalServices,
                                storage: checked as boolean
                              }
                            })
                          }
                        />
                        <Label htmlFor="storage">Storage Services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cleaning"
                          checked={formData.additionalServices.cleaning}
                          onCheckedChange={(checked) => 
                            setFormData({
                              ...formData, 
                              additionalServices: {
                                ...formData.additionalServices,
                                cleaning: checked as boolean
                              }
                            })
                          }
                        />
                        <Label htmlFor="cleaning">Cleaning Services</Label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={calculateCost}
                    className="w-full bg-primary-600 hover:bg-primary-700"
                  >
                    Calculate Cost <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Cost Display */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary-600" />
                    Estimated Cost
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {estimatedCost ? (
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-primary-600">
                        £{estimatedCost.toLocaleString()}
                      </div>
                      <p className="text-gray-600">
                        This is an estimated cost based on the information provided. 
                        For a precise quote, please contact us.
                      </p>
                      <Button className="w-full bg-secondary-400 hover:bg-secondary-500">
                        Get Detailed Quote
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="text-4xl font-bold text-gray-300">
                        £0
                      </div>
                      <p className="text-gray-600">
                        Fill out the form and click "Calculate Cost" to get your estimate.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Our Calculator */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Use Our Cost Calculator?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get accurate estimates and plan your move with confidence using our comprehensive cost calculator.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Accurate Estimates</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Get precise cost estimates based on your specific moving requirements and location.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Transparent Pricing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  No hidden fees or surprises. Our calculator shows you exactly what's included.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Expert Guidance</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Get personalized recommendations and expert advice for your specific move.
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
