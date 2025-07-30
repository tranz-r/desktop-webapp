"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  svgPlaceholder: string;
}

interface SVGImagesComponentProps {
  title?: string;
  services?: ServiceItem[];
  onLearnMore?: (serviceId: string) => void;
  className?: string;
}

const SVGImagesComponent = ({
  title = "Our Packing Services",
  services = [
    {
      id: "full-packing",
      title: "Full Packing",
      description:
        "We remove the hassle of packing up all of your valuable items safely. You can decide what you want us to pack, there is no minimum limit to our packing service. You can use us to pack just your kitchen or your entire house.",
      svgPlaceholder: "📦",
    },
    {
      id: "platinum-packing",
      title: "Platinum Packing",
      description:
        "We will not only pack up all of your items, we will unpack all of your belongings into your new address. You just tell us what and where you want everything placed.",
      svgPlaceholder: "🧤",
    },
    {
      id: "plastic-bin-hire",
      title: "Plastic Bin Hire",
      description:
        "Our eco friendly plastic moving bins are delivered to your door with no assembly required. Once you're done we will pick them up and sanitize them so that they can be used again.",
      svgPlaceholder: "📦",
    },
    {
      id: "box-material-delivery",
      title: "Box and Material Delivery",
      description:
        "We have made it easy by bundling important moving supplies into packages that suit your lifestyle. Delivered to your door before your move date.",
      svgPlaceholder: "📦",
    },
    {
      id: "valuable-item-packing",
      title: "Valuable Item Packing",
      description:
        "Your valuable furniture pieces, antiques and artwork will be safely handled with the utmost care. We will build custom crates for your items, wrap them with durable packing material and ensure the appropriate lifting resources.",
      svgPlaceholder: "💎",
    },
    {
      id: "pianos",
      title: "Pianos",
      description:
        "It takes specialized skills, equipment and training to move a piano safely, especially in NYC. We have experience moving upright, horizontal and all piano styles in between.",
      svgPlaceholder: "🎹",
    },
  ],
  onLearnMore = () => {},
  className = "",
}: SVGImagesComponentProps) => {
  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="text-left">
              {/* SVG Placeholder - will be replaced with actual SVGs later */}
              <div className="mb-6">
                <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-3xl">{service.svgPlaceholder}</span>
                </div>
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 text-sm lg:text-base leading-relaxed">
                {service.description}
              </p>

              <button
                onClick={() => onLearnMore(service.id)}
                className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center transition-colors duration-200"
              >
                Learn More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SVGImagesComponent;
