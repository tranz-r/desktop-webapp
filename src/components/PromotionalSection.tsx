import React from "react";
import Image from "next/image";

interface PromotionalSectionProps {
  title: string;
  highlightedText: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
}

export default function PromotionalSection({
  title,
  highlightedText,
  description,
  imageSrc,
  imageAlt,
  className = "",
}: PromotionalSectionProps) {
  // Split the title to highlight the specified text
  const titleParts = title.split(highlightedText);

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Text */}
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              {titleParts[0]}
              <span className="text-primary-500">{highlightedText}</span>
              {titleParts[1]}
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          {/* Right Section - Image with Pink Frame Design */}
          <div className="relative">
            {/* Pink decorative frame background */}
            <div className="absolute -inset-4 bg-primary-500 rounded-3xl transform rotate-2"></div>

            {/* White frame container */}
            <div className="relative bg-white p-2 rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Inner image container with rounded corners */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="relative w-full h-[400px] lg:h-[500px] xl:h-[600px]">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
