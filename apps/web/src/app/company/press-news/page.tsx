"use client";

import React from 'react';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Newspaper, Award, Users, TrendingUp, Star, ExternalLink } from "lucide-react";
import CTASection from "@/components/CTASection";

export default function PressNewsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Press & News"
        title="Latest News and Media Coverage"
        description="Stay updated with the latest news, press releases, and media coverage about Tranzr Moves and the moving industry."
        primaryAction={{
          text: "Get Free Quote",
          href: "/quote-option"
        }}
        secondaryAction={{
          text: "Latest News",
          onClick: () => console.log("Latest news clicked")
        }}
      />

      {/* Featured News */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="text-primary-600 border-primary-600 mb-4">
              Featured News
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Latest Updates from Tranzr Moves
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover the latest developments, achievements, and insights from 
              our team and the moving industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary-100 text-primary-600">
                    Press Release
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 15, 2024
                  </div>
                </div>
                <CardTitle className="text-xl">Tranzr Moves Expands to New Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We're excited to announce the expansion of our services to new 
                  locations across Northamptonshire, bringing our trusted moving 
                  services to more communities.
                </p>
                <Button variant="outline" className="w-full">
                  Read More <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-600">
                    Achievement
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 10, 2024
                  </div>
                </div>
                <CardTitle className="text-xl">Safety Excellence Award 2024</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tranzr Moves has been recognized with the Safety Excellence Award 
                  for our outstanding commitment to workplace safety and customer protection.
                </p>
                <Button variant="outline" className="w-full">
                  Read More <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                    Industry News
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    Dec 5, 2024
                  </div>
                </div>
                <CardTitle className="text-xl">Sustainable Moving Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn about our latest initiatives in sustainable moving practices 
                  and how we're reducing our environmental impact.
                </p>
                <Button variant="outline" className="w-full">
                  Read More <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Media Coverage */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Media Coverage
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how Tranzr Moves has been featured in various media outlets 
              and industry publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Newspaper className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Northamptonshire Business Journal</CardTitle>
                      <CardDescription>Local Business Feature</CardDescription>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Nov 28, 2024</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  "Tranzr Moves: Leading the Way in Professional Moving Services" - 
                  A comprehensive feature on our company's growth and commitment to excellence.
                </p>
                <Button variant="outline" size="sm">
                  Read Article <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Moving Industry Magazine</CardTitle>
                      <CardDescription>Industry Recognition</CardDescription>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Nov 15, 2024</div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  "Excellence in Customer Service: Tranzr Moves Sets New Standards" - 
                  Recognition of our outstanding customer service and safety practices.
                </p>
                <Button variant="outline" size="sm">
                  Read Article <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Company Milestones
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key achievements and milestones that have shaped our journey 
              and contributed to our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">15+ Years</h3>
                <p className="text-gray-600 text-sm">
                  Serving Northamptonshire with excellence and dedication since 2008.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">10,000+ Moves</h3>
                <p className="text-gray-600 text-sm">
                  Successfully completed moves for satisfied customers across the region.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">4.9★ Rating</h3>
                <p className="text-gray-600 text-sm">
                  Consistently high customer satisfaction ratings and positive reviews.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">5 Awards</h3>
                <p className="text-gray-600 text-sm">
                  Industry recognition and awards for excellence in service and safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary-600 border-primary-600">
                Press Resources
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Press Kit & Media Resources
              </h2>
              <p className="text-lg text-gray-600">
                Access our press kit, company information, and media resources 
                for journalists and media professionals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Newspaper className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Company Press Kit</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Executive Biographies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Company Logos & Images</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">Fact Sheet & Timeline</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Media Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Press Inquiries</h4>
                    <p className="text-gray-600">For media inquiries and press opportunities</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-primary-600">press@tranzrmoves.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">+44 1604 279 880</p>
                  </div>
                  <Button className="w-full">
                    Download Press Kit <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Insights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Industry Insights & Blog
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay informed with our latest insights, tips, and industry trends 
              from the moving and storage industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-600">
                    Tips & Advice
                  </Badge>
                  <div className="text-sm text-gray-500">Nov 20, 2024</div>
                </div>
                <CardTitle className="text-lg">Essential Packing Tips for a Smooth Move</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Discover our expert packing tips and techniques to ensure your 
                  belongings are protected during the moving process.
                </p>
                <Button variant="outline" size="sm">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-600">
                    Industry Trends
                  </Badge>
                  <div className="text-sm text-gray-500">Nov 15, 2024</div>
                </div>
                <CardTitle className="text-lg">The Future of Moving: Technology Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Explore how technology is transforming the moving industry and 
                  what innovations are shaping the future of moving services.
                </p>
                <Button variant="outline" size="sm">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-600">
                    Company News
                  </Badge>
                  <div className="text-sm text-gray-500">Nov 10, 2024</div>
                </div>
                <CardTitle className="text-lg">Community Involvement: Giving Back</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn about our community involvement initiatives and how we're 
                  giving back to the Northamptonshire community.
                </p>
                <Button variant="outline" size="sm">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <CTASection
        title="Stay Connected with Tranzr Moves"
        description="Follow us for the latest news, updates, and insights from the moving industry."
        secondaryButtonText="Contact Media Team"
      />

      <Footer />
    </div>
  );
}
