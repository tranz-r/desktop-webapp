"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import VanIcon from "@/components/VanIconComponent";
import { CartModal } from "@/components/CartModal";

interface StreamlinedHeaderProps {
  sticky?: boolean;
  hideCart?: boolean;
}

export function StreamlinedHeader({ sticky = true, hideCart = false }: StreamlinedHeaderProps) {
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
      <div className="flex items-center gap-2 md:gap-6">
            {/* Phone: highly readable, click-to-call */}
            <div className="flex items-center">
              <Button
                asChild
                variant="secondary"
        size="lg"
        className="rounded-full bg-white text-primary-700 hover:bg-white/90 shadow-md px-3 md:px-5 py-2 md:py-2.5"
              >
                <a href="tel:+441604279880" aria-label="Call Tranzr now on 01604 279 880">
                  <span className="inline-flex items-center">
          <Phone className="md:mr-2 mr-0 h-5 w-5 md:h-6 md:w-6" />
          <span className="hidden md:inline font-extrabold tracking-wide tabular-nums text-base md:text-lg lg:text-xl">
                      01604 279 880
                    </span>
                  </span>
                </a>
              </Button>
              <div className="hidden md:block ml-3 text-white/90 text-[11px] md:text-sm font-medium leading-tight">
                7 days a week • 9AM–5PM
              </div>
            </div>

            {!hideCart && (
              <div className="flex items-center pr-2 md:pr-0 flex-shrink-0">
                <CartModal />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}