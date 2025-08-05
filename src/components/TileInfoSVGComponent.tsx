"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface TileInfoSVGComponentProps {
  id: string;
  title: string;
  description: string;
  svgComponent: React.ComponentType<any>;
  onLearnMore?: (serviceId: string) => void;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  svgClassName?: string;
  svgWidth?: number;
  svgHeight?: number;
}

const TileInfoSVGComponent = ({
  id,
  title,
  description,
  svgComponent: SvgComponent,
  onLearnMore = () => {},
  titleClassName = "text-xl font-bold text-gray-900 mb-3",
  descriptionClassName = "text-gray-600 mb-4 text-sm leading-relaxed",
  buttonClassName = "text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center",
  svgClassName = "text-accent-600 mb-4 w-36 h-28 sm:w-44 sm:h-33 md:w-56 md:h-42 lg:w-72 lg:h-54 xl:w-80 xl:h-60",
  svgWidth = 150,
  svgHeight = 113,
}: TileInfoSVGComponentProps) => {
  return (
    <div className="text-left">
      {/* SVG Component */}
      <div className="mb-4 flex justify-center sm:justify-start">
        <SvgComponent
          width={svgWidth}
          height={svgHeight}
          className={svgClassName}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
      
      <h3 className={titleClassName}>
        {title}
      </h3>
      
      <p className={descriptionClassName}>
        {description}
      </p>
      
      <button
        onClick={() => onLearnMore(id)}
        className={buttonClassName}
      >
        Learn More <ArrowRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
};

export default TileInfoSVGComponent; 