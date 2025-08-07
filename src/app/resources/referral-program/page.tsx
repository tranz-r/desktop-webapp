"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Gift, Star, CheckCircle, Share2, Award, Heart } from "lucide-react";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import PromotionalSection from "@/components/PromotionalSection";

export default function ReferralProgramPage() {
  const referralBenefits = [
    {
      title: "£50 Credit",
      description: "Get £50 credit towards your next move for each successful referral",
      icon: Gift,
      category: "Reward"
    },
    {
      title: "Friend Discount",
      description: "Your friend gets 10% off their first move with us",
      icon: Star,
      category: "Discount"
    },
    {
      title: "No Limits",
      description: "Refer as many friends as you want - no cap on rewards",
      icon: Users,
      category: "Unlimited"
    },
    {
      title: "Easy Sharing",
      description: "Share your unique referral link via email, social media, or text",
      icon: Share2,
      category: "Simple"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Get Your Link",
      description: "Sign up for our referral program and receive your unique referral link",
      icon: Share2
    },
    {
      step: 2,
      title: "Share with Friends",
      description: "Share your referral link with friends, family, or colleagues",
      icon: Users
    },
    {
      step: 3,
      title: "They Book a Move",
      description: "When your friend books a move using your link, they get 10% off",
      icon: CheckCircle
    },
    {
      step: 4,
      title: "You Get Rewarded",
      description: "Once their move is completed, you receive £50 credit for your next move",
      icon: Gift
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Referral Program"
        title="Refer Friends, Earn Rewards"
        description="Join our referral program and earn £50 credit for every friend who books a move with us. It's our way of saying thank you for spreading the word about Tranzr."
        primaryAction={{
          text: "Join Program",
          onClick: () => console.log("Join program clicked")
        }}
        secondaryAction={{
          text: "Learn More",
          onClick: () => console.log("Learn more clicked")
        }}
      />

      {/* Referral Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Referral Benefits
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Earn rewards while helping your friends and family with their moving needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {referralBenefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <CardTitle>{benefit.title}</CardTitle>
                  <Badge variant="outline" className="text-primary-600 border-primary-600">
                    {benefit.category}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              It's simple to start earning rewards with our referral program.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step) => (
                <Card key={step.step} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-primary-600">{step.step}</span>
                      </div>
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <step.icon className="h-5 w-5 text-primary-600" />
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Rules */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Program Rules
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Important information about our referral program terms and conditions.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You must be a registered customer with at least one completed move to participate in the referral program.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Reward Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Rewards are issued after your referred friend completes their move. Credits can be used towards future moves and expire after 12 months.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Referral Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Referrals are tracked through unique links. Make sure your friends use your specific referral link to ensure you receive credit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  Program Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We reserve the right to modify or terminate the referral program at any time. Existing rewards will be honored.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how our customers are benefiting from the referral program.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <CardTitle>Amazing Program!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "I've earned over £200 in credits by referring friends and family. The process is so easy and the rewards are great!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Sarah M., London</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <CardTitle>Great Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "My friends loved the 10% discount, and I got £50 credit for my next move. Win-win for everyone!"
                </p>
                <p className="text-sm text-gray-500 mt-2">- Michael T., Manchester</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                </div>
                <CardTitle>Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  "The referral program is so simple to use. I just shared my link on social media and earned credits quickly."
                </p>
                <p className="text-sm text-gray-500 mt-2">- Emma L., Birmingham</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our referral program today and start earning rewards for every friend you refer.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-primary-600" />
                </div>
                <CardTitle>Join the Referral Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Sign up now and get your unique referral link to start earning rewards.
                </p>
                <Button className="w-full bg-primary-600 hover:bg-primary-700">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <GuaranteeComponent />
      <StorageSection />
      <SVGImagesComponent />
      <PromotionalSection />
      <Footer />
    </div>
  );
}
