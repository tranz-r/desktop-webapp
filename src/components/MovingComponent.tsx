"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
              <Button className="bg-black hover:bg-black/90 text-white px-6 py-2 rounded-md font-medium">
                INSTANT PRICE <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <div>
                  <div className="font-bold">(212) 651 7273</div>
                  <div className="text-xs opacity-90">
                    7 days a week 7AM-9PM
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
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
                      <div className="font-bold">(212) 651 7273</div>
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
          <div className="bg-white rounded-lg p-6 lg:p-8 shadow-2xl mb-10">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Your Tranzr Moves starts with a{" "}
                <span className="text-primary">free quote</span>
              </h3>
              <p className="text-gray-600 text-sm">
                Fill out the form below for a quick flat price quote
              </p>
            </div>

            <div className="space-y-4">
              {/* Move Date and Type Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated move date: *
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={moveDate}
                      onChange={(e) => setMoveDate(e.target.value)}
                      className="w-full pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of move: *
                  </label>
                  <Select value={moveType} onValueChange={setMoveType}>
                    <SelectTrigger>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moving from address: *
                </label>
                <Input
                  type="text"
                  placeholder="Enter a location"
                  value={movingFrom}
                  onChange={(e) => setMovingFrom(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Moving To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moving to address: *
                </label>
                <Input
                  type="text"
                  placeholder="Enter a location"
                  value={movingTo}
                  onChange={(e) => setMovingTo(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 font-semibold flex-1">
                  GET QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  className="text-primary hover:bg-primary/10 px-6 py-3 font-semibold flex items-center justify-center border border-primary"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Or get a call from us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
