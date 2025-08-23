"use client";

export const dynamic = 'force-dynamic';

import React from "react";
import { useRouter } from "next/navigation";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useQuote } from "@/contexts/QuoteContext";
import { Address } from "@/types/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PostcodeTypeahead from "@/components/address/PostcodeTypeahead";
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
import { AlertCircle, Building2, MapPin } from "lucide-react";
import { useQuoteSession } from '@/hooks/useQuoteSession';
import { API_BASE_URL } from '@/lib/api/config';

type FormValues = {
  originLine1: string;
  originPostcode: string;
  originFloor: string; // "ground" | "1" | "2" | "3" | "4" | "5" | "6+"
  originElevator: boolean;
  destinationLine1: string;
  destinationPostcode: string;
  destinationFloor: string;
  destinationElevator: boolean;
  // New: Customer details
  fullName: string;
  email: string;
  phone: string;
  billingLine1: string;
  billingPostcode: string;
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
  const { 
    activeQuoteType,
    quotes,
    updateQuote,
    isHydrated
  } = useQuote();
  
  // Get origin and destination from active quote
  const activeQuote = activeQuoteType ? quotes[activeQuoteType] : undefined;
  const origin = activeQuote?.origin;
  const destination = activeQuote?.destination;
  const distanceMiles = activeQuote?.distanceMiles;
  const removalsQuote = quotes.removals;
  const quoteSession = useQuoteSession<any>({ baseUrl: API_BASE_URL });
  const selectedVan = removalsQuote?.vanType;

  // Helper functions for the new context API
  const setOrigin = (originData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { origin: originData });
    }
  };

  const setDestination = (destinationData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { destination: destinationData });
    }
  };

  const setDistanceMiles = (miles: number) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { distanceMiles: miles });
    }
  };

  const setCustomerName = (name: string) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { 
        customer: { ...activeQuote?.customer, fullName: name } 
      });
    }
  };

  const setCustomerEmail = (email: string) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { 
        customer: { ...activeQuote?.customer, email } 
      });
    }
  };

  const setCustomerPhone = (phone: string) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { 
        customer: { ...activeQuote?.customer, phone } 
      });
    }
  };

  const setBillingAddress = (line1: string, postcode: string) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { 
        customer: { 
          ...activeQuote?.customer, 
          billingAddress: { line1, postcode } 
        } 
      });
    }
  };

  const updateVehicle = (vehicleData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, vehicleData);
    }
  };

  const form = useForm<FormValues>({
    defaultValues: {
      originLine1: origin?.line1 || "",
      originPostcode: origin?.postcode || "",
      originFloor: "ground",
      originElevator: true,
      destinationLine1: destination?.line1 || "",
      destinationPostcode: destination?.postcode || "",
      destinationFloor: "ground",
      destinationElevator: true,
      fullName: activeQuote?.customer?.fullName || "",
      email: activeQuote?.customer?.email || "",
      phone: activeQuote?.customer?.phone || "",
      billingLine1: activeQuote?.customer?.billingAddress?.line1 || "",
      billingPostcode: activeQuote?.customer?.billingAddress?.postcode || "",
    },
    mode: "onChange",
  });

  const o = origin;
  const d = destination;
  const collectedAddresses = !!o?.line1 && !!o?.postcode && !!d?.line1 && !!d?.postcode;
  const showExtraCost =
    ((!o?.hasElevator && (o?.floor ?? 0) > 0) || (!d?.hasElevator && (d?.floor ?? 0) > 0));

  // Watch customer billing for readiness checks
  const watchBillingLine1 = form.watch("billingLine1");
  const watchBillingPostcode = form.watch("billingPostcode");
  const watchFullName = form.watch("fullName");
  const watchEmail = form.watch("email");
  const watchPhone = form.watch("phone");

  // Continuously sync customer details & billing into canonical quote
  React.useEffect(() => {
    try {
      quoteSession.setData((prev: any) => ({
        ...(prev ?? {}),
        customer: {
          fullName: watchFullName || '',
          email: watchEmail || '',
          phone: watchPhone || '',
          billingAddress: {
            line1: watchBillingLine1 || '',
            postcode: watchBillingPostcode || '',
          },
        },
      }));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFullName, watchEmail, watchPhone, watchBillingLine1, watchBillingPostcode]);

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
    setDistanceMiles(distanceMiles ?? 0);
    setCustomerName(values.fullName);
    setCustomerEmail(values.email);
    setCustomerPhone(values.phone);
    setBillingAddress(values.billingLine1, values.billingPostcode);

    try {
      quoteSession.setData((prev: any) => ({
        ...(prev ?? {}),
        originDestination: {
          origin,
          destination,
          distanceMiles: distanceMiles ?? 0,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          billingAddress: { line1: values.billingLine1, postcode: values.billingPostcode },
        },
      }));
      void quoteSession.flush();
    } catch {}

    // Ensure flow: must have selected a van before pricing per rules
    if (!selectedVan) {
      router.push("/van-selection");
      return;
    }
    router.push("/summary");
  }

  const hasBilling = (watchBillingPostcode?.trim().length ?? 0) > 0 && (watchBillingLine1?.trim().length ?? 0) > 0;

  // Explicit validation for customer details to avoid edge cases where formState.isValid lags
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ukPhoneRegex = /^(?:\+44\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4}|0\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4})$/;
  const isCustomerValid =
    (watchFullName?.trim().length ?? 0) >= 2 &&
    (!!watchEmail && emailRegex.test(watchEmail)) &&
    (!!watchPhone && ukPhoneRegex.test(watchPhone));
  
  const isReady = collectedAddresses && hasBilling && isCustomerValid;

  // When hydrated, rehydrate form fields for floors/elevators from saved state if present
  React.useEffect(() => {
    if (!isHydrated) return;
    const o = origin;
    const d = destination;
    if (o?.floor !== undefined) {
      form.setValue('originFloor', o.floor === 0 ? 'ground' : (o.floor >= 6 ? '6+' : String(o.floor)));
    }
    if (typeof o?.hasElevator === 'boolean') {
      form.setValue('originElevator', o.hasElevator);
    }
    if (d?.floor !== undefined) {
      form.setValue('destinationFloor', d.floor === 0 ? 'ground' : (d.floor >= 6 ? '6+' : String(d.floor)));
    }
    if (typeof d?.hasElevator === 'boolean') {
      form.setValue('destinationElevator', d.hasElevator);
    }
  }, [isHydrated, origin, destination]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />

      <main className="flex-1">
      <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          {/* Flow guard: if booking hasn't hydrated yet, avoid premature redirects; if no van selected, direct user */}
          {isHydrated && !selectedVan && (
            <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800 text-sm">
              Please select a van first to continue. You'll be redirected to van selection if you proceed.
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Customer Details */}
          <Card className="border-primary-200">
            <CardHeader>
              <CardTitle className="text-primary-700 text-base">Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      rules={{ required: "Full name is required", minLength: { value: 2, message: "Name is too short" } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="e.g. john.smith@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{
                        required: "Phone number is required",
                        pattern: {
                          // Accepts UK numbers in formats like 07123 456789, 020 7946 0018, +44 7123 456789
                          value: /^(?:\+44\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4}|0\s?\d{3,4}[\s-]?\d{3}[\s-]?\d{3,4})$/,
                          message: "Enter a valid UK phone number",
                        },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number (UK)</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="e.g. 07123 456789" {...field} />
                          </FormControl>
                          <FormDescription>Include country code or leading 0</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Billing Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {watchBillingLine1 ? (
                      <div className="rounded-md border p-3 bg-muted/30">
                        <div className="text-sm font-medium text-gray-900">{watchBillingLine1}</div>
                        {watchBillingPostcode && (
                          <div className="text-xs text-gray-600 mt-1">{watchBillingPostcode}</div>
                        )}
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={() => {
                              form.setValue("billingLine1", "");
                              form.setValue("billingPostcode", "");
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="billingPostcode"
                        rules={{ required: "Postcode is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postcode</FormLabel>
                            <FormControl>
                              <PostcodeTypeahead
                                postcode={field.value}
                                onPostcodeChange={field.onChange}
                                onAddressSelected={(addr) => {
                                  form.setValue("billingLine1", addr);
                                }}
                                placeholder="e.g. EC1A 1BB"
                                variant="pickup"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-700 text-base">
          Provide pickup and delivery addresses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {collectedAddresses ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pickup summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-emerald-600" />
                  Pickup Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm font-medium text-gray-900">{o?.line1}</div>
                {o?.postcode && (
                  <div className="text-xs text-gray-600">{o.postcode}</div>
                )}
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" />
                  Floor: {o?.floor ? (o.floor >= 6 ? '6+' : o.floor) : 'ground'}{typeof o?.hasElevator === 'boolean' ? ` · Elevator: ${o.hasElevator ? 'Yes' : 'No'}` : ''}
                </div>
              </CardContent>
            </Card>

            {/* Delivery summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm font-medium text-gray-900">{d?.line1}</div>
                {d?.postcode && (
                  <div className="text-xs text-gray-600">{d.postcode}</div>
                )}
                <div className="text-xs text-gray-600 flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5" />
                  Floor: {d?.floor ? (d.floor >= 6 ? '6+' : d.floor) : 'ground'}{typeof d?.hasElevator === 'boolean' ? ` · Elevator: ${d.hasElevator ? 'Yes' : 'No'}` : ''}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800 text-sm">
            Pickup and delivery addresses have not been provided yet.
          </div>
        )}

        {showExtraCost && (
          <div className="mt-4 flex items-start gap-3 rounded-md border border-amber-300 bg-amber-50 p-3 text-amber-800">
            <AlertCircle className="h-5 w-5" />
            <div className="text-sm">
              Additional charges may apply for floors above ground without elevator access.
            </div>
          </div>
        )}

        {/* Total distance from context */}
        {typeof distanceMiles === 'number' && Number.isFinite(distanceMiles) && distanceMiles > 0 && (
          <div className="mt-4 w-full text-center text-lg text-muted-foreground font-extrabold">
            Total distance: {Math.round(distanceMiles)} miles
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button type="button" variant="outline" onClick={() => router.push('/collection-delivery')}>
            Change addresses
          </Button>
        </div>
      </CardContent>
    </Card>
          <div className="flex justify-end">
            <Button type="submit" disabled={!isReady}>
              Next: Pricing
            </Button>
          </div>
            </form>
          </Form>
        </div>
  </section>
  </main>

  <Footer />
    </div>
  );
}

 
