import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Check } from "lucide-react";

interface GuaranteeComponentProps {
  title?: string;
  highlightedText?: string;
  subtitle?: string;
  description?: string;
  includedItems?: string[];
  expandableSections?: {
    title: string;
    content?: string;
  }[];
  className?: string;
}

export default function GuaranteeComponent({
  title = "We offer a guaranteed, all-inclusive flat fee, locked in before your move day. Which means the duration of your move will not impact your move price. We always include the following services at no extra charge to you.",
  highlightedText = "We include all of the following services at no extra charge to you.",
  subtitle = "Items we always pack for free, as a part of your flat fee",
  description = "",
  includedItems = [
    "Smart & Flat-screen TVs – Protected and packed in oversized LCD/plasma/LED box",
    "Wardrobe Clothes – Hung and packed into a Piece of Cake wardrobe box",
    "Standard sized Mirrors – Protected and packed in cardboard box",
    "Lamps – Packed in lamp box with shade removed and wrapped",
    "Paintings – Protected and packed in cardboard or picture crate",
    "Small Art Sculptures – Protected and packed in sturdy cardboard box",
    "Computers – Wrapped and packed in cardboard box and kept flat",
    "Electronics – Wrapped and packed in cardboard box with bundled cabling alongside it",
  ],
  expandableSections = [
    {
      title: "Protection and wrapping of your furniture",
      content:
        "Mattresses – Wrapped in plastic wrapping protection\n• Couches & Chairs – Wrapped in moving blankets and taped for protection\n• Tables – Disassembled & wrapped in blankets with cardboard crating for the glass\n• Armoires – Disassembled & double wrapped in blankets",
    },
    {
      title: "Extra care of your walls, floor and doors",
      content:
        "Floors – On your moving day, we ensure that we carefully tread and carry your items to protect your floors. Masonite can be requested for an additional fee\n• Corners – Protection on the corners of walls to prevent scuffing in both your old home and on arrival at your new location\n• Hallways – Before we start moving items we add protection to the hallway passages as appropriate, to prevent damage\n• Doorways – We carefully manoeuvre items to shield frame from scratches",
    },
    {
      title:
        "No hidden extras, our travel and labor expenses are included in your flat fee price",
      content:
        "Moving & Storage, any travel expenses incurred during your move such as road tolls are included in your price, meaning no hidden extras on the day. Any travel related expenses like tolls and fuel are included in the price, as well as the cost of moving labour for your booking.",
    },
  ],
  className = "",
}: GuaranteeComponentProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([0]); // First section expanded by default

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Guarantee Text */}
          <div className="space-y-6">
            <div className="bg-primary-50 p-6 rounded-2xl border-l-4 border-primary-500">
              <p className="text-lg text-primary-700 font-medium leading-relaxed">
                {title}
              </p>
            </div>
          </div>

          {/* Right Section - Services List */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {highlightedText}
              </h3>

              {/* Expandable Section - Items we pack for free */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <button
                  onClick={() => toggleSection(0)}
                  className="flex items-center justify-between w-full text-left py-3 text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors"
                >
                  <span>{subtitle}</span>
                  {expandedSections.includes(0) ? (
                    <ChevronUp className="h-5 w-5 text-primary-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary-500" />
                  )}
                </button>

                {expandedSections.includes(0) && (
                  <div className="mt-4 space-y-3">
                    {includedItems.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Expandable Sections */}
              {expandableSections.map((section, index) => {
                const sectionIndex = index + 1;
                return (
                  <div
                    key={sectionIndex}
                    className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                  >
                    <button
                      onClick={() => toggleSection(sectionIndex)}
                      className="flex items-center justify-between w-full text-left py-3 text-lg font-semibold text-gray-800 hover:text-primary-600 transition-colors"
                    >
                      <span>{section.title}</span>
                      {expandedSections.includes(sectionIndex) ? (
                        <ChevronUp className="h-5 w-5 text-primary-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-primary-500" />
                      )}
                    </button>

                    {expandedSections.includes(sectionIndex) &&
                      section.content && (
                        <div className="mt-4 space-y-3">
                          {section.content
                            .split("\n")
                            .filter((line) => line.trim().length > 0)
                            .map((item, itemIndex) => {
                              const isBulletPoint = item.trim().startsWith("•");
                              const displayText = isBulletPoint
                                ? item.replace("• ", "")
                                : item.trim();

                              return (
                                <div
                                  key={itemIndex}
                                  className="flex items-start space-x-3"
                                >
                                  <Check className="h-5 w-5 text-primary-500 mt-0.5 flex-shrink-0" />
                                  <p className="text-gray-700 text-sm leading-relaxed">
                                    {displayText}
                                  </p>
                                </div>
                              );
                            })}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
