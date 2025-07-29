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
import VanIcon from "@/components/VanIconComponent";
import { Calendar, ArrowRight, Phone, Menu, X } from "lucide-react";

export default function MovingComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [moveDate, setMoveDate] = useState("");
  const [moveType, setMoveType] = useState("");
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <VanIcon
                width={200}
                height={32}
                className="text-white flex-shrink-0 w-48 h-10 sm:w-56 sm:h-12 md:w-64 md:h-14 lg:w-72 lg:h-16 xl:w-80 xl:h-18"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-medium border-b-2 border-white pb-1"
              >
                MOVING
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-medium"
              >
                STORAGE
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-medium"
              >
                SERVICES
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-medium"
              >
                RESOURCES
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-medium"
              >
                COMPANY
              </a>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="default" className="bg-secondary-400 hover:bg-secondary-500 text-white">
                INSTANT PRICE <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <div>
                  <div className="font-bold">+441604279880</div>
                  <div className="text-xs opacity-90">
                    7 days a week 7AM-9PM
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-400">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#"
                  className="text-white hover:text-primary-200 transition-colors font-medium border-b border-white pb-1"
                >
                  MOVING
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-200 transition-colors font-medium"
                >
                  STORAGE
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-200 transition-colors font-medium"
                >
                  MOVING LOCATIONS
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-200 transition-colors font-medium"
                >
                  SERVICES
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-200 transition-colors font-medium"
                >
                  RESOURCES
                </a>
                <a
                  href="#"
                  className="text-white hover:text-primary-200 transition-colors font-medium"
                >
                  COMPANY
                </a>
                <div className="pt-4 border-t border-primary-400">
                  <Button className="bg-black hover:bg-black/90 text-white px-6 py-2 rounded-md font-medium w-full mb-4">
                    INSTANT PRICE <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <div>
                      <div className="font-bold">+441604279880</div>
                      <div className="text-xs opacity-90">
                        7 days a week 7AM-9PM
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

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
                  <div className="relative">
                    <Input
                      id="moveDate"
                      type="date"
                      value={moveDate}
                      onChange={(e) => setMoveDate(e.target.value)}
                      className="w-full pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
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
                  className="w-full"
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
                  className="w-full"
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
    </div>
  );
}
