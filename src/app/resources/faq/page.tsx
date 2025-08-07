"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    // Moving Services
    {
      question: "What areas do you serve for moving services?",
      answer: "We primarily serve Northamptonshire and surrounding areas, including Kettering, Northampton, Corby, Wellingborough, and Daventry. We also offer long-distance moving services across the entire UK.",
      category: "Moving Services"
    },
    {
      question: "How far in advance should I book my move?",
      answer: "We recommend booking at least 2-4 weeks in advance for standard moves. However, we can accommodate last-minute moves and emergency relocations with as little as 24 hours notice.",
      category: "Moving Services"
    },
    {
      question: "Do you provide packing services?",
      answer: "Yes, we offer comprehensive packing services including full packing, partial packing, and specialty item packing. We use high-quality materials and can pack everything from fragile items to large furniture.",
      category: "Moving Services"
    },
    {
      question: "What is included in your moving service?",
      answer: "Our moving service includes professional packing (if selected), furniture disassembly and reassembly, loading and unloading, transportation, and furniture placement. We also provide moving blankets and protective materials.",
      category: "Moving Services"
    },
    // Pricing & Quotes
    {
      question: "How much does a typical move cost?",
      answer: "Move costs vary based on distance, volume, and services required. Local moves typically range from £150-800, while long-distance moves start from £800. Contact us for a free, no-obligation quote.",
      category: "Pricing & Quotes"
    },
    {
      question: "Do you offer free quotes?",
      answer: "Yes, we provide free, no-obligation quotes for all our moving and storage services. You can get a quote online, over the phone, or by scheduling an in-home consultation.",
      category: "Pricing & Quotes"
    },
    {
      question: "Are there any hidden fees?",
      answer: "No, we believe in transparent pricing. All costs are clearly outlined in your quote, including any additional services like packing materials, storage, or specialty item handling.",
      category: "Pricing & Quotes"
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and cash payments. Payment is typically due on the day of the move, though we can arrange payment plans for larger moves.",
      category: "Pricing & Quotes"
    },
    // Storage Services
    {
      question: "What storage options do you offer?",
      answer: "We offer various storage solutions including small units (25-50 sq ft), medium units (75-150 sq ft), and large units (200-400 sq ft). All units are climate-controlled and secure.",
      category: "Storage Services"
    },
    {
      question: "How long can I store my items?",
      answer: "We offer flexible storage contracts with no long-term commitments. You can store your items for as little as one month or as long as you need. We also offer discounts for longer-term storage.",
      category: "Storage Services"
    },
    {
      question: "Is my stored property insured?",
      answer: "Yes, we provide comprehensive insurance coverage for stored items. You can choose from different coverage levels based on the value of your stored property.",
      category: "Storage Services"
    },
    {
      question: "Can I access my storage unit anytime?",
      answer: "Yes, our storage facility offers 24/7 access with secure key card entry. You can access your unit whenever it's convenient for you.",
      category: "Storage Services"
    },
    // Insurance & Liability
    {
      question: "Are my belongings insured during the move?",
      answer: "Yes, we provide comprehensive insurance coverage for all moves. Our standard coverage includes protection against damage and loss, with options for additional coverage for high-value items.",
      category: "Insurance & Liability"
    },
    {
      question: "What happens if something gets damaged?",
      answer: "In the rare event of damage, we have a straightforward claims process. Contact us immediately, and we'll work with you to resolve the issue quickly and fairly.",
      category: "Insurance & Liability"
    },
    {
      question: "Do you handle valuable items?",
      answer: "Yes, we have experience handling valuable items including artwork, antiques, musical instruments, and electronics. We use specialized packing materials and handling techniques for these items.",
      category: "Insurance & Liability"
    },
    // Special Services
    {
      question: "Do you offer piano moving services?",
      answer: "Yes, we specialize in piano moving and have trained technicians who can safely move pianos of all sizes. We use specialized equipment and techniques to ensure your piano arrives in perfect condition.",
      category: "Special Services"
    },
    {
      question: "Can you handle commercial moves?",
      answer: "Absolutely! We have extensive experience with commercial moves including office relocations, retail store moves, and industrial equipment moves. We work around your business schedule to minimize disruption.",
      category: "Special Services"
    },
    {
      question: "Do you offer international moving services?",
      answer: "While we primarily focus on UK moves, we can coordinate international moves through our network of trusted partners. Contact us to discuss your international moving needs.",
      category: "Special Services"
    }
  ];

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const filteredFAQs = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Frequently Asked Questions"
        title="Find Answers to Common Questions"
        description="Everything you need to know about our moving and storage services. Can't find what you're looking for? Contact us directly."
        minHeight="min-h-[400px]"
      />

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find answers organized by topic for easier navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <Card 
                key={category} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSearchTerm(category)}
              >
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg text-primary-600">{category}</h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {faqData.filter(item => item.category === category).length} questions
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {item.category}
                      </Badge>
                    </div>
                    {expandedItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-primary-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </CardHeader>
                {expandedItems.includes(index) && (
                  <CardContent className="pt-0">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No FAQs found matching "{searchTerm}". Try a different search term or contact us directly.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our team is here to help. 
              Contact us directly and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Get in touch with our customer service team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">📞</span>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+44 1604 279 880</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">✉️</span>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@tranzrmoves.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-semibold">🕒</span>
                  </div>
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Get a Quote</CardTitle>
                <CardDescription>
                  Ready to start your moving journey?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Get a free, no-obligation quote for your move. Our team will work with you 
                  to create a customized moving plan that fits your needs and budget.
                </p>
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 