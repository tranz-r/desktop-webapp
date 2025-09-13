"use client";

export const dynamic = 'force-dynamic';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StorageSection from "@/components/StorageSection";
import GuaranteeComponent from "@/components/GuaranteeComponent";
import SVGImagesComponent from "@/components/SVGImagesComponent";
import { ArrowRight } from "lucide-react";
import Svg247Moving from "@/components/247Moving";
import PromotionalSection from "@/components/PromotionalSection";
import SvgLongDistanceSVG from "@/components/LongDistanceSVG";
import SvgOfficeMoveSVG from "@/components/OfficeMoveSVG";
import SvgSmallMoveSVG from "@/components/SmallMoveSVG";
import SvgLastMinuteMove from "@/components/LastMinuteMove";
import PeoplePackingSVG from "@/components/PeoplePacking";
import TileInfoSVGComponent from "@/components/TileInfoSVGComponent";

export default function HomePage() {
  const router = useRouter();

  // Function to handle Learn More navigation based on service ID
  const handleLearnMore = (serviceId: string) => {
    const routeMap: Record<string, string> = {
      // Moving services
      '247-moving': '/moving/24-7',
      'local-residential-moving': '/moving/local-residential',
      'long-distance-moving': '/moving/long-distance',
      'office-commercial-moves': '/moving/commercial',
      'small-moves': '/moving/small-moves',
      'last-minute-moves': '/moving/last-minute',
      // Packing services
      'full-packing': '/services/full-packing',
      'platinum-packing': '/services/white-glove',
      'plastic-bin-hire': '/services/plastic-bin-rental',
      'box-material-delivery': '/services/box-delivery',
      'valuable-item-packing': '/services/valuable-items',
      'pianos': '/services/piano-moving',
    };

    const route = routeMap[serviceId];
    if (route) {
      router.push(route);
    } else {
      console.warn(`No route found for service ID: ${serviceId}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header sticky={false} />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] bg-gradient-to-r from-primary-500 to-primary-600 flex items-center">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-relaxed tracking-wide font-serif">
              The best movers in Northamptonshire and the UK with the best
              reviews and customer satisfaction.
            </h1>
            <div className="space-y-2">
              <p className="text-lg lg:text-xl opacity-90">
                Affordable moving & storage services.
              </p>
              <p className="text-lg lg:text-xl opacity-90">
                Guaranteed all-inclusive quote within minutes.
              </p>
            </div>

            {/* Hero CTA */}
            <div className="pb-10">
              <Link href="/quote-option">
                <Button
                  variant="default"
                  className="bg-secondary-400 hover:bg-secondary-500 text-white font-extrabold lg:text-lg scale-[1.3] origin-left"
                >
                  GET INSTANT QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-1 lg:order-2">
            <img
              src="/images/best-movers.jpg"
              alt="Best movers in Northamptonshire"
              className="w-full h-[300px] lg:h-[600px] object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Complete Moving Services */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Keep moving forward with our
            </h2>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              comprehensive moving services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whatever you need to move from point A to B, we will get it there
              safely.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 24/7/365 Moving */}
            <TileInfoSVGComponent
              id="247-moving"
              title="24/7/365 Moving"
              description="The only moving company in Northamptonshire that offers any day and time moving services. No matter how big or small your move is we will move it."
              svgComponent={Svg247Moving}
              onLearnMore={handleLearnMore}
            />

            {/* Local Residential Moving */}
            <TileInfoSVGComponent
              id="local-residential-moving"
              title="Local Residential Moving Services"
              description="We specialize in local residential Northamptonshire and UK moves. We can move you across all of the London Area and surrounding UK locations."
              svgComponent={PeoplePackingSVG}
              onLearnMore={handleLearnMore}
            />

            {/* Long Distance Moving */}
            <TileInfoSVGComponent
              id="long-distance-moving"
              title="Long Distance Moving Services"
              description="From Northamptonshire to Edinburgh, Manchester and Cardiff we can move you to any location in the UK. With on time long distance delivery dates and safe packing we will get you settled into your new home quickly."
              svgComponent={SvgLongDistanceSVG}
              onLearnMore={handleLearnMore}
            />

            {/* Office and Commercial Moves */}
            <TileInfoSVGComponent
              id="office-commercial-moves"
              title="Office and Commercial Moves"
              description="We can move your office overnight, on the weekend and during holidays to minimize your downtime. With full office packing and unpacking our staff will be up and running the next morning."
              svgComponent={SvgOfficeMoveSVG}
              onLearnMore={handleLearnMore}
            />

            {/* Small Moves */}
            <TileInfoSVGComponent
              id="small-moves"
              title="Small Moves"
              description="Need to move a few small items or moving out of a studio with minimal furniture? Do not lift a finger with our small move service."
              svgComponent={SvgSmallMoveSVG}
              onLearnMore={handleLearnMore}
            />

            {/* Last Minute Moves */}
            <TileInfoSVGComponent
              id="last-minute-moves"
              title="Last Minute Moves"
              description="Need to move urgently, our last minute moving service will help you the day you get you into your new address asap! We also offer emergency packing and storage services."
              svgComponent={SvgLastMinuteMove}
              onLearnMore={handleLearnMore}
            />
          </div>
        </div>
      </section>

      <PromotionalSection
        title="Put your feet up with our complete packing experience"
        highlightedText="complete packing"
        description="We can pack your whole home, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/feet-up.jpg"
        imageAlt="Professional movers packing furniture with care"
      />

      {/* SVG Images Component */}
      <SVGImagesComponent onLearnMore={handleLearnMore} />

      {/* Guarantee Section */}
      <GuaranteeComponent />

      {/* Storage Section */}
      <StorageSection
        title="Make space with our flexible short and long term "
        highlightedText="storage"
        description="We will pick up your items from your doorstep and deliver them to our secure storage facility, where they will be safely stored for as little or as long of you like. Just let us know when you need your items back and we will drop them off at a time that suits you."
        buttonText="GET A STORAGE QUOTE"
        imageSrc="/images/tranzr-two-man-smile.png"
        imageAlt="Professional storage service with moving boxes"
        href="/quote-option"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
