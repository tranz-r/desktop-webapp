"use client";

export const dynamic = 'force-dynamic';

import MovingComponent from "@/components/MovingComponent";
import Footer from "@/components/Footer";
import PromotionalSection from "@/components/PromotionalSection";

export default function MovingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MovingComponent />
      <PromotionalSection
        title="Put your feet up with our complete packing experience"
        highlightedText="complete packing"
        description="We can pack your whole home, a few boxes or your most valuable items. Our packing methods and the high-quality packing materials we use are matched specifically to each of your items."
        imageSrc="/images/feet-up.jpg"
        imageAlt="Professional movers packing furniture with care"
      />
      <Footer />
    </div>
  );
}
