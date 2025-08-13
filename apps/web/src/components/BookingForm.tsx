"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  CheckCircle,
  ChevronRight,
  Home,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";

interface BookingFormProps {
  onSubmit?: (data: BookingData) => void;
  isOpen?: boolean;
}

interface BookingData {
  moveDate: Date | undefined;
  currentAddress: string;
  destinationAddress: string;
  homeSize: string;
  services: string[];
  specialInstructions: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const BookingForm = ({
  onSubmit = () => {},
  isOpen = true,
}: BookingFormProps) => {
  const [activeTab, setActiveTab] = useState("date");
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState<BookingData>({
    moveDate: undefined,
    currentAddress: "",
    destinationAddress: "",
    homeSize: "1-bedroom",
    services: ["Basic Moving"],
    specialInstructions: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setFormData((prev) => ({ ...prev, moveDate: selectedDate }));
  };

  const handleNext = () => {
    if (activeTab === "date") setActiveTab("addresses");
    else if (activeTab === "addresses") setActiveTab("services");
    else if (activeTab === "services") setActiveTab("contact");
    else if (activeTab === "contact") handleSubmit();
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isDateTabValid = formData.moveDate !== undefined;
  const isAddressesTabValid =
    formData.currentAddress && formData.destinationAddress;
  const isServicesTabValid = formData.services.length > 0;
  const isContactTabValid =
    formData.contactName && formData.contactEmail && formData.contactPhone;

  if (!isOpen) return null;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Book Your Move
          </CardTitle>
          <CardDescription className="text-center">
            Complete the form below to schedule your moving service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="date" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Date</span>
                {isDateTabValid && (
                  <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Addresses</span>
                {isAddressesTabValid && (
                  <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline">Services</span>
                {isServicesTabValid && (
                  <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                )}
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Contact</span>
                {isContactTabValid && (
                  <CheckCircle className="h-3 w-3 ml-1 text-green-500" />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="date" className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <h3 className="text-lg font-medium">Select Your Moving Date</h3>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-[280px] justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="addresses" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAddress">Current Address</Label>
                  <Input
                    id="currentAddress"
                    name="currentAddress"
                    placeholder="Enter your current address"
                    value={formData.currentAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationAddress">
                    Destination Address
                  </Label>
                  <Input
                    id="destinationAddress"
                    name="destinationAddress"
                    placeholder="Enter your destination address"
                    value={formData.destinationAddress}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="homeSize">Home Size</Label>
                  <select
                    id="homeSize"
                    name="homeSize"
                    className="w-full p-2 border rounded-md"
                    value={formData.homeSize}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        homeSize: e.target.value,
                      }))
                    }
                  >
                    <option value="studio">Studio</option>
                    <option value="1-bedroom">1 Bedroom</option>
                    <option value="2-bedroom">2 Bedroom</option>
                    <option value="3-bedroom">3 Bedroom</option>
                    <option value="4-bedroom">4+ Bedroom</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Services</h3>
                <div className="grid gap-4">
                  {[
                    {
                      id: "basic",
                      label: "Basic Moving",
                      icon: <Truck className="h-5 w-5" />,
                    },
                    {
                      id: "packing",
                      label: "Packing Services",
                      icon: <Package className="h-5 w-5" />,
                    },
                    {
                      id: "furniture",
                      label: "Furniture Assembly",
                      icon: <Home className="h-5 w-5" />,
                    },
                    {
                      id: "storage",
                      label: "Storage Solutions",
                      icon: <Package className="h-5 w-5" />,
                    },
                  ].map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={service.id}
                        checked={formData.services.includes(service.label)}
                        onCheckedChange={() =>
                          handleServiceToggle(service.label)
                        }
                      />
                      <Label
                        htmlFor={service.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {service.icon}
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialInstructions">
                    Special Instructions
                  </Label>
                  <Textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    placeholder="Any special requirements or instructions for your move"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Full Name</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    placeholder="Enter your full name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number</Label>
                  <Input
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (activeTab === "addresses") setActiveTab("date");
              else if (activeTab === "services") setActiveTab("addresses");
              else if (activeTab === "contact") setActiveTab("services");
            }}
            disabled={activeTab === "date"}
          >
            Back
          </Button>
          <Button onClick={handleNext} className="flex items-center gap-2">
            {activeTab === "contact" ? "Submit Booking" : "Next"}
            {activeTab !== "contact" && <ChevronRight className="h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingForm;
