"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Users, BookOpen, Tag, Search } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function BlogsPage() {
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Packing Tips for a Stress-Free Move",
      excerpt: "Discover the top 10 packing tips that will make your move smoother and more organized. From decluttering to labeling, we cover everything you need to know.",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Packing Tips",
      image: "/images/blog-packing-tips.jpg",
      featured: true
    },
    {
      id: 2,
      title: "How to Choose the Right Moving Company",
      excerpt: "Learn the key factors to consider when selecting a moving company. From licensing to insurance, we'll help you make an informed decision.",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Moving Guide",
      image: "/images/blog-choosing-mover.jpg"
    },
    {
      id: 3,
      title: "Moving with Kids: A Complete Guide",
      excerpt: "Moving with children can be challenging. Our comprehensive guide covers everything from preparing kids for the move to settling into your new home.",
      author: "Emma Davis",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "Family Moving",
      image: "/images/blog-moving-kids.jpg"
    },
    {
      id: 4,
      title: "The Ultimate Moving Checklist",
      excerpt: "Don't miss a thing with our comprehensive moving checklist. From 8 weeks before to move day, we've got you covered.",
      author: "David Wilson",
      date: "2024-01-08",
      readTime: "6 min read",
      category: "Planning",
      image: "/images/blog-checklist.jpg"
    },
    {
      id: 5,
      title: "Moving on a Budget: Money-Saving Tips",
      excerpt: "Moving doesn't have to break the bank. Discover practical tips to save money on your move without compromising quality.",
      author: "Lisa Thompson",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Budget Tips",
      image: "/images/blog-budget-tips.jpg"
    },
    {
      id: 6,
      title: "Packing Fragile Items: Expert Techniques",
      excerpt: "Learn professional techniques for packing fragile items like glassware, electronics, and artwork to ensure they arrive safely.",
      author: "James Brown",
      date: "2024-01-02",
      readTime: "9 min read",
      category: "Packing Tips",
      image: "/images/blog-fragile-items.jpg"
    }
  ];

  const categories = [
    "All Posts",
    "Packing Tips",
    "Moving Guide",
    "Family Moving",
    "Planning",
    "Budget Tips"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Blog"
        title="Moving Tips & Insights"
        description="Stay informed with our latest articles, tips, and guides to make your move easier and more successful. From packing advice to moving day preparation, we've got you covered."
        primaryAction={{
          text: "Read Articles",
          onClick: () => console.log("Read articles clicked")
        }}
        secondaryAction={{
          text: "Subscribe",
          onClick: () => console.log("Subscribe clicked")
        }}
      />

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Article
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {blogPosts.filter(post => post.featured).map((post) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-video bg-gray-200 rounded-lg"></div>
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <Badge className="bg-primary-100 text-primary-600">
                        {post.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-4">{post.title}</CardTitle>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{post.author}</span>
                        <span className="text-gray-300">•</span>
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{post.readTime}</span>
                      </div>
                      <Button className="bg-primary-600 hover:bg-primary-700">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find articles that match your interests and needs.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="text-primary-600 border-primary-600 hover:bg-primary-50 cursor-pointer px-4 py-2"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Recent Posts
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay up to date with our latest articles and moving tips.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-primary-600 border-primary-600">
                      {post.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{post.author}</span>
                      <span className="text-gray-300">•</span>
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button variant="outline" className="w-full">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Subscribe to Our Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Get the latest moving tips, articles, and exclusive offers delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Button className="bg-primary-600 hover:bg-primary-700">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our most-read articles and guides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Tag className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Packing Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Expert packing techniques and advice</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Moving Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Timeline and checklist guides</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Family Moving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Moving with children and pets</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Moving Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">How to choose the right mover</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <GuaranteeComponent />
      <StorageSection
        title="Need storage for your items? We offer flexible"
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
        imageAlt="Blog storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
