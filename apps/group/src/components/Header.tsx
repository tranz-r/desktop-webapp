'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TranzrGroupLogo from '../../components/logo/TranzrGroupLogo';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'About Us', href: '/about' },
    // { label: 'Solutions', href: '#solutions' },
    // { label: 'News', href: '#news' },
    // { label: 'Careers', href: '#careers' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className={`relative bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50 ${className}`}>
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        {/* Logo - Prominently positioned on the left */}
        <div className="flex items-center pr-2">
          <Link href="/">
            <TranzrGroupLogo className="h-12 w-auto shrink-0 overflow-visible transition-transform hover:scale-105" />
          </Link>
        </div>

          {/* Desktop Navigation - Right side */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-slate-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-slate-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="py-4 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block py-2 text-slate-700 hover:text-blue-600 font-medium text-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
               ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
