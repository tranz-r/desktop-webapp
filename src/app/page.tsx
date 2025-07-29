"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CostCalculator from "@/components/CostCalculator";
import ServiceCategories from "@/components/ServiceCategories";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Star,
  Truck,
  Package,
  Home,
  Calendar,
  Shield,
  Phone,
  Menu,
  X,
} from "lucide-react";

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [movingFrom, setMovingFrom] = useState("");
  const [movingTo, setMovingTo] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-primary-500" />
              </div>
              <div className="text-lg lg:text-xl font-bold">
                <span className="block leading-tight">TRANZR</span>
                <span className="block leading-tight text-sm lg:text-base">
                  MOVES
                </span>
                <span className="block leading-tight text-xs opacity-90">
                  MOVING & STORAGE
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="#"
                className="hover:text-primary-200 transition-colors font-medium"
              >
                MOVING
              </Link>
              <Link
                href="#"
                className="hover:text-primary-200 transition-colors font-medium"
              >
                STORAGE
              </Link>
              <Link
                href="#"
                className="hover:text-primary-200 transition-colors font-medium"
              >
                MOVING LOCATIONS
              </Link>
              <Link
                href="#"
                className="hover:text-primary-200 transition-colors font-medium"
              >
                SERVICES
              </Link>
              <Link
                href="#"
                className="hover:text-primary-200 transition-colors font-medium"
              >
                RESOURCES
              </Link>
              <Link
                href="#"
                className="hover:text-primary-200 transition-colors font-medium"
              >
                COMPANY
              </Link>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-2 rounded-md font-medium">
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
                <Link
                  href="#"
                  className="hover:text-primary-200 transition-colors font-medium"
                >
                  MOVING
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary-200 transition-colors font-medium"
                >
                  STORAGE
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary-200 transition-colors font-medium"
                >
                  MOVING LOCATIONS
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary-200 transition-colors font-medium"
                >
                  SERVICES
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary-200 transition-colors font-medium"
                >
                  RESOURCES
                </Link>
                <Link
                  href="#"
                  className="hover:text-primary-200 transition-colors font-medium"
                >
                  COMPANY
                </Link>
                <div className="pt-4 border-t border-primary-400">
                  <Button className="bg-accent-600 hover:bg-accent-700 text-white px-6 py-2 rounded-md font-medium w-full mb-4">
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
      <section className="relative w-full min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-primary-500 to-primary-600 flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              The best movers in Northamptonshire and the UK with the best
              reviews.
            </h1>
            <div className="space-y-2">
              <p className="text-lg lg:text-xl opacity-90">
                Affordable moving & storage services.
              </p>
              <p className="text-lg lg:text-xl opacity-90">
                Guaranteed all-inclusive quote within minutes.
              </p>
            </div>

            {/* Quote Form */}
            <div className="space-y-4 max-w-md">
              <Input
                type="text"
                placeholder="Moving from address"
                value={movingFrom}
                onChange={(e) => setMovingFrom(e.target.value)}
                className="bg-white text-gray-900 placeholder-gray-500 border-0 h-12 text-base"
              />
              <Input
                type="text"
                placeholder="Moving to address"
                value={movingTo}
                onChange={(e) => setMovingTo(e.target.value)}
                className="bg-white text-gray-900 placeholder-gray-500 border-0 h-12 text-base"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-accent-600 hover:bg-accent-700 text-white px-8 py-3 h-12 text-base font-semibold flex-1">
                  GET QUOTE <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 px-6 py-3 h-12 text-base font-semibold flex items-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Or get a call from us
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <img
              src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80"
              alt="Happy couple with moving boxes"
              className="w-full h-[300px] lg:h-[500px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Complete Moving Services */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Keep moving forward with our
            </h2>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              complete moving services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whatever you need to move from point A to B, we will get it there
              safely.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 24/7/365 Moving */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                24/7/365 Moving
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                The only moving company in NYC that offers any day and time
                moving services. No matter how big or small your move is we will
                move it.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Local Residential Moving */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Home className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Local Residential Moving Services
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We specialize in local residential NYC and New York State moves.
                We can move you across all of New York City's Five Boroughs and
                surrounding Tri-State locations.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Long Distance Moving */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-8 h-8 text-secondary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Long Distance Moving Services
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                From NYC to Miami, California and Seattle we can move you to any
                state in the USA. With on time long distance delivery dates and
                safe packing we will get you settled into your new home quickly.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Office and Commercial Moves */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Office and Commercial Moves
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We can move your office overnight, on the weekend and during
                holidays to minimize your downtime. With full office packing and
                unpacking our staff will be up and running the next morning.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Small Moves */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Small Moves
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Need to move a few small items or moving out of a studio with
                minimal furniture? Do not lift a finger with our small move
                service.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Last Minute Moves */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Last Minute Moves
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Need to move urgently, our last minute moving service will help
                you the day you get you into your new address asap! We also
                offer emergency packing and storage services.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flat Fee Pricing Section */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-accent-600">flat fee</span> pricing
                means no hidden surprises, ever.
              </h2>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
                alt="Moving team with truck"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Complete Packing Experience Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Put your feet up with our{" "}
                <span className="text-secondary-600">complete packing</span>{" "}
                experience
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We can pack your whole home, a few boxes or your most valuable
                items. Our packing methods and the high-quality packing
                materials we use are matched specifically to each of your items.
              </p>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=600&q=80"
                alt="Professional movers packing items"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Packing Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Full Packing */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Full Packing
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We remove the hassle of packing up all of your valuable items
                safely. You can decide what you want us to pack, there is no
                minimum limit to our packing service. You can use us to pack
                just your kitchen or your entire house.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Platinum Packing */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Platinum Packing
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We will not only pack up all of your items, we will unpack all
                of your belongings into your new address. You just tell us what
                and where you want everything placed.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Plastic Bin Hire */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Plastic Bin Hire
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Our eco friendly plastic moving bins are delivered to your door
                with no assembly required. Once you're done we will pick them up
                and sanitize them so that they can be used again.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Box and Material Delivery */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Box and Material Delivery
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                We have made it easy by bundling important moving supplies into
                packages that suit your lifestyle. Delivered to your door before
                you move date.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Valuable Item Packing */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Valuable Item Packing
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Your valuable furniture pieces, antiques and artwork will be
                safely handled with the utmost care. We will build custom crates
                for your items, wrap them with durable packing material and
                ensure the appropriate lifting resources.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>

            {/* Pianos */}
            <div className="text-left">
              <div className="mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-accent-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pianos</h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                It takes specialized skills, equipment and training to move a
                piano safely, especially in NYC. We have experience moving
                upright, horizontal and all piano styles in between.
              </p>
              <button className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center">
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
