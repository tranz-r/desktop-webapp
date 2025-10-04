"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import TranzrGroupLogo from "../../components/logo/TranzrGroupLogo";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Professional Corporate Header */}
      <Header />
      
      {/* Enhanced Hero Section with Dynamic Professional Animation */}
      <section className="relative overflow-hidden animated-gradient">
        {/* Enhanced animated overlay with multiple layers */}
        <div className="absolute inset-0 bg-black/20">
          {/* Primary floating elements - more prominent with purple gradient colors */}
          <div className="absolute top-16 left-8 w-24 h-24 bg-purple-400/30 rounded-full floating-elements-primary"></div>
          <div className="absolute top-32 right-16 w-20 h-20 bg-teal-300/20 rounded-lg floating-elements-primary" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-28 left-1/3 w-16 h-16 bg-violet-300/25 rounded-full floating-elements-primary" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-16 right-1/4 w-28 h-28 bg-slate-200/15 rounded-lg floating-elements-primary" style={{animationDelay: '0.5s'}}></div>
          
          {/* Secondary floating elements - smaller, faster with complementary colors */}
          <div className="absolute top-24 left-1/2 w-8 h-8 bg-purple-200/25 rounded-full floating-elements-secondary"></div>
          <div className="absolute top-48 right-1/3 w-6 h-6 bg-teal-200/20 rounded floating-elements-secondary" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/5 w-10 h-10 bg-violet-200/20 rounded-full floating-elements-secondary" style={{animationDelay: '4.5s'}}></div>
          <div className="absolute bottom-24 right-1/2 w-12 h-12 bg-slate-100/10 rounded-lg floating-elements-secondary" style={{animationDelay: '1s'}}></div>
          
          {/* Animated grid pattern with movement */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-full h-full animated-grid-pattern"></div>
          </div>
          
          {/* Multiple pulsing glow effects for depth with purple gradient colors */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/15 rounded-full pulse-glow-primary"></div>
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-400/12 rounded-full pulse-glow-secondary" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-400/10 rounded-full pulse-glow-tertiary" style={{animationDelay: '4s'}}></div>
          
          {/* Professional light rays effect with purple gradient colors */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-300/40 to-transparent light-ray" style={{animationDelay: '0s'}}></div>
            <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-teal-300/40 to-transparent light-ray" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-violet-300/30 to-transparent light-ray" style={{animationDelay: '6s'}}></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-6 lg:px-8 py-20 lg:py-32 z-10">
          <div className="text-center text-white space-y-8">
            {/* Bold Split Headline with subtle animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block text-white animate-fade-in-up">CONNECTING PEOPLE,</span>
              <span className="block text-teal-300 animate-fade-in-up" style={{animationDelay: '0.2s'}}>MOVING THE WORLD</span>
            </h1>

            {/* Enhanced Value Proposition */}
            <p className="text-xl md:text-2xl text-teal-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Empowering communities through innovative transportation and logistics solutions – 
              we're your trusted mobility partner, delivering seamless experiences that connect 
              people and businesses.
            </p>

            {/* Dual CTAs with hover animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <button 
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:border-2 hover:border-white/30 rounded-md"
                onClick={() => window.open('https://www.tranzrmoves.com', '_blank')}
              >
                Explore Our Services
              </button>
              <button 
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 hover:border-2 hover:border-white/30 rounded-md"
                onClick={() => window.open('/contact', '_self')}
              >
                Partner With Us
              </button>
            </div>

            {/* Trust Indicators with staggered animation */}
            <div className="pt-12 border-t border-white/20 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <p className="text-sm text-blue-200 mb-6">Trusted by businesses worldwide</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-white/40 font-semibold hover:text-white/60 transition-colors">Enterprise Ready</div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="text-white/40 font-semibold hover:text-white/60 transition-colors">24/7 Support</div>
                <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                <div className="text-white/40 font-semibold hover:text-white/60 transition-colors">Global Reach</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Solutions Section - Inspired by Carro Group */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Strategic Mobility Solutions for Every Business Need
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We are dedicated to connecting businesses with innovative transportation solutions 
              through tailored, efficient, and comprehensive mobility services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Enterprise Solutions */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Enterprise Solutions</CardTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full mx-auto"></div>
              </CardHeader>
              <CardContent className="text-center relative z-10 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 text-lg leading-relaxed flex-1">
                  Comprehensive fleet management and corporate transportation solutions 
                  designed for large-scale operations and enterprise needs.
                </p>
                <Button className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Consumer Services */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Consumer Services</CardTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full mx-auto"></div>
              </CardHeader>
              <CardContent className="text-center relative z-10 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 text-lg leading-relaxed flex-1">
                  Personal transportation, delivery services, and mobility solutions 
                  for everyday convenience and reliability.
                </p>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Logistics & Recovery */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-50 to-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-violet-500/25 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Logistics & Recovery</CardTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-teal-500 rounded-full mx-auto"></div>
              </CardHeader>
              <CardContent className="text-center relative z-10 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 text-lg leading-relaxed flex-1">
                  Advanced asset tracking, recovery systems, and intelligent logistics 
                  management for optimized operations and efficiency.
                </p>
                <Button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Discover More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Products & Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Innovative solutions transforming how people move and connect
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tranzr Moves */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01]">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300 group-hover:scale-110">
                  <TranzrGroupLogo className="h-10 w-auto text-white" />
                </div>
                <CardTitle className="text-2xl font-bold mb-3 text-slate-800">Tranzr Moves</CardTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full"></div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Comprehensive transportation platform offering ride-sharing, courier services, removal, 
                  collection and delivery of items and merchandise. Connecting riders with drivers through 
                  smart matching and transparent pricing for all your mobility and logistics needs.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.open('https://www.tranzrmoves.com', '_blank')}
                >
                  Visit Tranzr Moves →
                </Button>
              </CardContent>
            </Card>

            {/* Tranzr Recovery */}
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] opacity-75">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-slate-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-slate-500/25 transition-all duration-300 group-hover:scale-110">
                  <div className="w-10 h-10 bg-white/80 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold mb-3 text-slate-800">Tranzr Recovery</CardTitle>
                <div className="w-16 h-1 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full"></div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                  Intelligent vehicle recovery and asset management system for fleet operators.
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-not-allowed"
                  disabled
                >
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Professional Corporate Footer */}
      <Footer />
    </div>
  );
}