"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Home,
  Truck,
  Package,
  Clock,
  Shield,
  Users,
} from "lucide-react";

interface ServiceCategoryProps {
  categories?: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  onCategoryClick?: (categoryId: string) => void;
}

const ServiceCategories = ({
  categories = [
    {
      id: "local-moving",
      title: "Local Moving",
      description:
        "Professional moving services within your city or neighborhood.",
      icon: <Home className="h-8 w-8" />,
    },
    {
      id: "long-distance",
      title: "Long Distance Moving",
      description:
        "Reliable interstate moving solutions for your cross-country relocation.",
      icon: <Truck className="h-8 w-8" />,
    },
    {
      id: "packing",
      title: "Packing Services",
      description:
        "Expert packing and unpacking to protect your valuable belongings.",
      icon: <Package className="h-8 w-8" />,
    },
    {
      id: "same-day",
      title: "Same Day Moving",
      description:
        "Quick and efficient moving services when you need to relocate immediately.",
      icon: <Clock className="h-8 w-8" />,
    },
    {
      id: "storage",
      title: "Storage Solutions",
      description: "Secure storage options for short-term or long-term needs.",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      id: "specialty",
      title: "Specialty Moving",
      description:
        "Specialized moving services for pianos, antiques, and other valuable items.",
      icon: <Users className="h-8 w-8" />,
    },
  ],
  onCategoryClick = () => {},
}: ServiceCategoryProps) => {
  return (
    <section className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Our Moving Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of moving services to meet all your
            relocation needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="transition-all duration-300 hover:shadow-lg border-2 border-transparent hover:border-primary/20 cursor-pointer"
              onClick={() => onCategoryClick(category.id)}
            >
              <CardHeader>
                <div className="p-2 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {category.icon}
                </div>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="group w-full justify-between"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
