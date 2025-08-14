"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, DollarSign, Home, Truck } from "lucide-react";

interface CostCalculatorProps {
  onProceedToBooking?: () => void;
}

const CostCalculator = ({
  onProceedToBooking = () => {},
}: CostCalculatorProps) => {
  const [homeSize, setHomeSize] = useState<string>("1-bedroom");
  const [distance, setDistance] = useState<number>(10);
  const [additionalServices, setAdditionalServices] = useState<{
    packing: boolean;
    furniture: boolean;
    storage: boolean;
    cleaning: boolean;
  }>({
    packing: false,
    furniture: false,
    storage: false,
    cleaning: false,
  });

  // Calculate estimated cost based on selections
  const calculateCost = () => {
    // Base costs by home size
    const baseCosts = {
      studio: 300,
      "1-bedroom": 500,
      "2-bedroom": 800,
      "3-bedroom": 1200,
      "4-bedroom": 1600,
      "5-bedroom": 2000,
    };

    // Get base cost from home size
    const baseCost = baseCosts[homeSize as keyof typeof baseCosts] || 500;

    // Add distance cost ($10 per mile after first 10 miles)
    const distanceCost = distance > 10 ? (distance - 10) * 10 : 0;

    // Add costs for additional services
    let additionalCost = 0;
    if (additionalServices.packing) additionalCost += baseCost * 0.3; // 30% of base cost
    if (additionalServices.furniture) additionalCost += 200;
    if (additionalServices.storage) additionalCost += 150;
    if (additionalServices.cleaning) additionalCost += 250;

    return baseCost + distanceCost + additionalCost;
  };

  const estimatedCost = calculateCost();

  const handleAdditionalServiceChange = (
    service: keyof typeof additionalServices,
  ) => {
    setAdditionalServices({
      ...additionalServices,
      [service]: !additionalServices[service],
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg rounded-xl border-0">
      <CardHeader className="bg-accent-100 rounded-t-xl">
        <CardTitle className="text-2xl flex items-center gap-2">
          <DollarSign className="h-6 w-6" /> Moving Cost Calculator
        </CardTitle>
        <CardDescription>
          Get an estimate for your move based on your specific needs
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="home-size" className="text-base font-medium">
              Home Size
            </Label>
            <Select value={homeSize} onValueChange={setHomeSize}>
              <SelectTrigger id="home-size" className="mt-1">
                <SelectValue placeholder="Select home size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1-bedroom">1 Bedroom</SelectItem>
                <SelectItem value="2-bedroom">2 Bedrooms</SelectItem>
                <SelectItem value="3-bedroom">3 Bedrooms</SelectItem>
                <SelectItem value="4-bedroom">4 Bedrooms</SelectItem>
                <SelectItem value="5-bedroom">5+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="distance" className="text-base font-medium">
              Moving Distance: {distance} miles
            </Label>
            <div className="flex items-center gap-4 mt-1">
              <Slider
                id="distance"
                min={1}
                max={100}
                step={1}
                value={[distance]}
                onValueChange={(value: number[]) => setDistance(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-20"
                min={1}
                max={100}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Additional Services</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="packing"
                  checked={additionalServices.packing}
                  onCheckedChange={() =>
                    handleAdditionalServiceChange("packing")
                  }
                />
                <Label htmlFor="packing" className="cursor-pointer">
                  Professional Packing
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="furniture"
                  checked={additionalServices.furniture}
                  onCheckedChange={() =>
                    handleAdditionalServiceChange("furniture")
                  }
                />
                <Label htmlFor="furniture" className="cursor-pointer">
                  Furniture Assembly/Disassembly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="storage"
                  checked={additionalServices.storage}
                  onCheckedChange={() =>
                    handleAdditionalServiceChange("storage")
                  }
                />
                <Label htmlFor="storage" className="cursor-pointer">
                  Temporary Storage
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cleaning"
                  checked={additionalServices.cleaning}
                  onCheckedChange={() =>
                    handleAdditionalServiceChange("cleaning")
                  }
                />
                <Label htmlFor="cleaning" className="cursor-pointer">
                  Move-out Cleaning
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary-100 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">Estimated Cost</h3>
              <p className="text-muted-foreground text-sm">
                Based on your selections
              </p>
            </div>
            <div className="text-3xl font-bold text-primary">
              ${estimatedCost.toLocaleString()}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end bg-accent-50 rounded-b-xl">
        <Button onClick={onProceedToBooking} className="gap-2">
          Proceed to Booking <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CostCalculator;
