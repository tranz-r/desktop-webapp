"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VanIcon from "@/components/VanIconComponent";
import { ArrowRight, Phone, Menu, X } from "lucide-react";

interface HeaderProps {
  sticky?: boolean;
}

export default function Header({ sticky = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <a
              href="/moving"
              className="text-white hover:text-primary-200 transition-colors font-medium"
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
            <Button
              variant="default"
              className="bg-secondary-400 hover:bg-secondary-500 text-white"
            >
              INSTANT PRICE <ArrowRight className="ml-2 h-4 w-4" />
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
              <a
                href="/moving"
                className="text-white hover:text-primary-200 transition-colors font-medium"
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
