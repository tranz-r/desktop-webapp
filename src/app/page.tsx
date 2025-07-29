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
      <header className="bg-gradient-to-r from-pink-500 to-pink-600 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 lg:w-6 lg:h-6 text-pink-500" />
              </div>
              <div className="text-lg lg:text-xl font-bold">
                <span className="block leading-tight">PIECE</span>
                <span className="block leading-tight text-sm lg:text-base">
                  OF CAKE
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
                className="hover:text-pink-200 transition-colors font-medium"
              >
                MOVING
              </Link>
              <Link
                href="#"
                className="hover:text-pink-200 transition-colors font-medium"
              >
                STORAGE
              </Link>
              <Link
                href="#"
                className="hover:text-pink-200 transition-colors font-medium"
              >
                MOVING LOCATIONS
              </Link>
              <Link
                href="#"
                className="hover:text-pink-200 transition-colors font-medium"
              >
                SERVICES
              </Link>
              <Link
                href="#"
                className="hover:text-pink-200 transition-colors font-medium"
              >
                RESOURCES
              </Link>
              <Link
                href="#"
                className="hover:text-pink-200 transition-colors font-medium"
              >
                COMPANY
              </Link>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-md font-medium">
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
            <div className="lg:hidden py-4 border-t border-pink-400">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="#"
                  className="hover:text-pink-200 transition-colors font-medium"
                >
                  MOVING
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-200 transition-colors font-medium"
                >
                  STORAGE
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-200 transition-colors font-medium"
                >
                  MOVING LOCATIONS
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-200 transition-colors font-medium"
                >
                  SERVICES
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-200 transition-colors font-medium"
                >
                  RESOURCES
                </Link>
                <Link
                  href="#"
                  className="hover:text-pink-200 transition-colors font-medium"
                >
                  COMPANY
                </Link>
                <div className="pt-4 border-t border-pink-400">
                  <Button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-md font-medium w-full mb-4">
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
      <section className="relative w-full min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-pink-500 to-pink-600 flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              The best movers in NYC with the best reviews.
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
                <Button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 h-12 text-base font-semibold flex-1">
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

      {/* Service Categories */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Our Moving Services
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm lg:text-base">
              We offer a comprehensive range of moving services tailored to meet
              your specific needs
            </p>
          </div>
          <ServiceCategories />
        </div>
      </section>

      {/* Cost Calculator */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Calculate Your Moving Cost
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm lg:text-base">
              Get an instant estimate for your move with our easy-to-use
              calculator
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <CostCalculator />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm lg:text-base">
              We're committed to providing exceptional moving services with care
              and professionalism
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="border-none shadow-md">
              <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Truck className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Professional Team
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Our experienced movers handle your belongings with care and
                  expertise
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Package className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Careful Handling
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  We treat your possessions as if they were our own, ensuring
                  safe transport
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Flexible Scheduling
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  We work around your timeline to make your move as convenient
                  as possible
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-4 lg:p-6 flex flex-col items-center text-center">
                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-pink-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">
                  Fully Insured
                </h3>
                <p className="text-muted-foreground text-sm lg:text-base">
                  Your belongings are protected throughout the entire moving
                  process
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm lg:text-base">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>
          <Carousel className="max-w-5xl mx-auto">
            <CarouselContent>
              {[
                {
                  name: "Sarah Johnson",
                  location: "New York, NY",
                  testimonial:
                    "The team was professional, efficient, and took great care with all my belongings. They made my move completely stress-free!",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  location: "Boston, MA",
                  testimonial:
                    "I was impressed by how quickly and carefully they handled my move. Everything arrived in perfect condition, and the price was exactly as quoted.",
                  rating: 5,
                },
                {
                  name: "Emily Rodriguez",
                  location: "Chicago, IL",
                  testimonial:
                    "This was my third time using their services, and they never disappoint. The movers are friendly, professional, and go above and beyond.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-lg italic mb-6">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Book Your Move
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-sm lg:text-base">
              Ready to get started? Fill out the form below to schedule your
              move
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 lg:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-4">
                Moving Services
              </h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Residential Moving
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Commercial Moving
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Packing Services
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Storage Solutions
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Long Distance Moving
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-4">Company</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Our Team
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Testimonials
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Careers
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-4">Support</h3>
              <div className="flex flex-col space-y-2">
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  FAQs
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white text-sm lg:text-base transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold mb-4">Contact</h3>
              <div className="flex flex-col space-y-2 text-slate-300 text-sm lg:text-base">
                <p>123 Moving Street</p>
                <p>New York, NY 10001</p>
                <p>Phone: (212) 651-7273</p>
                <p>Email: info@pieceofcakemove.com</p>
              </div>
              <div className="flex space-x-4 mt-4">
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5 lg:h-6 lg:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5 lg:h-6 lg:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <svg
                    className="h-5 w-5 lg:h-6 lg:w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-slate-800 text-center text-slate-400">
            <p className="text-sm lg:text-base">
              © {new Date().getFullYear()} Tranzr Moving & Storage. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
