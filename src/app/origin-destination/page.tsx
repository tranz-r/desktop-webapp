"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useBooking } from "@/contexts/BookingContext";
import { Address } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostcodeTypeahead from "@/components/address/PostcodeTypeahead";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AlertCircle, Building2, MapPin, Navigation } from "lucide-react";

type FormValues = {
  originLine1: string;
  originPostcode: string;
  originFloor: string; // "ground" | "1" | "2" | "3" | "4" | "5" | "6+"
  originElevator: boolean;
  destinationLine1: string;
  destinationPostcode: string;
  destinationFloor: string;
  destinationElevator: boolean;
};

const FLOOR_OPTIONS = [
  { value: "ground", label: "Ground Floor" },
  { value: "1", label: "1st Floor" },
  { value: "2", label: "2nd Floor" },
  { value: "3", label: "3rd Floor" },
  { value: "4", label: "4th Floor" },
  { value: "5", label: "5th Floor" },
  { value: "6+", label: "6th Floor or Higher" },
] as const;

function floorValueToNumber(val: string): number {
  if (val === "ground") return 0;
  if (val === "6+") return 6;
  const n = parseInt(val, 10);
  return Number.isFinite(n) ? n : 0;
}

export default function OriginDestinationPage() {
  const router = useRouter();
  const { setOrigin, setDestination, setDistanceKm } = useBooking();

  const form = useForm<FormValues>({
    defaultValues: {
      originLine1: "",
      originPostcode: "",
      originFloor: "ground",
      originElevator: true,
      destinationLine1: "",
      destinationPostcode: "",
      destinationFloor: "ground",
      destinationElevator: true,
    },
    mode: "onChange",
  });

  const watchOriginFloor = form.watch("originFloor");
  const watchDestinationFloor = form.watch("destinationFloor");
  const watchOriginElevator = form.watch("originElevator");
  const watchDestinationElevator = form.watch("destinationElevator");

  const showExtraCost =
    (!watchOriginElevator && floorValueToNumber(watchOriginFloor) > 0) ||
    (!watchDestinationElevator && floorValueToNumber(watchDestinationFloor) > 0);

  function onSubmit(values: FormValues) {
    const origin: Address = {
      line1: values.originLine1,
      postcode: values.originPostcode,
      floor: floorValueToNumber(values.originFloor),
      hasElevator: values.originElevator,
    };
    const destination: Address = {
      line1: values.destinationLine1,
      postcode: values.destinationPostcode,
      floor: floorValueToNumber(values.destinationFloor),
      hasElevator: values.destinationElevator,
    };
    setOrigin(origin);
    setDestination(destination);
    setDistanceKm(0); // Will be calculated later
    router.push("/pricing");
  }

  const isReady =
    form.watch("originPostcode").trim().length > 0 &&
    form.watch("destinationPostcode").trim().length > 0 &&
    form.watch("originLine1").trim().length > 0 &&
    form.watch("destinationLine1").trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <StreamlinedHeader />

      <main className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          <Card className="border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700 text-base">
                Provide pickup and delivery addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pickup */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <MapPin className="h-4 w-4 text-emerald-600" />
                          Pickup Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {form.watch("originLine1") ? (
                          <div className="rounded-md border p-3 bg-muted/30">
                            <div className="text-sm font-medium text-gray-900">{form.watch("originLine1")}</div>
                            {form.watch("originPostcode") && (
                              <div className="text-xs text-gray-600 mt-1">{form.watch("originPostcode")}</div>
                            )}
                            <div className="mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  form.setValue("originLine1", "");
                                  form.setValue("originPostcode", "");
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <FormField
                            control={form.control}
                            name="originPostcode"
                            rules={{ required: "Postcode is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postcode</FormLabel>
                                <FormControl>
                                  <PostcodeTypeahead
                                    postcode={field.value}
                                    onPostcodeChange={field.onChange}
                                    onAddressSelected={(addr) => {
                                      form.setValue("originLine1", addr);
                                    }}
                                    placeholder="e.g. SW1A 1AA"
                                    variant="pickup"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="originFloor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select floor" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {FLOOR_OPTIONS.map((f) => (
                                      <SelectItem key={f.value} value={f.value}>
                                        {f.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription className="flex items-center gap-2">
                                  <Building2 className="h-3.5 w-3.5" /> Select building floor
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="originElevator"
                            render={({ field }) => (
                              <FormItem className="flex flex-col justify-end">
                                <div className="flex items-center justify-between gap-3">
                                  <FormLabel>Elevator available</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </div>
                                <FormDescription>Toggle if elevator is available</FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Delivery */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Navigation className="h-4 w-4 text-red-600" />
                          Delivery Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {form.watch("destinationLine1") ? (
                          <div className="rounded-md border p-3 bg-muted/30">
                            <div className="text-sm font-medium text-gray-900">{form.watch("destinationLine1")}</div>
                            {form.watch("destinationPostcode") && (
                              <div className="text-xs text-gray-600 mt-1">{form.watch("destinationPostcode")}</div>
                            )}
                            <div className="mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                type="button"
                                onClick={() => {
                                  form.setValue("destinationLine1", "");
                                  form.setValue("destinationPostcode", "");
                                }}
                              >
                                Change
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <FormField
                            control={form.control}
                            name="destinationPostcode"
                            rules={{ required: "Postcode is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postcode</FormLabel>
                                <FormControl>
                                  <PostcodeTypeahead
                                    postcode={field.value}
                                    onPostcodeChange={field.onChange}
                                    onAddressSelected={(addr) => {
                                      form.setValue("destinationLine1", addr);
                                    }}
                                    placeholder="e.g. W1K 1QA"
                                    variant="delivery"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="destinationFloor"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Floor</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select floor" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {FLOOR_OPTIONS.map((f) => (
                                      <SelectItem key={f.value} value={f.value}>
                                        {f.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormDescription className="flex items-center gap-2">
                                  <Building2 className="h-3.5 w-3.5" /> Select building floor
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="destinationElevator"
                            render={({ field }) => (
                              <FormItem className="flex flex-col justify-end">
                                <div className="flex items-center justify-between gap-3">
                                  <FormLabel>Elevator available</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </div>
                                <FormDescription>Toggle if elevator is available</FormDescription>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {showExtraCost && (
                    <div className="flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
                      <AlertCircle className="h-5 w-5" />
                      <div className="text-sm">
                        Additional charges may apply for floors above ground without elevator access.
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end">
                    <Button type="submit" disabled={!isReady}>
                      Next: Pricing
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

 
