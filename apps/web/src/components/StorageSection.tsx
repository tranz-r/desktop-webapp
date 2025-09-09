import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StorageSectionProps {
  title: string;
  highlightedText: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  className?: string;
  onButtonClick?: () => void;
  href?: string;
}

export default function StorageSection({
  title = "Make space with our flexible short and long term",
  highlightedText = "storage",
  description = "We will pick up your items from your doorstep and deliver them to our secure Northamptonshire storage facility, where they will be safely stored for as little or as long as you like. Just let us know when you need your items back and we will drop them off at a time that suits you.",
  buttonText = "GET A STORAGE QUOTE",
  imageSrc = "/images/two-movers.jpg",
  imageAlt = "Storage service",
  className = "",
  onButtonClick,
  href,
}: StorageSectionProps) {
  // Split the title to highlight the specified text
  const titleParts = title.split(highlightedText);

  return (
    <section className={`py-16 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Image */}
          <div className="relative order-2 lg:order-1 ml-8">
            {/* Navy blue decorative frame background */}
            <div className="absolute -inset-4 bg-primary-500 rounded-3xl transform rotate-2"></div>

            {/* White frame container */}
            <div className="relative bg-white p-2 rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Inner image container with rounded corners */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="relative w-full h-[300px] lg:h-[350px] xl:h-[400px]">
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

          {/* Right Section - Text */}
          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl xl:text-4xl font-bold text-gray-900 leading-tight">
              {titleParts[0]}
              <span className="text-primary-500 underline decoration-primary-500 decoration-4 underline-offset-4">
                {highlightedText}
              </span>
              {titleParts[1]}
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl">
              {description}
            </p>
            <div className="pt-4">
              {href ? (
                <Link href={href}>
                  <Button
                    size="lg"
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 text-base font-semibold"
                  >
                    {buttonText}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 text-base font-semibold"
                  onClick={onButtonClick}
                >
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
