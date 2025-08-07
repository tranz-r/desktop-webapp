"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, Award, Clock, CheckCircle, AlertTriangle, HardHat, Heart } from "lucide-react";

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header sticky={true} />
      
      <Hero
        backgroundImage="/images/tranzr-van-express.png"
        badge="Safety First"
        title="Your Safety is Our Top Priority"
        description="We maintain the highest safety standards in the moving industry, ensuring the protection of our team, your belongings, and everyone involved in the moving process."
        primaryAction={{
          text: "Get Free Quote",
          onClick: () => console.log("Get quote clicked")
        }}
        secondaryAction={{
          text: "Safety Protocols",
          onClick: () => console.log("Safety protocols clicked")
        }}
      />

      {/* Safety Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary-600 border-primary-600">
                Safety Commitment
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Comprehensive Safety Protocols
              </h2>
              <p className="text-lg text-gray-600">
                At Tranzr Moves, safety isn't just a priority—it's our foundation. 
                We've developed comprehensive safety protocols that cover every aspect 
                of the moving process, from initial planning to final delivery.
              </p>
              <p className="text-lg text-gray-600">
                Our safety program includes regular training, state-of-the-art equipment, 
                and strict adherence to industry best practices. We're committed to 
                maintaining a safe environment for our team and ensuring the secure 
                handling of your valuable possessions.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">0</div>
                    <div className="text-gray-600">Safety Incidents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">100%</div>
                    <div className="text-gray-600">Safety Compliance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">50+</div>
                    <div className="text-gray-600">Trained Professionals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-600">24/7</div>
                    <div className="text-gray-600">Safety Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Safety Standards
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We maintain rigorous safety standards that exceed industry requirements 
              and ensure the highest level of protection for everyone involved.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <HardHat className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Personal Protective Equipment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All team members are equipped with appropriate PPE including 
                  safety boots, gloves, and protective gear for every job.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Regular Training</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Ongoing safety training and certification programs ensure our 
                  team stays current with best practices and safety protocols.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Equipment Safety</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  All moving equipment is regularly inspected and maintained 
                  to ensure optimal safety and performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Emergency Preparedness</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Comprehensive emergency response plans and first aid training 
                  ensure quick and effective response to any situation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Thorough risk assessments are conducted for every move to 
                  identify and mitigate potential safety hazards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle>Safety Certifications</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  We maintain all required safety certifications and regularly 
                  undergo third-party safety audits and inspections.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Protocols */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Safety Protocols & Procedures
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our detailed safety protocols ensure consistent, safe operations 
              across all our moving services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Pre-Move Safety Assessment</h3>
                  <p className="text-gray-600">
                    Comprehensive evaluation of the move location, identifying 
                    potential hazards and implementing appropriate safety measures.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Equipment Inspection</h3>
                  <p className="text-gray-600">
                    Daily inspection of all moving equipment, vehicles, and tools 
                    to ensure they meet safety standards.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Team Safety Briefing</h3>
                  <p className="text-gray-600">
                    Pre-move safety briefings ensure all team members understand 
                    the specific safety requirements for each job.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Proper Lifting Techniques</h3>
                  <p className="text-gray-600">
                    Training in proper lifting and carrying techniques to prevent 
                    injuries and ensure safe handling of items.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Secure Loading Procedures</h3>
                  <p className="text-gray-600">
                    Systematic approach to loading and securing items in vehicles 
                    to prevent damage and ensure safe transport.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Emergency Response Plan</h3>
                  <p className="text-gray-600">
                    Clear procedures for handling emergencies, including first aid, 
                    accident reporting, and communication protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Training */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary-600 border-primary-600">
                Training & Certification
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Comprehensive Safety Training
              </h2>
              <p className="text-lg text-gray-600">
                Our team undergoes extensive safety training that covers all aspects 
                of moving operations. From basic safety principles to advanced 
                techniques, we ensure every team member is equipped with the 
                knowledge and skills needed for safe operations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary-600">100%</div>
                  <div className="text-gray-600">Certified Team</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary-600">Monthly</div>
                  <div className="text-gray-600">Safety Training</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary-600" />
                    Safety Training Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Manual Handling & Lifting Techniques</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Equipment Operation & Safety</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">First Aid & Emergency Response</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Risk Assessment & Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Health & Safety Regulations</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Equipment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Safety Equipment & Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We invest in the latest safety equipment and technology to ensure 
              the highest standards of safety and protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <HardHat className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Safety Gear</h3>
                <p className="text-gray-600 text-sm">
                  High-quality protective equipment including helmets, gloves, 
                  and safety footwear for all team members.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Moving Equipment</h3>
                <p className="text-gray-600 text-sm">
                  State-of-the-art dollies, straps, and moving equipment designed 
                  for safety and efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">First Aid Kits</h3>
                <p className="text-gray-600 text-sm">
                  Comprehensive first aid kits available on all vehicles and 
                  at all job sites for immediate emergency response.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Safety Monitoring</h3>
                <p className="text-gray-600 text-sm">
                  Advanced monitoring systems and regular safety audits to 
                  ensure continuous compliance and improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Experience Safe, Professional Moving
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Choose Tranzr Moves for moving services that prioritize safety, 
            professionalism, and your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Get Free Quote <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
