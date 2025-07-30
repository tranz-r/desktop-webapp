"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import PromotionalSection from "@/components/PromotionalSection";

export default function MovingComponent() {
  const [moveDate, setMoveDate] = useState<Date>();
  const [moveType, setMoveType] = useState("");
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-gray-800 to-gray-900 flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
          style={{
            backgroundImage:
              "url('/images/truck_on_road.jpg?w=1920&q=80&h=1000')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Extensive Moving
              </h1>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                services
              </h2>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary leading-tight">
                Whatever you need to move from A to B, we'll move it safely
              </p>
            </div>
          </div>

          {/* Right Quote Form */}
          <Card className="bg-white rounded-lg shadow-2xl mb-10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Your Tranzr Moves starts with a{" "}
                <span className="text-primary">free quote</span>
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Fill out the form below for a quick flat price quote
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Move Date and Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="moveDate" className="text-foreground">
                    Estimated move date: *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !moveDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {moveDate ? format(moveDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={moveDate}
                        onSelect={setMoveDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="moveType" className="text-foreground">
                    Type of move: *
                  </Label>
                  <Select value={moveType} onValueChange={setMoveType}>
                    <SelectTrigger id="moveType">
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Move</SelectItem>
                      <SelectItem value="long-distance">
                        Long Distance
                      </SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="storage">Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Moving From */}
              <div className="space-y-2">
                <Label htmlFor="movingFrom" className="text-foreground">
                  Moving from address: *
                </Label>
                <Input
                  id="movingFrom"
                  type="text"
                  placeholder="Enter a location"
                  value={movingFrom}
                  onChange={(e) => setMovingFrom(e.target.value)}
                />
              </div>

              {/* Moving To */}
              <div className="space-y-2">
                <Label htmlFor="movingTo" className="text-foreground">
                  Moving to address: *
                </Label>
                <Input
                  id="movingTo"
                  type="text"
                  placeholder="Enter a location"
                  value={movingTo}
                  onChange={(e) => setMovingTo(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="flex-1" size="lg" variant="default">
                  GET QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="flex items-center justify-center bg-accent-400 hover:bg-accent-500 text-white"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Or get a call from us
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Promotional Section */}
      <PromotionalSection
        title="Put your feet up with our complete packing experience"
        highlightedText="complete packing"
        description="We can pack your whole home, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/best-movers.jpg"
        imageAlt="Professional movers packing furniture with care"
      />
    </div>
  );
}
