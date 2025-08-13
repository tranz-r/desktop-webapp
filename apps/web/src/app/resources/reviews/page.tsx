"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Shield, Clock, CheckCircle, ThumbsUp, MessageCircle } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "London",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent Service from Start to Finish",
      content: "Tranzr made our move stress-free and efficient. The team was professional, careful with our belongings, and completed the move ahead of schedule. Highly recommend!",
      service: "Full Packing & Moving",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Manchester",
      rating: 5,
      date: "2024-01-10",
      title: "Professional and Reliable",
      content: "Great experience with Tranzr. The movers were punctual, professional, and handled everything with care. The flat fee pricing was transparent and fair.",
      service: "Local Move",
      verified: true
    },
    {
      id: 3,
      name: "Emma Davis",
      location: "Birmingham",
      rating: 5,
      date: "2024-01-08",
      title: "Outstanding Moving Experience",
      content: "I was worried about moving my fragile items, but the team was incredibly careful and everything arrived in perfect condition. Excellent service!",
      service: "Fragile Items Moving",
      verified: true
    },
    {
      id: 4,
      name: "David Wilson",
      location: "Leeds",
      rating: 5,
      date: "2024-01-05",
      title: "Highly Recommended",
      content: "Tranzr exceeded our expectations. The team was friendly, efficient, and professional. The move was completed quickly and without any issues.",
      service: "Long Distance Move",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Thompson",
      location: "Liverpool",
      rating: 5,
      date: "2024-01-02",
      title: "Fantastic Moving Service",
      content: "From the initial quote to the final delivery, everything was perfect. The team was courteous and made the whole process smooth and stress-free.",
      service: "Residential Move",
      verified: true
    },
    {
      id: 6,
      name: "James Brown",
      location: "Sheffield",
      rating: 5,
      date: "2023-12-28",
      title: "Professional and Efficient",
      content: "Tranzr provided excellent service throughout our move. The team was professional, efficient, and took great care of our belongings. Highly recommend!",
      service: "Commercial Move",
      verified: true
    }
  ];

  const averageRating = 5.0;
  const totalReviews = reviews.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Customer Reviews"
        title="What Our Customers Say"
        description="Read authentic reviews from our satisfied customers. See why thousands of people choose Tranzr for their moving needs."
        primaryAction={{
          text: "Read All Reviews",
          onClick: () => console.log("Read reviews clicked")
        }}
        secondaryAction={{
          text: "Write a Review",
          onClick: () => console.log("Write review clicked")
        }}
      />

      {/* Overall Rating */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {renderStars(averageRating)}
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {averageRating} out of 5 Stars
            </h2>
            <p className="text-lg text-gray-600">
              Based on {totalReviews} verified customer reviews
            </p>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real experiences from our valued customers who have trusted us with their moves.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <Card key={review.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {renderStars(review.rating)}
                    </div>
                    {review.verified && (
                      <Badge className="bg-green-100 text-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{review.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{review.location}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{review.content}</p>
                  <Badge variant="outline" className="text-primary-600 border-primary-600">
                    {review.service}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Review Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Review Statistics
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how we're performing across different aspects of our service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  {averageRating}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Average Rating</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  {totalReviews}+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Happy Customers</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  98%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Satisfaction Rate</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <ThumbsUp className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-primary-600">
                  95%
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Would Recommend</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Customers Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Customers Choose Tranzr
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes us the preferred choice for moving services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Professional Service</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Experienced and trained professionals who handle your belongings with care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Reliable & Punctual</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  On-time service and reliable communication throughout the moving process.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Excellent Communication</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Clear communication and updates at every step of your move.
                </p>
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
        imageSrc="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600<StorageSection />q=80"
        imageAlt="Storage service"
      />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
