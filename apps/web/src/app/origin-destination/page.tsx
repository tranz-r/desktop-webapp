"use client";

export const dynamic = 'force-dynamic';

import React from "react";
import { useRouter } from "next/navigation";
import { StreamlinedHeader } from "@/components/StreamlinedHeader";
import Footer from "@/components/Footer";
import { useQuote } from "@/contexts/QuoteContext";
import { Address } from "@/types/booking";
import { BackendCustomer } from "@/lib/api/quote";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AddressInput from "@/components/address/AddressInput";
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
import { AlertCircle, Building2, MapPin, ChevronLeft } from "lucide-react";
// Note: Removed unused imports - now using QuoteContext only

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
  sameAsPickup: boolean;
  billingLine1: string;
  billingPostcode: string;
  billingCity: string;
  billingCountry: string;
  billingFullAddress: string;
  billingAddressNumber: string;
  billingStreet: string;
  billingNeighborhood: string;
  billingDistrict: string;
  billingRegion: string;
  billingRegionCode: string;
  billingCountryCode: string;
  billingPlaceName: string;
  billingAccuracy: string;
  billingMapboxId: string;
  billingLatitude: number;
  billingLongitude: number;
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
  // Note: Removed quoteSession - now using QuoteContext only
  // Note: Van selection happens on /pickup-dropoff page, not here
  // This page is for customer details and address confirmation

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

  const setBillingAddress = (billingData: any) => {
    if (activeQuoteType) {
      updateQuote(activeQuoteType, { 
        customer: { 
          ...activeQuote?.customer, 
          billingAddress: billingData
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
      sameAsPickup: false,
      billingLine1: activeQuote?.customer?.billingAddress?.line1 || "",
      billingPostcode: activeQuote?.customer?.billingAddress?.postcode || "",
      billingCity: activeQuote?.customer?.billingAddress?.city || "",
      billingCountry: activeQuote?.customer?.billingAddress?.country || "GB",
      billingFullAddress: activeQuote?.customer?.billingAddress?.fullAddress || "",
      billingAddressNumber: activeQuote?.customer?.billingAddress?.addressNumber || "",
      billingStreet: activeQuote?.customer?.billingAddress?.street || "",
      billingNeighborhood: activeQuote?.customer?.billingAddress?.neighborhood || "",
      billingDistrict: activeQuote?.customer?.billingAddress?.district || "",
      billingRegion: activeQuote?.customer?.billingAddress?.region || "",
      billingRegionCode: activeQuote?.customer?.billingAddress?.regionCode || "",
      billingCountryCode: activeQuote?.customer?.billingAddress?.countryCode || "gb",
      billingPlaceName: activeQuote?.customer?.billingAddress?.placeName || "",
      billingAccuracy: activeQuote?.customer?.billingAddress?.accuracy || "",
      billingMapboxId: activeQuote?.customer?.billingAddress?.mapboxId || "",
      billingLatitude: activeQuote?.customer?.billingAddress?.latitude || 0,
      billingLongitude: activeQuote?.customer?.billingAddress?.longitude || 0,
    },
    mode: "onChange",
  });

  const o = origin;
  const d = destination;
  const collectedAddresses = !!o?.line1 && !!o?.postcode && !!d?.line1 && !!d?.postcode;
  const showExtraCost =
    ((!o?.hasElevator && (o?.floor ?? 0) > 0) || (!d?.hasElevator && (d?.floor ?? 0) > 0));

  // Watch customer billing for readiness checks
  const watchSameAsPickup = form.watch("sameAsPickup");
  const watchBillingLine1 = form.watch("billingLine1");
  const watchBillingPostcode = form.watch("billingPostcode");
  const watchBillingFullAddress = form.watch("billingFullAddress");
  const watchFullName = form.watch("fullName");
  const watchEmail = form.watch("email");
  const watchPhone = form.watch("phone");

  // Note: Removed continuous sync useEffect to prevent infinite loops
  // Customer details are now synced only when form is submitted

  async function onSubmit(values: FormValues) {
    // Preserve existing rich address data and only update floor/elevator
    const updatedOrigin: Address = {
      line1: origin?.line1 || "",
      postcode: origin?.postcode || "",
      city: origin?.city || "",
      country: origin?.country || "GB",
      floor: floorValueToNumber(values.originFloor),
      hasElevator: values.originElevator,
      // Preserve all extended Mapbox fields
      fullAddress: origin?.fullAddress || "",
      addressNumber: origin?.addressNumber || "",
      street: origin?.street || "",
      neighborhood: origin?.neighborhood || "",
      district: origin?.district || "",
      region: origin?.region || "",
      regionCode: origin?.regionCode || "",
      countryCode: origin?.countryCode || "gb",
      placeName: origin?.placeName || "",
      accuracy: origin?.accuracy || "",
      mapboxId: origin?.mapboxId || "",
      latitude: origin?.latitude || 0,
      longitude: origin?.longitude || 0,
    };
    const updatedDestination: Address = {
      line1: destination?.line1 || "",
      postcode: destination?.postcode || "",
      city: destination?.city || "",
      country: destination?.country || "GB",
      floor: floorValueToNumber(values.destinationFloor),
      hasElevator: values.destinationElevator,
      // Preserve all extended Mapbox fields
      fullAddress: destination?.fullAddress || "",
      addressNumber: destination?.addressNumber || "",
      street: destination?.street || "",
      neighborhood: destination?.neighborhood || "",
      district: destination?.district || "",
      region: destination?.region || "",
      regionCode: destination?.regionCode || "",
      countryCode: destination?.countryCode || "gb",
      placeName: destination?.placeName || "",
      accuracy: destination?.accuracy || "",
      mapboxId: destination?.mapboxId || "",
      latitude: destination?.latitude || 0,
      longitude: destination?.longitude || 0,
    };
    
    setOrigin(updatedOrigin);
    setDestination(updatedDestination);
    setDistanceMiles(distanceMiles ?? 0);
    setCustomerName(values.fullName);
    setCustomerEmail(values.email);
    setCustomerPhone(values.phone);
    
    // Handle billing address - either copy from pickup or use entered values
    const billingAddress = values.sameAsPickup ? {
      line1: origin?.line1 || "",
      postcode: origin?.postcode || "",
      city: origin?.city || "",
      country: origin?.country || "GB",
      floor: floorValueToNumber(values.originFloor),
      hasElevator: values.originElevator,
      // Extended Mapbox fields from pickup
      fullAddress: origin?.fullAddress || "",
      addressNumber: origin?.addressNumber || "",
      street: origin?.street || "",
      neighborhood: origin?.neighborhood || "",
      district: origin?.district || "",
      region: origin?.region || "",
      regionCode: origin?.regionCode || "",
      countryCode: origin?.countryCode || "gb",
      placeName: origin?.placeName || "",
      accuracy: origin?.accuracy || "",
      mapboxId: origin?.mapboxId || "",
      latitude: origin?.latitude || 0,
      longitude: origin?.longitude || 0,
    } : {
      line1: values.billingLine1,
      postcode: values.billingPostcode,
      city: values.billingCity,
      country: values.billingCountry,
      floor: 0,
      hasElevator: true,
      // Extended Mapbox fields from billing
      fullAddress: values.billingFullAddress,
      addressNumber: values.billingAddressNumber,
      street: values.billingStreet,
      neighborhood: values.billingNeighborhood,
      district: values.billingDistrict,
      region: values.billingRegion,
      regionCode: values.billingRegionCode,
      countryCode: values.billingCountryCode,
      placeName: values.billingPlaceName,
      accuracy: values.billingAccuracy,
      mapboxId: values.billingMapboxId,
      latitude: values.billingLatitude,
      longitude: values.billingLongitude,
    };
    
    setBillingAddress(billingAddress);

    // Save customer data to backend via quote update
    try {
      if (activeQuoteType) {
        await updateQuote(activeQuoteType, {
          customer: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            billingAddress: billingAddress
          }
        });
        console.log('Customer data saved successfully via quote update');
      }
    } catch (error) {
      console.error('Failed to save customer data:', error);
    }

    // Navigate to summary page
    router.push("/summary");
  }

  const hasBilling = watchSameAsPickup || ((watchBillingPostcode?.trim().length ?? 0) > 0 && (watchBillingLine1?.trim().length ?? 0) > 0);

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

  // Simple copy logic when checkbox is checked
  React.useEffect(() => {
    if (watchSameAsPickup && origin) {
      form.setValue('billingLine1', origin.line1 || '');
      form.setValue('billingPostcode', origin.postcode || '');
      form.setValue('billingCity', origin.city || '');
      form.setValue('billingCountry', origin.country || 'GB');
      form.setValue('billingFullAddress', origin.fullAddress || '');
      form.setValue('billingAddressNumber', origin.addressNumber || '');
      form.setValue('billingStreet', origin.street || '');
      form.setValue('billingNeighborhood', origin.neighborhood || '');
      form.setValue('billingDistrict', origin.district || '');
      form.setValue('billingRegion', origin.region || '');
      form.setValue('billingRegionCode', origin.regionCode || '');
      form.setValue('billingCountryCode', origin.countryCode || 'gb');
      form.setValue('billingPlaceName', origin.placeName || '');
      form.setValue('billingAccuracy', origin.accuracy || '');
      form.setValue('billingMapboxId', origin.mapboxId || '');
      form.setValue('billingLatitude', origin.latitude || 0);
      form.setValue('billingLongitude', origin.longitude || 0);
    }
  }, [watchSameAsPickup, origin, form]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StreamlinedHeader />

      <main className="flex-1">
      <section className="pt-32 md:pt-36 lg:pt-44 pb-10 bg-white">
        <div className="container mx-auto px-4 space-y-6">
          {/* Note: Van selection happens on /pickup-dropoff page, this page is for customer details */}
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
                    {/* Same as Pickup checkbox */}
                    <FormField
                      control={form.control}
                      name="sameAsPickup"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              Same as Pickup address
                            </FormLabel>
                            <FormDescription className="text-xs text-muted-foreground">
                              Use the pickup address for billing purposes
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {/* Show pickup address when same as pickup is checked */}
                    {watchSameAsPickup && origin && (
                      <div className="rounded-md border p-3 bg-emerald-50 border-emerald-200">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-emerald-600" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 break-words">
                              {origin.fullAddress || `${origin.line1}, ${origin.postcode}`}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              Using pickup address for billing
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Billing address input - only show when not same as pickup */}
                    {!watchSameAsPickup && (
                      <>
                        {watchBillingFullAddress ? (
                      <div className="rounded-md border p-3 bg-muted/30">
                        <div className="text-sm font-medium text-gray-900">{watchBillingFullAddress}</div>
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
                              form.setValue("billingCity", "");
                              form.setValue("billingCountry", "GB");
                              form.setValue("billingFullAddress", "");
                              form.setValue("billingAddressNumber", "");
                              form.setValue("billingStreet", "");
                              form.setValue("billingNeighborhood", "");
                              form.setValue("billingDistrict", "");
                              form.setValue("billingRegion", "");
                              form.setValue("billingRegionCode", "");
                              form.setValue("billingCountryCode", "gb");
                              form.setValue("billingPlaceName", "");
                              form.setValue("billingAccuracy", "");
                              form.setValue("billingMapboxId", "");
                              form.setValue("billingLatitude", 0);
                              form.setValue("billingLongitude", 0);
                            }}
                          >
                            Change
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <FormField
                        control={form.control}
                        name="billingPlaceName"
                        rules={{ required: "Billing address is required" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Billing Address</FormLabel>
                            <FormControl>
                              <AddressInput
                                value={field.value || ""}
                                onChange={field.onChange}
                                onAddressSelected={(addressData) => {
                                  form.setValue('billingLine1', addressData.line1);
                                  form.setValue('billingPostcode', addressData.postcode);
                                  form.setValue('billingCity', addressData.city);
                                  form.setValue('billingCountry', addressData.country);
                                  form.setValue('billingFullAddress', addressData.fullAddress);
                                  form.setValue('billingAddressNumber', addressData.addressNumber);
                                  form.setValue('billingStreet', addressData.street);
                                  form.setValue('billingNeighborhood', addressData.neighborhood);
                                  form.setValue('billingDistrict', addressData.district);
                                  form.setValue('billingRegion', addressData.region);
                                  form.setValue('billingRegionCode', addressData.regionCode);
                                  form.setValue('billingCountryCode', addressData.countryCode);
                                  form.setValue('billingPlaceName', addressData.placeName);
                                  form.setValue('billingAccuracy', addressData.accuracy);
                                  form.setValue('billingMapboxId', addressData.mapboxId);
                                  form.setValue('billingLatitude', addressData.latitude);
                                  form.setValue('billingLongitude', addressData.longitude);
                                }}
                                placeholder="Enter billing address..."
                                label=""
                                variant="pickup"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

    <Card className="border-primary-200">
      <CardHeader>
        <CardTitle className="text-primary-700 text-base">
          Pickup and delivery addresses
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
                <div className="text-sm font-medium text-gray-900">{o?.fullAddress}</div>
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
                <div className="text-sm font-medium text-gray-900">{d?.fullAddress}</div>
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
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (activeQuoteType === 'removals') {
                    router.push('/removal-pricing');
                  } else {
                    router.push('/pricing');
                  }
                }}
                className="px-6 py-2 text-base"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              
              <Button type="submit" disabled={!isReady}>
                Next
              </Button>
            </div>
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

 
