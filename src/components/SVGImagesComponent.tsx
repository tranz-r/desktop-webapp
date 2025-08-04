"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import SvgFullPackingMove from "@/components/FullPackingMove";
import SvgBoxMaterialMove from "@/components/BoxMaterialMove";
import ValuableItemMoveSVG from "@/components/ValuableItemMove";
import PianoMoveSVG from "@/components/PianoMoveSVG";
import SvgLocalMovesSVG from "@/components/LocalMovesSVG";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  svgComponent: React.ComponentType<any>;
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
      svgComponent: SvgFullPackingMove,
    },
    {
      id: "platinum-packing",
      title: "Platinum Packing",
      description:
        "We will not only pack up all of your items, we will unpack all of your belongings into your new address. You just tell us what and where you want everything placed.",
      svgComponent: SvgLocalMovesSVG,
    },
    {
      id: "plastic-bin-hire",
      title: "Plastic Bin Hire",
      description:
        "Our eco friendly plastic moving bins are delivered to your door with no assembly required. Once you're done we will pick them up and sanitize them so that they can be used again.",
      svgComponent: SvgFullPackingMove,
    },
    {
      id: "box-material-delivery",
      title: "Box and Material Delivery",
      description:
        "We have made it easy by bundling important moving supplies into packages that suit your lifestyle. Delivered to your door before your move date.",
      svgComponent: SvgBoxMaterialMove,
    },
    {
      id: "valuable-item-packing",
      title: "Valuable Item Packing",
      description:
        "Your valuable furniture pieces, antiques and artwork will be safely handled with the utmost care. We will build custom crates for your items, wrap them with durable packing material and ensure the appropriate lifting resources.",
      svgComponent: ValuableItemMoveSVG,
    },
    {
      id: "pianos",
      title: "Pianos",
      description:
        "It takes specialized skills, equipment and training to move a piano safely, especially in the London Area. We have experience moving upright, horizontal and all piano styles in between.",
      svgComponent: PianoMoveSVG,
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
                            {/* SVG Component */}
              <div className="mb-6">
                <div className="mb-4">
                  <service.svgComponent 
                    width={150} 
                    height={113} 
                    className="text-accent-600 mb-4 w-36 h-28 sm:w-44 sm:h-33 md:w-56 md:h-42 lg:w-72 lg:h-54 xl:w-80 xl:h-60" 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
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
