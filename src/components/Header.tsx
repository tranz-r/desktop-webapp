"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VanIcon from "@/components/VanIconComponent";
import { ArrowRight, Phone, Menu, X, ChevronDown } from "lucide-react";

interface HeaderProps {
  sticky?: boolean;
}

interface MovingService {
  name: string;
  href: string;
}

interface ServiceItem {
  name: string;
  href: string;
}

interface ResourceItem {
  name: string;
  href: string;
}

interface CompanyItem {
  name: string;
  href: string;
}

export default function Header({ sticky = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const movingServices: MovingService[] = [
    { name: "General Moving Services", href: "/moving" },
    { name: "Local Residential Moves", href: "/moving/local-residential" },
    { name: "Office & Commercial Moves", href: "/moving/commercial" },
    { name: "Long Distance Moves", href: "/moving/long-distance" },
    { name: "Events & Special Moves", href: "/moving/events" },
    { name: "Small Moves", href: "/moving/small-moves" },
    { name: "24/7/365 Moves", href: "/moving/24-7" },
    { name: "Last Minute Moves", href: "/moving/last-minute" },
    { name: "Hourly Moves", href: "/moving/hourly" },
    { name: "Apartment Moves", href: "/moving/apartment" },
    { name: "House Moves", href: "/moving/house" },
    { name: "Same Building Moves", href: "/moving/same-building" },
    { name: "Student Moves", href: "/moving/student" }
  ];

  const serviceItems: ServiceItem[] = [
    { name: "COI Services", href: "/services/coi" },
    { name: "Full Packing", href: "/services/full-packing" },
    { name: "White Glove Moving", href: "/services/white-glove" },
    { name: "Box and Material Delivery", href: "/services/box-delivery" },
    { name: "Plastic Bin Rental", href: "/services/plastic-bin-rental" },
    { name: "Wooden Crate Packing", href: "/services/wooden-crate-packing" },
    { name: "Fitness Equipment Movers", href: "/services/fitness-equipment" },
    { name: "Valuable Items", href: "/services/valuable-items" },
    { name: "Piano Moving", href: "/services/piano-moving" },
    { name: "Furniture Assembly", href: "/services/furniture-assembly" },
  ];

  const resourceItems: ResourceItem[] = [
    { name: "Moving Cost Calculator", href: "/resources/cost-calculator" },
    { name: "Packing tutorial videos", href: "/resources/packing-videos" },
    { name: "FAQ", href: "/resources/faq" },
    { name: "What is a flat fee move?", href: "/resources/flat-fee-move" },
    { name: "How to Pack", href: "/resources/how-to-pack" },
    { name: "Move day checklist", href: "/resources/move-day-checklist" },
    { name: "Move day guide", href: "/resources/move-day-guide" },
    { name: "Reviews", href: "/resources/reviews" },
    { name: "Claims", href: "/resources/claims" },
    { name: "Referral Program", href: "/resources/referral-program" },
    { name: "Blogs", href: "/resources/blogs" },
  ];

  const companyItems: CompanyItem[] = [
    { name: "About us", href: "/company/about" },
    { name: "Quality Assurance", href: "/company/quality-assurance" },
    { name: "Our moving experience", href: "/company/experience" },
    { name: "Our Movers", href: "/company/movers" },
    { name: "Our Truck Fleet", href: "/company/truck-fleet" },
    { name: "Insurance and credentials", href: "/company/licenses" },
    { name: "Safety", href: "/company/safety" },
    { name: "Press & News", href: "/company/press-news" },
    { name: "Contact us", href: "/company/contact" },
  ];

  return (
    <header className={`bg-gradient-to-r from-primary-500 to-primary-600 text-white z-50 ${sticky ? 'sticky top-0' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <VanIcon
                width={200}
                height={32}
                className="text-white flex-shrink-0 w-48 h-10 sm:w-56 sm:h-12 md:w-64 md:h-14 lg:w-72 lg:h-16 xl:w-80 xl:h-18"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white text hover:text-primary-200 hover:bg-transparent font-extrabold p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                >
                  MOVING
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white text-gray-900 border-0 shadow-lg rounded-lg">
                {movingServices.map((service, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link 
                      href={service.href} 
                      className="px-4 py-3 text-sm font-medium hover:bg-gray-50 cursor-pointer"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-primary-200 hover:bg-transparent font-extrabold p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                >
                  SERVICES
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white text-gray-900 border-0 shadow-lg rounded-lg">
                {serviceItems.map((service, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link 
                      href={service.href} 
                      className="px-4 py-3 text-sm font-medium hover:bg-gray-50 cursor-pointer"
                    >
                      {service.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a
              href="#"
              className="text-white hover:text-primary-200 transition-colors font-extrabold"
            >
              STORAGE
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-primary-200 hover:bg-transparent font-extrabold p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                >
                  RESOURCES
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white text-gray-900 border-0 shadow-lg rounded-lg">
                {resourceItems.map((resource, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link 
                      href={resource.href} 
                      className="px-4 py-3 text-sm font-medium hover:bg-gray-50 cursor-pointer"
                    >
                      {resource.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-primary-200 hover:bg-transparent font-extrabold p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                >
                  COMPANY
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 bg-white text-gray-900 border-0 shadow-lg rounded-lg">
                {companyItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    <Link 
                      href={item.href} 
                      className="px-4 py-3 text-sm font-medium hover:bg-gray-50 cursor-pointer"
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="default"
              className="bg-secondary-400 hover:bg-secondary-500 text-white font-extrabold lg:text-lg"
            >
              GET QUOTE <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-accent-400 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div className="text-white">
                  <div className="font-bold text-sm tracking-wide">+44 1604 279 880</div>
                  <div className="text-xs opacity-90 font-medium">7 days a week • 9AM-5PM</div>
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
              <div className="space-y-2">
                <div className="text-white font-extrabold">MOVING</div>
                <div className="ml-4 space-y-1">
                  {movingServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="block text-white/80 hover:text-white transition-colors text-sm py-1"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-white font-extrabold">SERVICES</div>
                <div className="ml-4 space-y-1">
                  {serviceItems.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="block text-white/80 hover:text-white transition-colors text-sm py-1"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-medium"
              >
                STORAGE
              </a>
              <div className="space-y-2">
                <div className="text-white font-extrabold">RESOURCES</div>
                <div className="ml-4 space-y-1">
                  {resourceItems.map((resource, index) => (
                    <Link
                      key={index}
                      href={resource.href}
                      className="block text-white/80 hover:text-white transition-colors text-sm py-1"
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-white font-extrabold">COMPANY</div>
                <div className="ml-4 space-y-1">
                  {companyItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block text-white/80 hover:text-white transition-colors text-sm py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <a
                href="#"
                className="text-white hover:text-primary-200 transition-colors font-extrabold"
              >
                MOVING LOCATIONS
              </a>
              <div className="pt-4 border-t border-primary-400">
                <Button className="bg-black hover:bg-black/90 text-white px-6 py-2 rounded-md font-medium w-full mb-4">
                  GET QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <div className="flex items-center">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent-400 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-white">
                      <div className="font-bold text-sm tracking-wide">+44 1604 279 880</div>
                      <div className="text-xs opacity-90 font-medium">7 days a week • 9AM-5PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
