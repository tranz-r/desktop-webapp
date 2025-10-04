import React from 'react';
import Link from 'next/link';
import TranzrGroupLogo from '../../components/logo/TranzrGroupLogo';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const navigationSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact Us', href: '/contact' }
        // { label: 'Leadership', href: '#leadership' },
        // { label: 'Investor Relations', href: '#investors' },
        // { label: 'Careers', href: '#careers' },
      ]
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Tranzr Moves', href: 'https://www.tranzrmoves.com' },
        { label: 'Tranzr Recovery', href: '#recovery' }
      ]
    }
  ];

  return (
    <footer className={`bg-gray-800 text-white ${className}`}>
      <div className="container mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
          {/* Logo - Prominently positioned on the left */}
          <div className="flex flex-col items-start mb-8 lg:mb-0">
            <div className="mb-4">
              <TranzrGroupLogo className="h-10 w-auto [&>g>text]:fill-white [&>g>path]:!fill-current" style={{ color: '#A855F7' }} />
            </div>
            <div className="max-w-md">
              <p className="text-slate-300 text-sm leading-relaxed">
                Pioneering the future of smart mobility and transportation solutions globally
                through innovative technology, sustainable practices, and strategic partnerships.
              </p>
            </div>
            {/* Social Links */}
            {/* <div className="flex space-x-4 mt-6">
              <a
                href="#linkedin"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 0 925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#youtube"
                className="text-slate-400 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.402-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div> */}
          </div>

          {/* Navigation Links - Stacked on the right */}
          <div className="w-full lg:w-auto">
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {navigationSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-slate-300 hover:text-white text-sm transition-colors duration-200 block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} TRANZR GROUP LIMITED. All rights reserved.
            </div>
            
            {/* Additional Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-slate-400 text-sm">
              <a href="#accessibility" className="hover:text-white transition-colors">
                Accessibility Statement
              </a>
              <a href="#sitemap" className="hover:text-white transition-colors">
                Sitemap
              </a>
              <a href="#investors" className="hover:text-white transition-colors">
                Investor Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;