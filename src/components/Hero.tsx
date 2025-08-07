import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export interface HeroProps {
  // Background configuration
  backgroundImage: string;
  overlayOpacity?: number;
  
  // Content configuration
  badge?: string;
  title: string;
  description?: string;
  
  // Actions configuration
  primaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  
  // Additional styling
  className?: string;
  minHeight?: string;
}

export default function Hero({
  backgroundImage,
  overlayOpacity = 0.4,
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
  minHeight = "min-h-[500px]",
}: HeroProps) {
  return (
    <section 
      className={`relative ${minHeight} flex items-center bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-8 items-center">
          <div className="text-white space-y-6 text-center max-w-4xl mx-auto">
            {badge && (
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {badge}
              </Badge>
            )}
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl">
              {title}
            </h1>
            
            {description && (
              <p className="text-xl opacity-95 drop-shadow-lg">
                {description}
              </p>
            )}

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {primaryAction && (
                  <Button 
                    size="lg" 
                    className="bg-secondary-400 hover:bg-secondary-500 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    onClick={primaryAction.onClick}
                    asChild={!!primaryAction.href}
                  >
                    {primaryAction.href ? (
                      <a href={primaryAction.href}>
                        {primaryAction.text} <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    ) : (
                      <>
                        {primaryAction.text} <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                )}
                
                {secondaryAction && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/10 backdrop-blur-sm"
                    onClick={secondaryAction.onClick}
                    asChild={!!secondaryAction.href}
                  >
                    {secondaryAction.href ? (
                      <a href={secondaryAction.href}>
                        {secondaryAction.text}
                      </a>
                    ) : (
                      secondaryAction.text
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
