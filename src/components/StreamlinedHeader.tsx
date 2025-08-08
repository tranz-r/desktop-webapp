"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import VanIcon from "@/components/VanIconComponent";
import { CartModal } from "@/components/CartModal";

interface StreamlinedHeaderProps {
  sticky?: boolean;
}

export function StreamlinedHeader({ sticky = true }: StreamlinedHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary-500 to-primary-600 text-white z-50 border-b border-primary-600 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20 w-full">
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

          {/* Phone Number and Cart */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* Phone Number */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="bg-accent-400 p-2 rounded-full shadow-md">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <div className="text-white">
                <div className="font-bold text-sm tracking-wide">+44 1604 279 880</div>
                <div className="text-xs opacity-90 font-medium">7 days a week • 9AM-5PM</div>
              </div>
            </div>
            
            {/* Cart Icon - More prominent with proper mobile spacing */}
            <div className="flex items-center pr-3 sm:pr-2 md:pr-0">
              <CartModal />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}